export class ImportSortParser {
    constructor(program) {
        this.program = program;
    }
    parseImports(code) {
        const imports = this.program.body
            .filter((node) => node.type === 'ImportDeclaration')
            .map((node) => {
            var _a, _b;
            const imp = {
                start: node.range[0],
                end: node.range[1],
                importStart: node.range[0],
                importEnd: node.range[1],
                type: node.importKind === 'type' ? 'import-type' : 'import',
                moduleName: node.source.value,
                defaultMember: (_b = (_a = node.specifiers.find((specifier) => specifier.type === 'ImportDefaultSpecifier')) === null || _a === void 0 ? void 0 : _a.local) === null || _b === void 0 ? void 0 : _b.name,
                namedMembers: node.specifiers
                    .filter((specifier) => specifier.type === 'ImportSpecifier')
                    .map((specifier) => ({
                    name: specifier.imported.name,
                    alias: specifier.local.name,
                    type: node.importKind === 'type',
                })),
            };
            const lineComment = this.program.comments.find((comment) => comment.loc.start.line === node.loc.start.line &&
                comment.loc.end.line === node.loc.end.line);
            if (lineComment) {
                imp.end = lineComment.range[1];
            }
            const findLeadingComments = (position) => {
                const leadingComment = this.program.comments.find((comment) => comment.loc.start.line === position);
                if (!leadingComment) {
                    return [];
                }
                const parents = findLeadingComments(leadingComment.loc.start.line - 1);
                return [...parents, leadingComment];
            };
            const leadingComments = findLeadingComments(node.loc.start.line - 1);
            if (leadingComments.length > 0) {
                imp.start = leadingComments.at(0).range[0];
            }
            return imp;
        });
        return imports;
    }
    formatImport(code, imported, eol = '\n') {
        const importStart = imported.importStart || imported.start;
        const importEnd = imported.importEnd || imported.end;
        const importCode = code.substring(importStart, importEnd);
        const { namedMembers } = imported;
        if (namedMembers.length === 0) {
            return code.substring(imported.start, imported.end);
        }
        const newImportCode = importCode.replace(/\{[\s\S]*\}/g, (namedMembersString) => {
            const useMultipleLines = namedMembersString.indexOf(eol) !== -1;
            let prefix;
            if (useMultipleLines) {
                ;
                [prefix] = namedMembersString.split(eol)[1].match(/^\s*/);
            }
            const useSpaces = namedMembersString.charAt(1) === ' ';
            const userTrailingComma = namedMembersString.replace('}', '').trim().endsWith(',');
            return this.formatNamedMembers(namedMembers, useMultipleLines, useSpaces, userTrailingComma, prefix, eol);
        });
        return (code.substring(imported.start, importStart) +
            newImportCode +
            code.substring(importEnd, importEnd + (imported.end - importEnd)));
    }
    formatNamedMembers(namedMembers, useMultipleLines, useSpaces, useTrailingComma, prefix, eol = '\n') {
        if (useMultipleLines) {
            return ('{' +
                eol +
                namedMembers
                    .map(({ name, alias }, index) => {
                    const lastImport = index === namedMembers.length - 1;
                    const comma = !useTrailingComma && lastImport ? '' : ',';
                    if (name === alias) {
                        return `${prefix}${name}${comma}` + eol;
                    }
                    return `${prefix}${name} as ${alias}${comma}` + eol;
                })
                    .join('') +
                '}');
        }
        const space = useSpaces ? ' ' : '';
        const comma = useTrailingComma ? ',' : '';
        return ('{' +
            space +
            namedMembers
                .map(({ name, alias }) => {
                if (name === alias) {
                    return `${name}`;
                }
                return `${name} as ${alias}`;
            })
                .join(', ') +
            comma +
            space +
            '}');
    }
}

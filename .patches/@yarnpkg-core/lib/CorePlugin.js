"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePlugin = void 0;
const tslib_1 = require("tslib");
const MessageName_1 = require("./MessageName");
const structUtils = tslib_1.__importStar(require("./structUtils"));
exports.CorePlugin = {
    hooks: {
        reduceDependency: (dependency, project, locator, initialDependency, { resolver, resolveOptions }) => {
            var _a, _b;
            for (const { pattern, reference } of project.topLevelWorkspace.manifest.resolutions) {
                if (pattern.from) {
                    if (pattern.from.fullName !== structUtils.stringifyIdent(locator))
                        continue;
                    const normalizedFrom = project.configuration.normalizeLocator(structUtils.makeLocator(structUtils.parseIdent(pattern.from.fullName), (_a = pattern.from.description) !== null && _a !== void 0 ? _a : locator.reference));
                    if (normalizedFrom.locatorHash !== locator.locatorHash) {
                        continue;
                    }
                }
                /* All `resolutions` field entries have a descriptor*/ {
                    if (pattern.descriptor.fullName !== structUtils.stringifyIdent(dependency))
                        continue;
                    const normalizedDescriptor = project.configuration.normalizeDependency(structUtils.makeDescriptor(structUtils.parseLocator(pattern.descriptor.fullName), (_b = pattern.descriptor.description) !== null && _b !== void 0 ? _b : dependency.range));
                    if (normalizedDescriptor.descriptorHash !== dependency.descriptorHash) {
                        continue;
                    }
                }
                const alias = resolver.bindDescriptor(project.configuration.normalizeDependency(structUtils.makeDescriptor(dependency, reference)), project.topLevelWorkspace.anchoredLocator, resolveOptions);
                return alias;
            }
            return dependency;
        },
        validateProject: async (project, report) => {
            for (const workspace of project.workspaces) {
                const workspaceName = structUtils.prettyWorkspace(project.configuration, workspace);
                await project.configuration.triggerHook(hooks => {
                    return hooks.validateWorkspace;
                }, workspace, {
                    reportWarning: (name, text) => report.reportWarning(name, `${workspaceName}: ${text}`),
                    reportError: (name, text) => report.reportError(name, `${workspaceName}: ${text}`),
                });
            }
        },
        validateWorkspace: async (workspace, report) => {
            // Validate manifest
            const { manifest } = workspace;
            if (manifest.resolutions.length && workspace.cwd !== workspace.project.cwd)
                manifest.errors.push(new Error(`Resolutions field will be ignored`));
            for (const manifestError of manifest.errors) {
                report.reportWarning(MessageName_1.MessageName.INVALID_MANIFEST, manifestError.message);
            }
        },
    },
};

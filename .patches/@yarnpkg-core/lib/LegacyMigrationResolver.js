"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyMigrationResolver = exports.IMPORTED_PATTERNS = void 0;
const tslib_1 = require("tslib");
const fslib_1 = require("@yarnpkg/fslib");
const parsers_1 = require("@yarnpkg/parsers");
const MessageName_1 = require("./MessageName");
const semverUtils = tslib_1.__importStar(require("./semverUtils"));
const structUtils = tslib_1.__importStar(require("./structUtils"));
exports.IMPORTED_PATTERNS = [
    // These ones come from Git urls
    [/^(git(?:\+(?:https|ssh))?:\/\/.*(?:\.git)?)#(.*)$/, (version, $0, $1, $2) => `${$1}#commit=${$2}`],
    // These ones come from the GitHub HTTP endpoints
    [/^https:\/\/((?:[^/]+?)@)?codeload\.github\.com\/([^/]+\/[^/]+)\/tar\.gz\/([0-9a-f]+)$/, (version, $0, $1 = ``, $2, $3) => `https://${$1}github.com/${$2}.git#commit=${$3}`],
    [/^https:\/\/((?:[^/]+?)@)?github\.com\/([^/]+\/[^/]+?)(?:\.git)?#([0-9a-f]+)$/, (version, $0, $1 = ``, $2, $3) => `https://${$1}github.com/${$2}.git#commit=${$3}`],
    // These ones come from the npm registry
    // Note: /download/ is used by custom registries like Taobao
    [/^https?:\/\/[^/]+\/(?:[^/]+\/)*(?:@.+(?:\/|(?:%2f)))?([^/]+)\/(?:-|download)\/\1-[^/]+\.tgz(?:#|$)/, version => `npm:${version}`],
    // The GitHub package registry uses a different style of URLs
    [/^https:\/\/npm\.pkg\.github\.com\/download\/(?:@[^/]+)\/(?:[^/]+)\/(?:[^/]+)\/(?:[0-9a-f]+)(?:#|$)/, version => `npm:${version}`],
    // FontAwesome too; what is it with these registries that made them think using a different url pattern was a good idea?
    [/^https:\/\/npm\.fontawesome\.com\/(?:@[^/]+)\/([^/]+)\/-\/([^/]+)\/\1-\2.tgz(?:#|$)/, version => `npm:${version}`],
    // JFrog, or Artifactory deployments at arbitrary domain names
    [/^https?:\/\/[^/]+\/.*\/(@[^/]+)\/([^/]+)\/-\/\1\/\2-(?:[.\d\w-]+)\.tgz(?:#|$)/, (version, $0) => structUtils.makeRange({ protocol: `npm:`, source: null, selector: version, params: { __archiveUrl: $0 } })],
    // These ones come from the old Yarn offline mirror - we assume they came from npm
    [/^[^/]+\.tgz#[0-9a-f]+$/, version => `npm:${version}`],
];
class LegacyMigrationResolver {
    constructor(resolver) {
        this.resolver = resolver;
        this.resolutions = null;
    }
    async setup(project, { report }) {
        const lockfilePath = fslib_1.ppath.join(project.cwd, project.configuration.get(`lockfileFilename`));
        // No need to enable it if the lockfile doesn't exist
        if (!fslib_1.xfs.existsSync(lockfilePath))
            return;
        const content = await fslib_1.xfs.readFilePromise(lockfilePath, `utf8`);
        const parsed = (0, parsers_1.parseSyml)(content);
        // No need to enable it either if the lockfile is modern
        if (Object.prototype.hasOwnProperty.call(parsed, `__metadata`))
            return;
        const resolutions = this.resolutions = new Map();
        for (const key of Object.keys(parsed)) {
            const parsedDescriptor = structUtils.tryParseDescriptor(key);
            if (!parsedDescriptor) {
                report.reportWarning(MessageName_1.MessageName.YARN_IMPORT_FAILED, `Failed to parse the string "${key}" into a proper descriptor`);
                continue;
            }
            const descriptor = semverUtils.validRange(parsedDescriptor.range)
                ? structUtils.makeDescriptor(parsedDescriptor, `npm:${parsedDescriptor.range}`)
                : parsedDescriptor;
            const { version, resolved } = parsed[key];
            // Workspaces don't have the "resolved" key; we can skip them, as their
            // resolution will be recomputed when needed anyway
            if (!resolved)
                continue;
            let reference;
            for (const [pattern, matcher] of exports.IMPORTED_PATTERNS) {
                const match = resolved.match(pattern);
                if (match) {
                    reference = matcher(version, ...match);
                    break;
                }
            }
            if (!reference) {
                report.reportWarning(MessageName_1.MessageName.YARN_IMPORT_FAILED, `${structUtils.prettyDescriptor(project.configuration, descriptor)}: Only some patterns can be imported from legacy lockfiles (not "${resolved}")`);
                continue;
            }
            // If the range is a valid descriptor we're dealing with an alias ("foo": "npm:lodash@*")
            // and need to make the locator from that instead of the original descriptor
            let actualDescriptor = descriptor;
            try {
                const parsedRange = structUtils.parseRange(descriptor.range);
                const potentialDescriptor = structUtils.tryParseDescriptor(parsedRange.selector, true);
                if (potentialDescriptor) {
                    actualDescriptor = potentialDescriptor;
                }
            }
            catch { }
            resolutions.set(descriptor.descriptorHash, structUtils.makeLocator(actualDescriptor, reference));
        }
    }
    supportsDescriptor(descriptor, opts) {
        if (!this.resolutions)
            return false;
        return this.resolutions.has(descriptor.descriptorHash);
    }
    supportsLocator(locator, opts) {
        // This resolver only supports the descriptor -> locator part of the
        // resolution, not the locator -> package one.
        return false;
    }
    shouldPersistResolution(locator, opts) {
        throw new Error(`Assertion failed: This resolver doesn't support resolving locators to packages`);
    }
    bindDescriptor(descriptor, fromLocator, opts) {
        return descriptor;
    }
    getResolutionDependencies(descriptor, opts) {
        return {};
    }
    async getCandidates(descriptor, dependencies, opts) {
        if (!this.resolutions)
            throw new Error(`Assertion failed: The resolution store should have been setup`);
        const resolution = this.resolutions.get(descriptor.descriptorHash);
        if (!resolution)
            throw new Error(`Assertion failed: The resolution should have been registered`);
        const importedDescriptor = structUtils.convertLocatorToDescriptor(resolution);
        const normalizedDescriptor = opts.project.configuration.normalizeDependency(importedDescriptor);
        return await this.resolver.getCandidates(normalizedDescriptor, dependencies, opts);
    }
    async getSatisfying(descriptor, dependencies, locators, opts) {
        const [locator] = await this.getCandidates(descriptor, dependencies, opts);
        return {
            locators: locators.filter(candidate => candidate.locatorHash === locator.locatorHash),
            sorted: false,
        };
    }
    async resolve(locator, opts) {
        throw new Error(`Assertion failed: This resolver doesn't support resolving locators to packages`);
    }
}
exports.LegacyMigrationResolver = LegacyMigrationResolver;

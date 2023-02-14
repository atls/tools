"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessageName = exports.stringifyMessageName = exports.MessageName = void 0;
// The values in this enum should never be reassigned, even if some are removed
// over time (it would mess up the search results, which are the whole point of
// having this system)
var MessageName;
(function (MessageName) {
    MessageName[MessageName["UNNAMED"] = 0] = "UNNAMED";
    MessageName[MessageName["EXCEPTION"] = 1] = "EXCEPTION";
    MessageName[MessageName["MISSING_PEER_DEPENDENCY"] = 2] = "MISSING_PEER_DEPENDENCY";
    MessageName[MessageName["CYCLIC_DEPENDENCIES"] = 3] = "CYCLIC_DEPENDENCIES";
    MessageName[MessageName["DISABLED_BUILD_SCRIPTS"] = 4] = "DISABLED_BUILD_SCRIPTS";
    MessageName[MessageName["BUILD_DISABLED"] = 5] = "BUILD_DISABLED";
    MessageName[MessageName["SOFT_LINK_BUILD"] = 6] = "SOFT_LINK_BUILD";
    MessageName[MessageName["MUST_BUILD"] = 7] = "MUST_BUILD";
    MessageName[MessageName["MUST_REBUILD"] = 8] = "MUST_REBUILD";
    MessageName[MessageName["BUILD_FAILED"] = 9] = "BUILD_FAILED";
    MessageName[MessageName["RESOLVER_NOT_FOUND"] = 10] = "RESOLVER_NOT_FOUND";
    MessageName[MessageName["FETCHER_NOT_FOUND"] = 11] = "FETCHER_NOT_FOUND";
    MessageName[MessageName["LINKER_NOT_FOUND"] = 12] = "LINKER_NOT_FOUND";
    MessageName[MessageName["FETCH_NOT_CACHED"] = 13] = "FETCH_NOT_CACHED";
    MessageName[MessageName["YARN_IMPORT_FAILED"] = 14] = "YARN_IMPORT_FAILED";
    MessageName[MessageName["REMOTE_INVALID"] = 15] = "REMOTE_INVALID";
    MessageName[MessageName["REMOTE_NOT_FOUND"] = 16] = "REMOTE_NOT_FOUND";
    MessageName[MessageName["RESOLUTION_PACK"] = 17] = "RESOLUTION_PACK";
    MessageName[MessageName["CACHE_CHECKSUM_MISMATCH"] = 18] = "CACHE_CHECKSUM_MISMATCH";
    MessageName[MessageName["UNUSED_CACHE_ENTRY"] = 19] = "UNUSED_CACHE_ENTRY";
    MessageName[MessageName["MISSING_LOCKFILE_ENTRY"] = 20] = "MISSING_LOCKFILE_ENTRY";
    MessageName[MessageName["WORKSPACE_NOT_FOUND"] = 21] = "WORKSPACE_NOT_FOUND";
    MessageName[MessageName["TOO_MANY_MATCHING_WORKSPACES"] = 22] = "TOO_MANY_MATCHING_WORKSPACES";
    MessageName[MessageName["CONSTRAINTS_MISSING_DEPENDENCY"] = 23] = "CONSTRAINTS_MISSING_DEPENDENCY";
    MessageName[MessageName["CONSTRAINTS_INCOMPATIBLE_DEPENDENCY"] = 24] = "CONSTRAINTS_INCOMPATIBLE_DEPENDENCY";
    MessageName[MessageName["CONSTRAINTS_EXTRANEOUS_DEPENDENCY"] = 25] = "CONSTRAINTS_EXTRANEOUS_DEPENDENCY";
    MessageName[MessageName["CONSTRAINTS_INVALID_DEPENDENCY"] = 26] = "CONSTRAINTS_INVALID_DEPENDENCY";
    MessageName[MessageName["CANT_SUGGEST_RESOLUTIONS"] = 27] = "CANT_SUGGEST_RESOLUTIONS";
    MessageName[MessageName["FROZEN_LOCKFILE_EXCEPTION"] = 28] = "FROZEN_LOCKFILE_EXCEPTION";
    /**
     * @deprecated Virtuals aren't implemented using symlinks anymore. Context: https://github.com/yarnpkg/berry/pull/43#discussion_r269578031
     */
    MessageName[MessageName["CROSS_DRIVE_VIRTUAL_LOCAL"] = 29] = "CROSS_DRIVE_VIRTUAL_LOCAL";
    MessageName[MessageName["FETCH_FAILED"] = 30] = "FETCH_FAILED";
    MessageName[MessageName["DANGEROUS_NODE_MODULES"] = 31] = "DANGEROUS_NODE_MODULES";
    MessageName[MessageName["NODE_GYP_INJECTED"] = 32] = "NODE_GYP_INJECTED";
    MessageName[MessageName["AUTHENTICATION_NOT_FOUND"] = 33] = "AUTHENTICATION_NOT_FOUND";
    MessageName[MessageName["INVALID_CONFIGURATION_KEY"] = 34] = "INVALID_CONFIGURATION_KEY";
    MessageName[MessageName["NETWORK_ERROR"] = 35] = "NETWORK_ERROR";
    MessageName[MessageName["LIFECYCLE_SCRIPT"] = 36] = "LIFECYCLE_SCRIPT";
    MessageName[MessageName["CONSTRAINTS_MISSING_FIELD"] = 37] = "CONSTRAINTS_MISSING_FIELD";
    MessageName[MessageName["CONSTRAINTS_INCOMPATIBLE_FIELD"] = 38] = "CONSTRAINTS_INCOMPATIBLE_FIELD";
    MessageName[MessageName["CONSTRAINTS_EXTRANEOUS_FIELD"] = 39] = "CONSTRAINTS_EXTRANEOUS_FIELD";
    MessageName[MessageName["CONSTRAINTS_INVALID_FIELD"] = 40] = "CONSTRAINTS_INVALID_FIELD";
    MessageName[MessageName["AUTHENTICATION_INVALID"] = 41] = "AUTHENTICATION_INVALID";
    MessageName[MessageName["PROLOG_UNKNOWN_ERROR"] = 42] = "PROLOG_UNKNOWN_ERROR";
    MessageName[MessageName["PROLOG_SYNTAX_ERROR"] = 43] = "PROLOG_SYNTAX_ERROR";
    MessageName[MessageName["PROLOG_EXISTENCE_ERROR"] = 44] = "PROLOG_EXISTENCE_ERROR";
    MessageName[MessageName["STACK_OVERFLOW_RESOLUTION"] = 45] = "STACK_OVERFLOW_RESOLUTION";
    MessageName[MessageName["AUTOMERGE_FAILED_TO_PARSE"] = 46] = "AUTOMERGE_FAILED_TO_PARSE";
    MessageName[MessageName["AUTOMERGE_IMMUTABLE"] = 47] = "AUTOMERGE_IMMUTABLE";
    MessageName[MessageName["AUTOMERGE_SUCCESS"] = 48] = "AUTOMERGE_SUCCESS";
    MessageName[MessageName["AUTOMERGE_REQUIRED"] = 49] = "AUTOMERGE_REQUIRED";
    MessageName[MessageName["DEPRECATED_CLI_SETTINGS"] = 50] = "DEPRECATED_CLI_SETTINGS";
    MessageName[MessageName["PLUGIN_NAME_NOT_FOUND"] = 51] = "PLUGIN_NAME_NOT_FOUND";
    MessageName[MessageName["INVALID_PLUGIN_REFERENCE"] = 52] = "INVALID_PLUGIN_REFERENCE";
    MessageName[MessageName["CONSTRAINTS_AMBIGUITY"] = 53] = "CONSTRAINTS_AMBIGUITY";
    MessageName[MessageName["CACHE_OUTSIDE_PROJECT"] = 54] = "CACHE_OUTSIDE_PROJECT";
    MessageName[MessageName["IMMUTABLE_INSTALL"] = 55] = "IMMUTABLE_INSTALL";
    MessageName[MessageName["IMMUTABLE_CACHE"] = 56] = "IMMUTABLE_CACHE";
    MessageName[MessageName["INVALID_MANIFEST"] = 57] = "INVALID_MANIFEST";
    MessageName[MessageName["PACKAGE_PREPARATION_FAILED"] = 58] = "PACKAGE_PREPARATION_FAILED";
    MessageName[MessageName["INVALID_RANGE_PEER_DEPENDENCY"] = 59] = "INVALID_RANGE_PEER_DEPENDENCY";
    MessageName[MessageName["INCOMPATIBLE_PEER_DEPENDENCY"] = 60] = "INCOMPATIBLE_PEER_DEPENDENCY";
    MessageName[MessageName["DEPRECATED_PACKAGE"] = 61] = "DEPRECATED_PACKAGE";
    /**
     * @deprecated Use {@link INCOMPATIBLE_ARCHITECTURE}
     */
    MessageName[MessageName["INCOMPATIBLE_OS"] = 62] = "INCOMPATIBLE_OS";
    /**
     * @deprecated Use {@link INCOMPATIBLE_ARCHITECTURE}
     */
    MessageName[MessageName["INCOMPATIBLE_CPU"] = 63] = "INCOMPATIBLE_CPU";
    MessageName[MessageName["FROZEN_ARTIFACT_EXCEPTION"] = 64] = "FROZEN_ARTIFACT_EXCEPTION";
    MessageName[MessageName["TELEMETRY_NOTICE"] = 65] = "TELEMETRY_NOTICE";
    MessageName[MessageName["PATCH_HUNK_FAILED"] = 66] = "PATCH_HUNK_FAILED";
    MessageName[MessageName["INVALID_CONFIGURATION_VALUE"] = 67] = "INVALID_CONFIGURATION_VALUE";
    MessageName[MessageName["UNUSED_PACKAGE_EXTENSION"] = 68] = "UNUSED_PACKAGE_EXTENSION";
    MessageName[MessageName["REDUNDANT_PACKAGE_EXTENSION"] = 69] = "REDUNDANT_PACKAGE_EXTENSION";
    MessageName[MessageName["AUTO_NM_SUCCESS"] = 70] = "AUTO_NM_SUCCESS";
    MessageName[MessageName["NM_CANT_INSTALL_EXTERNAL_SOFT_LINK"] = 71] = "NM_CANT_INSTALL_EXTERNAL_SOFT_LINK";
    MessageName[MessageName["NM_PRESERVE_SYMLINKS_REQUIRED"] = 72] = "NM_PRESERVE_SYMLINKS_REQUIRED";
    MessageName[MessageName["UPDATE_LOCKFILE_ONLY_SKIP_LINK"] = 73] = "UPDATE_LOCKFILE_ONLY_SKIP_LINK";
    MessageName[MessageName["NM_HARDLINKS_MODE_DOWNGRADED"] = 74] = "NM_HARDLINKS_MODE_DOWNGRADED";
    MessageName[MessageName["PROLOG_INSTANTIATION_ERROR"] = 75] = "PROLOG_INSTANTIATION_ERROR";
    MessageName[MessageName["INCOMPATIBLE_ARCHITECTURE"] = 76] = "INCOMPATIBLE_ARCHITECTURE";
    MessageName[MessageName["GHOST_ARCHITECTURE"] = 77] = "GHOST_ARCHITECTURE";
    MessageName[MessageName["RESOLUTION_MISMATCH"] = 78] = "RESOLUTION_MISMATCH";
    MessageName[MessageName["PROLOG_LIMIT_EXCEEDED"] = 79] = "PROLOG_LIMIT_EXCEEDED";
    MessageName[MessageName["NETWORK_DISABLED"] = 80] = "NETWORK_DISABLED";
    MessageName[MessageName["NETWORK_UNSAFE_HTTP"] = 81] = "NETWORK_UNSAFE_HTTP";
    MessageName[MessageName["RESOLUTION_FAILED"] = 82] = "RESOLUTION_FAILED";
    MessageName[MessageName["AUTOMERGE_GIT_ERROR"] = 83] = "AUTOMERGE_GIT_ERROR";
    MessageName[MessageName["CONSTRAINTS_CHECK_FAILED"] = 84] = "CONSTRAINTS_CHECK_FAILED";
})(MessageName = exports.MessageName || (exports.MessageName = {}));
function stringifyMessageName(name) {
    return `YN${name.toString(10).padStart(4, `0`)}`;
}
exports.stringifyMessageName = stringifyMessageName;
function parseMessageName(messageName) {
    const parsed = Number(messageName.slice(2));
    if (typeof MessageName[parsed] === `undefined`)
        throw new Error(`Unknown message name: "${messageName}"`);
    return parsed;
}
exports.parseMessageName = parseMessageName;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSource = exports.getValueByTree = exports.getValue = exports.resolveRcFiles = exports.RESOLVED_RC_FILE = void 0;
// waiting for Typescript support: https://github.com/microsoft/TypeScript/issues/48829
const findLastIndex = (array, predicate, thisArg) => {
    const reversedArray = [...array];
    reversedArray.reverse();
    return reversedArray.findIndex(predicate, thisArg);
};
function isObject(data) {
    return typeof data === `object` && data !== null && !Array.isArray(data);
}
var ValueType;
(function (ValueType) {
    ValueType[ValueType["Object"] = 0] = "Object";
    ValueType[ValueType["Array"] = 1] = "Array";
    ValueType[ValueType["Literal"] = 2] = "Literal";
    ValueType[ValueType["Undefined"] = 3] = "Undefined";
})(ValueType || (ValueType = {}));
function getValueType(data) {
    if (typeof data === `undefined`)
        return ValueType.Undefined;
    if (isObject(data))
        return ValueType.Object;
    if (Array.isArray(data))
        return ValueType.Array;
    return ValueType.Literal;
}
function hasProperty(data, key) {
    return Object.prototype.hasOwnProperty.call(data, key);
}
function isConflictMarker(data) {
    return isObject(data) && hasProperty(data, `onConflict`) && typeof data.onConflict === `string`;
}
function normalizeValue(data) {
    if (typeof data === `undefined`)
        return { onConflict: `default`, value: data };
    if (!isConflictMarker(data))
        return { onConflict: `default`, value: data };
    if (hasProperty(data, `value`))
        return data;
    const { onConflict, ...value } = data;
    return { onConflict, value };
}
function getNormalized(data, key) {
    const rawValue = isObject(data) && hasProperty(data, key)
        ? data[key]
        : undefined;
    return normalizeValue(rawValue);
}
// symbol is used in runtime to identify this as a tuple type
exports.RESOLVED_RC_FILE = Symbol();
function resolvedRcFile(id, value) {
    return [id, value, exports.RESOLVED_RC_FILE];
}
function isResolvedRcFile(value) {
    if (!Array.isArray(value))
        return false;
    return value[2] === exports.RESOLVED_RC_FILE;
}
function attachIdToTree(data, id) {
    if (isObject(data)) {
        const result = {};
        for (const key of Object.keys(data))
            result[key] = attachIdToTree(data[key], id);
        return resolvedRcFile(id, result);
    }
    if (Array.isArray(data))
        return resolvedRcFile(id, data.map(item => attachIdToTree(item, id)));
    return resolvedRcFile(id, data);
}
function resolveValueAt(rcFiles, path, key, firstVisiblePosition, resolveAtPosition) {
    let expectedValueType;
    const relevantValues = [];
    let lastRelevantPosition = resolveAtPosition;
    let currentResetPosition = 0;
    for (let t = resolveAtPosition - 1; t >= firstVisiblePosition; --t) {
        const [id, data] = rcFiles[t];
        const { onConflict, value } = getNormalized(data, key);
        const valueType = getValueType(value);
        if (valueType === ValueType.Undefined)
            continue;
        expectedValueType !== null && expectedValueType !== void 0 ? expectedValueType : (expectedValueType = valueType);
        if (valueType !== expectedValueType || onConflict === `hardReset`) {
            currentResetPosition = lastRelevantPosition;
            break;
        }
        if (valueType === ValueType.Literal)
            return resolvedRcFile(id, value);
        relevantValues.unshift([id, value]);
        if (onConflict === `reset`) {
            currentResetPosition = t;
            break;
        }
        if (onConflict === `extend` && t === firstVisiblePosition)
            firstVisiblePosition = 0;
        lastRelevantPosition = t;
    }
    if (typeof expectedValueType === `undefined`)
        return null;
    const source = relevantValues.map(([relevantId]) => relevantId).join(`, `);
    switch (expectedValueType) {
        case ValueType.Array:
            return resolvedRcFile(source, new Array().concat(...relevantValues.map(([id, value]) => value.map(item => attachIdToTree(item, id)))));
        case ValueType.Object: {
            const conglomerate = Object.assign({}, ...relevantValues.map(([, value]) => value));
            const keys = Object.keys(conglomerate);
            const result = {};
            const nextIterationValues = rcFiles.map(([id, data]) => {
                return [id, getNormalized(data, key).value];
            });
            const hardResetLocation = findLastIndex(nextIterationValues, ([_, value]) => {
                const valueType = getValueType(value);
                return valueType !== ValueType.Object && valueType !== ValueType.Undefined;
            });
            if (hardResetLocation !== -1) {
                const slice = nextIterationValues.slice(hardResetLocation + 1);
                for (const key of keys) {
                    result[key] = resolveValueAt(slice, path, key, 0, slice.length);
                }
            }
            else {
                for (const key of keys) {
                    result[key] = resolveValueAt(nextIterationValues, path, key, currentResetPosition, nextIterationValues.length);
                }
            }
            return resolvedRcFile(source, result);
        }
        default:
            throw new Error(`Assertion failed: Non-extendable value type`);
    }
}
// Given an array of configuration files represented as tuples, which each
// contains both an ID (for example the configuration file path) and an
// arbitrary value, this function will traverse the whole tree to resolve
// all `onConflict` directives.
//
// The returned value will recursively be turned into tuples, which each
// contain both the ID of the configuration file that contributed the last
// entry to the value and the final value.
//
function resolveRcFiles(rcFiles) {
    return resolveValueAt(rcFiles.map(([source, data]) => [source, { [`.`]: data }]), [], `.`, 0, rcFiles.length);
}
exports.resolveRcFiles = resolveRcFiles;
function getValue(value) {
    return isResolvedRcFile(value) ? value[1] : value;
}
exports.getValue = getValue;
function getValueByTree(valueBase) {
    const value = isResolvedRcFile(valueBase) ? valueBase[1] : valueBase;
    if (Array.isArray(value))
        return value.map(v => getValueByTree(v));
    if (isObject(value)) {
        const result = {};
        for (const [propKey, propValue] of Object.entries(value))
            result[propKey] = getValueByTree(propValue);
        return result;
    }
    return value;
}
exports.getValueByTree = getValueByTree;
function getSource(value) {
    return isResolvedRcFile(value) ? value[0] : null;
}
exports.getSource = getSource;
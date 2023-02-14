/// <reference types="node" />
import { Writable } from 'stream';
import { Configuration } from './Configuration';
import * as formatUtils from './formatUtils';
export type TreeNode = {
    label?: string;
    value?: formatUtils.Tuple;
    children?: Array<TreeNode> | TreeMap;
};
export type TreeRoot = TreeNode & {
    children: Array<TreeNode>;
};
export type TreeMap = {
    [key: string]: TreeNode;
};
export type TreeifyNode = {
    [key: string]: TreeifyNode;
};
export declare function treeNodeToTreeify(printTree: TreeNode, { configuration }: {
    configuration: Configuration;
}): {};
export declare function treeNodeToJson(printTree: TreeNode): any;
export declare function emitList(values: Array<formatUtils.Tuple>, { configuration, stdout, json }: {
    configuration: Configuration;
    stdout: Writable;
    json: boolean;
}): void;
export declare function emitTree(tree: TreeNode, { configuration, stdout, json, separators }: {
    configuration: Configuration;
    stdout: Writable;
    json: boolean;
    separators?: number;
}): void;

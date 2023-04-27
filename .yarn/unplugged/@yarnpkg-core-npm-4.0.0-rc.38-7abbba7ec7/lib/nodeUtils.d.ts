export declare const openUrl: ((url: string) => Promise<boolean>) | undefined;
export declare function builtinModules(): Set<string>;
export type Architecture = {
    os: string;
    cpu: string;
    libc: string | null;
};
export type ArchitectureSet = {
    os: Array<string> | null;
    cpu: Array<string> | null;
    libc: Array<string> | null;
};
export declare function getArchitecture(): Architecture;
export declare function getArchitectureName(architecture?: Architecture): string;
export declare function getArchitectureSet(): ArchitectureSet;
export type Caller = {
    file: string | null;
    methodName: string;
    arguments: Array<string>;
    line: number | null;
    column: number | null;
};
export declare function getCaller(): Caller | null;
export declare function availableParallelism(): any;
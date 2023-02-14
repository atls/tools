/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { PortablePath, BufferEncodingOrBuffer } from '@yarnpkg/fslib';
import { Readable, Writable } from 'stream';
import { ReportError } from './Report';
export declare enum EndStrategy {
    Never = 0,
    ErrorCode = 1,
    Always = 2
}
export type PipevpOptions = {
    cwd: PortablePath;
    env?: {
        [key: string]: string | undefined;
    };
    end?: EndStrategy;
    strict?: boolean;
    stdin: Readable | null;
    stdout: Writable;
    stderr: Writable;
};
export type PipeErrorOptions = {
    fileName: string;
    code: number | null;
    signal: NodeJS.Signals | null;
};
export declare class PipeError extends ReportError {
    code: number;
    constructor({ fileName, code, signal }: PipeErrorOptions);
}
export type ExecErrorOptions = PipeErrorOptions & {
    stdout: Buffer | string;
    stderr: Buffer | string;
};
export declare class ExecError extends PipeError {
    stdout: Buffer | string;
    stderr: Buffer | string;
    constructor({ fileName, code, signal, stdout, stderr }: ExecErrorOptions);
}
export declare function pipevp(fileName: string, args: Array<string>, { cwd, env, strict, stdin, stdout, stderr, end }: PipevpOptions): Promise<{
    code: number;
}>;
export type ExecvpOptions = {
    cwd: PortablePath;
    env?: {
        [key: string]: string | undefined;
    };
    encoding?: BufferEncodingOrBuffer;
    strict?: boolean;
};
export declare function execvp(fileName: string, args: Array<string>, opts: ExecvpOptions & {
    encoding: 'buffer';
}): Promise<{
    code: number;
    stdout: Buffer;
    stderr: Buffer;
}>;
export declare function execvp(fileName: string, args: Array<string>, opts: ExecvpOptions & {
    encoding: string;
}): Promise<{
    code: number;
    stdout: string;
    stderr: string;
}>;
export declare function execvp(fileName: string, args: Array<string>, opts: ExecvpOptions): Promise<{
    code: number;
    stdout: string;
    stderr: string;
}>;

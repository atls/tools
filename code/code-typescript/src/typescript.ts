import { readFile }             from 'node:fs/promises'

import type { Diagnostic }      from 'typescript'
import type { CompilerOptions } from 'typescript'

import deepmerge                from 'deepmerge'
import ts                       from 'typescript'
import { join }                 from 'path'

import tsconfig                 from '@atls/config-typescript'

class TypeScript {
  constructor(private readonly cwd: string) {}

  private async getProjectIgnorePatterns(): Promise<Array<string>> {
    const content = await readFile(join(this.cwd, 'package.json'), 'utf-8')

    const { typecheckIgnorePatterns = [] } = JSON.parse(content)

    return typecheckIgnorePatterns
  }

  check(include: Array<string> = []): Promise<Array<Diagnostic>> {
    return this.run(include)
  }

  build(
    include: Array<string> = [],
    override: Partial<CompilerOptions> = {}
  ): Promise<Array<Diagnostic>> {
    return this.run(include, override, false)
  }

  private async run(
    include: Array<string> = [],
    override: Partial<CompilerOptions> = {},
    noEmit = true
  ): Promise<Array<Diagnostic>> {
    const projectIgnorePatterns = await this.getProjectIgnorePatterns()

    const config = deepmerge(
      tsconfig,
      { compilerOptions: override, exclude: [...tsconfig.exclude, ...projectIgnorePatterns] },
      {
        include,
      } as any
    )

    const { fileNames, options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, this.cwd)

    if (errors?.length > 0) {
      return errors
    }

    const program = ts.createProgram(fileNames, {
      ...options,
      noEmit,
    })

    const result = program.emit()

    return ts.getPreEmitDiagnostics(program).concat(result.diagnostics)
  }
}

export { TypeScript }

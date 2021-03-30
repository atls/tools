import { Cli } from 'clipanion'
import { TypecheckCommand } from '../src'

import { version } from '../package.json'
import { readFileSync, writeFileSync } from "fs";

const readBadFile = () => readFileSync(`${__dirname}/mocks/bad-typecheck.ts`)
const writeBadFile = content =>writeFileSync(`${__dirname}/mocks/bad-typecheck.ts`, content)

describe('actl-typecheck', () => {
  // @ts-ignore
  jest.spyOn(process, 'exit').mockImplementation(jest.fn())

  const badTypecheckBackup = readBadFile()


  const [node, app, ...args] = process.argv

  const cli = new Cli({
    binaryLabel: `Actl-Typecheck Test`,
    binaryName: `${node} ${app}`,
    binaryVersion: version,
  })

  cli.register(TypecheckCommand)

  it('should run all typechecks', () => {
    cli.run(['typecheck'], Cli.defaultContext)
      .then(() => writeBadFile(badTypecheckBackup))
    cli.runExit(args, Cli.defaultContext)
      .then(() => {
        expect(process.exitCode).toBe(1 || 2)
        expect(process.exitCode).not.toBe(0)
      })
  })
})
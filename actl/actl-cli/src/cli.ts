import { Cli }                    from 'clipanion'

import { CommitCommand }          from '@atls/actl-commit'
import { FormatCommand }          from '@atls/actl-format'
import { LibraryBuildCommand }    from '@atls/actl-library'
import { LintCommand }            from '@atls/actl-lint'
import { ServiceBuildCommand }    from '@atls/actl-service'
import { ServiceDevCommand }      from '@atls/actl-service'
import { RendererBuildCommand }   from '@atls/actl-renderer'
import { RendererDevCommand }     from '@atls/actl-renderer'
import { TestIntegrationCommand } from '@atls/actl-test'
import { TestUnitCommand }        from '@atls/actl-test'
import { TypeCheckCommand }       from '@atls/actl-typecheck'

import { binaryVersion }          from './constants'

const run = () => {
  const cli = new Cli({
    binaryLabel: `Atlantis Command Line Interface`,
    binaryName: `actl`,
    binaryVersion,
  })

  cli.register(LintCommand)
  cli.register(FormatCommand)
  cli.register(TypeCheckCommand)

  cli.register(TestIntegrationCommand)
  cli.register(TestUnitCommand)

  cli.register(CommitCommand)

  cli.register(ServiceBuildCommand)
  cli.register(ServiceDevCommand)

  cli.register(RendererBuildCommand)
  cli.register(RendererDevCommand)

  cli.register(LibraryBuildCommand)

  cli
    .runExit(process.argv.slice(2), {
      stdin: process.stdin,
      stdout: process.stdout,
      stderr: process.stderr,
    })
    .catch((error) => {
      process.stdout.write(error.stack || error.message)
      process.exitCode = 1
    })
    .finally(() => process.exit())
}

export { run }

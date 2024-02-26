import { BaseCommand }                    from '@yarnpkg/cli'
import { Configuration }                  from '@yarnpkg/core'
import { Project }                        from '@yarnpkg/core'
import { MessageName }                    from '@yarnpkg/core'
import { StreamReport }                   from '@yarnpkg/core'
import { xfs }                            from '@yarnpkg/fslib'
import { npath }                          from '@yarnpkg/fslib'
// @ts-ignore
import { renderForm }                     from '@yarnpkg/libui/sources/misc/renderForm'

import React                              from 'react'
import { forceStdinTty }                  from 'force-stdin-tty'

import { ErrorInfo }                      from '@atls/cli-ui-error-info-component'
import { SubmitInjectedComponentFactory } from '@atls/cli-ui-parts'
import { RequestProjectInformation }      from '@atls/cli-ui-schematics-component'
import { ProjectInformationProperties }   from '@atls/cli-ui-schematics-component'
import { SchematicsWorker }               from '@atls/code-schematics-worker'
import { SpinnerProgress }                from '@atls/yarn-run-utils'
import { renderStatic }                   from '@atls/cli-ui-renderer'

class GenerateProjectCommand extends BaseCommand {
  static paths = [['generate', 'project']]

  private async requestOptions(): Promise<ProjectInformationProperties | undefined> {
    const overwroteStdin = forceStdinTty()

    const options: ProjectInformationProperties | undefined = await renderForm(
      // @ts-ignore
      SubmitInjectedComponentFactory<ProjectInformationProperties>(RequestProjectInformation),
      {},
      {
        stdin: this.context.stdin,
        stdout: this.context.stdout,
        stderr: this.context.stderr,
      }
    )

    if (overwroteStdin) {
      process.stdin.destroy()
    }

    return options
  }

  async execute() {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins)
    const { project, workspace } = await Project.find(configuration, this.context.cwd)

    const options = await this.requestOptions()

    if (!options) {
      return 1
    }

    const schematics = new SchematicsWorker(project.cwd)

    const commandReport = await StreamReport.start(
      {
        stdout: this.context.stdout,
        configuration,
      },
      async (report) => {
        await report.startTimerPromise('Init Project', async () => {
          const progress = new SpinnerProgress(this.context.stdout, configuration)

          progress.start()

          try {
            const events = await schematics.generate('project', options)

            progress.end()

            events.forEach((event) => {
              const eventPath = event.path.startsWith('/') ? event.path.slice(1) : event.path

              if (event.kind === 'error') {
                report.reportError(MessageName.UNNAMED, `${eventPath}: ${event.description}`)
              } else {
                report.reportInfo(MessageName.UNNAMED, `${eventPath}: ${event.kind}`)
              }
            })

            await xfs.writeJsonPromise(
              npath.toPortablePath(
                npath.join(npath.fromPortablePath(workspace!.cwd), 'package.json')
              ),
              {
                ...workspace!.manifest.raw,
                tools: {
                  schematic: {
                    collection: '@atls/schematics',
                    schematic: 'project',
                    type: options.type,
                    migration: String(Date.now()),
                  },
                },
              }
            )
          } catch (error) {
            progress.end()

            renderStatic(<ErrorInfo error={error as Error} />, process.stdout.columns - 12)
              .split('\n')
              .forEach((line) => {
                report.reportError(MessageName.UNNAMED, line)
              })
          }
        })
      }
    )

    return commandReport.exitCode()
  }
}

export { GenerateProjectCommand }

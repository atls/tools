import { PassThrough }         from 'node:stream'

import webpack                 from 'webpack'
import { Watching }            from 'webpack'

import { StartServerPlugin }   from '@atls/webpack-start-server-plugin'

import { WebpackConfigPlugin } from './webpack'
import { WebpackConfig }       from './webpack.config'

export interface ServiceBuildResultMessage {
  message: string
}

export interface ServiceBuildResult {
  errors: ServiceBuildResultMessage[]
  warnings: ServiceBuildResultMessage[]
}

export class Service {
  constructor(private readonly cwd: string) {}

  async build(plugins: Array<WebpackConfigPlugin> = []): Promise<ServiceBuildResult> {
    const config = new WebpackConfig(this.cwd)

    const compiler = webpack(await config.build())

    return new Promise((resolve, reject) => {
      compiler.run((error, stats) => {
        if (error) {
          if (!error.message) {
            reject(error)
          } else {
            resolve({
              errors: [{ message: error.message }],
              warnings: [],
            })
          }
        } else if (stats) {
          const { errors = [], warnings = [] } = stats.toJson()

          resolve({
            // eslint-disable-next-line
            errors: errors.map((error) => ({ message: error.message })),
            warnings: warnings.map((warning) => ({ message: warning.message })),
          })
        } else {
          resolve({
            errors: [],
            warnings: [],
          })
        }
      })
    })
  }

  async watch(callback?): Promise<Watching> {
    const config = new WebpackConfig(this.cwd)

    const pass = new PassThrough()

    pass.on('data', (chunk) => {
      chunk
        .toString()
        .split(/\r?\n/)
        .filter(Boolean)
        .forEach((row) => {
          try {
            callback(JSON.parse(row))
          } catch {
            callback({ body: row })
          }
        })
    })

    return webpack(
      await config.build('development', [
        {
          name: 'start-server',
          use: StartServerPlugin,
          args: [
            {
              stdout: pass,
              stderr: pass,
            },
          ],
        },
      ])
    ).watch({}, (error, stats) => {
      if (error) {
        callback({
          severityText: 'ERROR',
          body: error.message || error,
        })
      } else if (stats) {
        const { errors = [], warnings = [] } = stats.toJson()

        warnings.forEach((warning) =>
          callback({
            severityText: 'WARN',
            body: warning.message,
          }))

        errors.forEach((err) =>
          callback({
            severityText: 'ERROR',
            body: err.message,
          }))
      }
    })
  }
}
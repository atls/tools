import Config           from 'webpack-chain'
import path             from 'path'
import webpack          from 'webpack'

import { base }         from '@atls/code-typescript'

import { getExternals } from './externals'

export interface WebpackConfigPlugin {
  name: string
  use: any
  args: any[]
}

export const createWebpackConfig = async (
  cwd,
  environment,
  plugins: WebpackConfigPlugin[] = []
) => {
  const externals = (await getExternals(cwd)).reduce(
    // @ts-ignore
    (result, dependency: string) => ({
      ...result,
      [dependency]: `commonjs2 ${dependency}`,
    }),
    {}
  )

  const config = new Config()

  config
    .mode(environment)
    .bail(environment === 'production')
    .target('async-node')
    .optimization.minimize(false)

  config.node.set('__dirname', false).set('__filename', false)

  config.entry('index').add(path.join(cwd, 'src/index'))

  config.output.path(path.join(cwd, 'dist')).filename('[name].js')

  config.resolve.extensions.add('.tsx').add('.ts').add('.js')

  config.externals(externals)

  config.when(environment === 'development', () => {
    config.plugin('hot').use(webpack.HotModuleReplacementPlugin)
  })

  plugins.forEach((plugin) => {
    config.plugin(plugin.name).use(plugin.use, plugin.args)
  })

  config.module
    .rule('ts')
    .test(/.tsx?$/)
    .use('ts')
    .loader(require.resolve('ts-loader'))
    .options({
      transpileOnly: true,
      experimentalWatchApi: true,
      compilerOptions: { ...base.compilerOptions, sourceMap: true },
      configFile: path.join(__dirname, '../../tsconfig.stub.json'),
    })

  config.module
    .rule('protos')
    .test(/\.proto$/)
    .use('proto')
    .loader(require.resolve('@atls/webpack-proto-imports-loader'))

  config.devtool(
    environment === 'production' ? 'source-map' : ('eval-cheap-module-source-map' as any)
  )

  return config.toConfig()
}
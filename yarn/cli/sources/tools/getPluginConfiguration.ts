import packageJson             from '@yarnpkg/cli/package.json'
import { PluginConfiguration } from '@yarnpkg/core'

import { getDynamicLibs }      from './getDynamicLibs.js'

export async function getPluginConfiguration(): Promise<PluginConfiguration> {
  const plugins = new Set<string>()
  for (const dependencyName of packageJson[`@yarnpkg/builder`].bundles.standard)
    plugins.add(dependencyName)

  const modules = getDynamicLibs()
  for (const plugin of plugins) modules.set(plugin, (await import(plugin)).default)

  return { plugins, modules }
}

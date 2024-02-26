import { Configuration }          from '@yarnpkg/core'
import { Project }                from '@yarnpkg/core'
import { PortablePath }           from '@yarnpkg/fslib'

import { WorkspaceRequiredError } from './WorkspaceRequiredError.js'

export async function openWorkspace(configuration: Configuration, cwd: PortablePath) {
  const { project, workspace } = await Project.find(configuration, cwd)

  if (!workspace) throw new WorkspaceRequiredError(project.cwd, cwd)

  return workspace
}

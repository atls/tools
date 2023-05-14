import { Manifest } from '@yarnpkg/core';
import { Report } from '@yarnpkg/core';
import { ppath } from '@yarnpkg/fslib';
import { xfs } from '@yarnpkg/fslib';
import { packUtils } from '@yarnpkg/plugin-pack';
export const clearUnusedWorkspaces = (project, workspaces, production = false) => {
    for (const ws of project.workspaces) {
        if (workspaces.has(ws)) {
            if (production) {
                ws.manifest.devDependencies.clear();
            }
        }
        else {
            ws.manifest.dependencies.clear();
            ws.manifest.devDependencies.clear();
            ws.manifest.peerDependencies.clear();
        }
    }
};
export const getRequiredWorkspaces = (project, workspaces, production = false, scopes = production ? ['dependencies'] : Manifest.hardDependencies) => {
    const requiredWorkspaces = new Set([...workspaces]);
    for (const ws of requiredWorkspaces) {
        for (const scope of scopes) {
            const deps = ws.manifest.getForScope(scope).values();
            for (const dep of deps) {
                const workspace = project.tryWorkspaceByDescriptor(dep);
                if (workspace) {
                    requiredWorkspaces.add(workspace);
                }
            }
        }
    }
    return requiredWorkspaces;
};
export const packWorkspace = async (workspace, destination, report, overwrite = false) => {
    await packUtils.prepareForPack(workspace, { report }, async () => {
        const files = await packUtils.genPackList(workspace);
        const progress = Report.progressViaCounter(files.length);
        const reportedProgress = report.reportProgress(progress);
        try {
            for await (const file of files) {
                const src = ppath.join(workspace.cwd, file);
                const dest = ppath.join(destination, workspace.relativeCwd, file);
                report.reportInfo(null, file);
                await xfs.copyPromise(dest, src, { overwrite });
                progress.tick();
            }
        }
        finally {
            reportedProgress.stop();
        }
    });
};

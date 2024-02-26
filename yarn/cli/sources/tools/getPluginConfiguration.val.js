/* eslint-disable arrow-body-style */
// Note that this file isn't the real export - it is run at build-time and its
// return value is what's used within the bundle (cf val-loader).

export default ({ modules, plugins }) => {
  const importSegment = modules.map((request, index) => {
    return `import * as _${index} from ${JSON.stringify(request)};\n`;
  }).join(``);

  const moduleSegment = `  modules: new Map([\n${modules.map(async (request, index) => {
    return `    [${JSON.stringify(await import(`${request}/package.json`).name)}, _${index}],\n`;
  }).join(``)}  ]),\n`;

  const pluginSegment = `  plugins: new Set([\n${plugins.map(async request => {
    return `    ${JSON.stringify(await import(`${request}/package.json`).name)},\n`;
  }).join(``)}  ]),\n`;

  return {
    code: [
      importSegment,
      `export const getPluginConfiguration = () => ({\n`,
      moduleSegment,
      pluginSegment,
      `});\n`,
    ].join(`\n`),
  };
}

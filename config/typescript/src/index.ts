export const tsConfig = {
  compilerOptions: {
    lib: ['dom', 'dom.iterable', 'esnext'],

    emitDecoratorMetadata: true,

    declaration: false,
    experimentalDecorators: true,

    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    importHelpers: false,
    isolatedModules: false,
    moduleResolution: 'NodeNext',
    noFallthroughCasesInSwitch: true,

    noImplicitAny: false,
    noImplicitReturns: false,
    noImplicitThis: false,

    noUnusedLocals: false,
    noUnusedParameters: false,

    pretty: true,
    removeComments: true,
    resolveJsonModule: true,

    strict: true,
    strictPropertyInitialization: false,

    sourceMap: false,

    module: 'NodeNext',
    target: 'es2023',

    jsx: 'react',
    outDir: './dist',
  },
  exclude: [
    'integration',
    'node_modules',
    'src/**/*.spec.ts',
    'src/**/*.test.ts',
    'src/**/*.story.ts',
    'src/**/*.stories.ts',
    '**/*/dist/**/*.d.ts',
    'integration/**/*.test.ts',
  ],
}

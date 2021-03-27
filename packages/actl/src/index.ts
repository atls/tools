#!/usr/bin/env node

import { Cli }         from 'clipanion'

import { LintCommand } from '@atlantis-lab/actl-lint'

const [node, app, ...args] = process.argv

const cli = new Cli({
  binaryLabel: `Atlantis Controls Temporal Logic`,
  binaryName: `${node} ${app}`,
  binaryVersion: require('../package.json').version,
})

cli.register(LintCommand)
cli.runExit(args, Cli.defaultContext)

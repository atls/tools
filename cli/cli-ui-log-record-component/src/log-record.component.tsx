import type { Record }  from '@atls/logger'

import React            from 'react'
import { Box }          from 'ink'

import { LogBody }      from './log-body.component.js'
import { LogMessage }   from './log-message.component.js'
import { LogNamespace } from './log-namespace.component.js'

export interface LogRecordProps extends Partial<Record> {}

export const LogRecord = ({ severityText = 'TRACE', name, body }: LogRecordProps) => (
  <Box flexDirection='column'>
    <Box flexDirection='row'>
      <Box flexGrow={1}>
        <Box paddingRight={1}>{name && <LogNamespace>{name}</LogNamespace>}</Box>
        <Box>
          <LogMessage>{body}</LogMessage>
        </Box>
      </Box>
    </Box>
    <LogBody>{body}</LogBody>
  </Box>
)

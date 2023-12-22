import { parse }          from '@atls/stack-trace'

import React              from 'react'
import { Text }           from 'ink'
import { Box }            from 'ink'
import { Spacer }         from 'ink'
import { FC }             from 'react'
import { useMemo }        from 'react'

import { SourcePreview }  from '@atls/cli-ui-source-component-new'

import { getFrameSource } from './utils'

export interface StackTraceProps {
  children: string
}

// @ts-ignore
export const StackTrace: FC<StackTraceProps> = ({ children }) => {
  const stack = useMemo(() => parse(children), [children])
  const source = useMemo(() => (stack?.topFrame ? getFrameSource(stack.topFrame) : null), [stack])

  if (!stack) {
    return null
  }

  return (
    <Box flexDirection='column' flexGrow={1}>
      {source && stack?.topFrame?.line && (
        <Box>
          <SourcePreview line={stack?.topFrame?.line} column={stack?.topFrame?.column}>
            {source}
          </SourcePreview>
        </Box>
      )}
      {stack.frames.map((frame: any, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={`${frame.file}-${frame.line}-${frame.column}-${index}`} justifyContent='flex-end'>
          <Text>{frame.function}</Text>
          <Spacer />
          <Text color='gray'>{frame.file}</Text>
          {frame.line && <Text color='gray'>:{frame.line}</Text>}
          {frame.column && <Text color='gray'>:{frame.column}</Text>}
        </Box>
      ))}
    </Box>
  )
}

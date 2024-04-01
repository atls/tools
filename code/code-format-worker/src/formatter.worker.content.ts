import { brotliDecompressSync } from 'zlib'

let hook

export const getContent = () => {
  if (typeof hook === `undefined`)
    hook = brotliDecompressSync(
      Buffer.from(
        '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',
        'base64',
      ),
    ).toString()

  return hook
}

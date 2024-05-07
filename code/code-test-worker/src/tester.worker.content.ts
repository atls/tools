import { brotliDecompressSync } from 'zlib';

let hook;

export const getContent = () => {
  if (typeof hook === `undefined`)
    hook = brotliDecompressSync(Buffer.from('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', 'base64')).toString();

  return hook;
};
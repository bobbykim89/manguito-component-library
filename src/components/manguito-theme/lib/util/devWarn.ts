/**
 * Logs a warning outside production builds. The literal
 * `process.env.NODE_ENV` survives the library build, and the consumer's
 * bundler (Vite, webpack) replaces it: with "development" the warning logs,
 * with "production" the branch is dead code. A `typeof process` guard would
 * break that, since bundlers leave `typeof process` alone and `process` is
 * undefined in the browser; unbundled, the reference throws and is caught.
 * Internal: not exported from the `util` entry.
 */
export const devWarn = (message: string): void => {
  try {
    if (process.env.NODE_ENV !== 'production') console.warn(message)
  } catch {
    // no bundler and no `process`: stay silent
  }
}

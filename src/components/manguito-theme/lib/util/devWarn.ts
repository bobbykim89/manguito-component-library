/**
 * Logs a warning outside production builds. Written as a literal
 * `process.env.NODE_ENV` check so the library build keeps it and the
 * consumer's bundler strips it from their production build. Internal: not
 * exported from the `util` entry.
 */
export const devWarn = (message: string): void => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn(message)
  }
}

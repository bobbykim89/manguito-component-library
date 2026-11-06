import { createSSRApp, nextTick, type App, type VNode } from 'vue'
import { renderToString, type SSRContext } from 'vue/server-renderer'

export type RenderFn = () => VNode

export interface ServerRenderResult {
  html: string
  teleports: Record<string, string>
}

export async function renderOnServer(
  render: RenderFn,
): Promise<ServerRenderResult> {
  const ctx: SSRContext = {}
  const html = await renderToString(createSSRApp({ render }), ctx)
  return { html, teleports: ctx.teleports ?? {} }
}

export interface HydrationResult {
  app: App
  container: HTMLElement
  warnings: string[]
  unmount: () => void
}

export async function hydrate(render: RenderFn): Promise<HydrationResult> {
  const { html, teleports } = await renderOnServer(render)

  document.body.innerHTML = `<div id="app">${html}</div>`
  for (const [target, content] of Object.entries(teleports)) {
    if (target === 'body') {
      // Vue's hydrateTeleport expects the teleport buffer to be the target's
      // first child (SSR output into an empty target), so prepend, not append.
      document.body.insertAdjacentHTML('afterbegin', content)
    } else if (target.startsWith('#')) {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<div id="${target.slice(1)}">${content}</div>`,
      )
    }
  }
  const container = document.getElementById('app') as HTMLElement

  const warnings: string[] = []
  const originalError = console.error
  const originalWarn = console.warn
  // `warnings` is hydration-only; everything else is forwarded, never dropped.
  const isHydration = (msg: unknown) => /hydrat/i.test(String(msg))

  const app = createSSRApp({ render })
  app.config.warnHandler = (msg, _instance, trace) => {
    if (isHydration(msg)) warnings.push(msg)
    else originalWarn(`[Vue warn]: ${msg}${trace}`)
  }

  console.error = (...args: unknown[]) => {
    if (isHydration(args[0])) warnings.push(String(args[0]))
    else originalError(...args)
  }
  console.warn = (...args: unknown[]) => {
    if (isHydration(args[0])) warnings.push(String(args[0]))
    else originalWarn(...args)
  }
  try {
    app.mount(container)
    await nextTick()
  } finally {
    console.error = originalError
    console.warn = originalWarn
  }

  return {
    app,
    container,
    warnings,
    unmount: () => {
      app.unmount()
      document.body.innerHTML = ''
    },
  }
}

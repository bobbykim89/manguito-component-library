// Verifies the built packages can be imported and server-rendered in plain Node.
// Lives in the theme package so `vue` resolves to the same ESM instance that
// the theme's dist imports.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

const here = dirname(fileURLToPath(import.meta.url))
const themeRoot = resolve(here, '..')
const componentsRoot = resolve(themeRoot, '..')

let failed = false
const pass = (label) => console.log(`PASS ${label}`)
const fail = (label, err) => {
  failed = true
  const message = (err && err.message ? err.message : String(err)).split('\n')[0]
  console.log(`FAIL ${label}: ${message}`)
}
const check = async (label, fn) => {
  try {
    await fn()
    pass(label)
  } catch (err) {
    fail(label, err)
  }
}
const importFile = (file) => import(pathToFileURL(file).href)
const render = (vnodeFn) => renderToString(createSSRApp({ render: vnodeFn }))

// 1. theme entries
const entries = ['core', 'directives', 'util', 'composable']
const modules = {}
for (const name of entries) {
  await check(`import dist/${name}.js`, async () => {
    modules[name] = await importFile(resolve(themeRoot, `dist/${name}.js`))
  })
}

// 2. component renders
const core = modules.core
if (core) {
  const components = [
    'AccordionGroup',
    'Alert',
    'Card',
    'Collapse',
    'HeaderHorizontal',
    'HeaderVertical',
  ]
  for (const name of components) {
    await check(`render ${name}`, async () => {
      if (!core[name]) throw new Error('not exported')
      await render(() => h(core[name]))
    })
  }
  await check('render TabContainer', () =>
    render(() =>
      h(core.TabContainer, null, {
        'tab-content': () =>
          h(core.TabContent, { tabNumber: 0, id: 't0' }, () => 'content'),
      }),
    ),
  )
  await check('render CarouselContainer', () =>
    render(() =>
      h(core.CarouselContainer, null, {
        default: () =>
          h(core.CarouselContent, { slideNumber: 0, id: 's0' }, () => 'slide'),
      }),
    ),
  )
  await check('render DropdownContainer', () =>
    render(() =>
      h(core.DropdownContainer, null, {
        default: () => h(core.DropdownContent, null, () => 'item'),
      }),
    ),
  )
  for (const name of ['Modal', 'Sidebar']) {
    await check(`render ${name} (closed)`, () => render(() => h(core[name])))
    await check(`render ${name} (visible)`, () =>
      render(() => h(core[name], { visible: true })),
    )
  }
}

// 3. other packages' ESM entries
for (const dir of readdirSync(componentsRoot)) {
  if (dir === 'manguito-theme') continue
  const pkgPath = resolve(componentsRoot, dir, 'package.json')
  if (!existsSync(pkgPath)) continue
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const rel = pkg.exports?.['.']?.import ?? pkg.module
  await check(`import ${dir}`, async () => {
    if (!rel) throw new Error('no ESM entry in package.json')
    await importFile(resolve(componentsRoot, dir, rel))
  })
}

process.exit(failed ? 1 : 0)

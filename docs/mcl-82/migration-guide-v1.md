# MCL-82 Migration Guide

This release contains breaking changes across all packages. This guide lists every renamed prop and API change so you can update your codebase in one pass.

---

## 1. `display*` props renamed to `show*`

Every boolean prop that previously started with `display` now starts with `show`. The behaviour is identical — only the name changed.

| Old prop | New prop | Affected components |
|---|---|---|
| `displayBorder` | `showBorder` | `MclInputText`, `MclTextArea`, `MclSelect`, `MclInputFile`, `MclDropdownA` |
| `displayShadow` | `showShadow` | `MclInputText`, `MclTextArea`, `MclSelect`, `MclInputFile`, `MclDropdownA`, `MclTabsA`, `MclCardA`, `MclCollapseB`, `MclCheckbox`, `MclInputRadio` |
| `displayHighlight` | `showHighlight` | `MclInputText`, `MclTextArea`, `MclSelect`, `MclCollapseA`, `MclCollapseB`, `MclCardA`, `MclCardC`, `MclCardD`, `MclCarouselA`, `MclHeaderA`, `MclHeaderB`, `NavLink`, `NavDropdown`, `NavCollapse`, `MclFooterA` |
| `displayClear` | `showClear` | `MclInputFile` |
| `displaySeparator` | `showSeparator` | `MclDropdownA` |
| `displayScrollButtons` | `showScrollButtons` | `MclTabsA` |
| `displayImage` | `showImage` | `MclCardA`, `MclCardD` |
| `displayCta` | `showCta` | `MclCardA` |
| `displayLabel` | `showLabel` | `MclCardA`, `MclHeroC` |
| `displayTitle` | `showTitle` | `MclCardC` |
| `displayTagLine` | `showTagLine` | `MclCarouselA` |
| `displayGrayScale` | `showGrayScale` | `MclCardB` |
| `displaySocialIcons` | `showSocialIcons` | `MclFooterA` |
| `displayHighlight` | `showHighlight` | `MclHeroA`, `MclHeroB`, `MclHeroC` |
| `displayGradients` | `showGradients` | `MclHeroB` |
| `displayGradient` | `showGradient` | `MclHeroC` |
| `displaySubTitle` | `showSubTitle` | `MclHeroA` |
| `displayFilter` | `showFilter` | `MclHeroA` |
| `displayTitleShadow` | `showTitleShadow` | `MclHeroC` |

**Example:**
```html
<!-- before -->
<MclInputText :display-border="true" :display-highlight="false" />

<!-- after -->
<MclInputText :show-border="true" :show-highlight="false" />
```

---

## 2. `className` renamed to `customClass`

| Old prop | New prop | Affected components |
|---|---|---|
| `className` | `customClass` | `Modal`, `Sidebar`, `Collapse`, `DropdownContent` (`manguito-theme`); `NavDropdown`, `NavCollapseVertical` (`mcl-header`) |

The tooltip directive's value object key also changed:

```ts
// before
el.setAttribute('v-tooltip', { title: 'text', className: 'my-class' })

// after
el.setAttribute('v-tooltip', { title: 'text', customClass: 'my-class' })
```

**Example:**
```html
<!-- before -->
<Modal class-name="rounded-xl shadow-2xl" />
<Collapse class-name="p-xs" />

<!-- after -->
<Modal custom-class="rounded-xl shadow-2xl" />
<Collapse custom-class="p-xs" />
```

---

## 3. `noBackdrop` / `noHeader` → `showBackdrop` / `showHeader`

These negated boolean props have been inverted. The default behaviour (backdrop and header shown) is unchanged — but if you were explicitly passing `no-backdrop` or `no-header`, you now pass `:show-backdrop="false"` or `:show-header="false"`.

| Old prop | Old default | New prop | New default |
|---|---|---|---|
| `noBackdrop` | `false` | `showBackdrop` | `true` |
| `noHeader` | `false` | `showHeader` | `true` |

Affected: `Modal`, `Sidebar` (both in `manguito-theme`)

**Example:**
```html
<!-- before -->
<Modal no-backdrop />
<Sidebar no-header />

<!-- after -->
<Modal :show-backdrop="false" />
<Sidebar :show-header="false" />
```

---

## 4. `textcolor` → `textColor` (casing fix)

| Old prop | New prop | Affected components |
|---|---|---|
| `textcolor` | `textColor` | `MclInputText`, `MclTextArea`, `MclSelect` |

---

## 5. Individual renames

### `Modal`

| Old prop | New prop | Notes |
|---|---|---|
| `modalWidth` | `width` | Accepts `'small' \| 'medium' \| 'large'` |

### `MclSelect`

| Old prop | New prop | Notes |
|---|---|---|
| `selectColor` | `optionHoverColor` | Hover/active color for dropdown options |
| `invalidFeedback` | `noMatchText` | Text shown when filter has no results — distinct from `MclInputText`'s `invalidFeedback` (validation, not renamed) |

### `MclInputFile`

| Old prop | New prop |
|---|---|
| `isRequired` | `required` |

### `MclCollapseA`

| Old prop | New prop |
|---|---|
| `slotBgColor` | `contentBgColor` |

### `MclCollapseB`

| Old prop | New prop |
|---|---|
| `btnColor` | `triggerBgColor` |

### `MclHeaderA` / `MclHeaderB`

| Old prop | New prop |
|---|---|
| `drawerBtnBorder` | `showDrawerBorder` |

### `NavDrawer` (`manguito-theme` internal)

| Old prop | New prop |
|---|---|
| `navColor` | `bgColor` |

### Tooltip component and directive

| Old prop | New prop | Where |
|---|---|---|
| `title` | `content` | Tooltip render component props |

The directive binding value key `title` is **not** renamed — `v-tooltip="{ title: 'text' }"` continues to work.

---

## 6. `generateClass` — import style change

The default export of `@bobbykim/manguito-theme` is now deprecated. Switch to the named export.

```ts
// before (still works, but deprecated — will be removed in next major)
import generateClass from '@bobbykim/manguito-theme'
generateClass('BGCOLOR', props.bgColor)

// after
import { generateClass } from '@bobbykim/manguito-theme'
generateClass.bgColorVariant({ color: props.bgColor })
```

The full list of available `generateClass.*` methods is available via IDE autocomplete after switching to the named import.

---

## 7. Unchanged props (not renamed)

- `MclInputText.invalidFeedback` — the validation feedback prop/slot on `MclInputText` and `MclTextArea` is **not** renamed. Only `MclSelect.invalidFeedback` was renamed to `noMatchText`.
- `Tooltip` directive value `{ title, color, textColor, width, customClass }` — the directive binding object keys are unchanged. Only the underlying component prop was renamed.
- `placement` on `Modal` and `Sidebar` — left as-is despite different type families.

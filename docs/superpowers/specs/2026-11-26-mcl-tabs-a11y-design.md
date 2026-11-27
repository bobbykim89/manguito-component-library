# mcl-tabs accessibility fixes (#132)

## Intent

The audit (#128–#138) filed 8 findings against `MclTabsA` in #132. This change fixes all 8, so the tabs work with a keyboard and a screen reader. For mouse users, the behaviour and look stay the same.

This is accessibility only. The maintainer keeps it separate from #50 ("Update old component and fix issues"). When it merges, #50 gets a note that the mcl-tabs accessibility part is done, and stays open for container and hero.

The base tabs in `manguito-theme` were fixed in #128 (PR #141, still pending release). The `tab-button` slot now passes `tabAttrs(index)`, which gives each tab:

- an id (`${baseId}-tab-${index}`);
- `role="tab"` and `aria-selected`;
- `aria-controls`, pointing at the registered `TabContent` id;
- a roving `tabindex` (`0` for the selected tab, `-1` for the others);
- `onClick`, which selects the tab;
- `onKeydown`, for the keys:
  - ArrowRight and ArrowLeft move to the next and previous tab, wrapping around;
  - Home and End go to the first and last tab;
  - moving focus also selects the tab.

`TabContent` gets `aria-labelledby` its tab, but only when that tab bound `tabAttrs`.

`MclTabsA` doesn't use any of this yet.

## Goals

Every checkbox in #132 gets resolved; the issue body is the checklist.

1. **The tabs bind `tabAttrs(idx)`.** This replaces the hand-written `role`, `aria-selected`, `tabindex` and `:disabled`.
   - The selected tab is **not** disabled. It is the one Tab stop of the set.
   - Activating a tab with Enter, Space or a click leaves focus on it.
   - Tabs and panels are linked through the base: each tab has `aria-controls`, and each panel has `aria-labelledby`.
   - **`aria-controls` on the server (my call).** The base only fills in `aria-controls` once each `TabContent` registers its panel, and on the server that happens after the tabs are already written. So server HTML has no `aria-controls`; it only appears after mount.
     - `MclTabsA` already knows each panel's id, so it binds `:aria-controls="generateTabId(idx)"` after `v-bind="tabAttrs(idx)"`.
     - The value is the same one the base supplies after mount, and it is in the server HTML.
     - The gap in the base is noted for a separate issue; the base stays unchanged here.
   - Arrow Left/Right, Home and End work as the base defines them. Selection follows focus.
   - The tabs are `type="button"`.
2. **`tab-click` fires on every selection change.**
   - On a click, it fires as it does today, with the `MouseEvent` and the title.
   - When the keyboard selects a tab, it fires with the `KeyboardEvent` and the newly selected tab's title. Without this, sites that track the active tab through `tab-click` would fall out of step (my call).
   - It does not fire for keys that don't change the selection.
   - **It does not fire when the already-selected tab is clicked or activated with Enter/Space (my call).** That keeps today's behaviour, where the selected tab was disabled and never emitted. Enter/Space on a focused tab arrive as a click, and the roving tabindex means the focused tab is always the selected one, so without this guard every Enter/Space would send a duplicate event.
   - The event name and payload shape, `(event: Event, title: string)`, are unchanged.
3. **Tab titles are `<span>`s, not `<h3>`s.**
   - The `h3Variant({ size: titleSize })` classes stay, so the look is unchanged.
   - The span is `block` if that's needed to keep the layout.
4. **The scroll buttons are mouse and touch helpers only (approach B, chosen by the maintainer).**
   - Both get `aria-hidden="true"` and `tabindex="-1"`, and are never focused by a click (`@mousedown.prevent`). This takes them out of the tab list's accessibility tree and out of the Tab order, so focus can't be lost when one disappears.
   - They can keep appearing and disappearing at the scroll ends (`v-if`), as today.
   - Their `aria-label`s go away (my call), since they're hidden from assistive technology.
   - Each is at least 24px wide (`min-w-[24px]`, or padding that reaches it). They keep full bar height.
   - Keyboard users don't need them: focusing a tab with the arrow keys scrolls it into view.
   - **Clear of the scroll buttons (my call).** The buttons overlay the strip's edges, so a tab scrolled only "just into view" sits under one.
     - The strip gets horizontal `scroll-padding` equal to the buttons' width, below `lg` where they show. `scroll-padding` changes where scrolling stops, not the layout, so nothing looks different.
     - If focus scrolling in Chromium ignores it, `MclTabsA` calls `scrollIntoView({ block: 'nearest', inline: 'nearest' })` on the newly focused tab, which respects it.
     - The keyboard story, at mobile width, checks that the focused tab's box doesn't overlap a visible scroll button's box.
5. **Visible focus.** The tabs lose `focus:outline-none` and get `focus-visible:mcl-focus-ring`, the same shared ring as #131.
   - On keyboard focus, the ring replaces the selected tab's white `outline-4`.
   - The strip's 4px padding with `overflow-x-auto` clips about 1px of the ring's outer halo. That's accepted (my call): fixing it means changing the strip's padding (the look) or the shared ring, and the 3px ring itself stays fully visible.
6. **Reduced motion.** `scrollLeft()` and `scrollRight()` use `behavior: 'auto'` when `prefers-reduced-motion: reduce` matches, and `'smooth'` otherwise. Check this when the button is clicked, not at setup, so server rendering never touches `window`.
7. **#132 is closed off.**
   - `src/stories/components/mcl-tabs/mcl-tabs-a/tabsA.stories.ts` sets `parameters: { a11y: { test: 'error' } }` in `meta`, and `pnpm test:storybook` passes.
   - A keyboard play test covers: Tab into the tab list, ArrowRight selects and focuses the next tab, that tab's panel shows, and End and Home work.
8. **Docs.** `MclTabsA.mdx` gets a keyboard section, and notes that `tab-click` also fires on keyboard selection.

## Non-goals

- Anything from #50 beyond accessibility: new features, API cleanup or a visual refresh.
- Changes to the base `TabContainer` / `TabContent` in `manguito-theme`, including where `role="tablist"` sits. Approach A was rejected.
- Manual activation, where arrows move focus without selecting. The base gives automatic activation, and this change uses it.
- Making the scroll buttons usable by keyboard or voice control.
- New props or events.

## Anti-goals

- **A changed look or mouse behaviour.** Clicking a tab still selects it and emits `tab-click`. The scroll buttons still scroll by 100px and appear only when there is more to scroll to.
- **A focused element hidden from assistive technology.** No element with `aria-hidden` may ever hold focus.
- **Arrow keys handled outside the tab list.** The base only listens on the tabs, so this shouldn't happen.

## Constraints

- **Version.** `@bobbykim/mcl-tabs` is at `0.12.8`. Under the repo's 0.x convention, behaviour and DOM changes are a **minor** bump.
- **Changeset.** `.changeset/mcl-tabs-a11y.md` must say:
  - the tab titles are no longer headings;
  - the scroll buttons are hidden from assistive technology and out of the Tab order;
  - keyboard selection also emits `tab-click`;
  - the release needs the pending `manguito-theme` minor (`manguito-theme-a11y`), because `tabAttrs` comes from it, and the two publish together.
- **Tests:**
  - Unit tests use Vitest in jsdom with `mount` / the `hydrate` harness, in `MclTabsA.test.ts`.
  - The server test must keep passing, and the server HTML must already carry the right `aria-selected`, `tabindex` and `aria-controls` (the last through `MclTabsA`'s own binding; see Goal 1).
  - Keys are dispatched as keydown-only events in unit tests.
  - `@vue/test-utils` `mount` stubs `<Transition>`; mount without the stub wherever panel visibility during a slide matters.
- **`pnpm lint`, `pnpm format:check` and `pnpm typecheck`** pass.

## Approaches

|       | Approach                                                                                                                                                                            | Trade-off                                                                                                                                                                                            |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Change the base `TabContainer` so the consumer places `role="tablist"` on the tab row. The scroll buttons become real buttons outside it, always rendered and disabled at the ends. | Keyboard and voice-control users can use the scroll buttons, but two packages change.                                                                                                                |
| **B** | **Keep the scroll buttons as mouse and touch helpers: `aria-hidden`, `tabindex="-1"`, never focused by a click. Bind the base `tabAttrs` for everything else.**                     | **Only `mcl-tabs` changes, and keyboard users get no extra Tab stops for something the arrow keys already do. Voice-control users can't name the scroll buttons; they can still pick tabs by name.** |

**Chosen: B (approved by the maintainer).**

## Left to the builder

- **How `MclTabsA` learns that the keyboard changed the selection, so it can emit `tab-click`.** For example:
  - its own `keydown` listener next to `tabAttrs`, that reads the new selection after the base handler;
  - or a watcher on the active index exposed through the slot.

  It must not duplicate the base's key logic in a way that could drift.

- **How to read `prefers-reduced-motion`:** `matchMedia`, or `usePreferredReducedMotion` from `@vueuse/core`, which the package already depends on.
- **Test names and story layout.**

---
'@bobbykim/mcl-tabs': minor
---

Keyboard and screen-reader fixes for `MclTabsA` (#132).

- **Tabs use the shared tab behaviour.** Each tab has an id, `role="tab"`, `aria-selected`, `aria-controls` (pointing at its panel, already in the server-rendered HTML) and a roving `tabindex`, and each panel is labelled by its tab.
  - The selected tab is no longer `disabled`. It is the tab set's single Tab stop, and focus stays on a tab after it is clicked.
  - **Arrow Right / Arrow Left** (wrapping), **Home** and **End** move focus and select the tab. The tab reached is scrolled clear of the scroll buttons.
  - Tabs are `type="button"` and show the shared focus ring (replacing `focus:outline-none`).
- **Tab titles are no longer headings.** Changes: each title is a `<span>` (was an `<h3>`) with the same classes, so the look is unchanged.
- **The scroll buttons are mouse and touch helpers.** Changes: they are hidden from assistive technology (`aria-hidden="true"`, no `aria-label`), out of the Tab order (`tabindex="-1"`) and never take focus when pressed. They are at least 24px wide, and scroll instantly when the user prefers reduced motion.
- **`tab-click` also fires on keyboard selection.** Changes: it is emitted with the `KeyboardEvent` and the newly selected tab's title when arrow keys, Home or End change the tab. The payload is still `(event, title)`, and it is still not emitted for the tab that is already selected.

Needs the `@bobbykim/manguito-theme` minor release from the pending #128 changeset (`manguito-theme-a11y`; `tabAttrs` comes from its tabs). The two publish together.

---
'@bobbykim/manguito-theme': minor
'@bobbykim/mcl-forms': patch
'@bobbykim/mcl-cards': patch
---

Make the components SSR safe without client-only wrappers. Collapse content is now always in the server HTML (closed panels are `display: none`), Modal and Sidebar no longer touch `document` during setup, HeaderVertical keeps its menu button in server HTML, and the active tab is visible before its height is measured. Built packages now import in plain Node. The theme no longer bundles its dependencies (`@vueuse/integrations`, `focus-trap`, `class-variance-authority`, `isomorphic-dompurify`); they are installed from its declared `dependencies`, and in Node `isomorphic-dompurify` now loads its server build. `mcl-forms` and `mcl-cards` no longer bundle theme subpaths (`directives`, `util`) and import them from `@bobbykim/manguito-theme` instead.

---
'@bobbykim/mcl-forms': minor
---

Requires `@bobbykim/manguito-theme` 1.6.0 or later CSS (`mcl-theme-v4.css`); with an older theme CSS, focus rings on these components do not compile. Every focused field and toggle now shows the shared two-tone focus ring instead of a ring in its border colour: checkboxes, radios and switches for keyboard focus, text inputs, textareas and the select on any focus (browsers treat a clicked text field as keyboard-focused). The highlight bar is now decoration shown alongside the ring. `MclSelect` no longer shows a border-coloured ring while open. The textarea's highlight bar now sits flush with its bottom edge at any font size (it drifted by a few pixels when the surrounding text size or line height differed from the default).

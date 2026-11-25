// The element the browser's own hit-testing finds at the centre of `el`, which
// is what a real mouse click there lands on. Storybook's userEvent dispatches
// on the element it is given, so it can't show where a click would land.
export const hitAt = (el: Element): Element => {
  const r = el.getBoundingClientRect()
  return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)!
}

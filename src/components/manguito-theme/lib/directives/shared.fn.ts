/**
 * Extracts target ID from either href attribute or directive argument
 */
export const getTargetId = (
  elem: HTMLElement,
  directiveArg?: string,
): string | null => {
  // if clicked element is an anchor tag, use href
  if (elem.tagName === 'A') {
    const href = elem.getAttribute('href')
    if (!href) return null
    // remove leading # if present
    return href.charAt(0) === '#' ? href.substring(1) : href
  }
  // otherwisse use directive argument
  return directiveArg || null
}

/**
 * Gets the target element to toggle/collapse/expand
 */
export const getTargetElem = (targetId: string | null): HTMLElement | null => {
  if (!targetId) return null
  return document.getElementById(targetId)
}

/**
 * Checks if element can be toggled/collapse/expand (has visible attribute)
 */
export const hasVisibleAttr = (elem: HTMLElement): boolean => {
  return elem.hasAttribute('visible')
}

/**
 * Toggles the visible attribute between "true" and "false"
 */
export const toggleVisibility = (elem: HTMLElement): void => {
  const currentVal = elem.getAttribute('visible')
  const newVal = currentVal === 'true' ? 'false' : 'true'
  elem.setAttribute('visible', newVal)
}

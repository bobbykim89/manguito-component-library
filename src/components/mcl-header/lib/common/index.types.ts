import type { CtaTarget } from '@bobbykim/manguito-theme'

export interface MenuItemType {
  title: string
  url: string
  target?: CtaTarget
  /** Marks the link to the current page: `aria-current="page"` and its highlight stays on. */
  current?: boolean
}

export interface MenuCollapseType {
  title: string
  children: MenuItemType[]
}

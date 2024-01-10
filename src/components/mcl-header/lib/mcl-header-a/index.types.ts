import type { CtaTarget } from '@bobbykim/manguito-theme'

export interface MenuItemType {
  title: string
  url: string
  target?: CtaTarget
}

export interface MenuCollapseType {
  title: string
  children: MenuItemType[]
}

export interface NavChildClickEventType {
  event: Event
  item: MenuItemType
}

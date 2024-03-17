import type { CtaTarget } from '@bobbykim/manguito-theme'
import type { MenuItemType } from '../common/index.types'

export interface NavChildClickEventType {
  event: Event
  item: MenuItemType
}

export interface MenuEventType {
  event: Event
  title: string
  link: string
  target?: CtaTarget
}

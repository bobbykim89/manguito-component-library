import type { CtaTarget } from '@bobbykim/manguito-theme'

export interface CardClickEvent {
  title: string
  url: string
  target?: CtaTarget
}

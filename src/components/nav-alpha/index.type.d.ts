import type { CtaTarget } from '@bobbykim/manguito-theme';
export interface NavItemType {
    title: string;
    url: string;
    target?: CtaTarget;
}
export interface NavCollapseType {
    title: string;
    children: NavItemType[];
}
export interface NavChildClickEventType {
    event: Event;
    item: NavItemType;
}

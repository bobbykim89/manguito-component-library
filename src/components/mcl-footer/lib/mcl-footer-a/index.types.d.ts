import type { CtaTarget } from '@bobbykim/manguito-theme';
export interface MenuItemType {
    title: string;
    url: string;
    target?: CtaTarget;
}
export interface SocialUrl {
    linkedin?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
}
export interface MenuItemEvent {
    event: Event;
    title: string;
    link: string;
    target?: CtaTarget;
}

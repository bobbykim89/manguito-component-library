import type { CtaTarget } from '@bobbykim/manguito-theme';
export interface CardClickEvent {
    event: Event;
    title: string;
    url: string;
    target?: CtaTarget;
}

import type { ColorPalette, CtaTarget, HeadingSize, BodyText } from '@bobbykim/manguito-theme';
import type { NavItemType, NavCollapseType } from './index.type';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    menuTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    menuTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    menuTextBold: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    logo: {
        type: import("vue").PropType<string>;
        required: true;
    };
    logoSmall: {
        type: import("vue").PropType<string>;
    };
    logoAlt: {
        type: import("vue").PropType<string>;
    };
    logoAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    logoLink: {
        type: import("vue").PropType<string>;
        required: true;
    };
    logoLinkTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    titleAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    titleLink: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleLinkTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    navItems: {
        type: import("vue").PropType<(NavItemType | NavCollapseType)[]>;
        required: true;
    };
    navItemAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    mobileMenuBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    secondaryColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    hamburgerBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    fadeInOnScroll: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    scrollDistance: {
        type: import("vue").PropType<number>;
        default: number;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "toggle-menu": (...args: any[]) => void;
    "menu-click": (...args: any[]) => void;
    "title-click": (...args: any[]) => void;
    "logo-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    menuTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    menuTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    menuTextBold: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    logo: {
        type: import("vue").PropType<string>;
        required: true;
    };
    logoSmall: {
        type: import("vue").PropType<string>;
    };
    logoAlt: {
        type: import("vue").PropType<string>;
    };
    logoAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    logoLink: {
        type: import("vue").PropType<string>;
        required: true;
    };
    logoLinkTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    titleAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    titleLink: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleLinkTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    navItems: {
        type: import("vue").PropType<(NavItemType | NavCollapseType)[]>;
        required: true;
    };
    navItemAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    mobileMenuBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    secondaryColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    hamburgerBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    fadeInOnScroll: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    scrollDistance: {
        type: import("vue").PropType<number>;
        default: number;
    };
}>> & {
    "onToggle-menu"?: ((...args: any[]) => any) | undefined;
    "onMenu-click"?: ((...args: any[]) => any) | undefined;
    "onTitle-click"?: ((...args: any[]) => any) | undefined;
    "onLogo-click"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    menuTextSize: BodyText;
    menuTextColor: ColorPalette;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    bgColor: ColorPalette;
    logoAsLink: boolean;
    logoLinkTarget: CtaTarget;
    titleSize: HeadingSize;
    titleAsLink: boolean;
    titleLinkTarget: CtaTarget;
    navItemAsLink: boolean;
    mobileMenuBgColor: ColorPalette;
    secondaryColor: ColorPalette;
    hamburgerBorder: boolean;
    fadeInOnScroll: boolean;
    scrollDistance: number;
}, {}>, {
    "nav-slot"?(_: {}): any;
    "mobile-slot"?(_: {
        closeNav: (e: Event) => void;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

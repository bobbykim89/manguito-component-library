import type { BodyText, ColorPalette, CtaTarget, HeadingSize } from '@bobbykim/manguito-theme';
import type { MenuCollapseType, MenuItemType } from '../common/index.types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    logo: string;
    logoSmall?: string | undefined;
    logoAlt?: string | undefined;
    logoAsLink?: boolean | undefined;
    logoLink: string;
    logoLinkTarget?: CtaTarget | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleAsLink?: boolean | undefined;
    titleLink: string;
    titleLinkTarget?: CtaTarget | undefined;
    menuItems: (MenuItemType | MenuCollapseType)[];
    menuItemAsLink?: boolean | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    mobileMenuBgColor?: ColorPalette | undefined;
    secondaryColor?: ColorPalette | undefined;
    hamburgerBorder?: boolean | undefined;
    fadeInOnScroll?: boolean | undefined;
    scrollDistance?: number | undefined;
}>, {
    logoAsLink: boolean;
    logoLinkTarget: string;
    titleSize: string;
    titleColor: string;
    titleAsLink: boolean;
    titleLinkTarget: string;
    menuItemAsLink: boolean;
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    mobileMenuBgColor: string;
    secondaryColor: string;
    hamburgerBorder: boolean;
    fadeInOnScroll: boolean;
    scrollDistance: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "toggle-menu": (...args: any[]) => void;
    "menu-click": (...args: any[]) => void;
    "title-click": (...args: any[]) => void;
    "logo-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    logo: string;
    logoSmall?: string | undefined;
    logoAlt?: string | undefined;
    logoAsLink?: boolean | undefined;
    logoLink: string;
    logoLinkTarget?: CtaTarget | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleAsLink?: boolean | undefined;
    titleLink: string;
    titleLinkTarget?: CtaTarget | undefined;
    menuItems: (MenuItemType | MenuCollapseType)[];
    menuItemAsLink?: boolean | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    mobileMenuBgColor?: ColorPalette | undefined;
    secondaryColor?: ColorPalette | undefined;
    hamburgerBorder?: boolean | undefined;
    fadeInOnScroll?: boolean | undefined;
    scrollDistance?: number | undefined;
}>, {
    logoAsLink: boolean;
    logoLinkTarget: string;
    titleSize: string;
    titleColor: string;
    titleAsLink: boolean;
    titleLinkTarget: string;
    menuItemAsLink: boolean;
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    mobileMenuBgColor: string;
    secondaryColor: string;
    hamburgerBorder: boolean;
    fadeInOnScroll: boolean;
    scrollDistance: number;
}>>> & {
    "onToggle-menu"?: ((...args: any[]) => any) | undefined;
    "onMenu-click"?: ((...args: any[]) => any) | undefined;
    "onTitle-click"?: ((...args: any[]) => any) | undefined;
    "onLogo-click"?: ((...args: any[]) => any) | undefined;
}, {
    bgColor: ColorPalette;
    mobileMenuBgColor: ColorPalette;
    fadeInOnScroll: boolean;
    scrollDistance: number;
    titleColor: ColorPalette;
    menuTextSize: BodyText;
    menuTextColor: ColorPalette;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    logoAsLink: boolean;
    logoLinkTarget: CtaTarget;
    titleSize: HeadingSize;
    titleAsLink: boolean;
    titleLinkTarget: CtaTarget;
    menuItemAsLink: boolean;
    secondaryColor: ColorPalette;
    hamburgerBorder: boolean;
}, {}>, {
    "nav-slot"?(_: {}): any;
    "mobile-slot"?(_: {
        closeNav: () => void;
    }): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

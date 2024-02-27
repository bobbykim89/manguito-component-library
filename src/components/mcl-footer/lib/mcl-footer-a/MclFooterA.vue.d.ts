import type { BodyText, ColorPalette, CtaTarget, HeadingSize } from '@bobbykim/manguito-theme';
import type { MenuItemType, SocialUrl } from './index.types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    copyText?: string | undefined;
    logo: string;
    logoAlt?: string | undefined;
    logoAsLink?: boolean | undefined;
    logoLink: string;
    logoLinkTarget?: CtaTarget | undefined;
    displaySocialIcons?: boolean | undefined;
    socialIconColor: ColorPalette;
    socialLinks?: SocialUrl | undefined;
    menuItems: MenuItemType[];
    secondaryMenuItems?: MenuItemType[] | undefined;
    menuItemAsLink?: boolean | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    borderTopColor?: ColorPalette | undefined;
    headlineColor?: ColorPalette | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    logoAsLink: boolean;
    logoLinkTarget: string;
    displaySocialIcons: boolean;
    socialIconColor: string;
    menuItemAsLink: boolean;
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    borderTopColor: string;
    headlineColor: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "menu-click": (...args: any[]) => void;
    "logo-click": (...args: any[]) => void;
    "secondary-menu-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    copyText?: string | undefined;
    logo: string;
    logoAlt?: string | undefined;
    logoAsLink?: boolean | undefined;
    logoLink: string;
    logoLinkTarget?: CtaTarget | undefined;
    displaySocialIcons?: boolean | undefined;
    socialIconColor: ColorPalette;
    socialLinks?: SocialUrl | undefined;
    menuItems: MenuItemType[];
    secondaryMenuItems?: MenuItemType[] | undefined;
    menuItemAsLink?: boolean | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    borderTopColor?: ColorPalette | undefined;
    headlineColor?: ColorPalette | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    logoAsLink: boolean;
    logoLinkTarget: string;
    displaySocialIcons: boolean;
    socialIconColor: string;
    menuItemAsLink: boolean;
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    borderTopColor: string;
    headlineColor: string;
}>>> & {
    "onMenu-click"?: ((...args: any[]) => any) | undefined;
    "onLogo-click"?: ((...args: any[]) => any) | undefined;
    "onSecondary-menu-click"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    logoAsLink: boolean;
    logoLinkTarget: CtaTarget;
    displaySocialIcons: boolean;
    socialIconColor: ColorPalette;
    menuItemAsLink: boolean;
    menuTextSize: BodyText;
    menuTextColor: ColorPalette;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    bgColor: ColorPalette;
    borderTopColor: ColorPalette;
    headlineColor: ColorPalette;
}, {}>, {
    default?(_: {}): any;
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

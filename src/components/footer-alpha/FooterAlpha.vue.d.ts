import type { ColorPalette, HeadingSize, CtaTarget, BodyText } from '@bobbykim/manguito-theme';
import type { NavItemType, SocialUrl } from './index.type';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    socialLinks: {
        type: import("vue").PropType<SocialUrl>;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    copyText: {
        type: import("vue").PropType<string>;
    };
    logo: {
        type: import("vue").PropType<string>;
        required: true;
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
    displaySocialIcons: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    socialIconColor: {
        type: import("vue").PropType<ColorPalette>;
        required: true;
        default: string;
    };
    navItems: {
        type: import("vue").PropType<NavItemType[]>;
        required: true;
    };
    secondaryNavItems: {
        type: import("vue").PropType<NavItemType[]>;
    };
    navItemAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
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
    borderTopColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    headlineColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "menu-click": (...args: any[]) => void;
    "logo-click": (...args: any[]) => void;
    "secondary-menu-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    socialLinks: {
        type: import("vue").PropType<SocialUrl>;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    copyText: {
        type: import("vue").PropType<string>;
    };
    logo: {
        type: import("vue").PropType<string>;
        required: true;
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
    displaySocialIcons: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    socialIconColor: {
        type: import("vue").PropType<ColorPalette>;
        required: true;
        default: string;
    };
    navItems: {
        type: import("vue").PropType<NavItemType[]>;
        required: true;
    };
    secondaryNavItems: {
        type: import("vue").PropType<NavItemType[]>;
    };
    navItemAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
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
    borderTopColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    headlineColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
}>> & {
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
    navItemAsLink: boolean;
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
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

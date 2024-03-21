import type { BodyText, ColorPalette, CtaTarget, HeadingSize } from '@bobbykim/manguito-theme';
import type { MenuCollapseType, MenuItemType } from '../common/index.types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    logo: string;
    logoAlt?: string | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleBlockAsLink?: boolean | undefined;
    titleBlockLinkTarget?: CtaTarget | undefined;
    titleBlockLink: string;
    menuItems: (MenuItemType | MenuCollapseType)[];
    menuItemAsLink?: boolean | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    drawerBtnColor?: ColorPalette | undefined;
    drawerBtnBorder?: boolean | undefined;
    headerWidth?: number | undefined;
}>, {
    logoAlt: string;
    titleBlockAsLink: boolean;
    titleBlockLinkTarget: string;
    titleSize: string;
    titleColor: string;
    menuItemAsLink: boolean;
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    drawerBtnColor: string;
    drawerBtnBorder: boolean;
    headerWidth: number;
}>, {
    headerClose: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "toggle-drawer": (event: Event, open: boolean) => void;
    "title-click": (event: Event, url: string, target: CtaTarget) => void;
    "menu-click": (event: Event, item: MenuItemType) => void;
    "collapse-click": (event: Event, title: string, visible: boolean) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    logo: string;
    logoAlt?: string | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleBlockAsLink?: boolean | undefined;
    titleBlockLinkTarget?: CtaTarget | undefined;
    titleBlockLink: string;
    menuItems: (MenuItemType | MenuCollapseType)[];
    menuItemAsLink?: boolean | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    drawerBtnColor?: ColorPalette | undefined;
    drawerBtnBorder?: boolean | undefined;
    headerWidth?: number | undefined;
}>, {
    logoAlt: string;
    titleBlockAsLink: boolean;
    titleBlockLinkTarget: string;
    titleSize: string;
    titleColor: string;
    menuItemAsLink: boolean;
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    drawerBtnColor: string;
    drawerBtnBorder: boolean;
    headerWidth: number;
}>>> & {
    "onToggle-drawer"?: ((event: Event, open: boolean) => any) | undefined;
    "onTitle-click"?: ((event: Event, url: string, target: CtaTarget) => any) | undefined;
    "onMenu-click"?: ((event: Event, item: MenuItemType) => any) | undefined;
    "onCollapse-click"?: ((event: Event, title: string, visible: boolean) => any) | undefined;
}, {
    bgColor: ColorPalette;
    drawerBtnColor: ColorPalette;
    drawerBtnBorder: boolean;
    headerWidth: number;
    titleColor: ColorPalette;
    menuTextSize: BodyText;
    menuTextColor: ColorPalette;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    logoAlt: string;
    titleSize: HeadingSize;
    titleBlockAsLink: boolean;
    titleBlockLinkTarget: CtaTarget;
    menuItemAsLink: boolean;
}, {}>, Readonly<{
    default: any;
    'content-bottom': any;
    'mobile-bottom'(props: {
        headerClose: () => void;
    }): any;
}>>;
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

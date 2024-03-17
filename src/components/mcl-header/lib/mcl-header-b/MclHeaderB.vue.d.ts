import type { BodyText, ColorPalette, CtaTarget, HeadingSize } from '@bobbykim/manguito-theme';
import type { MenuCollapseType, MenuItemType } from '../common/index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    logo: string;
    logoAlt?: string | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleBlockAsLink?: boolean | undefined;
    titleBlockLinkTarget?: CtaTarget | undefined;
    titleBlockLink: string;
    menuItems: Array<MenuItemType | MenuCollapseType>;
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
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    logo: string;
    logoAlt?: string | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleBlockAsLink?: boolean | undefined;
    titleBlockLinkTarget?: CtaTarget | undefined;
    titleBlockLink: string;
    menuItems: Array<MenuItemType | MenuCollapseType>;
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
}>>>, {
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
    titleSize: HeadingSize;
    menuItemAsLink: boolean;
    titleBlockAsLink: boolean;
    titleBlockLinkTarget: CtaTarget;
}, {}>;
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

import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme';
import type { MenuItemType } from '../common/index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    navItem: MenuItemType;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    asLink?: boolean | undefined;
}>, {
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    asLink: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "nav-link": (event: Event, item: MenuItemType) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    navItem: MenuItemType;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    asLink?: boolean | undefined;
}>, {
    menuTextSize: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    asLink: boolean;
}>>> & {
    "onNav-link"?: ((event: Event, item: MenuItemType) => any) | undefined;
}, {
    menuTextSize: BodyText;
    menuTextColor: ColorPalette;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    asLink: boolean;
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

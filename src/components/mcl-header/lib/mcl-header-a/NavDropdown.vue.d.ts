import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme';
import type { MenuCollapseType, MenuItemType } from '../common/index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    navItem: MenuCollapseType;
    bgColor?: ColorPalette | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    asLink?: boolean | undefined;
}>, {
    menuTextSize: string;
    bgColor: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    asLink: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "label-click": (event: Event, title: string, open: boolean) => void;
    "child-click": (event: Event, item: MenuItemType) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    navItem: MenuCollapseType;
    bgColor?: ColorPalette | undefined;
    menuTextSize?: BodyText | undefined;
    menuTextColor?: ColorPalette | undefined;
    menuTextBold?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    asLink?: boolean | undefined;
}>, {
    menuTextSize: string;
    bgColor: string;
    menuTextColor: string;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    asLink: boolean;
}>>> & {
    "onChild-click"?: ((event: Event, item: MenuItemType) => any) | undefined;
    "onLabel-click"?: ((event: Event, title: string, open: boolean) => any) | undefined;
}, {
    bgColor: ColorPalette;
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

import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme';
import type { MenuItemType } from '../common/index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    menuItem: MenuItemType;
    textColor?: ColorPalette | undefined;
    textSize?: BodyText | undefined;
    fontBold?: boolean | undefined;
    dHl?: boolean | undefined;
    hlColor?: ColorPalette | undefined;
    asLink?: boolean | undefined;
}>, {
    textColor: string;
    textSize: string;
    fontBold: boolean;
    dHl: boolean;
    hlColor: string;
    asLink: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "menu-click": (event: Event, item: MenuItemType) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    menuItem: MenuItemType;
    textColor?: ColorPalette | undefined;
    textSize?: BodyText | undefined;
    fontBold?: boolean | undefined;
    dHl?: boolean | undefined;
    hlColor?: ColorPalette | undefined;
    asLink?: boolean | undefined;
}>, {
    textColor: string;
    textSize: string;
    fontBold: boolean;
    dHl: boolean;
    hlColor: string;
    asLink: boolean;
}>>> & {
    "onMenu-click"?: ((event: Event, item: MenuItemType) => any) | undefined;
}, {
    textColor: ColorPalette;
    asLink: boolean;
    textSize: BodyText;
    fontBold: boolean;
    dHl: boolean;
    hlColor: ColorPalette;
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

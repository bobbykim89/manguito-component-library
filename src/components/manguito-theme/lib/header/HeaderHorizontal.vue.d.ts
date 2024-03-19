import type { ColorPalette } from '../../';
import type { HeaderStickyOptionType } from './index.types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    bgColor?: ColorPalette | undefined;
    mobileMenuBgColor?: ColorPalette | undefined;
    drawerBtnColor?: ColorPalette | undefined;
    drawerBtnBorder?: boolean | undefined;
    fadeInOnScroll?: boolean | undefined;
    scrollDistance?: number | undefined;
    sticky?: HeaderStickyOptionType | undefined;
}>, {
    bgColor: string;
    mobileMenuBgColor: string;
    drawerBtnColor: string;
    drawerBtnBorder: boolean;
    fadeInOnScroll: boolean;
    scrollDistance: number;
    sticky: string;
}>, {
    headerClose: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "toggle-drawer": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    bgColor?: ColorPalette | undefined;
    mobileMenuBgColor?: ColorPalette | undefined;
    drawerBtnColor?: ColorPalette | undefined;
    drawerBtnBorder?: boolean | undefined;
    fadeInOnScroll?: boolean | undefined;
    scrollDistance?: number | undefined;
    sticky?: HeaderStickyOptionType | undefined;
}>, {
    bgColor: string;
    mobileMenuBgColor: string;
    drawerBtnColor: string;
    drawerBtnBorder: boolean;
    fadeInOnScroll: boolean;
    scrollDistance: number;
    sticky: string;
}>>> & {
    "onToggle-drawer"?: ((...args: any[]) => any) | undefined;
}, {
    bgColor: ColorPalette;
    mobileMenuBgColor: ColorPalette;
    drawerBtnColor: ColorPalette;
    drawerBtnBorder: boolean;
    fadeInOnScroll: boolean;
    scrollDistance: number;
    sticky: HeaderStickyOptionType;
}, {}>, {
    content?(_: {}): any;
    "nav-desktop-right"?(_: {}): any;
    "mobile-content"?(_: {
        headerClose: () => void;
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
import type { ColorPalette } from '@bobbykim/manguito-theme';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    color?: ColorPalette | undefined;
    displayBorder?: boolean | undefined;
    toggle: boolean;
    navColor: ColorPalette;
}>, {
    color: string;
    displayBorder: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "hbg-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    color?: ColorPalette | undefined;
    displayBorder?: boolean | undefined;
    toggle: boolean;
    navColor: ColorPalette;
}>, {
    color: string;
    displayBorder: boolean;
}>>> & {
    "onHbg-click"?: ((...args: any[]) => any) | undefined;
}, {
    color: ColorPalette;
    displayBorder: boolean;
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

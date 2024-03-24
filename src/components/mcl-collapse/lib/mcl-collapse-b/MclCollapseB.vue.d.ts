import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    collapseId: string;
    title: string;
    titleColor?: ColorPalette | undefined;
    titleSize?: HeadingSize | undefined;
    borderColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    btnColor?: ColorPalette | undefined;
    iconColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
    visible?: boolean | undefined;
    accordion?: string | undefined;
}>, {
    titleColor: string;
    titleSize: string;
    borderColor: string;
    bgColor: string;
    btnColor: string;
    iconColor: string;
    rounded: boolean;
    displayShadow: boolean;
    visible: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "collapse-open": (visible: boolean, title: string) => void;
    "collapse-close": (visible: boolean, title: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    collapseId: string;
    title: string;
    titleColor?: ColorPalette | undefined;
    titleSize?: HeadingSize | undefined;
    borderColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    btnColor?: ColorPalette | undefined;
    iconColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
    visible?: boolean | undefined;
    accordion?: string | undefined;
}>, {
    titleColor: string;
    titleSize: string;
    borderColor: string;
    bgColor: string;
    btnColor: string;
    iconColor: string;
    rounded: boolean;
    displayShadow: boolean;
    visible: boolean;
}>>> & {
    "onCollapse-open"?: ((visible: boolean, title: string) => any) | undefined;
    "onCollapse-close"?: ((visible: boolean, title: string) => any) | undefined;
}, {
    visible: boolean;
    bgColor: ColorPalette;
    titleColor: ColorPalette;
    borderColor: ColorPalette;
    rounded: boolean;
    titleSize: HeadingSize;
    iconColor: ColorPalette;
    btnColor: ColorPalette;
    displayShadow: boolean;
}, {}>, Readonly<{
    default: any;
}> & {
    default: any;
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

import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    collapseId: string;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    visible?: boolean | undefined;
    iconColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    slotBgColor?: ColorPalette | undefined;
    accordion?: string | undefined;
}>, {
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    titleSize: string;
    titleColor: string;
    visible: boolean;
    iconColor: string;
    bgColor: string;
    slotBgColor: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "collapse-open": (visible: boolean, title: string) => void;
    "collapse-close": (visible: boolean, title: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    collapseId: string;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    visible?: boolean | undefined;
    iconColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    slotBgColor?: ColorPalette | undefined;
    accordion?: string | undefined;
}>, {
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    titleSize: string;
    titleColor: string;
    visible: boolean;
    iconColor: string;
    bgColor: string;
    slotBgColor: string;
}>>> & {
    "onCollapse-open"?: ((visible: boolean, title: string) => any) | undefined;
    "onCollapse-close"?: ((visible: boolean, title: string) => any) | undefined;
}, {
    visible: boolean;
    bgColor: ColorPalette;
    titleColor: ColorPalette;
    borderColor: ColorPalette;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    titleSize: HeadingSize;
    iconColor: ColorPalette;
    slotBgColor: ColorPalette;
}, {}>, Readonly<{
    content: any;
    tab: any;
}> & {
    content: any;
    tab: any;
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

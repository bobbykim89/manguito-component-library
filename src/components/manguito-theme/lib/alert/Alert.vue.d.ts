import type { ColorPalette } from '../../';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    color?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    shadow?: boolean | undefined;
    show?: boolean | undefined;
    dismissible?: boolean | undefined;
}>, {
    color: string;
    rounded: boolean;
    shadow: boolean;
    show: boolean;
    dismissible: boolean;
}>, {
    close: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (event: Event) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    color?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    shadow?: boolean | undefined;
    show?: boolean | undefined;
    dismissible?: boolean | undefined;
}>, {
    color: string;
    rounded: boolean;
    shadow: boolean;
    show: boolean;
    dismissible: boolean;
}>>> & {
    onClose?: ((event: Event) => any) | undefined;
}, {
    color: ColorPalette;
    shadow: boolean;
    rounded: boolean;
    show: boolean;
    dismissible: boolean;
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

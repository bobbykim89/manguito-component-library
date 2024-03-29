declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    accordion?: string | undefined;
    className?: string | undefined;
    visible?: boolean | undefined;
}>, {
    className: string;
    visible: boolean;
}>, {
    toggle: () => void;
    close: () => void;
    open: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    open: (visible: boolean) => void;
    close: (visible: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    accordion?: string | undefined;
    className?: string | undefined;
    visible?: boolean | undefined;
}>, {
    className: string;
    visible: boolean;
}>>> & {
    onOpen?: ((visible: boolean) => any) | undefined;
    onClose?: ((visible: boolean) => any) | undefined;
}, {
    visible: boolean;
    className: string;
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

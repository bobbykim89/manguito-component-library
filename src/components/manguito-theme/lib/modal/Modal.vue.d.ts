import type { ColorPalette, VerticalAlignment } from '../../';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title?: string | undefined;
    titleColor?: ColorPalette | undefined;
    className?: string | undefined;
    visible?: boolean | undefined;
    noBackdrop?: boolean | undefined;
    noHeader?: boolean | undefined;
    color?: ColorPalette | undefined;
    backdropColor?: ColorPalette | undefined;
    placement?: VerticalAlignment | undefined;
}>, {
    titleColor: string;
    className: string;
    visible: boolean;
    noBackdrop: boolean;
    noHeader: boolean;
    color: string;
    backdropColor: string;
    placement: string;
}>, {
    toggle: () => void;
    close: () => void;
    open: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    open: (visible: boolean) => void;
    close: (visible: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title?: string | undefined;
    titleColor?: ColorPalette | undefined;
    className?: string | undefined;
    visible?: boolean | undefined;
    noBackdrop?: boolean | undefined;
    noHeader?: boolean | undefined;
    color?: ColorPalette | undefined;
    backdropColor?: ColorPalette | undefined;
    placement?: VerticalAlignment | undefined;
}>, {
    titleColor: string;
    className: string;
    visible: boolean;
    noBackdrop: boolean;
    noHeader: boolean;
    color: string;
    backdropColor: string;
    placement: string;
}>>> & {
    onOpen?: ((visible: boolean) => any) | undefined;
    onClose?: ((visible: boolean) => any) | undefined;
}, {
    visible: boolean;
    className: string;
    color: ColorPalette;
    titleColor: ColorPalette;
    noBackdrop: boolean;
    noHeader: boolean;
    backdropColor: ColorPalette;
    placement: VerticalAlignment;
}, {}>, Readonly<{
    header(props: {
        close: () => void;
        status: boolean;
    }): any;
    body(props: {
        close: () => void;
        status: boolean;
    }): any;
    footer(props: {
        close: () => void;
        status: boolean;
    }): any;
}> & {
    header(props: {
        close: () => void;
        status: boolean;
    }): any;
    body(props: {
        close: () => void;
        status: boolean;
    }): any;
    footer(props: {
        close: () => void;
        status: boolean;
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

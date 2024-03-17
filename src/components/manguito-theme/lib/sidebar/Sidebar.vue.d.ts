import type { ColorPalette, DirectionX } from '../../index.js';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title?: string | undefined;
    titleColor?: ColorPalette | undefined;
    className?: string | undefined;
    visible?: boolean | undefined;
    noBackdrop?: boolean | undefined;
    noHeader?: boolean | undefined;
    color?: ColorPalette | undefined;
    backdropColor?: ColorPalette | undefined;
    placement?: DirectionX | undefined;
    width?: string | number | undefined;
}>, {
    titleColor: string;
    className: string;
    visible: boolean;
    noBackdrop: boolean;
    noHeader: boolean;
    color: string;
    backdropColor: string;
    placement: string;
    width: number;
}>, {
    toggle: () => void;
    open: () => void;
    close: (e: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    open: (...args: any[]) => void;
    close: (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title?: string | undefined;
    titleColor?: ColorPalette | undefined;
    className?: string | undefined;
    visible?: boolean | undefined;
    noBackdrop?: boolean | undefined;
    noHeader?: boolean | undefined;
    color?: ColorPalette | undefined;
    backdropColor?: ColorPalette | undefined;
    placement?: DirectionX | undefined;
    width?: string | number | undefined;
}>, {
    titleColor: string;
    className: string;
    visible: boolean;
    noBackdrop: boolean;
    noHeader: boolean;
    color: string;
    backdropColor: string;
    placement: string;
    width: number;
}>>> & {
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    visible: boolean;
    className: string;
    color: ColorPalette;
    titleColor: ColorPalette;
    noBackdrop: boolean;
    noHeader: boolean;
    backdropColor: ColorPalette;
    placement: DirectionX;
    width: string | number;
}, {}>, {
    header?(_: {
        close: (e: Event) => void;
        status: true;
    }): any;
    body?(_: {
        close: (e: Event) => void;
        status: true;
    }): any;
    footer?(_: {
        close: (e: Event) => void;
        status: true;
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

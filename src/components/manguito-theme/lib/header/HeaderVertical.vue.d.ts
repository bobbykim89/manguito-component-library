import type { ColorPalette } from '../../';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    bgColor?: ColorPalette | undefined;
    drawerBtnColor?: ColorPalette | undefined;
    drawerBtnBorder?: boolean | undefined;
    headerWidth?: number | undefined;
}>, {
    bgColor: string;
    drawerBtnColor: string;
    drawerBtnBorder: boolean;
    headerWidth: number;
}>, {
    headerClose: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "toggle-drawer": (event: Event, open: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    bgColor?: ColorPalette | undefined;
    drawerBtnColor?: ColorPalette | undefined;
    drawerBtnBorder?: boolean | undefined;
    headerWidth?: number | undefined;
}>, {
    bgColor: string;
    drawerBtnColor: string;
    drawerBtnBorder: boolean;
    headerWidth: number;
}>>> & {
    "onToggle-drawer"?: ((event: Event, open: boolean) => any) | undefined;
}, {
    bgColor: ColorPalette;
    drawerBtnColor: ColorPalette;
    drawerBtnBorder: boolean;
    headerWidth: number;
}, {}>, Readonly<{
    default: any;
    content: any;
    'content-bottom': any;
    'mobile-content'(props: {
        headerClose: () => void;
    }): any;
}> & {
    default: any;
    content: any;
    'content-bottom': any;
    'mobile-content'(props: {
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

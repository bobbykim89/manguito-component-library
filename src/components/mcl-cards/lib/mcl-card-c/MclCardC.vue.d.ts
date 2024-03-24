import type { ColorPalette, CrossOrigin, HeadingSize, OpacityRange } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    imageSource: string;
    imageAlt?: string | undefined;
    title?: string | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    highlightOpacity?: OpacityRange | undefined;
    displayTitle?: boolean | undefined;
    cardColor?: ColorPalette | undefined;
    imageCors?: CrossOrigin | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    highlightOpacity: number;
    displayTitle: boolean;
    cardColor: string;
    imageCors: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "card-click": (event: Event) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    imageSource: string;
    imageAlt?: string | undefined;
    title?: string | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    highlightOpacity?: OpacityRange | undefined;
    displayTitle?: boolean | undefined;
    cardColor?: ColorPalette | undefined;
    imageCors?: CrossOrigin | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    highlightOpacity: number;
    displayTitle: boolean;
    cardColor: string;
    imageCors: string;
}>>> & {
    "onCard-click"?: ((event: Event) => any) | undefined;
}, {
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    imageCors: CrossOrigin;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    highlightOpacity: OpacityRange;
    displayTitle: boolean;
    cardColor: ColorPalette;
}, {}>, Readonly<{
    'card-body': any;
}> & {
    'card-body': any;
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

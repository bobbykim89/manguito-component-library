import type { ColorPalette, HeadingSize, HeadingLevel } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleLevel?: HeadingLevel | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    fullWidth?: boolean | undefined;
    imageSource: string;
    displayGradients?: boolean | undefined;
    gradientColor?: ColorPalette | undefined;
}>, {
    titleLevel: string;
    titleSize: string;
    titleColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    fullWidth: boolean;
    displayGradients: boolean;
    gradientColor: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleLevel?: HeadingLevel | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    fullWidth?: boolean | undefined;
    imageSource: string;
    displayGradients?: boolean | undefined;
    gradientColor?: ColorPalette | undefined;
}>, {
    titleLevel: string;
    titleSize: string;
    titleColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    fullWidth: boolean;
    displayGradients: boolean;
    gradientColor: string;
}>>>, {
    titleColor: ColorPalette;
    titleLevel: HeadingLevel;
    titleSize: HeadingSize;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    fullWidth: boolean;
    displayGradients: boolean;
    gradientColor: ColorPalette;
}, {}>, {
    default?(_: {}): any;
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

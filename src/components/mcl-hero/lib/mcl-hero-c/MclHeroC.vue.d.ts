import type { HeadingSize, HeadingLevel, ColorPalette, BodyText } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleLevel?: HeadingLevel | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displayTitleShadow?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    imageSource: string;
    displayGradient?: boolean | undefined;
    gradientColor?: ColorPalette | undefined;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelTextSize?: BodyText | undefined;
    labelTextColor?: ColorPalette | undefined;
    labelBgColor?: ColorPalette | undefined;
    useSlot?: boolean | undefined;
}>, {
    titleLevel: string;
    titleSize: string;
    titleColor: string;
    displayTitleShadow: boolean;
    displayHighlight: boolean;
    displayGradient: boolean;
    highlightColor: string;
    gradientColor: string;
    displayLabel: boolean;
    labelTextSize: string;
    labelTextColor: string;
    labelBgColor: string;
    useSlot: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleLevel?: HeadingLevel | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displayTitleShadow?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    imageSource: string;
    displayGradient?: boolean | undefined;
    gradientColor?: ColorPalette | undefined;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelTextSize?: BodyText | undefined;
    labelTextColor?: ColorPalette | undefined;
    labelBgColor?: ColorPalette | undefined;
    useSlot?: boolean | undefined;
}>, {
    titleLevel: string;
    titleSize: string;
    titleColor: string;
    displayTitleShadow: boolean;
    displayHighlight: boolean;
    displayGradient: boolean;
    highlightColor: string;
    gradientColor: string;
    displayLabel: boolean;
    labelTextSize: string;
    labelTextColor: string;
    labelBgColor: string;
    useSlot: boolean;
}>>>, {
    titleColor: ColorPalette;
    titleLevel: HeadingLevel;
    titleSize: HeadingSize;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    gradientColor: ColorPalette;
    displayTitleShadow: boolean;
    displayGradient: boolean;
    displayLabel: boolean;
    labelTextSize: BodyText;
    labelTextColor: ColorPalette;
    labelBgColor: ColorPalette;
    useSlot: boolean;
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

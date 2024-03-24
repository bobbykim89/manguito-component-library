import type { ColorPalette, DirectionX, HeadingLevel, HeadingSize, OpacityRange } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleLevel?: HeadingLevel | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displaySubTitle?: boolean | undefined;
    subTitle?: string | undefined;
    subTitleLevel?: HeadingLevel | undefined;
    subTitleSize?: HeadingSize | undefined;
    subTitleColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    imageSource: string;
    bgColor?: ColorPalette | undefined;
    mobileImageBlur?: boolean | undefined;
    imgPosition?: DirectionX | undefined;
    displayFilter?: boolean | undefined;
    filterOpacity?: OpacityRange | undefined;
}>, {
    titleLevel: string;
    titleSize: string;
    titleColor: string;
    displaySubTitle: boolean;
    subTitleLevel: string;
    subTitleSize: string;
    subTitleColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    imgPosition: string;
    bgColor: string;
    mobileImageBlur: boolean;
    displayFilter: boolean;
    filterOpacity: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleLevel?: HeadingLevel | undefined;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    displaySubTitle?: boolean | undefined;
    subTitle?: string | undefined;
    subTitleLevel?: HeadingLevel | undefined;
    subTitleSize?: HeadingSize | undefined;
    subTitleColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    imageSource: string;
    bgColor?: ColorPalette | undefined;
    mobileImageBlur?: boolean | undefined;
    imgPosition?: DirectionX | undefined;
    displayFilter?: boolean | undefined;
    filterOpacity?: OpacityRange | undefined;
}>, {
    titleLevel: string;
    titleSize: string;
    titleColor: string;
    displaySubTitle: boolean;
    subTitleLevel: string;
    subTitleSize: string;
    subTitleColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    imgPosition: string;
    bgColor: string;
    mobileImageBlur: boolean;
    displayFilter: boolean;
    filterOpacity: number;
}>>>, {
    bgColor: ColorPalette;
    titleColor: ColorPalette;
    titleLevel: HeadingLevel;
    titleSize: HeadingSize;
    displaySubTitle: boolean;
    subTitleLevel: HeadingLevel;
    subTitleSize: HeadingSize;
    subTitleColor: ColorPalette;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    mobileImageBlur: boolean;
    imgPosition: DirectionX;
    displayFilter: boolean;
    filterOpacity: OpacityRange;
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

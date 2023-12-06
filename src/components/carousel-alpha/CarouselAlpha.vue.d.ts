import type { HeadingSize, ColorPalette, BodyText, SpacingLevel } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    displayTagLine?: boolean | undefined;
    tagLineUpperCase?: boolean | undefined;
    tagLine?: string | undefined;
    tagLineSize?: BodyText | undefined;
    tagLineColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    btnColor?: ColorPalette | undefined;
    btnBgColor?: ColorPalette | undefined;
    cardsContent: any[];
    cardsGap?: SpacingLevel | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    bgColor: string;
    displayTagLine: boolean;
    tagLineUpperCase: boolean;
    tagLineSize: string;
    tagLineColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    btnColor: string;
    btnBgColor: string;
    cardsGap: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "btn-prev": (...args: any[]) => void;
    "btn-next": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    displayTagLine?: boolean | undefined;
    tagLineUpperCase?: boolean | undefined;
    tagLine?: string | undefined;
    tagLineSize?: BodyText | undefined;
    tagLineColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    btnColor?: ColorPalette | undefined;
    btnBgColor?: ColorPalette | undefined;
    cardsContent: any[];
    cardsGap?: SpacingLevel | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    bgColor: string;
    displayTagLine: boolean;
    tagLineUpperCase: boolean;
    tagLineSize: string;
    tagLineColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    btnColor: string;
    btnBgColor: string;
    cardsGap: string;
}>>> & {
    "onBtn-prev"?: ((...args: any[]) => any) | undefined;
    "onBtn-next"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    bgColor: ColorPalette;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    displayTagLine: boolean;
    tagLineUpperCase: boolean;
    tagLineSize: BodyText;
    tagLineColor: ColorPalette;
    btnColor: ColorPalette;
    btnBgColor: ColorPalette;
    cardsGap: SpacingLevel;
}, {}>, {
    description?(_: {}): any;
    carousel?(_: {
        cards: any[];
        setRef: (el: any) => void;
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

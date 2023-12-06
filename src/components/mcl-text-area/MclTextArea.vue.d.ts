import type { ColorPalette, BodyText, SpacingLevel } from '@bobbykim/manguito-theme';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    identifier: string;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelSize?: BodyText | undefined;
    labelColor?: ColorPalette | undefined;
    labelBold?: boolean | undefined;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    placeholder?: string | undefined;
    displayShadow?: boolean | undefined;
    isRequired?: boolean | undefined;
    rows?: number | undefined;
    spacing?: SpacingLevel | undefined;
    modelValue?: string | undefined;
}>, {
    displayLabel: boolean;
    labelSize: string;
    labelColor: string;
    labelBold: boolean;
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    placeholder: string;
    displayShadow: boolean;
    isRequired: boolean;
    rows: number;
    spacing: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    identifier: string;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelSize?: BodyText | undefined;
    labelColor?: ColorPalette | undefined;
    labelBold?: boolean | undefined;
    displayBorder?: boolean | undefined;
    borderColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    placeholder?: string | undefined;
    displayShadow?: boolean | undefined;
    isRequired?: boolean | undefined;
    rows?: number | undefined;
    spacing?: SpacingLevel | undefined;
    modelValue?: string | undefined;
}>, {
    displayLabel: boolean;
    labelSize: string;
    labelColor: string;
    labelBold: boolean;
    displayBorder: boolean;
    borderColor: string;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: string;
    bgColor: string;
    placeholder: string;
    displayShadow: boolean;
    isRequired: boolean;
    rows: number;
    spacing: string;
}>>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    displayBorder: boolean;
    displayLabel: boolean;
    labelSize: BodyText;
    labelColor: ColorPalette;
    labelBold: boolean;
    borderColor: ColorPalette;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    bgColor: ColorPalette;
    placeholder: string;
    displayShadow: boolean;
    isRequired: boolean;
    rows: number;
    spacing: SpacingLevel;
}, {}>;
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

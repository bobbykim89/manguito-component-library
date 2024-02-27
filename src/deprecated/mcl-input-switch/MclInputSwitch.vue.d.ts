import type { ColorPalette, SpacingLevel, BodyText } from '@bobbykim/manguito-theme';
import type { SwitchSizeType } from './index.type';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    identifier: string;
    horizontal?: boolean | undefined;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelSize?: BodyText | undefined;
    labelColor?: ColorPalette | undefined;
    labelBold?: boolean | undefined;
    sliderColor?: ColorPalette | undefined;
    onColor?: ColorPalette | undefined;
    offColor?: ColorPalette | undefined;
    switchSize?: SwitchSizeType | undefined;
    rounded?: boolean | undefined;
    spacing?: SpacingLevel | undefined;
    modelValue?: boolean | undefined;
}>, {
    horizontal: boolean;
    displayLabel: boolean;
    labelSize: string;
    labelColor: string;
    labelBold: boolean;
    sliderColor: string;
    onColor: string;
    offColor: string;
    switchSize: string;
    rounded: boolean;
    spacing: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    identifier: string;
    horizontal?: boolean | undefined;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelSize?: BodyText | undefined;
    labelColor?: ColorPalette | undefined;
    labelBold?: boolean | undefined;
    sliderColor?: ColorPalette | undefined;
    onColor?: ColorPalette | undefined;
    offColor?: ColorPalette | undefined;
    switchSize?: SwitchSizeType | undefined;
    rounded?: boolean | undefined;
    spacing?: SpacingLevel | undefined;
    modelValue?: boolean | undefined;
}>, {
    horizontal: boolean;
    displayLabel: boolean;
    labelSize: string;
    labelColor: string;
    labelBold: boolean;
    sliderColor: string;
    onColor: string;
    offColor: string;
    switchSize: string;
    rounded: boolean;
    spacing: string;
}>>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    horizontal: boolean;
    displayLabel: boolean;
    labelSize: BodyText;
    labelColor: ColorPalette;
    labelBold: boolean;
    sliderColor: ColorPalette;
    onColor: ColorPalette;
    offColor: ColorPalette;
    switchSize: SwitchSizeType;
    rounded: boolean;
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

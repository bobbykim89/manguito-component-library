import type { ColorPalette } from '@bobbykim/manguito-theme';
import type { SwitchSizeType } from './index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    sliderColor?: ColorPalette | undefined;
    onColor?: ColorPalette | undefined;
    offColor?: ColorPalette | undefined;
    switchSize?: SwitchSizeType | undefined;
    rounded?: boolean | undefined;
    modelValue?: boolean | undefined;
}>, {
    sliderColor: string;
    onColor: string;
    offColor: string;
    switchSize: string;
    rounded: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    sliderColor?: ColorPalette | undefined;
    onColor?: ColorPalette | undefined;
    offColor?: ColorPalette | undefined;
    switchSize?: SwitchSizeType | undefined;
    rounded?: boolean | undefined;
    modelValue?: boolean | undefined;
}>, {
    sliderColor: string;
    onColor: string;
    offColor: string;
    switchSize: string;
    rounded: boolean;
}>>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    rounded: boolean;
    sliderColor: ColorPalette;
    onColor: ColorPalette;
    offColor: ColorPalette;
    switchSize: SwitchSizeType;
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

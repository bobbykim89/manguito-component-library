import type { ColorPalette } from '@bobbykim/manguito-theme';
import type { RadioSizeType } from './index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    radioSize?: RadioSizeType | undefined;
    bgColor?: ColorPalette | undefined;
    checkedColor?: ColorPalette | undefined;
    displayShadow?: boolean | undefined;
    value?: string | number | undefined;
    checked?: boolean | undefined;
}>, {
    radioSize: string;
    bgColor: string;
    checkedColor: string;
    displayShadow: boolean;
    value: string;
    checked: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    id: string;
    radioSize?: RadioSizeType | undefined;
    bgColor?: ColorPalette | undefined;
    checkedColor?: ColorPalette | undefined;
    displayShadow?: boolean | undefined;
    value?: string | number | undefined;
    checked?: boolean | undefined;
}>, {
    radioSize: string;
    bgColor: string;
    checkedColor: string;
    displayShadow: boolean;
    value: string;
    checked: boolean;
}>>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    checked: boolean;
    value: string | number;
    bgColor: ColorPalette;
    displayShadow: boolean;
    radioSize: RadioSizeType;
    checkedColor: ColorPalette;
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

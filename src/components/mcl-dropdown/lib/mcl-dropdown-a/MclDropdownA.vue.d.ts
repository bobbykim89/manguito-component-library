import type { ColorPalette, BodyText, FontWeight } from '@bobbykim/manguito-theme';
import type { DropdownItem } from './index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    buttonColor?: ColorPalette | undefined;
    buttonRounded?: boolean | undefined;
    buttonTextColor?: ColorPalette | undefined;
    buttonInvert?: boolean | undefined;
    dropdownItems: DropdownItem[];
    dropdownColor?: ColorPalette | undefined;
    displayBorder?: boolean | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
    hoverBgColor?: ColorPalette | undefined;
    dropdownTextSize?: BodyText | undefined;
    dropdownFontWeight?: FontWeight | undefined;
    dropdownTextColor?: ColorPalette | undefined;
    displaySeparator?: boolean | undefined;
}>, {
    buttonColor: string;
    buttonRounded: boolean;
    buttonTextColor: string;
    buttonInvert: boolean;
    dropdownColor: string;
    displayBorder: boolean;
    rounded: boolean;
    displayShadow: boolean;
    hoverBgColor: string;
    dropdownTextSize: string;
    dropdownFontWeight: string;
    dropdownTextColor: string;
    displaySeparator: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "button-click": (...args: any[]) => void;
    "item-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    buttonColor?: ColorPalette | undefined;
    buttonRounded?: boolean | undefined;
    buttonTextColor?: ColorPalette | undefined;
    buttonInvert?: boolean | undefined;
    dropdownItems: DropdownItem[];
    dropdownColor?: ColorPalette | undefined;
    displayBorder?: boolean | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
    hoverBgColor?: ColorPalette | undefined;
    dropdownTextSize?: BodyText | undefined;
    dropdownFontWeight?: FontWeight | undefined;
    dropdownTextColor?: ColorPalette | undefined;
    displaySeparator?: boolean | undefined;
}>, {
    buttonColor: string;
    buttonRounded: boolean;
    buttonTextColor: string;
    buttonInvert: boolean;
    dropdownColor: string;
    displayBorder: boolean;
    rounded: boolean;
    displayShadow: boolean;
    hoverBgColor: string;
    dropdownTextSize: string;
    dropdownFontWeight: string;
    dropdownTextColor: string;
    displaySeparator: boolean;
}>>> & {
    "onButton-click"?: ((...args: any[]) => any) | undefined;
    "onItem-click"?: ((...args: any[]) => any) | undefined;
}, {
    displayBorder: boolean;
    buttonColor: ColorPalette;
    buttonRounded: boolean;
    buttonTextColor: ColorPalette;
    buttonInvert: boolean;
    dropdownColor: ColorPalette;
    rounded: boolean;
    displayShadow: boolean;
    hoverBgColor: ColorPalette;
    dropdownTextSize: BodyText;
    dropdownFontWeight: FontWeight;
    dropdownTextColor: ColorPalette;
    displaySeparator: boolean;
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

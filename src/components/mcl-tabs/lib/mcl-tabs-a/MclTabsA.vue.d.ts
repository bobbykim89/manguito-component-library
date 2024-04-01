import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
import type { ContentType } from './index.types';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    content: ContentType[];
    borderColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    tabColor?: ColorPalette | undefined;
    titleSize?: HeadingSize | undefined;
    activeTitleColor?: ColorPalette | undefined;
    inactiveTitleColor?: ColorPalette | undefined;
    displayShadow?: boolean | undefined;
    rounded?: boolean | undefined;
}>, {
    borderColor: string;
    bgColor: string;
    tabColor: string;
    titleSize: string;
    activeTitleColor: string;
    inactiveTitleColor: string;
    displayShadow: boolean;
    rounded: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "tab-click": (event: Event, title: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    content: ContentType[];
    borderColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    tabColor?: ColorPalette | undefined;
    titleSize?: HeadingSize | undefined;
    activeTitleColor?: ColorPalette | undefined;
    inactiveTitleColor?: ColorPalette | undefined;
    displayShadow?: boolean | undefined;
    rounded?: boolean | undefined;
}>, {
    borderColor: string;
    bgColor: string;
    tabColor: string;
    titleSize: string;
    activeTitleColor: string;
    inactiveTitleColor: string;
    displayShadow: boolean;
    rounded: boolean;
}>>> & {
    "onTab-click"?: ((event: Event, title: string) => any) | undefined;
}, {
    rounded: boolean;
    bgColor: ColorPalette;
    borderColor: ColorPalette;
    tabColor: ColorPalette;
    titleSize: HeadingSize;
    activeTitleColor: ColorPalette;
    inactiveTitleColor: ColorPalette;
    displayShadow: boolean;
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

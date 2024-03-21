import type { ColorPalette, HeadingSize, CtaTarget, CrossOrigin } from '@bobbykim/manguito-theme';
import type { ColorMap } from './index.type';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    displayImage?: boolean | undefined;
    imageSource?: string | undefined;
    imageAlt?: string | undefined;
    crossOrigin?: CrossOrigin | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    backgroundColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    ctaText?: string | undefined;
    ctaLink: string;
    ctaLinkTarget?: CtaTarget | undefined;
    ctaAsLink?: boolean | undefined;
    ctaButton?: boolean | undefined;
    ctaButtonColor?: ColorPalette | undefined;
    ctaButtonBlock?: boolean | undefined;
    borderWidth?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;
    borderColor?: ColorPalette | undefined;
    gradient1?: ColorPalette | undefined;
    gradient2?: ColorPalette | undefined;
    customColor?: ColorMap | undefined;
}>, {
    displayImage: boolean;
    imageAlt: string;
    crossOrigin: string;
    titleSize: string;
    titleColor: string;
    backgroundColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    ctaText: string;
    ctaLinkTarget: string;
    ctaAsLink: boolean;
    ctaButton: boolean;
    ctaButtonColor: string;
    ctaButtonBlock: boolean;
    borderWidth: number;
    borderColor: string;
    gradient1: string;
    gradient2: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "card-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    displayImage?: boolean | undefined;
    imageSource?: string | undefined;
    imageAlt?: string | undefined;
    crossOrigin?: CrossOrigin | undefined;
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    backgroundColor?: ColorPalette | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    ctaText?: string | undefined;
    ctaLink: string;
    ctaLinkTarget?: CtaTarget | undefined;
    ctaAsLink?: boolean | undefined;
    ctaButton?: boolean | undefined;
    ctaButtonColor?: ColorPalette | undefined;
    ctaButtonBlock?: boolean | undefined;
    borderWidth?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;
    borderColor?: ColorPalette | undefined;
    gradient1?: ColorPalette | undefined;
    gradient2?: ColorPalette | undefined;
    customColor?: ColorMap | undefined;
}>, {
    displayImage: boolean;
    imageAlt: string;
    crossOrigin: string;
    titleSize: string;
    titleColor: string;
    backgroundColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    ctaText: string;
    ctaLinkTarget: string;
    ctaAsLink: boolean;
    ctaButton: boolean;
    ctaButtonColor: string;
    ctaButtonBlock: boolean;
    borderWidth: number;
    borderColor: string;
    gradient1: string;
    gradient2: string;
}>>> & {
    "onCard-click"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    displayImage: boolean;
    imageAlt: string;
    crossOrigin: CrossOrigin;
    titleSize: HeadingSize;
    backgroundColor: ColorPalette;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    ctaText: string;
    ctaLinkTarget: CtaTarget;
    ctaAsLink: boolean;
    ctaButton: boolean;
    ctaButtonColor: ColorPalette;
    ctaButtonBlock: boolean;
    borderWidth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    borderColor: ColorPalette;
    gradient1: ColorPalette;
    gradient2: ColorPalette;
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

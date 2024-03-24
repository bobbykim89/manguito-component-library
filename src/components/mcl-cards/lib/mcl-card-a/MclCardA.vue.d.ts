import type { ColorPalette, CrossOrigin, CtaTarget, HeadingSize } from '@bobbykim/manguito-theme';
import type { CardClickEvent } from '../common/index.types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    borderColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    displayImage?: boolean | undefined;
    imageSource?: string | undefined;
    imageAlt?: string | undefined;
    imageCors?: CrossOrigin | undefined;
    displayCta?: boolean | undefined;
    ctaAsLink?: boolean | undefined;
    ctaText?: string | undefined;
    ctaColor?: ColorPalette | undefined;
    ctaLink?: string | undefined;
    ctaTarget?: CtaTarget | undefined;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelTextColor?: ColorPalette | undefined;
    labelColor?: ColorPalette | undefined;
    enlargeOnHover?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    borderColor: string;
    bgColor: string;
    displayImage: boolean;
    imageCors: string;
    displayCta: boolean;
    ctaAsLink: boolean;
    ctaColor: string;
    ctaLink: string;
    ctaTarget: string;
    ctaText: string;
    displayLabel: boolean;
    labelText: string;
    labelTextColor: string;
    labelColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    enlargeOnHover: boolean;
    rounded: boolean;
    displayShadow: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "card-click": (event: Event, item: CardClickEvent) => void;
    "card-btn-click": (event: Event, item: CardClickEvent) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    borderColor?: ColorPalette | undefined;
    bgColor?: ColorPalette | undefined;
    displayImage?: boolean | undefined;
    imageSource?: string | undefined;
    imageAlt?: string | undefined;
    imageCors?: CrossOrigin | undefined;
    displayCta?: boolean | undefined;
    ctaAsLink?: boolean | undefined;
    ctaText?: string | undefined;
    ctaColor?: ColorPalette | undefined;
    ctaLink?: string | undefined;
    ctaTarget?: CtaTarget | undefined;
    displayLabel?: boolean | undefined;
    labelText?: string | undefined;
    labelTextColor?: ColorPalette | undefined;
    labelColor?: ColorPalette | undefined;
    enlargeOnHover?: boolean | undefined;
    displayHighlight?: boolean | undefined;
    highlightColor?: ColorPalette | undefined;
    rounded?: boolean | undefined;
    displayShadow?: boolean | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    borderColor: string;
    bgColor: string;
    displayImage: boolean;
    imageCors: string;
    displayCta: boolean;
    ctaAsLink: boolean;
    ctaColor: string;
    ctaLink: string;
    ctaTarget: string;
    ctaText: string;
    displayLabel: boolean;
    labelText: string;
    labelTextColor: string;
    labelColor: string;
    displayHighlight: boolean;
    highlightColor: string;
    enlargeOnHover: boolean;
    rounded: boolean;
    displayShadow: boolean;
}>>> & {
    "onCard-click"?: ((event: Event, item: CardClickEvent) => any) | undefined;
    "onCard-btn-click"?: ((event: Event, item: CardClickEvent) => any) | undefined;
}, {
    bgColor: ColorPalette;
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    borderColor: ColorPalette;
    displayImage: boolean;
    imageCors: CrossOrigin;
    displayCta: boolean;
    ctaAsLink: boolean;
    ctaText: string;
    ctaColor: ColorPalette;
    ctaLink: string;
    ctaTarget: CtaTarget;
    displayLabel: boolean;
    labelText: string;
    labelTextColor: ColorPalette;
    labelColor: ColorPalette;
    enlargeOnHover: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    rounded: boolean;
    displayShadow: boolean;
}, {}>, Readonly<{
    default: any;
}> & {
    default: any;
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

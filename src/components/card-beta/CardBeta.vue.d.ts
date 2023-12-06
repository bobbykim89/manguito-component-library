import type { ColorPalette, HeadingSize, CtaTarget, CrossOrigin } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleBlockColor?: ColorPalette | undefined;
    borderColor?: ColorPalette | undefined;
    imageSource?: string | undefined;
    imageAlt?: string | undefined;
    imageCors?: CrossOrigin | undefined;
    displayGrayScale?: boolean | undefined;
    ctaAsLink?: boolean | undefined;
    ctaLink?: string | undefined;
    ctaTarget?: CtaTarget | undefined;
    rounded?: boolean | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    titleBlockColor: string;
    borderColor: string;
    displayGrayScale: boolean;
    imageCors: string;
    ctaAsLink: boolean;
    ctaLink: string;
    ctaTarget: string;
    rounded: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "card-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    title: string;
    titleSize?: HeadingSize | undefined;
    titleColor?: ColorPalette | undefined;
    titleBlockColor?: ColorPalette | undefined;
    borderColor?: ColorPalette | undefined;
    imageSource?: string | undefined;
    imageAlt?: string | undefined;
    imageCors?: CrossOrigin | undefined;
    displayGrayScale?: boolean | undefined;
    ctaAsLink?: boolean | undefined;
    ctaLink?: string | undefined;
    ctaTarget?: CtaTarget | undefined;
    rounded?: boolean | undefined;
}>, {
    titleSize: string;
    titleColor: string;
    titleBlockColor: string;
    borderColor: string;
    displayGrayScale: boolean;
    imageCors: string;
    ctaAsLink: boolean;
    ctaLink: string;
    ctaTarget: string;
    rounded: boolean;
}>>> & {
    "onCard-click"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    titleBlockColor: ColorPalette;
    borderColor: ColorPalette;
    imageCors: CrossOrigin;
    displayGrayScale: boolean;
    ctaAsLink: boolean;
    ctaLink: string;
    ctaTarget: CtaTarget;
    rounded: boolean;
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

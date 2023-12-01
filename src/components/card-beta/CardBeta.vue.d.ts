import type { ColorPalette, HeadingSize, CtaTarget, CrossOrigin } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    titleBlockColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    imageSource: {
        type: import("vue").PropType<string>;
    };
    imageAlt: {
        type: import("vue").PropType<string>;
    };
    imageCors: {
        type: import("vue").PropType<CrossOrigin>;
        default: string;
    };
    displayGrayScale: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaLink: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "card-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    titleBlockColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    imageSource: {
        type: import("vue").PropType<string>;
    };
    imageAlt: {
        type: import("vue").PropType<string>;
    };
    imageCors: {
        type: import("vue").PropType<CrossOrigin>;
        default: string;
    };
    displayGrayScale: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaLink: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>> & {
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
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

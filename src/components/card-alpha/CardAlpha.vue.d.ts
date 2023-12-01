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
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayImage: {
        type: import("vue").PropType<boolean>;
        default: boolean;
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
    displayCta: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    ctaLink: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    displayLabel: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    labelTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    labelColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    enlargeOnHover: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "card-click": (...args: any[]) => void;
    "card-btn-click": (...args: any[]) => void;
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
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayImage: {
        type: import("vue").PropType<boolean>;
        default: boolean;
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
    displayCta: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    ctaLink: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    displayLabel: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    labelTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    labelColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    enlargeOnHover: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>> & {
    "onCard-click"?: ((...args: any[]) => any) | undefined;
    "onCard-btn-click"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    borderColor: ColorPalette;
    bgColor: ColorPalette;
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
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

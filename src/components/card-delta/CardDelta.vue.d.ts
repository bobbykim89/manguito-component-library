import type { ColorPalette, HeadingSize, CtaTarget, CrossOrigin } from '@bobbykim/manguito-theme';
import type { ColorMap } from './index.type';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    titleColor: {
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
        default: string;
    };
    crossOrigin: {
        type: import("vue").PropType<CrossOrigin>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    backgroundColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    ctaText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaLink: {
        type: import("vue").PropType<string>;
        required: true;
    };
    ctaLinkTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    ctaAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaButtonColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    ctaButtonBlock: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    borderWidth: {
        type: import("vue").PropType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>;
        default: number;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    gradient1: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    gradient2: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    customColor: {
        type: import("vue").PropType<ColorMap>;
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
    displayImage: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    imageSource: {
        type: import("vue").PropType<string>;
    };
    imageAlt: {
        type: import("vue").PropType<string>;
        default: string;
    };
    crossOrigin: {
        type: import("vue").PropType<CrossOrigin>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    backgroundColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayHighlight: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    highlightColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    ctaText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    ctaLink: {
        type: import("vue").PropType<string>;
        required: true;
    };
    ctaLinkTarget: {
        type: import("vue").PropType<CtaTarget>;
        default: string;
    };
    ctaAsLink: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    ctaButtonColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    ctaButtonBlock: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    borderWidth: {
        type: import("vue").PropType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>;
        default: number;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    gradient1: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    gradient2: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    customColor: {
        type: import("vue").PropType<ColorMap>;
    };
}>> & {
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
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

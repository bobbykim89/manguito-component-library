import type { HeadingSize, ColorPalette, BodyText, SpacingLevel } from '@bobbykim/manguito-theme';
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
    bgColor: {
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
    displayTagLine: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    tagLineUpperCase: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    tagLine: {
        type: import("vue").PropType<string>;
    };
    tagLineSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    tagLineColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    btnColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    btnBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    cardsContent: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
    cardsGap: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "btn-prev": (...args: any[]) => void;
    "btn-next": (...args: any[]) => void;
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
    bgColor: {
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
    displayTagLine: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    tagLineUpperCase: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    tagLine: {
        type: import("vue").PropType<string>;
    };
    tagLineSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    tagLineColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    btnColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    btnBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    cardsContent: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
    cardsGap: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
}>> & {
    "onBtn-prev"?: ((...args: any[]) => any) | undefined;
    "onBtn-next"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    bgColor: ColorPalette;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    displayTagLine: boolean;
    tagLineUpperCase: boolean;
    tagLineSize: BodyText;
    tagLineColor: ColorPalette;
    btnColor: ColorPalette;
    btnBgColor: ColorPalette;
    cardsGap: SpacingLevel;
}, {}>, {
    description?(_: {}): any;
    carousel?(_: {
        cards: any[];
        setRef: (el: any) => void;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

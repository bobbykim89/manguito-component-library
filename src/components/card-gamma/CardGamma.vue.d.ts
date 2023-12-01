import type { ColorPalette, CrossOrigin, HeadingSize, OpacityRange } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    imageSource: {
        type: import("vue").PropType<string>;
        required: true;
    };
    imageAlt: {
        type: import("vue").PropType<string>;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
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
    highlightOpacity: {
        type: import("vue").PropType<OpacityRange>;
        default: number;
    };
    displayTitle: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    cardColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    crossOrigin: {
        type: import("vue").PropType<CrossOrigin>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "card-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: import("vue").PropType<string>;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    imageSource: {
        type: import("vue").PropType<string>;
        required: true;
    };
    imageAlt: {
        type: import("vue").PropType<string>;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
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
    highlightOpacity: {
        type: import("vue").PropType<OpacityRange>;
        default: number;
    };
    displayTitle: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    cardColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    crossOrigin: {
        type: import("vue").PropType<CrossOrigin>;
        default: string;
    };
}>> & {
    "onCard-click"?: ((...args: any[]) => any) | undefined;
}, {
    titleColor: ColorPalette;
    titleSize: HeadingSize;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    highlightOpacity: OpacityRange;
    displayTitle: boolean;
    cardColor: ColorPalette;
    crossOrigin: CrossOrigin;
}, {}>, {
    "card-body"?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

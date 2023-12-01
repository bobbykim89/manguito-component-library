import type { ColorPalette, BodyText, SpacingLevel } from '@bobbykim/manguito-theme';
declare const _default: import("vue").DefineComponent<{
    displayBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    identifier: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayLabel: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelText: {
        type: import("vue").PropType<string>;
    };
    labelSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    labelColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    labelBold: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
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
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    isRequired: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    rows: {
        type: import("vue").PropType<number>;
        default: number;
    };
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<string>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    displayBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    identifier: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayLabel: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelText: {
        type: import("vue").PropType<string>;
    };
    labelSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    labelColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    labelBold: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    rounded: {
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
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    isRequired: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    rows: {
        type: import("vue").PropType<number>;
        default: number;
    };
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<string>;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    displayBorder: boolean;
    displayLabel: boolean;
    labelSize: BodyText;
    labelColor: ColorPalette;
    labelBold: boolean;
    borderColor: ColorPalette;
    rounded: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    bgColor: ColorPalette;
    placeholder: string;
    displayShadow: boolean;
    isRequired: boolean;
    rows: number;
    spacing: SpacingLevel;
}, {}>;
export default _default;

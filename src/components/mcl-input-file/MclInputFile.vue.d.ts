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
    buttonText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    buttonTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    buttonColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    isRequired: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    accept: {
        type: import("vue").PropType<string>;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<File>;
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
    buttonText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    buttonTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    buttonColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    isRequired: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    accept: {
        type: import("vue").PropType<string>;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<File>;
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
    buttonText: string;
    buttonTextColor: ColorPalette;
    buttonColor: ColorPalette;
    displayShadow: boolean;
    placeholder: string;
    isRequired: boolean;
    spacing: SpacingLevel;
    accept: string;
}, {}>;
export default _default;

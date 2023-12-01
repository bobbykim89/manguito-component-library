import type { ColorPalette, BodyText, SpacingLevel } from '@bobbykim/manguito-theme';
import type { SelectOptionType } from './index.type';
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
    arrowColor: {
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
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    options: {
        type: import("vue").PropType<SelectOptionType[]>;
        required: true;
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
    arrowColor: {
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
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    options: {
        type: import("vue").PropType<SelectOptionType[]>;
        required: true;
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
    arrowColor: ColorPalette;
    placeholder: string;
    displayShadow: boolean;
    isRequired: boolean;
    spacing: SpacingLevel;
}, {}>;
export default _default;

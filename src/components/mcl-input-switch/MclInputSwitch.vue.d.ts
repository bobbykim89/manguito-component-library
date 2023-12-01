import type { ColorPalette, SpacingLevel, BodyText } from '@bobbykim/manguito-theme';
import type { SwitchSizeType } from './index.type';
declare const _default: import("vue").DefineComponent<{
    identifier: {
        type: import("vue").PropType<string>;
        required: true;
    };
    horizontal: {
        type: import("vue").PropType<boolean>;
        default: boolean;
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
    sliderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    onColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    offColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    switchSize: {
        type: import("vue").PropType<SwitchSizeType>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<boolean>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    identifier: {
        type: import("vue").PropType<string>;
        required: true;
    };
    horizontal: {
        type: import("vue").PropType<boolean>;
        default: boolean;
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
    sliderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    onColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    offColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    switchSize: {
        type: import("vue").PropType<SwitchSizeType>;
        default: string;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    spacing: {
        type: import("vue").PropType<SpacingLevel>;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<boolean>;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    horizontal: boolean;
    displayLabel: boolean;
    labelSize: BodyText;
    labelColor: ColorPalette;
    labelBold: boolean;
    sliderColor: ColorPalette;
    onColor: ColorPalette;
    offColor: ColorPalette;
    switchSize: SwitchSizeType;
    rounded: boolean;
    spacing: SpacingLevel;
}, {}>;
export default _default;

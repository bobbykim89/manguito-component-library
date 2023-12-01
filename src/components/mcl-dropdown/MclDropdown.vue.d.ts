import type { ColorPalette, BodyText, FontWeight } from '@bobbykim/manguito-theme';
import type { DropdownItem } from './index.types';
declare const _default: import("vue").DefineComponent<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    buttonColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    buttonRounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    buttonTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    buttonInvert: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    dropdownItems: {
        type: import("vue").PropType<DropdownItem[]>;
        required: true;
    };
    dropdownColor: {
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
    hoverBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    dropdownTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    dropdownFontWeight: {
        type: import("vue").PropType<FontWeight>;
        default: string;
    };
    dropdownTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displaySeparator: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "button-click": (...args: any[]) => void;
    "item-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: import("vue").PropType<string>;
        required: true;
    };
    displayBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    buttonColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    buttonRounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    buttonTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    buttonInvert: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    dropdownItems: {
        type: import("vue").PropType<DropdownItem[]>;
        required: true;
    };
    dropdownColor: {
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
    hoverBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    dropdownTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    dropdownFontWeight: {
        type: import("vue").PropType<FontWeight>;
        default: string;
    };
    dropdownTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displaySeparator: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>> & {
    "onButton-click"?: ((...args: any[]) => any) | undefined;
    "onItem-click"?: ((...args: any[]) => any) | undefined;
}, {
    displayBorder: boolean;
    buttonColor: ColorPalette;
    buttonRounded: boolean;
    buttonTextColor: ColorPalette;
    buttonInvert: boolean;
    dropdownColor: ColorPalette;
    rounded: boolean;
    displayShadow: boolean;
    hoverBgColor: ColorPalette;
    dropdownTextSize: BodyText;
    dropdownFontWeight: FontWeight;
    dropdownTextColor: ColorPalette;
    displaySeparator: boolean;
}, {}>;
export default _default;

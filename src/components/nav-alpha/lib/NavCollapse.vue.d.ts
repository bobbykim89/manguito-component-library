import type { ColorPalette, BodyText } from '@bobbykim/manguito-theme';
import type { NavCollapseType } from '../index.type';
declare const _default: import("vue").DefineComponent<{
    navItem: {
        type: import("vue").PropType<NavCollapseType>;
        required: true;
    };
    menuTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    menuTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    menuTextBold: {
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
    hoverBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    navId: {
        type: import("vue").PropType<string>;
        required: true;
    };
    navAccordionGroup: {
        type: import("vue").PropType<string>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "nav-link": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    navItem: {
        type: import("vue").PropType<NavCollapseType>;
        required: true;
    };
    menuTextSize: {
        type: import("vue").PropType<BodyText>;
        default: string;
    };
    menuTextColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    menuTextBold: {
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
    hoverBgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    navId: {
        type: import("vue").PropType<string>;
        required: true;
    };
    navAccordionGroup: {
        type: import("vue").PropType<string>;
        required: true;
    };
}>> & {
    "onNav-link"?: ((...args: any[]) => any) | undefined;
}, {
    menuTextSize: BodyText;
    menuTextColor: ColorPalette;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
    bgColor: ColorPalette;
    hoverBgColor: ColorPalette;
}, {}>;
export default _default;

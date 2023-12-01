import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme';
import type { NavItemType } from '../index.type';
declare const _default: import("vue").DefineComponent<{
    navItem: {
        type: import("vue").PropType<NavItemType>;
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
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "nav-link": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    navItem: {
        type: import("vue").PropType<NavItemType>;
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
}>> & {
    "onNav-link"?: ((...args: any[]) => any) | undefined;
}, {
    menuTextSize: BodyText;
    menuTextColor: ColorPalette;
    menuTextBold: boolean;
    displayHighlight: boolean;
    highlightColor: ColorPalette;
}, {}>;
export default _default;

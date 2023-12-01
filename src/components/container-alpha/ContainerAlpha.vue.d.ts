import type { ColorPalette, DirectionX, ColumnWidth } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    sectionBg: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    containerBg: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    topDirection: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    bottomDirection: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    displayRightColumn: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    leftColumnWidth: {
        type: import("vue").PropType<ColumnWidth>;
        default: number;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    sectionBg: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    containerBg: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    topDirection: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    bottomDirection: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    displayRightColumn: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    leftColumnWidth: {
        type: import("vue").PropType<ColumnWidth>;
        default: number;
    };
}>>, {
    sectionBg: ColorPalette;
    containerBg: ColorPalette;
    topDirection: DirectionX;
    bottomDirection: DirectionX;
    displayRightColumn: boolean;
    leftColumnWidth: ColumnWidth;
}, {}>, {
    "left-column"?(_: {}): any;
    "right-column"?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

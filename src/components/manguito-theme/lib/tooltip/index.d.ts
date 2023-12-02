import { PropType } from 'vue';
import type { Direction, ColorPalette } from '../../index.js';
declare const _default: import("vue").DefineComponent<{
    direction: {
        type: PropType<Direction>;
        default: string;
    };
    color: {
        type: PropType<ColorPalette>;
        default: string;
    };
    textColor: {
        type: PropType<ColorPalette>;
        default: string;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    customClass: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    direction: {
        type: PropType<Direction>;
        default: string;
    };
    color: {
        type: PropType<ColorPalette>;
        default: string;
    };
    textColor: {
        type: PropType<ColorPalette>;
        default: string;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    customClass: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
}>>, {
    direction: Direction;
    color: ColorPalette;
    textColor: ColorPalette;
    width: string | number;
    customClass: string;
}, {}>;
export default _default;

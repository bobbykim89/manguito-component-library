import type { ColorPalette, DirectionX } from '../../index.js';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    visible: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    className: {
        type: import("vue").PropType<string>;
        default: string;
    };
    title: {
        type: import("vue").PropType<string>;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    noBackdrop: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    noHeader: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    color: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    backdropColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    placement: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    width: {
        type: import("vue").PropType<string | number>;
        default: number;
    };
}, {
    toggle: () => void;
    open: () => void;
    close: (e: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    open: (...args: any[]) => void;
    close: (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    visible: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    className: {
        type: import("vue").PropType<string>;
        default: string;
    };
    title: {
        type: import("vue").PropType<string>;
    };
    titleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    noBackdrop: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    noHeader: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    color: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    backdropColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    placement: {
        type: import("vue").PropType<DirectionX>;
        default: string;
    };
    width: {
        type: import("vue").PropType<string | number>;
        default: number;
    };
}>> & {
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    visible: boolean;
    className: string;
    titleColor: ColorPalette;
    noBackdrop: boolean;
    noHeader: boolean;
    color: ColorPalette;
    backdropColor: ColorPalette;
    placement: DirectionX;
    width: string | number;
}, {}>, {
    header?(_: {
        close: (e: Event) => void;
        status: true;
    }): any;
    body?(_: {
        close: (e: Event) => void;
        status: true;
    }): any;
    footer?(_: {
        close: (e: Event) => void;
        status: true;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

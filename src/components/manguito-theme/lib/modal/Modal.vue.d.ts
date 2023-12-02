import type { ColorPalette, VerticalAlignment } from '../../index.js';
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
        type: import("vue").PropType<VerticalAlignment>;
        default: string;
    };
}, {
    toggle: () => void;
    close: () => void;
    open: () => void;
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
        type: import("vue").PropType<VerticalAlignment>;
        default: string;
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
    placement: VerticalAlignment;
}, {}>, {
    header?(_: {
        close: () => void;
        status: true;
    }): any;
    body?(_: {
        close: () => void;
        status: true;
    }): any;
    footer?(_: {
        close: () => void;
        status: true;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

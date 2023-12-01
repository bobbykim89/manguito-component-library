declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    visible: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    accordion: {
        type: import("vue").PropType<string>;
    };
    className: {
        type: import("vue").PropType<string>;
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
    accordion: {
        type: import("vue").PropType<string>;
    };
    className: {
        type: import("vue").PropType<string>;
        default: string;
    };
}>> & {
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    visible: boolean;
    className: string;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    toggle: (...args: any[]) => void;
    "click-outside": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onToggle?: ((...args: any[]) => any) | undefined;
    "onClick-outside"?: ((...args: any[]) => any) | undefined;
}, {}, {}>, {
    toggler?(_: {
        toggle: (e: Event) => void;
        dropdownState: boolean;
    }): any;
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

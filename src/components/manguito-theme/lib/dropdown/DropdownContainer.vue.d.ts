declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "click-outside": (event: Event) => void;
    toggle: (event: Event) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onToggle?: ((event: Event) => any) | undefined;
    "onClick-outside"?: ((event: Event) => any) | undefined;
}, {}, {}>, Readonly<{
    default: any;
    toggler: any;
}> & {
    default: any;
    toggler: any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

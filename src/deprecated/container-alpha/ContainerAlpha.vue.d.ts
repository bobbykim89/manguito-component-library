import type { ColorPalette, DirectionX, ColumnWidth } from '@bobbykim/manguito-theme';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    sectionBg?: ColorPalette | undefined;
    containerBg?: ColorPalette | undefined;
    topDirection?: DirectionX | undefined;
    bottomDirection?: DirectionX | undefined;
    displayRightColumn?: boolean | undefined;
    leftColumnWidth?: ColumnWidth | undefined;
}>, {
    sectionBg: string;
    containerBg: string;
    topDirection: string;
    bottomDirection: string;
    displayRightColumn: boolean;
    leftColumnWidth: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    sectionBg?: ColorPalette | undefined;
    containerBg?: ColorPalette | undefined;
    topDirection?: DirectionX | undefined;
    bottomDirection?: DirectionX | undefined;
    displayRightColumn?: boolean | undefined;
    leftColumnWidth?: ColumnWidth | undefined;
}>, {
    sectionBg: string;
    containerBg: string;
    topDirection: string;
    bottomDirection: string;
    displayRightColumn: boolean;
    leftColumnWidth: number;
}>>>, {
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
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

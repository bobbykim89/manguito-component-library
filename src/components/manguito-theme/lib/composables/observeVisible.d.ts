import type { Ref } from 'vue';
export declare const observeVisibleAttr: (el: Ref, fn: (...args: any[]) => void) => {
    isSupported: import("vue").ComputedRef<boolean>;
    stop: () => void;
    takeRecords: () => MutationRecord[] | undefined;
};

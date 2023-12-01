export const observeVisibleAttr = (fn) => {
    const observer = new MutationObserver((mutations) => {
        let changed = false;
        for (let i = 0; i < mutations.length && !changed; i++) {
            const mutation = mutations[i];
            const mutationType = mutation.type;
            const mutationAttribute = mutation.attributeName;
            const mutationTarget = mutation.target;
            if (mutationType === 'attributes') {
                changed = true;
            }
            else if (mutationAttribute === 'visible') {
                changed = true;
            }
            if (changed) {
                const visibleAttr = mutationTarget.getAttribute('visible') === 'true'
                    ? true
                    : false;
                fn(visibleAttr);
            }
        }
    });
    return observer;
};
//# sourceMappingURL=observeVisible.js.map
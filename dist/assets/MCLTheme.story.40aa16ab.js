import { ar as defineComponent, as as resolveComponent, at as createBlock, au as withCtx, av as openBlock, aw as createCommentVNode, ax as createVNode, ay as createElementBlock, az as renderList, aA as Fragment, aB as createBaseVNode, aC as normalizeClass, aD as toDisplayString } from "./vendor.ee93adbd.js";
import { _ as _export_sfc, g as generateClass } from "./_plugin-vue_export-helper.e3a59fa7.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MCLTheme.story",
  setup(__props, { expose }) {
    expose();
    const colors = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      success: "bg-success",
      danger: "bg-danger",
      info: "bg-info",
      warning: "bg-warning",
      "light-1": "bg-light-1",
      "light-2": "bg-light-2",
      "light-3": "bg-light-3",
      "light-4": "bg-light-4",
      "dark-1": "bg-dark-1",
      "dark-2": "bg-dark-2",
      "dark-3": "bg-dark-3",
      "dark-4": "bg-dark-4",
      black: "bg-black",
      white: "bg-white"
    };
    const spacings = {
      "3xs": { size: "4px", class: "h-3xs w-3xs" },
      "2xs": { size: "8px", class: "h-2xs w-2xs" },
      xs: { size: "16px", class: "h-xs w-xs" },
      sm: { size: "24px", class: "h-sm w-sm" },
      md: { size: "32px", class: "h-md w-md" },
      lg: { size: "48px", class: "h-lg w-lg" },
      xl: { size: "64px", class: "h-xl w-xl" },
      "2xl": { size: "96px", class: "h-2xl w-2xl" },
      "3xl": { size: "128px", class: "h-3xl w-3xl" }
    };
    const bodyTextSize = {
      xs: { size: "12px", class: "text-xs" },
      sm: { size: "14px", class: "text-sm" },
      md: { size: "16px", class: "text-md" },
      lg: { size: "18px", class: "text-lg" },
      xl: { size: "20px", class: "text-xl" }
    };
    const generateFontColor = (input) => {
      return generateClass("TEXTCOLOR", input);
    };
    const generateRandomBg = (size) => {
      const randomNum = Math.floor(Math.random() * 6);
      const bgClasses = [
        "bg-primary",
        "bg-secondary",
        "bg-success",
        "bg-danger",
        "bg-info",
        "bg-warning"
      ];
      return `${size} ${bgClasses[randomNum]}`;
    };
    const __returned__ = { colors, spacings, bodyTextSize, generateFontColor, generateRandomBg };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "flex items-center justify-center" };
const _hoisted_2 = { class: "flex items-center justify-center" };
const _hoisted_3 = { class: "drop-shadow-md text-warning" };
const _hoisted_4 = { class: "flex items-center justify-center" };
const _hoisted_5 = { class: "flex items-center justify-center" };
const _hoisted_6 = { class: "drop-shadow-md text-warning" };
const _hoisted_7 = { class: "flex items-center justify-center bg-white p-xs" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "MCL Theme",
    group: "design-system"
  }, {
    default: withCtx(() => [
      createCommentVNode(" color palette section "),
      createVNode(_component_Variant, { title: "Color Palette" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList($setup.colors, (color, index) => {
            return createBaseVNode("div", {
              class: "grid grid-cols-2 gap-6 content-center mb-2xs",
              key: `color-${index}`
            }, [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("h3", {
                  class: normalizeClass(["capitalize drop-shadow-md", $setup.generateFontColor(index)])
                }, toDisplayString(index), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["h-lg", color])
              }, null, 2)
            ]);
          }), 64))
        ]),
        _: 1
      }),
      createCommentVNode(" spading section "),
      createVNode(_component_Variant, { title: "Spacing" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList($setup.spacings, (unit, index) => {
            return createBaseVNode("div", {
              class: "grid grid-cols-2 gap-6 content-center mb-2xs",
              key: index
            }, [
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("h3", _hoisted_3, toDisplayString(index) + ": " + toDisplayString(unit.size), 1)
              ]),
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("div", {
                  class: normalizeClass($setup.generateRandomBg(unit.class))
                }, null, 2)
              ])
            ]);
          }), 64))
        ]),
        _: 1
      }),
      createCommentVNode(" body text "),
      createVNode(_component_Variant, { title: "Body Text" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList($setup.bodyTextSize, (unit, index) => {
            return createBaseVNode("div", {
              class: "grid grid-cols-2 gap-6 content-center mb-2xs",
              key: index
            }, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("h3", _hoisted_6, toDisplayString(index) + ": " + toDisplayString(unit.size), 1)
              ]),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", {
                  class: normalizeClass(unit.class)
                }, " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione debitis, natus, veniam reiciendis voluptatum dolore minima qui iure quam vitae fuga, et accusamus excepturi eos dolorem illum molestias quo nesciunt. ", 2)
              ])
            ]);
          }), 64))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/stories/documentation/MCLTheme.story.vue";
const MCLTheme_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/stories/documentation/MCLTheme.story.vue"]]);
export {
  MCLTheme_story as default
};

import { ar as defineComponent, av as openBlock, ay as createElementBlock, aG as renderSlot, aC as normalizeClass, aI as reactive, as as resolveComponent, at as createBlock, au as withCtx, ax as createVNode, aJ as createTextVNode, aD as toDisplayString } from "./vendor.ab35a370.js";
import { _ as _export_sfc, g as generateClass } from "./_plugin-vue_export-helper.53a8fb99.js";
import { c as colors, b as bodyTextSize, d as buttonSize } from "./index.4e10c01f.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Btn",
  props: {
    color: { type: null, required: false, default: "primary" },
    textSize: { type: null, required: false, default: "md" },
    buttonSize: { type: String, required: false, default: "medium" },
    isBlock: { type: Boolean, required: false, default: false },
    rounded: { type: Boolean, required: false, default: false }
  },
  emits: ["btn-click"],
  setup(__props, { expose, emit }) {
    expose();
    const buttonConfig = (color, textSize, btnSize, block, rounded) => {
      const lightColor = ["light-1", "light-2", "light-3", "light-4"];
      let textColor = lightColor.includes(color) ? "text-black" : "text-white";
      let isBlock = block ? "block w-full" : "";
      let corner = rounded ? "rounded-full" : "rounded";
      let buttonSize2;
      if (btnSize === "medium") {
        buttonSize2 = "px-4 py-2";
      } else if (btnSize === "small") {
        buttonSize2 = "px-2 py-1";
      } else {
        buttonSize2 = "px-5 py-2.5";
      }
      return `${generateClass(
        "BGCOLOR",
        color
      )} ${textColor} ${buttonSize2} ${generateClass(
        "BODYTEXT",
        textSize
      )} ${isBlock} ${corner}`;
    };
    const handleButtonClick = (e) => {
      emit("btn-click", e);
    };
    const __returned__ = { emit, buttonConfig, handleButtonClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    class: normalizeClass(["bg-opacity-100 hover:bg-opacity-70 transition-all duration-300 ease-linear", $setup.buttonConfig($props.color, $props.textSize, $props.buttonSize, $props.isBlock, $props.rounded)]),
    onClick: $setup.handleButtonClick
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
_sfc_main$1.__file = "src/components/btn/Btn.vue";
const Btn = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/btn/Btn.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Btn.story",
  setup(__props, { expose }) {
    expose();
    const state = reactive({
      text: "Button Text",
      color: "primary",
      textSize: "md",
      buttonSize: "medium",
      block: false,
      rounded: false
    });
    const __returned__ = { state, Btn, colors, bodyTextSize, buttonSize };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_HstText = resolveComponent("HstText");
  const _component_HstSelect = resolveComponent("HstSelect");
  const _component_HstCheckbox = resolveComponent("HstCheckbox");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, { title: "Btn" }, {
    controls: withCtx(() => [
      createVNode(_component_HstText, {
        title: "Text",
        modelValue: $setup.state.text,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.state.text = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstSelect, {
        title: "color",
        modelValue: $setup.state.color,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.state.color = $event),
        options: $setup.colors
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSelect, {
        title: "text-size",
        modelValue: $setup.state.textSize,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.state.textSize = $event),
        options: $setup.bodyTextSize
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSelect, {
        title: "button size",
        modelValue: $setup.state.buttonSize,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.state.buttonSize = $event),
        options: $setup.buttonSize
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstCheckbox, {
        title: "is-block",
        modelValue: $setup.state.block,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.state.block = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstCheckbox, {
        title: "rounded",
        modelValue: $setup.state.rounded,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.state.rounded = $event)
      }, null, 8, ["modelValue"])
    ]),
    default: withCtx(() => [
      createVNode($setup["Btn"], {
        "is-block": $setup.state.block,
        rounded: $setup.state.rounded,
        color: $setup.state.color,
        "text-size": $setup.state.textSize,
        "button-size": $setup.state.buttonSize
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString($setup.state.text), 1)
        ]),
        _: 1
      }, 8, ["is-block", "rounded", "color", "text-size", "button-size"])
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/stories/components/btn/Btn.story.vue";
const Btn_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/stories/components/btn/Btn.story.vue"]]);
export {
  Btn_story as default
};

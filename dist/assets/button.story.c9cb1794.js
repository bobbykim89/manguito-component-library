import { ar as defineComponent, av as openBlock, ay as createElementBlock, aG as renderSlot, aC as normalizeClass, aI as reactive, as as resolveComponent, at as createBlock, au as withCtx, ax as createVNode, aJ as createTextVNode, aD as toDisplayString } from "./vendor.4286a069.js";
import { _ as _export_sfc, g as generateClass } from "./_plugin-vue_export-helper.e3a59fa7.js";
import { c as colors, b as bodyTextSize, a as buttonSize } from "./index.0271104e.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BtnAlpha",
  props: {
    color: { type: null, required: false, default: "primary" },
    textSize: { type: null, required: false, default: "md" },
    buttonSize: { type: null, required: false, default: "medium" },
    isBlock: { type: Boolean, required: false, default: false },
    rounded: { type: Boolean, required: false, default: false },
    displayShadow: { type: Boolean, required: false, default: false }
  },
  emits: ["btn-click"],
  setup(__props, { expose, emit }) {
    expose();
    const buttonConfig = (color, textSize, btnSize, block, rounded, shadow) => {
      const lightColor = ["light-1", "light-2", "light-3", "light-4"];
      let textColor = lightColor.includes(color) ? "text-black" : "text-white";
      let isBlock = block ? "block w-full" : "";
      let corner = rounded ? "rounded-full" : "rounded";
      let showShadow = shadow ? "drop-shadow-md	" : "";
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
      )} ${isBlock} ${corner} ${showShadow}`;
    };
    const handleButtonClick = (e) => {
      emit("btn-click", e);
    };
    const __returned__ = { emit, buttonConfig, handleButtonClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    class: normalizeClass([
      "bg-opacity-100 hover:bg-opacity-70 transition-all duration-300 ease-linear",
      $setup.buttonConfig($props.color, $props.textSize, $props.buttonSize, $props.isBlock, $props.rounded, $props.displayShadow)
    ]),
    onClick: $setup.handleButtonClick
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
_sfc_main$2.__file = "src/components/btn-alpha/BtnAlpha.vue";
const BtnAlpha = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/btn-alpha/BtnAlpha.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BtnBeta",
  props: {
    color: { type: null, required: false, default: "primary" },
    hoverColor: { type: null, required: false, default: "light-1" },
    textSize: { type: null, required: false, default: "md" },
    buttonSize: { type: null, required: false, default: "medium" },
    isBlock: { type: Boolean, required: false, default: false },
    rounded: { type: Boolean, required: false, default: false },
    displayShadow: { type: Boolean, required: false, default: true }
  },
  emits: ["btn-click"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const buttonConfig = (color, hvColor, textSize, btnSize, block, rounded, shadow) => {
      const classArray = [
        generateClass("BORDER", color),
        generateClass("BGCOLOR", hvColor),
        generateClass("HVBGCOLOR", color),
        generateClass("TEXTCOLOR", color),
        generateClass("HVTEXTCOLOR", hvColor),
        generateClass("BODYTEXT", textSize)
      ];
      if (block) {
        classArray.push("block w-full");
      }
      if (rounded) {
        classArray.push("rounded-full");
      } else {
        classArray.push("rounded");
      }
      if (btnSize === "medium") {
        classArray.push("px-4 py-2");
      } else if (btnSize === "small") {
        classArray.push("px-2 py-1");
      } else {
        classArray.push("px-5 py-2.5");
      }
      if (shadow) {
        classArray.push("drop-shadow-md");
      }
      console.log(classArray);
      return classArray.join(" ");
    };
    const handleButtonClick = (e) => {
      emit("btn-click", e);
    };
    const __returned__ = { props, emit, buttonConfig, handleButtonClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    class: normalizeClass([
      "transition-all duration-300 ease-linear border-2",
      $setup.buttonConfig(
        $props.color,
        $props.hoverColor,
        $props.textSize,
        $props.buttonSize,
        $props.isBlock,
        $props.rounded,
        $props.displayShadow
      )
    ]),
    onClick: $setup.handleButtonClick
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
_sfc_main$1.__file = "src/components/btn-beta/BtnBeta.vue";
const BtnBeta = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/btn-beta/BtnBeta.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "button.story",
  setup(__props, { expose }) {
    expose();
    const stateAlpha = reactive({
      text: "Button Alpha",
      color: "primary",
      textSize: "md",
      buttonSize: "medium",
      block: false,
      rounded: false,
      displayShadow: false
    });
    const stateBeta = reactive({
      color: "primary",
      hoverColor: "light-1",
      textSize: "md",
      buttonSize: "medium",
      isBlock: false,
      rounded: false,
      displayShadow: true,
      text: "Button Beta"
    });
    const __returned__ = { stateAlpha, stateBeta, BtnAlpha, BtnBeta, colors, bodyTextSize, buttonSize };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_HstText = resolveComponent("HstText");
  const _component_HstSelect = resolveComponent("HstSelect");
  const _component_HstCheckbox = resolveComponent("HstCheckbox");
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Button",
    group: "base-comp"
  }, {
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "btn-alpha" }, {
        controls: withCtx(() => [
          createVNode(_component_HstText, {
            title: "Text",
            modelValue: $setup.stateAlpha.text,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.stateAlpha.text = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "color",
            modelValue: $setup.stateAlpha.color,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.stateAlpha.color = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "text-size",
            modelValue: $setup.stateAlpha.textSize,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.stateAlpha.textSize = $event),
            options: $setup.bodyTextSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "button size",
            modelValue: $setup.stateAlpha.buttonSize,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.stateAlpha.buttonSize = $event),
            options: $setup.buttonSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstCheckbox, {
            title: "is-block",
            modelValue: $setup.stateAlpha.block,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.stateAlpha.block = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "rounded",
            modelValue: $setup.stateAlpha.rounded,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.stateAlpha.rounded = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "display-shadow",
            modelValue: $setup.stateAlpha.displayShadow,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.stateAlpha.displayShadow = $event)
          }, null, 8, ["modelValue"])
        ]),
        default: withCtx(() => [
          createVNode($setup["BtnAlpha"], {
            "is-block": $setup.stateAlpha.block,
            rounded: $setup.stateAlpha.rounded,
            color: $setup.stateAlpha.color,
            "text-size": $setup.stateAlpha.textSize,
            "button-size": $setup.stateAlpha.buttonSize,
            "display-shadow": $setup.stateAlpha.displayShadow
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.stateAlpha.text), 1)
            ]),
            _: 1
          }, 8, ["is-block", "rounded", "color", "text-size", "button-size", "display-shadow"])
        ]),
        _: 1
      }),
      createVNode(_component_Variant, { title: "btn-beta" }, {
        controls: withCtx(() => [
          createVNode(_component_HstText, {
            title: "Text",
            modelValue: $setup.stateBeta.text,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.stateBeta.text = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "color",
            modelValue: $setup.stateBeta.color,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.stateBeta.color = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "hover-color",
            modelValue: $setup.stateBeta.hoverColor,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.stateBeta.hoverColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "text-size",
            modelValue: $setup.stateBeta.textSize,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.stateBeta.textSize = $event),
            options: $setup.bodyTextSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "button size",
            modelValue: $setup.stateBeta.buttonSize,
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.stateBeta.buttonSize = $event),
            options: $setup.buttonSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstCheckbox, {
            title: "is-block",
            modelValue: $setup.stateBeta.isBlock,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.stateBeta.isBlock = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "rounded",
            modelValue: $setup.stateBeta.rounded,
            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.stateBeta.rounded = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "display-shadow",
            modelValue: $setup.stateBeta.displayShadow,
            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.stateBeta.displayShadow = $event)
          }, null, 8, ["modelValue"])
        ]),
        default: withCtx(() => [
          createVNode($setup["BtnBeta"], {
            color: $setup.stateBeta.color,
            "hover-color": $setup.stateBeta.hoverColor,
            "text-size": $setup.stateBeta.textSize,
            "button-size": $setup.stateBeta.buttonSize,
            "is-block": $setup.stateBeta.isBlock,
            rounded: $setup.stateBeta.rounded,
            "display-shadow": $setup.stateBeta.displayShadow
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.stateBeta.text), 1)
            ]),
            _: 1
          }, 8, ["color", "hover-color", "text-size", "button-size", "is-block", "rounded", "display-shadow"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/stories/components/button/button.story.vue";
const button_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/stories/components/button/button.story.vue"]]);
export {
  button_story as default
};

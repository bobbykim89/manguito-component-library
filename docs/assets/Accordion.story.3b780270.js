import { ar as defineComponent, aE as ref, aF as computed, av as openBlock, ay as createElementBlock, aB as createBaseVNode, aC as normalizeClass, aD as toDisplayString, aw as createCommentVNode, aG as renderSlot, aH as normalizeStyle, aI as reactive, as as resolveComponent, at as createBlock, au as withCtx, ax as createVNode } from "./vendor.ab35a370.js";
import { _ as _export_sfc, g as generateClass } from "./_plugin-vue_export-helper.53a8fb99.js";
import { c as colors, h as headingTextSize, a as highlightLocationOptions } from "./index.4e10c01f.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Accordion",
  props: {
    borderColor: { type: null, required: false, default: "light-4" },
    rounded: { type: Boolean, required: false, default: false },
    displayHighlight: { type: Boolean, required: false, default: true },
    highlightLocation: { type: null, required: false, default: "left" },
    highlightColor: { type: null, required: false, default: "secondary" },
    highlightWidth: { type: null, required: false, default: 8 },
    displayNumber: { type: Boolean, required: false, default: true },
    title: { type: String, required: true },
    titleSize: { type: null, required: false, default: "sm" },
    titleColor: { type: null, required: false, default: "dark-3" },
    openOnMount: { type: Boolean, required: false, default: false },
    iconColor: { type: null, required: false, default: "dark-3" },
    bgColor: { type: null, required: false, default: "white" },
    slotBgColor: { type: null, required: false, default: "light-2" }
  },
  emits: ["accordion-click"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    defineComponent({
      name: "Accordion"
    });
    const toggle = ref(props.openOnMount);
    const toggleAction = (e) => {
      toggle.value = !toggle.value;
      emit("accordion-click", e);
    };
    const getBorderClass = (bColor, dHl, hlColor, hlLocation, hlWidth) => {
      if (!dHl || hlWidth === 0) {
        return `border ${generateClass("BORDER", bColor)}`;
      }
      if (dHl && hlLocation === "top") {
        return `border ${generateClass("BORDER", bColor)} ${generateClass(
          "BORDERT",
          hlColor
        )} ${generateClass("BORDERTW", hlWidth)}`;
      }
      return `border ${generateClass("BORDER", bColor)} ${generateClass(
        "BORDERL",
        hlColor
      )} ${generateClass("BORDERLW", hlWidth)}`;
    };
    const getTitleClass = (size, color) => {
      return `${generateClass("H3", size)} ${generateClass("TEXTCOLOR", color)}`;
    };
    const getIconColor = (color) => {
      return generateClass("SVGFILL", color);
    };
    const getSlotBgColor = (color) => {
      return generateClass("BGCOLOR", color);
    };
    const textSlot = ref();
    const slotTextVal = computed(() => {
      return {
        height: toggle.value ? textSlot.value.scrollHeight + "px" : "0px"
      };
    });
    const __returned__ = { props, toggle, emit, toggleAction, getBorderClass, getTitleClass, getIconColor, getSlotBgColor, textSlot, slotTextVal, generateClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "flex justify-between items-center" };
const _hoisted_2 = { class: "flex justify-center items-center ml-xs md:ml-sm lg:ml-md" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", { d: "M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" }, null, -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(["overflow-hidden", [
      $props.rounded ? "rounded-md" : "",
      $setup.getBorderClass(
        $props.borderColor,
        $props.displayHighlight,
        $props.highlightColor,
        $props.highlightLocation,
        $props.highlightWidth
      )
    ]])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["py-sm px-md cursor-pointer transition-all duration-500", [
        $setup.toggle ? `border-b ${$setup.generateClass("BORDERB", $props.borderColor)} ease-in` : "ease-out",
        $setup.generateClass("BGCOLOR", $props.bgColor)
      ]]),
      onClick: $setup.toggleAction
    }, [
      createBaseVNode("div", _hoisted_1$1, [
        createBaseVNode("h3", {
          class: normalizeClass($setup.getTitleClass($props.titleSize, $props.titleColor))
        }, toDisplayString($props.title), 3),
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 448 512",
            class: normalizeClass(["h-md", [
              !$setup.toggle ? "rotate-0" : "rotate-180",
              `transition-all duration-300 ease-in ${$setup.getIconColor($props.iconColor)}`
            ]])
          }, [
            createCommentVNode("! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. "),
            _hoisted_3
          ], 2))
        ])
      ])
    ], 2),
    createBaseVNode("div", {
      class: normalizeClass(["h-auto overflow-hidden", [
        $setup.toggle ? "transition-all duration-500 ease-in" : "transition-all duration-500 ease-out",
        $setup.generateClass("BGCOLOR", $props.slotBgColor),
        ,
      ]]),
      style: normalizeStyle($setup.slotTextVal),
      ref: "textSlot"
    }, [
      createBaseVNode("div", {
        class: normalizeClass([
          $setup.toggle ? "opacity-100 transition-opacity duration-500 ease-in" : "opacity-0 transition-opacity duration-500 ease-out",
          "px-md py-sm"
        ])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)
    ], 6)
  ], 2);
}
_sfc_main$1.__file = "src/components/accordion/Accordion.vue";
const Accordion = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/accordion/Accordion.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Accordion.story",
  setup(__props, { expose }) {
    expose();
    const state = reactive({
      borderColor: "light-4",
      rounded: false,
      displayHighlight: true,
      highlightLocation: "left",
      highlightColor: "secondary",
      highlightWidth: 8,
      displayNumber: true,
      title: "Title Here",
      titleSize: "sm",
      titleColor: "dark-3",
      openOnMount: false,
      iconColor: "dark-3",
      bgColor: "white",
      slotBgColor: "light-2",
      slotText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?"
    });
    const __returned__ = { state, Accordion, colors, headingTextSize, highlightLocationOptions };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_HstText = resolveComponent("HstText");
  const _component_HstSelect = resolveComponent("HstSelect");
  const _component_HstCheckbox = resolveComponent("HstCheckbox");
  const _component_HstSlider = resolveComponent("HstSlider");
  const _component_HstTextarea = resolveComponent("HstTextarea");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, { title: "Accordion" }, {
    controls: withCtx(() => [
      createVNode(_component_HstText, {
        title: "title",
        modelValue: $setup.state.title,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.state.title = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstSelect, {
        title: "title-size",
        modelValue: $setup.state.titleSize,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.state.titleSize = $event),
        options: $setup.headingTextSize
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSelect, {
        title: "title-color",
        modelValue: $setup.state.titleColor,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.state.titleColor = $event),
        options: $setup.colors
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSelect, {
        title: "border-color",
        modelValue: $setup.state.borderColor,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.state.borderColor = $event),
        options: $setup.colors
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSelect, {
        title: "bg-color",
        modelValue: $setup.state.bgColor,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.state.bgColor = $event),
        options: $setup.colors
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSelect, {
        title: "slot-bg-color",
        modelValue: $setup.state.slotBgColor,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.state.slotBgColor = $event),
        options: $setup.colors
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstCheckbox, {
        title: "rounded",
        modelValue: $setup.state.rounded,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.state.rounded = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstCheckbox, {
        title: "display-highlight",
        modelValue: $setup.state.displayHighlight,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.state.displayHighlight = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstSelect, {
        title: "highlight-location",
        modelValue: $setup.state.highlightLocation,
        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.state.highlightLocation = $event),
        options: $setup.highlightLocationOptions
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSelect, {
        title: "highlight-color",
        modelValue: $setup.state.highlightColor,
        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.state.highlightColor = $event),
        options: $setup.colors
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstSlider, {
        title: "highlight-width",
        modelValue: $setup.state.highlightWidth,
        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.state.highlightWidth = $event),
        step: 1,
        min: 1,
        max: 12
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstCheckbox, {
        title: "display-number",
        modelValue: $setup.state.displayNumber,
        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.state.displayNumber = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstCheckbox, {
        title: "open-on-mount",
        modelValue: $setup.state.openOnMount,
        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.state.openOnMount = $event)
      }, null, 8, ["modelValue"]),
      createVNode(_component_HstSelect, {
        title: "icon-color",
        modelValue: $setup.state.iconColor,
        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.state.iconColor = $event),
        options: $setup.colors
      }, null, 8, ["modelValue", "options"]),
      createVNode(_component_HstTextarea, {
        modelValue: $setup.state.slotText,
        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.state.slotText = $event),
        title: "Slot Text"
      }, null, 8, ["modelValue"])
    ]),
    default: withCtx(() => [
      createVNode($setup["Accordion"], {
        title: $setup.state.title,
        "title-size": $setup.state.titleSize,
        "title-color": $setup.state.titleColor,
        "border-color": $setup.state.borderColor,
        rounded: $setup.state.rounded,
        "display-highlight": $setup.state.displayHighlight,
        "highlight-location": $setup.state.highlightLocation,
        "highlight-color": $setup.state.highlightColor,
        "highlight-width": $setup.state.highlightWidth,
        "display-number": $setup.state.displayNumber,
        "open-on-mount": $setup.state.openOnMount,
        "icon-color": $setup.state.iconColor,
        "bg-color": $setup.state.bgColor,
        "slot-bg-color": $setup.state.slotBgColor
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            innerHTML: $setup.state.slotText
          }, null, 8, _hoisted_1)
        ]),
        _: 1
      }, 8, ["title", "title-size", "title-color", "border-color", "rounded", "display-highlight", "highlight-location", "highlight-color", "highlight-width", "display-number", "open-on-mount", "icon-color", "bg-color", "slot-bg-color"])
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/stories/components/accordion/Accordion.story.vue";
const Accordion_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/stories/components/accordion/Accordion.story.vue"]]);
export {
  Accordion_story as default
};

import { ar as defineComponent, aE as ref, aF as computed, av as openBlock, ay as createElementBlock, aB as createBaseVNode, aC as normalizeClass, aD as toDisplayString, aw as createCommentVNode, aG as renderSlot, aH as normalizeStyle, aI as reactive, as as resolveComponent, at as createBlock, au as withCtx, ax as createVNode } from "./vendor.981b08eb.js";
import { _ as _export_sfc, g as generateClass } from "./_plugin-vue_export-helper.e3a59fa7.js";
import { c as colors, h as headingTextSize } from "./index.0271104e.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AccordionAlpha",
  props: {
    borderColor: { type: null, required: false, default: "light-4" },
    rounded: { type: Boolean, required: false, default: false },
    displayHighlight: { type: Boolean, required: false, default: true },
    highlightColor: { type: null, required: false, default: "secondary" },
    highlightWidth: { type: null, required: false, default: 8 },
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
    const toggle = ref(props.openOnMount);
    const toggleAction = (e) => {
      toggle.value = !toggle.value;
      emit("accordion-click", e);
    };
    const getBorderClass = (bColor, dHl, hlColor, hlWidth) => {
      const classArray = ["border", generateClass("BORDER", bColor)];
      if (dHl && hlWidth !== 0) {
        const borderArray = [
          generateClass("BORDERL", hlColor),
          generateClass("BORDERLW", hlWidth)
        ];
        borderArray.forEach((item) => {
          classArray.push(item);
        });
      }
      return classArray.join(" ");
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
        height: textSlot.value && toggle.value ? textSlot.value.scrollHeight + "px" : "0px"
      };
    });
    const __returned__ = { props, toggle, emit, toggleAction, getBorderClass, getTitleClass, getIconColor, getSlotBgColor, textSlot, slotTextVal, generateClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = { class: "flex justify-between items-center" };
const _hoisted_2$2 = { class: "flex justify-center items-center ml-xs md:ml-sm lg:ml-md" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", { d: "M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" }, null, -1);
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["overflow-hidden w-full", [
      $props.rounded ? "rounded-md" : "",
      $setup.getBorderClass(
        $props.borderColor,
        $props.displayHighlight,
        $props.highlightColor,
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
      createBaseVNode("div", _hoisted_1$2, [
        createBaseVNode("h3", {
          class: normalizeClass($setup.getTitleClass($props.titleSize, $props.titleColor))
        }, toDisplayString($props.title), 3),
        createBaseVNode("div", _hoisted_2$2, [
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
_sfc_main$2.__file = "src/components/accordion-alpha/AccordionAlpha.vue";
const AccordionAlpha = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/accordion-alpha/AccordionAlpha.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AccordionBeta",
  props: {
    title: { type: String, required: true },
    titleColor: { type: null, required: false, default: "light-1" },
    titleSize: { type: null, required: false, default: "md" },
    borderColor: { type: null, required: false, default: "light-3" },
    bgColor: { type: null, required: false, default: "light-1" },
    btnColor: { type: null, required: false, default: "primary" },
    iconColor: { type: null, required: false, default: "light-1" },
    rounded: { type: Boolean, required: false, default: true },
    displayShadow: { type: Boolean, required: false, default: true },
    openOnMount: { type: Boolean, required: false, default: false }
  },
  emits: ["accordion-click"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const toggle = ref(props.openOnMount);
    const toggleAction = (e) => {
      toggle.value = !toggle.value;
      emit("accordion-click", e);
    };
    const getBorderClass = (bColor, bgColor, rounded, dShadow) => {
      let borderInfo = [
        "border",
        generateClass("BORDER", bColor),
        generateClass("BGCOLOR", bgColor)
      ];
      if (dShadow) {
        borderInfo.push("shadow-md");
      }
      if (rounded) {
        borderInfo.push("rounded-2xl");
      }
      return borderInfo.join(" ");
    };
    const getTitleClass = (size, color) => {
      return `${generateClass("H3", size)} ${generateClass("TEXTCOLOR", color)}`;
    };
    const textSlot = ref();
    const slotTextVal = computed(() => {
      return {
        height: textSlot.value && toggle.value ? textSlot.value.scrollHeight + "px" : "0px"
      };
    });
    const __returned__ = { props, toggle, emit, toggleAction, getBorderClass, getTitleClass, textSlot, slotTextVal, generateClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "flex justify-center items-center ml-xs md:ml-sm lg:ml-md" };
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", { d: "M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" }, null, -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["w-full overflow-hidden p-2xs", $setup.getBorderClass($props.borderColor, $props.bgColor, $props.rounded, $props.displayShadow)])
  }, [
    createBaseVNode("div", {
      onClick: $setup.toggleAction,
      class: normalizeClass(["flex justify-between items-center w-full px-4 py-2 cursor-pointer hover:bg-opacity-70 transition duration-200 ease-in", [$props.rounded ? "rounded-lg" : "", $setup.generateClass("BGCOLOR", $props.btnColor)]])
    }, [
      createBaseVNode("h3", {
        class: normalizeClass($setup.getTitleClass($props.titleSize, $props.titleColor))
      }, toDisplayString($props.title), 3),
      createBaseVNode("div", _hoisted_1$1, [
        (openBlock(), createElementBlock("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 448 512",
          class: normalizeClass(["h-xs transition-all duration-300 ease-in", [
            !$setup.toggle ? "rotate-0" : "rotate-180",
            $setup.generateClass("SVGFILL", $props.iconColor)
          ]])
        }, [
          createCommentVNode("! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. "),
          _hoisted_2$1
        ], 2))
      ])
    ], 2),
    createBaseVNode("div", {
      class: normalizeClass(["h-auto overflow-hidden", [
        $setup.toggle ? "transition-all duration-500 ease-in" : "transition-all duration-500 ease-out"
      ]]),
      style: normalizeStyle($setup.slotTextVal),
      ref: "textSlot"
    }, [
      createBaseVNode("div", {
        class: normalizeClass([
          $setup.toggle ? "opacity-100 transition-opacity duration-500 ease-in" : "opacity-0 transition-opacity duration-500 ease-out",
          "px-xs pt-xs pb-2xs"
        ])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)
    ], 6)
  ], 2);
}
_sfc_main$1.__file = "src/components/accordion-beta/AccordionBeta.vue";
const AccordionBeta = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/accordion-beta/AccordionBeta.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Accordion.story",
  setup(__props, { expose }) {
    expose();
    const stateAlpha = reactive({
      borderColor: "light-4",
      rounded: false,
      displayHighlight: true,
      highlightColor: "secondary",
      highlightWidth: 8,
      title: "Title Here",
      titleSize: "sm",
      titleColor: "dark-3",
      openOnMount: false,
      iconColor: "dark-3",
      bgColor: "white",
      slotBgColor: "light-2",
      slotText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?"
    });
    const stateBeta = reactive({
      title: "This is title",
      titleColor: "light-1",
      titleSize: "md",
      borderColor: "light-3",
      bgColor: "light-1",
      btnColor: "primary",
      iconColor: "light-1",
      rounded: true,
      displayShadow: true,
      openOnMount: false,
      slotText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga quo incidunt a blanditiis mollitia ea est? Fugit voluptate expedita magni vitae iste. Nulla aperiam voluptate ullam dolor officiis earum quis aliquam at ducimus porro. Quidem, molestias! Voluptates perferendis distinctio ipsam dicta optio non praesentium, maiores commodi. Natus, ducimus doloremque?"
    });
    const __returned__ = { stateAlpha, stateBeta, AccordionAlpha, AccordionBeta, colors, headingTextSize };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_HstText = resolveComponent("HstText");
  const _component_HstSelect = resolveComponent("HstSelect");
  const _component_HstCheckbox = resolveComponent("HstCheckbox");
  const _component_HstSlider = resolveComponent("HstSlider");
  const _component_HstTextarea = resolveComponent("HstTextarea");
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Accordion",
    group: "base-comp"
  }, {
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "accordion-alpha" }, {
        controls: withCtx(() => [
          createVNode(_component_HstText, {
            title: "title",
            modelValue: $setup.stateAlpha.title,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.stateAlpha.title = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "title-size",
            modelValue: $setup.stateAlpha.titleSize,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.stateAlpha.titleSize = $event),
            options: $setup.headingTextSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "title-color",
            modelValue: $setup.stateAlpha.titleColor,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.stateAlpha.titleColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "border-color",
            modelValue: $setup.stateAlpha.borderColor,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.stateAlpha.borderColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "bg-color",
            modelValue: $setup.stateAlpha.bgColor,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.stateAlpha.bgColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "slot-bg-color",
            modelValue: $setup.stateAlpha.slotBgColor,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.stateAlpha.slotBgColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstCheckbox, {
            title: "rounded",
            modelValue: $setup.stateAlpha.rounded,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.stateAlpha.rounded = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "display-highlight",
            modelValue: $setup.stateAlpha.displayHighlight,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.stateAlpha.displayHighlight = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "highlight-color",
            modelValue: $setup.stateAlpha.highlightColor,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.stateAlpha.highlightColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSlider, {
            title: "highlight-width",
            modelValue: $setup.stateAlpha.highlightWidth,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.stateAlpha.highlightWidth = $event),
            step: 1,
            min: 1,
            max: 12
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "open-on-mount",
            modelValue: $setup.stateAlpha.openOnMount,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.stateAlpha.openOnMount = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "icon-color",
            modelValue: $setup.stateAlpha.iconColor,
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.stateAlpha.iconColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstTextarea, {
            modelValue: $setup.stateAlpha.slotText,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.stateAlpha.slotText = $event),
            title: "Slot Text"
          }, null, 8, ["modelValue"])
        ]),
        default: withCtx(() => [
          createVNode($setup["AccordionAlpha"], {
            title: $setup.stateAlpha.title,
            "title-size": $setup.stateAlpha.titleSize,
            "title-color": $setup.stateAlpha.titleColor,
            "border-color": $setup.stateAlpha.borderColor,
            rounded: $setup.stateAlpha.rounded,
            "display-highlight": $setup.stateAlpha.displayHighlight,
            "highlight-color": $setup.stateAlpha.highlightColor,
            "highlight-width": $setup.stateAlpha.highlightWidth,
            "open-on-mount": $setup.stateAlpha.openOnMount,
            "icon-color": $setup.stateAlpha.iconColor,
            "bg-color": $setup.stateAlpha.bgColor,
            "slot-bg-color": $setup.stateAlpha.slotBgColor
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                innerHTML: $setup.stateAlpha.slotText
              }, null, 8, _hoisted_1)
            ]),
            _: 1
          }, 8, ["title", "title-size", "title-color", "border-color", "rounded", "display-highlight", "highlight-color", "highlight-width", "open-on-mount", "icon-color", "bg-color", "slot-bg-color"])
        ]),
        _: 1
      }),
      createVNode(_component_Variant, { title: "accordion-beta" }, {
        controls: withCtx(() => [
          createVNode(_component_HstText, {
            title: "title",
            modelValue: $setup.stateBeta.title,
            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.stateBeta.title = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "title-size",
            modelValue: $setup.stateBeta.titleSize,
            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.stateBeta.titleSize = $event),
            options: $setup.headingTextSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "title-color",
            modelValue: $setup.stateBeta.titleColor,
            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.stateBeta.titleColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "border-color",
            modelValue: $setup.stateBeta.borderColor,
            "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.stateBeta.borderColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "bg-color",
            modelValue: $setup.stateBeta.bgColor,
            "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.stateBeta.bgColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "btn-color",
            modelValue: $setup.stateBeta.btnColor,
            "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.stateBeta.btnColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "icon-color",
            modelValue: $setup.stateBeta.iconColor,
            "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $setup.stateBeta.iconColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstCheckbox, {
            title: "rounded",
            modelValue: $setup.stateBeta.rounded,
            "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.stateBeta.rounded = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "display-shadow",
            modelValue: $setup.stateBeta.displayShadow,
            "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.stateBeta.displayShadow = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "open-on-mount",
            modelValue: $setup.stateBeta.openOnMount,
            "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.stateBeta.openOnMount = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstTextarea, {
            modelValue: $setup.stateBeta.slotText,
            "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $setup.stateBeta.slotText = $event),
            title: "Slot Text"
          }, null, 8, ["modelValue"])
        ]),
        default: withCtx(() => [
          createVNode($setup["AccordionBeta"], {
            title: $setup.stateBeta.title,
            "title-color": $setup.stateBeta.titleColor,
            "title-size": $setup.stateBeta.titleSize,
            "border-color": $setup.stateBeta.borderColor,
            "bg-color": $setup.stateBeta.bgColor,
            "btn-color": $setup.stateBeta.btnColor,
            "icon-color": $setup.stateBeta.iconColor,
            rounded: $setup.stateBeta.rounded,
            "display-shadow": $setup.stateBeta.displayShadow,
            "open-on-mount": $setup.stateBeta.openOnMount
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                innerHTML: $setup.stateBeta.slotText
              }, null, 8, _hoisted_2)
            ]),
            _: 1
          }, 8, ["title", "title-color", "title-size", "border-color", "bg-color", "btn-color", "icon-color", "rounded", "display-shadow", "open-on-mount"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/stories/components/accordion/Accordion.story.vue";
const Accordion_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/stories/components/accordion/Accordion.story.vue"]]);
export {
  Accordion_story as default
};

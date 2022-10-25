import { ar as defineComponent, av as openBlock, ay as createElementBlock, aB as createBaseVNode, aC as normalizeClass, aH as normalizeStyle, aw as createCommentVNode, at as createBlock, aL as resolveDynamicComponent, aG as renderSlot, au as withCtx, aI as reactive, as as resolveComponent, ax as createVNode } from "./vendor.981b08eb.js";
import { _ as _export_sfc, g as generateClass } from "./_plugin-vue_export-helper.e3a59fa7.js";
import { c as colors, d as headingTextLevel, h as headingTextSize } from "./index.0271104e.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HeroAlpha",
  props: {
    title: { type: String, required: true },
    titleLevel: { type: null, required: false, default: "h1" },
    titleSize: { type: null, required: false, default: "md" },
    displaySubTitle: { type: Boolean, required: true, default: false },
    subTitle: { type: String, required: false },
    subTitleLevel: { type: null, required: false, default: "h3" },
    subTitleSize: { type: null, required: false, default: "md" },
    titleColor: { type: null, required: false, default: "dark-3" },
    bgImage: { type: String, required: true },
    bgColor: { type: null, required: false, default: "white" },
    imgPosition: { type: null, required: false, default: "right" },
    displayFilter: { type: Boolean, required: false, default: true },
    filterOpacity: { type: null, required: false, default: 30 }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const getBgImage = (img) => {
      return {
        "background-image": `url('${img}')`
      };
    };
    const getTitleClass = (level, size, color) => {
      let titleLevel;
      if (level === "h1") {
        titleLevel = "H1";
      } else if (level === "h2") {
        titleLevel = "H2";
      } else if (level === "h3") {
        titleLevel = "H3";
      } else {
        titleLevel = "H4";
      }
      const classArray = [
        generateClass(titleLevel, size),
        generateClass("TEXTCOLOR", color)
      ];
      return classArray.join(" ");
    };
    const __returned__ = { props, getBgImage, getTitleClass, generateClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = { class: "grid lg:grid-cols-2" };
const _hoisted_2$2 = { class: "text-center lg:text-left mb-xs" };
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("polygon", { points: "0,0 100,0 0,100" }, null, -1);
const _hoisted_4$1 = [
  _hoisted_3$1
];
const _hoisted_5$1 = /* @__PURE__ */ createBaseVNode("polygon", { points: "100,0 100,100 0,100" }, null, -1);
const _hoisted_6 = [
  _hoisted_5$1
];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(["overflow-hidden w-full", $setup.generateClass("BGCOLOR", $props.bgColor)])
  }, [
    createBaseVNode("div", _hoisted_1$2, [
      createBaseVNode("div", {
        class: normalizeClass(["relative px-xs flex flex-col justify-center min-h-[256px] md:min-h-[400px]", { "lg:order-2": $props.imgPosition === "left" }])
      }, [
        createBaseVNode("div", {
          class: "lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-top",
          style: normalizeStyle($setup.getBgImage($props.bgImage))
        }, [
          $props.displayFilter ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["absolute inset-0 bg-white", $setup.generateClass("OPACITY", $props.filterOpacity)])
          }, null, 2)) : createCommentVNode("v-if", true)
        ], 4),
        createBaseVNode("div", {
          class: normalizeClass(["relative py-md lg:py-lg px-0", [$props.imgPosition === "right" ? "lg:pl-md" : "lg:pr-md"]])
        }, [
          createBaseVNode("div", _hoisted_2$2, [
            createCommentVNode(" title "),
            (openBlock(), createBlock(resolveDynamicComponent($props.titleLevel), {
              class: normalizeClass($setup.getTitleClass($props.titleLevel, $props.titleSize, $props.titleColor)),
              innerHTML: $props.title
            }, null, 8, ["class", "innerHTML"])),
            createCommentVNode(" sub title "),
            $props.displaySubTitle ? (openBlock(), createBlock(resolveDynamicComponent($props.subTitleLevel), {
              key: 0,
              class: normalizeClass($setup.getTitleClass($props.subTitleLevel, $props.subTitleSize, $props.titleColor)),
              innerHTML: $props.subTitle
            }, null, 8, ["class", "innerHTML"])) : createCommentVNode("v-if", true)
          ]),
          createBaseVNode("div", null, [
            renderSlot(_ctx.$slots, "default")
          ])
        ], 2)
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass(["hidden lg:block relative bg-no-repeat bg-cover bg-top min-h-[256px] md:min-h-[400px] lg:min-h-[512px] xl:min-h-[80vh]", { "lg:order-1": $props.imgPosition === "left" }]),
        style: normalizeStyle($setup.getBgImage($props.bgImage))
      }, [
        $props.imgPosition === "right" ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: normalizeClass(["hidden lg:block absolute left-0 inset-y-0 h-full w-3xl", $setup.generateClass("SVGFILL", $props.bgColor)]),
          viewBox: "0 0 100 100",
          preserveAspectRatio: "none",
          "aria-hidden": "true"
        }, _hoisted_4$1, 2)) : (openBlock(), createElementBlock("svg", {
          key: 1,
          class: normalizeClass(["hidden lg:block absolute right-0 inset-y-0 h-full w-3xl", $setup.generateClass("SVGFILL", $props.bgColor)]),
          viewBox: "0 0 100 100",
          preserveAspectRatio: "none",
          "aria-hidden": "true"
        }, _hoisted_6, 2))
      ], 6)
    ])
  ], 2);
}
_sfc_main$2.__file = "src/components/hero-alpha/HeroAlpha.vue";
const HeroAlpha = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/hero-alpha/HeroAlpha.vue"]]);
const HeroBeta_vue_vue_type_style_index_0_scoped_cd99fa7e_lang = "";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeroBeta",
  props: {
    title: { type: String, required: true },
    titleLevel: { type: null, required: false, default: "h1" },
    titleSize: { type: null, required: false, default: "md" },
    titleColor: { type: null, required: false, default: "white" },
    showTitleHighlight: { type: Boolean, required: false, default: false },
    titleHighlightColor: { type: null, required: false, default: "dark-3" },
    fullWidth: { type: Boolean, required: false, default: true },
    bgImage: { type: String, required: true },
    displayGradients: { type: Boolean, required: false, default: true },
    gradientOpacity: { type: null, required: false, default: 50 }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const getBgImage = (img) => {
      return { "background-image": `url('${img}')` };
    };
    const getSectionWidth = (sWidth) => {
      return sWidth ? "" : "xl:container";
    };
    const getTitleClass = (level, size, color) => {
      let titleLevel;
      if (level === "h1") {
        titleLevel = "H1";
      } else if (level === "h2") {
        titleLevel = "H2";
      } else if (level === "h3") {
        titleLevel = "H3";
      } else {
        titleLevel = "H4";
      }
      const classArray = [
        generateClass(titleLevel, size),
        generateClass("TEXTCOLOR", color)
      ];
      return classArray.join(" ");
    };
    const getTitleHighlightClass = (color, display) => {
      const classArray = [generateClass("BGCOLOR", color), "shadow-lg", "px-xs"];
      return display ? classArray.join(" ") : "";
    };
    const __returned__ = { props, getBgImage, getSectionWidth, getTitleClass, getTitleHighlightClass, generateClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "relative h-full px-xs" };
const _hoisted_2$1 = { class: "container" };
const _hoisted_3 = { class: "py-md lg:py-lg px-0" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { class: "hidden md:block md:mt-sm w-3/4" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(["relative bg-image-container flex flex-col justify-end", $setup.getSectionWidth($props.fullWidth)]),
    style: normalizeStyle($setup.getBgImage($props.bgImage))
  }, [
    $props.displayGradients ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["absolute inset-0 bg-gradient-to-b from-transparent to-black", $setup.generateClass("OPACITY", $props.gradientOpacity)])
    }, null, 2)) : createCommentVNode("v-if", true),
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", _hoisted_2$1, [
        createBaseVNode("div", _hoisted_3, [
          (openBlock(), createBlock(resolveDynamicComponent($props.titleLevel), {
            class: normalizeClass($setup.getTitleClass($props.titleLevel, $props.titleSize, $props.titleColor))
          }, {
            default: withCtx(() => [
              createBaseVNode("span", {
                class: normalizeClass([
                  "box-decoration-clone py-2xs",
                  $setup.getTitleHighlightClass($props.titleHighlightColor, $props.showTitleHighlight)
                ]),
                innerHTML: $props.title
              }, null, 10, _hoisted_4)
            ]),
            _: 1
          }, 8, ["class"])),
          createBaseVNode("div", _hoisted_5, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ])
      ])
    ])
  ], 6);
}
_sfc_main$1.__file = "src/components/hero-beta/HeroBeta.vue";
const HeroBeta = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-cd99fa7e"], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/hero-beta/HeroBeta.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "hero.story",
  setup(__props, { expose }) {
    expose();
    const direction = ["left", "right"];
    const stateAlpha = reactive({
      title: "Hero Alpha",
      titleLevel: "h1",
      titleSize: "md",
      displaySubTitle: true,
      subTitle: "This is subtitle",
      subTitleLevel: "h3",
      subTitleSize: "md",
      titleColor: "dark-3",
      bgImage: "https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1650675406/ManguitoPage/hl38duquvda0ilultyqb.jpg",
      bgColor: "white",
      imgPosition: "right",
      displayFilter: true,
      filterOpacity: 30,
      slotText: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat odio voluptate fuga quibusdam nostrum veritatis similique aperiam nobis debitis, excepturi id culpa quasi quos totam obcaecati deserunt ea quis sit quisquam alias nihil omnis! Aut culpa architecto repellat minima adipisci porro consequatur, officiis facere ea quos officia fugiat atque quia?"
    });
    const stateBeta = reactive({
      title: "Hero Beta",
      titleLevel: "h1",
      titleSize: "md",
      titleColor: "white",
      showTitleHighlight: false,
      titleHighlightColor: "dark-3",
      fullWidth: true,
      bgImage: "https://res.cloudinary.com/dwgni1x3t/image/upload/c_scale,w_1200/q_auto/v1650675432/ManguitoPage/zvgtgavhpuwsfesyhv0j.jpg",
      displayGradients: true,
      gradientOpacity: 50,
      slotText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat inventore repellendus corrupti labore doloribus, a nisi, animi tempora cupiditate doloremque enim sunt expedita possimus fuga, voluptates sed beatae sint alias."
    });
    const __returned__ = { direction, stateAlpha, stateBeta, HeroAlpha, HeroBeta, colors, headingTextLevel, headingTextSize };
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
  const _component_Variant = resolveComponent("Variant");
  const _component_HstTextarea = resolveComponent("HstTextarea");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Hero",
    group: "section-comp"
  }, {
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "hero-alpha" }, {
        controls: withCtx(() => [
          createVNode(_component_HstText, {
            title: "bg-image",
            modelValue: $setup.stateAlpha.bgImage,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.stateAlpha.bgImage = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "bg-color",
            modelValue: $setup.stateAlpha.bgColor,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.stateAlpha.bgColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "img-position",
            modelValue: $setup.stateAlpha.imgPosition,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.stateAlpha.imgPosition = $event),
            options: $setup.direction
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "display-filter",
            modelValue: $setup.stateAlpha.displayFilter,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.stateAlpha.displayFilter = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSlider, {
            title: "filter-opacity",
            modelValue: $setup.stateAlpha.filterOpacity,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.stateAlpha.filterOpacity = $event),
            step: 10,
            min: 10,
            max: 100
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstText, {
            title: "title",
            modelValue: $setup.stateAlpha.title,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.stateAlpha.title = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "title-level",
            modelValue: $setup.stateAlpha.titleLevel,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.stateAlpha.titleLevel = $event),
            options: $setup.headingTextLevel
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "title-size",
            modelValue: $setup.stateAlpha.titleSize,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.stateAlpha.titleSize = $event),
            options: $setup.headingTextSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstCheckbox, {
            title: "display-sub-title",
            modelValue: $setup.stateAlpha.displaySubTitle,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.stateAlpha.displaySubTitle = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "sub-title-level",
            modelValue: $setup.stateAlpha.subTitleLevel,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.stateAlpha.subTitleLevel = $event),
            options: $setup.headingTextLevel
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "sub-title-size",
            modelValue: $setup.stateAlpha.subTitleSize,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.stateAlpha.subTitleSize = $event),
            options: $setup.headingTextSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "title-color",
            modelValue: $setup.stateAlpha.titleColor,
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.stateAlpha.titleColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"])
        ]),
        default: withCtx(() => [
          createVNode($setup["HeroAlpha"], {
            title: $setup.stateAlpha.title,
            "title-level": $setup.stateAlpha.titleLevel,
            "title-size": $setup.stateAlpha.titleSize,
            "display-sub-title": $setup.stateAlpha.displaySubTitle,
            "sub-title": $setup.stateAlpha.subTitle,
            "sub-title-level": $setup.stateAlpha.subTitleLevel,
            "sub-title-size": $setup.stateAlpha.subTitleSize,
            "title-color": $setup.stateAlpha.titleColor,
            "bg-image": $setup.stateAlpha.bgImage,
            "bg-color": $setup.stateAlpha.bgColor,
            "img-position": $setup.stateAlpha.imgPosition,
            "display-filter": $setup.stateAlpha.displayFilter,
            "filter-opacity": $setup.stateAlpha.filterOpacity
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                innerHTML: $setup.stateAlpha.slotText
              }, null, 8, _hoisted_1)
            ]),
            _: 1
          }, 8, ["title", "title-level", "title-size", "display-sub-title", "sub-title", "sub-title-level", "sub-title-size", "title-color", "bg-image", "bg-color", "img-position", "display-filter", "filter-opacity"])
        ]),
        _: 1
      }),
      createVNode(_component_Variant, { title: "hero-beta" }, {
        controls: withCtx(() => [
          createVNode(_component_HstText, {
            title: "title",
            modelValue: $setup.stateBeta.title,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.stateBeta.title = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "title-level",
            modelValue: $setup.stateBeta.titleLevel,
            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.stateBeta.titleLevel = $event),
            options: $setup.headingTextLevel
          }, null, 8, ["modelValue", "options"]),
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
          createVNode(_component_HstCheckbox, {
            title: "show-title-highlight",
            modelValue: $setup.stateBeta.showTitleHighlight,
            "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.stateBeta.showTitleHighlight = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSelect, {
            title: "title-highlight-color",
            modelValue: $setup.stateBeta.titleHighlightColor,
            "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.stateBeta.titleHighlightColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstCheckbox, {
            title: "full-width",
            modelValue: $setup.stateBeta.fullWidth,
            "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.stateBeta.fullWidth = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstText, {
            title: "bg-image",
            modelValue: $setup.stateBeta.bgImage,
            "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $setup.stateBeta.bgImage = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "display-gradients",
            modelValue: $setup.stateBeta.displayGradients,
            "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.stateBeta.displayGradients = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstSlider, {
            title: "gradient-opacity",
            modelValue: $setup.stateBeta.gradientOpacity,
            "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.stateBeta.gradientOpacity = $event),
            step: 10,
            min: 10,
            max: 100
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstTextarea, {
            title: "slot-text",
            modelValue: $setup.stateBeta.slotText,
            "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.stateBeta.slotText = $event)
          }, null, 8, ["modelValue"])
        ]),
        default: withCtx(() => [
          createVNode($setup["HeroBeta"], {
            title: $setup.stateBeta.title,
            "title-level": $setup.stateBeta.titleLevel,
            "title-size": $setup.stateBeta.titleSize,
            "title-color": $setup.stateBeta.titleColor,
            "show-title-highlight": $setup.stateBeta.showTitleHighlight,
            "title-highlight-color": $setup.stateBeta.titleHighlightColor,
            "full-width": $setup.stateBeta.fullWidth,
            "bg-image": $setup.stateBeta.bgImage,
            "display-gradients": $setup.stateBeta.displayGradients,
            "gradient-opacity": $setup.stateBeta.gradientOpacity
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                innerHTML: $setup.stateBeta.slotText
              }, null, 8, _hoisted_2)
            ]),
            _: 1
          }, 8, ["title", "title-level", "title-size", "title-color", "show-title-highlight", "title-highlight-color", "full-width", "bg-image", "display-gradients", "gradient-opacity"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/stories/sections/hero/hero.story.vue";
const hero_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/stories/sections/hero/hero.story.vue"]]);
export {
  hero_story as default
};

import { ar as defineComponent, aE as ref, av as openBlock, ay as createElementBlock, aB as createBaseVNode, aA as Fragment, az as renderList, aC as normalizeClass, aD as toDisplayString, ax as createVNode, au as withCtx, aK as Transition, aI as reactive, as as resolveComponent, at as createBlock } from "./vendor.4286a069.js";
import { g as generateClass, _ as _export_sfc } from "./_plugin-vue_export-helper.e3a59fa7.js";
import { c as colors, h as headingTextSize } from "./index.0271104e.js";
const TabsAlpha_vue_vue_type_style_index_0_scoped_48663686_lang = "";
const _sfc_main$1 = defineComponent({
  __name: "TabsAlpha",
  props: {
    content: { type: Array, required: true },
    borderColor: { type: null, required: false, default: "light-3" },
    bgColor: { type: null, required: false, default: "light-1" },
    tabColor: { type: null, required: false, default: "primary" },
    titleSize: { type: null, required: false, default: "md" },
    activeTitleColor: { type: null, required: false, default: "dark-3" },
    inactiveTitleColor: { type: null, required: false, default: "light-1" },
    displayShadow: { type: Boolean, required: false, default: true },
    rounded: { type: Boolean, required: false, default: true }
  },
  emits: ["tab-click"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const currentTab = ref(0);
    const hadleTabClick = (index, e) => {
      e.preventDefault();
      currentTab.value = index;
      emit("tab-click", e);
    };
    const getBorderClass = (bgColor, border, rounded, shadow) => {
      const classArray = [
        generateClass("BGCOLOR", bgColor),
        generateClass("BORDER", border)
      ];
      if (rounded) {
        classArray.push("rounded-xl");
      }
      if (shadow) {
        classArray.push("shadow-xl");
      }
      return classArray.join(" ");
    };
    const getActiveBtnClass = (tColor, fColor, shadow) => {
      const classArray = [
        generateClass("TEXTCOLOR", fColor),
        generateClass("BGCOLOR", tColor),
        "ring-4",
        "ring-white",
        "ring-opacity-60"
      ];
      if (shadow) {
        classArray.push("drop-shadow");
      }
      return classArray.join(" ");
    };
    const getTabClass = (tColor, rounded) => {
      const classArray = [generateClass("BGCOLOR", tColor)];
      if (rounded) {
        classArray.push("rounded-xl");
      }
      return classArray.join(" ");
    };
    const getInactiveBtnClass = (fColor) => {
      const classArray = [
        generateClass("TEXTCOLOR", fColor),
        "hover:bg-white/25",
        "transition",
        "ease-in",
        "duration-300"
      ];
      return classArray.join(" ");
    };
    const __returned__ = { props, currentTab, emit, hadleTabClick, getBorderClass, getActiveBtnClass, getTabClass, getInactiveBtnClass, generateClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { class: "mt-2xs relative p-xs lg:px-sm whitespace-pre-line" };
const _hoisted_3 = ["innerHTML"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["w-full p-2xs border overflow-hidden", $setup.getBorderClass($props.bgColor, $props.borderColor, $props.rounded, $props.displayShadow)])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["flex p-3xs space-x-1", $setup.getTabClass($props.tabColor, $props.rounded)])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.props.content, (item, index) => {
        return openBlock(), createElementBlock("button", {
          key: index,
          onClick: ($event) => $setup.hadleTabClick(index, $event),
          class: normalizeClass(["text-center focus:outline-none w-full py-2.5", [
            $setup.currentTab === index ? $setup.getActiveBtnClass($props.bgColor, $props.activeTitleColor, $props.displayShadow) : $setup.getInactiveBtnClass($props.inactiveTitleColor),
            $props.rounded && "rounded-lg"
          ]])
        }, [
          createBaseVNode("h3", {
            class: normalizeClass($setup.generateClass("H3", $props.titleSize))
          }, toDisplayString(item.title), 3)
        ], 10, _hoisted_1);
      }), 128))
    ], 2),
    createBaseVNode("div", _hoisted_2, [
      createVNode(Transition, {
        name: "slide",
        mode: "out-in"
      }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock("div", {
            key: $setup.currentTab,
            innerHTML: $props.content[$setup.currentTab].content
          }, null, 8, _hoisted_3))
        ]),
        _: 1
      })
    ])
  ], 2);
}
_sfc_main$1.__file = "src/components/tabs-alpha/TabsAlpha.vue";
const TabsAlpha = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-48663686"], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/components/tabs-alpha/TabsAlpha.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tabs.story",
  setup(__props, { expose }) {
    expose();
    const contentInfo = [
      {
        title: "First",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt blanditiis magni similique quidem nisi quae. Aspernatur ut tempora doloremque dicta ipsum temporibus eius delectus, quas nihil exercitationem, in impedit natus vitae, esse dolore quia totam consequuntur sequi sint odio ducimus explicabo aliquid omnis quam. Quasi porro eum distinctio perspiciatis fugit?"
      },
      {
        title: "Second",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, accusantium. Optio molestias, quod inventore suscipit perferendis ex quaerat odit deleniti quidem laudantium ducimus recusandae illo possimus quam error tempora laborum sapiente magnam quas harum distinctio numquam saepe quasi! Officiis, ipsam!"
      },
      {
        title: "Third",
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laboriosam totam, error reprehenderit quasi commodi, aspernatur a deserunt eligendi nobis sequi vero fuga in consequuntur ipsum. Quod nesciunt nulla corrupti voluptatibus? Natus, corporis quisquam! Corrupti eos, placeat, similique nostrum possimus officia aperiam cupiditate neque ducimus deserunt in quas earum, illo veritatis quos. Laudantium maxime voluptates facilis temporibus repellendus pariatur, quisquam, molestias quam, autem iste officia rerum hic rem. Minus, mollitia?"
      }
    ];
    const stateAlpha = reactive({
      content: contentInfo,
      borderColor: "light-3",
      bgColor: "light-1",
      tabColor: "primary",
      titleSize: "md",
      activeTitleColor: "dark-3",
      inactiveTitleColor: "light-1",
      displayShadow: true,
      rounded: true
    });
    const __returned__ = { contentInfo, stateAlpha, TabsAlpha, colors, headingTextSize };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_HstSelect = resolveComponent("HstSelect");
  const _component_HstCheckbox = resolveComponent("HstCheckbox");
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Tabs",
    group: "base-comp"
  }, {
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "tabs-alpha" }, {
        controls: withCtx(() => [
          createVNode(_component_HstSelect, {
            title: "border-color",
            modelValue: $setup.stateAlpha.borderColor,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.stateAlpha.borderColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "bg-color",
            modelValue: $setup.stateAlpha.bgColor,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.stateAlpha.bgColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "tab-color",
            modelValue: $setup.stateAlpha.tabColor,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.stateAlpha.tabColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "title-size",
            modelValue: $setup.stateAlpha.titleSize,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.stateAlpha.titleSize = $event),
            options: $setup.headingTextSize
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "active-title-color",
            modelValue: $setup.stateAlpha.activeTitleColor,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.stateAlpha.activeTitleColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstSelect, {
            title: "inactive-title-color",
            modelValue: $setup.stateAlpha.inactiveTitleColor,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.stateAlpha.inactiveTitleColor = $event),
            options: $setup.colors
          }, null, 8, ["modelValue", "options"]),
          createVNode(_component_HstCheckbox, {
            title: "display-shadow",
            modelValue: $setup.stateAlpha.displayShadow,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.stateAlpha.displayShadow = $event)
          }, null, 8, ["modelValue"]),
          createVNode(_component_HstCheckbox, {
            title: "rounded",
            modelValue: $setup.stateAlpha.rounded,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.stateAlpha.rounded = $event)
          }, null, 8, ["modelValue"])
        ]),
        default: withCtx(() => [
          createVNode($setup["TabsAlpha"], {
            content: $setup.stateAlpha.content,
            "border-color": $setup.stateAlpha.borderColor,
            "bg-color": $setup.stateAlpha.bgColor,
            "tab-color": $setup.stateAlpha.tabColor,
            "title-size": $setup.stateAlpha.titleSize,
            "active-title-color": $setup.stateAlpha.activeTitleColor,
            "inactive-title-color": $setup.stateAlpha.inactiveTitleColor,
            "display-shadow": $setup.stateAlpha.displayShadow,
            rounded: $setup.stateAlpha.rounded
          }, null, 8, ["content", "border-color", "bg-color", "tab-color", "title-size", "active-title-color", "inactive-title-color", "display-shadow", "rounded"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/stories/components/tabs/tabs.story.vue";
const tabs_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/skim585/Documents/projects/manguito-component-library/src/stories/components/tabs/tabs.story.vue"]]);
export {
  tabs_story as default
};

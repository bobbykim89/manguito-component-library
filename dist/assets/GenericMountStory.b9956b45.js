import { X as defineAsyncComponent, Y as Comp5, Z as useDark, _ as useToggle, $ as markRaw, R as reactive, d as defineComponent, k as ref, a0 as watchEffect, o as openBlock, c as createBlock, m as mergeProps, a1 as resolveDynamicComponent, q as createCommentVNode } from "./vendor.4286a069.js";
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/manguito-component-library/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const Comp0 = defineAsyncComponent(() => __vitePreload(() => import("./MCLTheme.story.f740cac9.js"), true ? ["assets/MCLTheme.story.f740cac9.js","assets/vendor.4286a069.js","assets/_plugin-vue_export-helper.e3a59fa7.js"] : void 0));
const Comp1 = defineAsyncComponent(() => __vitePreload(() => import("./Accordion.story.367dd769.js"), true ? ["assets/Accordion.story.367dd769.js","assets/vendor.4286a069.js","assets/_plugin-vue_export-helper.e3a59fa7.js","assets/index.0271104e.js"] : void 0));
const Comp2 = defineAsyncComponent(() => __vitePreload(() => import("./button.story.c9cb1794.js"), true ? ["assets/button.story.c9cb1794.js","assets/vendor.4286a069.js","assets/_plugin-vue_export-helper.e3a59fa7.js","assets/index.0271104e.js"] : void 0));
const Comp3 = defineAsyncComponent(() => __vitePreload(() => import("./tabs.story.4c37bcbd.js"), true ? ["assets/tabs.story.4c37bcbd.js","assets/vendor.4286a069.js","assets/_plugin-vue_export-helper.e3a59fa7.js","assets/index.0271104e.js"] : void 0));
const Comp4 = defineAsyncComponent(() => __vitePreload(() => import("./hero.story.6df2574b.js"), true ? ["assets/hero.story.6df2574b.js","assets/vendor.4286a069.js","assets/_plugin-vue_export-helper.e3a59fa7.js","assets/index.0271104e.js"] : void 0));
let files = [
  { "id": "src-stories-documentation-mcltheme-story-vue", "path": ["MCL Theme"], "filePath": "src/stories/documentation/MCLTheme.story.vue", "story": { "id": "src-stories-documentation-mcltheme-story-vue", "title": "MCL Theme", "group": "design-system", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-stories-documentation-mcltheme-story-vue-0", "title": "Color Palette", "icon": null, "iconColor": null }, { "id": "src-stories-documentation-mcltheme-story-vue-1", "title": "Spacing", "icon": null, "iconColor": null }, { "id": "src-stories-documentation-mcltheme-story-vue-2", "title": "Body Text", "icon": null, "iconColor": null }] }, "supportPluginId": "vue3", "index": 0, component: Comp0 },
  { "id": "src-stories-components-accordion-accordion-story-vue", "path": ["Accordion"], "filePath": "src/stories/components/accordion/Accordion.story.vue", "story": { "id": "src-stories-components-accordion-accordion-story-vue", "title": "Accordion", "group": "base-comp", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-stories-components-accordion-accordion-story-vue-0", "title": "accordion-alpha", "icon": null, "iconColor": null }, { "id": "src-stories-components-accordion-accordion-story-vue-1", "title": "accordion-beta", "icon": null, "iconColor": null }] }, "supportPluginId": "vue3", "index": 1, component: Comp1 },
  { "id": "src-stories-components-button-button-story-vue", "path": ["Button"], "filePath": "src/stories/components/button/button.story.vue", "story": { "id": "src-stories-components-button-button-story-vue", "title": "Button", "group": "base-comp", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-stories-components-button-button-story-vue-0", "title": "btn-alpha", "icon": null, "iconColor": null }, { "id": "src-stories-components-button-button-story-vue-1", "title": "btn-beta", "icon": null, "iconColor": null }] }, "supportPluginId": "vue3", "index": 2, component: Comp2 },
  { "id": "src-stories-components-tabs-tabs-story-vue", "path": ["Tabs"], "filePath": "src/stories/components/tabs/tabs.story.vue", "story": { "id": "src-stories-components-tabs-tabs-story-vue", "title": "Tabs", "group": "base-comp", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-stories-components-tabs-tabs-story-vue-0", "title": "tabs-alpha", "icon": null, "iconColor": null }] }, "supportPluginId": "vue3", "index": 3, component: Comp3 },
  { "id": "src-stories-sections-hero-hero-story-vue", "path": ["Hero"], "filePath": "src/stories/sections/hero/hero.story.vue", "story": { "id": "src-stories-sections-hero-hero-story-vue", "title": "Hero", "group": "section-comp", "layout": { "type": "single", "iframe": true }, "icon": null, "iconColor": null, "docsOnly": false, "variants": [{ "id": "src-stories-sections-hero-hero-story-vue-0", "title": "hero-alpha", "icon": null, "iconColor": null }, { "id": "src-stories-sections-hero-hero-story-vue-1", "title": "hero-beta", "icon": null, "iconColor": null }] }, "supportPluginId": "vue3", "index": 4, component: Comp4 },
  { "id": "tailwind", "path": ["Tailwind"], "filePath": "/Users/skim585/Documents/projects/manguito-component-library/node_modules/.histoire/plugins/builtin_tailwind-tokens/Tailwind.story.js", "story": { "id": "tailwind", "title": "Tailwind", "group": "design-system", "layout": { "type": "single", "iframe": false }, "icon": "mdi:tailwind", "docsOnly": false, "variants": [{ "id": "background-color", "title": "Background Color", "icon": "carbon:color-palette" }, { "id": "text-color", "title": "Text Color", "icon": "carbon:text-color" }, { "id": "border-color", "title": "Border Color", "icon": "carbon:color-palette" }, { "id": "padding", "title": "Padding", "icon": "carbon:area" }, { "id": "margin", "title": "Margin", "icon": "carbon:area" }, { "id": "font-size", "title": "Font Size", "icon": "carbon:text-font" }, { "id": "font-weight", "title": "Font Weight", "icon": "carbon:text-font" }, { "id": "font-family", "title": "Font Family", "icon": "carbon:text-font" }, { "id": "letter-spacing", "title": "Letter Spacing", "icon": "carbon:text-font" }, { "id": "line-height", "title": "Line Height", "icon": "carbon:text-font" }, { "id": "drop-shadow", "title": "Drop Shadow", "icon": "carbon:shape-except" }, { "id": "border-radius", "title": "Border Radius", "icon": "carbon:condition-wait-point" }, { "id": "border-width", "title": "Border Width", "icon": "carbon:checkbox" }, { "id": "width", "title": "Width", "icon": "carbon:pan-horizontal" }, { "id": "height", "title": "Height", "icon": "carbon:pan-vertical" }, { "id": "full-config", "title": "Full Config", "icon": "carbon:code" }] }, "supportPluginId": "vanilla", "index": 5, component: Comp5 }
];
let tree = [{ "group": true, "id": "design-system", "title": "Design System", "children": [{ "title": "MCL Theme", "index": 0 }, { "title": "Tailwind", "index": 5 }] }, { "group": true, "id": "base-comp", "title": "Base Components", "children": [{ "title": "Accordion", "index": 1 }, { "title": "Button", "index": 2 }, { "title": "Tabs", "index": 3 }] }, { "group": true, "id": "section-comp", "title": "Section Components", "children": [{ "title": "Hero", "index": 4 }] }];
const Logo_square = "/manguito-component-library/mcl-logo-square.png";
const Logo_light = "/manguito-component-library/mcl-logo-light.png";
const Logo_dark = "/manguito-component-library/mcl-logo-dark.png";
const config = { "plugins": [{ "name": "builtin:tailwind-tokens" }, { "name": "builtin:vanilla-support", "supportPlugin": { "id": "vanilla", "moduleName": "/Users/skim585/Documents/projects/manguito-component-library/node_modules/histoire/dist/node/builtin-plugins/vanilla-support", "setupFn": "setupVanilla" } }, { "name": "@histoire/plugin-vue", "supportPlugin": { "id": "vue3", "moduleName": "@histoire/plugin-vue", "setupFn": "setupVue3", "importStoriesPrepend": "import { defineAsyncComponent as defineAsyncComponentVue3 } from 'vue'" } }], "outDir": "/Users/skim585/Documents/projects/manguito-component-library/dist", "storyMatch": ["**/*.story.vue", "**/*.story.svelte"], "storyIgnored": ["**/node_modules/**", "**/dist/**"], "supportMatch": [{ "id": "vanilla", "patterns": ["**/*.js"], "pluginIds": ["vanilla"] }, { "id": "vue", "patterns": ["**/*.vue"], "pluginIds": ["vue3"] }], "tree": { "file": "title", "order": "asc", "groups": [{ "id": "design-system", "title": "Design System" }, { "id": "base-comp", "title": "Base Components" }, { "id": "section-comp", "title": "Section Components" }] }, "theme": { "title": "Manguito Components Library", "colors": { "primary": { "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f" }, "gray": { "50": "#fafafa", "100": "#f4f4f5", "200": "#e4e4e7", "300": "#d4d4d8", "400": "#a1a1aa", "500": "#71717a", "600": "#52525b", "700": "#3f3f46", "750": "#323238", "800": "#27272a", "850": "#1f1f21", "900": "#18181b", "950": "#101012" } }, "logo": { "square": "/mcl-logo-square.png", "light": "/mcl-logo-light.png", "dark": "/mcl-logo-dark.png" }, "favicon": "./favicon.ico", "logoHref": "https://manguitopage.herokuapp.com/" }, "responsivePresets": [{ "label": "Mobile (Small)", "width": 320, "height": 560 }, { "label": "Mobile (Medium)", "width": 360, "height": 640 }, { "label": "Mobile (Large)", "width": 414, "height": 896 }, { "label": "Tablet", "width": 768, "height": 1024 }, { "label": "Laptop (Small)", "width": 1024, "height": null }, { "label": "Laptop (Large)", "width": 1366, "height": null }, { "label": "Desktop", "width": 1920, "height": null }, { "label": "4K", "width": 3840, "height": null }], "backgroundPresets": [{ "label": "Transparent", "color": "transparent" }, { "label": "White", "color": "#fff" }, { "label": "Light gray", "color": "#aaa" }, { "label": "Dark gray", "color": "#333" }, { "label": "Black", "color": "#000" }], "sandboxDarkClass": "dark", "routerMode": "history", "viteIgnorePlugins": [], "setupFile": "src/histoire.setup.ts" };
const logos = { square: Logo_square, light: Logo_light, dark: Logo_dark };
const histoireConfig = config;
const customLogos = logos;
const isDark = useDark({ valueDark: "htw-dark" });
const toggleDark = useToggle(isDark);
const copiedFromExistingVariant = [
  "state",
  "slots",
  "source",
  "responsiveDisabled",
  "autoPropsDisabled",
  "setupApp",
  "configReady",
  "previewReady"
];
function mapFile(file, existingFile) {
  let result;
  if (existingFile) {
    result = existingFile;
    for (const key in file) {
      if (key === "story") {
        Object.assign(result.story, {
          ...file.story,
          file: markRaw(result),
          variants: file.story.variants.map((v) => mapVariant(v, existingFile.story.variants.find((item) => item.id === v.id)))
        });
      } else if (key !== "component") {
        result[key] = file[key];
      }
    }
  } else {
    result = {
      ...file,
      component: markRaw(file.component),
      story: {
        ...file.story,
        title: file.story.title,
        file: markRaw(file),
        variants: file.story.variants.map((v) => mapVariant(v)),
        slots: () => ({})
      }
    };
  }
  return result;
}
function mapVariant(variant, existingVariant) {
  let result;
  if (existingVariant) {
    result = existingVariant;
    for (const key in variant) {
      if (!copiedFromExistingVariant.includes(key)) {
        result[key] = variant[key];
      }
    }
  } else {
    result = {
      ...variant,
      state: reactive({
        _hPropState: {},
        _hPropDefs: {}
      }),
      setupApp: null,
      slots: () => ({}),
      previewReady: false
    };
  }
  return result;
}
const clientSupportPlugins = {
  "vanilla": () => __vitePreload(() => import("./vendor.4286a069.js").then((n) => n.aP), true ? [] : void 0),
  "vue3": () => __vitePreload(() => import("./vendor.4286a069.js").then((n) => n.aQ), true ? [] : void 0)
};
const __default__ = {
  inheritAttrs: false
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "GenericMountStory",
  props: {
    story: null
  },
  setup(__props) {
    const props = __props;
    const mountComponent = ref(null);
    watchEffect(async () => {
      var _a;
      const clientPlugin = clientSupportPlugins[(_a = props.story.file) == null ? void 0 : _a.supportPluginId];
      if (clientPlugin) {
        const pluginModule = await clientPlugin();
        mountComponent.value = markRaw(pluginModule.MountStory);
      }
    });
    return (_ctx, _cache) => {
      return mountComponent.value ? (openBlock(), createBlock(resolveDynamicComponent(mountComponent.value), mergeProps({
        key: 0,
        story: __props.story
      }, _ctx.$attrs), null, 16, ["story"])) : createCommentVNode("", true);
    };
  }
});
export {
  __vitePreload as _,
  tree as a,
  _sfc_main as b,
  customLogos as c,
  clientSupportPlugins as d,
  files as f,
  histoireConfig as h,
  isDark as i,
  mapFile as m,
  toggleDark as t
};

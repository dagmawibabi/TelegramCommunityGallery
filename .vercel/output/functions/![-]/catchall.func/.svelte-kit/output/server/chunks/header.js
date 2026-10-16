import { c as create_ssr_component, h as compute_rest_props, i as spread, k as escape_object, j as escape_attribute_value, q as each, v as validate_component, e as escape } from "./ssr.js";
import { w as writable } from "./index.js";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
/**
 * @license lucide-svelte v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode",
    "mergeClasses"
  ]);
  let { name = void 0 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  if ($$props.mergeClasses === void 0 && $$bindings.mergeClasses && mergeClasses !== void 0) $$bindings.mergeClasses(mergeClasses);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }
    ],
    ["path", { "d": "M9 18c-4.51 2-5-2-7-2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "github" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Send = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m22 2-7 20-4-9-9-4Z" }], ["path", { "d": "M22 2 11 13" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "send" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Socials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex justify-end pt-4 text-zinc-500 md:pt-8 "><div class="flex "><a href="https://github.com/dagmawibabi/TelegramCommunityGallery" class="hover:text-blue-500">${validate_component(Github, "Github").$$render($$result, { size: 20 }, {}, {})}</a> <div class="w-4"></div> <a href="https://t.me/Dagmawi_Babi" class="hover:text-blue-500">${validate_component(Send, "Send").$$render($$result, { size: 20 }, {}, {})}</a></div></div>`;
});
const allCommunitiesStore = writable([]);
const filteredTagsStore = writable([]);
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allCommunities = [];
  const year = /* @__PURE__ */ (/* @__PURE__ */ new Date()).getFullYear();
  allCommunitiesStore.subscribe((data) => {
    allCommunities = data;
  });
  return `<footer class="px-5 pb-10 pt-6 md:px-0"><div class="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-black/40 px-5 py-5 backdrop-blur md:flex-row md:items-center md:justify-between"><div data-svelte-h="svelte-3ungym"><p class="text-sm font-semibold text-zinc-100">Telegram Community Gallery</p> <p class="pt-1 text-sm text-zinc-400">Open directory for discovering Telegram channels and groups.</p></div> <div class="flex flex-wrap items-center gap-4 text-sm text-zinc-400"><span>${escape(allCommunities.length)} listed</span> <a href="https://github.com/dagmawibabi/TelegramCommunityGallery" class="inline-flex items-center gap-2 transition hover:text-blue-400">${validate_component(Github, "Github").$$render($$result, { size: 16 }, {}, {})}
				GitHub</a> <a href="https://t.me/Dagmawi_Babi" class="inline-flex items-center gap-2 transition hover:text-cyan-400">${validate_component(Send, "Send").$$render($$result, { size: 16 }, {}, {})}
				Telegram</a> <span class="text-zinc-500">${escape(year)}</span></div></div></footer>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allCommunities = [];
  allCommunitiesStore.subscribe((data) => {
    allCommunities = data;
  });
  return `<div class="text-center"><p class="text-sm text-orange-500 pt-5 md:pt-0 ">#${escape(allCommunities.length)} Communities Added!</p> <a href="/" data-svelte-h="svelte-1dhsyaq"><p class="text-2xl font-bold pt-1 leading-snug hover:text-blue-500 md:text-4xl ">Discover the Best <br> Telegram Communities</p></a> <div class="pt-3 pb-2" data-svelte-h="svelte-12yff26"><p class="text-sm text-zinc-400">Here are some of the most incredible channels and groups submitted by the public. 
            <br class="hidden md:block"></p></div></div>`;
});
export {
  Footer as F,
  Header as H,
  Icon as I,
  Send as S,
  allCommunitiesStore as a,
  Socials as b,
  filteredTagsStore as f,
  is_void as i
};

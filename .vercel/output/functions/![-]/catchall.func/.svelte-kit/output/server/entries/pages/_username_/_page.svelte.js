import { c as create_ssr_component, v as validate_component, e as escape, l as add_attribute, q as each } from "../../../chunks/ssr.js";
import { I as Icon, a as allCommunitiesStore, b as Socials, H as Header, F as Footer } from "../../../chunks/header.js";
const Rss = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M4 11a9 9 0 0 1 9 9" }],
    ["path", { "d": "M4 4a16 16 0 0 1 16 16" }],
    ["circle", { "cx": "5", "cy": "19", "r": "1" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "rss" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    ["path", { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "users" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let currentCommunity = {
    name: "",
    link: "",
    description: "",
    owner: "",
    tags: [],
    type: ""
  };
  currentCommunity = data.community[0] ?? currentCommunity;
  allCommunitiesStore.subscribe((data2) => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-qpt9r6_START -->${$$result.title = `<title> ${escape(currentCommunity.name)} </title>`, ""}<!-- HEAD_svelte-qpt9r6_END -->`, ""} <div class="relative h-screen w-screen"> <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" data-svelte-h="svelte-kg2p8b"></div> <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#63e_100%)]"></div>  <div class="absolute bottom-0 left-0 right-0 top-0 z-50 w-full h-screen overflow-scroll no-scrollbar"><div class="w-full m-auto md:w-1/2 md:px-0 "><div class="px-5 md:px-0 "> ${validate_component(Socials, "Socials").$$render($$result, {}, {}, {})}  ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}</div>  <div class="py-10 px-6 pb-40 md:px-20 "><div${add_attribute(
    "class",
    currentCommunity.type == "channel" ? "relative w-fit mx-auto rounded-2xl border border-emerald-500 bg-zinc-950 md:min-w-[400px]" : "relative w-fit mx-auto rounded-2xl border border-cyan-500 bg-zinc-950 md:min-w-[400px]",
    0
  )}>${currentCommunity.type == "channel" ? `<div class="absolute -left-3 -top-3 z-10 hidden rounded-full bg-emerald-500 p-3 text-black md:block">${validate_component(Rss, "Rss").$$render($$result, { size: 25 }, {}, {})}</div>` : `<div class="absolute -left-3 -top-3 z-10 hidden rounded-full bg-cyan-500 p-3 text-black md:block">${validate_component(Users, "Users").$$render($$result, { size: 25 }, {}, {})}</div>`} ${currentCommunity.image_url ? `<div class="aspect-square w-full overflow-hidden rounded-t-2xl bg-zinc-950"><img${add_attribute("src", currentCommunity.image_url, 0)}${add_attribute("alt", currentCommunity.name, 0)} class="h-full w-full object-contain object-center"></div>` : ``} <div class="px-4 py-3 md:px-8 md:py-6"><div${add_attribute(
    "class",
    currentCommunity.type == "channel" ? "text-lg font-bold pb-1 text-emerald-500 md:text-md" : "text-lg font-bold pb-1 text-cyan-500",
    0
  )}>${escape(currentCommunity.name)}</div> <a${add_attribute("href", `https://t.me/${(currentCommunity.link ?? "").substring(1)}`, 0)}><div${add_attribute(
    "class",
    currentCommunity.type == "channel" ? "w-fit text-sm pb-6 text-cyan-500 font-semibold md:text-md" : "text-md pb-6 text-emerald-500 font-semibold",
    0
  )}>${escape(currentCommunity.link)}</div></a>  <div class="text-md text-zinc-200 line-clamp-none pb-5 flex flex-wrap md:text-md"> ${(currentCommunity.description ?? "").includes("\n") == true ? `${each((currentCommunity.description ?? "").split("\n"), (letters) => {
    return `<span${add_attribute(
      "class",
      currentCommunity.type == "channel" ? "hover:text-emerald-500" : "hover:text-cyan-500",
      0
    )}>${escape(letters)} 
                            </span>`;
  })}` : `${each((currentCommunity.description ?? "").split(" "), (letters) => {
    return `<span${add_attribute(
      "class",
      currentCommunity.type == "channel" ? "hover:text-emerald-500" : "hover:text-cyan-500",
      0
    )}>${escape(letters)} 
                            </span>`;
  })}`}</div> ${currentCommunity.owner != "" ? `<a${add_attribute("href", `https://t.me/${currentCommunity.owner?.substring(1)}`, 0)}><div class="text-md font-semibold">Owner: <span${add_attribute(
    "class",
    currentCommunity.type == "channel" ? "text-cyan-500" : "text-emerald-500",
    0
  )}>${escape(currentCommunity.owner)}</span></div></a>` : ``} <div class="flex flex-row flex-wrap pt-6">${each(currentCommunity.tags, (tag) => {
    return `<div class="pr-2 pb-3"><div${add_attribute(
      "class",
      currentCommunity.type == "channel" ? "rounded-full px-3 bg-emerald-500 w-fit text-sm text-black font-semibold line-clamp-1 whitespace-nowrap" : "rounded-full px-3 bg-cyan-500 w-fit text-sm text-black font-semibold line-clamp-1 overflow-scroll no-scrollbar whitespace-nowrap",
      0
    )}>${escape(tag)}</div> </div>`;
  })}</div></div></div></div></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></div>`;
});
export {
  Page as default
};

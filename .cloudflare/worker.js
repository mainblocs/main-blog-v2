var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .svelte-kit/output/server/chunks/index.js
function subscribe_to_store(store, run, invalidate) {
  if (store == null) {
    run(void 0);
    if (invalidate)
      invalidate(void 0);
    return noop;
  }
  const unsub = store.subscribe(
    run,
    // @ts-expect-error
    invalidate
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function getContext(key2) {
  const context_map = getAllContexts();
  const result = (
    /** @type {T} */
    context_map.get(key2)
  );
  return result;
}
function setContext(key2, context) {
  getAllContexts().set(key2, context);
  return context;
}
function getAllContexts() {
  const context = current_component;
  if (context === null) {
    throw new Error(
      "ERR_SVELTE_ORPHAN_CONTEXT"
    );
  }
  return context.c ??= new Map(get_parent_context(context) || void 0);
}
function push() {
  current_component = { p: current_component, c: null, d: null };
}
function pop() {
  var component7 = (
    /** @type {import('#server').Component} */
    current_component
  );
  var ondestroy = component7.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component7.p;
}
function get_parent_context(component_context) {
  let parent = component_context.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
function create_payload() {
  return { out: "", head: { title: "", out: "", anchor: 0 }, anchor: 0 };
}
function render(component7, options2) {
  const payload = create_payload();
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  if (options2.context) {
    push();
    current_component.c = options2.context;
  }
  component7(payload, options2.props, {}, {});
  if (options2.context) {
    pop();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy)
    cleanup();
  on_destroy = prev_on_destroy;
  return {
    head: payload.head.out || payload.head.title ? payload.head.out + payload.head.title : "",
    html: payload.out
  };
}
function escape(value, is_attr = false) {
  const str = String(value ?? "");
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function attr(name, value, boolean) {
  if (value == null || !value && boolean || value === "" && name === "class")
    return "";
  const assignment = boolean ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function store_get(store_values, store_name, store) {
  if (store_name in store_values && store_values[store_name][0] === store) {
    return store_values[store_name][2];
  }
  store_values[store_name]?.[1]();
  store_values[store_name] = [store, null, void 0];
  const unsub = subscribe_to_store(
    store,
    /** @param {any} v */
    (v) => store_values[store_name][2] = v
  );
  store_values[store_name][1] = unsub;
  return store_values[store_name][2];
}
function unsubscribe_stores(store_values) {
  for (const store_name in store_values) {
    store_values[store_name][1]();
  }
}
function slot(payload, slot_fn, slot_props, fallback_fn) {
  if (slot_fn === void 0) {
    if (fallback_fn !== null) {
      fallback_fn();
    }
  } else {
    slot_fn(payload, slot_props);
  }
}
function bind_props(props_parent, props_now) {
  for (const key2 in props_now) {
    const initial_value = props_parent[key2];
    const value = props_now[key2];
    if (initial_value === void 0 && value !== void 0 && Object.getOwnPropertyDescriptor(props_parent, key2)?.set) {
      props_parent[key2] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
var noop, HYDRATION_START, HYDRATION_END, UNINITIALIZED, PassiveDelegatedEvents, current_component, BLOCK_OPEN, BLOCK_CLOSE, ATTR_REGEX, CONTENT_REGEX, on_destroy;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    noop = () => {
    };
    HYDRATION_START = "[";
    HYDRATION_END = "]";
    UNINITIALIZED = Symbol();
    PassiveDelegatedEvents = ["touchstart", "touchmove", "touchend"];
    current_component = null;
    BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
    BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    on_destroy = [];
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/")
    return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html"))
    return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, tracked_url_properties, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// .svelte-kit/output/server/chunks/client.js
function get2(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY;
var init_client = __esm({
  ".svelte-kit/output/server/chunks/client.js"() {
    init_exports();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get2(SCROLL_KEY) ?? {};
    get2(SNAPSHOT_KEY) ?? {};
  }
});

// .svelte-kit/output/server/chunks/logo.js
function Logo($$payload, $$props) {
  push();
  $$payload.out += `<div><svg viewBox="0 0 369.6666666666667 97.61485759736304" width="200px"><g id="SvgjsG1659" transform="matrix(1.190425978721935,0,0,1.190425978721935,-17.852877128588492,-11.904330174497602)" fill="#000000"><rect xmlns="http://www.w3.org/2000/svg" x="25.249" y="20.252" transform="matrix(0.7071 0.7071 -0.7071 0.7071 46.463 -22.1737)" fill="#ffffff" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="49.499" height="49.497"></rect><path xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M49.999,69.395 l24.394-24.392L50,20.608L25.608,45.002L49.999,69.395z
				M63.785,45.002L49.999,58.787L36.214,45.002L50,31.215L63.785,45.002z"></path><rect xmlns="http://www.w3.org/2000/svg" x="47.754" y="42.754" transform="matrix(-0.707 0.7072 -0.7072 -0.707 117.1804 41.4576)" fill="#000000" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="4.496" height="4.497"></rect><polygon xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 49.999,80 20,50.004 15.002,55 49.999,90 85,55 80,50 "></polygon></g></svg></div>`;
  pop();
}
var init_logo = __esm({
  ".svelte-kit/output/server/chunks/logo.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/chunks/open.js
function Open($$payload, $$props) {
  push();
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"></path></svg>`;
  pop();
}
var init_open = __esm({
  ".svelte-kit/output/server/chunks/open.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
function Facebook($$payload, $$props) {
  push();
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" version="1.0" viewBox="0.0 0.0 237.4 237.4" zoomAndPan="magnify" style="fill: rgb(255, 255, 255);"><g><path d="M130.1,83.1v19.3h24.3l-3.4,26.4h-20.9v60.5h-26.5v-60.5H80.9v-26.4h22.7V83.1c0-20.9,16.9-35,37.8-35c9.2,0,15,1.4,15,1.4
			v22.3h-15C135.2,71.8,130.1,76.9,130.1,83.1z"></path><path d="M118.7,237.4C53.3,237.4,0,184.2,0,118.7S53.3,0,118.7,0c65.5,0,118.7,53.3,118.7,118.7S184.2,237.4,118.7,237.4z
			M118.7,6.5C56.8,6.5,6.5,56.8,6.5,118.7s50.3,112.2,112.2,112.2c61.9,0,112.2-50.3,112.2-112.2S180.6,6.5,118.7,6.5z"></path></g></svg>`;
  pop();
}
function Instagram($$payload, $$props) {
  push();
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" version="1.0" viewBox="0.0 0.0 237.4 237.4" zoomAndPan="magnify" style="fill: rgb(255, 255, 255);"><g><g id="__id352_s3f6kv6di"><path d="M149.7,50.5H87.8c-20.5,0-37.2,16.7-37.2,37.2v61.9c0,20.5,16.7,37.2,37.2,37.2h61.9c20.5,0,37.2-16.7,37.2-37.2V87.8
				C186.9,67.2,170.2,50.5,149.7,50.5z
				M175.2,149.7c0,14.1-11.4,25.5-25.5,25.5H87.8c-14.1,0-25.6-11.4-25.6-25.5V87.8
				c0-14.1,11.5-25.6,25.6-25.6h61.9c14.1,0,25.5,11.4,25.5,25.6V149.7z" style="fill: inherit;"></path><path d="M164.3,81.4c0,4.6-3.7,8.4-8.4,8.4c-4.6,0-8.4-3.7-8.4-8.4c0-4.6,3.7-8.4,8.4-8.4C160.6,73.1,164.3,76.8,164.3,81.4z" style="fill: inherit;"></path><path d="M118.7,84C99.6,84,84,99.6,84,118.7c0,19.1,15.6,34.7,34.7,34.7c19.1,0,34.7-15.6,34.7-34.7C153.4,99.6,137.9,84,118.7,84
				z
				M118.7,141.7c-12.7,0-23-10.3-23-23c0-12.7,10.3-23,23-23c12.7,0,23,10.3,23,23C141.7,131.4,131.4,141.7,118.7,141.7z" style="fill: inherit;"></path></g><g id="__id353_s3f6kv6di"><path d="M118.7,237.4C53.3,237.4,0,184.2,0,118.7C0,53.3,53.3,0,118.7,0c65.5,0,118.7,53.3,118.7,118.7
				C237.4,184.2,184.2,237.4,118.7,237.4z
				M118.7,6.5C56.8,6.5,6.5,56.8,6.5,118.7c0,61.9,50.3,112.2,112.2,112.2
				c61.9,0,112.2-50.3,112.2-112.2C230.9,56.8,180.6,6.5,118.7,6.5z" style="fill: inherit;"></path></g></g></svg>`;
  pop();
}
function Twitter($$payload, $$props) {
  push();
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" version="1.0" viewBox="0.0 0.0 237.4 237.4" zoomAndPan="magnify" style="fill: rgb(255, 255, 255);"><g id="__id355_s3f6kv6di"><path d="M170.9,92.6c0,0,1.8,37.9-27.1,61.3c-43.1,35-89.6,6.6-89.6,6.6s11.3,0.2,21.3-2.5c10-2.7,17.1-9.1,17.1-9.1
			s-10.9-2.3-16.5-6.4c-5.7-4.1-7.8-12-7.8-12s3.7,0.3,6.1,0.3c2.4-0.1,5.3-1.2,5.3-1.2s-7.8-0.9-15.1-9.1
			c-5.7-6.4-5.3-17.1-5.3-17.1s3.4,2,5.3,2.5c1.8,0.5,5.3,0.5,5.3,0.5s-6.8-4.1-9.9-14.5c-3-10.5,2.8-21.1,2.8-21.1
			S72.8,83,87.9,90.9c15.1,7.9,29.3,7.6,29.3,7.6s-2.1-6.3,1.5-15.5c3.6-9.3,11.8-15.9,24.2-16.9c12.4-1,20.3,8.4,20.3,8.4
			s3.8-0.7,8.2-2.3c4.4-1.6,8.7-3.6,8.7-3.6s-1.5,4.7-4.5,8.4c-3,3.7-6.4,5.9-6.4,5.9s3.9-0.3,7.8-1.4c3.9-1.1,6.1-2.2,6.1-2.2
			C178.8,86.9,170.9,92.6,170.9,92.6z" style="fill: inherit;"></path><path d="M118.7,237.4C53.3,237.4,0,184.2,0,118.7S53.3,0,118.7,0s118.7,53.3,118.7,118.7S184.2,237.4,118.7,237.4z
			M118.7,6.5
			C56.8,6.5,6.5,56.8,6.5,118.7s50.3,112.2,112.2,112.2s112.2-50.3,112.2-112.2S180.6,6.5,118.7,6.5z" style="fill: inherit;"></path></g></svg>`;
  pop();
}
function Subscribe($$payload, $$props) {
  push();
  let emailStore = {
    error: false,
    value: "",
    message: "thank you for subscribing. We will notify you on important updates.",
    errorMessage: "please enter valid email."
  };
  $$payload.out += `<div class="max-w-sm pb-8"><h2 class="font-yoga text-sm font-semibold tracking-wider text-white">Sign up for our newsletter</h2> <p class="mt-4 text-sm text-gray-100 font-comsans">Subscribe to get the latest design news, articles, resources and inspiration.</p> <div class="relative mt-6"><input type="email" placeholder="Email address" autocomplete="email" aria-label="Email address"${attr("value", emailStore.value, false)} class="block w-full rounded-2xl border border-neutral-300 bg-white py-4 pl-6 pr-20 text-base/6 text-white ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"> <div class="absolute inset-y-1 right-1 flex justify-end"><button aria-label="Submit" class="flex aspect-square h-full items-center justify-center rounded-xl bg-black text-white transition hover:bg-neutral-800 mr-2"><svg viewBox="0 0 16 6" aria-hidden="true" class="w-6 h-full text-white"><path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M16 3 10 .5v2H0v1h10v2L16 3Z"></path></svg></button></div></div> <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</div>`;
  pop();
}
function Footer($$payload, $$props) {
  push();
  $$payload.out += `<section class="bg-bgblack py-24"><div class="wrapper p-4 scroll-px-4"><div class="flex flex-col items-center md:flex-row md:justify-between text-white"><div class="flex flex-col w-full md:w-2/3"><div><!--[-->`;
  Logo($$payload);
  $$payload.out += `<!--]--></div> <div class="flex flex-col gap-12 py-32"><div><h3 class="leading-[.9971em] tracking-[-0.01em] font-yoga text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold w-full md:max-w-[500px] text-wrap">Make your mark</h3></div> <div class="mt-8"><a href="/contact" class="font-yoga max-w-24"><h3 class="text-md md:text-xl font-bold rounded-full border-spacing-1 border-2 border-white p-4 md:p-6 lg:px-8 lg:py-5 xl:px-12 max-w-[350px] text-center">Work with us</h3></a></div></div></div> <div class="flex flex-col w-full md:w-1/3 gap-8 font-eb text-xl"><!--[-->`;
  Subscribe($$payload);
  $$payload.out += `<!--]--> <div class="flex flex-col gap-1"><span>hello@mainblocs.com</span> <span>(123) 323-3232</span></div> <div class="flex flex-col gap-1"><span>123 Main St</span> <span>San Francisco, CA 94105</span></div> <div class="flex gap-3"><span class="w-12 h-12"><!--[-->`;
  Facebook($$payload);
  $$payload.out += `<!--]--></span> <span class="w-12 h-12"><!--[-->`;
  Twitter($$payload);
  $$payload.out += `<!--]--></span> <span class="w-12 h-12"><!--[-->`;
  Instagram($$payload);
  $$payload.out += `<!--]--></span></div></div></div></div></section>`;
  pop();
}
function WorksMenu($$payload, $$props) {
  push();
  let { activeIndex } = $$props;
  $$payload.out += `<div style="width: 100%;"${attr(
    "class",
    `flex-col justify-center md:flex-row flex-wrap gap-6 bg-white w-full z-50 min-h-[450px] pt-12 hide left-0 top-[45px] flex ${stringify([
      activeIndex == 2 ? "fadeIn" : "",
      activeIndex == 2 ? "visible" : "",
      activeIndex != 2 ? "fadeOut" : ""
    ].filter(Boolean).join(" "))}`,
    false
  )} data-aos="fade-in"><div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px] svelte-m1qcxe ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img class="w-full h-full object-cover rounded-lg svelte-m1qcxe" src="/head.webp" alt="Lamp on White Background" loading="lazy"> <div class="hover-image flex flex-col gap-4 svelte-m1qcxe"><img alt="Lamp on White Background" class="w-full h-full object-cover rounded-lg svelte-m1qcxe" src="/chicago.webp" loading="lazy"> <div class="w-full bg-gray-200 absolute bottom-[50%] translate-y-[50%] right-0 p-4"><a href="/work" class="text-black w-full bg-gray-200 flex gap-3 items-center"><span class="text-nowrap">View Casestudy</span> <!--[-->`;
  Open($$payload);
  $$payload.out += `<!--]--></a></div></div></div> <div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px] svelte-m1qcxe ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img alt="Lamp on White Background" class="w-full h-full object-cover rounded-lg svelte-m1qcxe" src="/chicago.webp" loading="lazy"> <img class="w-full h-full object-cover rounded-lg hover-image svelte-m1qcxe" src="/head.webp" alt="Lamp on White Background" loading="lazy"></div> <div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px] svelte-m1qcxe ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img src="/indie.webp" class="w-full h-full object-cover rounded-lg svelte-m1qcxe" alt="Macbook Mockup on White Table" loading="lazy"> <img class="w-full h-full object-cover rounded-lg hover-image svelte-m1qcxe" src="/head.webp" alt="Lamp on White Background" loading="lazy"></div> <div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px] svelte-m1qcxe ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img alt="Lamp on White Background" class="w-full h-full object-cover rounded-lg svelte-m1qcxe" src="/superstore.webp" loading="lazy"> <img class="w-full h-full object-cover rounded-lg hover-image svelte-m1qcxe" src="/head.webp" alt="Lamp on White Background" loading="lazy"></div> <div class="w-[400px] bg-gray-200 p-4 self-start"><a href="/work" class="text-black w-full bg-gray-200 h-full flex items-center"><span class="text-nowrap">see Case studies</span> <!--[-->`;
  Open($$payload);
  $$payload.out += `<!--]--></a></div></div>`;
  pop();
}
function Header($$payload, $$props) {
  push();
  const each_array = ensure_array_like(navData.navItems);
  $$payload.out += `<section class="bg-bgprimary font-[yoga] fixed top-0 left-0 w-full header z-[10000] px-4 pt-4 pb-2" data-aos="fade-in"><div class="wrapper"><nav class="flex items-center justify-between relative"><div class="w-[300px]"><a href="/" class="flex gap-2 items-center h-12 w-full" title="Home"><div class="w-[40px]"><!--[-->`;
  Logo($$payload);
  $$payload.out += `<!--]--></div> <span class="text-white ml-4">Mainblocs</span></a></div> <div class="hidden md:block w-[calc(100%-300px)]"><ul class="flex gap-6 text-xs justify-end items-center text-white tex-sm"><!--[-->`;
  for (let index7 = 0; index7 < each_array.length; index7++) {
    const item = each_array[index7];
    $$payload.out += "<!--[-->";
    $$payload.out += `<li class="navMenuLink"><a class="navMenuLinkContent"${attr("href", item.link, false)}${attr("title", item.title, false)}>${escape(item.title)}</a></li>`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += ` <!--[-->`;
  WorksMenu($$payload, { activeIndex: navData.activeIndex });
  $$payload.out += `<!--]--></ul></div> <div class="md:hidden"><!--[-->`;
  {
    $$payload.out += `<button><img src="/menu.svg" class="w-8 h-8" alt="Menu"></button>`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += `</div></nav> <div class="md:hidden"><!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</div></div></section>`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  const prerender = true;
  const ssr = true;
  $$payload.out += `<div class="overflow-x-hidden"><!--[-->`;
  Header($$payload);
  $$payload.out += `<!--]--> <!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]--> <!--[-->`;
  Footer($$payload);
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { prerender, ssr });
  pop();
}
var navData;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_chunks();
    init_client();
    init_logo();
    init_open();
    navData = {
      activeIndex: 0,
      showPhoneMenu: false,
      isMenuOpen: false,
      navItems: [
        {
          title: "about",
          link: "/about",
          name: "about",
          id: "about",
          index: 1
        },
        {
          title: "our work",
          link: "/work",
          name: "our work",
          id: "ourWork",
          index: 2
        },
        {
          title: "services",
          link: "/services",
          name: "services",
          id: "services",
          index: 3
        },
        {
          title: "contact",
          link: "/contact",
          name: "contact",
          id: "contact",
          index: 5
        }
      ]
    };
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    imports = ["_app/immutable/nodes/0.B7VcqWL8.js", "_app/immutable/chunks/disclose-version.BD2IXOaX.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/render.CR8dV1-2.js", "_app/immutable/chunks/open.DMfvnW-Y.js", "_app/immutable/chunks/lifecycle.DBI0busB.js", "_app/immutable/chunks/utils.BSJX-nVd.js", "_app/immutable/chunks/entry.BN9CiMvb.js", "_app/immutable/chunks/index-client.DT8scQk1.js", "_app/immutable/chunks/proxy.B9TrOHuA.js", "_app/immutable/chunks/logo.Bo_vi5yG.js", "_app/immutable/chunks/class.CAljAydP.js", "_app/immutable/chunks/if.Rq_8K8pM.js", "_app/immutable/chunks/attributes.DFpEsyqO.js", "_app/immutable/chunks/modalstore.svelte.B0ZaCesU.js", "_app/immutable/chunks/each.COBTARdN.js"];
    stylesheets = ["_app/immutable/assets/0.BB4trCYu.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
function Error$1($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<h1>${escape(store_get($$store_subs ??= {}, "$page", page).status)}</h1> <p>${escape(store_get($$store_subs ??= {}, "$page", page).error?.message)}</p>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
var getStores, page;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_chunks();
    init_client();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.VH5CdIGr.js", "_app/immutable/chunks/disclose-version.BD2IXOaX.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/render.CR8dV1-2.js", "_app/immutable/chunks/lifecycle.DBI0busB.js", "_app/immutable/chunks/utils.BSJX-nVd.js", "_app/immutable/chunks/entry.BN9CiMvb.js", "_app/immutable/chunks/index-client.DT8scQk1.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/chunks/Wedo.js
function Circle($$payload, $$props) {
  push();
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" version="1.0" fill="#ff6c89" viewBox="0.0 0.0 1479.7 1479.7" zoomAndPan="magnify"><path d="M1441.7275391,323.0449219c-26.0556641-64.2524414-64.3349609-121.8999023-113.7773438-171.3413086
			c-49.4414062-49.4418945-107.0888672-87.722168-171.3408203-113.7773438C1094.5498047,12.7602539,1028.9755859,0,961.7070312,0
			s-132.84375,12.7602539-194.9023438,37.9262695c-64.2529297,26.0551758-121.9003906,64.3354492-171.3422852,113.7773438
			c-38.0586548,38.0586548-69.4953003,80.984436-93.8416748,128.0378418
			c-47.0531006,24.3461914-89.9787598,55.7832031-128.0372314,93.842041
			c-38.0588379,38.0584717-69.4957886,80.9841309-93.842041,128.0372314
			c-47.0533447,24.3463745-89.979187,55.78302-128.0378418,93.8416748
			c-49.4418945,49.4418945-87.722168,107.0893555-113.7773438,171.3422852C12.7602539,828.8632812,0,894.4384766,0,961.7070312
			s12.7602539,132.8427734,37.9262695,194.9023438c26.0551758,64.2519531,64.3354492,121.8994141,113.7773438,171.3408203
			c49.4414062,49.4423828,107.0888672,87.7216797,171.3413086,113.7773438
			c62.059082,25.1660156,127.6337891,37.9257812,194.902832,37.9257812c67.2685547,0,132.8432617-12.7597656,194.9023438-37.9257812
			c64.2524414-26.0556641,121.8999023-64.3349609,171.3413086-113.7773438
			c38.0584106-38.0583496,69.4951782-80.9840088,93.8416138-128.0367432
			c47.0536499-24.3465576,89.9796753-55.7835693,128.038269-93.8421631s69.4956055-80.9846191,93.8421631-128.038269
			c47.0527344-24.3464355,89.9783936-55.7832031,128.0367432-93.8416138
			c49.4423828-49.4414062,87.7216797-107.0888672,113.7773438-171.3413086
			c25.1660156-62.059082,37.9257812-127.6337891,37.9257812-194.9023438
			C1479.6533203,450.6787109,1466.8935547,385.1040039,1441.7275391,323.0449219z
			M378.5332031,378.5332031 c35.2042847-35.2046509,74.6257324-64.6693115,117.6669922-88.0054321
			c-5.1924438,10.6403809-10.0383911,21.4787598-14.5146484,32.5171509
			C465.2806396,363.5,454.1517334,405.4498901,448.3883667,448.3883667
			C405.4498901,454.1517334,363.5,465.2806396,323.0449219,481.6855469
			c-11.0383911,4.4762573-21.87677,9.3222046-32.5171509,14.5146484
			C313.8638916,453.1589355,343.3285522,413.7374878,378.5332031,378.5332031z
			M961.7070312,1028.8945312 c-66.3632812,0-131.0527344-12.5869141-192.2724609-37.4121094
			c-63.3793945-25.7021484-120.246582-63.4648438-169.0219727-112.2402344
			c-48.7758789-48.7753906-86.5385742-105.6435547-112.2402344-169.0229492
			C463.347168,649,450.7597656,584.3105469,450.7597656,517.9477539c0-21.2940063,1.3031616-42.4144287,3.8835449-63.3044434
			c20.8900146-2.5803833,42.010437-3.8835449,63.3044434-3.8835449c66.362793,0,131.0522461,12.5874023,192.2714844,37.4125977
			c63.3793945,25.7016602,120.2475586,63.4643555,169.0229492,112.2402344
			c48.7753906,48.7753906,86.5380859,105.6425781,112.2402344,169.0219727
			c24.8251953,61.2197266,37.4121094,125.9091797,37.4121094,192.2724609c0,21.2937622-1.3031006,42.4140625-3.8834229,63.3040771
			C1004.1210938,1027.5914307,983.0007935,1028.8945312,961.7070312,1028.8945312z
			M1024.0715332,1032.184082 c-5.7547607,41.7120361-16.6425171,82.4702148-32.5891113,121.7944336
			c-5.6369019,13.9001465-11.8544312,27.4868164-18.6405029,40.7438965
			c-13.2565918,6.7857666-26.8427124,13.0031738-40.7423096,18.6398926
			c-61.2197266,24.8251953-125.9091797,37.4121094-192.2724609,37.4121094
			c-66.362793,0-131.0522461-12.5869141-192.2714844-37.4121094
			c-63.3798828-25.7021484-120.2470703-63.4648438-169.0224609-112.2402344
			c-48.7758789-48.7753906-86.5390625-105.6435547-112.2402344-169.0224609
			c-24.8256836-61.2197266-37.4130859-125.9091797-37.4130859-192.2724609c0-66.362793,12.5874023-131.0522461,37.4130859-192.2714844
			c5.6365967-13.9000854,11.8540649-27.4865723,18.6399536-40.7435303
			c13.2567139-6.7857666,26.8430176-13.0031128,40.7428589-18.6397705
			c39.3244629-15.9465942,80.0824585-26.8345947,121.7946167-32.5894165
			c-2.4696045,20.586853-3.7106323,41.3934326-3.7106323,62.3648071c0,67.2685547,12.7602539,132.8432617,37.9257812,194.9023438
			C507.7412109,777.1025391,546.0209961,834.75,595.4624023,884.1914062
			c49.4418945,49.4414062,107.0893555,87.7216797,171.3422852,113.7773438
			c62.0585938,25.1660156,127.6337891,37.9257812,194.9023438,37.9257812
			C982.6782837,1035.8945312,1003.4847412,1034.6535645,1024.0715332,1032.184082z
			M997.96875,766.8046875 c-26.0556641-64.2529297-64.3359375-121.9003906-113.7773438-171.3422852
			C834.75,546.0209961,777.1025391,507.7412109,712.8500977,481.6855469
			c-62.059082-25.1655273-127.6337891-37.9257812-194.9023438-37.9257812c-20.9713745,0-41.7779541,1.2410278-62.3648071,3.7106323
			c5.7548218-41.7121582,16.6428223-82.4701538,32.5894165-121.7946167
			c5.6366577-13.8998413,11.8540039-27.486145,18.6397705-40.7428589
			c13.256958-6.7858887,26.8434448-13.0033569,40.7435303-18.6399536
			c61.2192383-24.8256836,125.9086914-37.4130859,192.2714844-37.4130859c66.3632812,0,131.0527344,12.5874023,192.2724609,37.4130859
			c63.3789062,25.7011719,120.2470703,63.4643555,169.0224609,112.2402344
			c48.7753906,48.7753906,86.5380859,105.6425781,112.2402344,169.0224609
			c24.8251953,61.2192383,37.4121094,125.9086914,37.4121094,192.2714844c0,66.3632812-12.5869141,131.0527344-37.4121094,192.2724609
			c-5.6367188,13.8995972-11.854126,27.4857178-18.6398926,40.7423096
			c-13.2570801,6.7860718-26.84375,13.0036011-40.7438965,18.6405029
			c-39.3242188,15.9465942-80.0823975,26.8343506-121.7944336,32.5891113
			c2.4694824-20.586792,3.7104492-41.3932495,3.7104492-62.364502
			C1035.8945312,894.4384766,1023.1347656,828.8632812,997.96875,766.8046875z
			M879.2421875,1323.0009766
			c-48.7753906,48.7753906-105.6435547,86.5380859-169.0229492,112.2402344
			C649,1460.0664062,584.3105469,1472.6533203,517.9477539,1472.6533203c-66.3632812,0-131.0527344-12.5869141-192.2719727-37.4121094
			c-63.3798828-25.7021484-120.2470703-63.4648438-169.0224609-112.2402344
			c-48.7758789-48.7753906-86.5390625-105.6425781-112.2402344-169.0224609C19.5874023,1092.7597656,7,1028.0693359,7,961.7070312
			C7,895.34375,19.5874023,830.6542969,44.4130859,769.4345703c25.7011719-63.3793945,63.4643555-120.246582,112.2402344-169.0219727
			c35.2044678-35.204834,74.6260986-64.6693726,117.6676025-88.0056152
			c-5.1925659,10.640625-10.0384521,21.479248-14.5147705,32.5178223
			c-25.1660156,62.059082-37.9262695,127.6337891-37.9262695,194.9023438s12.7602539,132.84375,37.9262695,194.9023438
			c26.0551758,64.2529297,64.3354492,121.9003906,113.7773438,171.3417969
			c49.4414062,49.4414062,107.0888672,87.7216797,171.3413086,113.7773438
			c62.059082,25.1660156,127.6337891,37.9257812,194.9023438,37.9257812s132.84375-12.7597656,194.9023438-37.9257812
			c11.0385742-4.4763184,21.8771973-9.3222656,32.5177612-14.5148926
			C943.9108887,1248.3751221,914.4465332,1287.7966309,879.2421875,1323.0009766z
			M1101.1220703,1101.1220703
			c-35.2045898,35.2045898-74.6269531,64.6691895-117.6687012,88.0056152
			c5.192749-10.6407471,10.0388794-21.4794922,14.5153809-32.5183105
			c16.4052734-40.4553223,27.5339355-82.4051514,33.2973633-125.3432617
			c42.9381104-5.7634277,84.8879395-16.8920898,125.3432617-33.2973633
			c11.0388184-4.4765015,21.8775635-9.3226318,32.5183105-14.5153809
			C1165.7912598,1026.4951172,1136.3266602,1065.9174805,1101.1220703,1101.1220703z
			M1435.2412109,710.2192383
			c-25.7021484,63.3793945-63.4648438,120.2475586-112.2402344,169.0229492
			c-35.2043457,35.2043457-74.6258545,64.6687012-117.6672363,88.0050659
			c5.192627-10.640564,10.0385742-21.479187,14.5148926-32.5177612
			c25.1660156-62.0585938,37.9257812-127.6337891,37.9257812-194.9023438s-12.7597656-132.8432617-37.9257812-194.9023438
			c-26.0556641-64.2524414-64.3359375-121.8999023-113.7773438-171.3413086
			c-49.4414062-49.4418945-107.0888672-87.722168-171.3417969-113.7773438
			c-62.0585938-25.1660156-127.6337891-37.9262695-194.9023438-37.9262695s-132.8432617,12.7602539-194.9023438,37.9262695
			c-11.0385742,4.4763184-21.8771973,9.3222046-32.5178223,14.5147705
			c23.3362427-43.0415039,52.8007812-82.4631348,88.0056152-117.6676025
			c48.7753906-48.7758789,105.6425781-86.5390625,169.0219727-112.2402344C830.6542969,19.5874023,895.34375,7,961.7070312,7
			c66.3623047,0,131.0527344,12.5874023,192.2714844,37.4130859
			c63.3798828,25.7011719,120.2470703,63.4643555,169.0224609,112.2402344
			c48.7753906,48.7753906,86.5380859,105.6425781,112.2402344,169.0224609
			c24.8251953,61.2192383,37.4121094,125.9086914,37.4121094,192.2719727
			C1472.6533203,584.3105469,1460.0664062,649,1435.2412109,710.2192383z"></path></svg>`;
  pop();
}
function Wedo($$payload, $$props) {
  push();
  $$payload.out += `<section id="services"><div class="wrapper py-12 md:py-16 flex flex-col gap-12 px-4"><div class="flex justify-center flex-col items-center w-full"><!--[-->`;
  Logo($$payload);
  $$payload.out += `<!--]--></div> <div class="flex flex-col md:flex-row items-center justify-between"><div class="flex flex-col gap-8"><h3 class="font-yoga text-3xl md:text-6xl">What we do?</h3> <p class="font-comsans text-xl">Elevate your brand and make your mark in history</p></div> <div class="w-full sm:w-1/2 flex justify-center"><div class="w-32 md:w-64 h-24 md:ml-52 mt-4 md:mt-0"><!--[-->`;
  Circle($$payload);
  $$payload.out += `<!--]--></div></div></div> <div><h3 class="text-2xl md:text-5xl font-yoga text-[#ff6c89] max-w-[600px] text-wrap py-4 md:py-12 md:leading-[60px]">We design, develope, and promote shopify stores.</h3></div> <div class="flex flex-wrap justify-center lg:justify-between gap-8"><div class="w-full sm:w-[45%] md:w-[31%]"><span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">Brand Identity \u2192</span></div> <div class="w-full sm:w-[45%] md:w-[31%]"><span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">Brand Activation \u2192</span></div> <div class="w-full sm:w-[45%] md:w-[31%]"><span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">Website Development \u2192</span></div> <div class="w-full sm:w-[45%] md:w-[31%]"><span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">Brand strategy \u2192</span></div> <div class="w-full sm:w-[45%] md:w-[31%]"><span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">Video Production \u2192</span></div> <div class="w-full sm:w-[45%] md:w-[31%]"><span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">Integrated Marketing \u2192</span></div></div> <div class="bg-[#43302A] md:mt-8 py-24 flex flex-col md:flex-row gap-2 items-center md:mb-12"><div class="w-full md:w-1/2"><span class="w-2/3 block max-w-[500px] border-t-2 border-white border-spacing-3 px-4 md:px-16"></span> <h3 class="w-full font-yoga text-2xl md:text-3xl pt-5 max-w-[800px] text-gray-200 px-4 md:px-16">Design meets technology at MainBlocs , where our experienced team helps you create a
					successful Shopify ecommerce store</h3></div> <div class="w-full md:w-1/2 p-4"><img src="s2.webp" alt="Shopify" class="w-full md:w-[80%] aspect-square object-cover object-center rounded-xl"></div></div></div></section>`;
  pop();
}
var init_Wedo = __esm({
  ".svelte-kit/output/server/chunks/Wedo.js"() {
    init_chunks();
    init_logo();
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => _page
});
function Contact($$payload, $$props) {
  push();
  $$payload.out += `<div class="mx-auto max-w-5xl px-6 lg:px-12 mt-24 sm:mt-32 lg:mt-40 mb-24"><div class="md:rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-16 rounded-3xl" style="opacity: 1; transform: none;"><div class="mx-auto max-w-4xl"><div class="max-w-xl"><h2 class="font-yoga text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">Tell us about your project</h2> <div class="mt-12 flex"><a class="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition bg-white text-neutral-950 hover:bg-neutral-200" href="/contact"><span class="relative py-2 px-8">Say Hi</span></a></div> <div class="mt-10 border-t border-white/10 pt-10"><h3 class="font-display text-base font-semibold text-white">Our offices</h3> <ul role="list" class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"><li><address class="text-sm not-italic text-neutral-300"><strong class="text-white">Los Angeles</strong> <br> Santa Monica Blvd <br> California, USA</address></li></ul></div></div></div></div></div>`;
  pop();
}
function Clients($$payload, $$props) {
  push();
  $$payload.out += `<section class="bg-grey py-16"><div class="wrapper px-2"><h2 class="text-4xl font-bold pb-24 font-yoga lg:text-5xl">Our Clients</h2> <div class="flex flex-wrap gap-12 clientContainer justify-center items-center mx-auto"><div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/phases.png" alt="Phases"></div> <div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/chapter.png" alt="Phases"></div> <div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/crowd.png" alt="Phases"></div> <div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/curaaid.png" alt="Phases"></div> <div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/memento.png" alt="Phases"></div> <div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/schematiq.png" alt="Phases"></div> <div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/spring.png" alt="Phases"></div> <div class="flex flex-col justify-center items-center w-full sm:w-2/3 h-[150px] md:h-auto md:w-[275px]"><img src="/wilderness.png" alt="Phases"></div></div></div></section>`;
  pop();
}
function WorksHero($$payload, $$props) {
  push();
  $$payload.out += `<div class="flex flex-col justify-center items-center md:flex-row flex-wrap gap-6 mt-24"><div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[300px] min-w-[300px] max-h-[300px] svelte-16x40xd ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img class="w-full h-full object-cover rounded-lg svelte-16x40xd" src="/head.webp" alt="Lamp on White Background" loading="lazy"> <div class="hover-image flex flex-col gap-4 svelte-16x40xd"><img alt="Lamp on White Background" class="w-full h-full object-cover rounded-lg svelte-16x40xd" src="/chicago.webp" loading="lazy"> <div class="w-full bg-gray-200 absolute bottom-0 right-0 p-4"><a href="#" class="text-black w-full bg-gray-200 flex gap-3 items-center"><span class="text-nowrap">View Casestudy</span> <!--[-->`;
  Open($$payload);
  $$payload.out += `<!--]--></a></div></div></div> <div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[300px] min-w-[300px] max-h-[300px] svelte-16x40xd ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img alt="Lamp on White Background" class="w-full h-full object-cover rounded-lg svelte-16x40xd" src="/chicago.webp" loading="lazy"> <img class="w-full h-full object-cover rounded-lg hover-image svelte-16x40xd" src="/head.webp" alt="Lamp on White Background" loading="lazy"></div> <div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[300px] min-w-[300px] max-h-[300px] svelte-16x40xd ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img src="/indie.webp" class="w-full h-full object-cover rounded-lg svelte-16x40xd" alt="Macbook Mockup on White Table" loading="lazy"> <img class="w-full h-full object-cover rounded-lg hover-image svelte-16x40xd" src="/head.webp" alt="Lamp on White Background" loading="lazy"></div> <div${attr(
    "class",
    `image-container z-[100] w-[22%] h-[300px] min-w-[300px] max-h-[300px] svelte-16x40xd ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}><img alt="Lamp on White Background" class="w-full h-full object-cover rounded-lg svelte-16x40xd" src="/superstore.webp" loading="lazy"> <img class="w-full h-full object-cover rounded-lg hover-image svelte-16x40xd" src="/head.webp" alt="Lamp on White Background" loading="lazy"></div></div>`;
  pop();
}
function Arrow($$payload, $$props) {
  push();
  $$payload.out += `<svg class="rotate-90 w-full h-full font-bold" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" height="474.1" preserveAspectRatio="xMidYMid meet" version="1" viewBox="0.0 0.0 143.9 474.1" width="143.9" zoomAndPan="magnify"><g id="change1_1"><path d="M143.9004,66.6838v8.2128c-14.3914,0-47.0732-5.4281-67.8438-50.7603v449.9972h-8.2128V24.1356
			C47.0717,69.4685,14.3899,74.8966,0,74.8966v-8.2128c14.5849,0,50.4076-6.4974,68.0082-66.6838h7.884
			C93.4907,60.1864,129.3154,66.6838,143.9004,66.6838z"></path></g></svg>`;
  pop();
}
function Hero($$payload, $$props) {
  push();
  $$payload.out += `<section class="bg-bgprimary text-white hero py-12 sm:py-24 z-50 section min-h-screen"><div class="wrapper px-4"><div class="py-32"><div class="flex flex-col gap-16 md:flex-row md:gap-8"><div class="relative w-full md:w-2/3 homepage__intro svelte-fpk36c"><h3 class="leading-[.9971em] tracking-[-0.01em] font-[yoga] text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-bold w-full md:max-w-[400px] text-wrap scrolling-title title-huge title-houses svelte-fpk36c">Design the \u200Bfuture</h3> <div class="hidden md:block"><div class="absolute top-0 z-50 right-[70px] w-[20%] h-[100px] font-bold"><div class="animation_container w-full h-full"><div class="w-[250px] h-[100px] overflow-hidden relative"><!--[-->`;
  Arrow($$payload);
  $$payload.out += `<!--]--></div></div></div></div></div> <div class="w-2/3 md:w-1/3"><a class="font-[yoga]" href="/contact"><h3 class="text-md md:text-2xl font-bold rounded-full border-spacing-1 border-2 border-white p-4 md:p-6 lg:py-8 lg:px-8 xl:py-8 xl:px-12">Work with us</h3></a></div></div> <!--[-->`;
  WorksHero($$payload);
  $$payload.out += `<!--]--></div></div></section>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  const prerender = true;
  $$payload.out += `<!--[-->`;
  Hero($$payload);
  $$payload.out += `<!--]--> <!--[-->`;
  Wedo($$payload);
  $$payload.out += `<!--]--> <!--[-->`;
  Clients($$payload);
  $$payload.out += `<!--]--> <!--[-->`;
  Contact($$payload);
  $$payload.out += `<!--]-->`;
  bind_props($$props, { prerender });
  pop();
}
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_chunks();
    init_open();
    init_Wedo();
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports3 = ["_app/immutable/nodes/2.DNmGQWCT.js", "_app/immutable/chunks/disclose-version.BD2IXOaX.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/open.DMfvnW-Y.js", "_app/immutable/chunks/lifecycle.DBI0busB.js", "_app/immutable/chunks/utils.BSJX-nVd.js", "_app/immutable/chunks/render.CR8dV1-2.js", "_app/immutable/chunks/class.CAljAydP.js", "_app/immutable/chunks/proxy.B9TrOHuA.js", "_app/immutable/chunks/Wedo.Dy_XDdhB.js", "_app/immutable/chunks/logo.Bo_vi5yG.js"];
    stylesheets3 = ["_app/immutable/assets/2.CMvT-Nh1.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/about/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => _page2
});
function Culture($$payload, $$props) {
  push();
  $$payload.out += `<div class="max-w-2xl lg:max-w-none flex flex-col gap-12 py-12 text-white font-comsans"><div class="max-w-2xl" style="opacity: 1; transform: none;"><h2><span class="mb-6 block font-display text-base font-semibold">Our culture</span> <span class="sr-only">-</span> <span class="block font-display tracking-tight [text-wrap:balance] text-4xl font-medium sm:text-5xl">Unifying Passion with Purpose</span></h2> <div class="mt-6 text-xl text-white"><p>MainBlocs is not just a workplace; it's a community bound by core values
        that influence every decision we make.</p></div></div> <ul role="list" class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"><li class="text-base before:bg-white after:bg-white"><div style="opacity: 1; transform: none;"><div class="relative before:absolute after:absolute after:bg-white before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px p-8"><strong class="font-semibold text-white">Loyalty.</strong> Our enduring loyalty reflects the nurturing environment we've created.
          Since our beginnings, mutual support has been a cornerstone, resulting
          in a team deeply committed to our shared mission.</div></div></li> <li class="text-base before:bg-white after:bg-white"><div style="opacity: 1; transform: none;"><div class="relative before:absolute after:absolute after:bg-white before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px p-8"><strong class="font-semibold">Trust.</strong> We empower each MainBlocs member with the autonomy they need,
          confident in their capacity to manage their responsibilities. With our
          emphasis on flexible scheduling, we foster a culture where trust and
          responsibility are paramount.</div></div></li> <li class="text-base after:bg-white"><div style="opacity: 1; transform: none;"><div class="relative before:absolute after:absolute after:bg-white before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px p-8"><strong class="font-semibold">Compassion.</strong> We acknowledge the lives our team members lead beyond the office. We
          champion a culture of understanding, ensuring that every individual
          feels valued and supported, both in and out of their professional
          roles.</div></div></li></ul></div>`;
  pop();
}
function WorkIntro($$payload, $$props) {
  push();
  $$payload.out += `<div class="max-w-2xl lg:max-w-none flex flex-col gap-12"><div style="opacity: 1; transform: none;"><h1><span class="block font-display text-base font-semibold text-white font-comsans">About us</span> <span class="sr-only">-</span> <span class="mt-6 block max-w-5xl font-display text-3xl font-medium tracking-tight text-white font-yoga py-8 [text-wrap:balance] sm:text-6xl">Our strength is collaboration</span></h1> <div class="mt-6 max-w-3xl text-xl text-white font-eb"><p>At MainBlocs, collaboration is at our core. We value meaningful
        partnerships and always put our clients' needs at the forefront.</p> <div class="mt-4 max-w-2xl space-y-6 text-base"><p>Founded with a vision to redefine the industry norms, MainBlocs has
          consistently prioritized excellence and innovation in our services.</p> <p>Here at MainBlocs, our team members are more than just colleagues;
          they're an integral part of our community. We uphold a culture of
          mutual respect, valuing each individual's unique contributions and
          fostering an environment for growth and balance.</p></div></div></div> <dl class="flex w-full flex-wrap gap-8"><div class="flex flex-col-reverse pl-8 relative before:absolute after:absolute before:bg-white after:bg-neutral-950/10 before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px" style="opacity: 1; transform: none;"><dt class="mt-2 text-base text-white">Employees</dt> <dd class="font-display text-3xl font-semibold text-white sm:text-4xl">10</dd></div> <div class="flex flex-col-reverse pl-8 relative before:absolute after:absolute before:bg-white after:bg-neutral-950/10 before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px" style="opacity: 1; transform: none;"><dt class="mt-2 text-base text-white border-gray-400 broder-2">Current and Past Clients</dt> <dd class="font-display text-3xl font-semibold text-white sm:text-4xl">50 ></dd></div> <div class="flex flex-col-reverse pl-8 relative before:absolute after:absolute before:bg-white after:bg-neutral-950/10 before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px" style="opacity: 1; transform: none;"><dt class="mt-2 text-base text-white border-gray-400 broder-2">Revenue Generated for Client</dt> <dd class="font-display text-3xl font-semibold text-white sm:text-4xl">$25M ></dd></div></dl></div>`;
  pop();
}
function _page2($$payload, $$props) {
  push();
  $$payload.out += `<section class="bg-bgprimary" id="services"><div class="wrapper py-12 md:py-48 flex flex-col gap-12 px-4"><!--[-->`;
  WorkIntro($$payload);
  $$payload.out += `<!--]--> <!--[-->`;
  Culture($$payload);
  $$payload.out += `<!--]--></div></section>`;
  pop();
}
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/about/_page.svelte.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    imports4 = ["_app/immutable/nodes/3.CeEeuzgb.js", "_app/immutable/chunks/disclose-version.BD2IXOaX.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/lifecycle.DBI0busB.js", "_app/immutable/chunks/utils.BSJX-nVd.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/contact/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => _page3
});
function _page3($$payload, $$props) {
  push();
  let data = {
    name: {
      value: "",
      error: false,
      errorMessage: "plese enter your name"
    },
    email: {
      value: "",
      error: false,
      errorMessage: "plese enter your email"
    },
    company: {
      value: "",
      error: false,
      errorMessage: "plese enter your company name"
    },
    phone: {
      value: "",
      error: false,
      errorMessage: "plese enter your phone number"
    },
    message: {
      value: "",
      error: false,
      errorMessage: "plese enter your message"
    },
    budget: {
      value: "",
      error: false,
      errorMessage: "plese enter your budget"
    }
  };
  $$payload.out += `<section class="bg-bgprimary py-32 mt-[70px] text-white"><div class="wrapper px-4"><div class="mx-auto max-w-2xl lg:max-w-none"><div><h1><span class="block text-base">Contact us</span> <span class="sr-only">-</span> <span class="py-12 block text-3xl font-medium sm:text-5xl font-yoga max-w-[500px] leading-[70px]">Let\u2019s work together</span></h1> <div class="mt-6 max-w-3xl text-xl font-comsans"><p>We can\u2019t wait to hear from you.</p></div></div></div> <div class="mx-auto max-w-2xl lg:max-w-none font-comsans"><div class="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2"><div class="lg:order-last"><form><h2 class="text-base font-semibold">Work inquiries</h2> <div class="isolate mt-6 -space-y-px rounded-2xl bg-white text-black py-12 px-4 md:py-24 md:px-12"><div class="group relative z-0 transition-all focus-within:z-10"><input type="text" id=":r5:" name="name" autocomplete="name"${attr("value", data.name.value, false)} class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"> <label for=":r5:" class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus: peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:">Name</label></div> <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <div class="group relative z-0 transition-all focus-within:z-10"><input type="email" id=":r6:" name="email" autocomplete="email" placeholder=""${attr("value", data.email.value, false)} class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"> <label for=":r6:" class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus: peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:">Email</label></div> <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <div class="group relative z-0 transition-all focus-within:z-10"><input type="text" id=":r7:" name="company" autocomplete="organization" placeholder=""${attr("value", data.company.value, false)} class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"> <label for=":r7:" class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus: peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:">Company</label></div> <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <div class="group relative z-0 transition-all focus-within:z-10"><input type="tel" id=":r8:" name="phone" autocomplete="tel" placeholder=""${attr("value", data.phone.value, false)} class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"> <label for=":r8:" class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus: peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:">Phone</label></div> <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <div class="group relative z-0 transition-all focus-within:z-10"><input type="text" id=":r9:" name="message" placeholder=""${attr("value", data.message.value, false)} class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"> <label for=":r9:" class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus: peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:">Message</label></div> <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <div class="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl"><fieldset><legend class="text-base/6 text-neutral-500">Budget</legend> <div class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"><label class="flex gap-x-3"><input type="radio" name="budget" class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2" value="50"> <h3 class="text-base/6">$1K \u2013 $5K</h3></label> <label class="flex gap-x-3"><input type="radio" name="budget" class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2" value="75"> <h3 class="text-base/6">$5K \u2013 $10K</h3></label> <label class="flex gap-x-3"><input type="radio" name="budget" class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2" value="100"> <h3 class="text-base/6">$10K \u2013 $15K</h3></label> <label class="flex gap-x-3"><input type="radio" name="budget" class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2" value="150"> <h3 class="text-base/6">More than $15K</h3></label></div></fieldset></div> <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</div> <button class="text-md md:text-xl font-bold rounded-full border-spacing-1 border-2 border-white p-4 md:p-6 lg:px-8 lg:py-4 xl:px-12 max-w-[350px] text-center mt-12 hover:opacity-60"><span class="relative py-2 px-8">Let\u2019s work together</span></button></form></div> <div class="max-w-[500px] font-comsans"><h2 class="text-base font-semibold mt-8">Our offices</h2> <p class="mt-6 text-base">Prefer doing things in person? We don\u2019t but we have to list our
          addresses here for legal reasons.</p> <ul role="list" class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"><li><address class="text-sm not-italic"><strong>Los Angeles</strong> <br> Santa Monica Blvd <br> California, USA</address></li></ul> <div class="mt-16 pt-16 relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px"><h2 class="text-base font-semibold">Email us</h2> <dl class="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2"><div><dt class="font-semibold">Careers</dt> <dd><a class="hover:" href="mailto:careers@mainblocs.com">careers@mainblocs.com</a></dd></div> <div><dt class="font-semibold">Contact</dt> <dd><a class="hover:" href="mailto:support@mainblocs.com">support@mainblocs.com</a></dd></div></dl></div></div></div></div></div></section>`;
  pop();
}
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/contact/_page.svelte.js"() {
    init_chunks();
    init_client();
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    imports5 = ["_app/immutable/nodes/4.BdF4lkly.js", "_app/immutable/chunks/disclose-version.BD2IXOaX.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/render.CR8dV1-2.js", "_app/immutable/chunks/if.Rq_8K8pM.js", "_app/immutable/chunks/attributes.DFpEsyqO.js", "_app/immutable/chunks/class.CAljAydP.js", "_app/immutable/chunks/modalstore.svelte.B0ZaCesU.js", "_app/immutable/chunks/proxy.B9TrOHuA.js", "_app/immutable/chunks/entry.BN9CiMvb.js", "_app/immutable/chunks/index-client.DT8scQk1.js", "_app/immutable/chunks/utils.BSJX-nVd.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/services/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => _page4
});
function _page4($$payload, $$props) {
  push();
  $$payload.out += `<!--[-->`;
  Wedo($$payload);
  $$payload.out += `<!--]-->`;
  pop();
}
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/services/_page.svelte.js"() {
    init_chunks();
    init_Wedo();
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index6 = 6;
    component6 = async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    imports6 = ["_app/immutable/nodes/6.C3ftaEFl.js", "_app/immutable/chunks/disclose-version.BD2IXOaX.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/lifecycle.DBI0busB.js", "_app/immutable/chunks/utils.BSJX-nVd.js", "_app/immutable/chunks/Wedo.Dy_XDdhB.js", "_app/immutable/chunks/class.CAljAydP.js", "_app/immutable/chunks/logo.Bo_vi5yG.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js
var require_other = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js
var require_mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class _KVError extends Error {
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = _KVError.name;
        this.status = status;
      }
    };
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    exports.InternalError = InternalError;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = require_mime();
    var types_1 = require_types();
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
      return types_1.MethodNotAllowedError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return types_1.NotFoundError;
    } });
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
      return types_1.InternalError;
    } });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      bypassCache: false
      // do not bypass Cloudflare's cache
    };
    var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : void 0,
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html"
    };
    function assignOptions(options2) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options2);
    }
    var mapRequestToAsset2 = (request, options2) => {
      options2 = assignOptions(options2);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options2.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options2.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    };
    exports.mapRequestToAsset = mapRequestToAsset2;
    function serveSinglePageApp(request, options2) {
      options2 = assignOptions(options2);
      request = mapRequestToAsset2(request, options2);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options2.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = (event, options2) => __awaiter(void 0, void 0, void 0, function* () {
      options2 = assignOptions(options2);
      const request = event.request;
      const ASSET_NAMESPACE = options2.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options2.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = false;
      let requestKey;
      if (options2.mapRequestToAsset) {
        requestKey = options2.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset2(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset2(request, options2);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"];
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options2.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey]) {
          pathKey = ASSET_MANIFEST[pathKey];
          shouldEdgeCache = true;
        }
      }
      let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options2.cacheControl) {
          case "function":
            return options2.cacheControl(request);
          case "object":
            return options2.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = (entityId = pathKey, validatorType = "strong") => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              return `W/${entityId}`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      };
      options2.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options2.cacheControl.bypassCache || options2.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options2.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = yield cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
            console.log("Body exists and environment supports readable streams. Body cancelled");
          } else {
            console.log("Environment doesnt support readable streams");
          }
          response = new Response(null, response);
        } else {
          let opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body2 = yield ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body2 === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body2);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", body2.length);
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey, "strong"));
          }
          response.headers.set("Cache-Control", `max-age=${options2.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        let etag2 = formatETag(response.headers.get("etag"), "strong");
        let ifNoneMatch = cacheKey.headers.get("if-none-match");
        let proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag2) {
          if (ifNoneMatch && ifNoneMatch === etag2 && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag2, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options2.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    });
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_chunks();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
var is_array = Array.isArray;
var array_from = Array.from;
var is_frozen = Object.isFrozen;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var DERIVED = 1 << 1;
var EFFECT = 1 << 2;
var RENDER_EFFECT = 1 << 3;
var BLOCK_EFFECT = 1 << 4;
var BRANCH_EFFECT = 1 << 5;
var ROOT_EFFECT = 1 << 6;
var UNOWNED = 1 << 7;
var CLEAN = 1 << 8;
var DIRTY = 1 << 9;
var MAYBE_DIRTY = 1 << 10;
var INERT = 1 << 11;
var DESTROYED = 1 << 12;
var EFFECT_RAN = 1 << 14;
var STATE_SYMBOL = Symbol("$state");
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
// @__NO_SIDE_EFFECTS__
function source(value) {
  const source2 = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    reactions: null,
    equals,
    v: value,
    version: 0
  };
  return source2;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value) {
  const s2 = /* @__PURE__ */ source(initial_value);
  s2.equals = safe_equals;
  if (current_component_context) {
    (current_component_context.d ??= []).push(s2);
  }
  return s2;
}
function set(signal, value) {
  var initialized = signal.v !== UNINITIALIZED;
  if (!current_untracking && initialized && current_reaction !== null && is_runes() && (current_reaction.f & DERIVED) !== 0) {
    throw new Error(
      "ERR_SVELTE_UNSAFE_MUTATION"
    );
  }
  if (!signal.equals(value)) {
    signal.v = value;
    signal.version++;
    if (is_runes() && initialized && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0) {
      if (current_dependencies !== null && current_dependencies.includes(signal)) {
        set_signal_status(current_effect, DIRTY);
        schedule_effect(current_effect);
      } else {
        if (current_untracked_writes === null) {
          set_current_untracked_writes([signal]);
        } else {
          current_untracked_writes.push(signal);
        }
      }
    }
    mark_reactions(signal, DIRTY, true);
  }
  return value;
}
function remove(current) {
  if (is_array(current)) {
    for (var i = 0; i < current.length; i++) {
      var node = current[i];
      if (node.isConnected) {
        node.remove();
      }
    }
  } else if (current.isConnected) {
    current.remove();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn, sync) {
  var is_root = (type & ROOT_EFFECT) !== 0;
  var effect2 = {
    ctx: current_component_context,
    deps: null,
    dom: null,
    f: type | DIRTY,
    first: null,
    fn,
    last: null,
    next: null,
    parent: is_root ? null : current_effect,
    prev: null,
    teardown: null,
    transitions: null
  };
  if (current_reaction !== null && !is_root) {
    push_effect(effect2, current_reaction);
  }
  if (sync) {
    var previously_flushing_effect = is_flushing_effect;
    try {
      set_is_flushing_effect(true);
      execute_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } finally {
      set_is_flushing_effect(previously_flushing_effect);
    }
  } else {
    schedule_effect(effect2);
  }
  return effect2;
}
function effect_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
  return () => {
    destroy_effect(effect2);
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
function branch(fn) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true);
}
function destroy_effect(effect2) {
  var dom = effect2.dom;
  if (dom !== null) {
    remove(dom);
  }
  destroy_effect_children(effect2);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  if (effect2.transitions) {
    for (const transition of effect2.transitions) {
      transition.stop();
    }
  }
  effect2.teardown?.call(null);
  var parent = effect2.parent;
  if (parent !== null && (effect2.f & BRANCH_EFFECT) !== 0 && parent.first !== null) {
    var previous = effect2.prev;
    var next = effect2.next;
    if (previous !== null) {
      if (next !== null) {
        previous.next = next;
        next.prev = previous;
      } else {
        previous.next = null;
        parent.last = previous;
      }
    } else if (next !== null) {
      next.prev = null;
      parent.first = next;
    } else {
      parent.first = null;
      parent.last = null;
    }
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.dom = effect2.deps = effect2.parent = // @ts-expect-error
  effect2.fn = null;
}
function flush_tasks() {
}
function destroy_derived_children(signal) {
  destroy_effect_children(signal);
  var deriveds = signal.deriveds;
  if (deriveds !== null) {
    signal.deriveds = null;
    for (var i = 0; i < deriveds.length; i += 1) {
      destroy_derived(deriveds[i]);
    }
  }
}
function update_derived(derived, force_schedule) {
  destroy_derived_children(derived);
  var value = execute_reaction_fn(derived);
  var status = (current_skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(derived, status);
  if (!derived.equals(value)) {
    derived.v = value;
    mark_reactions(derived, DIRTY, force_schedule);
  }
}
function destroy_derived(signal) {
  destroy_derived_children(signal);
  remove_reactions(signal, 0);
  set_signal_status(signal, DESTROYED);
  signal.first = signal.last = signal.deps = signal.reactions = // @ts-expect-error `signal.fn` cannot be `null` while the signal is alive
  signal.fn = null;
}
var FLUSH_MICROTASK = 0;
var FLUSH_SYNC = 1;
var current_scheduler_mode = FLUSH_MICROTASK;
var is_micro_task_queued = false;
var is_flushing_effect = false;
function set_is_flushing_effect(value) {
  is_flushing_effect = value;
}
var current_queued_root_effects = [];
var flush_count = 0;
var current_reaction = null;
var current_effect = null;
var current_dependencies = null;
var current_dependencies_index = 0;
var current_untracked_writes = null;
function set_current_untracked_writes(value) {
  current_untracked_writes = value;
}
var current_untracking = false;
var current_skip_reaction = false;
var current_component_context = null;
function is_runes() {
  return current_component_context !== null && current_component_context.r;
}
function check_dirtiness(reaction) {
  var flags = reaction.f;
  if ((flags & DIRTY) !== 0) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    var is_unowned = (flags & UNOWNED) !== 0;
    if (dependencies !== null) {
      var length = dependencies.length;
      for (var i = 0; i < length; i++) {
        var dependency = dependencies[i];
        if (check_dirtiness(
          /** @type {import('#client').Derived} */
          dependency
        )) {
          update_derived(
            /** @type {import('#client').Derived} **/
            dependency,
            true
          );
          if ((reaction.f & DIRTY) !== 0) {
            return true;
          }
        }
        var version = dependency.version;
        if (is_unowned) {
          if (version > /** @type {import('#client').Derived} */
          reaction.version) {
            reaction.version = version;
            return true;
          } else if (!current_skip_reaction && !dependency?.reactions?.includes(reaction)) {
            var reactions = dependency.reactions;
            if (reactions === null) {
              dependency.reactions = [reaction];
            } else {
              reactions.push(reaction);
            }
          }
        }
      }
    }
    if (!is_unowned) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function execute_reaction_fn(signal) {
  const previous_dependencies = current_dependencies;
  const previous_dependencies_index = current_dependencies_index;
  const previous_untracked_writes = current_untracked_writes;
  const previous_reaction = current_reaction;
  const previous_skip_reaction = current_skip_reaction;
  const previous_untracking = current_untracking;
  current_dependencies = /** @type {null | import('./types.js').Value[]} */
  null;
  current_dependencies_index = 0;
  current_untracked_writes = null;
  current_reaction = signal;
  current_skip_reaction = !is_flushing_effect && (signal.f & UNOWNED) !== 0;
  current_untracking = false;
  try {
    let res = signal.fn();
    let dependencies = (
      /** @type {import('./types.js').Value<unknown>[]} **/
      signal.deps
    );
    if (current_dependencies !== null) {
      let i;
      if (dependencies !== null) {
        const deps_length = dependencies.length;
        const full_current_dependencies = current_dependencies_index === 0 ? current_dependencies : dependencies.slice(0, current_dependencies_index).concat(current_dependencies);
        const current_dep_length = full_current_dependencies.length;
        const full_current_dependencies_set = current_dep_length > 16 && deps_length - current_dependencies_index > 1 ? new Set(full_current_dependencies) : null;
        for (i = current_dependencies_index; i < deps_length; i++) {
          const dependency = dependencies[i];
          if (full_current_dependencies_set !== null ? !full_current_dependencies_set.has(dependency) : !full_current_dependencies.includes(dependency)) {
            remove_reaction(signal, dependency);
          }
        }
      }
      if (dependencies !== null && current_dependencies_index > 0) {
        dependencies.length = current_dependencies_index + current_dependencies.length;
        for (i = 0; i < current_dependencies.length; i++) {
          dependencies[current_dependencies_index + i] = current_dependencies[i];
        }
      } else {
        signal.deps = /** @type {import('./types.js').Value<V>[]} **/
        dependencies = current_dependencies;
      }
      if (!current_skip_reaction) {
        for (i = current_dependencies_index; i < dependencies.length; i++) {
          const dependency = dependencies[i];
          const reactions = dependency.reactions;
          if (reactions === null) {
            dependency.reactions = [signal];
          } else if (reactions[reactions.length - 1] !== signal) {
            reactions.push(signal);
          }
        }
      }
    } else if (dependencies !== null && current_dependencies_index < dependencies.length) {
      remove_reactions(signal, current_dependencies_index);
      dependencies.length = current_dependencies_index;
    }
    return res;
  } finally {
    current_dependencies = previous_dependencies;
    current_dependencies_index = previous_dependencies_index;
    current_untracked_writes = previous_untracked_writes;
    current_reaction = previous_reaction;
    current_skip_reaction = previous_skip_reaction;
    current_untracking = previous_untracking;
  }
}
function remove_reaction(signal, dependency) {
  const reactions = dependency.reactions;
  let reactions_length = 0;
  if (reactions !== null) {
    reactions_length = reactions.length - 1;
    const index7 = reactions.indexOf(signal);
    if (index7 !== -1) {
      if (reactions_length === 0) {
        dependency.reactions = null;
      } else {
        reactions[index7] = reactions[reactions_length];
        reactions.pop();
      }
    }
  }
  if (reactions_length === 0 && (dependency.f & UNOWNED) !== 0) {
    set_signal_status(dependency, DIRTY);
    remove_reactions(
      /** @type {import('./types.js').Derived} **/
      dependency,
      0
    );
  }
}
function remove_reactions(signal, start_index) {
  const dependencies = signal.deps;
  if (dependencies !== null) {
    const active_dependencies = start_index === 0 ? null : dependencies.slice(0, start_index);
    let i;
    for (i = start_index; i < dependencies.length; i++) {
      const dependency = dependencies[i];
      if (active_dependencies === null || !active_dependencies.includes(dependency)) {
        remove_reaction(signal, dependency);
      }
    }
  }
}
function destroy_effect_children(signal) {
  let effect2 = signal.first;
  signal.first = null;
  signal.last = null;
  var sibling;
  while (effect2 !== null) {
    sibling = effect2.next;
    destroy_effect(effect2);
    effect2 = sibling;
  }
}
function execute_effect(effect2) {
  var flags = effect2.f;
  if ((flags & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var component_context = effect2.ctx;
  var previous_effect = current_effect;
  var previous_component_context = current_component_context;
  current_effect = effect2;
  current_component_context = component_context;
  try {
    if ((flags & BLOCK_EFFECT) === 0) {
      destroy_effect_children(effect2);
    }
    effect2.teardown?.call(null);
    var teardown = execute_reaction_fn(effect2);
    effect2.teardown = typeof teardown === "function" ? teardown : null;
  } finally {
    current_effect = previous_effect;
    current_component_context = previous_component_context;
  }
}
function infinite_loop_guard() {
  if (flush_count > 1e3) {
    flush_count = 0;
    throw new Error(
      "ERR_SVELTE_TOO_MANY_UPDATES"
    );
  }
  flush_count++;
}
function flush_queued_root_effects(root_effects) {
  for (var i = 0; i < root_effects.length; i++) {
    var signal = root_effects[i];
    flush_nested_effects(signal, RENDER_EFFECT | EFFECT);
  }
}
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0)
    return;
  infinite_loop_guard();
  for (var i = 0; i < length; i++) {
    var effect2 = effects[i];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && check_dirtiness(effect2)) {
      execute_effect(effect2);
    }
  }
}
function process_microtask() {
  is_micro_task_queued = false;
  if (flush_count > 101) {
    return;
  }
  const previous_queued_root_effects = current_queued_root_effects;
  current_queued_root_effects = [];
  flush_queued_root_effects(previous_queued_root_effects);
  if (!is_micro_task_queued) {
    flush_count = 0;
  }
}
function schedule_effect(signal) {
  if (current_scheduler_mode === FLUSH_MICROTASK) {
    if (!is_micro_task_queued) {
      is_micro_task_queued = true;
      queueMicrotask(process_microtask);
    }
  }
  var effect2 = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags = effect2.f;
    if ((flags & BRANCH_EFFECT) !== 0) {
      if ((flags & CLEAN) === 0)
        return;
      set_signal_status(effect2, MAYBE_DIRTY);
    }
  }
  current_queued_root_effects.push(effect2);
}
function process_effects(effect2, filter_flags, shallow, collected_effects) {
  var current_effect2 = effect2.first;
  var effects = [];
  main_loop:
    while (current_effect2 !== null) {
      var flags = current_effect2.f;
      var is_active = (flags & (DESTROYED | INERT)) === 0;
      var is_branch = flags & BRANCH_EFFECT;
      var is_clean = (flags & CLEAN) !== 0;
      var child = current_effect2.first;
      if (is_active && (!is_branch || !is_clean)) {
        if (is_branch) {
          set_signal_status(current_effect2, CLEAN);
        }
        if ((flags & RENDER_EFFECT) !== 0) {
          if (is_branch) {
            if (!shallow && child !== null) {
              current_effect2 = child;
              continue;
            }
          } else {
            if (check_dirtiness(current_effect2)) {
              execute_effect(current_effect2);
              child = current_effect2.first;
            }
            if (!shallow && child !== null) {
              current_effect2 = child;
              continue;
            }
          }
        } else if ((flags & EFFECT) !== 0) {
          if (is_branch || is_clean) {
            if (!shallow && child !== null) {
              current_effect2 = child;
              continue;
            }
          } else {
            effects.push(current_effect2);
          }
        }
      }
      var sibling = current_effect2.next;
      if (sibling === null) {
        let parent = current_effect2.parent;
        while (parent !== null) {
          if (effect2 === parent) {
            break main_loop;
          }
          var parent_sibling = parent.next;
          if (parent_sibling !== null) {
            current_effect2 = parent_sibling;
            continue main_loop;
          }
          parent = parent.parent;
        }
      }
      current_effect2 = sibling;
    }
  if (effects.length > 0) {
    if ((filter_flags & EFFECT) !== 0) {
      collected_effects.push(...effects);
    }
    if (!shallow) {
      for (var i = 0; i < effects.length; i++) {
        process_effects(effects[i], filter_flags, false, collected_effects);
      }
    }
  }
}
function flush_nested_effects(effect2, filter_flags, shallow = false) {
  var collected_effects = [];
  var previously_flushing_effect = is_flushing_effect;
  is_flushing_effect = true;
  try {
    if (effect2.first === null && (effect2.f & BRANCH_EFFECT) === 0) {
      flush_queued_effects([effect2]);
    } else {
      process_effects(effect2, filter_flags, shallow, collected_effects);
      flush_queued_effects(collected_effects);
    }
  } finally {
    is_flushing_effect = previously_flushing_effect;
  }
}
function flush_sync(fn, flush_previous = true) {
  var previous_scheduler_mode = current_scheduler_mode;
  var previous_queued_root_effects = current_queued_root_effects;
  try {
    infinite_loop_guard();
    const root_effects = [];
    current_scheduler_mode = FLUSH_SYNC;
    current_queued_root_effects = root_effects;
    if (flush_previous) {
      flush_queued_root_effects(previous_queued_root_effects);
    }
    var result = fn?.();
    if (current_queued_root_effects.length > 0 || root_effects.length > 0) {
      flush_sync();
    }
    flush_tasks();
    flush_count = 0;
    return result;
  } finally {
    current_scheduler_mode = previous_scheduler_mode;
    current_queued_root_effects = previous_queued_root_effects;
  }
}
function get(signal) {
  const flags = signal.f;
  if ((flags & DESTROYED) !== 0) {
    return signal.v;
  }
  if (current_reaction !== null && (current_reaction.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 && !current_untracking) {
    const unowned = (current_reaction.f & UNOWNED) !== 0;
    const dependencies = current_reaction.deps;
    if (current_dependencies === null && dependencies !== null && dependencies[current_dependencies_index] === signal && !(unowned && current_effect !== null)) {
      current_dependencies_index++;
    } else if (dependencies === null || current_dependencies_index === 0 || dependencies[current_dependencies_index - 1] !== signal) {
      if (current_dependencies === null) {
        current_dependencies = [signal];
      } else {
        current_dependencies.push(signal);
      }
    }
    if (current_untracked_writes !== null && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0 && current_untracked_writes.includes(signal)) {
      set_signal_status(current_effect, DIRTY);
      schedule_effect(current_effect);
    }
  }
  if ((flags & DERIVED) !== 0 && check_dirtiness(
    /** @type {import('#client').Derived} */
    signal
  )) {
    {
      update_derived(
        /** @type {import('./types.js').Derived} **/
        signal,
        false
      );
    }
  }
  return signal.v;
}
function mark_reactions(signal, to_status, force_schedule) {
  var reactions = signal.reactions;
  if (reactions === null)
    return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    if ((!force_schedule || !runes) && reaction === current_effect) {
      continue;
    }
    var flags = reaction.f;
    set_signal_status(reaction, to_status);
    var maybe_dirty = (flags & MAYBE_DIRTY) !== 0;
    var unowned = (flags & UNOWNED) !== 0;
    if ((flags & CLEAN) !== 0 || maybe_dirty && unowned) {
      if ((reaction.f & DERIVED) !== 0) {
        mark_reactions(
          /** @type {import('#client').Derived} */
          reaction,
          MAYBE_DIRTY,
          force_schedule
        );
      } else {
        schedule_effect(
          /** @type {import('#client').Effect} */
          reaction
        );
      }
    }
  }
}
function untrack(fn) {
  const previous_untracking = current_untracking;
  try {
    current_untracking = true;
    return fn();
  } finally {
    current_untracking = previous_untracking;
  }
}
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function push2(props, runes = false, fn) {
  current_component_context = {
    // exports (and props, if `accessors: true`)
    x: null,
    // context
    c: null,
    // effects
    e: null,
    // mounted
    m: false,
    // parent
    p: current_component_context,
    // signals
    d: null,
    // props
    s: props,
    // runes
    r: runes,
    // legacy $:
    l1: [],
    l2: /* @__PURE__ */ source(false),
    // update_callbacks
    u: null
  };
}
function pop2(component7) {
  const context_stack_item = current_component_context;
  if (context_stack_item !== null) {
    if (component7 !== void 0) {
      context_stack_item.x = component7;
    }
    const effects = context_stack_item.e;
    if (effects !== null) {
      context_stack_item.e = null;
      for (let i = 0; i < effects.length; i++) {
        effect(effects[i]);
      }
    }
    current_component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
  return component7 || /** @type {T} */
  {};
}
function proxy(value, immutable2 = true, owners) {
  if (typeof value === "object" && value != null && !is_frozen(value)) {
    if (STATE_SYMBOL in value) {
      const metadata = (
        /** @type {import('#client').ProxyMetadata<T>} */
        value[STATE_SYMBOL]
      );
      if (metadata.t === value || metadata.p === value) {
        return metadata.p;
      }
    }
    const prototype = get_prototype_of(value);
    if (prototype === object_prototype || prototype === array_prototype) {
      const proxy2 = new Proxy(value, state_proxy_handler);
      define_property(value, STATE_SYMBOL, {
        value: (
          /** @type {import('#client').ProxyMetadata} */
          {
            s: /* @__PURE__ */ new Map(),
            v: /* @__PURE__ */ source(0),
            a: is_array(value),
            i: immutable2,
            p: proxy2,
            t: value
          }
        ),
        writable: true,
        enumerable: false
      });
      return proxy2;
    }
  }
  return value;
}
function update_version(signal, d = 1) {
  set(signal, signal.v + d);
}
var state_proxy_handler = {
  defineProperty(target, prop, descriptor) {
    if (descriptor.value) {
      const metadata = target[STATE_SYMBOL];
      const s2 = metadata.s.get(prop);
      if (s2 !== void 0)
        set(s2, proxy(descriptor.value, metadata.i, metadata.o));
    }
    return Reflect.defineProperty(target, prop, descriptor);
  },
  deleteProperty(target, prop) {
    const metadata = target[STATE_SYMBOL];
    const s2 = metadata.s.get(prop);
    const is_array2 = metadata.a;
    const boolean = delete target[prop];
    if (is_array2 && boolean) {
      const ls = metadata.s.get("length");
      const length = target.length - 1;
      if (ls !== void 0 && ls.v !== length) {
        set(ls, length);
      }
    }
    if (s2 !== void 0)
      set(s2, UNINITIALIZED);
    if (boolean) {
      update_version(metadata.v);
    }
    return boolean;
  },
  get(target, prop, receiver) {
    if (prop === STATE_SYMBOL) {
      return Reflect.get(target, STATE_SYMBOL);
    }
    const metadata = target[STATE_SYMBOL];
    let s2 = metadata.s.get(prop);
    if (s2 === void 0 && (!(prop in target) || get_descriptor(target, prop)?.writable)) {
      s2 = (metadata.i ? source : mutable_source)(proxy(target[prop], metadata.i, metadata.o));
      metadata.s.set(prop, s2);
    }
    if (s2 !== void 0) {
      const value = get(s2);
      return value === UNINITIALIZED ? void 0 : value;
    }
    return Reflect.get(target, prop, receiver);
  },
  getOwnPropertyDescriptor(target, prop) {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
    if (descriptor && "value" in descriptor) {
      const metadata = target[STATE_SYMBOL];
      const s2 = metadata.s.get(prop);
      if (s2) {
        descriptor.value = get(s2);
      }
    }
    return descriptor;
  },
  has(target, prop) {
    if (prop === STATE_SYMBOL) {
      return true;
    }
    const metadata = target[STATE_SYMBOL];
    const has = Reflect.has(target, prop);
    let s2 = metadata.s.get(prop);
    if (s2 !== void 0 || current_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
      if (s2 === void 0) {
        s2 = (metadata.i ? source : mutable_source)(
          has ? proxy(target[prop], metadata.i, metadata.o) : UNINITIALIZED
        );
        metadata.s.set(prop, s2);
      }
      const value = get(s2);
      if (value === UNINITIALIZED) {
        return false;
      }
    }
    return has;
  },
  set(target, prop, value, receiver) {
    const metadata = target[STATE_SYMBOL];
    let s2 = metadata.s.get(prop);
    if (s2 === void 0) {
      untrack(() => receiver[prop]);
      s2 = metadata.s.get(prop);
    }
    if (s2 !== void 0) {
      set(s2, proxy(value, metadata.i, metadata.o));
    }
    const is_array2 = metadata.a;
    const not_has = !(prop in target);
    if (is_array2 && prop === "length") {
      for (let i = value; i < target.length; i += 1) {
        const s22 = metadata.s.get(i + "");
        if (s22 !== void 0)
          set(s22, UNINITIALIZED);
      }
    }
    target[prop] = value;
    if (not_has) {
      if (is_array2) {
        const ls = metadata.s.get("length");
        const length = target.length;
        if (ls !== void 0 && ls.v !== length) {
          set(ls, length);
        }
      }
      update_version(metadata.v);
    }
    return true;
  },
  ownKeys(target) {
    const metadata = target[STATE_SYMBOL];
    get(metadata.v);
    return Reflect.ownKeys(target);
  }
};
function set_hydrating(value) {
}
function hydrate_anchor(node) {
  if (node.nodeType !== 8) {
    return node;
  }
  var current = (
    /** @type {Node | null} */
    node
  );
  if (
    /** @type {Comment} */
    current?.data !== HYDRATION_START
  ) {
    return node;
  }
  var nodes = [];
  var depth = 0;
  while ((current = /** @type {Node} */
  current.nextSibling) !== null) {
    if (current.nodeType === 8) {
      var data = (
        /** @type {Comment} */
        current.data
      );
      if (data === HYDRATION_START) {
        depth += 1;
      } else if (data[0] === HYDRATION_END) {
        if (depth === 0) {
          return current;
        }
        depth -= 1;
      }
    }
    nodes.push(current);
  }
  throw new Error("Expected a closing hydration marker");
}
var node_prototype;
var element_prototype;
var text_prototype;
var text_content_set;
function init_operations() {
  if (node_prototype !== void 0) {
    return;
  }
  node_prototype = Node.prototype;
  element_prototype = Element.prototype;
  text_prototype = Text.prototype;
  node_prototype.appendChild;
  node_prototype.cloneNode;
  element_prototype.__click = void 0;
  text_prototype.__nodeValue = " ";
  element_prototype.__className = "";
  element_prototype.__attributes = null;
  get_descriptor(node_prototype, "firstChild").get;
  get_descriptor(node_prototype, "nextSibling").get;
  text_content_set = /** @type {(this: Node, text: string ) => void} */
  // @ts-ignore
  get_descriptor(node_prototype, "textContent").set;
  get_descriptor(element_prototype, "className").set;
}
function empty() {
  return document.createTextNode("");
}
function clear_text_content(node) {
  text_content_set.call(node, "");
}
function handle_event_propagation(handler_element, event) {
  var owner_document = handler_element.ownerDocument;
  var event_name = event.type;
  var path = event.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  if (event.target !== current_target) {
    define_property(event, "target", {
      configurable: true,
      value: current_target
    });
  }
  var path_idx = 0;
  var handled_at = event.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx + 1;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  while (current_target !== null) {
    var parent_element = current_target.parentNode || /** @type {any} */
    current_target.host || null;
    var internal_prop_name = "__" + event_name;
    var delegated = current_target[internal_prop_name];
    if (delegated !== void 0 && !/** @type {any} */
    current_target.disabled) {
      if (is_array(delegated)) {
        var [fn, ...data] = delegated;
        fn.apply(current_target, [event, ...data]);
      } else {
        delegated.call(current_target, event);
      }
    }
    if (event.cancelBubble || parent_element === handler_element || current_target === handler_element) {
      break;
    }
    current_target = parent_element;
  }
  event.__root = handler_element;
  current_target = handler_element;
}
var all_registered_events = /* @__PURE__ */ new Set();
var root_event_handles = /* @__PURE__ */ new Set();
function mount(component7, options2) {
  const anchor = options2.anchor ?? options2.target.appendChild(empty());
  return flush_sync(() => _mount(component7, { ...options2, anchor }), false);
}
function hydrate(component7, options2) {
  const target = options2.target;
  let hydrated = false;
  try {
    return flush_sync(() => {
      set_hydrating(true);
      var node = target.firstChild;
      while (node && (node.nodeType !== 8 || /** @type {Comment} */
      node.data !== HYDRATION_START)) {
        node = node.nextSibling;
      }
      if (!node) {
        throw new Error("Missing hydration marker");
      }
      const anchor = hydrate_anchor(node);
      const instance = _mount(component7, { ...options2, anchor });
      set_hydrating(false);
      hydrated = true;
      return instance;
    }, false);
  } catch (error) {
    if (!hydrated && options2.recover !== false) {
      console.error(
        "ERR_SVELTE_HYDRATION_MISMATCH",
        error
      );
      clear_text_content(target);
      return mount(component7, options2);
    } else {
      throw error;
    }
  } finally {
  }
}
function _mount(Component, { target, anchor, props = (
  /** @type {Props} */
  {}
), events, context, intro = false }) {
  init_operations();
  const registered_events = /* @__PURE__ */ new Set();
  const bound_event_listener = handle_event_propagation.bind(null, target);
  const bound_document_event_listener = handle_event_propagation.bind(null, document);
  const event_handle = (events2) => {
    for (let i = 0; i < events2.length; i++) {
      const event_name = events2[i];
      if (!registered_events.has(event_name)) {
        registered_events.add(event_name);
        target.addEventListener(
          event_name,
          bound_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
        document.addEventListener(
          event_name,
          bound_document_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
      }
    }
  };
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  let component7 = void 0;
  const unmount2 = effect_root(() => {
    branch(() => {
      if (context) {
        push2({});
        var ctx = (
          /** @type {import('#client').ComponentContext} */
          current_component_context
        );
        ctx.c = context;
      }
      if (events) {
        props.$$events = events;
      }
      component7 = Component(anchor, props) || {};
      if (context) {
        pop2();
      }
    });
    return () => {
      for (const event_name of registered_events) {
        target.removeEventListener(event_name, bound_event_listener);
      }
      root_event_handles.delete(event_handle);
    };
  });
  mounted_components.set(component7, unmount2);
  return component7;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component7) {
  const fn = mounted_components.get(component7);
  fn?.();
}
function asClassComponent$1(component7) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component: component7,
        ...options2
      });
    }
  };
}
var Svelte4Component = class {
  /** @type {any} */
  #events;
  /** @type {Record<string, any>} */
  #instance;
  /**
   * @param {import('svelte').ComponentConstructorOptions & {
   *  component: any;
   * 	immutable?: boolean;
   * 	hydrate?: boolean;
   * 	recover?: false;
   * }} options
   */
  constructor(options2) {
    const props = proxy({ ...options2.props || {}, $$events: {} }, false);
    this.#instance = (options2.hydrate ? hydrate : mount)(options2.component, {
      target: options2.target,
      props,
      context: options2.context,
      intro: options2.intro,
      recover: options2.recover
    });
    this.#events = props.$$events;
    for (const key2 of Object.keys(this.#instance)) {
      if (key2 === "$set" || key2 === "$destroy" || key2 === "$on")
        continue;
      define_property(this, key2, {
        get() {
          return this.#instance[key2];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key2] = value;
        },
        enumerable: true
      });
    }
    this.#instance.$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    this.#instance.$destroy = () => {
      unmount(this.#instance);
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    this.#instance.$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    this.#events[event] = this.#events[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    this.#events[event].push(cb);
    return () => {
      this.#events[event] = this.#events[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    this.#instance.$destroy();
  }
};
function asClassComponent(component7) {
  const component_constructor = asClassComponent$1(component7);
  const _render = (props, { context } = {}) => {
    const result = render(component7, { props, context });
    return {
      css: { code: "", map: null },
      head: result.head,
      html: result.html
    };
  };
  component_constructor.render = _render;
  return component_constructor;
}
var prerendering = false;
function Root($$payload, $$props) {
  push();
  let {
    stores,
    page: page2,
    constructors,
    components = [],
    form,
    data_0 = null,
    data_1 = null
  } = $$props;
  {
    setContext("__svelte__", stores);
  }
  {
    stores.page.set(page2);
  }
  $$payload.out += `<!--[-->`;
  if (constructors[1]) {
    $$payload.out += `<!--[-->`;
    constructors[0]?.($$payload, {
      data: data_0,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        constructors[1]?.($$payload2, { data: data_1, form });
        $$payload2.out += `<!--]-->`;
      }
    });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    constructors[0]?.($$payload, { data: data_0, form });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  pop();
}
var root = asClassComponent(Root);
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en"\n	  class="js-focus-visible lenis lenis-smooth">\n\n<head>\n	<meta charset="utf-8" />\n	<link rel="icon"\n		  href="' + assets2 + '/favicon.png" />\n	<meta name="viewport"\n		  content="width=device-width, initial-scale=1" />\n	' + head + '\n</head>\n\n<body data-sveltekit-preload-data="hover">\n	<div style="display: contents">' + body2 + `</div>
	<script>
		window.CSS.registerProperty({
			name: "--motion-rotate",
			inherits: false,
			syntax: "<angle>",
			initialValue: '0deg'
		});
		window.CSS.registerProperty({
			name: "--motion-translateY",
			inherits: false,
			syntax: "<length-percentage>",
			initialValue: '0px',
		});
	<\/script>
</body>

</html>`,
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "jse3kh"
};
async function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_exports();
init_chunks();
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive$1(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify22(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive$1(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify22(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify22(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify22).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify22(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify22(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive$1(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify22(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify22(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify22(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify22(k)}, ${stringify22(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify22(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive$1(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify2(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index22 = p++;
    indexes.set(thing, index22);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index22] = `["${key2}",${flatten(value2)}]`;
        return index22;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source: source2, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source2)},"${flags}"]` : `["RegExp",${stringify_string(source2)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index7 = flatten(value);
  if (index7 < 0)
    return `${index7}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify2, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "")
        message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy2 = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get3 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get3.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy2;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function writable(value, start = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch: branch2,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets7 = new Set(client.stylesheets);
  const fonts7 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch2.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch2.length; i += 1) {
      data2 = { ...data2, ...branch2[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch2) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets7.add(url);
      for (const url of node.fonts)
        fonts7.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets7) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts7) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch2.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate2 = [
        `node_ids: [${branch2.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate2.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate2.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate2.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push3, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch (e) {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          push3(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch2 = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch2.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch: branch2,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push3, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify2(value, reducers);
            } catch (e) {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify2(error, reducers);
            }
            count -= 1;
            push3(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify2(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch2 = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch2.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index7 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index7]();
              let j = i;
              while (!branch2[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch2.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch2.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch2.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch2),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options2) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options2 || {};
  var dec = opt.decode || decode;
  var index7 = 0;
  while (index7 < str.length) {
    var eqIdx = str.indexOf("=", index7);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index7);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index7 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index7, eqIdx).trim();
    if (void 0 === obj[key2]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index7 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options2) {
  var opt = options2 || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse_1(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = parse_1(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = parse_1(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return serialize_1(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = parse_1(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", serialize_1(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", serialize_1(name, value, { ...options2, path }));
    }
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options2) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  try {
    value = options2.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}
function parse(input, options2) {
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!input) {
    if (!options2.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key2) {
        return key2.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options2.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!options2.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options2);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options2);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of splitCookiesString_1(set_cookie)) {
            const { name, value, ...options3 } = parseString_1(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config)
      continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch (e) {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare-workers"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/cloudflare-workers-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["aroma88-logo.avif", "aroma88.avif", "asana-hero.png", "asana-logo.png", "bg-video.mp4", "chapter.png", "chicago.webp", "close.svg", "crowd.png", "curaaid.png", "favicon.png", "flamejars.svg", "head.webp", "indie.webp", "madsen-hero.png", "madsen-logo.avif", "memento.png", "menu.svg", "phases.png", "s2.webp", "sarah-hero.png", "sarah.avif", "schematiq.png", "spring.png", "superstore.webp", "universe.mp4", "wallhaven-top.png", "wallhaven.png", "wilderness.png"]),
    mimeTypes: { ".avif": "image/avif", ".png": "image/png", ".mp4": "video/mp4", ".webp": "image/webp", ".svg": "image/svg+xml" },
    _: {
      client: { "start": "_app/immutable/entry/start.DFaHMLwB.js", "app": "_app/immutable/entry/app.CsliWNKK.js", "imports": ["_app/immutable/entry/start.DFaHMLwB.js", "_app/immutable/chunks/entry.BN9CiMvb.js", "_app/immutable/chunks/index-client.DT8scQk1.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/utils.BSJX-nVd.js", "_app/immutable/entry/app.CsliWNKK.js", "_app/immutable/chunks/proxy.B9TrOHuA.js", "_app/immutable/chunks/runtime.KHPTfT0h.js", "_app/immutable/chunks/render.CR8dV1-2.js", "_app/immutable/chunks/disclose-version.BD2IXOaX.js", "_app/immutable/chunks/if.Rq_8K8pM.js", "_app/immutable/chunks/index-client.DT8scQk1.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/about",
          pattern: /^\/about\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/contact",
          pattern: /^\/contact\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/services",
          pattern: /^\/services\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Map([["/products", { "file": "products.html" }], ["/work", { "file": "work.html" }], ["/work/sarah-work", { "file": "work/sarah-work.html" }], ["/work/aroma88-work", { "file": "work/aroma88-work.html" }], ["/work/madsen-work", { "file": "work/madsen-work.html" }], ["/work/asana-work", { "file": "work/asana-work.html" }]]);

// .svelte-kit/cloudflare-workers-tmp/entry.js
var import_kv_asset_handler = __toESM(require_dist());
import static_asset_manifest_json from "__STATIC_CONTENT_MANIFEST";
var static_asset_manifest = JSON.parse(static_asset_manifest_json);
var server = new Server(manifest);
var app_path = `/${manifest.appPath}`;
var immutable = `${app_path}/immutable/`;
var version_file = `${app_path}/version.json`;
var entry_default = {
  /**
   * @param {Request} req
   * @param {any} env
   * @param {any} context
   */
  async fetch(req, env, context) {
    await server.init({ env });
    const url = new URL(req.url);
    if (url.pathname.startsWith(app_path)) {
      const res = await get_asset_from_kv(req, env, context);
      if (is_error(res.status))
        return res;
      const cache_control = url.pathname.startsWith(immutable) ? "public, immutable, max-age=31536000" : "no-cache";
      return new Response(res.body, {
        headers: {
          // include original headers, minus cache-control which
          // is overridden, and etag which is no longer useful
          "cache-control": cache_control,
          "content-type": res.headers.get("content-type"),
          "x-robots-tag": "noindex"
        }
      });
    }
    let { pathname, search } = url;
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.substring(1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html");
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      return get_asset_from_kv(req, env, context, (request, options2) => {
        if (prerendered.has(pathname)) {
          url.pathname = "/" + prerendered.get(pathname).file;
          return new Request(url.toString(), request);
        }
        return (0, import_kv_asset_handler.mapRequestToAsset)(request, options2);
      });
    } else if (location && prerendered.has(location)) {
      if (search)
        location += search;
      return new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    }
    return await server.respond(req, {
      platform: {
        env,
        context,
        // @ts-expect-error lib.dom is interfering with workers-types
        caches,
        // @ts-expect-error req is actually a Cloudflare request not a standard request
        cf: req.cf
      },
      getClientAddress() {
        return req.headers.get("cf-connecting-ip");
      }
    });
  }
};
async function get_asset_from_kv(req, env, context, map = import_kv_asset_handler.mapRequestToAsset) {
  return await (0, import_kv_asset_handler.getAssetFromKV)(
    {
      request: req,
      waitUntil(promise) {
        return context.waitUntil(promise);
      }
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: static_asset_manifest,
      mapRequestToAsset: map
    }
  );
}
function is_error(status) {
  return status > 399;
}
export {
  entry_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=worker.js.map

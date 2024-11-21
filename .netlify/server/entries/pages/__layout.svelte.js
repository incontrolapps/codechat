var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => _layout
});
var import_index_4cfda2e4 = __toModule(require("../../chunks/index-4cfda2e4.js"));
var import_Icon_71ba1575 = __toModule(require("../../chunks/Icon-71ba1575.js"));
var import_supabase_js = __toModule(require("@supabase/supabase-js"));
var app = "";
var reset = "";
const _layout = (0, import_index_4cfda2e4.c)(($$result, $$props, $$bindings, slots) => {
  let uname = (0, import_index_4cfda2e4.g)(import_Icon_71ba1575.a);
  return `${uname ? `<header><div class="${"inner"}"><div class="${"logo"}"><div class="${"user-info"}"><p>Hello, <span>${(0, import_index_4cfda2e4.e)(uname)}</span></p>
        ${(0, import_index_4cfda2e4.v)(import_Icon_71ba1575.I, "Icon").$$render($$result, { name: "user-circle" }, {}, {})}</div></div></div></header>` : ``}

${slots.default ? slots.default({}) : ``}

`;
});

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
  default: () => Routes
});
var import_index_4cfda2e4 = __toModule(require("../../chunks/index-4cfda2e4.js"));
var import_Icon_71ba1575 = __toModule(require("../../chunks/Icon-71ba1575.js"));
var import_supabase_js = __toModule(require("@supabase/supabase-js"));
const chat = (0, import_Icon_71ba1575.w)([]);
let initChatCount = 25;
let tableName = "global_chat";
const loadChat = async () => {
  const { data, error } = await import_Icon_71ba1575.s.from(tableName).select().order("id", { ascending: false }).limit(initChatCount);
  chat.set(data.reverse());
  import_Icon_71ba1575.s.from(tableName).on("INSERT", (payload) => {
    chat.set([...data, payload.new]);
    loadChat();
  }).subscribe();
};
var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
var MS = "millisecond";
var S = "second";
var MIN = "minute";
var H = "hour";
var D = "day";
var W = "week";
var M = "month";
var Q = "quarter";
var Y = "year";
var DATE = "date";
var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
var INVALID_DATE_STRING = "Invalid Date";
var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
var en = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
};
var padStart = function padStart2(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length)
    return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};
var padZoneStr = function padZoneStr2(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
};
var monthDiff = function monthDiff2(a, b) {
  if (a.date() < b.date())
    return -monthDiff2(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};
var absFloor = function absFloor2(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};
var prettyUnit = function prettyUnit2(u) {
  var special = {
    M,
    y: Y,
    w: W,
    d: D,
    D: DATE,
    h: H,
    m: MIN,
    s: S,
    ms: MS,
    Q
  };
  return special[u] || String(u || "").toLowerCase().replace(/s$/, "");
};
var isUndefined = function isUndefined2(s) {
  return s === void 0;
};
var U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};
var L = "en";
var Ls = {};
Ls[L] = en;
var isDayjs = function isDayjs2(d) {
  return d instanceof Dayjs;
};
var parseLocale = function parseLocale2(preset, object, isLocal) {
  var l;
  if (!preset)
    return L;
  if (typeof preset === "string") {
    if (Ls[preset]) {
      l = preset;
    }
    if (object) {
      Ls[preset] = object;
      l = preset;
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }
  if (!isLocal && l)
    L = l;
  return l || !isLocal && L;
};
var dayjs = function dayjs2(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  }
  var cfg = typeof c === "object" ? c : {};
  cfg.date = date;
  cfg.args = arguments;
  return new Dayjs(cfg);
};
var wrapper = function wrapper2(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset
  });
};
var Utils = U;
Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;
var parseDate = function parseDate2(cfg) {
  var date = cfg.date, utc = cfg.utc;
  if (date === null)
    return new Date(NaN);
  if (Utils.u(date))
    return new Date();
  if (date instanceof Date)
    return new Date(date);
  if (typeof date === "string" && !/Z$/i.test(date)) {
    var d = date.match(REGEX_PARSE);
    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || "0").substring(0, 3);
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }
  return new Date(date);
};
var Dayjs = /* @__PURE__ */ function() {
  function Dayjs2(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg);
  }
  var _proto = Dayjs2.prototype;
  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.$x = cfg.x || {};
    this.init();
  };
  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  };
  _proto.$utils = function $utils() {
    return Utils;
  };
  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };
  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };
  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };
  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };
  _proto.$g = function $g(input, get, set) {
    if (Utils.u(input))
      return this[get];
    return this.set(set, input);
  };
  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1e3);
  };
  _proto.valueOf = function valueOf() {
    return this.$d.getTime();
  };
  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);
    var instanceFactory = function instanceFactory2(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };
    var instanceFactorySet = function instanceFactorySet2(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply(_this.toDate("s"), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };
    var $W = this.$W, $M = this.$M, $D = this.$D;
    var utcPad = "set" + (this.$u ? "UTC" : "");
    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      case M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      case W: {
        var weekStart = this.$locale().weekStart || 0;
        var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      }
      case D:
      case DATE:
        return instanceFactorySet(utcPad + "Hours", 0);
      case H:
        return instanceFactorySet(utcPad + "Minutes", 1);
      case MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);
      case S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);
      default:
        return this.clone();
    }
  };
  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };
  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? "UTC" : "");
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (_int - this.$W) : _int;
    if (unit === M || unit === Y) {
      var date = this.clone().set(DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name)
      this.$d[name](arg);
    this.init();
    return this;
  };
  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };
  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };
  _proto.add = function add(number, units) {
    var _this2 = this, _C$MIN$C$H$C$S$unit;
    number = Number(number);
    var unit = Utils.p(units);
    var instanceFactorySet = function instanceFactorySet2(n) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
    };
    if (unit === M) {
      return this.set(M, this.$M + number);
    }
    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }
    if (unit === D) {
      return instanceFactorySet(1);
    }
    if (unit === W) {
      return instanceFactorySet(7);
    }
    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };
  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };
  _proto.format = function format(formatStr) {
    var _this3 = this;
    var locale = this.$locale();
    if (!this.isValid())
      return locale.invalidDate || INVALID_DATE_STRING;
    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var $H = this.$H, $m = this.$m, $M = this.$M;
    var weekdays = locale.weekdays, months = locale.months, meridiem = locale.meridiem;
    var getShort = function getShort2(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].substr(0, length);
    };
    var get$H = function get$H2(num) {
      return Utils.s($H % 12 || 12, num, "0");
    };
    var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
      var m = hour < 12 ? "AM" : "PM";
      return isLowercase ? m.toLowerCase() : m;
    };
    var matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: Utils.s($M + 1, 2, "0"),
      MMM: getShort(locale.monthsShort, $M, months, 3),
      MMMM: getShort(months, $M),
      D: this.$D,
      DD: Utils.s(this.$D, 2, "0"),
      d: String(this.$W),
      dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
      ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
      dddd: weekdays[this.$W],
      H: String($H),
      HH: Utils.s($H, 2, "0"),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: Utils.s($m, 2, "0"),
      s: String(this.$s),
      ss: Utils.s(this.$s, 2, "0"),
      SSS: Utils.s(this.$ms, 3, "0"),
      Z: zoneStr
    };
    return str.replace(REGEX_FORMAT, function(match, $1) {
      return $1 || matches[match] || zoneStr.replace(":", "");
    });
  };
  _proto.utcOffset = function utcOffset() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };
  _proto.diff = function diff(input, units, _float) {
    var _C$Y$C$M$C$Q$C$W$C$D$;
    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    var diff2 = this - that;
    var result = Utils.m(this, that);
    result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[M] = result, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = (diff2 - zoneDelta) / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = (diff2 - zoneDelta) / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H] = diff2 / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff2 / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S] = diff2 / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff2;
    return _float ? result : Utils.a(result);
  };
  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };
  _proto.$locale = function $locale() {
    return Ls[this.$L];
  };
  _proto.locale = function locale(preset, object) {
    if (!preset)
      return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName)
      that.$L = nextLocaleName;
    return that;
  };
  _proto.clone = function clone() {
    return Utils.w(this.$d, this);
  };
  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };
  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };
  _proto.toISOString = function toISOString() {
    return this.$d.toISOString();
  };
  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };
  return Dayjs2;
}();
var proto = Dayjs.prototype;
dayjs.prototype = proto;
[["$ms", MS], ["$s", S], ["$m", MIN], ["$H", H], ["$W", D], ["$M", M], ["$y", Y], ["$D", DATE]].forEach(function(g) {
  proto[g[1]] = function(input) {
    return this.$g(input, g[0], g[1]);
  };
});
dayjs.extend = function(plugin, option) {
  if (!plugin.$i) {
    plugin(option, Dayjs, dayjs);
    plugin.$i = true;
  }
  return dayjs;
};
dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;
dayjs.unix = function(timestamp) {
  return dayjs(timestamp * 1e3);
};
dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};
var relativeTime = function(o, c, d) {
  o = o || {};
  var proto2 = c.prototype;
  var relObj = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  };
  d.en.relativeTime = relObj;
  proto2.fromToBase = function(input, withoutSuffix, instance, isFrom, postFormat) {
    var loc = instance.$locale().relativeTime || relObj;
    var T = o.thresholds || [{
      l: "s",
      r: 44,
      d: S
    }, {
      l: "m",
      r: 89
    }, {
      l: "mm",
      r: 44,
      d: MIN
    }, {
      l: "h",
      r: 89
    }, {
      l: "hh",
      r: 21,
      d: H
    }, {
      l: "d",
      r: 35
    }, {
      l: "dd",
      r: 25,
      d: D
    }, {
      l: "M",
      r: 45
    }, {
      l: "MM",
      r: 10,
      d: M
    }, {
      l: "y",
      r: 17
    }, {
      l: "yy",
      d: Y
    }];
    var Tl = T.length;
    var result;
    var out;
    var isFuture;
    for (var i = 0; i < Tl; i += 1) {
      var t = T[i];
      if (t.d) {
        result = isFrom ? d(input).diff(instance, t.d, true) : instance.diff(input, t.d, true);
      }
      var abs = (o.rounding || Math.round)(Math.abs(result));
      isFuture = result > 0;
      if (abs <= t.r || !t.r) {
        if (abs <= 1 && i > 0)
          t = T[i - 1];
        var format = loc[t.l];
        if (postFormat) {
          abs = postFormat("" + abs);
        }
        if (typeof format === "string") {
          out = format.replace("%d", abs);
        } else {
          out = format(abs, withoutSuffix, t.l, isFuture);
        }
        break;
      }
    }
    if (withoutSuffix)
      return out;
    var pastOrFuture = isFuture ? loc.future : loc.past;
    if (typeof pastOrFuture === "function") {
      return pastOrFuture(out);
    }
    return pastOrFuture.replace("%s", out);
  };
  function fromTo(input, withoutSuffix, instance, isFrom) {
    return proto2.fromToBase(input, withoutSuffix, instance, isFrom);
  }
  proto2.to = function(input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this, true);
  };
  proto2.from = function(input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this);
  };
  var makeNow = function makeNow2(thisDay) {
    return thisDay.$u ? d.utc() : d();
  };
  proto2.toNow = function(withoutSuffix) {
    return this.to(makeNow(this), withoutSuffix);
  };
  proto2.fromNow = function(withoutSuffix) {
    return this.from(makeNow(this), withoutSuffix);
  };
};
dayjs.extend(relativeTime);
const Time = (0, import_index_4cfda2e4.c)(($$result, $$props, $$bindings, slots) => {
  let title;
  let $$restProps = (0, import_index_4cfda2e4.h)($$props, ["timestamp", "format", "relative", "live", "formatted"]);
  let { timestamp = new Date().toISOString() } = $$props;
  let { format = "MMM DD, YYYY" } = $$props;
  let { relative = false } = $$props;
  let { live = false } = $$props;
  let { formatted = "" } = $$props;
  if ($$props.timestamp === void 0 && $$bindings.timestamp && timestamp !== void 0)
    $$bindings.timestamp(timestamp);
  if ($$props.format === void 0 && $$bindings.format && format !== void 0)
    $$bindings.format(format);
  if ($$props.relative === void 0 && $$bindings.relative && relative !== void 0)
    $$bindings.relative(relative);
  if ($$props.live === void 0 && $$bindings.live && live !== void 0)
    $$bindings.live(live);
  if ($$props.formatted === void 0 && $$bindings.formatted && formatted !== void 0)
    $$bindings.formatted(formatted);
  formatted = relative ? dayjs(timestamp).from() : dayjs(timestamp).format(format);
  title = relative ? timestamp : void 0;
  return `<time${(0, import_index_4cfda2e4.b)([
    (0, import_index_4cfda2e4.f)($$restProps),
    { title: (0, import_index_4cfda2e4.d)(title) },
    {
      datetime: (0, import_index_4cfda2e4.d)(timestamp)
    }
  ], {})}>${(0, import_index_4cfda2e4.e)(formatted)}</time>`;
});
var ChatWindow_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".chat-loading.svelte-bglr8v{position:relative}.chat-loading.svelte-bglr8v::before{position:absolute;content:' ';background:#0000005c;width:100%;height:100%;z-index:999}.disable-scroll.svelte-bglr8v{overflow:hidden;filter:blur(4px)}",
  map: null
};
const ChatWindow = (0, import_index_4cfda2e4.c)(($$result, $$props, $$bindings, slots) => {
  let $chat, $$unsubscribe_chat;
  $$unsubscribe_chat = (0, import_index_4cfda2e4.i)(chat, (value) => $chat = value);
  let div;
  let { replyUserData = [] } = $$props;
  (0, import_index_4cfda2e4.j)();
  let uname = (0, import_index_4cfda2e4.g)(import_Icon_71ba1575.a);
  if ($$props.replyUserData === void 0 && $$bindings.replyUserData && replyUserData !== void 0)
    $$bindings.replyUserData(replyUserData);
  $$result.css.add(css$2);
  {
    {
      console.log("Chatwindow", replyUserData);
    }
  }
  $$unsubscribe_chat();
  return `<div class="${["chat-container svelte-bglr8v", ""].join(" ").trim()}"><div class="${["chat-window svelte-bglr8v", ""].join(" ").trim()}"${(0, import_index_4cfda2e4.k)("this", div, 0)}>${(0, import_index_4cfda2e4.l)($chat, ({ id, created_at, username, message, replied_to_id, replied_to_message, replied_to_username }, key) => {
    return `<div class="${[
      "chat-box",
      (username === uname ? "sender" : "") + " " + (username !== uname ? "agent" : "")
    ].join(" ").trim()}"><div class="${"message"}">${replied_to_id ? `<div class="${"reply-box"}"><span>Replied to <b>${(0, import_index_4cfda2e4.e)(replied_to_username)}</b></span>
                <span>${(0, import_index_4cfda2e4.e)(replied_to_message)}</span>
              </div>` : ``}
            <div class="${"message-box"}"${(0, import_index_4cfda2e4.k)("id", id, 0)}><span><!-- HTML_TAG_START -->${message}<!-- HTML_TAG_END --></span>
              <p class="${"reply-btn"}">${(0, import_index_4cfda2e4.v)(import_Icon_71ba1575.I, "Icon").$$render($$result, { name: "reply", solid: true }, {}, {})}</p>
            </div>
          <div class="${"info"}"><small>
              ${username !== uname ? `<span class="${"username"}">${(0, import_index_4cfda2e4.e)(username)}</span>
                -` : ``}
              <span class="${"time"}">${(0, import_index_4cfda2e4.v)(Time, "Time").$$render($$result, { relative: true, timestamp: created_at }, {}, {})}
              </span></small>
          </div></div>
      </div>`;
  })}</div>
</div>`;
});
var Spinner_svelte_svelte_type_style_lang = "";
var ChatInput_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "form.svelte-o7n947.svelte-o7n947{position:relative}.input-container.svelte-o7n947.svelte-o7n947{background:#fff;border-radius:0 0 5px 5px;overflow:hidden}.isreply.svelte-o7n947.svelte-o7n947{background:#272727;text-align:left}.isreply.svelte-o7n947 .reply-info.svelte-o7n947{padding:10px 20px}.isreply.svelte-o7n947 .reply-info .inner.svelte-o7n947{border-left:3px solid #3ecf8e;padding-left:10px;display:flex;align-items:center;justify-content:space-between}.isreply.svelte-o7n947 .reply-info .inner .left.svelte-o7n947{display:flex;flex-direction:column}.isreply.svelte-o7n947 .reply-info .inner .left small.svelte-o7n947{margin:5px 0}.isreply.svelte-o7n947 .reply-info .inner .left .username.svelte-o7n947{font-weight:bold;color:#3ecf8e}.isreply.svelte-o7n947 .reply-info .inner .left .reply.svelte-o7n947{font-style:italic}.isreply.svelte-o7n947 .reply-info .inner .right.svelte-o7n947{background:#3c3c3c;padding:5px 8px;border-radius:50px;line-height:1.3;font-size:10px;cursor:pointer}.input-container.svelte-o7n947 form.svelte-o7n947{display:flex}input.svelte-o7n947.svelte-o7n947{border:none;padding:20px;width:100%}input.svelte-o7n947.svelte-o7n947:focus{outline:none}input.svelte-o7n947.svelte-o7n947:disabled{background:#dedede}@media(max-width: 425px){.input-container.svelte-o7n947.svelte-o7n947{border-radius:0}}",
  map: null
};
const ChatInput = (0, import_index_4cfda2e4.c)(($$result, $$props, $$bindings, slots) => {
  let message;
  (0, import_index_4cfda2e4.g)(import_Icon_71ba1575.a);
  let { replyUserData = [] } = $$props;
  (0, import_index_4cfda2e4.j)();
  let input;
  if ($$props.replyUserData === void 0 && $$bindings.replyUserData && replyUserData !== void 0)
    $$bindings.replyUserData(replyUserData);
  $$result.css.add(css$1);
  {
    {
      if (replyUserData.length > 0) {
        input.focus();
      }
    }
  }
  return `<div class="${["input-container svelte-o7n947", replyUserData.length !== 0 ? "isreply" : ""].join(" ").trim()}">${replyUserData.length !== 0 ? `<div class="${"reply-info svelte-o7n947"}"><div class="${"inner svelte-o7n947"}">${(0, import_index_4cfda2e4.l)(replyUserData, (data) => {
    return `<div class="${"left svelte-o7n947"}"><small class="${"svelte-o7n947"}">Replying to <span class="${"username svelte-o7n947"}">${(0, import_index_4cfda2e4.e)(data.username)}</span></small>
            <small class="${"reply svelte-o7n947"}">&quot;${(0, import_index_4cfda2e4.e)(data.message)}&quot;</small></div>
          <div class="${"right svelte-o7n947"}">X</div>`;
  })}</div></div>` : ``}
  <form class="${"svelte-o7n947"}"><input type="${"text"}" placeholder="${"Code something.."}" ${""} maxlength="${"200"}" class="${"svelte-o7n947"}"${(0, import_index_4cfda2e4.k)("value", message, 0)}${(0, import_index_4cfda2e4.k)("this", input, 0)}>
    ${``}</form>
</div>`;
});
var Modal_svelte_svelte_type_style_lang = "";
const css = {
  code: ".backdrop.svelte-qborfb.svelte-qborfb{width:100%;height:100%;position:fixed;background:rgba(0, 0, 0, 0.8);top:0;left:0;display:grid;place-items:center}.add-username.svelte-qborfb.svelte-qborfb{padding:20px;border-radius:10px;margin:auto}.add-username.svelte-qborfb input.svelte-qborfb{border:none;padding:20px 40px;border-radius:50px;text-align:center;display:block;margin:auto;margin-bottom:10px;box-shadow:0px 5px #3ecf8e;transition:all ease 0.1s}.add-username.svelte-qborfb input.svelte-qborfb:focus{outline:none;box-shadow:0px 10px #3ecf8e;margin-bottom:20px}",
  map: null
};
const Modal = (0, import_index_4cfda2e4.c)(($$result, $$props, $$bindings, slots) => {
  let username;
  $$result.css.add(css);
  return `<div class="${"backdrop svelte-qborfb"}" id="${"vanta"}"><div class="${"modal"}"><div class="${"add-username svelte-qborfb"}"><form><input type="${"text"}" placeholder="${"Enter your username here"}" class="${"svelte-qborfb"}"${(0, import_index_4cfda2e4.k)("value", username, 0)}>
        ${``}

        ${``}

        ${``}

        ${`<small>Welcome to CodeChat ${(0, import_index_4cfda2e4.e)(username)}!</small>`}</form></div></div>
</div>`;
});
const Routes = (0, import_index_4cfda2e4.c)(($$result, $$props, $$bindings, slots) => {
  let replyUserData = [];
  let uname = (0, import_index_4cfda2e4.g)(import_Icon_71ba1575.a);
  if (uname) {
    loadChat();
  }
  return `${$$result.head += `${$$result.title = `<title>codechat</title>`, ""}`, ""}

<main>${uname ? `${(0, import_index_4cfda2e4.v)(ChatWindow, "ChatWindow").$$render($$result, { replyUserData }, {}, {})}
    ${(0, import_index_4cfda2e4.v)(ChatInput, "ChatInput").$$render($$result, { replyUserData }, {}, {})}` : `${(0, import_index_4cfda2e4.v)(Modal, "Modal").$$render($$result, {}, {}, {})}`}</main>`;
});

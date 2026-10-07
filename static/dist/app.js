function nh(_) {
  return _ && _.__esModule && Object.prototype.hasOwnProperty.call(_, "default") ? _.default : _;
}
var bo = { exports: {} }, Z = {};
var kd;
function ch() {
  if (kd) return Z;
  kd = 1;
  var _ = /* @__PURE__ */ Symbol.for("react.transitional.element"), R = /* @__PURE__ */ Symbol.for("react.portal"), Q = /* @__PURE__ */ Symbol.for("react.fragment"), h = /* @__PURE__ */ Symbol.for("react.strict_mode"), J = /* @__PURE__ */ Symbol.for("react.profiler"), U = /* @__PURE__ */ Symbol.for("react.consumer"), _l = /* @__PURE__ */ Symbol.for("react.context"), Pl = /* @__PURE__ */ Symbol.for("react.forward_ref"), yl = /* @__PURE__ */ Symbol.for("react.suspense"), hl = /* @__PURE__ */ Symbol.for("react.memo"), B = /* @__PURE__ */ Symbol.for("react.lazy"), S = /* @__PURE__ */ Symbol.for("react.activity"), p = /* @__PURE__ */ Symbol.for("react.view_transition"), cl = Symbol.iterator;
  function pl(r) {
    return r === null || typeof r != "object" ? null : (r = cl && r[cl] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var Hl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, W = Object.assign, Ol = {};
  function G(r, N, H) {
    this.props = r, this.context = N, this.refs = Ol, this.updater = H || Hl;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(r, N) {
    if (typeof r != "object" && typeof r != "function" && r != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, r, N, "setState");
  }, G.prototype.forceUpdate = function(r) {
    this.updater.enqueueForceUpdate(this, r, "forceUpdate");
  };
  function Ct() {
  }
  Ct.prototype = G.prototype;
  function Xt(r, N, H) {
    this.props = r, this.context = N, this.refs = Ol, this.updater = H || Hl;
  }
  var Qt = Xt.prototype = new Ct();
  Qt.constructor = Xt, W(Qt, G.prototype), Qt.isPureReactComponent = !0;
  var ct = Array.isArray;
  function w() {
  }
  var al = { H: null, A: null, T: null, S: null }, jt = Object.prototype.hasOwnProperty;
  function St(r, N, H) {
    var q = H.ref;
    return {
      $$typeof: _,
      type: r,
      key: N,
      ref: q !== void 0 ? q : null,
      props: H
    };
  }
  function bt(r, N) {
    return St(r.type, N, r.props);
  }
  function it(r) {
    return typeof r == "object" && r !== null && r.$$typeof === _;
  }
  function ge(r) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + r.replace(/[=:]/g, function(H) {
      return N[H];
    });
  }
  var Fe = /\/+/g;
  function ql(r, N) {
    return typeof r == "object" && r !== null && r.key != null ? ge("" + r.key) : N.toString(36);
  }
  function O(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (typeof r.status == "string" ? r.then(w, w) : (r.status = "pending", r.then(
          function(N) {
            r.status === "pending" && (r.status = "fulfilled", r.value = N);
          },
          function(N) {
            r.status === "pending" && (r.status = "rejected", r.reason = N);
          }
        )), r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function X(r, N, H, q, ll) {
    var tl = typeof r;
    (tl === "undefined" || tl === "boolean") && (r = null);
    var ul = !1;
    if (r === null) ul = !0;
    else
      switch (tl) {
        case "bigint":
        case "string":
        case "number":
          ul = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case _:
            case R:
              ul = !0;
              break;
            case B:
              return ul = r._init, X(
                ul(r._payload),
                N,
                H,
                q,
                ll
              );
          }
      }
    if (ul)
      return ll = ll(r), ul = q === "" ? "." + ql(r, 0) : q, ct(ll) ? (H = "", ul != null && (H = ul.replace(Fe, "$&/") + "/"), X(ll, N, H, "", function(te) {
        return te;
      })) : ll != null && (it(ll) && (ll = bt(
        ll,
        H + (ll.key == null || r && r.key === ll.key ? "" : ("" + ll.key).replace(
          Fe,
          "$&/"
        ) + "/") + ul
      )), N.push(ll)), 1;
    ul = 0;
    var M = q === "" ? "." : q + ":";
    if (ct(r))
      for (var x = 0; x < r.length; x++)
        q = r[x], tl = M + ql(q, x), ul += X(
          q,
          N,
          H,
          tl,
          ll
        );
    else if (x = pl(r), typeof x == "function")
      for (r = x.call(r), x = 0; !(q = r.next()).done; )
        q = q.value, tl = M + ql(q, x++), ul += X(
          q,
          N,
          H,
          tl,
          ll
        );
    else if (tl === "object") {
      if (typeof r.then == "function")
        return X(
          O(r),
          N,
          H,
          q,
          ll
        );
      throw N = String(r), Error(
        "Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ul;
  }
  function j(r, N, H) {
    if (r == null) return r;
    var q = [], ll = 0;
    return X(r, q, "", "", function(tl) {
      return N.call(H, tl, ll++);
    }), q;
  }
  function dl(r) {
    if (r._status === -1) {
      var N = r._result, H = N();
      H.then(
        function(q) {
          (r._status === 0 || r._status === -1) && (r._status = 1, r._result = q, H.status === void 0 && (H.status = "fulfilled", H.value = q));
        },
        function(q) {
          (r._status === 0 || r._status === -1) && (r._status = 2, r._result = q, H.status === void 0 && (H.status = "rejected", H.reason = q));
        }
      ), r._status === -1 && (r._status = 0, r._result = H);
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var il = typeof reportError == "function" ? reportError : function(r) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var N = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
        error: r
      });
      if (!window.dispatchEvent(N)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", r);
      return;
    }
    console.error(r);
  };
  function Ut(r) {
    var N = al.T, H = {};
    H.types = N !== null ? N.types : null, al.T = H;
    try {
      var q = r(), ll = al.S;
      ll !== null && ll(H, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(w, il);
    } catch (tl) {
      il(tl);
    } finally {
      N !== null && H.types !== null && (N.types = H.types), al.T = N;
    }
  }
  function le(r) {
    var N = al.T;
    if (N !== null) {
      var H = N.types;
      H === null ? N.types = [r] : H.indexOf(r) === -1 && H.push(r);
    } else Ut(le.bind(null, r));
  }
  var $e = {
    map: j,
    forEach: function(r, N, H) {
      j(
        r,
        function() {
          N.apply(this, arguments);
        },
        H
      );
    },
    count: function(r) {
      var N = 0;
      return j(r, function() {
        N++;
      }), N;
    },
    toArray: function(r) {
      return j(r, function(N) {
        return N;
      }) || [];
    },
    only: function(r) {
      if (!it(r))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return r;
    }
  };
  return Z.Activity = S, Z.Children = $e, Z.Component = G, Z.Fragment = Q, Z.Profiler = J, Z.PureComponent = Xt, Z.StrictMode = h, Z.Suspense = yl, Z.ViewTransition = p, Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = al, Z.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(r) {
      return al.H.useMemoCache(r);
    }
  }, Z.addTransitionType = le, Z.cache = function(r) {
    return function() {
      return r.apply(null, arguments);
    };
  }, Z.cacheSignal = function() {
    return null;
  }, Z.cloneElement = function(r, N, H) {
    if (r == null)
      throw Error(
        "The argument must be a React element, but you passed " + r + "."
      );
    var q = W({}, r.props), ll = r.key;
    if (N != null)
      for (tl in N.key !== void 0 && (ll = "" + N.key), N)
        !jt.call(N, tl) || tl === "key" || tl === "__self" || tl === "__source" || tl === "ref" && N.ref === void 0 || (q[tl] = N[tl]);
    var tl = arguments.length - 2;
    if (tl === 1) q.children = H;
    else if (1 < tl) {
      for (var ul = Array(tl), M = 0; M < tl; M++)
        ul[M] = arguments[M + 2];
      q.children = ul;
    }
    return St(r.type, ll, q);
  }, Z.createContext = function(r) {
    return r = {
      $$typeof: _l,
      _currentValue: r,
      _currentValue2: r,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, r.Provider = r, r.Consumer = {
      $$typeof: U,
      _context: r
    }, r;
  }, Z.createElement = function(r, N, H) {
    var q, ll = {}, tl = null;
    if (N != null)
      for (q in N.key !== void 0 && (tl = "" + N.key), N)
        jt.call(N, q) && q !== "key" && q !== "__self" && q !== "__source" && (ll[q] = N[q]);
    var ul = arguments.length - 2;
    if (ul === 1) ll.children = H;
    else if (1 < ul) {
      for (var M = Array(ul), x = 0; x < ul; x++)
        M[x] = arguments[x + 2];
      ll.children = M;
    }
    if (r && r.defaultProps)
      for (q in ul = r.defaultProps, ul)
        ll[q] === void 0 && (ll[q] = ul[q]);
    return St(r, tl, ll);
  }, Z.createRef = function() {
    return { current: null };
  }, Z.forwardRef = function(r) {
    return { $$typeof: Pl, render: r };
  }, Z.isValidElement = it, Z.lazy = function(r) {
    return {
      $$typeof: B,
      _payload: { _status: -1, _result: r },
      _init: dl
    };
  }, Z.memo = function(r, N) {
    return {
      $$typeof: hl,
      type: r,
      compare: N === void 0 ? null : N
    };
  }, Z.startTransition = Ut, Z.unstable_useCacheRefresh = function() {
    return al.H.useCacheRefresh();
  }, Z.use = function(r) {
    return al.H.use(r);
  }, Z.useActionState = function(r, N, H) {
    return al.H.useActionState(r, N, H);
  }, Z.useCallback = function(r, N) {
    return al.H.useCallback(r, N);
  }, Z.useContext = function(r) {
    return al.H.useContext(r);
  }, Z.useDebugValue = function() {
  }, Z.useDeferredValue = function(r, N) {
    return al.H.useDeferredValue(r, N);
  }, Z.useEffect = function(r, N) {
    return al.H.useEffect(r, N);
  }, Z.useEffectEvent = function(r) {
    return al.H.useEffectEvent(r);
  }, Z.useId = function() {
    return al.H.useId();
  }, Z.useImperativeHandle = function(r, N, H) {
    return al.H.useImperativeHandle(r, N, H);
  }, Z.useInsertionEffect = function(r, N) {
    return al.H.useInsertionEffect(r, N);
  }, Z.useLayoutEffect = function(r, N) {
    return al.H.useLayoutEffect(r, N);
  }, Z.useMemo = function(r, N) {
    return al.H.useMemo(r, N);
  }, Z.useOptimistic = function(r, N) {
    return al.H.useOptimistic(r, N);
  }, Z.useReducer = function(r, N, H) {
    return al.H.useReducer(r, N, H);
  }, Z.useRef = function(r) {
    return al.H.useRef(r);
  }, Z.useState = function(r) {
    return al.H.useState(r);
  }, Z.useSyncExternalStore = function(r, N, H) {
    return al.H.useSyncExternalStore(
      r,
      N,
      H
    );
  }, Z.useTransition = function() {
    return al.H.useTransition();
  }, Z.version = "19.3.0", Z;
}
var Id;
function Ao() {
  return Id || (Id = 1, bo.exports = ch()), bo.exports;
}
var Ql = Ao();
const f = /* @__PURE__ */ nh(Ql);
var To = { exports: {} }, un = {}, _o = { exports: {} }, No = {};
var Pd;
function ih() {
  return Pd || (Pd = 1, (function(_) {
    function R(O, X) {
      var j = O.length;
      O.push(X);
      l: for (; 0 < j; ) {
        var dl = j - 1 >>> 1, il = O[dl];
        if (0 < J(il, X))
          O[dl] = X, O[j] = il, j = dl;
        else break l;
      }
    }
    function Q(O) {
      return O.length === 0 ? null : O[0];
    }
    function h(O) {
      if (O.length === 0) return null;
      var X = O[0], j = O.pop();
      if (j !== X) {
        O[0] = j;
        l: for (var dl = 0, il = O.length, Ut = il >>> 1; dl < Ut; ) {
          var le = 2 * (dl + 1) - 1, $e = O[le], r = le + 1, N = O[r];
          if (0 > J($e, j))
            r < il && 0 > J(N, $e) ? (O[dl] = N, O[r] = j, dl = r) : (O[dl] = $e, O[le] = j, dl = le);
          else if (r < il && 0 > J(N, j))
            O[dl] = N, O[r] = j, dl = r;
          else break l;
        }
      }
      return X;
    }
    function J(O, X) {
      var j = O.sortIndex - X.sortIndex;
      return j !== 0 ? j : O.id - X.id;
    }
    if (_.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var U = performance;
      _.unstable_now = function() {
        return U.now();
      };
    } else {
      var _l = Date, Pl = _l.now();
      _.unstable_now = function() {
        return _l.now() - Pl;
      };
    }
    var yl = [], hl = [], B = 1, S = null, p = 3, cl = !1, pl = !1, Hl = !1, W = !1, Ol = typeof setTimeout == "function" ? setTimeout : null, G = typeof clearTimeout == "function" ? clearTimeout : null, Ct = typeof setImmediate < "u" ? setImmediate : null;
    function Xt(O) {
      for (var X = Q(hl); X !== null; ) {
        if (X.callback === null) h(hl);
        else if (X.startTime <= O)
          h(hl), X.sortIndex = X.expirationTime, R(yl, X);
        else break;
        X = Q(hl);
      }
    }
    function Qt(O) {
      if (Hl = !1, Xt(O), !pl)
        if (Q(yl) !== null)
          pl = !0, ct || (ct = !0, it());
        else {
          var X = Q(hl);
          X !== null && ql(Qt, X.startTime - O);
        }
    }
    var ct = !1, w = -1, al = 5, jt = -1;
    function St() {
      return W ? !0 : !(_.unstable_now() - jt < al);
    }
    function bt() {
      if (W = !1, ct) {
        var O = _.unstable_now();
        jt = O;
        var X = !0;
        try {
          l: {
            pl = !1, Hl && (Hl = !1, G(w), w = -1), cl = !0;
            var j = p;
            try {
              t: {
                for (Xt(O), S = Q(yl); S !== null && !(S.expirationTime > O && St()); ) {
                  var dl = S.callback;
                  if (typeof dl == "function") {
                    S.callback = null, p = S.priorityLevel;
                    var il = dl(
                      S.expirationTime <= O
                    );
                    if (O = _.unstable_now(), typeof il == "function") {
                      S.callback = il, Xt(O), X = !0;
                      break t;
                    }
                    S === Q(yl) && h(yl), Xt(O);
                  } else h(yl);
                  S = Q(yl);
                }
                if (S !== null) X = !0;
                else {
                  var Ut = Q(hl);
                  Ut !== null && ql(
                    Qt,
                    Ut.startTime - O
                  ), X = !1;
                }
              }
              break l;
            } finally {
              S = null, p = j, cl = !1;
            }
            X = void 0;
          }
        } finally {
          X ? it() : ct = !1;
        }
      }
    }
    var it;
    if (typeof Ct == "function")
      it = function() {
        Ct(bt);
      };
    else if (typeof MessageChannel < "u") {
      var ge = new MessageChannel(), Fe = ge.port2;
      ge.port1.onmessage = bt, it = function() {
        Fe.postMessage(null);
      };
    } else
      it = function() {
        Ol(bt, 0);
      };
    function ql(O, X) {
      w = Ol(function() {
        O(_.unstable_now());
      }, X);
    }
    _.unstable_IdlePriority = 5, _.unstable_ImmediatePriority = 1, _.unstable_LowPriority = 4, _.unstable_NormalPriority = 3, _.unstable_Profiling = null, _.unstable_UserBlockingPriority = 2, _.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, _.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : al = 0 < O ? Math.floor(1e3 / O) : 5;
    }, _.unstable_getCurrentPriorityLevel = function() {
      return p;
    }, _.unstable_next = function(O) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = p;
      }
      var j = p;
      p = X;
      try {
        return O();
      } finally {
        p = j;
      }
    }, _.unstable_requestPaint = function() {
      W = !0;
    }, _.unstable_runWithPriority = function(O, X) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var j = p;
      p = O;
      try {
        return X();
      } finally {
        p = j;
      }
    }, _.unstable_scheduleCallback = function(O, X, j) {
      var dl = _.unstable_now();
      switch (typeof j == "object" && j !== null ? (j = j.delay, j = typeof j == "number" && 0 < j ? dl + j : dl) : j = dl, O) {
        case 1:
          var il = -1;
          break;
        case 2:
          il = 250;
          break;
        case 5:
          il = 1073741823;
          break;
        case 4:
          il = 1e4;
          break;
        default:
          il = 5e3;
      }
      return il = j + il, O = {
        id: B++,
        callback: X,
        priorityLevel: O,
        startTime: j,
        expirationTime: il,
        sortIndex: -1
      }, j > dl ? (O.sortIndex = j, R(hl, O), Q(yl) === null && O === Q(hl) && (Hl ? (G(w), w = -1) : Hl = !0, ql(Qt, j - dl))) : (O.sortIndex = il, R(yl, O), pl || cl || (pl = !0, ct || (ct = !0, it()))), O;
    }, _.unstable_shouldYield = St, _.unstable_wrapCallback = function(O) {
      var X = p;
      return function() {
        var j = p;
        p = X;
        try {
          return O.apply(this, arguments);
        } finally {
          p = j;
        }
      };
    };
  })(No)), No;
}
var l0;
function fh() {
  return l0 || (l0 = 1, _o.exports = ih()), _o.exports;
}
var zo = { exports: {} }, wl = {};
var t0;
function oh() {
  if (t0) return wl;
  t0 = 1;
  var _ = Ao();
  function R(B) {
    var S = "https://react.dev/errors/" + B;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var p = 2; p < arguments.length; p++)
        S += "&args[]=" + encodeURIComponent(arguments[p]);
    }
    return "Minified React error #" + B + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Q() {
  }
  var h = {
    d: {
      f: Q,
      r: function() {
        throw Error(R(522));
      },
      D: Q,
      C: Q,
      L: Q,
      m: Q,
      X: Q,
      S: Q,
      M: Q
    },
    p: 0,
    findDOMNode: null
  }, J = /* @__PURE__ */ Symbol.for("react.portal"), U = /* @__PURE__ */ Symbol.for("react.recoverable"), _l = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function Pl(B, S, p) {
    var cl = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: J,
      key: cl == null ? null : cl === _l ? _l : "" + cl,
      children: B,
      containerInfo: S,
      implementation: p
    };
  }
  var yl = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function hl(B, S) {
    if (B === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return wl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = h, wl.browser = function(B) {
    return { $$typeof: U, _reason: B };
  }, wl.createPortal = function(B, S) {
    var p = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(R(299));
    return Pl(B, S, null, p);
  }, wl.flushSync = function(B) {
    var S = yl.T, p = h.p;
    try {
      if (yl.T = null, h.p = 2, B) return B();
    } finally {
      yl.T = S, h.p = p, h.d.f();
    }
  }, wl.preconnect = function(B, S) {
    typeof B == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, h.d.C(B, S));
  }, wl.prefetchDNS = function(B) {
    typeof B == "string" && h.d.D(B);
  }, wl.preinit = function(B, S) {
    if (typeof B == "string" && S && typeof S.as == "string") {
      var p = S.as, cl = hl(p, S.crossOrigin), pl = typeof S.integrity == "string" ? S.integrity : void 0, Hl = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      p === "style" ? h.d.S(
        B,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: cl,
          integrity: pl,
          fetchPriority: Hl
        }
      ) : p === "script" && h.d.X(B, {
        crossOrigin: cl,
        integrity: pl,
        fetchPriority: Hl,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, wl.preinitModule = function(B, S) {
    if (typeof B == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var p = hl(
            S.as,
            S.crossOrigin
          );
          h.d.M(B, {
            crossOrigin: p,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
          });
        }
      } else S == null && h.d.M(B);
  }, wl.preload = function(B, S) {
    if (typeof B == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var p = S.as, cl = hl(p, S.crossOrigin);
      h.d.L(B, p, {
        crossOrigin: cl,
        integrity: typeof S.integrity == "string" ? S.integrity : void 0,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0,
        type: typeof S.type == "string" ? S.type : void 0,
        fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
        referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
        imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
        imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
        media: typeof S.media == "string" ? S.media : void 0
      });
    }
  }, wl.preloadModule = function(B, S) {
    if (typeof B == "string")
      if (S) {
        var p = hl(S.as, S.crossOrigin);
        h.d.m(B, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: p,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          nonce: typeof S.nonce == "string" ? S.nonce : void 0,
          fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
        });
      } else h.d.m(B);
  }, wl.requestFormReset = function(B) {
    h.d.r(B);
  }, wl.unstable_batchedUpdates = function(B, S) {
    return B(S);
  }, wl.useFormState = function(B, S, p) {
    return yl.H.useFormState(B, S, p);
  }, wl.useFormStatus = function() {
    return yl.H.useHostTransitionStatus();
  }, wl.version = "19.3.0", wl;
}
var e0;
function mh() {
  if (e0) return zo.exports;
  e0 = 1;
  function _() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_);
      } catch (R) {
        console.error(R);
      }
  }
  return _(), zo.exports = oh(), zo.exports;
}
var a0;
function rh() {
  if (a0) return un;
  a0 = 1;
  var _ = fh(), R = Ao(), Q = mh();
  function h(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function J(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function U(l) {
    for (var t = l, e = t; e && !e.alternate; )
      t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? l : null;
  }
  function _l(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Pl(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function yl(l) {
    if (U(l) !== l)
      throw Error(h(188));
  }
  function hl(l) {
    var t = l.alternate;
    if (!t) {
      if (t = U(l), t === null) throw Error(h(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return yl(u), l;
          if (n === a) return yl(u), t;
          n = n.sibling;
        }
        throw Error(h(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var c = !1, i = u.child; i; ) {
          if (i === e) {
            c = !0, e = u, a = n;
            break;
          }
          if (i === a) {
            c = !0, a = u, e = n;
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === e) {
              c = !0, e = n, a = u;
              break;
            }
            if (i === a) {
              c = !0, a = n, e = u;
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(h(189));
        }
      }
      if (e.alternate !== a) throw Error(h(190));
    }
    if (e.tag !== 3) throw Error(h(188));
    return e.stateNode.current === e ? l : t;
  }
  function B(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = B(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  function S(l, t, e, a, u, n) {
    for (; l !== null; ) {
      if ((l.tag === 5 || l.tag === 27 || l.tag === 6) && e(l, a, u, n) || (l.tag !== 22 || l.memoizedState === null) && (t || l.tag !== 5 && l.tag !== 27) && S(
        l.child,
        t,
        e,
        a,
        u,
        n
      ))
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function p(l) {
    for (l = l.return; l !== null; ) {
      if (l.tag === 3 || l.tag === 5 || l.tag === 27) return l;
      l = l.return;
    }
    return null;
  }
  function cl(l) {
    var t = !1;
    for (l = l.return; l !== null && (l.tag === 4 && (t = !0), !(l.tag === 3 || l.tag === 5 || l.tag === 27)); )
      l = l.return;
    return t;
  }
  function pl(l) {
    var t = [null, null], e = p(l);
    return e === null || Hl(
      t,
      l,
      e.child,
      { foundSelf: !1 }
    ), t;
  }
  function Hl(l, t, e, a) {
    for (; e !== null; ) {
      if (e === t) a.foundSelf = !0;
      else if (e.tag === 5 || e.tag === 27 || e.tag === 6) {
        if (a.foundSelf) return l[1] = e, !0;
        l[0] = e;
      } else if ((e.tag !== 22 || e.memoizedState === null) && Hl(
        l,
        t,
        e.child,
        a
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function W(l) {
    switch (l.tag) {
      case 5:
      case 27:
      case 6:
        return l.stateNode;
      case 3:
        return l.stateNode.containerInfo;
      default:
        throw Error(h(559));
    }
  }
  var Ol = null, G = null;
  function Ct(l, t, e) {
    return l === e ? !0 : l === t ? (Ol = l, !0) : !1;
  }
  function Xt(l, t, e) {
    return l === e ? (G = l, !1) : l === t ? (G !== null && (Ol = l), !0) : !1;
  }
  function Qt(l) {
    if (l === null) return null;
    do
      l = l === null ? null : l.return;
    while (l && l.tag !== 5 && l.tag !== 27 && l.tag !== 3);
    return l || null;
  }
  function ct(l, t, e) {
    for (var a = 0, u = l; u; u = e(u)) a++;
    u = 0;
    for (var n = t; n; n = e(n)) u++;
    for (; 0 < a - u; ) l = e(l), a--;
    for (; 0 < u - a; ) t = e(t), u--;
    for (; a--; ) {
      if (l === t || t !== null && l === t.alternate)
        return l;
      l = e(l), t = e(t);
    }
    return null;
  }
  var w = Object.assign, al = /* @__PURE__ */ Symbol.for("react.element"), jt = /* @__PURE__ */ Symbol.for("react.transitional.element"), St = /* @__PURE__ */ Symbol.for("react.portal"), bt = /* @__PURE__ */ Symbol.for("react.fragment"), it = /* @__PURE__ */ Symbol.for("react.strict_mode"), ge = /* @__PURE__ */ Symbol.for("react.profiler"), Fe = /* @__PURE__ */ Symbol.for("react.consumer"), ql = /* @__PURE__ */ Symbol.for("react.context"), O = /* @__PURE__ */ Symbol.for("react.forward_ref"), X = /* @__PURE__ */ Symbol.for("react.suspense"), j = /* @__PURE__ */ Symbol.for("react.suspense_list"), dl = /* @__PURE__ */ Symbol.for("react.memo"), il = /* @__PURE__ */ Symbol.for("react.lazy"), Ut = /* @__PURE__ */ Symbol.for("react.activity"), le = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), $e = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), r = /* @__PURE__ */ Symbol.for("react.view_transition"), N = /* @__PURE__ */ Symbol.for("react.recoverable"), H = Symbol.iterator;
  function q(l) {
    return l === null || typeof l != "object" ? null : (l = H && l[H] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var ll = /* @__PURE__ */ Symbol.for("react.client.reference");
  function tl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === ll ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case bt:
        return "Fragment";
      case ge:
        return "Profiler";
      case it:
        return "StrictMode";
      case X:
        return "Suspense";
      case j:
        return "SuspenseList";
      case Ut:
        return "Activity";
      case r:
        return "ViewTransition";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case St:
          return "Portal";
        case ql:
          return l.displayName || "Context";
        case Fe:
          return (l._context.displayName || "Context") + ".Consumer";
        case O:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case dl:
          return t = l.displayName || null, t !== null ? t : tl(l.type) || "Memo";
        case il:
          t = l._payload, l = l._init;
          try {
            return tl(l(t));
          } catch {
          }
      }
    return null;
  }
  var ul = Array.isArray, M = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, x = Q.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Gc = [], Sa = -1;
  function xt(l) {
    return { current: l };
  }
  function jl(l) {
    0 > Sa || (l.current = Gc[Sa], Gc[Sa] = null, Sa--);
  }
  function gl(l, t) {
    Sa++, Gc[Sa] = l.current, l.current = t;
  }
  var Zt = xt(null), mu = xt(null), Ee = xt(null), nn = xt(null);
  function cn(l, t) {
    switch (gl(Ee, t), gl(mu, l), gl(Zt, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? cd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = cd(t), l = id(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    jl(Zt), gl(Zt, l);
  }
  function ba() {
    jl(Zt), jl(mu), jl(Ee);
  }
  function Xc(l) {
    var t = l.memoizedState;
    t !== null && (iu._currentValue = t.memoizedState, gl(nn, l)), t = Zt.current;
    var e = id(t, l.type);
    t !== e && (gl(mu, l), gl(Zt, e));
  }
  function fn(l) {
    mu.current === l && (jl(Zt), jl(mu)), nn.current === l && (jl(nn), iu._currentValue = te);
  }
  var Qc, po;
  function Se(l) {
    if (Qc === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        Qc = t && t[1] || "", po = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qc + l + po;
  }
  var jc = !1;
  function xc(l, t) {
    if (!l || jc) return "";
    jc = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var T = function() {
                throw Error();
              };
              if (Object.defineProperty(T.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(T, []);
                } catch (z) {
                  var s = z;
                }
                Reflect.construct(l, [], T);
              } else {
                try {
                  T.call();
                } catch (z) {
                  s = z;
                }
                T = !1;
                try {
                  var g = Object.getOwnPropertyDescriptor(
                    l.prototype,
                    "props"
                  );
                  Object.defineProperty(l.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), T = !0, new l();
                } finally {
                  T && (g !== void 0 ? Object.defineProperty(l.prototype, "props", g) : delete l.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                s = z;
              }
              (T = l()) && typeof T.catch == "function" && T.catch(function() {
              });
            }
          } catch (z) {
            if (z && s && typeof z.stack == "string")
              return [z.stack, s.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), c = n[0], i = n[1];
      if (c && i) {
        var o = c.split(`
`), v = i.split(`
`);
        for (u = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < v.length && !v[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === o.length || u === v.length)
          for (a = o.length - 1, u = v.length - 1; 1 <= a && 0 <= u && o[a] !== v[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (o[a] !== v[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || o[a] !== v[u]) {
                  var E = `
` + o[a].replace(" at new ", " at ");
                  return l.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", l.displayName)), E;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      jc = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? Se(e) : "";
  }
  function o0(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Se(l.type);
      case 16:
        return Se("Lazy");
      case 13:
        return l.child !== t && t !== null ? Se("Suspense Fallback") : Se("Suspense");
      case 19:
        return Se("SuspenseList");
      case 0:
      case 15:
        return xc(l.type, !1);
      case 11:
        return xc(l.type.render, !1);
      case 1:
        return xc(l.type, !0);
      case 31:
        return Se("Activity");
      case 30:
        return Se("ViewTransition");
      default:
        return "";
    }
  }
  function Do(l) {
    try {
      var t = "", e = null;
      do
        t += o0(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Zc = Object.prototype.hasOwnProperty, Vc = _.unstable_scheduleCallback, Lc = _.unstable_cancelCallback, m0 = _.unstable_shouldYield, r0 = _.unstable_requestPaint, ft = _.unstable_now, s0 = _.unstable_getCurrentPriorityLevel, Mo = _.unstable_ImmediatePriority, Co = _.unstable_UserBlockingPriority, on = _.unstable_NormalPriority, d0 = _.unstable_LowPriority, Uo = _.unstable_IdlePriority, v0 = _.log, y0 = _.unstable_setDisableYieldValue, ru = null, ot = null;
  function be(l) {
    if (typeof v0 == "function" && y0(l), ot && typeof ot.setStrictMode == "function")
      try {
        ot.setStrictMode(ru, l);
      } catch {
      }
  }
  var mt = Math.clz32 ? Math.clz32 : E0, h0 = Math.log, g0 = Math.LN2;
  function E0(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (h0(l) / g0 | 0) | 0;
  }
  var mn = 256, rn = 262144, sn = 4194304;
  function We(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & -l;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function dn(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, c = l.pingedLanes;
    l = l.warmLanes;
    var i = a & 134217727;
    return i !== 0 ? (a = i & ~n, a !== 0 ? u = We(a) : (c &= i, c !== 0 ? u = We(c) : e || (e = i & ~l, e !== 0 && (u = We(e))))) : (i = a & ~n, i !== 0 ? u = We(i) : c !== 0 ? u = We(c) : e || (e = a & ~l, e !== 0 && (u = We(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function su(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Ro(l, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var a = 31 - mt(e), u = 1 << a;
        t |= l[a], e &= ~u;
      }
    return t;
  }
  function S0(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ho() {
    var l = sn;
    return sn <<= 1, (sn & 62914560) === 0 && (sn = 4194304), l;
  }
  function Kc(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function du(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function b0(l, t, e, a, u, n) {
    var c = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var i = l.entanglements, o = l.expirationTimes, v = l.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var E = 31 - mt(e), T = 1 << E;
      i[E] = 0, o[E] = -1;
      var s = v[E];
      if (s !== null)
        for (v[E] = null, E = 0; E < s.length; E++) {
          var g = s[E];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~T;
    }
    a !== 0 && qo(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function qo(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - mt(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Bo(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - mt(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function Yo(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : Jc(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function Jc(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function wc(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Go() {
    var l = x.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Ld(l.type));
  }
  function Xo(l, t) {
    var e = x.p;
    try {
      return x.p = l, t();
    } finally {
      x.p = e;
    }
  }
  var ee = Math.random().toString(36).slice(2), xl = "__reactFiber$" + ee, lt = "__reactProps$" + ee, Ta = "__reactContainer$" + ee, Qo = "__reactEvents$" + ee, T0 = "__reactListeners$" + ee, _0 = "__reactHandles$" + ee, jo = "__reactResources$" + ee, vu = "__reactMarker$" + ee, vn = "__reactLoad$" + ee;
  function yn(l) {
    delete l[xl], delete l[lt], delete l[T0], delete l[_0];
  }
  function ke(l) {
    var t;
    if (t = l[xl]) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Ta] || e[xl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = zd(l); l !== null; ) {
            if (e = l[xl]) return e;
            l = zd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function _a(l) {
    if (l = l[xl] || l[Ta]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function yu(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(h(33));
  }
  function Na(l) {
    var t = l[jo];
    return t || (t = l[jo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Bl(l) {
    l[vu] = !0;
  }
  function xo(l) {
    l[vn] = void 0;
  }
  var Zo = /* @__PURE__ */ new Set(), Vo = {};
  function Ie(l, t) {
    za(l, t), za(l + "Capture", t);
  }
  function za(l, t) {
    for (Vo[l] = t, l = 0; l < t.length; l++)
      Zo.add(t[l]);
  }
  var N0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Lo = {}, Ko = {};
  function z0(l) {
    return Zc.call(Ko, l) ? !0 : Zc.call(Lo, l) ? !1 : N0.test(l) ? Ko[l] = !0 : (Lo[l] = !0, !1);
  }
  var el = !1;
  function Jo() {
    var l = el;
    return el = !1, l;
  }
  function hn(l, t, e) {
    if (z0(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, e);
      }
  }
  function gn(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, e);
    }
  }
  function ae(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, a);
    }
  }
  function rt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function wo(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function O0(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(c) {
          e = "" + c, n.call(this, c);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(c) {
          e = "" + c;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function Fc(l) {
    if (!l._valueTracker) {
      var t = wo(l) ? "checked" : "value";
      l._valueTracker = O0(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Fo(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = wo(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  var A0 = /[\n"\\]/g;
  function Tt(l) {
    return l.replace(
      A0,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function $c(l, t, e, a, u, n, c, i) {
    l.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.type = c : l.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + rt(t)) : l.value !== "" + rt(t) && (l.value = "" + rt(t)) : c !== "submit" && c !== "reset" || l.removeAttribute("value"), t != null ? c === "number" && l.value == t ? Wc(l, rt(l.value)) : Wc(l, rt(t)) : e != null ? Wc(l, rt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.name = "" + rt(i) : l.removeAttribute("name");
  }
  function $o(l, t, e, a, u, n, c, i) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Fc(l);
        return;
      }
      e = e != null ? "" + rt(e) : "", t = t != null ? "" + rt(t) : e, i || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = i ? l.checked : !!a, l.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (l.name = c), Fc(l);
  }
  function Wc(l, t) {
    l.defaultValue !== "" + t && (l.defaultValue = "" + t);
  }
  function Oa(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++)
        t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + rt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = !0, a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Wo(l, t, e) {
    if (t != null && (t = "" + rt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + rt(e) : "";
  }
  function ko(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(h(92));
        if (ul(a)) {
          if (1 < a.length) throw Error(h(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = rt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Fc(l);
  }
  function Aa(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var p0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Io(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || p0.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Po(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(h(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "", el = !0);
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && (Io(l, u, a), el = !0);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Io(l, n, t[n]);
  }
  function kc(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var D0 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), M0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function En(l) {
    return M0.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Vt() {
  }
  var Ic = null;
  function Pc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var pa = null, Da = null;
  function lm(l) {
    var t = _a(l);
    if (t && (l = t.stateNode)) {
      var e = l[lt] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if ($c(
            l,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Tt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[lt] || null;
                if (!u) throw Error(h(90));
                $c(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && Fo(a);
          }
          break l;
        case "textarea":
          Wo(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Oa(l, !!e.multiple, t, !1);
      }
    }
  }
  var li = !1;
  function tm(l, t, e) {
    if (li) return l(t, e);
    li = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (li = !1, (pa !== null || Da !== null) && (Ec(), pa && (t = pa, l = Da, Da = pa = null, lm(t), l)))
        for (t = 0; t < l.length; t++) lm(l[t]);
    }
  }
  function hu(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[lt] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function")
      throw Error(
        h(231, t, typeof e)
      );
    return e;
  }
  var ue = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ti = !1;
  if (ue)
    try {
      var gu = {};
      Object.defineProperty(gu, "passive", {
        get: function() {
          ti = !0;
        }
      }), window.addEventListener("test", gu, gu), window.removeEventListener("test", gu, gu);
    } catch {
      ti = !1;
    }
  var Te = null, ei = null, Sn = null;
  function em() {
    if (Sn) return Sn;
    var l, t = ei, e = t.length, a, u = "value" in Te ? Te.value : Te.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var c = e - l;
    for (a = 1; a <= c && t[e - a] === u[n - a]; a++) ;
    return Sn = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function bn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Tn() {
    return !0;
  }
  function am() {
    return !1;
  }
  function $l(l) {
    function t(e, a, u, n, c) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = c, this.currentTarget = null;
      for (var i in l)
        l.hasOwnProperty(i) && (e = l[i], this[i] = e ? e(n) : n[i]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Tn : am, this.isPropagationStopped = am, this;
    }
    return w(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Tn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Tn);
      },
      persist: function() {
      },
      isPersistent: Tn
    }), t;
  }
  var _e = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _n = $l(_e), Eu = w({}, _e, { view: 0, detail: 0 }), C0 = $l(Eu), ai, ui, Su, Nn = w({}, Eu, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ci,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Su && (Su && l.type === "mousemove" ? (ai = l.screenX - Su.screenX, ui = l.screenY - Su.screenY) : ui = ai = 0, Su = l), ai);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : ui;
    }
  }), um = $l(Nn), U0 = w({}, Nn, { dataTransfer: 0 }), R0 = $l(U0), H0 = w({}, Eu, { relatedTarget: 0 }), ni = $l(H0), q0 = w({}, _e, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), B0 = $l(q0), Y0 = w({}, _e, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), G0 = $l(Y0), X0 = w({}, _e, { data: 0 }), nm = $l(X0), Q0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, j0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, x0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Z0(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = x0[l]) ? !!t[l] : !1;
  }
  function ci() {
    return Z0;
  }
  var V0 = w({}, Eu, {
    key: function(l) {
      if (l.key) {
        var t = Q0[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = bn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? j0[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ci,
    charCode: function(l) {
      return l.type === "keypress" ? bn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? bn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), L0 = $l(V0), K0 = w({}, Nn, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), cm = $l(K0), J0 = w({}, _e, { submitter: 0 }), w0 = $l(J0), F0 = w({}, Eu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ci
  }), $0 = $l(F0), W0 = w({}, _e, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = $l(W0), I0 = w({}, Nn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), P0 = $l(I0), lv = w({}, _e, {
    newState: 0,
    oldState: 0,
    source: 0
  }), tv = $l(lv), ev = [9, 13, 27, 32], ii = ue && "CompositionEvent" in window, bu = null;
  ue && "documentMode" in document && (bu = document.documentMode);
  var av = ue && "TextEvent" in window && !bu, im = ue && (!ii || bu && 8 < bu && 11 >= bu), fm = " ", om = !1;
  function mm(l, t) {
    switch (l) {
      case "keyup":
        return ev.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function rm(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Ma = !1;
  function uv(l, t) {
    switch (l) {
      case "compositionend":
        return rm(t);
      case "keypress":
        return t.which !== 32 ? null : (om = !0, fm);
      case "textInput":
        return l = t.data, l === fm && om ? null : l;
      default:
        return null;
    }
  }
  function nv(l, t) {
    if (Ma)
      return l === "compositionend" || !ii && mm(l, t) ? (l = em(), Sn = ei = Te = null, Ma = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return im && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var cv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function sm(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!cv[l.type] : t === "textarea";
  }
  function dm(l, t, e, a) {
    pa ? Da ? Da.push(a) : Da = [a] : pa = a, t = zc(t, "onChange"), 0 < t.length && (e = new _n(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var Tu = null, _u = null;
  function iv(l) {
    ld(l, 0);
  }
  function zn(l) {
    var t = yu(l);
    if (Fo(t)) return l;
  }
  function vm(l, t) {
    if (l === "change") return t;
  }
  var ym = !1;
  if (ue) {
    var fi;
    if (ue) {
      var oi = "oninput" in document;
      if (!oi) {
        var hm = document.createElement("div");
        hm.setAttribute("oninput", "return;"), oi = typeof hm.oninput == "function";
      }
      fi = oi;
    } else fi = !1;
    ym = fi && (!document.documentMode || 9 < document.documentMode);
  }
  function gm() {
    Tu && (Tu.detachEvent("onpropertychange", Em), _u = Tu = null);
  }
  function Em(l) {
    if (l.propertyName === "value" && zn(_u)) {
      var t = [];
      dm(
        t,
        _u,
        l,
        Pc(l)
      ), tm(iv, t);
    }
  }
  function fv(l, t, e) {
    l === "focusin" ? (gm(), Tu = t, _u = e, Tu.attachEvent("onpropertychange", Em)) : l === "focusout" && gm();
  }
  function ov(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return zn(_u);
  }
  function mv(l, t) {
    if (l === "click") return zn(t);
  }
  function rv(l, t) {
    if (l === "input" || l === "change")
      return zn(t);
  }
  function sv(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var st = typeof Object.is == "function" ? Object.is : sv;
  function Nu(l, t) {
    if (st(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!Zc.call(t, u) || !st(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function mi(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  function Sm(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function bm(l, t) {
    var e = Sm(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t)
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Sm(e);
    }
  }
  function Tm(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Tm(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function _m(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = mi(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = mi(l.document);
    }
    return t;
  }
  function ri(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var dv = ue && "documentMode" in document && 11 >= document.documentMode, Ca = null, si = null, zu = null, di = !1;
  function Nm(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    di || Ca == null || Ca !== mi(a) || (a = Ca, "selectionStart" in a && ri(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), zu && Nu(zu, a) || (zu = a, a = zc(si, "onSelect"), 0 < a.length && (t = new _n(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Ca)));
  }
  function Pe(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var Ua = {
    animationend: Pe("Animation", "AnimationEnd"),
    animationiteration: Pe("Animation", "AnimationIteration"),
    animationstart: Pe("Animation", "AnimationStart"),
    transitionrun: Pe("Transition", "TransitionRun"),
    transitionstart: Pe("Transition", "TransitionStart"),
    transitioncancel: Pe("Transition", "TransitionCancel"),
    transitionend: Pe("Transition", "TransitionEnd")
  }, vi = {}, zm = {};
  ue && (zm = document.createElement("div").style, "AnimationEvent" in window || (delete Ua.animationend.animation, delete Ua.animationiteration.animation, delete Ua.animationstart.animation), "TransitionEvent" in window || delete Ua.transitionend.transition);
  function la(l) {
    if (vi[l]) return vi[l];
    if (!Ua[l]) return l;
    var t = Ua[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in zm)
        return vi[l] = t[e];
    return l;
  }
  var Om = la("animationend"), Am = la("animationiteration"), pm = la("animationstart"), vv = la("transitionrun"), yv = la("transitionstart"), hv = la("transitioncancel"), Dm = la("transitionend"), Mm = /* @__PURE__ */ new Map(), yi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  yi.push("scrollEnd");
  function Rt(l, t) {
    Mm.set(l, t), Ie(t, [l]);
  }
  var gv = 0;
  function ne(l, t) {
    if (l.name != null && l.name !== "auto") return l.name;
    if (t.autoName !== null) return t.autoName;
    l = Yt.identifierPrefix;
    var e = gv++;
    return l = "_" + l + "t_" + e.toString(32) + "_", t.autoName = l;
  }
  function Cm(l) {
    if (l == null || typeof l == "string")
      return l;
    var t = null, e = ka;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = l[e[a]];
        if (u != null) {
          if (u === "none") return "none";
          t = t == null ? u : t + (" " + u);
        }
      }
    return t ?? l.default;
  }
  function ce(l, t) {
    return l = Cm(l), t = Cm(t), t == null ? l === "auto" ? null : l : t === "auto" ? null : t;
  }
  var On = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, _t = [], Ra = 0, hi = 0;
  function An() {
    for (var l = Ra, t = hi = Ra = 0; t < l; ) {
      var e = _t[t];
      _t[t++] = null;
      var a = _t[t];
      _t[t++] = null;
      var u = _t[t];
      _t[t++] = null;
      var n = _t[t];
      if (_t[t++] = null, a !== null && u !== null) {
        var c = a.pending;
        c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
      }
      n !== 0 && Um(e, u, n);
    }
  }
  function pn(l, t, e, a) {
    _t[Ra++] = l, _t[Ra++] = t, _t[Ra++] = e, _t[Ra++] = a, hi |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function gi(l, t, e, a) {
    return pn(l, t, e, a), Dn(l);
  }
  function ta(l, t) {
    return pn(l, null, null, t), Dn(l);
  }
  function Um(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - mt(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Dn(l) {
    if (50 < Ju)
      throw Ju = 0, gc = null, Error(h(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ha = {};
  function Ev(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function tt(l, t, e, a) {
    return new Ev(l, t, e, a);
  }
  function Ei(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function ie(l, t) {
    var e = l.alternate;
    return e === null ? (e = tt(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 1206910976, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function Rm(l, t) {
    l.flags &= 1206910978;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Mn(l, t, e, a, u, n) {
    var c = 0;
    if (a = l, typeof a == "function") Ei(a) && (c = 1);
    else if (typeof a == "string")
      c = Jy(
        l,
        e,
        Zt.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (a) {
        case Ut:
          return l = tt(31, e, t, u), l.elementType = Ut, l.lanes = n, l;
        case bt:
          return ea(e.children, u, n, t);
        case it:
          c = 8, u |= 24;
          break;
        case ge:
          return l = tt(12, e, t, u | 2), l.elementType = ge, l.lanes = n, l;
        case X:
          return l = tt(13, e, t, u), l.elementType = X, l.lanes = n, l;
        case j:
          return l = tt(19, e, t, u), l.elementType = j, l.lanes = n, l;
        case le:
        case r:
          return l = u | 32, l = tt(30, e, t, l), l.elementType = r, l.lanes = n, l.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, l;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case ql:
                c = 10;
                break l;
              case Fe:
                c = 9;
                break l;
              case O:
                c = 11;
                break l;
              case dl:
                c = 14;
                break l;
              case il:
                c = 16, a = null;
                break l;
            }
          c = 29, e = Error(
            h(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = tt(c, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function ea(l, t, e, a) {
    return l = tt(7, l, a, t), l.lanes = e, l;
  }
  function Si(l, t, e) {
    return l = tt(6, l, null, t), l.lanes = e, l;
  }
  function Hm(l) {
    var t = tt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function bi(l, t, e) {
    return t = tt(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = e, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var qm = /* @__PURE__ */ new WeakMap();
  function Nt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = qm.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Do(t)
      }, qm.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Do(t)
    };
  }
  var qa = [], Ba = 0, Cn = null, Ou = 0, zt = [], Ot = 0, Ne = null, Lt = 1, Kt = "";
  function fe(l, t) {
    qa[Ba++] = Ou, qa[Ba++] = Cn, Cn = l, Ou = t;
  }
  function Bm(l, t, e) {
    zt[Ot++] = Lt, zt[Ot++] = Kt, zt[Ot++] = Ne, Ne = l;
    var a = Lt;
    l = Kt;
    var u = 32 - mt(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - mt(t) + u;
    if (30 < n) {
      var c = u - u % 5;
      n = (a & (1 << c) - 1).toString(32), a >>= c, u -= c, Lt = 1 << 32 - mt(t) + u | e << u | a, Kt = n + l;
    } else
      Lt = 1 << n | e << u | a, Kt = l;
  }
  function Un(l) {
    l.return !== null && (fe(l, 1), Bm(l, 1, 0));
  }
  function Ti(l) {
    for (; l === Cn; )
      Cn = qa[--Ba], qa[Ba] = null, Ou = qa[--Ba], qa[Ba] = null;
    for (; l === Ne; )
      Ne = zt[--Ot], zt[Ot] = null, Kt = zt[--Ot], zt[Ot] = null, Lt = zt[--Ot], zt[Ot] = null;
  }
  function Ym(l, t) {
    zt[Ot++] = Lt, zt[Ot++] = Kt, zt[Ot++] = Ne, Lt = t.id, Kt = t.overflow, Ne = l;
  }
  var Yl = null, El = null, K = !1, ze = null, At = !1, _i = Error(h(519));
  function Oe(l) {
    var t = Error(
      h(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Au(Nt(t, l)), _i;
  }
  function Gm(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[xl] = l, t[lt] = a, e) {
      case "dialog":
        $("cancel", t), $("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        $("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Fu.length; e++)
          $(Fu[e], t);
        break;
      case "source":
        $("error", t);
        break;
      case "img":
      case "image":
      case "link":
        $("error", t), $("load", t);
        break;
      case "details":
        $("toggle", t);
        break;
      case "input":
        $("invalid", t), $o(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        $("invalid", t);
        break;
      case "textarea":
        $("invalid", t), ko(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || ud(t.textContent, e) ? (a.popover != null && ($("beforetoggle", t), $("toggle", t)), a.onScroll != null && $("scroll", t), a.onScrollEnd != null && $("scrollend", t), a.onClick != null && (t.onclick = Vt), t = !0) : t = !1, t || Oe(l, !0);
  }
  function Rn(l) {
    for (Yl = l.return; Yl; )
      switch (Yl.tag) {
        case 5:
        case 31:
        case 13:
          At = !1;
          return;
        case 27:
        case 3:
          At = !0;
          return;
        default:
          Yl = Yl.return;
      }
  }
  function Ya(l) {
    if (l !== Yl) return !1;
    if (!K) return Rn(l), K = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Pf(l.type, l.memoizedProps)), e = !e), e && El && Oe(l), Rn(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(h(317));
      El = Nd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(h(317));
      El = Nd(l);
    } else
      t === 27 ? (t = El, xe(l.type) ? (l = fo, fo = null, El = l) : El = t) : El = Yl ? Dt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function aa() {
    El = Yl = null, K = !1;
  }
  function Ni() {
    var l = ze;
    return l !== null && (ut === null ? ut = l : ut.push.apply(
      ut,
      l
    ), ze = null), l;
  }
  function Au(l) {
    ze === null ? ze = [l] : ze.push(l);
  }
  var zi = xt(null), ua = null, oe = null;
  function Ae(l, t, e) {
    gl(zi, t._currentValue), t._currentValue = e;
  }
  function me(l) {
    l._currentValue = zi.current, jl(zi);
  }
  function Hn(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Oi(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var o = 0; o < t.length; o++)
            if (i.context === t[o]) {
              n.lanes |= e, i = n.alternate, i !== null && (i.lanes |= e), Hn(
                n.return,
                e,
                l
              ), a || (c = null);
              break l;
            }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (c = u.return, c === null) throw Error(h(341));
        c.lanes |= e, n = c.alternate, n !== null && (n.lanes |= e), Hn(c, e, l), c = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= e, c = u.alternate, c !== null && (c.lanes |= e), Hn(
          u.return,
          e,
          l
        ), c = u.child, c = c !== null ? c.sibling : null) : c = u.child;
      if (c !== null) c.return = u;
      else
        for (c = u; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (u = c.sibling, u !== null) {
            u.return = c.return, c = u;
            break;
          }
          c = c.return;
        }
      u = c;
    }
  }
  function na(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(h(387));
        if (c = c.memoizedProps, c !== null) {
          var i = u.type;
          st(u.pendingProps.value, c.value) || (l !== null ? l.push(i) : l = [i]);
        }
      } else if (u === nn.current) {
        if (c = u.alternate, c === null) throw Error(h(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(iu) : l = [iu]);
      }
      u = u.return;
    }
    return l !== null && Oi(
      t,
      l,
      e,
      a
    ), t.flags |= 262144, l !== null;
  }
  function qn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!st(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ca(l) {
    ua = l, oe = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Zl(l) {
    return Xm(ua, l);
  }
  function Bn(l, t) {
    return ua === null && ca(l), Xm(l, t);
  }
  function Xm(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, oe === null) {
      if (l === null) throw Error(h(308));
      oe = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else oe = oe.next = t;
    return e;
  }
  var Sv = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(e) {
        return e();
      });
    };
  }, bv = _.unstable_scheduleCallback, Tv = _.unstable_NormalPriority, Dl = {
    $$typeof: ql,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ai() {
    return {
      controller: new Sv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function pu(l) {
    l.refCount--, l.refCount === 0 && bv(Tv, function() {
      l.controller.abort();
    });
  }
  function Qm(l, t) {
    if ((l.pendingLanes & 4194048) !== 0) {
      var e = l.transitionTypes;
      for (e === null && (e = l.transitionTypes = []), l = 0; l < t.length; l++) {
        var a = t[l];
        e.indexOf(a) === -1 && e.push(a);
      }
    }
  }
  var Du = null;
  function _v(l) {
    var t = l.transitionTypes;
    return l.transitionTypes = null, t;
  }
  var Mu = null, pi = 0, ia = 0, Ga = null;
  function Nv(l, t) {
    if (Mu === null) {
      var e = Mu = [];
      pi = 0, ia = Lf(), Ga = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return pi++, t.then(jm, jm), t;
  }
  function jm() {
    if (--pi === 0 && (Du = null, Mu !== null)) {
      Ga !== null && (Ga.status = "fulfilled");
      var l = Mu;
      Mu = null, ia = 0, Ga = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function zv(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var u = 0; u < e.length; u++) (0, e[u])(t);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var xm = M.S;
  M.S = function(l, t) {
    if (Hs = ft(), typeof t == "object" && t !== null && typeof t.then == "function" && Nv(l, t), Du !== null)
      for (var e = tu; e !== null; )
        Qm(e, Du), e = e.next;
    if (e = l.types, e !== null) {
      for (var a = tu; a !== null; )
        Qm(a, e), a = a.next;
      if (ia !== 0) {
        a = Du, a === null && (a = Du = []);
        for (var u = 0; u < e.length; u++) {
          var n = e[u];
          a.indexOf(n) === -1 && a.push(n);
        }
      }
    }
    xm !== null && xm(l, t);
  };
  var fa = xt(null);
  function Di() {
    var l = fa.current;
    return l !== null ? l : vl.pooledCache;
  }
  function Yn(l, t) {
    t === null ? gl(fa, fa.current) : gl(fa, t.pool);
  }
  function Zm() {
    var l = Di();
    return l === null ? null : { parent: Dl._currentValue, pool: l };
  }
  var Xa = Error(h(460)), Mi = Error(h(474)), Gn = Error(h(542)), Xn = { then: function() {
  } };
  function Vm(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Lm(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Vt, Vt), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Jm(l), l === void 0 && !("reason" in t) ? Error(h(600)) : l;
      default:
        if (typeof t.status == "string") t.then(Vt, Vt);
        else {
          if (l = vl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(h(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Jm(l), l;
        }
        throw ma = t, Xa;
    }
  }
  function oa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (ma = e, Xa) : e;
    }
  }
  var ma = null;
  function Km() {
    if (ma === null) throw Error(h(459));
    var l = ma;
    return ma = null, l;
  }
  function Jm(l) {
    if (l === Xa || l === Gn)
      throw Error(h(483));
  }
  var Qa = null, Cu = 0;
  function Qn(l) {
    var t = Cu;
    return Cu += 1, Qa === null && (Qa = []), Lm(Qa, l, t);
  }
  function pe(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function jn(l, t) {
    throw t.$$typeof === al ? Error(h(525)) : (l = Object.prototype.toString.call(t), Error(
      h(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function wm(l) {
    function t(d, m) {
      if (l) {
        var y = d.deletions;
        y === null ? (d.deletions = [m], d.flags |= 16) : y.push(m);
      }
    }
    function e(d, m) {
      if (!l) return null;
      for (; m !== null; )
        t(d, m), m = m.sibling;
      return null;
    }
    function a(d) {
      for (var m = /* @__PURE__ */ new Map(); d !== null; )
        d.key === null ? m.set(d.index, d) : m.set(d.key, d), d = d.sibling;
      return m;
    }
    function u(d, m) {
      return d = ie(d, m), d.index = 0, d.sibling = null, d;
    }
    function n(d, m, y) {
      return d.index = y, l ? (y = d.alternate, y !== null ? (y = y.index, y < m ? (d.flags |= 2, m) : y) : (d.flags |= 134217730, m)) : (d.flags |= 1048576, m);
    }
    function c(d) {
      return l && d.alternate === null && (d.flags |= 134217730), d;
    }
    function i(d, m, y, b) {
      return m === null || m.tag !== 6 ? (m = Si(y, d.mode, b), m.return = d, m) : (m = u(m, y), m.return = d, m);
    }
    function o(d, m, y, b) {
      var A = y.type;
      return A === bt ? (d = E(
        d,
        m,
        y.props.children,
        b,
        y.key
      ), pe(d, y), d) : m !== null && (m.elementType === A || typeof A == "object" && A !== null && A.$$typeof === il && oa(A) === m.type) ? (m = u(m, y.props), pe(m, y), m.return = d, m) : (m = Mn(
        y.type,
        y.key,
        y.props,
        null,
        d.mode,
        b
      ), pe(m, y), m.return = d, m);
    }
    function v(d, m, y, b) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== y.containerInfo || m.stateNode.implementation !== y.implementation ? (m = bi(y, d.mode, b), m.return = d, m) : (m = u(m, y.children || []), m.return = d, m);
    }
    function E(d, m, y, b, A) {
      return m === null || m.tag !== 7 ? (m = ea(
        y,
        d.mode,
        b,
        A
      ), m.return = d, m) : (m = u(m, y), m.return = d, m);
    }
    function T(d, m, y) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = Si(
          "" + m,
          d.mode,
          y
        ), m.return = d, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case jt:
            return y = Mn(
              m.type,
              m.key,
              m.props,
              null,
              d.mode,
              y
            ), pe(y, m), y.return = d, y;
          case St:
            return m = bi(
              m,
              d.mode,
              y
            ), m.return = d, m;
          case il:
            return m = oa(m), T(d, m, y);
        }
        if (ul(m) || q(m))
          return m = ea(
            m,
            d.mode,
            y,
            null
          ), m.return = d, m;
        if (typeof m.then == "function")
          return T(d, Qn(m), y);
        if (m.$$typeof === ql)
          return T(
            d,
            Bn(d, m),
            y
          );
        jn(d, m);
      }
      return null;
    }
    function s(d, m, y, b) {
      var A = m !== null ? m.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return A !== null ? null : i(d, m, "" + y, b);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case jt:
            return y.key === A ? o(d, m, y, b) : null;
          case St:
            return y.key === A ? v(d, m, y, b) : null;
          case il:
            return y = oa(y), s(d, m, y, b);
        }
        if (ul(y) || q(y))
          return A !== null ? null : E(d, m, y, b, null);
        if (typeof y.then == "function")
          return s(
            d,
            m,
            Qn(y),
            b
          );
        if (y.$$typeof === ql)
          return s(
            d,
            m,
            Bn(d, y),
            b
          );
        jn(d, y);
      }
      return null;
    }
    function g(d, m, y, b, A) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return d = d.get(y) || null, i(m, d, "" + b, A);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case jt:
            return d = d.get(
              b.key === null ? y : b.key
            ) || null, o(m, d, b, A);
          case St:
            return d = d.get(
              b.key === null ? y : b.key
            ) || null, v(m, d, b, A);
          case il:
            return b = oa(b), g(
              d,
              m,
              y,
              b,
              A
            );
        }
        if (ul(b) || q(b))
          return d = d.get(y) || null, E(m, d, b, A, null);
        if (typeof b.then == "function")
          return g(
            d,
            m,
            y,
            Qn(b),
            A
          );
        if (b.$$typeof === ql)
          return g(
            d,
            m,
            y,
            Bn(m, b),
            A
          );
        jn(m, b);
      }
      return null;
    }
    function z(d, m, y, b) {
      for (var A = null, I = null, C = m, Y = m = 0, Ul = null; C !== null && Y < y.length; Y++) {
        C.index > Y ? (Ul = C, C = null) : Ul = C.sibling;
        var P = s(
          d,
          C,
          y[Y],
          b
        );
        if (P === null) {
          C === null && (C = Ul);
          break;
        }
        l && C && P.alternate === null && t(d, C), m = n(P, m, Y), I === null ? A = P : I.sibling = P, I = P, C = Ul;
      }
      if (Y === y.length)
        return e(d, C), K && fe(d, Y), A;
      if (C === null) {
        for (; Y < y.length; Y++)
          C = T(d, y[Y], b), C !== null && (m = n(
            C,
            m,
            Y
          ), I === null ? A = C : I.sibling = C, I = C);
        return K && fe(d, Y), A;
      }
      for (C = a(C); Y < y.length; Y++)
        Ul = g(
          C,
          d,
          Y,
          y[Y],
          b
        ), Ul !== null && (l && (P = Ul.alternate, P !== null && C.delete(P.key === null ? Y : P.key)), m = n(
          Ul,
          m,
          Y
        ), I === null ? A = Ul : I.sibling = Ul, I = Ul);
      return l && C.forEach(function(Je) {
        return t(d, Je);
      }), K && fe(d, Y), A;
    }
    function D(d, m, y, b) {
      if (y == null) throw Error(h(151));
      for (var A = null, I = null, C = m, Y = m = 0, Ul = null, P = y.next(); C !== null && !P.done; Y++, P = y.next()) {
        C.index > Y ? (Ul = C, C = null) : Ul = C.sibling;
        var Je = s(d, C, P.value, b);
        if (Je === null) {
          C === null && (C = Ul);
          break;
        }
        l && C && Je.alternate === null && t(d, C), m = n(Je, m, Y), I === null ? A = Je : I.sibling = Je, I = Je, C = Ul;
      }
      if (P.done)
        return e(d, C), K && fe(d, Y), A;
      if (C === null) {
        for (; !P.done; Y++, P = y.next())
          P = T(d, P.value, b), P !== null && (m = n(P, m, Y), I === null ? A = P : I.sibling = P, I = P);
        return K && fe(d, Y), A;
      }
      for (C = a(C); !P.done; Y++, P = y.next())
        P = g(C, d, Y, P.value, b), P !== null && (l && (Ul = P.alternate, Ul !== null && C.delete(
          Ul.key === null ? Y : Ul.key
        )), m = n(P, m, Y), I === null ? A = P : I.sibling = P, I = P);
      return l && C.forEach(function(uh) {
        return t(d, uh);
      }), K && fe(d, Y), A;
    }
    function L(d, m, y, b) {
      if (typeof y == "object" && y !== null && y.type === bt && y.key === null && y.props.ref === void 0 && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case jt:
            l: {
              for (var A = y.key; m !== null; ) {
                if (m.key === A) {
                  if (A = y.type, A === bt) {
                    if (m.tag === 7) {
                      e(
                        d,
                        m.sibling
                      ), b = u(
                        m,
                        y.props.children
                      ), pe(b, y), b.return = d, d = b;
                      break l;
                    }
                  } else if (m.elementType === A || typeof A == "object" && A !== null && A.$$typeof === il && oa(A) === m.type) {
                    e(
                      d,
                      m.sibling
                    ), b = u(m, y.props), pe(b, y), b.return = d, d = b;
                    break l;
                  }
                  e(d, m);
                  break;
                } else t(d, m);
                m = m.sibling;
              }
              y.type === bt ? (b = ea(
                y.props.children,
                d.mode,
                b,
                y.key
              ), pe(b, y), b.return = d, d = b) : (b = Mn(
                y.type,
                y.key,
                y.props,
                null,
                d.mode,
                b
              ), pe(b, y), b.return = d, d = b);
            }
            return c(d);
          case St:
            l: {
              for (A = y.key; m !== null; ) {
                if (m.key === A)
                  if (m.tag === 4 && m.stateNode.containerInfo === y.containerInfo && m.stateNode.implementation === y.implementation) {
                    e(
                      d,
                      m.sibling
                    ), b = u(m, y.children || []), b.return = d, d = b;
                    break l;
                  } else {
                    e(d, m);
                    break;
                  }
                else t(d, m);
                m = m.sibling;
              }
              b = bi(y, d.mode, b), b.return = d, d = b;
            }
            return c(d);
          case il:
            return y = oa(y), L(
              d,
              m,
              y,
              b
            );
        }
        if (ul(y))
          return z(
            d,
            m,
            y,
            b
          );
        if (q(y)) {
          if (A = q(y), typeof A != "function") throw Error(h(150));
          return y = A.call(y), D(
            d,
            m,
            y,
            b
          );
        }
        if (typeof y.then == "function")
          return L(
            d,
            m,
            Qn(y),
            b
          );
        if (y.$$typeof === ql)
          return L(
            d,
            m,
            Bn(d, y),
            b
          );
        jn(d, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, m !== null && m.tag === 6 ? (e(d, m.sibling), b = u(m, y), b.return = d, d = b) : (e(d, m), b = Si(y, d.mode, b), b.return = d, d = b), c(d)) : e(d, m);
    }
    return function(d, m, y, b) {
      try {
        Cu = 0;
        var A = L(
          d,
          m,
          y,
          b
        );
        return Qa = null, A;
      } catch (C) {
        if (C === Xa || C === Gn) throw C;
        var I = tt(29, C, null, d.mode);
        return I.lanes = b, I.return = d, I;
      }
    };
  }
  var ra = wm(!0), Fm = wm(!1), De = !1;
  function Ci(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ui(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Me(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Ce(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (nl & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Dn(l), Um(l, null, e), t;
    }
    return pn(l, a, t, e), Dn(l);
  }
  function Uu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Bo(l, e);
    }
  }
  function Ri(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var c = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = c : n = n.next = c, e = e.next;
        } while (e !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var Hi = !1;
  function Ru() {
    if (Hi) {
      var l = Ga;
      if (l !== null) throw l;
    }
  }
  function Hu(l, t, e, a) {
    Hi = !1;
    var u = l.updateQueue;
    De = !1;
    var n = u.firstBaseUpdate, c = u.lastBaseUpdate, i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var o = i, v = o.next;
      o.next = null, c === null ? n = v : c.next = v, c = o;
      var E = l.alternate;
      E !== null && (E = E.updateQueue, i = E.lastBaseUpdate, i !== c && (i === null ? E.firstBaseUpdate = v : i.next = v, E.lastBaseUpdate = o));
    }
    if (n !== null) {
      var T = u.baseState;
      c = 0, E = v = o = null, i = n;
      do {
        var s = i.lane & -536870913, g = s !== i.lane;
        if (g ? (k & s) === s : (a & s) === s) {
          s !== 0 && s === ia && (Hi = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          });
          l: {
            var z = l, D = i;
            s = t;
            var L = e;
            switch (D.tag) {
              case 1:
                if (z = D.payload, typeof z == "function") {
                  T = z.call(L, T, s);
                  break l;
                }
                T = z;
                break l;
              case 3:
                z.flags = z.flags & -65537 | 128;
              case 0:
                if (z = D.payload, s = typeof z == "function" ? z.call(L, T, s) : z, s == null) break l;
                T = w({}, T, s);
                break l;
              case 2:
                De = !0;
            }
          }
          s = i.callback, s !== null && (l.flags |= 64, g && (l.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [s] : g.push(s));
        } else
          g = {
            lane: s,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null
          }, E === null ? (v = E = g, o = T) : E = E.next = g, c |= s;
        if (i = i.next, i === null) {
          if (i = u.shared.pending, i === null)
            break;
          g = i, i = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      E === null && (o = T), u.baseState = o, u.firstBaseUpdate = v, u.lastBaseUpdate = E, n === null && (u.shared.lanes = 0), Ge |= c, l.lanes = c, l.memoizedState = T;
    }
  }
  function $m(l, t) {
    if (typeof l != "function")
      throw Error(h(191, l));
    l.call(t);
  }
  function Wm(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        $m(e[l], t);
  }
  var Ue = xt(null), xn = xt(0);
  function km(l, t) {
    l = ye, gl(xn, l), gl(Ue, t), ye = l | t.baseLanes;
  }
  function qi() {
    gl(xn, ye), gl(Ue, Ue.current);
  }
  function Bi() {
    ye = xn.current, jl(Ue), jl(xn);
  }
  var Vl = xt(null), Fl = null;
  function Re(l) {
    var t = l.alternate;
    gl(Ll, Ll.current & 1), gl(Vl, l), Fl === null && (t === null || Ue.current !== null || t.memoizedState !== null) && (Fl = l);
  }
  function Yi(l) {
    gl(Ll, Ll.current), gl(Vl, l), Fl === null && (Fl = l);
  }
  function Im(l) {
    l.tag === 22 ? (gl(Ll, Ll.current), gl(Vl, l), Fl === null && (Fl = l)) : He();
  }
  function He() {
    gl(Ll, Ll.current), gl(Vl, Vl.current);
  }
  function dt(l) {
    jl(Vl), Fl === l && (Fl = null), jl(Ll);
  }
  var Ll = xt(0);
  function qu(l, t) {
    gl(Vl, Vl.current), gl(Ll, t);
  }
  function Gi(l) {
    jl(Ll), jl(Vl), Fl === l && (Fl = null);
  }
  function Zn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || co(e) || io(e)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var re = 0, V = null, sl = null, Ml = null, Vn = !1, ja = !1, sa = !1, Ln = 0, Bu = 0, xa = null, Ov = 0;
  function Nl() {
    throw Error(h(321));
  }
  function Xi(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!st(l[e], t[e])) return !1;
    return !0;
  }
  function Qi(l, t, e, a, u, n) {
    return re = n, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, M.H = l === null || l.memoizedState === null ? Br : Yr, sa = !1, n = e(a, u), sa = !1, ja && (n = lr(
      t,
      e,
      a,
      u
    )), Pm(l), n;
  }
  function Pm(l) {
    M.H = kn;
    var t = sl !== null && sl.next !== null;
    if (re = 0, Ml = sl = V = null, Vn = !1, Bu = 0, xa = null, t) throw Error(h(300));
    l === null || Cl || (l = l.dependencies, l !== null && qn(l) && (Cl = !0));
  }
  function lr(l, t, e, a) {
    V = l;
    var u = 0;
    do {
      if (ja && (xa = null), Bu = 0, ja = !1, 25 <= u) throw Error(h(301));
      if (u += 1, Ml = sl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      M.H = Hv, n = t(e, a);
    } while (ja);
    return n;
  }
  function Av() {
    var l = M.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Yu(t) : t, l = l.useState()[0], (sl !== null ? sl.memoizedState : null) !== l && (V.flags |= 1024), t;
  }
  function ji() {
    var l = Ln !== 0;
    return Ln = 0, l;
  }
  function xi(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Zi(l) {
    if (Vn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Vn = !1;
    }
    re = 0, Ml = sl = V = null, ja = !1, Bu = Ln = 0, xa = null;
  }
  function Wl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ml === null ? V.memoizedState = Ml = l : Ml = Ml.next = l, Ml;
  }
  function Al() {
    if (sl === null) {
      var l = V.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = sl.next;
    var t = Ml === null ? V.memoizedState : Ml.next;
    if (t !== null)
      Ml = t, sl = l;
    else {
      if (l === null)
        throw V.alternate === null ? Error(h(467)) : Error(h(310));
      sl = l, l = {
        memoizedState: sl.memoizedState,
        baseState: sl.baseState,
        baseQueue: sl.baseQueue,
        queue: sl.queue,
        next: null
      }, Ml === null ? V.memoizedState = Ml = l : Ml = Ml.next = l;
    }
    return Ml;
  }
  function Kn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Yu(l) {
    var t = Bu;
    return Bu += 1, xa === null && (xa = []), l = Lm(xa, l, t), t = V, (Ml === null ? t.memoizedState : Ml.next) === null && (t = t.alternate, M.H = t === null || t.memoizedState === null ? Br : Yr), l;
  }
  function Jn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Yu(l);
      if (l.$$typeof === N) return;
      if (l.$$typeof === ql) return Zl(l);
    }
    throw Error(h(438, String(l)));
  }
  function Vi(l) {
    var t = null, e = V.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = V.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Kn(), V.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = $e;
    return t.index++, e;
  }
  function se(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function wn(l) {
    var t = Al();
    return Li(t, sl, l);
  }
  function Li(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(h(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        u.next = n.next, n.next = c;
      }
      t.baseQueue = u = n, a.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var i = c = null, o = null, v = t, E = !1;
      do {
        var T = v.lane & -536870913;
        if (T !== v.lane ? (k & T) === T : (re & T) === T) {
          var s = v.revertLane;
          if (s === 0)
            o !== null && (o = o.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }), T === ia && (E = !0);
          else if ((re & s) === s) {
            v = v.next, s === ia && (E = !0);
            continue;
          } else
            T = {
              lane: 0,
              revertLane: v.revertLane,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }, o === null ? (i = o = T, c = n) : o = o.next = T, V.lanes |= s, Ge |= s;
          T = v.action, sa && e(n, T), n = v.hasEagerState ? v.eagerState : e(n, T);
        } else
          s = {
            lane: T,
            revertLane: v.revertLane,
            gesture: v.gesture,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }, o === null ? (i = o = s, c = n) : o = o.next = s, V.lanes |= T, Ge |= T;
        v = v.next;
      } while (v !== null && v !== t);
      if (o === null ? c = n : o.next = i, !st(n, l.memoizedState) && (Cl = !0, E && (e = Ga, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = c, l.baseQueue = o, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Ki(l) {
    var t = Al(), e = t.queue;
    if (e === null) throw Error(h(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = u = u.next;
      do
        n = l(n, c.action), c = c.next;
      while (c !== u);
      st(n, t.memoizedState) || (Cl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function tr(l, t, e) {
    var a = V, u = Al(), n = K;
    if (n) {
      if (e === void 0) throw Error(h(407));
      e = e();
    } else e = t();
    var c = !st(
      (sl || u).memoizedState,
      e
    );
    if (c && (u.memoizedState = e, Cl = !0), u = u.queue, Fi(ur.bind(null, a, u, l), [
      l
    ]), l = u.getSnapshot !== t || c || Ml !== null && (Ml.memoizedState.tag & 1) !== 0, Za(
      l ? 9 : 8,
      { destroy: void 0 },
      ar.bind(null, a, u, e, t),
      null
    ), l) {
      if (a.flags |= 2048, vl === null) throw Error(h(349));
      n || (re & 127) !== 0 || er(a, t, e);
    }
    return e;
  }
  function er(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = V.updateQueue, t === null ? (t = Kn(), V.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function ar(l, t, e, a) {
    t.value = e, t.getSnapshot = a, nr(t) && cr(l);
  }
  function ur(l, t, e) {
    return e(function() {
      nr(t) && cr(l);
    });
  }
  function nr(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !st(l, e);
    } catch {
      return !0;
    }
  }
  function cr(l) {
    var t = ta(l, 2);
    t !== null && nt(t, l, 2);
  }
  function Ji(l) {
    var t = Wl();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), sa) {
        be(!0);
        try {
          e();
        } finally {
          be(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: se,
      lastRenderedState: l
    }, t;
  }
  function ir(l, t, e, a) {
    return l.baseState = e, Li(
      l,
      sl,
      typeof a == "function" ? a : se
    );
  }
  function pv(l, t, e, a, u) {
    if (Wn(l)) throw Error(h(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          n.listeners.push(c);
        }
      };
      M.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, fr(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function fr(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = M.T, c = {};
      c.types = n !== null ? n.types : null, M.T = c;
      try {
        var i = e(u, a), o = M.S;
        o !== null && o(c, i), or(l, t, i);
      } catch (v) {
        wi(l, t, v);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), M.T = n;
      }
    } else
      try {
        n = e(u, a), or(l, t, n);
      } catch (v) {
        wi(l, t, v);
      }
  }
  function or(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        mr(l, t, a);
      },
      function(a) {
        return wi(l, t, a);
      }
    ) : mr(l, t, e);
  }
  function mr(l, t, e) {
    t.status = "fulfilled", t.value = e, rr(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, fr(l, e)));
  }
  function wi(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, rr(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function rr(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function sr(l, t) {
    return t;
  }
  function dr(l, t) {
    if (K) {
      var e = vl.formState;
      if (e !== null) {
        l: {
          var a = V;
          if (K) {
            if (El) {
              t: {
                for (var u = El, n = At; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = Dt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                El = Dt(
                  u.nextSibling
                ), a = u.data === "F!";
                break l;
              }
            }
            Oe(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = Wl(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: sr,
      lastRenderedState: t
    }, e.queue = a, e = Rr.bind(
      null,
      V,
      a
    ), a.dispatch = e, a = Ji(!1), n = Pi.bind(
      null,
      V,
      !1,
      a.queue
    ), a = Wl(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = pv.bind(
      null,
      V,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function vr(l) {
    var t = Al();
    return yr(t, sl, l);
  }
  function yr(l, t, e) {
    if (t = Li(
      l,
      t,
      sr
    )[0], l = wn(se)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Yu(t);
      } catch (c) {
        throw c === Xa ? Gn : c;
      }
    else a = t;
    t = Al();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (V.flags |= 2048, Za(
      9,
      { destroy: void 0 },
      Dv.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function Dv(l, t) {
    l.action = t;
  }
  function hr(l) {
    var t = Al(), e = sl;
    if (e !== null)
      return yr(t, e, l);
    Al(), t = t.memoizedState, e = Al();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function Za(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = V.updateQueue, t === null && (t = Kn(), V.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function gr() {
    return Al().memoizedState;
  }
  function Fn(l, t, e, a) {
    var u = Wl();
    V.flags |= l, u.memoizedState = Za(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function $n(l, t, e, a) {
    var u = Al();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    sl !== null && a !== null && Xi(a, sl.memoizedState.deps) ? u.memoizedState = Za(t, n, e, a) : (V.flags |= l, u.memoizedState = Za(
      1 | t,
      n,
      e,
      a
    ));
  }
  function Er(l, t) {
    Fn(8390656, 8, l, t);
  }
  function Fi(l, t) {
    $n(2048, 8, l, t);
  }
  function Mv(l) {
    V.flags |= 4;
    var t = V.updateQueue;
    if (t === null)
      t = Kn(), V.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function Sr(l) {
    var t = Al().memoizedState;
    return Mv({ ref: t, nextImpl: l }), function() {
      if ((nl & 2) !== 0) throw Error(h(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function br(l, t) {
    return $n(4, 2, l, t);
  }
  function Tr(l, t) {
    return $n(4, 4, l, t);
  }
  function _r(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function Nr(l, t, e) {
    e = e != null ? e.concat([l]) : null, $n(4, 4, _r.bind(null, t, l), e);
  }
  function $i() {
  }
  function zr(l, t) {
    var e = Al();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Xi(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function Or(l, t) {
    var e = Al();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Xi(t, a[1]))
      return a[0];
    if (a = l(), sa) {
      be(!0);
      try {
        l();
      } finally {
        be(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function Wi(l, t, e) {
    return e === void 0 || (re & 1073741824) !== 0 && (k & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = Bs(), V.lanes |= l, Ge |= l, e);
  }
  function Ar(l, t, e, a) {
    return st(e, t) ? e : Ue.current !== null ? (l = Wi(l, e, a), st(l, t) || (Cl = !0), l) : (re & 106) === 0 || (re & 1073741824) !== 0 && (k & 261930) === 0 ? (Cl = !0, l.memoizedState = e) : (l = Bs(), V.lanes |= l, Ge |= l, t);
  }
  function pr(l, t, e, a, u) {
    var n = x.p;
    x.p = n !== 0 && 8 > n ? n : 8;
    var c = M.T, i = {};
    i.types = c !== null ? c.types : null, M.T = i, Pi(l, !1, t, e);
    try {
      var o = u(), v = M.S;
      if (v !== null && v(i, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var E = zv(
          o,
          a
        );
        Gu(
          l,
          t,
          E,
          gt(l)
        );
      } else
        Gu(
          l,
          t,
          a,
          gt(l)
        );
    } catch (T) {
      Gu(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: T },
        gt()
      );
    } finally {
      x.p = n, c !== null && i.types !== null && (c.types = i.types), M.T = c;
    }
  }
  function Cv() {
  }
  function ki(l, t, e, a) {
    if (l.tag !== 5) throw Error(h(476));
    var u = Dr(l).queue;
    pr(
      l,
      u,
      t,
      te,
      e === null ? Cv : function() {
        return Mr(l), e(a);
      }
    );
  }
  function Dr(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: te,
      baseState: te,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: se,
        lastRenderedState: te
      },
      next: null
    };
    var e = {};
    return t.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: se,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function Mr(l) {
    var t = Dr(l);
    t.next === null && (t = l.alternate.memoizedState), Gu(
      l,
      t.next.queue,
      {},
      gt()
    );
  }
  function Ii() {
    return Zl(iu);
  }
  function Cr() {
    return Al().memoizedState;
  }
  function Ur() {
    return Al().memoizedState;
  }
  function Uv(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = gt();
          l = Me(e);
          var a = Ce(t, l, e);
          a !== null && (nt(a, t, e), Uu(a, t, e)), t = { cache: Ai() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Rv(l, t, e) {
    var a = gt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Wn(l) ? Hr(t, e) : (e = gi(l, t, e, a), e !== null && (nt(e, l, a), qr(e, t, a)));
  }
  function Rr(l, t, e) {
    var a = gt();
    Gu(l, t, e, a);
  }
  function Gu(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Wn(l)) Hr(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var c = t.lastRenderedState, i = n(c, e);
          if (u.hasEagerState = !0, u.eagerState = i, st(i, c))
            return pn(l, t, u, 0), vl === null && An(), !1;
        } catch {
        }
      if (e = gi(l, t, u, a), e !== null)
        return nt(e, l, a), qr(e, t, a), !0;
    }
    return !1;
  }
  function Pi(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: Lf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Wn(l)) {
      if (t) throw Error(h(479));
    } else
      t = gi(
        l,
        e,
        a,
        2
      ), t !== null && nt(t, l, 2);
  }
  function Wn(l) {
    var t = l.alternate;
    return l === V || t !== null && t === V;
  }
  function Hr(l, t) {
    ja = Vn = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function qr(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Bo(l, e);
    }
  }
  var kn = {
    readContext: Zl,
    use: Jn,
    useCallback: Nl,
    useContext: Nl,
    useEffect: Nl,
    useImperativeHandle: Nl,
    useLayoutEffect: Nl,
    useInsertionEffect: Nl,
    useMemo: Nl,
    useReducer: Nl,
    useRef: Nl,
    useState: Nl,
    useDebugValue: Nl,
    useDeferredValue: Nl,
    useTransition: Nl,
    useSyncExternalStore: Nl,
    useId: Nl,
    useHostTransitionStatus: Nl,
    useFormState: Nl,
    useActionState: Nl,
    useOptimistic: Nl,
    useMemoCache: Nl,
    useCacheRefresh: Nl,
    useEffectEvent: Nl
  }, Br = {
    readContext: Zl,
    use: Jn,
    useCallback: function(l, t) {
      return Wl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Zl,
    useEffect: Er,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Fn(
        4194308,
        4,
        _r.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Fn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Fn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = Wl();
      t = t === void 0 ? null : t;
      var a = l();
      if (sa) {
        be(!0);
        try {
          l();
        } finally {
          be(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = Wl();
      if (e !== void 0) {
        var u = e(t);
        if (sa) {
          be(!0);
          try {
            e(t);
          } finally {
            be(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = Rv.bind(
        null,
        V,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Wl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Ji(l);
      var t = l.queue, e = Rr.bind(null, V, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: $i,
    useDeferredValue: function(l, t) {
      var e = Wl();
      return Wi(e, l, t);
    },
    useTransition: function() {
      var l = Ji(!1);
      return l = pr.bind(
        null,
        V,
        l.queue,
        !0,
        !1
      ), Wl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = V, u = Wl();
      if (K) {
        if (e === void 0)
          throw Error(h(407));
        e = e();
      } else {
        if (e = t(), vl === null)
          throw Error(h(349));
        (k & 127) !== 0 || er(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, Er(ur.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, Za(
        9,
        { destroy: void 0 },
        ar.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = Wl(), t = vl.identifierPrefix;
      if (K) {
        var e = Kt, a = Lt;
        e = (a & ~(1 << 32 - mt(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Ln++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = Ov++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Ii,
    useFormState: dr,
    useActionState: dr,
    useOptimistic: function(l) {
      var t = Wl();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = Pi.bind(
        null,
        V,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Vi,
    useCacheRefresh: function() {
      return Wl().memoizedState = Uv.bind(
        null,
        V
      );
    },
    useEffectEvent: function(l) {
      var t = Wl(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((nl & 2) !== 0)
          throw Error(h(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Yr = {
    readContext: Zl,
    use: Jn,
    useCallback: zr,
    useContext: Zl,
    useEffect: Fi,
    useImperativeHandle: Nr,
    useInsertionEffect: br,
    useLayoutEffect: Tr,
    useMemo: Or,
    useReducer: wn,
    useRef: gr,
    useState: function() {
      return wn(se);
    },
    useDebugValue: $i,
    useDeferredValue: function(l, t) {
      var e = Al();
      return Ar(
        e,
        sl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = wn(se)[0], t = Al().memoizedState;
      return [
        typeof l == "boolean" ? l : Yu(l),
        t
      ];
    },
    useSyncExternalStore: tr,
    useId: Cr,
    useHostTransitionStatus: Ii,
    useFormState: vr,
    useActionState: vr,
    useOptimistic: function(l, t) {
      var e = Al();
      return ir(e, sl, l, t);
    },
    useMemoCache: Vi,
    useCacheRefresh: Ur,
    useEffectEvent: Sr
  }, Hv = {
    readContext: Zl,
    use: Jn,
    useCallback: zr,
    useContext: Zl,
    useEffect: Fi,
    useImperativeHandle: Nr,
    useInsertionEffect: br,
    useLayoutEffect: Tr,
    useMemo: Or,
    useReducer: Ki,
    useRef: gr,
    useState: function() {
      return Ki(se);
    },
    useDebugValue: $i,
    useDeferredValue: function(l, t) {
      var e = Al();
      return sl === null ? Wi(e, l, t) : Ar(
        e,
        sl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Ki(se)[0], t = Al().memoizedState;
      return [
        typeof l == "boolean" ? l : Yu(l),
        t
      ];
    },
    useSyncExternalStore: tr,
    useId: Cr,
    useHostTransitionStatus: Ii,
    useFormState: hr,
    useActionState: hr,
    useOptimistic: function(l, t) {
      var e = Al();
      return sl !== null ? ir(e, sl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Vi,
    useCacheRefresh: Ur,
    useEffectEvent: Sr
  };
  function lf(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : w({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var tf = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = gt(), u = Me(a);
      u.payload = t, e != null && (u.callback = e), t = Ce(l, u, a), t !== null && (nt(t, l, a), Uu(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = gt(), u = Me(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = Ce(l, u, a), t !== null && (nt(t, l, a), Uu(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = gt(), a = Me(e);
      a.tag = 2, t != null && (a.callback = t), t = Ce(l, a, e), t !== null && (nt(t, l, e), Uu(t, l, e));
    }
  };
  function Gr(l, t, e, a, u, n, c) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, c) : t.prototype && t.prototype.isPureReactComponent ? !Nu(e, a) || !Nu(u, n) : !0;
  }
  function Xr(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && tf.enqueueReplaceState(t, t.state, null);
  }
  function da(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = w({}, e));
      for (var u in l)
        e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function Qr(l) {
    On(l);
  }
  function jr(l) {
    console.error(l);
  }
  function xr(l) {
    On(l);
  }
  function In(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Zr(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function ef(l, t, e) {
    return e = Me(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      In(l, t);
    }, e;
  }
  function Vr(l) {
    return l = Me(l), l.tag = 3, l;
  }
  function Lr(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        Zr(t, e, a);
      };
    }
    var c = e.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (l.callback = function() {
      Zr(t, e, a), typeof u != "function" && (Xe === null ? Xe = /* @__PURE__ */ new Set([this]) : Xe.add(this));
      var i = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: i !== null ? i : ""
      });
    });
  }
  function qv(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && na(
        t,
        e,
        u,
        !0
      ), e = Vl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
          case 19:
            return Fl === null ? Sc() : e.alternate === null && zl === 0 && (zl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Xn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), xf(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Xn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), xf(l, a, u)), !1;
        }
        throw Error(h(435, e.tag));
      }
      return xf(l, a, u), Sc(), !1;
    }
    if (K)
      return t = Vl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== _i && (l = Error(h(422), { cause: a }), Au(Nt(l, e)))) : (a !== _i && (t = Error(h(423), {
        cause: a
      }), Au(
        Nt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = Nt(a, e), u = ef(
        l.stateNode,
        a,
        u
      ), Ri(l, u), zl !== 4 && (zl = 2)), !1;
    var n = Error(h(520), { cause: a });
    if (n = Nt(n, e), Ku === null ? Ku = [n] : Ku.push(n), zl !== 4 && (zl = 2), t === null) return !0;
    a = Nt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = ef(e.stateNode, a, l), Ri(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Xe === null || !Xe.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Vr(u), Lr(
              u,
              l,
              e,
              a
            ), Ri(e, u), !1;
          break;
        case 22:
          if (e.memoizedState !== null)
            return e.flags |= 65536, !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var af = Error(h(461)), Cl = !1;
  function Rl(l, t, e, a) {
    t.child = l === null ? Fm(t, null, e, a) : ra(
      t,
      l.child,
      e,
      a
    );
  }
  function Kr(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a)
        i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return ca(t), a = Qi(
      l,
      t,
      e,
      c,
      n,
      u
    ), i = ji(), l !== null && !Cl ? (xi(l, t, u), de(l, t, u)) : (K && i && Un(t), t.flags |= 1, Rl(l, t, a, u), t.child);
  }
  function Jr(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !Ei(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, wr(
        l,
        t,
        n,
        a,
        u
      )) : (l = Mn(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !sf(l, u)) {
      var c = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Nu, e(c, a) && l.ref === t.ref)
        return de(l, t, u);
    }
    return t.flags |= 1, l = ie(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function wr(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Nu(n, a) && l.ref === t.ref)
        if (Cl = !1, t.pendingProps = a = n, sf(l, u))
          (l.flags & 131072) !== 0 && (Cl = !0);
        else
          return t.lanes = l.lanes, de(l, t, u);
    }
    return uf(
      l,
      t,
      e,
      a,
      u
    );
  }
  function Fr(l, t, e, a) {
    var u = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, t.child = null;
        return $r(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Yn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? km(t, n) : qi(), Im(t);
      else
        return a = t.lanes = 536870912, $r(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (Yn(t, n.cachePool), km(t, n), He(), t.memoizedState = null) : (l !== null && Yn(t, null), qi(), He());
    return Rl(l, t, u, e), t.child;
  }
  function Xu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function $r(l, t, e, a, u) {
    var n = Di();
    return n = n === null ? null : { parent: Dl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && Yn(t, null), qi(), Im(t), l !== null && na(l, t, a, !0), t.childLanes = u, null;
  }
  function Pn(l, t) {
    return t = lc(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Wr(l, t, e) {
    return ra(t, l.child, null, e), l = Pn(t, t.pendingProps), l.flags |= 2, dt(t), t.memoizedState = null, l;
  }
  function Bv(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (K) {
        if (a.mode === "hidden")
          return l = Pn(t, a), t.lanes = 536870912, l.memoizedState = { baseLanes: 0, cachePool: null }, Xu(null, l);
        if (Yi(t), (l = El) ? (l = _d(
          l,
          At
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ne !== null ? { id: Lt, overflow: Kt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Hm(l), e.return = t, t.child = e, Yl = t, El = null)) : l = null, l === null) throw Oe(t);
        return t.lanes = 536870912, null;
      }
      return Pn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if (Yi(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Wr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(h(558));
      else if (Cl || na(l, t, e, !1), u = (e & l.childLanes) !== 0, Cl || u) {
        if (Ue.current === null) {
          if (a = vl, a !== null && (c = Yo(a, e), c !== 0 && c !== n.retryLane))
            throw n.retryLane = c, ta(l, c), nt(a, l, c), af;
          Sc();
        }
        t = Wr(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, El = Dt(c.nextSibling), Yl = t, K = !0, ze = null, At = !1, l !== null && Ym(t, l), t = Pn(t, a), t.flags |= 134221824;
      return t;
    }
    return l = ie(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Va(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(h(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function uf(l, t, e, a, u) {
    return ca(t), e = Qi(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = ji(), l !== null && !Cl ? (xi(l, t, u), de(l, t, u)) : (K && a && Un(t), t.flags |= 1, Rl(l, t, e, u), t.child);
  }
  function kr(l, t, e, a, u, n) {
    return ca(t), t.updateQueue = null, e = lr(
      t,
      a,
      e,
      u
    ), Pm(l), a = ji(), l !== null && !Cl ? (xi(l, t, n), de(l, t, n)) : (K && a && Un(t), t.flags |= 1, Rl(l, t, e, n), t.child);
  }
  function Ir(l, t, e, a, u) {
    if (ca(t), t.stateNode === null) {
      var n = Ha, c = e.contextType;
      typeof c == "object" && c !== null && (n = Zl(c)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = tf, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Ci(t), c = e.contextType, n.context = typeof c == "object" && c !== null ? Zl(c) : Ha, n.state = t.memoizedState, c = e.getDerivedStateFromProps, typeof c == "function" && (lf(
        t,
        e,
        c,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (c = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), c !== n.state && tf.enqueueReplaceState(n, n.state, null), Hu(t, a, n, u), Ru(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps, o = da(e, i);
      n.props = o;
      var v = n.context, E = e.contextType;
      c = Ha, typeof E == "object" && E !== null && (c = Zl(E));
      var T = e.getDerivedStateFromProps;
      E = typeof T == "function" || typeof n.getSnapshotBeforeUpdate == "function", i = t.pendingProps !== i, E || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i || v !== c) && Xr(
        t,
        n,
        a,
        c
      ), De = !1;
      var s = t.memoizedState;
      n.state = s, Hu(t, a, n, u), Ru(), v = t.memoizedState, i || s !== v || De ? (typeof T == "function" && (lf(
        t,
        e,
        T,
        a
      ), v = t.memoizedState), (o = De || Gr(
        t,
        e,
        o,
        a,
        s,
        v,
        c
      )) ? (E || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = v), n.props = a, n.state = v, n.context = c, a = o) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, Ui(l, t), c = t.memoizedProps, E = da(e, c), n.props = E, T = t.pendingProps, s = n.context, v = e.contextType, o = Ha, typeof v == "object" && v !== null && (o = Zl(v)), i = e.getDerivedStateFromProps, (v = typeof i == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c !== T || s !== o) && Xr(
        t,
        n,
        a,
        o
      ), De = !1, s = t.memoizedState, n.state = s, Hu(t, a, n, u), Ru();
      var g = t.memoizedState;
      c !== T || s !== g || De || l !== null && l.dependencies !== null && qn(l.dependencies) ? (typeof i == "function" && (lf(
        t,
        e,
        i,
        a
      ), g = t.memoizedState), (E = De || Gr(
        t,
        e,
        E,
        a,
        s,
        g,
        o
      ) || l !== null && l.dependencies !== null && qn(l.dependencies)) ? (v || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, g, o), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        g,
        o
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && s === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && s === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = g), n.props = a, n.state = g, n.context = o, a = E) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && s === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && s === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, Va(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = ra(
      t,
      l.child,
      null,
      u
    ), t.child = ra(
      t,
      null,
      e,
      u
    )) : Rl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = de(
      l,
      t,
      u
    ), l;
  }
  function Pr(l, t, e, a) {
    return aa(), t.flags |= 256, Rl(l, t, e, a), t.child;
  }
  var nf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function cf(l) {
    return { baseLanes: l, cachePool: Zm() };
  }
  function ff(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= ht), l;
  }
  function ls(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, c;
    if ((c = n) || (c = l !== null && l.memoizedState === null ? !1 : (Ll.current & 2) !== 0), c && (u = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (K) {
        if (u ? Re(t) : He(), (l = El) ? (l = _d(
          l,
          At
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ne !== null ? { id: Lt, overflow: Kt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Hm(l), e.return = t, t.child = e, Yl = t, El = null)) : l = null, l === null) throw Oe(t);
        return io(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return n = a.children, a = a.fallback, u ? (He(), u = t.mode, n = lc(
        { mode: "hidden", children: n },
        u
      ), a = ea(
        a,
        u,
        e,
        null
      ), n.return = t, a.return = t, n.sibling = a, t.child = n, a = t.child, a.memoizedState = cf(e), a.childLanes = ff(
        l,
        c,
        e
      ), t.memoizedState = nf, Xu(null, a)) : (Re(t), of(t, n));
    }
    var i = l.memoizedState;
    if (i !== null) {
      var o = i.dehydrated;
      if (o !== null)
        return Yv(
          l,
          t,
          n,
          c,
          a,
          o,
          i,
          e
        );
    }
    return u ? (He(), u = a.fallback, n = t.mode, i = l.child, o = i.sibling, a = ie(i, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = i.subtreeFlags & 1206910976, o !== null ? u = ie(o, u) : (u = ea(
      u,
      n,
      e,
      null
    ), u.flags |= 2), u.return = t, a.return = t, a.sibling = u, t.child = a, Xu(null, a), a = t.child, u = l.child.memoizedState, u === null ? u = cf(e) : (n = u.cachePool, n !== null ? (i = Dl._currentValue, n = n.parent !== i ? { parent: i, pool: i } : n) : n = Zm(), u = {
      baseLanes: u.baseLanes | e,
      cachePool: n
    }), a.memoizedState = u, a.childLanes = ff(
      l,
      c,
      e
    ), t.memoizedState = nf, Xu(l.child, a)) : (Re(t), e = l.child, l = e.sibling, e = ie(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (c = t.deletions, c === null ? (t.deletions = [l], t.flags |= 16) : c.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function of(l, t) {
    return t = lc(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function lc(l, t) {
    return l = tt(22, l, null, t), l.lanes = 0, l;
  }
  function tc(l, t, e) {
    return ra(t, l.child, null, e), l = of(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Yv(l, t, e, a, u, n, c, i) {
    if (e)
      return t.flags & 256 ? (Re(t), t.flags &= -257, tc(
        l,
        t,
        i
      )) : t.memoizedState !== null ? (He(), t.child = l.child, t.flags |= 128, null) : (He(), n = u.fallback, c = t.mode, u = lc(
        { mode: "visible", children: u.children },
        c
      ), n = ea(
        n,
        c,
        i,
        null
      ), n.flags |= 2, u.return = t, n.return = t, u.sibling = n, t.child = u, ra(t, l.child, null, i), u = t.child, u.memoizedState = cf(i), u.childLanes = ff(
        l,
        a,
        i
      ), t.memoizedState = nf, Xu(null, u));
    if (Re(t), io(n)) {
      if (a = n.nextSibling && n.nextSibling.dataset, a) var o = a.dgst;
      return a = o, a !== "" && (u = Error(h(419)), u.stack = "", u.digest = a, Au({ value: u, source: null, stack: null })), tc(
        l,
        t,
        i
      );
    }
    if (Cl || na(l, t, i, !1), a = (i & l.childLanes) !== 0, Cl || a) {
      if (Ue.current !== null)
        return tc(
          l,
          t,
          i
        );
      if (a = vl, a !== null && (u = Yo(
        a,
        i
      ), u !== 0 && u !== c.retryLane))
        throw c.retryLane = u, ta(l, u), nt(a, l, u), af;
      return co(n) || Sc(), tc(
        l,
        t,
        i
      );
    }
    return co(n) ? (t.flags |= 192, t.child = l.child, null) : (l = c.treeContext, El = Dt(n.nextSibling), Yl = t, K = !0, ze = null, At = !1, l !== null && Ym(t, l), t = of(
      t,
      u.children
    ), t.flags |= 134221824, t);
  }
  function ts(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Hn(l.return, t, e);
  }
  function es(l) {
    for (var t = null; l !== null; ) {
      var e = l.alternate;
      e !== null && Zn(e) === null && (t = l), l = l.sibling;
    }
    return t;
  }
  function ec(l, t, e, a, u, n) {
    var c = l.memoizedState;
    c === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = e, c.tailMode = u, c.treeForkCount = n);
  }
  function mf(l) {
    var t = l.child;
    for (l.child = null; t !== null; ) {
      var e = t.sibling;
      t.sibling = l.child, l.child = t, t = e;
    }
  }
  function rf(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var c = Ll.current;
    if (t.flags & 128)
      return qu(t, c), null;
    var i = (c & 2) !== 0;
    if (i ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, qu(t, c), u === "backwards" && l !== null ? (mf(l), Rl(l, t, a, e), mf(l)) : Rl(l, t, a, e), a = K ? Ou : 0, !i && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && ts(l, e, t);
        else if (l.tag === 19)
          ts(l, e, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (u) {
      case "backwards":
        e = es(t.child), e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null, mf(t)), ec(
          t,
          !0,
          u,
          null,
          n,
          a
        );
        break;
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && Zn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        ec(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        ec(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        e = es(t.child), e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), ec(
          t,
          !1,
          u,
          e,
          n,
          a
        );
    }
    return t.child;
  }
  function as(l, t, e) {
    var a = t.pendingProps;
    return Ae(t, t.type, a.value), Rl(l, t, a.children, e), t.child;
  }
  function de(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), Ge |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (na(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(h(153));
    if (t.child !== null) {
      for (l = t.child, e = ie(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = ie(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function sf(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && qn(l)));
  }
  function Gv(l, t, e) {
    switch (t.tag) {
      case 3:
        cn(t, t.stateNode.containerInfo), Ae(t, Dl, l.memoizedState.cache), aa();
        break;
      case 27:
      case 5:
        Xc(t);
        break;
      case 4:
        cn(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ae(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Yi(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Re(t), t.flags |= 128, null;
          a = na(
            l,
            t,
            e,
            !1
          );
          var u = t.child.childLanes;
          return a || (e & u) !== 0 ? ls(l, t, e) : (Re(t), l = de(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        }
        Re(t);
        break;
      case 19:
        if (t.flags & 128)
          return rf(
            l,
            t,
            e
          );
        if (u = (l.flags & 128) !== 0, a = (e & t.childLanes) !== 0, a || (na(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return rf(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), qu(t, Ll.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Fr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        Ae(t, Dl, l.memoizedState.cache);
    }
    return de(l, t, e);
  }
  function us(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Cl = !0;
      else {
        if (!sf(l, e) && (t.flags & 128) === 0)
          return Cl = !1, Gv(
            l,
            t,
            e
          );
        Cl = (l.flags & 131072) !== 0;
      }
    else
      Cl = !1, K && (t.flags & 1048576) !== 0 && Bm(t, Ou, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = oa(t.elementType), t.type = l, typeof l == "function")
            Ei(l) ? (a = da(l, a), t.tag = 1, t = Ir(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = uf(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === O) {
                t.tag = 11, t = Kr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === dl) {
                t.tag = 14, t = Jr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === ql) {
                t.tag = 10, t.type = l, t = as(
                  null,
                  t,
                  e
                );
                break l;
              }
            }
            throw t = tl(l) || l, Error(h(306, t, ""));
          }
        }
        return t;
      case 0:
        return uf(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = da(
          a,
          t.pendingProps
        ), Ir(
          l,
          t,
          a,
          u,
          e
        );
      case 3:
        l: {
          if (cn(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(h(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, Ui(l, t), Hu(t, a, null, e);
          var c = t.memoizedState;
          if (a = c.cache, Ae(t, Dl, a), a !== n.cache && Oi(
            t,
            [Dl],
            e,
            !0
          ), Ru(), a = c.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Pr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = Nt(
                Error(h(424)),
                t
              ), Au(u), t = Pr(
                l,
                t,
                a,
                e
              );
              break l;
            } else
              for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, El = Dt(l.firstChild), Yl = t, K = !0, ze = null, At = !0, e = Fm(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 134221824, e = e.sibling;
          else {
            if (aa(), a === u) {
              t = de(
                l,
                t,
                e
              );
              break l;
            }
            Rl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Va(l, t), l === null ? (e = Md(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : K || (t.stateNode = fd(
          t.type,
          t.pendingProps,
          Ee.current,
          t
        )) : t.memoizedState = Md(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Xc(t), l === null && K && (a = t.stateNode = Od(
          t.type,
          t.pendingProps,
          Ee.current
        ), Yl = t, At = !0, u = El, xe(t.type) ? (fo = u, El = Dt(a.firstChild)) : El = u), Rl(
          l,
          t,
          t.pendingProps.children,
          e
        ), Va(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && K && ((u = a = El) && (a = Uy(
          a,
          t.type,
          t.pendingProps,
          At
        ), a !== null ? (t.stateNode = a, Yl = t, El = Dt(a.firstChild), At = !1, u = !0) : u = !1), u || Oe(t)), Xc(t), u = t.type, n = t.pendingProps, c = l !== null ? l.memoizedProps : null, a = n.children, Pf(u, n) ? a = null : c !== null && Pf(u, c) && (t.flags |= 32), t.memoizedState !== null && (u = Qi(
          l,
          t,
          Av,
          null,
          null,
          e
        ), iu._currentValue = u), Va(l, t), Rl(l, t, a, e), t.child;
      case 6:
        return l === null && K && ((l = e = El) && (e = Ry(
          e,
          t.pendingProps,
          At
        ), e !== null ? (t.stateNode = e, Yl = t, El = null, l = !0) : l = !1), l || Oe(t)), null;
      case 13:
        return ls(l, t, e);
      case 4:
        return cn(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ra(
          t,
          null,
          a,
          e
        ) : Rl(l, t, a, e), t.child;
      case 11:
        return Kr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return a = t.pendingProps, Va(l, t), Rl(l, t, a, e), t.child;
      case 8:
        return Rl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return Rl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return as(l, t, e);
      case 9:
        return u = t.type._context, a = t.pendingProps.children, ca(t), u = Zl(u), a = a(u), t.flags |= 1, Rl(l, t, a, e), t.child;
      case 14:
        return Jr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return wr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return rf(l, t, e);
      case 31:
        return Bv(l, t, e);
      case 22:
        return Fr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ca(t), a = Zl(Dl), l === null ? (u = Di(), u === null && (u = vl, n = Ai(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Ci(t), Ae(t, Dl, u)) : ((l.lanes & e) !== 0 && (Ui(l, t), Hu(t, null, null, e), Ru()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ae(t, Dl, a)) : (a = n.cache, Ae(t, Dl, a), a !== u.cache && Oi(
          t,
          [Dl],
          e,
          !0
        ))), Rl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 30:
        return t.stateNode === null && (t.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), a = t.pendingProps, a.name != null && a.name !== "auto" ? t.flags |= l === null ? 18882560 : 18874368 : K && Un(t), l !== null && l.memoizedProps.name !== a.name ? t.flags |= 4194816 : Va(l, t), Rl(l, t, a.children, e), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(h(156, t.tag));
  }
  function ve(l) {
    l.flags |= 4;
  }
  function df(l, t, e, a, u) {
    var n;
    if ((n = (l.mode & 32) !== 0) && (n = e === null ? Hd(t, a) : Hd(t, a) && (a.src !== e.src || a.srcSet !== e.srcSet)), n) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (Qs()) l.flags |= 8192;
        else
          throw ma = Xn, Mi;
    } else l.flags &= -16777217;
  }
  function ns(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !qd(t))
      if (Qs()) l.flags |= 8192;
      else
        throw ma = Xn, Mi;
  }
  function ac(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Ho() : 536870912, l.lanes |= t, Fa |= t);
  }
  function Qu(l, t) {
    if (!K)
      switch (l.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var e = l.tail, a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
          break;
        default:
          for (t = l.tail, e = null; t !== null; )
            t.alternate !== null && (e = t), t = t.sibling;
          e === null ? l.tail = null : e.sibling = null;
      }
  }
  function Sl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 1206910976, a |= u.flags & 1206910976, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function Xv(l, t, e) {
    var a = t.pendingProps;
    switch (Ti(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Sl(t), null;
      case 1:
        return Sl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), me(Dl), ba(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ya(t) ? ve(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ni())), Sl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (ve(t), n !== null ? (Sl(t), ns(t, n)) : (Sl(t), df(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (ve(t), Sl(t), ns(t, n)) : (Sl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ve(t), Sl(t), df(
          t,
          u,
          l,
          a,
          e
        )), null;
      case 27:
        if (fn(t), e = Ee.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ve(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(h(166));
            return Sl(t), t.subtreeFlags &= -33554433, null;
          }
          l = Zt.current, Ya(t) ? Gm(t) : (l = Od(u, a, e), t.stateNode = l, ve(t));
        }
        return Sl(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (fn(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ve(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(h(166));
            return Sl(t), t.subtreeFlags &= -33554433, null;
          }
          if (n = Zt.current, Ya(t))
            Gm(t);
          else {
            var c = Wu(
              Ee.current
            );
            switch (n) {
              case 1:
                n = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = c.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? c.createElement("select", {
                      is: a.is
                    }) : c.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? c.createElement(u, { is: a.is }) : c.createElement(u);
                }
            }
            n[xl] = t, n[lt] = a;
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t)
                  break l;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            t.stateNode = n;
            l: switch (Jl(n, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && ve(t);
          }
        }
        return Sl(t), t.subtreeFlags &= -33554433, df(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && ve(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(h(166));
          if (l = Ee.current, Ya(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Yl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[xl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || ud(l.nodeValue, e)), l || Oe(t, !0);
          } else
            l = Wu(l).createTextNode(
              a
            ), l[xl] = t, t.stateNode = l;
        }
        return Sl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ya(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(h(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(h(557));
              l[xl] = t;
            } else
              aa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Sl(t), l = !1;
          } else
            e = Ni(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (dt(t), t) : (dt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(h(558));
        }
        return Sl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = Ya(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(h(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(h(317));
              u[xl] = t;
            } else
              aa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Sl(t), u = !1;
          } else
            u = Ni(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (dt(t), t) : (dt(t), null);
        }
        return dt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), ac(t, t.updateQueue), Sl(t), null);
      case 4:
        return ba(), l === null && Ff(t.stateNode.containerInfo), t.flags |= 67108864, Sl(t), null;
      case 10:
        return me(t.type), Sl(t), null;
      case 19:
        if (Gi(t), a = t.memoizedState, a === null) return Sl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) Qu(a, !1);
          else {
            if (zl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Zn(l), n !== null) {
                  for (t.flags |= 128, Qu(a, !1), l = n.updateQueue, t.updateQueue = l, ac(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    Rm(e, l), e = e.sibling;
                  return qu(
                    t,
                    Ll.current & 1 | 2
                  ), K && fe(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && ft() > yc && (t.flags |= 128, u = !0, Qu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Zn(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, ac(t, l), Qu(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !n.alternate && !K)
                return Sl(t), null;
            } else
              2 * ft() - a.renderingStartTime > yc && e !== 536870912 && (t.flags |= 128, u = !0, Qu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        if (a.tail !== null) {
          l = a.tail;
          l: {
            for (e = l; e !== null; ) {
              if (e.alternate !== null) {
                e = !1;
                break l;
              }
              e = e.sibling;
            }
            e = !0;
          }
          return a.rendering = l, a.tail = l.sibling, a.renderingStartTime = ft(), l.sibling = null, n = Ll.current, n = u ? n & 1 | 2 : n & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !e || K ? qu(t, n) : (e = n, gl(Vl, t), gl(Ll, e), Fl === null && (Fl = t)), K && fe(t, a.treeForkCount), l;
        }
        return Sl(t), null;
      case 22:
      case 23:
        return dt(t), Bi(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Sl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Sl(t), e = t.updateQueue, e !== null && ac(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && jl(fa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), me(Dl), Sl(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Sl(t), null;
    }
    throw Error(h(156, t.tag));
  }
  function Qv(l, t) {
    switch (Ti(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return me(Dl), ba(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return fn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (dt(t), t.alternate === null)
            throw Error(h(340));
          aa();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (dt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(h(340));
          aa();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return Gi(t), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null), t.flags |= 4, t) : null;
      case 4:
        return ba(), null;
      case 10:
        return me(t.type), null;
      case 22:
      case 23:
        return dt(t), Bi(), l !== null && jl(fa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return me(Dl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function cs(l, t) {
    switch (Ti(t), t.tag) {
      case 3:
        me(Dl), ba();
        break;
      case 26:
      case 27:
      case 5:
        fn(t);
        break;
      case 4:
        ba();
        break;
      case 31:
        t.memoizedState !== null && dt(t);
        break;
      case 13:
        dt(t);
        break;
      case 19:
        Gi(t);
        break;
      case 10:
        me(t.type);
        break;
      case 22:
      case 23:
        dt(t), Bi(), l !== null && jl(fa);
        break;
      case 24:
        me(Dl);
    }
  }
  function ju(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create, c = e.inst;
            a = n(), c.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (i) {
      ml(t, t.return, i);
    }
  }
  function qe(l, t, e) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var c = a.inst, i = c.destroy;
            if (i !== void 0) {
              c.destroy = void 0, u = t;
              var o = e, v = i;
              try {
                v();
              } catch (E) {
                ml(
                  u,
                  o,
                  E
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (E) {
      ml(t, t.return, E);
    }
  }
  function is(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Wm(t, e);
      } catch (a) {
        ml(l, l.return, a);
      }
    }
  }
  function fs(l, t, e) {
    e.props = da(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      ml(l, t, a);
    }
  }
  function Jt(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            var u = l.stateNode, n = ne(l.memoizedProps, u);
            (u.ref === null || u.ref.name !== n) && (u.ref = yd(n)), a = u.ref;
            break;
          case 7:
            if (l.stateNode === null) {
              var c = new Et(l);
              S(
                l.child,
                !1,
                My,
                c,
                void 0,
                void 0
              ), l.stateNode = c;
            }
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (i) {
      ml(l, t, i);
    }
  }
  function Kl(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          ml(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          ml(l, t, u);
        }
      else e.current = null;
  }
  function uc(l, t) {
    if ((l.tag === 5 || l.tag === 27 || l.tag === 6) && l.alternate === null && t !== null)
      for (var e = 0; e < t.length; e++)
        Td(
          l.stateNode,
          t[e]
        );
  }
  function os(l) {
    for (var t = l.return; t !== null && (yf(t) && Td(l.stateNode, t.stateNode), !vf(t)); )
      t = t.return;
  }
  function xu(l) {
    for (var t = l.return; t !== null && (yf(t) && Cy(l.stateNode, t.stateNode), !vf(t)); )
      t = t.return;
  }
  function vf(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 27;
  }
  function yf(l) {
    return l && l.tag === 7 && l.stateNode !== null;
  }
  function hf(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      ml(l, l.return, u);
    }
  }
  function gf(l, t, e) {
    try {
      var a = l.stateNode;
      ry(a, l.type, e, t), a[lt] = t;
    } catch (u) {
      ml(l, l.return, u);
    }
  }
  function ms(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && xe(l.type) || l.tag === 4;
  }
  function Ef(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || ms(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && xe(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Sf(l, t, e, a) {
    var u = l.tag;
    if (u === 5 || u === 6)
      u = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(u, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(u), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Vt)), uc(l, a), el = !0;
    else if (u !== 4 && (u === 27 && (uc(l, a), a = null, xe(l.type) && (e = l.stateNode, t = null)), l = l.child, l !== null))
      for (Sf(
        l,
        t,
        e,
        a
      ), l = l.sibling; l !== null; )
        Sf(
          l,
          t,
          e,
          a
        ), l = l.sibling;
  }
  function nc(l, t, e, a) {
    var u = l.tag;
    if (u === 5 || u === 6)
      u = l.stateNode, t ? e.insertBefore(u, t) : e.appendChild(u), uc(l, a), el = !0;
    else if (u !== 4 && (u === 27 && (uc(l, a), a = null, xe(l.type) && (e = l.stateNode)), l = l.child, l !== null))
      for (nc(
        l,
        t,
        e,
        a
      ), l = l.sibling; l !== null; )
        nc(
          l,
          t,
          e,
          a
        ), l = l.sibling;
  }
  function rs(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Jl(t, a, e), t[xl] = l, t[lt] = e;
    } catch (n) {
      ml(l, l.return, n);
    }
  }
  var cc = !1, vt = null;
  function ss(l) {
    (l.tag === 30 || (l.subtreeFlags & 33554432) !== 0) && (cc = !0);
  }
  var wt = null;
  function ds() {
    var l = wt;
    return wt = null, l;
  }
  var et = 0;
  function La(l, t, e, a, u) {
    return et = 0, vs(
      l.child,
      t,
      e,
      a,
      u
    );
  }
  function vs(l, t, e, a, u) {
    for (var n = !1; l !== null; ) {
      if (l.tag === 5) {
        var c = l.stateNode;
        if (a !== null) {
          var i = eo(c);
          a.push(i), i.view && (n = !0);
        } else
          n || eo(c).view && (n = !0);
        cc = !0, dd(
          c,
          et === 0 ? t : t + "_" + et,
          e
        ), et++;
      } else (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && u || vs(
        l.child,
        t,
        e,
        a,
        u
      ) && (n = !0));
      l = l.sibling;
    }
    return n;
  }
  function Ft(l, t) {
    for (; l !== null; )
      l.tag === 5 ? vd(l.stateNode, l.memoizedProps) : (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && t || Ft(
        l.child,
        t
      )), l = l.sibling;
  }
  function ic(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if ((l.tag !== 22 || l.memoizedState === null) && (ic(l), l.tag === 30 && (l.flags & 18874368) !== 0 && l.stateNode.paired)) {
          var t = l.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(h(544));
          var e = t.name;
          t = ce(t.default, t.share), t !== "none" && (La(
            l,
            e,
            t,
            null,
            !1
          ) || Ft(l.child, !1));
        }
        l = l.sibling;
      }
  }
  function bf(l, t) {
    if (l.tag === 30) {
      var e = l.stateNode, a = l.memoizedProps, u = ne(a, e), n = ce(
        a.default,
        e.paired ? a.share : a.enter
      );
      n !== "none" ? La(l, u, n, null, !1) ? (ic(l), e.paired || t || Ia(l, a.onEnter)) : Ft(l.child, !1) : ic(l);
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        bf(l, t), l = l.sibling;
    else ic(l);
  }
  function Tf(l) {
    if (vt !== null && vt.size !== 0) {
      var t = vt;
      if ((l.subtreeFlags & 18874368) !== 0)
        for (l = l.child; l !== null; ) {
          if (l.tag !== 22 || l.memoizedState === null) {
            if (l.tag === 30 && (l.flags & 18874368) !== 0) {
              var e = l.memoizedProps, a = e.name;
              if (a != null && a !== "auto") {
                var u = t.get(a);
                if (u !== void 0) {
                  var n = ce(
                    e.default,
                    e.share
                  );
                  if (n !== "none" && (La(
                    l,
                    a,
                    n,
                    null,
                    !1
                  ) ? (n = l.stateNode, u.paired = n, n.paired = u, Ia(l, e.onShare)) : Ft(l.child, !1)), t.delete(a), t.size === 0) break;
                }
              }
            }
            Tf(l);
          }
          l = l.sibling;
        }
    }
  }
  function _f(l) {
    if (l.tag === 30) {
      var t = l.memoizedProps, e = ne(t, l.stateNode), a = vt !== null ? vt.get(e) : void 0, u = ce(
        t.default,
        a !== void 0 ? t.share : t.exit
      );
      u !== "none" && (La(l, e, u, null, !1) ? a !== void 0 ? (u = l.stateNode, a.paired = u, u.paired = a, vt.delete(e), Ia(l, t.onShare)) : Ia(l, t.onExit) : Ft(l.child, !1)), vt !== null && Tf(l);
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        _f(l), l = l.sibling;
    else
      vt !== null && Tf(l);
  }
  function ys(l) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var t = l.memoizedProps, e = ne(t, l.stateNode);
        t = ce(t.default, t.update), l.flags &= -5, t !== "none" && La(
          l,
          e,
          t,
          l.memoizedState = [],
          !1
        );
      } else
        (l.subtreeFlags & 33554432) !== 0 && ys(l);
      l = l.sibling;
    }
  }
  function Nf(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if (l.tag !== 22 || l.memoizedState === null) {
          if (l.tag === 30 && (l.flags & 18874368) !== 0) {
            var t = l.stateNode;
            t.paired !== null && (t.paired = null, Ft(l.child, !1));
          }
          Nf(l);
        }
        l = l.sibling;
      }
  }
  function fc(l) {
    if (l.tag === 30)
      l.stateNode.paired = null, Ft(l.child, !1), Nf(l);
    else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; )
        fc(l), l = l.sibling;
    else Nf(l);
  }
  function hs(l) {
    for (l = l.child; l !== null; )
      l.tag === 30 ? Ft(l.child, !1) : (l.subtreeFlags & 33554432) !== 0 && hs(l), l = l.sibling;
  }
  function zf(l, t, e, a, u, n, c) {
    for (var i = !1; t !== null; ) {
      if (t.tag === 5) {
        var o = t.stateNode;
        if (n !== null && et < n.length) {
          var v = n[et], E = eo(o);
          (v.view || E.view) && (i = !0);
          var T;
          if (T = (l.flags & 4) === 0)
            if (E.clip) T = !0;
            else {
              T = v.rect;
              var s = E.rect;
              T = T.y !== s.y || T.x !== s.x || T.height !== s.height || T.width !== s.width;
            }
          T && (l.flags |= 4), E.abs ? E = !v.abs : (v = v.rect, E = E.rect, E = v.height !== E.height || v.width !== E.width), E && (l.flags |= 32);
        } else l.flags |= 32;
        (l.flags & 4) !== 0 && dd(
          o,
          et === 0 ? e : e + "_" + et,
          u
        ), i && (l.flags & 4) !== 0 || (wt === null && (wt = []), wt.push(
          o,
          et === 0 ? a : a + "_" + et,
          t.memoizedProps
        )), et++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && c ? l.flags |= t.flags & 32 : zf(
        l,
        t.child,
        e,
        a,
        u,
        n,
        c
      ) && (i = !0));
      t = t.sibling;
    }
    return i;
  }
  function gs(l, t) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var e = l.memoizedProps, a = l.stateNode, u = ne(e, a), n = ce(e.default, e.update), c;
        c = l.memoizedState, l.memoizedState = null, a = l;
        var i = l.child;
        et = 0, u = zf(
          a,
          i,
          u,
          u,
          n,
          c,
          !1
        ), (l.flags & 4) !== 0 && u && Ia(l, e.onUpdate);
      } else
        (l.subtreeFlags & 33554432) !== 0 && gs(l);
      l = l.sibling;
    }
  }
  var Gl = !1, fl = !1, $t = !1, Of = !1, Es = typeof WeakSet == "function" ? WeakSet : Set, Xl = null, Wt = !1, Zu = !1, oc = !1, Af = !1;
  function jv(l, t, e) {
    if (l = l.containerInfo, kf = fu, l = _m(l), ri(l)) {
      if ("selectionStart" in l)
        var a = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          a = (a = l.ownerDocument) && a.defaultView || window;
          var u = a.getSelection && a.getSelection();
          if (u && u.rangeCount !== 0) {
            a = u.anchorNode;
            var n = u.anchorOffset, c = u.focusNode;
            u = u.focusOffset;
            try {
              a.nodeType, c.nodeType;
            } catch {
              a = null;
              break l;
            }
            var i = 0, o = -1, v = -1, E = 0, T = 0, s = l, g = null;
            t: for (; ; ) {
              for (var z; s !== a || n !== 0 && s.nodeType !== 3 || (o = i + n), s !== c || u !== 0 && s.nodeType !== 3 || (v = i + u), s.nodeType === 3 && (i += s.nodeValue.length), (z = s.firstChild) !== null; )
                g = s, s = z;
              for (; ; ) {
                if (s === l) break t;
                if (g === a && ++E === n && (o = i), g === c && ++T === u && (v = i), (z = s.nextSibling) !== null) break;
                s = g, g = s.parentNode;
              }
              s = z;
            }
            a = o === -1 || v === -1 ? null : { start: o, end: v };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (If = { focusedElem: l, selectionRange: a }, fu = !1, e = (e & 335544064) === e, Xl = t, t = e ? 9270 : 1024; Xl !== null; ) {
      if (l = Xl, e && (a = l.deletions, a !== null))
        for (n = 0; n < a.length; n++)
          e && _f(a[n]);
      if (l.alternate === null && (l.flags & 2) !== 0)
        e && ss(l), mc(e);
      else {
        if (l.tag === 22) {
          if (a = l.alternate, l.memoizedState !== null) {
            a !== null && a.memoizedState === null && e && _f(a), mc(e);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            e && ss(l), mc(e);
            continue;
          }
        }
        a = l.child, (l.subtreeFlags & t) !== 0 && a !== null ? (a.return = l, Xl = a) : (e && ys(l), mc(e));
      }
    }
    vt = null;
  }
  function mc(l) {
    for (; Xl !== null; ) {
      var t = Xl, e = l, a = t.alternate, u = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && a !== null) {
            e = void 0, u = a.memoizedProps, a = a.memoizedState;
            var n = t.stateNode;
            try {
              var c = da(
                t.type,
                u
              );
              e = n.getSnapshotBeforeUpdate(
                c,
                a
              ), n.__reactInternalSnapshotBeforeUpdate = e;
            } catch (i) {
              ml(t, t.return, i);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (a = t.stateNode.containerInfo, e = a.nodeType, e === 9)
              no(a);
            else if (e === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  no(a);
                  break;
                default:
                  a.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          e && a !== null && (e = ne(
            a.memoizedProps,
            a.stateNode
          ), u = t.memoizedProps, u = ce(u.default, u.update), u !== "none" && La(
            a,
            e,
            u,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(h(163));
      }
      if (a = t.sibling, a !== null) {
        a.return = t.return, Xl = a;
        break;
      }
      Xl = t.return;
    }
  }
  function Ss(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        kt(l, e), a & 4 && ju(5, e);
        break;
      case 1:
        if (kt(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (c) {
              ml(e, e.return, c);
            }
          else {
            var u = da(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                u,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              ml(
                e,
                e.return,
                c
              );
            }
          }
        a & 64 && is(e), a & 512 && Jt(e, e.return);
        break;
      case 3:
        if (kt(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Wm(l, t);
          } catch (c) {
            ml(e, e.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && rs(e);
      case 26:
      case 5:
        kt(l, e), t === null && a & 4 && hf(e), a & 512 && Jt(e, e.return);
        break;
      case 12:
        kt(l, e);
        break;
      case 31:
        kt(l, e), a & 4 && Ns(l, e);
        break;
      case 13:
        kt(l, e), a & 4 && zs(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Iv.bind(
          null,
          e
        ), Hy(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Gl, !a) {
          var n = t !== null && t.memoizedState !== null || fl;
          t = Gl, u = fl, Gl = a, (fl = n) && !u ? (a = 2, (e.subtreeFlags & 8772) !== 0 && (a |= 1), Bt(
            l,
            e,
            a
          )) : kt(l, e), Gl = t, fl = u;
        }
        break;
      case 30:
        kt(l, e), a & 512 && Jt(e, e.return);
        break;
      case 7:
        a & 512 && Jt(e, e.return);
      default:
        kt(l, e);
    }
  }
  function pf(l, t) {
    for (l = l.child; l !== null; )
      bs(l, t), l = l.sibling;
  }
  function bs(l, t) {
    switch (l.tag) {
      case 5:
      case 26:
        try {
          var e = l.stateNode;
          if (t) {
            var a = e.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var u = l.stateNode, n = l.memoizedProps.style, c = n != null && n.hasOwnProperty("display") ? n.display : null;
            u.style.display = c == null || typeof c == "boolean" ? "" : ("" + c).trim();
          }
        } catch (o) {
          ml(l, l.return, o);
        }
        Df(l, t);
        break;
      case 6:
        try {
          l.stateNode.nodeValue = t ? "" : l.memoizedProps, el = !0;
        } catch (o) {
          ml(l, l.return, o);
        }
        break;
      case 18:
        try {
          var i = l.stateNode;
          t ? sd(i, !0) : sd(l.stateNode, !1);
        } catch (o) {
          ml(l, l.return, o);
        }
        break;
      case 22:
      case 23:
        l.memoizedState === null && pf(l, t);
        break;
      default:
        pf(l, t);
    }
  }
  function Df(l, t) {
    if (l.subtreeFlags & 67108864)
      for (l = l.child; l !== null; ) {
        l: {
          var e = l, a = t;
          switch (e.tag) {
            case 4:
              bs(e, a);
              break l;
            case 22:
              e.memoizedState === null && Df(e, a);
              break l;
            default:
              Df(e, a);
          }
        }
        l = l.sibling;
      }
  }
  function Ts(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Ts(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && yn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var bl = null, at = !1;
  function Ht(l, t, e) {
    for (e = e.child; e !== null; )
      _s(l, t, e), e = e.sibling;
  }
  function _s(l, t, e) {
    if (ot && typeof ot.onCommitFiberUnmount == "function")
      try {
        ot.onCommitFiberUnmount(ru, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        fl || Kl(e, t), Ht(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && !fl && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        fl || Kl(e, t), xu(e);
        var a = bl, u = at;
        xe(e.type) && (bl = e.stateNode, at = !1), Ht(
          l,
          t,
          e
        ), Ad(
          e.stateNode,
          e.type,
          e.memoizedProps
        ), bl = a, at = u;
        break;
      case 5:
        fl || Kl(e, t), xu(e);
      case 6:
        if (e.tag === 6 && xu(e), a = bl, u = at, bl = null, Ht(
          l,
          t,
          e
        ), bl = a, at = u, bl !== null)
          if (at)
            try {
              (bl.nodeType === 9 ? bl.body : bl.nodeName === "HTML" ? bl.ownerDocument.body : bl).removeChild(e.stateNode), el = !0;
            } catch (n) {
              ml(
                e,
                t,
                n
              );
            }
          else
            try {
              bl.removeChild(e.stateNode), el = !0;
            } catch (n) {
              ml(
                e,
                t,
                n
              );
            }
        break;
      case 18:
        bl !== null && (at ? (l = bl, rd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), ou(l)) : rd(bl, e.stateNode));
        break;
      case 4:
        a = bl, u = at, bl = e.stateNode.containerInfo, at = !0, Ht(
          l,
          t,
          e
        ), bl = a, at = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        qe(2, e, t), fl || qe(4, e, t), Ht(
          l,
          t,
          e
        );
        break;
      case 1:
        fl || (Kl(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && fs(
          e,
          t,
          a
        )), Ht(
          l,
          t,
          e
        );
        break;
      case 21:
        Ht(
          l,
          t,
          e
        );
        break;
      case 22:
        fl = (a = fl) || e.memoizedState !== null, Ht(
          l,
          t,
          e
        ), fl = a;
        break;
      case 30:
        Kl(e, t), Ht(
          l,
          t,
          e
        );
        break;
      case 7:
        fl || Kl(e, t), Ht(
          l,
          t,
          e
        );
        break;
      default:
        Ht(
          l,
          t,
          e
        );
    }
  }
  function Ns(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        ou(l);
      } catch (e) {
        ml(t, t.return, e);
      }
    }
  }
  function zs(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        ou(l);
      } catch (e) {
        ml(t, t.return, e);
      }
  }
  function xv(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Es()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Es()), t;
      default:
        throw Error(h(435, l.tag));
    }
  }
  function rc(l, t) {
    var e = xv(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Pv.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function kl(l, t, e) {
    var a = t.deletions;
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var n = a[u], c = l, i = t, o = i;
        l: for (; o !== null; ) {
          switch (o.tag) {
            case 27:
              if (xe(o.type)) {
                bl = o.stateNode, at = !1;
                break l;
              }
              break;
            case 5:
              bl = o.stateNode, at = !1;
              break l;
            case 3:
            case 4:
              bl = o.stateNode.containerInfo, at = !0;
              break l;
          }
          o = o.return;
        }
        if (bl === null) throw Error(h(160));
        _s(c, i, n), bl = null, at = !1, c = n.alternate, c !== null && (c.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Os(t, l, e), t = t.sibling;
  }
  var qt = null;
  function Os(l, t, e) {
    var a = l.alternate, u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (a = l.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var n = 0; n < a.length; n++) {
            var c = a[n];
            c.ref.impl = c.nextImpl;
          }
        kl(t, l, e), Il(l), u & 4 && (qe(3, l, l.return), ju(3, l), qe(5, l, l.return));
        break;
      case 1:
        kl(t, l, e), Il(l), u & 512 && (fl || a === null || Kl(a, a.return)), u & 64 && Gl && (l = l.updateQueue, l !== null && (t = l.callbacks, t !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? t : e.concat(t))));
        break;
      case 26:
        if (n = qt, kl(t, l, e), Il(l), u & 512 && (fl || a === null || Kl(a, a.return)), u & 4)
          if (u = a !== null ? a.memoizedState : null, e = l.memoizedState, a === null)
            if (e === null)
              if (l.stateNode === null)
                if (Gl)
                  l.stateNode = fd(
                    l.type,
                    l.memoizedProps,
                    t.containerInfo,
                    l
                  );
                else {
                  l: {
                    t = l.type, e = l.memoizedProps, u = n.ownerDocument || n;
                    t: switch (t) {
                      case "title":
                        a = u.getElementsByTagName("title")[0], (!a || a[vu] || a[xl] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = u.createElement(t), u.head.insertBefore(
                          a,
                          u.querySelector("head > title")
                        )), Jl(a, t, e), a[xl] = l, Bl(a), t = a;
                        break l;
                      case "link":
                        if (n = Rd(
                          "link",
                          "href",
                          u
                        ).get(t + (e.href || ""))) {
                          for (c = 0; c < n.length; c++)
                            if (a = n[c], a.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && a.getAttribute("rel") === (e.rel == null ? null : e.rel) && a.getAttribute("title") === (e.title == null ? null : e.title) && a.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                              n.splice(c, 1);
                              break t;
                            }
                        }
                        a = u.createElement(t), Jl(a, t, e), u.head.appendChild(a);
                        break;
                      case "meta":
                        if (n = Rd(
                          "meta",
                          "content",
                          u
                        ).get(t + (e.content || ""))) {
                          for (c = 0; c < n.length; c++)
                            if (a = n[c], a.getAttribute("content") === (e.content == null ? null : "" + e.content) && a.getAttribute("name") === (e.name == null ? null : e.name) && a.getAttribute("property") === (e.property == null ? null : e.property) && a.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && a.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                              n.splice(c, 1);
                              break t;
                            }
                        }
                        a = u.createElement(t), Jl(a, t, e), u.head.appendChild(a);
                        break;
                      default:
                        throw Error(h(468, t));
                    }
                    a[xl] = l, Bl(a), t = a;
                  }
                  l.stateNode = t;
                }
              else
                Gl || so(n, l.type, l.stateNode);
            else
              l.stateNode = Ud(
                n,
                e,
                l.memoizedProps
              );
          else
            u !== e ? (u === null ? (t = a.stateNode, t === null || fl || t.parentNode.removeChild(t)) : u.count--, e === null ? Gl || so(n, l.type, l.stateNode) : Ud(n, e, l.memoizedProps)) : e === null && l.stateNode !== null && gf(
              l,
              l.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        kl(t, l, e), Il(l), u & 512 && (fl || a === null || Kl(a, a.return)), a !== null && u & 4 && gf(
          l,
          l.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (n = $t, $t = !1, kl(t, l, e), $t = n, Il(l), u & 512 && (fl || a === null || Kl(a, a.return)), l.flags & 32) {
          t = l.stateNode;
          try {
            Aa(t, ""), el = !0;
          } catch (E) {
            ml(l, l.return, E);
          }
        }
        u & 4 && l.stateNode != null && (t = l.memoizedProps, gf(
          l,
          t,
          a !== null ? a.memoizedProps : t
        )), u & 1024 && (Of = !0);
        break;
      case 6:
        if (kl(t, l, e), Il(l), u & 4) {
          if (l.stateNode === null)
            throw Error(h(162));
          t = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = t, el = !0;
          } catch (E) {
            ml(l, l.return, E);
          }
        }
        break;
      case 3:
        if (el = !1, Ac = null, n = qt, qt = ku(t.containerInfo), kl(t, l, e), qt = n, Il(l), u & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            ou(t.containerInfo);
          } catch (E) {
            ml(l, l.return, E);
          }
        Of && (Of = !1, As(l)), el = !1;
        break;
      case 4:
        u = $t, $t = Gl, a = Jo(), n = qt, qt = ku(
          l.stateNode.containerInfo
        ), kl(t, l, e), Il(l), qt = n, el && Zu && (oc = !0), el = a, $t = u;
        break;
      case 12:
        kl(t, l, e), Il(l);
        break;
      case 31:
        kl(t, l, e), Il(l), u & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, rc(l, t)));
        break;
      case 13:
        kl(t, l, e), Il(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (vc = ft()), u & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, rc(l, t)));
        break;
      case 22:
        n = l.memoizedState !== null, c = a !== null && a.memoizedState !== null;
        var i = Gl, o = fl, v = $t;
        Gl = i || n, $t = v || n, fl = o || c, kl(t, l, e), fl = o, $t = v, Gl = i, Il(l), u & 8192 && (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, !n || a === null || c || Gl || fl || (t = c || fl, e = Gl, a = fl, Gl = n || Gl, fl = t, Be(l, 2), Gl = e, fl = a), !n && $t || pf(l, n)), u & 4 && (t = l.updateQueue, t !== null && (e = t.retryQueue, e !== null && (t.retryQueue = null, rc(l, e))));
        break;
      case 19:
        kl(t, l, e), Il(l), u & 4 && (t = l.updateQueue, t !== null && (l.updateQueue = null, rc(l, t)));
        break;
      case 30:
        u & 512 && (fl || a === null || Kl(a, a.return)), u = Jo(), n = Zu, c = (e & 335544064) === e, i = l.memoizedProps, Zu = c && ce(
          i.default,
          i.update
        ) !== "none", kl(t, l, e), Il(l), c && a !== null && el && (l.flags |= 4), Zu = n, el = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (fl || a === null || Kl(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = l);
      default:
        kl(t, l, e), Il(l);
    }
  }
  function Il(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (ms(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var u = l.return; u !== null; ) {
          if (yf(u)) {
            var n = u.stateNode;
            a === null ? a = [n] : a.push(n);
          }
          if (vf(u)) break;
          u = u.return;
        }
        var c = a;
        if (e == null) throw Error(h(160));
        switch (e.tag) {
          case 27:
            var i = e.stateNode, o = Ef(l);
            nc(
              l,
              o,
              i,
              c
            );
            break;
          case 5:
            var v = e.stateNode;
            e.flags & 32 && (Aa(v, ""), e.flags &= -33);
            var E = Ef(l);
            nc(
              l,
              E,
              v,
              c
            );
            break;
          case 3:
          case 4:
            var T = e.stateNode.containerInfo, s = Ef(l);
            Sf(
              l,
              s,
              T,
              c
            );
            break;
          default:
            throw Error(h(161));
        }
      } catch (g) {
        ml(l, l.return, g);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function As(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        As(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, fu = !0, t.reset(), fu = !1), l = l.sibling;
      }
  }
  function Ka(l, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        ps(t, l), t = t.sibling;
    else gs(t);
  }
  function ps(l, t) {
    var e = l.alternate;
    if (e === null) bf(l, !1);
    else
      switch (l.tag) {
        case 3:
          if (Af = Wt = !1, ds(), Ka(t, l), !Wt && !oc) {
            if (l = wt, l !== null)
              for (var a = 0; a < l.length; a += 3) {
                e = l[a];
                var u = l[a + 1];
                vd(e, l[a + 2]), e = e.ownerDocument.documentElement, e !== null && e.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            l = t.containerInfo, l = l.nodeType === 9 ? l.documentElement : l.ownerDocument.documentElement, l !== null && l.style.viewTransitionName === "" && (l.style.viewTransitionName = "none", l.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), l.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), Af = !0;
          }
          wt = null;
          break;
        case 5:
          Ka(t, l);
          break;
        case 4:
          a = Wt, Wt = !1, Ka(t, l), Wt && (oc = !0), Wt = a;
          break;
        case 22:
          l.memoizedState === null && (e.memoizedState !== null ? bf(l, !1) : Ka(t, l));
          break;
        case 30:
          a = Wt, u = ds(), Wt = !1, Ka(t, l), Wt && (l.flags |= 4);
          var n = l.memoizedProps, c = l.stateNode;
          t = ne(n, c), c = ne(e.memoizedProps, c);
          var i = ce(n.default, n.update);
          i === "none" ? t = !1 : (n = e.memoizedState, e.memoizedState = null, e = l.child, et = 0, t = zf(
            l,
            e,
            t,
            c,
            i,
            n,
            !0
          ), et !== (n === null ? 0 : n.length) && (l.flags |= 32)), (l.flags & 4) !== 0 && t ? (Ia(
            l,
            l.memoizedProps.onUpdate
          ), wt = u) : u !== null && (u.push.apply(u, wt), wt = u), Wt = (l.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Ka(t, l);
      }
  }
  function kt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ss(l, t.alternate, t), t = t.sibling;
  }
  function Be(l, t) {
    for (l = l.child; l !== null; ) {
      var e = l, a = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          qe(4, e, e.return), Be(
            e,
            a
          );
          break;
        case 1:
          Kl(e, e.return);
          var u = e.stateNode;
          typeof u.componentWillUnmount == "function" && fs(
            e,
            e.return,
            u
          ), Be(
            e,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Ad(
            e.stateNode,
            e.type,
            e.memoizedProps
          );
        case 5:
          Kl(e, e.return), e.tag !== 5 && e.tag !== 27 || xu(e), Be(
            e,
            a
          );
          break;
        case 6:
          xu(e);
          break;
        case 26:
          Kl(e, e.return), u = e.stateNode, e.memoizedState !== null || u === null || fl || u.parentNode.removeChild(u), Be(
            e,
            a
          );
          break;
        case 22:
          e.memoizedState === null && Be(
            e,
            a
          );
          break;
        case 30:
          Kl(e, e.return), Be(
            e,
            a
          );
          break;
        case 7:
          Kl(e, e.return);
        default:
          Be(
            e,
            a
          );
      }
      l = l.sibling;
    }
  }
  function Bt(l, t, e) {
    for (e = (t.subtreeFlags & 8772) !== 0 ? e : e & -2, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, c = n.flags, i = (e & 1) !== 0;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Bt(
            u,
            n,
            e
          ), ju(4, n);
          break;
        case 1:
          if (Bt(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (E) {
              ml(a, a.return, E);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var o = a.stateNode;
            try {
              var v = u.shared.hiddenCallbacks;
              if (v !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < v.length; u++)
                  $m(v[u], o);
            } catch (E) {
              ml(a, a.return, E);
            }
          }
          i && c & 64 && is(n), Jt(n, n.return);
          break;
        case 27:
          (e & 2) !== 0 && rs(n);
        case 5:
          n.tag !== 5 && n.tag !== 27 || os(n), Bt(
            u,
            n,
            e
          ), i && a === null && c & 4 && hf(n), Jt(n, n.return);
          break;
        case 6:
          os(n);
          break;
        case 26:
          o = n.stateNode, n.memoizedState !== null || o === null || Gl || so(
            ku(o.ownerDocument),
            n.type,
            o
          ), Bt(
            u,
            n,
            e
          ), i && a === null && c & 4 && hf(n), Jt(n, n.return);
          break;
        case 12:
          Bt(
            u,
            n,
            e
          );
          break;
        case 31:
          Bt(
            u,
            n,
            e
          ), i && c & 4 && Ns(u, n);
          break;
        case 13:
          Bt(
            u,
            n,
            e
          ), i && c & 4 && zs(u, n);
          break;
        case 22:
          n.memoizedState === null && Bt(
            u,
            n,
            e
          ), Jt(n, n.return);
          break;
        case 30:
          Bt(
            u,
            n,
            e
          ), Jt(n, n.return);
          break;
        case 7:
          Jt(n, n.return);
        default:
          Bt(
            u,
            n,
            e
          );
      }
      t = t.sibling;
    }
  }
  function Mf(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && pu(e));
  }
  function Cf(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && pu(l));
  }
  function pt(l, t, e, a) {
    var u = (e & 335544064) === e;
    if (t.subtreeFlags & (u ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Ds(
          l,
          t,
          e,
          a
        ), t = t.sibling;
    else u && hs(t);
  }
  function Ds(l, t, e, a) {
    var u = (e & 335544064) === e;
    u && t.alternate === null && t.return !== null && t.return.alternate !== null && fc(t);
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        pt(
          l,
          t,
          e,
          a
        ), n & 2048 && ju(9, t);
        break;
      case 1:
        pt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        pt(
          l,
          t,
          e,
          a
        ), u && Af && (l = l.containerInfo, l = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, l.style.viewTransitionName === "root" && (l.style.viewTransitionName = ""), l = l.ownerDocument.documentElement, l !== null && l.style.viewTransitionName === "none" && (l.style.viewTransitionName = "")), n & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== n && (t.refCount++, n != null && pu(n)));
        break;
      case 12:
        if (n & 2048) {
          pt(
            l,
            t,
            e,
            a
          ), n = t.stateNode;
          try {
            var c = t.memoizedProps, i = c.id, o = c.onPostCommit;
            typeof o == "function" && o(
              i,
              t.alternate === null ? "mount" : "update",
              n.passiveEffectDuration,
              -0
            );
          } catch (v) {
            ml(t, t.return, v);
          }
        } else
          pt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        pt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        pt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, i = t.alternate, t.memoizedState !== null ? (u && i !== null && i.memoizedState === null && fc(i), c._visibility & 2 ? pt(
          l,
          t,
          e,
          a
        ) : Vu(
          l,
          t
        )) : (u && i !== null && i.memoizedState !== null && fc(t), c._visibility & 2 ? pt(
          l,
          t,
          e,
          a
        ) : (c._visibility |= 2, Ja(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), n & 2048 && Mf(i, t);
        break;
      case 24:
        pt(
          l,
          t,
          e,
          a
        ), n & 2048 && Cf(t.alternate, t);
        break;
      case 30:
        u && (n = t.alternate, n !== null && (Ft(n.child, !0), Ft(t.child, !0))), pt(
          l,
          t,
          e,
          a
        );
        break;
      default:
        pt(
          l,
          t,
          e,
          a
        );
    }
  }
  function Ja(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, c = t, i = e, o = a, v = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Ja(
            n,
            c,
            i,
            o,
            u
          ), ju(8, c);
          break;
        case 23:
          break;
        case 22:
          var E = c.stateNode;
          c.memoizedState !== null ? E._visibility & 2 ? Ja(
            n,
            c,
            i,
            o,
            u
          ) : Vu(
            n,
            c
          ) : (E._visibility |= 2, Ja(
            n,
            c,
            i,
            o,
            u
          )), u && v & 2048 && Mf(
            c.alternate,
            c
          );
          break;
        case 24:
          Ja(
            n,
            c,
            i,
            o,
            u
          ), u && v & 2048 && Cf(c.alternate, c);
          break;
        default:
          Ja(
            n,
            c,
            i,
            o,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Vu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            Vu(e, a), u & 2048 && Mf(
              a.alternate,
              a
            );
            break;
          case 24:
            Vu(e, a), u & 2048 && Cf(a.alternate, a);
            break;
          default:
            Vu(e, a);
        }
        t = t.sibling;
      }
  }
  var va = 8192;
  function ya(l, t, e) {
    if (l.subtreeFlags & va)
      for (l = l.child; l !== null; )
        Ms(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function Ms(l, t, e) {
    switch (l.tag) {
      case 26:
        ya(
          l,
          t,
          e
        ), l.flags & va && (l.memoizedState !== null ? wy(
          e,
          qt,
          l.memoizedState,
          l.memoizedProps
        ) : (l = l.stateNode, (t & 335544128) === t && Yd(e, l)));
        break;
      case 5:
        ya(
          l,
          t,
          e
        ), l.flags & va && (l = l.stateNode, (t & 335544128) === t && Yd(e, l));
        break;
      case 3:
      case 4:
        var a = qt;
        qt = ku(l.stateNode.containerInfo), ya(
          l,
          t,
          e
        ), qt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = va, va = 16777216, ya(
          l,
          t,
          e
        ), va = a) : ya(
          l,
          t,
          e
        ));
        break;
      case 30:
        if ((l.flags & va) !== 0 && (a = l.memoizedProps.name, a != null && a !== "auto")) {
          var u = l.stateNode;
          u.paired = null, vt === null && (vt = /* @__PURE__ */ new Map()), vt.set(a, u);
        }
        ya(
          l,
          t,
          e
        );
        break;
      default:
        ya(
          l,
          t,
          e
        );
    }
  }
  function Cs(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function Lu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Xl = a, Rs(
            a,
            l
          );
        }
      Cs(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Us(l), l = l.sibling;
  }
  function Us(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Lu(l), l.flags & 2048 && qe(9, l, l.return);
        break;
      case 3:
        Lu(l);
        break;
      case 12:
        Lu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, sc(l)) : Lu(l);
        break;
      default:
        Lu(l);
    }
  }
  function sc(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Xl = a, Rs(
            a,
            l
          );
        }
      Cs(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          qe(8, t, t.return), sc(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, sc(t));
          break;
        default:
          sc(t);
      }
      l = l.sibling;
    }
  }
  function Rs(l, t) {
    for (; Xl !== null; ) {
      var e = Xl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          qe(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          pu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Xl = a;
      else
        l: for (e = l; Xl !== null; ) {
          a = Xl;
          var u = a.sibling, n = a.return;
          if (Ts(a), a === e) {
            Xl = null;
            break l;
          }
          if (u !== null) {
            u.return = n, Xl = u;
            break l;
          }
          Xl = n;
        }
    }
  }
  var Zv = {
    getCacheForType: function(l) {
      var t = Zl(Dl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return Zl(Dl).controller.signal;
    }
  }, Vv = typeof WeakMap == "function" ? WeakMap : Map, nl = 0, vl = null, F = null, k = 0, ol = 0, yt = null, Ye = !1, wa = !1, Uf = !1, ye = 0, zl = 0, Ge = 0, ha = 0, dc = 0, ht = 0, Fa = 0, Ku = null, ut = null, Rf = !1, vc = 0, Hs = 0, yc = 1 / 0, hc = null, Xe = null, Tl = 0, Yt = null, ga = null, It = 0, Hf = 0, qf = null, qs = null, $a = null, Wa = null, ka = null, Ju = 0, gc = null;
  function gt() {
    return (nl & 2) !== 0 && k !== 0 ? k & -k : M.T !== null ? Lf() : Go();
  }
  function Bs() {
    if (ht === 0)
      if ((k & 536870912) === 0 || K) {
        var l = rn;
        rn <<= 1, (rn & 3932160) === 0 && (rn = 262144), ht = l;
      } else ht = 536870912;
    return l = Vl.current, l !== null && (l.flags |= 32), ht;
  }
  function Ia(l, t) {
    if (t != null) {
      var e = l.stateNode, a = e.ref;
      a === null && (a = e.ref = yd(
        ne(l.memoizedProps, e)
      )), Wa === null && (Wa = []), Wa.push(t.bind(null, a));
    }
  }
  function nt(l, t, e) {
    (l === vl && (ol === 2 || ol === 9) || l.cancelPendingCommit !== null) && (Pa(l, 0), Qe(
      l,
      k,
      ht,
      !1
    )), du(l, e), ((nl & 2) === 0 || l !== vl) && (l === vl && ((nl & 2) === 0 && (ha |= e), zl === 4 && Qe(
      l,
      k,
      ht,
      !1
    )), Pt(l));
  }
  function Ys(l, t, e) {
    if ((nl & 6) !== 0) throw Error(h(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || su(l, t), u = a ? Jv(l, t) : Yf(l, t, !0), n = a;
    do {
      if (u === 0) {
        wa && !a && Qe(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !Lv(e)) {
          u = Yf(l, t, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var c = 0;
          else
            c = l.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = Ku;
              var o = i.current.memoizedState.isDehydrated;
              if (o && (Pa(i, c).flags |= 256), c = Yf(
                i,
                c,
                !1
              ), c !== 2 && c !== 6) {
                if (Uf && !o) {
                  i.errorRecoveryDisabledLanes |= n, ha |= n, u = 4;
                  break l;
                }
                n = ut, ut = u, n !== null && (ut === null ? ut = n : ut.push.apply(
                  ut,
                  n
                ));
              }
              u = c;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Pa(l, 0), Qe(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(h(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              Qe(
                a,
                t,
                ht,
                !Ye
              );
              break l;
            case 2:
              ut = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(h(329));
          }
          if ((t & 62914560) === t && (u = vc + 300 - ft(), 10 < u)) {
            if (Qe(
              a,
              t,
              ht,
              !Ye
            ), dn(a, 0, !0) !== 0) break l;
            It = t, a.timeoutHandle = to(
              Gs.bind(
                null,
                a,
                e,
                ut,
                hc,
                Rf,
                t,
                ht,
                ha,
                Fa,
                Ye,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          Gs(
            a,
            e,
            ut,
            hc,
            Rf,
            t,
            ht,
            ha,
            Fa,
            Ye,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Pt(l);
  }
  function Gs(l, t, e, a, u, n, c, i, o, v, E, T, s, g) {
    l.timeoutHandle = -1;
    var z = t.subtreeFlags, D = (n & 335544064) === n;
    if (T = null, (D || z & 8192 || (z & 16785408) === 16785408) && (T = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Vt
    }, vt = null, Ms(
      t,
      n,
      T
    ), D && (z = T, D = l.containerInfo, D = (D.nodeType === 9 ? D : D.ownerDocument).__reactViewTransition, D != null && (z.count++, z.waitingForViewTransition = !0, z = ln.bind(z), D.finished.then(z, z))), z = (n & 62914560) === n ? vc - ft() : (n & 4194048) === n ? Hs - ft() : 0, z = Fy(
      T,
      z
    ), z !== null)) {
      It = n, l.cancelPendingCommit = z(
        Ks.bind(
          null,
          l,
          t,
          n,
          e,
          a,
          u,
          c,
          i,
          o,
          v,
          E,
          T,
          null,
          s,
          g
        )
      ), Qe(l, n, c, !v);
      return;
    }
    Ks(
      l,
      t,
      n,
      e,
      a,
      u,
      c,
      i,
      o,
      v,
      E,
      T
    );
  }
  function Lv(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!st(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null)
        e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Qe(l, t, e, a) {
    t = Ro(l, t), t &= ~dc, t &= ~ha, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - mt(u), c = 1 << n;
      a[n] = -1, u &= ~c;
    }
    e !== 0 && qo(l, e, t);
  }
  function Ec() {
    return (nl & 6) === 0 ? (wu(0), !1) : !0;
  }
  function Bf() {
    if (F !== null) {
      if (ol === 0)
        var l = F.return;
      else
        l = F, oe = ua = null, Zi(l), Qa = null, Cu = 0, l = F;
      for (; l !== null; )
        cs(l.alternate, l), l = l.return;
      F = null;
    }
  }
  function Pa(l, t) {
    var e = l.timeoutHandle;
    return e !== -1 && (l.timeoutHandle = -1, vy(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), It = 0, Bf(), vl = l, F = e = ie(l.current, null), k = t, ol = 0, yt = null, Ye = !1, wa = su(l, t), Uf = !1, Fa = ht = dc = ha = Ge = zl = 0, ut = Ku = null, Rf = !1, ye = Ro(l, t), An(), e;
  }
  function Xs(l, t) {
    V = null, M.H = kn, t === Xa || t === Gn ? (t = Km(), ol = 3) : t === Mi ? (t = Km(), ol = 4) : ol = t === af ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, yt = t, F === null && (zl = 1, In(
      l,
      Nt(t, l.current)
    ));
  }
  function Qs() {
    var l = Vl.current;
    return l === null ? !0 : (k & 4194048) === k ? Fl === null : (k & 62914560) === k || (k & 536870912) !== 0 ? l === Fl : !1;
  }
  function js() {
    var l = M.H;
    return M.H = kn, l === null ? kn : l;
  }
  function xs() {
    var l = M.A;
    return M.A = Zv, l;
  }
  function Sc() {
    zl = 4, Ye || (k & 4194048) !== k && Vl.current !== null || (wa = !0), (Ge & 134217727) === 0 && (ha & 134217727) === 0 || vl === null || Qe(
      vl,
      k,
      ht,
      !1
    );
  }
  function Yf(l, t, e) {
    var a = nl;
    nl |= 2;
    var u = js(), n = xs();
    (vl !== l || k !== t) && (hc = null, Pa(l, t)), t = !1;
    var c = zl;
    l: do
      try {
        if (ol !== 0 && F !== null) {
          var i = F, o = yt;
          switch (ol) {
            case 8:
              Bf(), c = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              Vl.current === null && (t = !0);
              var v = ol;
              if (ol = 0, yt = null, lu(l, i, o, v), e && wa) {
                c = 0;
                break l;
              }
              break;
            default:
              v = ol, ol = 0, yt = null, lu(l, i, o, v);
          }
        }
        Kv(), c = zl;
        break;
      } catch (E) {
        Xs(l, E);
      }
    while (!0);
    return t && l.shellSuspendCounter++, oe = ua = null, nl = a, M.H = u, M.A = n, F === null && (vl = null, k = 0, An()), c;
  }
  function Kv() {
    for (; F !== null; ) Zs(F);
  }
  function Jv(l, t) {
    var e = nl;
    nl |= 2;
    var a = js(), u = xs();
    vl !== l || k !== t ? (hc = null, yc = ft() + 500, Pa(l, t)) : wa = su(
      l,
      t
    );
    l: do
      try {
        if (ol !== 0 && F !== null) {
          t = F;
          var n = yt;
          t: switch (ol) {
            case 1:
              ol = 0, yt = null, lu(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Vm(n)) {
                ol = 0, yt = null, Vs(t);
                break;
              }
              t = function() {
                ol !== 2 && ol !== 9 || vl !== l || (ol = 7), Pt(l);
              }, n.then(t, t);
              break l;
            case 3:
              ol = 7;
              break l;
            case 4:
              ol = 5;
              break l;
            case 7:
              Vm(n) ? (ol = 0, yt = null, Vs(t)) : (ol = 0, yt = null, lu(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (F.tag) {
                case 26:
                  c = F.memoizedState;
                case 5:
                case 27:
                  var i = F;
                  if (c ? qd(c) : i.stateNode.complete) {
                    ol = 0, yt = null;
                    var o = i.sibling;
                    if (o !== null) F = o;
                    else {
                      var v = i.return;
                      v !== null ? (F = v, bc(v)) : F = null;
                    }
                    break t;
                  }
              }
              ol = 0, yt = null, lu(l, t, n, 5);
              break;
            case 6:
              ol = 0, yt = null, lu(l, t, n, 6);
              break;
            case 8:
              Bf(), zl = 6;
              break l;
            default:
              throw Error(h(462));
          }
        }
        wv();
        break;
      } catch (E) {
        Xs(l, E);
      }
    while (!0);
    return oe = ua = null, M.H = a, M.A = u, nl = e, F !== null ? 0 : (vl = null, k = 0, An(), zl);
  }
  function wv() {
    for (; F !== null && !m0(); )
      Zs(F);
  }
  function Zs(l) {
    var t = us(l.alternate, l, ye);
    l.memoizedProps = l.pendingProps, t === null ? bc(l) : F = t;
  }
  function Vs(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = kr(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          k
        );
        break;
      case 11:
        t = kr(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          k
        );
        break;
      case 5:
        Zi(t);
        var a = t;
        a === Yl && (K ? (Rn(a), a.tag === 5 && a.stateNode != null && (El = a.stateNode)) : (Rn(a), K = !0));
      default:
        cs(e, t), t = F = Rm(t, ye), t = us(e, t, ye);
    }
    l.memoizedProps = l.pendingProps, t === null ? bc(l) : F = t;
  }
  function lu(l, t, e, a) {
    oe = ua = null, Zi(t), Qa = null, Cu = 0;
    var u = t.return;
    try {
      if (qv(
        l,
        u,
        t,
        e,
        k
      )) {
        zl = 1, In(
          l,
          Nt(e, l.current)
        ), F = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw F = u, n;
      zl = 1, In(
        l,
        Nt(e, l.current)
      ), F = null;
      return;
    }
    t.flags & 32768 ? (K || a === 1 ? l = !0 : wa || (k & 536870912) !== 0 ? l = !1 : (Ye = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Vl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Ls(t, l)) : bc(t);
  }
  function bc(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Ls(
          t,
          Ye
        );
        return;
      }
      l = t.return;
      var e = Xv(
        t.alternate,
        t,
        ye
      );
      if (e !== null) {
        F = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        F = t;
        return;
      }
      F = t = l;
    } while (t !== null);
    zl === 0 && (zl = 5);
  }
  function Ls(l, t) {
    do {
      var e = Qv(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, F = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        F = l;
        return;
      }
      F = l = e;
    } while (l !== null);
    zl = 6, F = null;
  }
  function Ks(l, t, e, a, u, n, c, i, o, v, E, T) {
    l.cancelPendingCommit = null;
    do
      Tc();
    while (Tl !== 0);
    if ((nl & 6) !== 0) throw Error(h(327));
    if (t !== null) {
      if (t === l.current) throw Error(h(177));
      l === vl && (F = vl = null, k = 0), ga = t, Yt = l, It = e, qf = u, qs = a, Fv(
        l,
        t,
        e,
        c,
        i,
        o,
        T
      );
    }
  }
  function Fv(l, t, e, a, u, n, c) {
    var i = t.lanes | t.childLanes;
    if (Hf = i, i |= hi, b0(
      l,
      e,
      i,
      a,
      u,
      n
    ), Wa = null, (e & 335544064) === e ? (ka = _v(l), a = 10262) : (ka = null, a = 10256), (t.subtreeFlags & a) !== 0 || (t.flags & a) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, ly(on, function() {
      return jf(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), cc = !1, a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
      a = M.T, M.T = null, u = x.p, x.p = 2, n = nl, nl |= 4;
      try {
        jv(l, t, e);
      } finally {
        nl = n, x.p = u, M.T = a;
      }
    }
    Tl = 1, cc ? $a = by(
      c,
      l.containerInfo,
      ka,
      Gf,
      Xf,
      Wv,
      Qf,
      jf,
      $v
    ) : (Gf(), Xf(), Qf());
  }
  function $v(l) {
    if (Tl !== 0) {
      var t = Yt.onRecoverableError;
      t(l, { componentStack: null });
    }
  }
  function Wv() {
    Tl === 3 && (Tl = 0, ps(ga, Yt), Tl = 4);
  }
  function Gf() {
    if (Tl === 1) {
      Tl = 0;
      var l = Yt, t = ga, e = It, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = M.T, M.T = null;
        var u = x.p;
        x.p = 2;
        var n = nl;
        nl |= 4;
        try {
          Zu = oc = !1, Os(t, l, e), e = If;
          var c = _m(l.containerInfo), i = e.focusedElem, o = e.selectionRange;
          if (c !== i && i && i.ownerDocument && Tm(
            i.ownerDocument.documentElement,
            i
          )) {
            if (o !== null && ri(i)) {
              var v = o.start, E = o.end;
              if (E === void 0 && (E = v), "selectionStart" in i)
                i.selectionStart = v, i.selectionEnd = Math.min(
                  E,
                  i.value.length
                );
              else {
                var T = i.ownerDocument || document, s = T && T.defaultView || window;
                if (s.getSelection) {
                  var g = s.getSelection(), z = i.textContent.length, D = Math.min(o.start, z), L = o.end === void 0 ? D : Math.min(o.end, z);
                  !g.extend && D > L && (c = L, L = D, D = c);
                  var d = bm(
                    i,
                    D
                  ), m = bm(
                    i,
                    L
                  );
                  if (d && m && (g.rangeCount !== 1 || g.anchorNode !== d.node || g.anchorOffset !== d.offset || g.focusNode !== m.node || g.focusOffset !== m.offset)) {
                    var y = T.createRange();
                    y.setStart(d.node, d.offset), g.removeAllRanges(), D > L ? (g.addRange(y), g.extend(m.node, m.offset)) : (y.setEnd(m.node, m.offset), g.addRange(y));
                  }
                }
              }
            }
            for (T = [], g = i; g = g.parentNode; )
              g.nodeType === 1 && T.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof i.focus == "function" && i.focus(), i = 0; i < T.length; i++) {
              var b = T[i];
              b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
            }
          }
          fu = !!kf, If = kf = null;
        } finally {
          nl = n, x.p = u, M.T = a;
        }
      }
      l.current = t, Tl = 2;
    }
  }
  function Xf() {
    if (Tl === 2) {
      Tl = 0;
      var l = Yt, t = ga, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = M.T, M.T = null;
        var a = x.p;
        x.p = 2;
        var u = nl;
        nl |= 4;
        try {
          Ss(l, t.alternate, t);
        } finally {
          nl = u, x.p = a, M.T = e;
        }
      }
      Tl = 3;
    }
  }
  function Qf() {
    if (Tl === 4 || Tl === 3) {
      Tl = 0;
      var l = $a;
      $a = null, r0();
      var t = Yt, e = ga, a = It, u = qs, n = (a & 335544064) === a ? 10262 : 10256;
      if ((e.subtreeFlags & n) !== 0 || (e.flags & n) !== 0 ? Tl = 5 : (Tl = 0, ga = Yt = null, Js(t, t.pendingLanes)), n = t.pendingLanes, n === 0 && (Xe = null), wc(a), e = e.stateNode, ot && typeof ot.onCommitFiberRoot == "function")
        try {
          ot.onCommitFiberRoot(
            ru,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        e = M.T, n = x.p, x.p = 2, M.T = null;
        try {
          for (var c = t.onRecoverableError, i = 0; i < u.length; i++) {
            var o = u[i];
            c(o.value, {
              componentStack: o.stack
            });
          }
        } finally {
          M.T = e, x.p = n;
        }
      }
      if (u = Wa, c = ka, ka = null, u !== null && (Wa = null, c === null && (c = []), l !== null))
        for (o = 0; o < u.length; o++)
          e = (0, u[o])(
            c
          ), e !== void 0 && l.finished.finally(e);
      (It & 3) !== 0 && Tc(), Pt(t), n = t.pendingLanes, (a & 261930) !== 0 && (n & 42) !== 0 ? t === gc ? Ju++ : (Ju = 0, gc = t) : (Ju = 0, gc = null), wu(0);
    }
  }
  function Js(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, pu(t)));
  }
  function Tc() {
    return $a !== null && ($a.skipTransition(), $a = null), Gf(), Xf(), Qf(), jf();
  }
  function jf() {
    if (Tl !== 5) return !1;
    var l = Yt, t = Hf;
    Hf = 0;
    var e = wc(It), a = M.T, u = x.p;
    try {
      x.p = 32 > e ? 32 : e, M.T = null, e = qf, qf = null;
      var n = Yt, c = It;
      if (Tl = 0, ga = Yt = null, It = 0, (nl & 6) !== 0) throw Error(h(331));
      var i = nl;
      if (nl |= 4, Us(n.current), Ds(
        n,
        n.current,
        c,
        e
      ), nl = i, wu(0, !1), ot && typeof ot.onPostCommitFiberRoot == "function")
        try {
          ot.onPostCommitFiberRoot(ru, n);
        } catch {
        }
      return !0;
    } finally {
      x.p = u, M.T = a, Js(l, t);
    }
  }
  function ws(l, t, e) {
    t = Nt(e, t), t = ef(l.stateNode, t, 2), l = Ce(l, t, 2), l !== null && (du(l, 2), Pt(l));
  }
  function ml(l, t, e) {
    if (l.tag === 3)
      ws(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          ws(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Xe === null || !Xe.has(a))) {
            l = Nt(e, l), e = Vr(2), a = Ce(t, e, 2), a !== null && (Lr(
              e,
              a,
              t,
              l
            ), du(a, 2), Pt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function xf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Vv();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (Uf = !0, u.add(e), l = kv.bind(null, l, t, e), t.then(l, l));
  }
  function kv(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, vl === l && (k & e) === e && ((zl === 4 || zl === 3 && (k & 62914560) === k && 300 > ft() - vc) && (nl & 2) === 0 ? Pa(l, 0) : dc |= e, Fa === k && (Fa = 0)), Pt(l);
  }
  function Fs(l, t) {
    t === 0 && (t = Ho()), l = ta(l, t), l !== null && (du(l, t), Pt(l));
  }
  function Iv(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Fs(l, e);
  }
  function Pv(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(h(314));
    }
    a !== null && a.delete(t), Fs(l, e);
  }
  function ly(l, t) {
    return Vc(l, t);
  }
  var tu = null, eu = null, Zf = !1, _c = !1, Vf = !1, je = 0;
  function Pt(l) {
    l !== eu && l.next === null && (eu === null ? tu = eu = l : eu = eu.next = l), _c = !0, Zf || (Zf = !0, ey());
  }
  function wu(l, t) {
    if (!Vf && _c) {
      Vf = !0;
      do
        for (var e = !1, a = tu; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = a.suspendedLanes, i = a.pingedLanes;
              n = (1 << 31 - mt(42 | l) + 1) - 1, n &= u & ~(c & ~i), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Is(a, n));
          } else
            n = k, n = dn(
              a,
              a === vl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || su(a, n) || (e = !0, Is(a, n));
          a = a.next;
        }
      while (e);
      Vf = !1;
    }
  }
  function ty() {
    $s();
  }
  function $s() {
    _c = Zf = !1;
    var l = 0;
    je !== 0 && dy() && (l = je);
    for (var t = ft(), e = null, a = tu; a !== null; ) {
      var u = a.next, n = Ws(a, t);
      n === 0 ? (a.next = null, e === null ? tu = u : e.next = u, u === null && (eu = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (_c = !0)), a = u;
    }
    Tl !== 0 && Tl !== 5 || wu(l), je !== 0 && (je = 0);
  }
  function Ws(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var c = 31 - mt(n), i = 1 << c, o = u[c];
      o === -1 ? ((i & e) === 0 || (i & a) !== 0) && (u[c] = S0(i, t)) : o <= t && (l.expiredLanes |= i), n &= ~i;
    }
    if (t = vl, e = k, e = dn(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (ol === 2 || ol === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && Lc(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || su(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && Lc(a), wc(e)) {
        case 2:
        case 8:
          e = Co;
          break;
        case 32:
          e = on;
          break;
        case 268435456:
          e = Uo;
          break;
        default:
          e = on;
      }
      return a = ks.bind(null, l), e = Vc(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && Lc(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function ks(l, t) {
    if (Tl !== 0 && Tl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (Tc() && l.callbackNode !== e)
      return null;
    var a = k;
    return a = dn(
      l,
      l === vl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (Ys(l, a, t), Ws(l, ft()), l.callbackNode != null && l.callbackNode === e ? ks.bind(null, l) : null);
  }
  function Is(l, t) {
    if (Tc()) return null;
    Ys(l, t, !0);
  }
  function ey() {
    yy(function() {
      (nl & 6) !== 0 ? Vc(
        Mo,
        ty
      ) : $s();
    });
  }
  function Lf() {
    if (je === 0) {
      var l = ia;
      l === 0 && (l = mn, mn <<= 1, (mn & 261888) === 0 && (mn = 256)), je = l;
    }
    return je;
  }
  function Ps(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : En(l);
  }
  function ay(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Ps(
        (u[lt] || null).action
      ), c = a.submitter;
      c && (t = (t = c[lt] || null) ? Ps(t.formAction) : c.getAttribute("formAction"), t !== null && (n = t, c = null));
      var i = new _n(
        "action",
        "action",
        null,
        a,
        u
      );
      l.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (je !== 0) {
                  var o = new FormData(u, c);
                  ki(
                    e,
                    {
                      pending: !0,
                      data: o,
                      method: u.method,
                      action: n
                    },
                    null,
                    o
                  );
                }
              } else
                typeof n == "function" && (i.preventDefault(), o = new FormData(u, c), ki(
                  e,
                  {
                    pending: !0,
                    data: o,
                    method: u.method,
                    action: n
                  },
                  n,
                  o
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Kf = 0; Kf < yi.length; Kf++) {
    var Jf = yi[Kf], uy = Jf.toLowerCase(), ny = Jf[0].toUpperCase() + Jf.slice(1);
    Rt(
      uy,
      "on" + ny
    );
  }
  Rt(Om, "onAnimationEnd"), Rt(Am, "onAnimationIteration"), Rt(pm, "onAnimationStart"), Rt("dblclick", "onDoubleClick"), Rt("focusin", "onFocus"), Rt("focusout", "onBlur"), Rt(vv, "onTransitionRun"), Rt(yv, "onTransitionStart"), Rt(hv, "onTransitionCancel"), Rt(Dm, "onTransitionEnd"), za("onMouseEnter", ["mouseout", "mouseover"]), za("onMouseLeave", ["mouseout", "mouseover"]), za("onPointerEnter", ["pointerout", "pointerover"]), za("onPointerLeave", ["pointerout", "pointerover"]), Ie(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ie(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ie("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ie(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ie(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ie(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Fu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fu)
  );
  function ld(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var i = a[c], o = i.instance, v = i.currentTarget;
            if (i = i.listener, o !== n && u.isPropagationStopped())
              break l;
            n = i, u.currentTarget = v;
            try {
              n(u);
            } catch (E) {
              On(E);
            }
            u.currentTarget = null, n = o;
          }
        else
          for (c = 0; c < a.length; c++) {
            if (i = a[c], o = i.instance, v = i.currentTarget, i = i.listener, o !== n && u.isPropagationStopped())
              break l;
            n = i, u.currentTarget = v;
            try {
              n(u);
            } catch (E) {
              On(E);
            }
            u.currentTarget = null, n = o;
          }
      }
    }
  }
  function $(l, t) {
    var e = t[Qo];
    e === void 0 && (e = t[Qo] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (td(t, l, 2, !1), e.add(a));
  }
  function wf(l, t, e) {
    var a = 0;
    t && (a |= 4), td(
      e,
      l,
      a,
      t
    );
  }
  var Nc = "_reactListening" + Math.random().toString(36).slice(2);
  function Ff(l) {
    if (!l[Nc]) {
      l[Nc] = !0, Zo.forEach(function(e) {
        e !== "selectionchange" && (cy.has(e) || wf(e, !1, l), wf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Nc] || (t[Nc] = !0, wf("selectionchange", !1, t));
    }
  }
  function td(l, t, e, a) {
    switch (Ld(t)) {
      case 2:
        var u = Iy;
        break;
      case 8:
        u = Py;
        break;
      default:
        u = yo;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !ti || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function $f(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var i = a.stateNode.containerInfo;
          if (i === u) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var o = c.tag;
              if ((o === 3 || o === 4) && c.stateNode.containerInfo === u)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (c = ke(i), c === null) return;
            if (o = c.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = n = c;
              continue l;
            }
            i = i.parentNode;
          }
        }
        a = a.return;
      }
    tm(function() {
      var v = n, E = Pc(e), T = [];
      l: {
        var s = Mm.get(l);
        if (s !== void 0) {
          var g = _n, z = l;
          switch (l) {
            case "keypress":
              if (bn(e) === 0) break l;
            case "keydown":
            case "keyup":
              g = L0;
              break;
            case "focusin":
              z = "focus", g = ni;
              break;
            case "focusout":
              z = "blur", g = ni;
              break;
            case "beforeblur":
            case "afterblur":
              g = ni;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = um;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = R0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = $0;
              break;
            case Om:
            case Am:
            case pm:
              g = B0;
              break;
            case Dm:
              g = k0;
              break;
            case "scroll":
            case "scrollend":
              g = C0;
              break;
            case "wheel":
              g = P0;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = G0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = cm;
              break;
            case "submit":
              g = w0;
              break;
            case "toggle":
            case "beforetoggle":
              g = tv;
          }
          var D = (t & 4) !== 0, L = !D && (l === "scroll" || l === "scrollend"), d = D ? s !== null ? s + "Capture" : null : s;
          D = [];
          for (var m = v, y; m !== null; ) {
            var b = m;
            if (y = b.stateNode, b = b.tag, b !== 5 && b !== 26 && b !== 27 || y === null || d === null || (b = hu(m, d), b != null && D.push(
              $u(m, b, y)
            )), L) break;
            m = m.return;
          }
          0 < D.length && (s = new g(
            s,
            z,
            null,
            e,
            E
          ), T.push({ event: s, listeners: D }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (g = l === "mouseover" || l === "pointerover", s = l === "mouseout" || l === "pointerout", g && e !== Ic && (z = e.relatedTarget || e.fromElement) && (ke(z) || z[Ta]))
            break l;
          (s || g) && (z = E.window === E ? E : (g = E.ownerDocument) ? g.defaultView || g.parentWindow : window, s ? (g = e.relatedTarget || e.toElement, s = v, g = g ? ke(g) : null, g !== null && (L = U(g), D = g.tag, g !== L || D !== 5 && D !== 27 && D !== 6) && (g = null)) : (s = null, g = v), s !== g && (D = um, b = "onMouseLeave", d = "onMouseEnter", m = "mouse", (l === "pointerout" || l === "pointerover") && (D = cm, b = "onPointerLeave", d = "onPointerEnter", m = "pointer"), L = s == null ? z : yu(s), y = g == null ? z : yu(g), z = new D(
            b,
            m + "leave",
            s,
            e,
            E
          ), z.target = L, z.relatedTarget = y, b = null, ke(E) === v && (D = new D(
            d,
            m + "enter",
            g,
            e,
            E
          ), D.target = y, D.relatedTarget = L, b = D), L = b, D = s && g ? ct(
            s,
            g,
            iy
          ) : null, s !== null && ed(
            T,
            z,
            s,
            D,
            !1
          ), g !== null && L !== null && ed(
            T,
            L,
            g,
            D,
            !0
          )));
        }
        l: {
          if (s = v ? yu(v) : window, g = s.nodeName && s.nodeName.toLowerCase(), g === "select" || g === "input" && s.type === "file")
            var A = vm;
          else if (sm(s))
            if (ym)
              A = rv;
            else {
              A = ov;
              var I = fv;
            }
          else
            g = s.nodeName, !g || g.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? v && kc(v.elementType) && (A = vm) : A = mv;
          if (A && (A = A(l, v))) {
            dm(
              T,
              A,
              e,
              E
            );
            break l;
          }
          I && I(l, s, v);
        }
        switch (I = v ? yu(v) : window, l) {
          case "focusin":
            (sm(I) || I.contentEditable === "true") && (Ca = I, si = v, zu = null);
            break;
          case "focusout":
            zu = si = Ca = null;
            break;
          case "mousedown":
            di = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            di = !1, Nm(T, e, E);
            break;
          case "selectionchange":
            if (dv) break;
          case "keydown":
          case "keyup":
            Nm(T, e, E);
        }
        var C;
        if (ii)
          l: {
            switch (l) {
              case "compositionstart":
                var Y = "onCompositionStart";
                break l;
              case "compositionend":
                Y = "onCompositionEnd";
                break l;
              case "compositionupdate":
                Y = "onCompositionUpdate";
                break l;
            }
            Y = void 0;
          }
        else
          Ma ? mm(l, e) && (Y = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (Y = "onCompositionStart");
        Y && (im && e.locale !== "ko" && (Ma || Y !== "onCompositionStart" ? Y === "onCompositionEnd" && Ma && (C = em()) : (Te = E, ei = "value" in Te ? Te.value : Te.textContent, Ma = !0)), I = zc(v, Y), 0 < I.length && (Y = new nm(
          Y,
          l,
          null,
          e,
          E
        ), T.push({ event: Y, listeners: I }), C ? Y.data = C : (C = rm(e), C !== null && (Y.data = C)))), (C = av ? uv(l, e) : nv(l, e)) && (Y = zc(v, "onBeforeInput"), 0 < Y.length && (I = new nm(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          E
        ), T.push({
          event: I,
          listeners: Y
        }), I.data = C)), ay(
          T,
          l,
          v,
          e,
          E
        );
      }
      ld(T, t);
    });
  }
  function $u(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function zc(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = hu(l, e), u != null && a.unshift(
        $u(l, u, n)
      ), u = hu(l, t), u != null && a.push(
        $u(l, u, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function iy(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function ed(l, t, e, a, u) {
    for (var n = t._reactName, c = []; e !== null && e !== a; ) {
      var i = e, o = i.alternate, v = i.stateNode;
      if (i = i.tag, o !== null && o === a) break;
      i !== 5 && i !== 26 && i !== 27 || v === null || (o = v, u ? (v = hu(e, n), v != null && c.unshift(
        $u(e, v, o)
      )) : u || (v = hu(e, n), v != null && c.push(
        $u(e, v, o)
      ))), e = e.return;
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var fy = /\r\n?/g, oy = /\u0000|\uFFFD/g;
  function ad(l) {
    return (typeof l == "string" ? l : "" + l).replace(fy, `
`).replace(oy, "");
  }
  function ud(l, t) {
    return t = ad(t), ad(l) === t;
  }
  function rl(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        if (typeof a == "string")
          t === "body" || t === "textarea" && a === "" || Aa(l, a);
        else if (typeof a == "number" || typeof a == "bigint")
          t !== "body" && Aa(l, "" + a);
        else return;
        break;
      case "className":
        gn(l, "class", a);
        break;
      case "tabIndex":
        gn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        gn(l, e, a);
        break;
      case "style":
        Po(l, a, n);
        return;
      case "data":
        if (t !== "object") {
          gn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = En(a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (t !== "input" && rl(l, t, "name", u.name, u, null), rl(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), rl(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), rl(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (rl(l, t, "encType", u.encType, u, null), rl(l, t, "method", u.method, u, null), rl(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = En(a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Vt);
        return;
      case "onScroll":
        a != null && $("scroll", l);
        return;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(h(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(h(60));
            n?.__html !== e && (l.innerHTML = e);
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        e = En(a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        $("beforetoggle", l), $("toggle", l), hn(l, "popover", a);
        break;
      case "xlinkActuate":
        ae(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        ae(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        ae(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        ae(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        ae(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        ae(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        ae(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        ae(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        ae(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        hn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N")
          e = D0.get(e) || e, hn(l, e, a);
        else return;
    }
    el = !0;
  }
  function Wf(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Po(l, a, n);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(h(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(h(60));
            n?.__html !== e && (l.innerHTML = e);
          }
        }
        break;
      case "children":
        if (typeof a == "string") Aa(l, a);
        else if (typeof a == "number" || typeof a == "bigint")
          Aa(l, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && $("scroll", l);
        return;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        return;
      case "onClick":
        a != null && (l.onclick = Vt);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Vo.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), n = e.slice(2, u ? e.length - 7 : void 0), t = l[lt] || null, t = t != null ? t[e] : null, typeof t == "function" && l.removeEventListener(n, t, u), typeof a == "function")) {
              typeof t != "function" && t !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(n, a, u);
              break l;
            }
            el = !0, e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : hn(l, e, a);
          }
        return;
    }
    el = !0;
  }
  function Jl(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        $("error", l), $("load", l);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var c = e[n];
            if (c != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(h(137, t));
                default:
                  rl(l, t, n, c, e, null);
              }
          }
        u && rl(l, t, "srcSet", e.srcSet, e, null), a && rl(l, t, "src", e.src, e, null);
        return;
      case "input":
        $("invalid", l);
        var i = n = c = u = null, o = null, v = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var E = e[a];
            if (E != null)
              switch (a) {
                case "name":
                  u = E;
                  break;
                case "type":
                  c = E;
                  break;
                case "checked":
                  o = E;
                  break;
                case "defaultChecked":
                  v = E;
                  break;
                case "value":
                  n = E;
                  break;
                case "defaultValue":
                  i = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(h(137, t));
                  break;
                default:
                  rl(l, t, a, E, e, null);
              }
          }
        $o(
          l,
          n,
          i,
          o,
          v,
          c,
          u,
          !1
        );
        return;
      case "select":
        $("invalid", l), a = c = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (i = e[u], i != null))
            switch (u) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                a = i;
              default:
                rl(l, t, u, i, e, null);
            }
        t = n, e = c, l.multiple = !!a, t != null ? Oa(l, !!a, t, !1) : e != null && Oa(l, !!a, e, !0);
        return;
      case "textarea":
        $("invalid", l), n = u = a = null;
        for (c in e)
          if (e.hasOwnProperty(c) && (i = e[c], i != null))
            switch (c) {
              case "value":
                a = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(h(91));
                break;
              default:
                rl(l, t, c, i, e, null);
            }
        ko(l, a, u, n);
        return;
      case "option":
        for (o in e)
          e.hasOwnProperty(o) && (a = e[o], a != null) && (o === "selected" ? l.selected = a && typeof a != "function" && typeof a != "symbol" : rl(l, t, o, a, e, null));
        return;
      case "dialog":
        $("beforetoggle", l), $("toggle", l), $("cancel", l), $("close", l);
        break;
      case "iframe":
      case "object":
        $("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Fu.length; a++)
          $(Fu[a], l);
        break;
      case "image":
        $("error", l), $("load", l);
        break;
      case "details":
        $("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        $("error", l), $("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (v in e)
          if (e.hasOwnProperty(v) && (a = e[v], a != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(h(137, t));
              default:
                rl(l, t, v, a, e, null);
            }
        return;
      default:
        if (kc(t)) {
          for (E in e)
            e.hasOwnProperty(E) && (a = e[E], a !== void 0 && Wf(
              l,
              t,
              E,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (i in e)
      e.hasOwnProperty(i) && (a = e[i], a != null && rl(l, t, i, a, e, null));
  }
  var my = {};
  function ry(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, n = null, c = null, i = null, o = null, v = null, E = null;
        for (g in e) {
          var T = e[g];
          if (e.hasOwnProperty(g) && T != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = T;
              default:
                a.hasOwnProperty(g) || rl(l, t, g, null, a, T);
            }
        }
        for (var s in a) {
          var g = a[s];
          if (T = e[s], a.hasOwnProperty(s) && (g != null || T != null))
            switch (s) {
              case "type":
                g !== T && (el = !0), n = g;
                break;
              case "name":
                g !== T && (el = !0), u = g;
                break;
              case "checked":
                g !== T && (el = !0), v = g;
                break;
              case "defaultChecked":
                g !== T && (el = !0), E = g;
                break;
              case "value":
                g !== T && (el = !0), c = g;
                break;
              case "defaultValue":
                g !== T && (el = !0), i = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(h(137, t));
                break;
              default:
                g !== T && rl(
                  l,
                  t,
                  s,
                  g,
                  a,
                  T
                );
            }
        }
        $c(
          l,
          c,
          i,
          o,
          v,
          E,
          n,
          u
        );
        return;
      case "select":
        g = c = i = s = null;
        for (n in e)
          if (o = e[n], e.hasOwnProperty(n) && o != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = o;
              default:
                a.hasOwnProperty(n) || rl(
                  l,
                  t,
                  n,
                  null,
                  a,
                  o
                );
            }
        for (u in a)
          if (n = a[u], o = e[u], a.hasOwnProperty(u) && (n != null || o != null))
            switch (u) {
              case "value":
                n !== o && (el = !0), s = n;
                break;
              case "defaultValue":
                n !== o && (el = !0), i = n;
                break;
              case "multiple":
                n !== o && (el = !0), c = n;
              default:
                n !== o && rl(
                  l,
                  t,
                  u,
                  n,
                  a,
                  o
                );
            }
        t = i, e = c, a = g, s != null ? Oa(l, !!e, s, !1) : !!a != !!e && (t != null ? Oa(l, !!e, t, !0) : Oa(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        g = s = null;
        for (i in e)
          if (u = e[i], e.hasOwnProperty(i) && u != null && !a.hasOwnProperty(i))
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                rl(l, t, i, null, a, u);
            }
        for (c in a)
          if (u = a[c], n = e[c], a.hasOwnProperty(c) && (u != null || n != null))
            switch (c) {
              case "value":
                u !== n && (el = !0), s = u;
                break;
              case "defaultValue":
                u !== n && (el = !0), g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(h(91));
                break;
              default:
                u !== n && rl(l, t, c, u, a, n);
            }
        Wo(l, s, g);
        return;
      case "option":
        for (var z in e)
          s = e[z], e.hasOwnProperty(z) && s != null && !a.hasOwnProperty(z) && (z === "selected" ? l.selected = !1 : rl(
            l,
            t,
            z,
            null,
            a,
            s
          ));
        for (o in a)
          s = a[o], g = e[o], a.hasOwnProperty(o) && s !== g && (s != null || g != null) && (o === "selected" ? (s !== g && (el = !0), l.selected = s && typeof s != "function" && typeof s != "symbol") : rl(
            l,
            t,
            o,
            s,
            a,
            g
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var D in e)
          s = e[D], e.hasOwnProperty(D) && s != null && !a.hasOwnProperty(D) && rl(l, t, D, null, a, s);
        for (v in a)
          if (s = a[v], g = e[v], a.hasOwnProperty(v) && s !== g && (s != null || g != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (s != null)
                  throw Error(h(137, t));
                break;
              default:
                rl(
                  l,
                  t,
                  v,
                  s,
                  a,
                  g
                );
            }
        return;
      default:
        if (kc(t)) {
          for (var L in e)
            s = e[L], e.hasOwnProperty(L) && s !== void 0 && !a.hasOwnProperty(L) && Wf(
              l,
              t,
              L,
              void 0,
              a,
              s
            );
          for (E in a)
            s = a[E], g = e[E], !a.hasOwnProperty(E) || s === g || s === void 0 && g === void 0 || Wf(
              l,
              t,
              E,
              s,
              a,
              g
            );
          return;
        }
    }
    for (var d in e)
      s = e[d], e.hasOwnProperty(d) && s != null && !a.hasOwnProperty(d) && rl(l, t, d, null, a, s);
    for (T in a)
      s = a[T], g = e[T], !a.hasOwnProperty(T) || s === g || s == null && g == null || rl(l, t, T, s, a, g);
  }
  function nd(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function sy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, c = u.initiatorType, i = u.duration;
        if (n && i && nd(c)) {
          for (c = 0, i = u.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], v = o.startTime;
            if (v > i) break;
            var E = o.transferSize, T = o.initiatorType;
            E && nd(T) && (o = o.responseEnd, c += E * (o < i ? 1 : (i - v) / (o - v)));
          }
          if (--a, t += 8 * (n + c) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var kf = null, If = null;
  function Wu(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function cd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function id(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function fd(l, t, e, a) {
    return e = Wu(
      e
    ).createElement(l), e[xl] = a, e[lt] = t, Jl(e, l, t), Bl(e), e;
  }
  function Pf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var lo = null;
  function dy() {
    var l = window.event;
    return l && l.type === "popstate" ? l === lo ? !1 : (lo = l, !0) : (lo = null, !1);
  }
  var to = typeof setTimeout == "function" ? setTimeout : void 0, vy = typeof clearTimeout == "function" ? clearTimeout : void 0, od = typeof Promise == "function" ? Promise : void 0, md = typeof requestAnimationFrame == "function" ? requestAnimationFrame : to, yy = typeof queueMicrotask == "function" ? queueMicrotask : typeof od < "u" ? function(l) {
    return od.resolve(null).then(l).catch(hy);
  } : to;
  function hy(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function xe(l) {
    return l === "head";
  }
  function rd(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(u), ou(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          oo(
            l.ownerDocument.documentElement
          );
        else if (e === "head") {
          e = l.ownerDocument.head, oo(e);
          for (var n = e.firstChild; n; ) {
            var c = n.nextSibling, i = n.nodeName;
            n[vu] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = c;
          }
        } else
          e === "body" && oo(l.ownerDocument.body);
      e = u;
    } while (e);
    ou(t);
  }
  function sd(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (l === 0) break;
          l--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
      e = a;
    } while (e);
  }
  function dd(l, t, e) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, l.style.viewTransitionName = t, e != null && (l.style.viewTransitionClass = e), e = getComputedStyle(l), e.display === "inline") {
      if (t = l.getClientRects(), t.length === 1) var a = 1;
      else
        for (var u = a = 0; u < t.length; u++) {
          var n = t[u];
          0 < n.width && 0 < n.height && a++;
        }
      a === 1 && (l = l.style, l.display = t.length === 1 ? "inline-block" : "block", l.marginTop = "-" + e.paddingTop, l.marginBottom = "-" + e.paddingBottom);
    }
  }
  function vd(l, t) {
    l = l.style, t = t.style;
    var e = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    l.viewTransitionName = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), e = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, l.viewTransitionClass = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), l.display === "inline-block" && (t == null ? l.display = l.margin = "" : (e = t.display, l.display = e == null || typeof e == "boolean" ? "" : e, e = t.margin, e != null ? l.margin = e : (e = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], l.marginTop = e == null || typeof e == "boolean" ? "" : e, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], l.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function gy(l, t, e) {
    return e = e.ownerDocument.defaultView, {
      rect: l,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= l.bottom && 0 <= l.right && l.top <= e.innerHeight && l.left <= e.innerWidth
    };
  }
  function eo(l) {
    var t = l.getBoundingClientRect(), e = getComputedStyle(l);
    return gy(t, e, l);
  }
  function Ey(l) {
    return l.documentElement.clientHeight;
  }
  function Sy(l) {
    this.addEventListener("load", l), this.addEventListener("error", l);
  }
  function by(l, t, e, a, u, n, c, i, o) {
    var v = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var E = v.startViewTransition({
        update: function() {
          var s = v.defaultView, g = s.navigation && s.navigation.transition, z = v.fonts.status;
          a();
          var D = [];
          if (z === "loaded" && (Ey(v), v.fonts.status === "loading" && D.push(v.fonts.ready)), z = D.length, l !== null)
            for (var L = l.suspenseyImages, d = 0, m = 0; m < L.length; m++) {
              var y = L[m];
              if (!y.complete) {
                var b = y.getBoundingClientRect();
                if (0 < b.bottom && 0 < b.right && b.top < s.innerHeight && b.left < s.innerWidth) {
                  if (d += Bd(y), d > pc) {
                    D.length = z;
                    break;
                  }
                  y = new Promise(
                    Sy.bind(y)
                  ), D.push(y);
                }
              }
            }
          if (0 < D.length)
            return s = Promise.race([
              Promise.all(D),
              new Promise(function(A) {
                return setTimeout(A, 500);
              })
            ]).then(u, u), (g ? Promise.allSettled([g.finished, s]) : s).then(n, n);
          if (u(), g)
            return g.finished.then(
              n,
              n
            );
          n();
        },
        types: e
      });
      v.__reactViewTransition = E;
      var T = [];
      return E.ready.then(
        function() {
          for (var s = v.documentElement.getAnimations({
            subtree: !0
          }), g = 0; g < s.length; g++) {
            var z = s[g], D = z.effect, L = D.pseudoElement;
            if (L != null && L.startsWith("::view-transition")) {
              T.push(z), z = D.getKeyframes();
              for (var d = L = void 0, m = !0, y = 0; y < z.length; y++) {
                var b = z[y], A = b.width;
                if (L === void 0) L = A;
                else if (L !== A) {
                  m = !1;
                  break;
                }
                if (A = b.height, d === void 0) d = A;
                else if (d !== A) {
                  m = !1;
                  break;
                }
                delete b.width, delete b.height, b.transform === "none" && delete b.transform;
              }
              m && L !== void 0 && d !== void 0 && (D.setKeyframes(z), m = getComputedStyle(
                D.target,
                D.pseudoElement
              ), m.width !== L || m.height !== d) && (m = z[0], m.width = L, m.height = d, m = z[z.length - 1], m.width = L, m.height = d, D.setKeyframes(z));
            }
          }
          c();
        },
        function(s) {
          v.__reactViewTransition === E && (v.__reactViewTransition = null);
          try {
            typeof s == "object" && s !== null && s.name === "InvalidStateError" && (s.message === "View transition was skipped because document visibility state is hidden." || s.message === "Skipping view transition because document visibility state has become hidden." || s.message === "Skipping view transition because viewport size changed." || s.message === "Transition was aborted because of invalid state") && (s = null), s !== null && o(s);
          } finally {
            a(), u(), c();
          }
        }
      ), E.finished.finally(function() {
        for (var s = 0; s < T.length; s++)
          T[s].cancel();
        v.__reactViewTransition === E && (v.__reactViewTransition = null), i();
      }), E;
    } catch {
      return a(), u(), c(), null;
    }
  }
  function Ea(l, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + l + "(" + t + ")";
  }
  Ea.prototype.animate = function(l, t) {
    return t = typeof t == "number" ? { duration: t } : w({}, t), t.pseudoElement = this._selector, this._scope.animate(l, t);
  }, Ea.prototype.getAnimations = function() {
    for (var l = this._scope, t = this._selector, e = l.getAnimations({ subtree: !0 }), a = [], u = 0; u < e.length; u++) {
      var n = e[u].effect;
      n !== null && n.target === l && n.pseudoElement === t && a.push(e[u]);
    }
    return a;
  }, Ea.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function yd(l) {
    return {
      name: l,
      group: new Ea("group", l),
      imagePair: new Ea("image-pair", l),
      old: new Ea("old", l),
      new: new Ea("new", l)
    };
  }
  function Et(l) {
    this._fragmentFiber = l, this._observers = this._eventListeners = null;
  }
  Et.prototype.addEventListener = function(l, t, e) {
    var a = null, u = null;
    if (!(e != null && typeof e != "boolean" && (a = e.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var n = this._eventListeners;
      if (gd(n, l, t, e) === -1) {
        var c = this, i = t;
        e != null && typeof e != "boolean" && e.once === !0 && (i = function(o) {
          c.removeEventListener(
            l,
            t,
            e
          ), typeof t == "function" ? t.call(this, o) : t.handleEvent(o);
        }), a !== null && (u = c.removeEventListener.bind(
          c,
          l,
          t,
          e
        ), a.addEventListener("abort", u, { once: !0 }), u = a.removeEventListener.bind(a, "abort", u)), a = au(e), n.push({
          type: l,
          listener: t,
          optionsOrUseCapture: e,
          attachedListener: i,
          cleanup: u
        }), S(
          this._fragmentFiber.child,
          !1,
          Ty,
          l,
          i,
          a
        );
      }
      this._eventListeners = n;
    }
  };
  function Ty(l, t, e, a) {
    return W(l).addEventListener(
      t,
      e,
      a
    ), !1;
  }
  Et.prototype.removeEventListener = function(l, t, e) {
    var a = this._eventListeners;
    if (a !== null && (t = gd(
      a,
      l,
      t,
      e
    ), t !== -1)) {
      var u = a[t];
      e = u.attachedListener;
      var n = u.cleanup;
      u = au(u.optionsOrUseCapture), S(
        this._fragmentFiber.child,
        !1,
        _y,
        l,
        e,
        u
      ), a.splice(t, 1), n !== null && n();
    }
  };
  function _y(l, t, e, a) {
    return W(l).removeEventListener(
      t,
      e,
      a
    ), !1;
  }
  function au(l) {
    return l != null && typeof l != "boolean" && (l.once === !0 || l.signal instanceof AbortSignal) ? { capture: l.capture, passive: l.passive } : l;
  }
  function hd(l) {
    return l == null ? "c=0" : typeof l == "boolean" ? "c=" + (l ? "1" : "0") : "c=" + (l.capture ? "1" : "0");
  }
  function gd(l, t, e, a) {
    if (l.length === 0) return -1;
    a = hd(a);
    for (var u = 0; u < l.length; u++) {
      var n = l[u];
      if (n.type === t && n.listener === e && hd(n.optionsOrUseCapture) === a)
        return u;
    }
    return -1;
  }
  Et.prototype.dispatchEvent = function(l) {
    var t = p(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = W(t);
    var e = this._eventListeners;
    if (e !== null && 0 < e.length || !l.bubbles) {
      var a = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (e)
        for (var u = 0; u < e.length; u++) {
          var n = e[u];
          a.addEventListener(
            n.type,
            n.attachedListener,
            au(n.optionsOrUseCapture)
          );
        }
      if (t.appendChild(a), l = a.dispatchEvent(l), e)
        for (u = 0; u < e.length; u++)
          n = e[u], a.removeEventListener(
            n.type,
            n.attachedListener,
            au(n.optionsOrUseCapture)
          );
      return t.removeChild(a), l;
    }
    return t.dispatchEvent(l);
  }, Et.prototype.focus = function(l) {
    S(
      this._fragmentFiber.child,
      !0,
      Ed,
      l,
      void 0,
      void 0
    );
  };
  function Ed(l, t) {
    return l.tag === 6 ? !1 : (l = W(l), qy(l, t));
  }
  Et.prototype.focusLast = function(l) {
    var t = [];
    S(
      this._fragmentFiber.child,
      !0,
      ao,
      t,
      void 0,
      void 0
    );
    for (var e = t.length - 1; 0 <= e && !Ed(t[e], l); e--) ;
  };
  function ao(l, t) {
    return t.push(l), !1;
  }
  Et.prototype.blur = function() {
    var l = p(
      this._fragmentFiber
    );
    l !== null && (l = W(l), l = Wu(l).activeElement, l !== null && S(
      this._fragmentFiber.child,
      !1,
      Ny,
      l,
      void 0,
      void 0
    ));
  };
  function Ny(l, t) {
    return l.tag === 6 ? !1 : (l = W(l), l === t || l.contains(t) ? (t.blur(), !0) : !1);
  }
  Et.prototype.observeUsing = function(l) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(l), S(
      this._fragmentFiber.child,
      !1,
      zy,
      l,
      void 0,
      void 0
    );
  };
  function zy(l, t) {
    return l.tag === 6 || (l = W(l), t.observe(l)), !1;
  }
  Et.prototype.unobserveUsing = function(l) {
    var t = this._observers;
    if (t !== null && t.has(l)) {
      t.delete(l), S(
        this._fragmentFiber.child,
        !1,
        Oy,
        l,
        void 0,
        void 0
      );
      for (var e = t = 0; e < Gt.length; e++) {
        var a = Gt[e];
        a.fragmentInstance === this && a.observer === l ? l.unobserve(a.instance) : Gt[t++] = a;
      }
      Gt.length = t;
    }
  };
  function Oy(l, t) {
    return l.tag === 6 || (l = W(l), t.unobserve(l)), !1;
  }
  var Gt = [], uo = !1;
  function Ay(l, t, e) {
    Gt.push({
      fragmentInstance: l,
      observer: t,
      instance: e
    }), uo || (uo = !0, By(function() {
      uo = !1;
      var a = Gt;
      Gt = [];
      for (var u = 0; u < a.length; u++) {
        var n = a[u];
        n.observer.unobserve(n.instance);
      }
    }));
  }
  Et.prototype.getClientRects = function() {
    var l = [];
    return S(
      this._fragmentFiber.child,
      !1,
      py,
      l,
      void 0,
      void 0
    ), l;
  };
  function py(l, t) {
    if (l.tag === 6) {
      l = l.stateNode;
      var e = l.ownerDocument.createRange();
      e.selectNodeContents(l), t.push.apply(t, e.getClientRects());
    } else
      l = W(l), t.push.apply(t, l.getClientRects());
    return !1;
  }
  Et.prototype.getRootNode = function(l) {
    var t = p(
      this._fragmentFiber
    );
    return t === null ? this : W(t).getRootNode(l);
  }, Et.prototype.compareDocumentPosition = function(l) {
    var t = p(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var e = [];
    S(
      this._fragmentFiber.child,
      !1,
      ao,
      e,
      void 0,
      void 0
    );
    var a = W(t);
    if (e.length === 0) {
      if (e = a, cl(this._fragmentFiber)) {
        l: {
          for (t = this._fragmentFiber.return; t !== null; ) {
            if (t.tag === 4) {
              t = t.stateNode.containerInfo;
              break l;
            }
            if (t.tag === 3 || t.tag === 5 || t.tag === 27)
              break;
            t = t.return;
          }
          t = null;
        }
        t != null && (e = t);
      }
      t = this._fragmentFiber;
      var u = a = e.compareDocumentPosition(l);
      return e === l ? u = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (e = pl(t)[1], e === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (l = W(e).compareDocumentPosition(
        l
      ), u = l === 0 || l & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = W(e[0]), u = W(e[e.length - 1]);
    var n = cl(this._fragmentFiber) ? t.parentElement : a;
    if (n == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, n = n.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var c = t.compareDocumentPosition(l), i = u.compareDocumentPosition(l), o = c & Node.DOCUMENT_POSITION_CONTAINED_BY || i & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return i = a && n && c & Node.DOCUMENT_POSITION_FOLLOWING && i & Node.DOCUMENT_POSITION_PRECEDING, t = a && t === l || n && u === l || o || i ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && t === l || !n && u === l ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : c, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Dy(
      t,
      this._fragmentFiber,
      e[0],
      e[e.length - 1],
      l
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Dy(l, t, e, a, u) {
    var n = ke(u);
    if (l & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (e = !!n)
        l: {
          for (; n !== null; ) {
            if (n.tag === 7 && (n === t || n.alternate === t)) {
              e = !0;
              break l;
            }
            n = n.return;
          }
          e = !1;
        }
      return e;
    }
    if (l & Node.DOCUMENT_POSITION_CONTAINS) {
      if (n === null)
        return n = u.ownerDocument, u === n || u === n.documentElement || u === n.body;
      l: {
        for (n = t, t = p(t); n !== null; ) {
          if (!(n.tag !== 5 && n.tag !== 3 && n.tag !== 27 || n !== t && n.alternate !== t)) {
            n = !0;
            break l;
          }
          n = n.return;
        }
        n = !1;
      }
      return n;
    }
    return l & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!n) && !(t = n === e) && (t = ct(
      e,
      n,
      Qt
    ), t === null ? t = !1 : (S(
      t,
      !0,
      Ct,
      n,
      e
    ), n = Ol, Ol = null, t = n !== null)), t) : l & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!n) && !(t = n === a) && (t = ct(
      a,
      n,
      Qt
    ), t === null ? t = !1 : (S(
      t,
      !0,
      Xt,
      n,
      a
    ), n = Ol, G = Ol = null, t = n !== null)), t) : !1;
  }
  function Sd(l, t) {
    var e = l.ownerDocument.createRange();
    e.selectNodeContents(l), l = e.getBoundingClientRect(), window.scrollTo(
      window.scrollX + l.left,
      t ? window.scrollY + l.top : window.scrollY + l.bottom - window.innerHeight
    );
  }
  Et.prototype.scrollIntoView = function(l) {
    if (typeof l == "object") throw Error(h(566));
    var t = [];
    S(
      this._fragmentFiber.child,
      !1,
      ao,
      t,
      void 0,
      void 0
    );
    var e = l !== !1;
    if (t.length === 0) {
      var a = pl(
        this._fragmentFiber
      );
      if (a = e ? a[1] || a[0] || p(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        l = W(a), Sd(l, e);
        return;
      }
      if (a = W(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          e = "host" in a ? a.host : null, e !== null && e.scrollIntoView(l);
          return;
        }
        a.scrollIntoView(l);
      }
    }
    for (a = e ? t.length - 1 : 0; a !== (e ? -1 : t.length); ) {
      var u = t[a];
      u.tag === 6 ? (u = W(u), Sd(u, e)) : W(u).scrollIntoView(l), a += e ? -1 : 1;
    }
  };
  function My(l, t) {
    return l = W(l), bd(l, t), !1;
  }
  function bd(l, t) {
    l.reactFragments == null && (l.reactFragments = /* @__PURE__ */ new Set()), l.reactFragments.add(t);
  }
  function Td(l, t) {
    var e = t._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a];
        l.addEventListener(
          u.type,
          u.attachedListener,
          au(u.optionsOrUseCapture)
        );
      }
    l.nodeType !== 3 && (e = t._observers, e !== null && e.forEach(function(n) {
      for (var c = 0, i = 0; i < Gt.length; i++) {
        var o = Gt[i];
        (o.fragmentInstance !== t || o.observer !== n || o.instance !== l) && (Gt[c++] = o);
      }
      Gt.length = c, n.observe(l);
    }), bd(l, t));
  }
  function Cy(l, t) {
    var e = t._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a];
        l.removeEventListener(
          u.type,
          u.attachedListener,
          au(u.optionsOrUseCapture)
        );
      }
    l.nodeType !== 3 && (e = t._observers, e !== null && e.forEach(function(n) {
      typeof n.rootMargin == "string" ? Ay(
        t,
        n,
        l
      ) : n.unobserve(l);
    }), l.reactFragments != null && l.reactFragments.delete(t));
  }
  function no(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          no(e), yn(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Uy(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[vu])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = Dt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Ry(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Dt(l.nextSibling), l === null)) return null;
    return l;
  }
  function _d(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Dt(l.nextSibling), l === null)) return null;
    return l;
  }
  function co(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function io(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Hy(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function Dt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var fo = null;
  function Nd(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return Dt(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function zd(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else e !== "/$" && e !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function qy(l, t) {
    function e() {
      a = !0;
    }
    if (l.ownerDocument.activeElement === l) return !0;
    var a = !1;
    try {
      l.ownerDocument.addEventListener("focus", e, !0), (l.focus || HTMLElement.prototype.focus).call(l, t);
    } finally {
      l.ownerDocument.removeEventListener("focus", e, !0);
    }
    return a;
  }
  function By(l) {
    md(function() {
      md(function(t) {
        return l(t);
      });
    });
  }
  function Od(l, t, e) {
    switch (t = Wu(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(h(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(h(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(h(454));
        return l;
      default:
        throw Error(h(451));
    }
  }
  function Ad(l, t, e) {
    for (var a in e) {
      var u = e[a];
      e.hasOwnProperty(a) && u != null && rl(l, t, a, null, my, u);
    }
    e.dangerouslySetInnerHTML != null && (l.textContent = ""), l.onclick === Vt && (l.onclick = null), yn(l);
  }
  function oo(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    yn(l);
  }
  var Mt = /* @__PURE__ */ new Map(), pd = /* @__PURE__ */ new Set();
  function ku(l) {
    if (typeof l.getRootNode == "function") {
      var t = l.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  var he = x.d;
  x.d = {
    f: Yy,
    r: Gy,
    D: Xy,
    C: Qy,
    L: jy,
    m: xy,
    X: Vy,
    S: Zy,
    M: Ly
  };
  function Yy() {
    var l = he.f(), t = Ec();
    return l || t;
  }
  function Gy(l) {
    var t = _a(l);
    t !== null && t.tag === 5 && t.type === "form" ? Mr(t) : he.r(l);
  }
  var uu = typeof document > "u" ? null : document;
  function Dd(l, t, e) {
    var a = uu;
    if (a && typeof t == "string" && t) {
      var u = Tt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), pd.has(u) || (pd.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), Jl(t, "link", l), Bl(t), a.head.appendChild(t)));
    }
  }
  function Xy(l) {
    he.D(l), Dd("dns-prefetch", l, null);
  }
  function Qy(l, t) {
    he.C(l, t), Dd("preconnect", l, t);
  }
  function jy(l, t, e) {
    he.L(l, t, e);
    var a = uu;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + Tt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Tt(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Tt(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Tt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = nu(l);
          break;
        case "script":
          n = cu(l);
      }
      if (!(Mt.has(n) || (l = w(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Mt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(Iu(n)) || t === "script" && a.querySelector(Pu(n))))) {
        var c = a.createElement("link");
        Jl(c, "link", l), t === "style" && (c[vn] = !0, c.onload = c.onerror = function() {
          xo(c);
        }), Bl(c), a.head.appendChild(c);
      }
    }
  }
  function xy(l, t) {
    he.m(l, t);
    var e = uu;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Tt(a) + '"][href="' + Tt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = cu(l);
      }
      if (!Mt.has(n) && (l = w({ rel: "modulepreload", href: l }, t), Mt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Pu(n)))
              return;
        }
        a = e.createElement("link"), Jl(a, "link", l), Bl(a), e.head.appendChild(a);
      }
    }
  }
  function Zy(l, t, e) {
    he.S(l, t, e);
    var a = uu;
    if (a && l) {
      var u = Na(a).hoistableStyles, n = nu(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if (c = a.querySelector(
          Iu(n)
        ))
          i.loading = 5;
        else {
          l = w(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Mt.get(n)) && mo(l, e);
          var o = c = a.createElement("link");
          Bl(o), Jl(o, "link", l), o._p = new Promise(function(v, E) {
            o.onload = v, o.onerror = E;
          }), o.addEventListener("load", function() {
            i.loading |= 1;
          }), o.addEventListener("error", function() {
            i.loading |= 2;
          }), i.loading |= 4, Oc(c, t, a);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: i
        }, u.set(n, c);
      }
    }
  }
  function Vy(l, t) {
    he.X(l, t);
    var e = uu;
    if (e && l) {
      var a = Na(e).hoistableScripts, u = cu(l), n = a.get(u);
      n || (n = e.querySelector(Pu(u)), n || (l = w({ src: l, async: !0 }, t), (t = Mt.get(u)) && ro(l, t), n = e.createElement("script"), Bl(n), Jl(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Ly(l, t) {
    he.M(l, t);
    var e = uu;
    if (e && l) {
      var a = Na(e).hoistableScripts, u = cu(l), n = a.get(u);
      n || (n = e.querySelector(Pu(u)), n || (l = w({ src: l, async: !0, type: "module" }, t), (t = Mt.get(u)) && ro(l, t), n = e.createElement("script"), Bl(n), Jl(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Md(l, t, e, a) {
    var u = (u = Ee.current) ? ku(u) : null;
    if (!u) throw Error(h(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (e = nu(e.href), t = Na(
          u
        ).hoistableStyles, a = t.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = nu(e.href);
          var n = Na(
            u
          ).hoistableStyles, c = n.get(l);
          if (c || (u = u.ownerDocument || u, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, c), (n = u.querySelector(
            Iu(l)
          )) ? n._p || (c.instance = n, c.state.loading = 5) : (n = Mt.get(l), n || (n = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Mt.set(l, n)), Ky(
            u,
            l,
            n,
            c.state
          ))), t && a === null)
            throw Error(h(528, ""));
          return c;
        }
        if (t && a !== null)
          throw Error(h(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (e = cu(e), t = Na(
          u
        ).hoistableScripts, a = t.get(e), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(h(444, l));
    }
  }
  function nu(l) {
    return 'href="' + Tt(l) + '"';
  }
  function Iu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Cd(l) {
    return w({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Ky(l, t, e, a) {
    if (t = l.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[vn] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      t = l.createElement("link"), t[vn] = !0, t.onload = t.onerror = xo.bind(null, t), Jl(t, "link", e), Bl(t), l.head.appendChild(t);
    a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function cu(l) {
    return '[src="' + Tt(l) + '"]';
  }
  function Pu(l) {
    return "script[async]" + l;
  }
  function Ud(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Tt(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Bl(a), a;
          var u = w({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Bl(a), Jl(a, "style", u), Oc(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = nu(e.href);
          var n = l.querySelector(
            Iu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Bl(n), n;
          a = Cd(e), (u = Mt.get(u)) && mo(a, u), n = (l.ownerDocument || l).createElement("link"), Bl(n);
          var c = n;
          return c._p = new Promise(function(i, o) {
            c.onload = i, c.onerror = o;
          }), Jl(n, "link", a), t.state.loading |= 4, Oc(n, e.precedence, l), t.instance = n;
        case "script":
          return n = cu(e.src), (u = l.querySelector(
            Pu(n)
          )) ? (t.instance = u, Bl(u), u) : (a = e, (u = Mt.get(n)) && (a = w({}, e), ro(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Bl(u), Jl(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(h(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Oc(a, e.precedence, l));
    return t.instance;
  }
  function Oc(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, c = 0; c < a.length; c++) {
      var i = a[c];
      if (i.dataset.precedence === t) n = i;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function mo(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function ro(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Ac = null;
  function Rd(l, t, e) {
    if (Ac === null) {
      var a = /* @__PURE__ */ new Map(), u = Ac = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = Ac, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[vu] || n[xl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = a.get(c);
        i ? i.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function so(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Jy(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (l = t.disabled, typeof t.precedence == "string" && l == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Hd(l, t) {
    return l === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function qd(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Bd(l) {
    return (l.width || 100) * (l.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Yd(l, t) {
    typeof t.decode == "function" && (l.imgCount++, t.complete || (l.imgBytes += Bd(t), l.suspenseyImages.push(t)), l = $y.bind(l), t.decode().then(l, l));
  }
  function wy(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = nu(a.href), n = t.querySelector(
          Iu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = ln.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Bl(n);
          return;
        }
        n = t.ownerDocument || t, a = Cd(a), (u = Mt.get(u)) && mo(a, u), n = n.createElement("link"), Bl(n);
        var c = n;
        c._p = new Promise(function(i, o) {
          c.onload = i, c.onerror = o;
        }), Jl(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = ln.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var pc = 0;
  function Fy(l, t) {
    return l.stylesheets && l.count === 0 && Mc(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Mc(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && pc === 0 && (pc = 62500 * sy());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Mc(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > pc ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Gd(l) {
    if (l.count === 0 && (l.imgCount === 0 || !l.waitingForImages)) {
      if (l.stylesheets) Mc(l, l.stylesheets);
      else if (l.unsuspend) {
        var t = l.unsuspend;
        l.unsuspend = null, t();
      }
    }
  }
  function ln() {
    this.count--, Gd(this);
  }
  function $y() {
    this.imgCount--, Gd(this);
  }
  var Dc = null;
  function Mc(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Dc = /* @__PURE__ */ new Map(), t.forEach(Wy, l), Dc = null, ln.call(l));
  }
  function Wy(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Dc.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Dc.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (e.set(c.dataset.precedence, c), a = c);
        }
        a && e.set(null, a);
      }
      u = t.instance, c = u.getAttribute("data-precedence"), n = e.get(c) || a, n === a && e.set(null, u), e.set(c, u), this.count++, a = ln.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var iu = {
    $$typeof: ql,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0
  };
  function ky(l, t, e, a, u, n, c, i, o) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Kc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kc(0), this.hiddenUpdates = Kc(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Xd(l, t, e, a, u, n, c, i, o, v, E, T) {
    return l = new ky(
      l,
      t,
      e,
      c,
      o,
      v,
      E,
      T,
      i
    ), t = 1, n === !0 && (t |= 24), n = tt(3, null, null, t), l.current = n, n.stateNode = l, t = Ai(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Ci(n), l;
  }
  function Qd(l) {
    return l ? (l = Ha, l) : Ha;
  }
  function jd(l, t, e, a, u, n) {
    u = Qd(u), a.context === null ? a.context = u : a.pendingContext = u, a = Me(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Ce(l, a, t), e !== null && (nt(e, l, t), Uu(e, l, t));
  }
  function xd(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function vo(l, t) {
    xd(l, t), (l = l.alternate) && xd(l, t);
  }
  function Zd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ta(l, 67108864);
      t !== null && nt(t, l, 67108864), vo(l, 67108864);
    }
  }
  function Vd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = gt();
      t = Jc(t);
      var e = ta(l, t);
      e !== null && nt(e, l, t), vo(l, t);
    }
  }
  var fu = !0;
  function Iy(l, t, e, a) {
    var u = M.T;
    M.T = null;
    var n = x.p;
    try {
      x.p = 2, yo(l, t, e, a);
    } finally {
      x.p = n, M.T = u;
    }
  }
  function Py(l, t, e, a) {
    var u = M.T;
    M.T = null;
    var n = x.p;
    try {
      x.p = 8, yo(l, t, e, a);
    } finally {
      x.p = n, M.T = u;
    }
  }
  function yo(l, t, e, a) {
    if (fu) {
      var u = ho(a);
      if (u === null)
        $f(
          l,
          t,
          a,
          Cc,
          e
        ), Kd(l, a);
      else if (th(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (Kd(l, a), t & 4 && -1 < lh.indexOf(l)) {
        for (; u !== null; ) {
          var n = _a(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var c = We(n.pendingLanes);
                  if (c !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var o = 1 << 31 - mt(c);
                      i.entanglements[1] |= o, c &= ~o;
                    }
                    Pt(n), (nl & 6) === 0 && (yc = ft() + 500, wu(0));
                  }
                }
                break;
              case 31:
              case 13:
                i = ta(n, 2), i !== null && nt(i, n, 2), Ec(), vo(n, 2);
            }
          if (n = ho(a), n === null && $f(
            l,
            t,
            a,
            Cc,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        $f(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function ho(l) {
    return l = Pc(l), go(l);
  }
  var Cc = null;
  function go(l) {
    if (Cc = null, l = ke(l), l !== null) {
      var t = U(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = _l(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = Pl(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Cc = l, null;
  }
  function Ld(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (s0()) {
          case Mo:
            return 2;
          case Co:
            return 8;
          case on:
          case d0:
            return 32;
          case Uo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Eo = !1, Ze = null, Ve = null, Le = null, tn = /* @__PURE__ */ new Map(), en = /* @__PURE__ */ new Map(), Ke = [], lh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Kd(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Ze = null;
        break;
      case "dragenter":
      case "dragleave":
        Ve = null;
        break;
      case "mouseover":
      case "mouseout":
        Le = null;
        break;
      case "pointerover":
      case "pointerout":
        tn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        en.delete(t.pointerId);
    }
  }
  function an(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = _a(t), t !== null && Zd(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function th(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return Ze = an(
          Ze,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Ve = an(
          Ve,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return Le = an(
          Le,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return tn.set(
          n,
          an(
            tn.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, en.set(
          n,
          an(
            en.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Jd(l) {
    var t = ke(l.target);
    if (t !== null) {
      var e = U(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = _l(e), t !== null) {
            l.blockedOn = t, Xo(l.priority, function() {
              Vd(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = Pl(e), t !== null) {
            l.blockedOn = t, Xo(l.priority, function() {
              Vd(e);
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Uc(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = ho(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Ic = a, e.target.dispatchEvent(a), Ic = null;
      } else
        return t = _a(e), t !== null && Zd(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function wd(l, t, e) {
    Uc(l) && e.delete(t);
  }
  function eh() {
    Eo = !1, Ze !== null && Uc(Ze) && (Ze = null), Ve !== null && Uc(Ve) && (Ve = null), Le !== null && Uc(Le) && (Le = null), tn.forEach(wd), en.forEach(wd);
  }
  function Rc(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Eo || (Eo = !0, _.unstable_scheduleCallback(
      _.unstable_NormalPriority,
      eh
    )));
  }
  var Hc = null;
  function Fd(l) {
    Hc !== l && (Hc = l, _.unstable_scheduleCallback(
      _.unstable_NormalPriority,
      function() {
        Hc === l && (Hc = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (go(a || e) === null)
              continue;
            break;
          }
          var n = _a(e);
          n !== null && (l.splice(t, 3), t -= 3, ki(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function ou(l) {
    function t(o) {
      return Rc(o, l);
    }
    Ze !== null && Rc(Ze, l), Ve !== null && Rc(Ve, l), Le !== null && Rc(Le, l), tn.forEach(t), en.forEach(t);
    for (var e = 0; e < Ke.length; e++) {
      var a = Ke[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ke.length && (e = Ke[0], e.blockedOn === null); )
      Jd(e), e.blockedOn === null && Ke.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], c = u[lt] || null;
        if (typeof n == "function")
          c || Fd(e);
        else if (c) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, c = n[lt] || null)
              i = c.formAction;
            else if (go(u) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? e[a + 1] = i : (e.splice(a, 3), a -= 3), Fd(e);
        }
      }
  }
  function $d() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(c) {
            return u = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function So(l) {
    this._internalRoot = l;
  }
  qc.prototype.render = So.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(h(409));
    var e = t.current, a = gt();
    jd(e, a, l, t, null, null);
  }, qc.prototype.unmount = So.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      jd(l.current, 2, null, l, null, null), Ec(), t[Ta] = null;
    }
  };
  function qc(l) {
    this._internalRoot = l;
  }
  qc.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Go();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ke.length && t !== 0 && t < Ke[e].priority; e++) ;
      Ke.splice(e, 0, l), e === 0 && Jd(l);
    }
  };
  var Wd = R.version;
  if (Wd !== "19.3.0")
    throw Error(
      h(
        527,
        Wd,
        "19.3.0"
      )
    );
  x.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(h(188)) : (l = Object.keys(l).join(","), Error(h(268, l)));
    return l = hl(t), l = l !== null ? B(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var ah = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Bc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Bc.isDisabled && Bc.supportsFiber)
      try {
        ru = Bc.inject(
          ah
        ), ot = Bc;
      } catch {
      }
  }
  return un.createRoot = function(l, t) {
    if (!J(l)) throw Error(h(299));
    var e = !1, a = "", u = Qr, n = jr, c = xr;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = Xd(
      l,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      c,
      $d
    ), l[Ta] = t.current, Ff(l), new So(t);
  }, un.hydrateRoot = function(l, t, e) {
    if (!J(l)) throw Error(h(299));
    var a = !1, u = "", n = Qr, c = jr, i = xr, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), t = Xd(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      u,
      o,
      n,
      c,
      i,
      $d
    ), t.context = Qd(null), e = t.current, a = gt(), a = Jc(a), u = Me(a), u.callback = null, Ce(e, u, a), e = a, t.current.lanes = e, du(t, e), Pt(t), l[Ta] = t.current, Ff(l), new qc(t);
  }, un.version = "19.3.0", un;
}
var u0;
function sh() {
  if (u0) return To.exports;
  u0 = 1;
  function _() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_);
      } catch (R) {
        console.error(R);
      }
  }
  return _(), To.exports = rh(), To.exports;
}
var dh = sh();
function we({ href: _, children: R }) {
  const Q = window.location.pathname === _;
  return /* @__PURE__ */ f.createElement("a", { href: _, className: Q ? "active" : void 0, "aria-current": Q ? "page" : void 0 }, R);
}
function vh({ currentUser: _, flashes: R = [], children: Q }) {
  const h = _ ? "/dashboard" : "/login";
  return /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement("header", { className: "site-header" }, /* @__PURE__ */ f.createElement("div", { className: "container" }, /* @__PURE__ */ f.createElement("div", { className: "masthead-meta", "aria-label": "Project edition metadata" }, /* @__PURE__ */ f.createElement("span", null, "Sketchbook build"), /* @__PURE__ */ f.createElement("span", null, "Flask · MongoDB · Pinecone"), /* @__PURE__ */ f.createElement("span", null, "Personal AI workspace")), /* @__PURE__ */ f.createElement("div", { className: "nav-row" }, /* @__PURE__ */ f.createElement("a", { className: "brand", href: h }, /* @__PURE__ */ f.createElement("span", { className: "brand-kicker" }, "Personal Knowledge Notes"), /* @__PURE__ */ f.createElement("span", { className: "brand-title" }, "RAG Bot Builder")), /* @__PURE__ */ f.createElement("nav", { className: "nav-links", "aria-label": "Primary navigation" }, _ ? /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement(we, { href: "/dashboard" }, "Dashboard"), /* @__PURE__ */ f.createElement(we, { href: "/personality" }, "Personality"), /* @__PURE__ */ f.createElement(we, { href: "/providers" }, "Providers"), /* @__PURE__ */ f.createElement(we, { href: "/upload" }, "Upload"), /* @__PURE__ */ f.createElement(we, { href: "/chat" }, "Chat"), _.role === "admin" && /* @__PURE__ */ f.createElement(we, { href: "/admin" }, "Admin"), /* @__PURE__ */ f.createElement("a", { href: "/logout" }, "Logout")) : /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement(we, { href: "/login" }, "Login"), /* @__PURE__ */ f.createElement(we, { href: "/signup" }, "Signup")))))), /* @__PURE__ */ f.createElement("main", { className: "container page-shell" }, R.length > 0 && /* @__PURE__ */ f.createElement("section", { className: "flash-stack", "aria-live": "polite" }, R.map(([J, U], _l) => /* @__PURE__ */ f.createElement("div", { className: `flash flash-${J}`, key: `${J}-${_l}` }, U))), Q));
}
function yh() {
  return /* @__PURE__ */ f.createElement("section", { className: "auth-shell" }, /* @__PURE__ */ f.createElement("div", { className: "card narrow-card" }, /* @__PURE__ */ f.createElement("h1", { className: "auth-title" }, "Welcome back."), /* @__PURE__ */ f.createElement("p", { className: "muted auth-subtitle" }, "Sign in to your personal AI workspace."), /* @__PURE__ */ f.createElement("form", { method: "post", action: "/login", className: "stack-form" }, /* @__PURE__ */ f.createElement("label", null, "Email", /* @__PURE__ */ f.createElement("input", { type: "email", name: "email", required: !0, autoComplete: "email", placeholder: "you@example.com" })), /* @__PURE__ */ f.createElement("label", null, "Password", /* @__PURE__ */ f.createElement("input", { type: "password", name: "password", required: !0, autoComplete: "current-password", placeholder: "••••••••" })), /* @__PURE__ */ f.createElement("button", { type: "submit" }, "Login →")), /* @__PURE__ */ f.createElement("p", { className: "inline-note auth-note" }, "Need a test account? ", /* @__PURE__ */ f.createElement("a", { href: "/signup" }, "Create one"), ".")));
}
function hh() {
  return /* @__PURE__ */ f.createElement("section", { className: "auth-shell" }, /* @__PURE__ */ f.createElement("div", { className: "card narrow-card" }, /* @__PURE__ */ f.createElement("h1", { className: "auth-title" }, "Create account."), /* @__PURE__ */ f.createElement("p", { className: "muted auth-subtitle" }, "Set up your personal AI knowledge base."), /* @__PURE__ */ f.createElement("form", { method: "post", action: "/signup", className: "stack-form" }, /* @__PURE__ */ f.createElement("label", null, "Email", /* @__PURE__ */ f.createElement("input", { type: "email", name: "email", required: !0, autoComplete: "email", placeholder: "you@example.com" })), /* @__PURE__ */ f.createElement("label", null, "Password", /* @__PURE__ */ f.createElement("input", { type: "password", name: "password", required: !0, autoComplete: "new-password", placeholder: "Choose a strong password" })), /* @__PURE__ */ f.createElement("label", null, "Confirm Password", /* @__PURE__ */ f.createElement("input", { type: "password", name: "confirm_password", required: !0, autoComplete: "new-password", placeholder: "Repeat password" })), /* @__PURE__ */ f.createElement("button", { type: "submit" }, "Create Account →")), /* @__PURE__ */ f.createElement("p", { className: "inline-note auth-note" }, "Already have an account? ", /* @__PURE__ */ f.createElement("a", { href: "/login" }, "Login"), ".")));
}
function f0({ message: _ }) {
  const R = _.role === "user" ? "user" : "assistant", Q = R === "user" ? "User" : "Assistant";
  return /* @__PURE__ */ f.createElement("div", { className: `chat-bubble ${R}` }, /* @__PURE__ */ f.createElement("strong", null, Q), /* @__PURE__ */ f.createElement("p", null, _.content));
}
function gh({ profile: _, providers: R, documents: Q = [], messages: h = [] }) {
  return /* @__PURE__ */ f.createElement("div", { className: "dashboard-fit" }, /* @__PURE__ */ f.createElement("section", { className: "page-header dashboard-header section-row" }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement("h1", null, "Dashboard"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Your RAG workspace — personality, providers, knowledge base, and chat history.")), /* @__PURE__ */ f.createElement("a", { className: "button-link", href: "/chat" }, "Open Chat →")), /* @__PURE__ */ f.createElement("section", { className: "dashboard-metrics" }, /* @__PURE__ */ f.createElement("article", { className: "card dashboard-card metric-card" }, /* @__PURE__ */ f.createElement("h2", null, "Files"), /* @__PURE__ */ f.createElement("p", { className: "metric" }, Q.length), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Indexed source documents.")), /* @__PURE__ */ f.createElement("article", { className: "card dashboard-card metric-card" }, /* @__PURE__ */ f.createElement("h2", null, "Messages"), /* @__PURE__ */ f.createElement("p", { className: "metric" }, h.length), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Recent records for this account.")), /* @__PURE__ */ f.createElement("article", { className: "card dashboard-card metric-card" }, /* @__PURE__ */ f.createElement("h2", null, "Mode"), /* @__PURE__ */ f.createElement("p", { className: "compact-mode-line" }, /* @__PURE__ */ f.createElement("strong", null, R.chat_provider), " ", /* @__PURE__ */ f.createElement("span", { className: "muted" }, "chat")), /* @__PURE__ */ f.createElement("p", { className: "compact-text" }, /* @__PURE__ */ f.createElement("strong", null, R.embedding_provider), " ", /* @__PURE__ */ f.createElement("span", { className: "muted" }, "embed")))), /* @__PURE__ */ f.createElement("section", { className: "dashboard-details" }, /* @__PURE__ */ f.createElement("article", { className: "card dashboard-card detail-card" }, /* @__PURE__ */ f.createElement("h2", null, "Bot Personality"), /* @__PURE__ */ f.createElement("p", null, /* @__PURE__ */ f.createElement("strong", null, "Name:"), " ", _.bot_name), /* @__PURE__ */ f.createElement("p", null, /* @__PURE__ */ f.createElement("strong", null, "Tone:"), " ", _.tone || "Not set"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, _.description || "No description set."), /* @__PURE__ */ f.createElement("a", { className: "button-link btn-secondary", href: "/personality" }, "Edit Personality")), /* @__PURE__ */ f.createElement("article", { className: "card dashboard-card detail-card" }, /* @__PURE__ */ f.createElement("h2", null, "Providers"), /* @__PURE__ */ f.createElement("p", null, /* @__PURE__ */ f.createElement("strong", null, "Chat:"), " ", R.chat_provider, " / ", R.chat_model), /* @__PURE__ */ f.createElement("p", null, /* @__PURE__ */ f.createElement("strong", null, "Embedding:"), " ", R.embedding_provider, " / ", R.embedding_model), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Chat and embeddings are configured separately."), /* @__PURE__ */ f.createElement("a", { className: "button-link btn-secondary", href: "/providers" }, "Edit Providers")), /* @__PURE__ */ f.createElement("article", { className: "card dashboard-card detail-card knowledge-card" }, /* @__PURE__ */ f.createElement("div", { className: "section-row compact-section-row" }, /* @__PURE__ */ f.createElement("h2", null, "Knowledge Base"), /* @__PURE__ */ f.createElement("a", { href: "/upload" }, "Upload files →")), Q.length ? /* @__PURE__ */ f.createElement("table", null, /* @__PURE__ */ f.createElement("thead", null, /* @__PURE__ */ f.createElement("tr", null, /* @__PURE__ */ f.createElement("th", null, "File"), /* @__PURE__ */ f.createElement("th", null, "Type"), /* @__PURE__ */ f.createElement("th", null, "Chunks"))), /* @__PURE__ */ f.createElement("tbody", null, Q.map((J) => /* @__PURE__ */ f.createElement("tr", { key: J.id }, /* @__PURE__ */ f.createElement("td", null, J.original_filename), /* @__PURE__ */ f.createElement("td", null, J.file_type), /* @__PURE__ */ f.createElement("td", null, J.chunk_count))))) : /* @__PURE__ */ f.createElement("p", { className: "muted" }, "No files uploaded yet.")), /* @__PURE__ */ f.createElement("article", { className: "card dashboard-card detail-card" }, /* @__PURE__ */ f.createElement("div", { className: "section-row compact-section-row" }, /* @__PURE__ */ f.createElement("h2", null, "Recent Chat"), /* @__PURE__ */ f.createElement("a", { href: "/chat" }, "Open chat →")), h.length ? /* @__PURE__ */ f.createElement("div", { className: "chat-preview" }, h.map((J) => /* @__PURE__ */ f.createElement(f0, { message: J, key: J.id ?? `${J.role}-${J.content}` }))) : /* @__PURE__ */ f.createElement("p", { className: "muted" }, "No chat history yet."))));
}
function Eh({ profile: _ }) {
  return /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement("section", { className: "page-header" }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement("h1", null, "Bot Personality"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Configure how your personal assistant should behave."))), /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("form", { method: "post", action: "/personality", className: "stack-form" }, /* @__PURE__ */ f.createElement("div", { className: "grid two-col" }, /* @__PURE__ */ f.createElement("label", null, "Bot Name", /* @__PURE__ */ f.createElement("input", { type: "text", name: "bot_name", defaultValue: _.bot_name, required: !0 })), /* @__PURE__ */ f.createElement("label", null, "Tone", /* @__PURE__ */ f.createElement("input", { type: "text", name: "tone", defaultValue: _.tone, placeholder: "Clear, concise, friendly" }))), /* @__PURE__ */ f.createElement("label", null, "Personality / System Prompt", /* @__PURE__ */ f.createElement("textarea", { name: "personality_prompt", rows: "3", defaultValue: _.personality_prompt, required: !0 })), /* @__PURE__ */ f.createElement("label", null, "Short Description", /* @__PURE__ */ f.createElement("textarea", { name: "description", rows: "2", defaultValue: _.description, placeholder: "What is this bot optimized for?" })), /* @__PURE__ */ f.createElement("div", { className: "form-footer-row" }, /* @__PURE__ */ f.createElement("span", { className: "muted inline-note" }, "💡 Safety & instruction rules are automatically applied to keep your bot schema clean."), /* @__PURE__ */ f.createElement("button", { type: "submit" }, "Save Personality")))));
}
const Yc = {
  chat: {
    groq: ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b", "meta-llama/llama-4-scout-17b-16e-instruct"],
    ollama: ["llama3.2", "llama3.1", "mistral", "gemma2", "phi3"],
    gemini: ["gemini-1.5-flash", "gemini-1.5-pro"],
    openrouter: ["meta-llama/llama-3.1-8b-instruct", "anthropic/claude-3.5-sonnet", "google/gemini-pro-1.5"],
    huggingface: ["meta-llama/Meta-Llama-3-8B-Instruct", "mistralai/Mistral-7B-Instruct-v0.2"]
  },
  embedding: {
    gemini: ["gemini-embedding-001", "text-embedding-004", "gemini-embedding-2"],
    huggingface: ["sentence-transformers/all-MiniLM-L6-v2", "BAAI/bge-small-en-v1.5"],
    ollama: ["nomic-embed-text", "mxbai-embed-large", "all-minilm"],
    pinecone: ["multilingual-e5-large"],
    "sentence-transformers": ["all-MiniLM-L6-v2", "all-mpnet-base-v2"]
  }
}, n0 = {
  "llama-3.3-70b-versatile": "openai/gpt-oss-120b",
  "llama-3.1-8b-instant": "openai/gpt-oss-20b",
  "gemma2-9b-it": "openai/gpt-oss-20b",
  "llama3-8b-8192": "openai/gpt-oss-20b",
  "llama3-70b-8192": "openai/gpt-oss-120b"
};
function c0({ name: _, label: R }) {
  return /* @__PURE__ */ f.createElement("div", { style: { marginTop: -6, marginBottom: 12 } }, /* @__PURE__ */ f.createElement("label", { style: { fontSize: "0.85rem", fontWeight: "normal", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ f.createElement("input", { type: "checkbox", name: _, value: "1" }), " ", R));
}
function Sh({ providers: _, chat_providers: R, embedding_providers: Q }) {
  const [h, J] = Ql.useState(_.chat_provider), [U, _l] = Ql.useState(n0[_.chat_model] || _.chat_model), [Pl, yl] = Ql.useState(_.embedding_provider), [hl, B] = Ql.useState(n0[_.embedding_model] || _.embedding_model), [S, p] = Ql.useState(!1), [cl, pl] = Ql.useState(null), Hl = Ql.useMemo(() => i0(Yc.chat[h], U), [h, U]), W = Ql.useMemo(() => i0(Yc.embedding[Pl], hl), [Pl, hl]);
  async function Ol() {
    p(!0), pl({ kind: "pending", text: "Contacting provider API..." });
    try {
      const G = await fetch("/providers/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_provider: h,
          chat_model: U,
          chat_api_key: document.getElementById("chat_api_key")?.value || ""
        })
      }), Ct = await G.json();
      pl({ kind: G.ok && Ct.ok ? "success" : "error", text: `${G.ok && Ct.ok ? "✓" : "✗"} ${Ct.message || "Connection test failed."}` });
    } catch (G) {
      pl({ kind: "error", text: `✗ Request failed: ${G.message}` });
    } finally {
      p(!1);
    }
  }
  return /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement("section", { className: "page-header" }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement("h1", null, "Providers"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Choose separate providers for generation and embeddings. API keys stay server-side only."))), /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("details", { className: "info-box-details" }, /* @__PURE__ */ f.createElement("summary", null, "💡 View API Key & Pricing Links"), /* @__PURE__ */ f.createElement("div", { className: "info-box", style: { marginTop: 10, marginBottom: 0 } }, /* @__PURE__ */ f.createElement("strong", null, "Pricing Tiers & API Keys:"), /* @__PURE__ */ f.createElement("ul", null, /* @__PURE__ */ f.createElement("li", null, /* @__PURE__ */ f.createElement("strong", null, "Groq:"), " Free beta tier available. ", /* @__PURE__ */ f.createElement("a", { href: "https://console.groq.com/keys", target: "_blank", rel: "noreferrer" }, "Get API Key")), /* @__PURE__ */ f.createElement("li", null, /* @__PURE__ */ f.createElement("strong", null, "Gemini:"), " Generous free tier available. ", /* @__PURE__ */ f.createElement("a", { href: "https://aistudio.google.com/app/apikey", target: "_blank", rel: "noreferrer" }, "Get API Key")), /* @__PURE__ */ f.createElement("li", null, /* @__PURE__ */ f.createElement("strong", null, "Pinecone:"), " Free starter index, paid for scale. ", /* @__PURE__ */ f.createElement("a", { href: "https://app.pinecone.io/", target: "_blank", rel: "noreferrer" }, "Get API Key")), /* @__PURE__ */ f.createElement("li", null, /* @__PURE__ */ f.createElement("strong", null, "Ollama:"), " 100% Free and runs locally on your machine."), /* @__PURE__ */ f.createElement("li", null, /* @__PURE__ */ f.createElement("strong", null, "OpenRouter:"), " Pay-per-token depending on the model. ", /* @__PURE__ */ f.createElement("a", { href: "https://openrouter.ai/keys", target: "_blank", rel: "noreferrer" }, "Get API Key")), /* @__PURE__ */ f.createElement("li", null, /* @__PURE__ */ f.createElement("strong", null, "HuggingFace:"), " Free inference API with rate limits. ", /* @__PURE__ */ f.createElement("a", { href: "https://huggingface.co/settings/tokens", target: "_blank", rel: "noreferrer" }, "Get API Key"))))), /* @__PURE__ */ f.createElement("form", { method: "post", action: "/providers", className: "stack-form", style: { marginTop: 16 } }, /* @__PURE__ */ f.createElement("div", { className: "grid two-col" }, /* @__PURE__ */ f.createElement("label", null, "Chat Provider", /* @__PURE__ */ f.createElement("select", { name: "chat_provider", value: h, onChange: (G) => {
    J(G.target.value), _l(Yc.chat[G.target.value]?.[0] || "");
  }, required: !0 }, R.map((G) => /* @__PURE__ */ f.createElement("option", { value: G, key: G }, G)))), /* @__PURE__ */ f.createElement("label", null, "Chat Model", /* @__PURE__ */ f.createElement("select", { name: "chat_model", id: "chat_model", value: U, onChange: (G) => _l(G.target.value), required: !0 }, Hl.map((G) => /* @__PURE__ */ f.createElement("option", { key: G, value: G }, G))))), /* @__PURE__ */ f.createElement("label", null, "Chat API Key", /* @__PURE__ */ f.createElement("input", { type: "password", id: "chat_api_key", name: "chat_api_key", placeholder: _.has_chat_api_key ? "•••••••••••••••• (leave blank to keep unchanged)" : "Enter Chat API Key (e.g. from console.groq.com/keys)" })), _.has_chat_api_key && /* @__PURE__ */ f.createElement(c0, { name: "clear_chat_key", label: "Clear saved API key" }), /* @__PURE__ */ f.createElement("div", { className: "grid two-col" }, /* @__PURE__ */ f.createElement("label", null, "Embedding Provider", /* @__PURE__ */ f.createElement("select", { name: "embedding_provider", value: Pl, onChange: (G) => {
    yl(G.target.value), B(Yc.embedding[G.target.value]?.[0] || "");
  }, required: !0 }, Q.map((G) => /* @__PURE__ */ f.createElement("option", { value: G, key: G }, G)))), /* @__PURE__ */ f.createElement("label", null, "Embedding Model", /* @__PURE__ */ f.createElement("select", { name: "embedding_model", id: "embedding_model", value: hl, onChange: (G) => B(G.target.value), required: !0 }, W.map((G) => /* @__PURE__ */ f.createElement("option", { key: G, value: G }, G))))), /* @__PURE__ */ f.createElement("label", null, "Embedding API Key", /* @__PURE__ */ f.createElement("input", { type: "password", id: "embedding_api_key", name: "embedding_api_key", placeholder: _.has_embedding_api_key ? "•••••••••••••••• (leave blank to keep unchanged)" : "Enter Embedding API Key (e.g. from aistudio.google.com)" })), _.has_embedding_api_key && /* @__PURE__ */ f.createElement(c0, { name: "clear_embedding_key", label: "Clear saved API key" }), /* @__PURE__ */ f.createElement("div", { className: "form-footer-row", style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ f.createElement("span", { className: "muted inline-note" }, "💡 Chunking uses LangChain `RecursiveCharacterTextSplitter`, not the selected model provider."), /* @__PURE__ */ f.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ f.createElement("button", { type: "button", id: "test-provider-btn", className: "btn-secondary", style: { padding: "10px 16px" }, onClick: Ol, disabled: S }, S ? "Testing..." : "Test Chat Connection"), /* @__PURE__ */ f.createElement("button", { type: "submit" }, "Save Provider Settings"))), cl && /* @__PURE__ */ f.createElement("div", { id: "test-result-box", role: "status", style: { marginTop: 14, padding: "12px 16px", borderRadius: "var(--r-sm)", border: "2px solid", fontSize: "0.9rem", backgroundColor: Oo[cl.kind].background, borderColor: Oo[cl.kind].border, color: Oo[cl.kind].color } }, cl.text))));
}
function i0(_ = [], R) {
  return R && !_.includes(R) ? [R, ..._] : _;
}
const Oo = {
  pending: { background: "#EFF6FF", border: "#3B82F6", color: "#1E3A8A" },
  success: { background: "#ECFDF5", border: "#10B981", color: "#065F46" },
  error: { background: "#FEF2F2", border: "#EF4444", color: "#991B1B" }
};
function bh({ documents: _ = [] }) {
  const [R, Q] = Ql.useState(!1), [h, J] = Ql.useState(!1);
  return /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement("section", { className: "page-header section-row" }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement("h1", null, "Knowledge Base"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Upload PDF, TXT, or DOCX files — chunked and indexed into your private Pinecone namespace."), /* @__PURE__ */ f.createElement("p", { className: "limit-warning inline-limit" }, "Account limit: ", /* @__PURE__ */ f.createElement("strong", null, "2 documents max · 5 MB per file."))), /* @__PURE__ */ f.createElement("form", { action: "/upload/clear", method: "post", onSubmit: (U) => {
    window.confirm("Wipe entire knowledge base and Pinecone vectors? This cannot be undone.") || U.preventDefault();
  } }, /* @__PURE__ */ f.createElement("button", { type: "submit", className: "danger-button" }, "Clear Knowledge Base"))), /* @__PURE__ */ f.createElement("div", { className: "grid two-col upload-grid", style: { alignItems: "start" } }, /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("h2", { className: "heading-spaced", style: { fontSize: "1.1rem", marginBottom: 12 } }, "Upload Document"), /* @__PURE__ */ f.createElement("form", { method: "post", action: "/upload", encType: "multipart/form-data", className: "stack-form", onSubmit: () => {
    J(!0), window.setTimeout(() => Q(!0), 50);
  } }, /* @__PURE__ */ f.createElement("label", null, "Document", /* @__PURE__ */ f.createElement("input", { type: "file", name: "document", accept: ".pdf,.txt,.docx", required: !0 })), /* @__PURE__ */ f.createElement("button", { type: "submit", disabled: h, style: { width: "100%", justifyContent: "center" } }, h ? "Indexing..." : "Upload and Index →"))), /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("h2", { className: "heading-spaced", style: { fontSize: "1.1rem", marginBottom: 12 } }, "Uploaded Files"), _.length ? /* @__PURE__ */ f.createElement("table", { style: { fontSize: "0.82rem" } }, /* @__PURE__ */ f.createElement("thead", null, /* @__PURE__ */ f.createElement("tr", null, /* @__PURE__ */ f.createElement("th", { style: { width: "50%" } }, "Filename"), /* @__PURE__ */ f.createElement("th", { style: { width: "20%" } }, "Type"), /* @__PURE__ */ f.createElement("th", { style: { width: "15%", textAlign: "right" } }, "Chunks"), /* @__PURE__ */ f.createElement("th", { style: { width: "15%", textAlign: "right" } }, "Action"))), /* @__PURE__ */ f.createElement("tbody", null, _.map((U) => /* @__PURE__ */ f.createElement("tr", { key: U.id }, /* @__PURE__ */ f.createElement("td", { title: U.original_filename, style: { maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, U.original_filename), /* @__PURE__ */ f.createElement("td", null, U.file_type), /* @__PURE__ */ f.createElement("td", { style: { textAlign: "right" } }, U.chunk_count), /* @__PURE__ */ f.createElement("td", { style: { textAlign: "right" } }, /* @__PURE__ */ f.createElement("form", { action: `/upload/documents/${U.id}/delete`, method: "post", className: "inline-form", onSubmit: (_l) => {
    window.confirm("Delete this document?") || _l.preventDefault();
  } }, /* @__PURE__ */ f.createElement("button", { type: "submit", className: "danger-button small-danger-button", style: { padding: "4px 8px", fontSize: "0.75rem", boxShadow: "2px 2px 0px 0px #EF4444" } }, "Delete"))))))) : /* @__PURE__ */ f.createElement("p", { className: "muted", style: { marginTop: 10 } }, "No documents uploaded yet."))), /* @__PURE__ */ f.createElement("div", { id: "upload-overlay", className: `upload-overlay${R ? " active" : ""}`, "aria-live": "polite" }, /* @__PURE__ */ f.createElement("div", { className: "overlay-content" }, /* @__PURE__ */ f.createElement("div", { className: "spinner-logo" }), /* @__PURE__ */ f.createElement("h3", null, "Indexing your document…"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Extracting text, generating embeddings, and indexing into Pinecone."))));
}
function Th({ messages: _ = [] }) {
  const [R, Q] = Ql.useState(_), [h, J] = Ql.useState(""), [U, _l] = Ql.useState(!1), [Pl, yl] = Ql.useState(""), hl = Ql.useRef(null), B = Ql.useRef(null);
  Ql.useEffect(() => {
    hl.current && (hl.current.scrollTop = hl.current.scrollHeight);
  }, [R]);
  async function S(p) {
    p.preventDefault();
    const cl = h.trim();
    if (!cl || U) return;
    Q((W) => [...W, { role: "user", content: cl }]), J(""), _l(!0), yl("Retrieving context...");
    const pl = new AbortController(), Hl = window.setTimeout(() => pl.abort(), 12e3);
    try {
      const W = await fetch("/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cl }),
        signal: pl.signal
      }), Ol = await W.json();
      if (!W.ok || !Ol.ok) throw new Error(Ol.error || "Chat request failed.");
      Q((G) => [...G, { role: "assistant", content: Ol.answer }]), yl(`${Ol.context_count} context chunk(s) used.`);
    } catch (W) {
      const Ol = W.name === "AbortError" ? "The request took too long for the serverless time budget. Try a shorter question or use a faster provider." : W.message;
      Q((G) => [...G, { role: "assistant", content: `Error: ${Ol}` }]), yl("Chat failed.");
    } finally {
      window.clearTimeout(Hl), _l(!1), B.current?.focus();
    }
  }
  return /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement("section", { className: "page-header section-row" }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement("h1", null, "Chat"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Ask questions against your bot personality and knowledge base."), /* @__PURE__ */ f.createElement("p", { className: "limit-warning inline-limit" }, "Account limit: ", /* @__PURE__ */ f.createElement("strong", null, "5 messages max."))), /* @__PURE__ */ f.createElement("form", { action: "/chat/clear", method: "post", onSubmit: (p) => {
    window.confirm("Clear your entire chat history?") || p.preventDefault();
  } }, /* @__PURE__ */ f.createElement("button", { type: "submit", className: "danger-button" }, "Clear Chat History"))), /* @__PURE__ */ f.createElement("section", { className: "card chat-card" }, /* @__PURE__ */ f.createElement("div", { id: "chat-log", className: "chat-log", ref: hl, "aria-live": "polite" }, R.length ? R.map((p, cl) => /* @__PURE__ */ f.createElement(f0, { message: p, key: p.id ?? `${p.role}-${cl}` })) : /* @__PURE__ */ f.createElement("div", { className: "chat-bubble assistant" }, /* @__PURE__ */ f.createElement("strong", null, "Assistant"), /* @__PURE__ */ f.createElement("p", null, "No messages yet. Upload documents, then ask a question."))), /* @__PURE__ */ f.createElement("form", { id: "chat-form", className: "chat-form", action: "/chat/send", method: "post", onSubmit: S }, /* @__PURE__ */ f.createElement("div", { className: "chat-input-row" }, /* @__PURE__ */ f.createElement("textarea", { id: "chat-input", name: "message", ref: B, rows: "2", maxLength: "280", placeholder: "Ask a question. Enter sends, Shift+Enter adds a line.", required: !0, value: h, disabled: U, onChange: (p) => J(p.target.value), onKeyDown: (p) => {
    p.key === "Enter" && !p.shiftKey && (p.preventDefault(), p.currentTarget.form?.requestSubmit());
  } }), /* @__PURE__ */ f.createElement("button", { type: "submit", disabled: U }, U ? "Sending" : "Send →")), /* @__PURE__ */ f.createElement("div", { className: "chat-actions" }, /* @__PURE__ */ f.createElement("span", { id: "chat-status", className: "muted", "aria-live": "polite" }, Pl)))));
}
function _h({ users: _ = [], user_count: R = 0, documents: Q = [], provider_overview: h = [], health: J = {} }) {
  return /* @__PURE__ */ f.createElement(f.Fragment, null, /* @__PURE__ */ f.createElement("section", { className: "page-header" }, /* @__PURE__ */ f.createElement("div", null, /* @__PURE__ */ f.createElement("h1", null, "Admin Dashboard"), /* @__PURE__ */ f.createElement("p", { className: "muted" }, "Review users, uploads, provider selections, and basic app health."))), /* @__PURE__ */ f.createElement("section", { className: "grid three-col" }, /* @__PURE__ */ f.createElement("article", { className: "card" }, /* @__PURE__ */ f.createElement("h2", null, "User Count"), /* @__PURE__ */ f.createElement("p", { className: "metric" }, R)), /* @__PURE__ */ f.createElement("article", { className: "card" }, /* @__PURE__ */ f.createElement("h2", null, "Database"), /* @__PURE__ */ f.createElement("p", null, J.sqlite?.message)), /* @__PURE__ */ f.createElement("article", { className: "card" }, /* @__PURE__ */ f.createElement("h2", null, "Pinecone / Uploads"), /* @__PURE__ */ f.createElement("p", null, J.pinecone?.message), /* @__PURE__ */ f.createElement("p", null, J.uploads?.message))), /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("h2", null, "Users"), /* @__PURE__ */ f.createElement("table", null, /* @__PURE__ */ f.createElement("thead", null, /* @__PURE__ */ f.createElement("tr", null, /* @__PURE__ */ f.createElement("th", null, "Email"), /* @__PURE__ */ f.createElement("th", null, "Role"), /* @__PURE__ */ f.createElement("th", null, "Created"), /* @__PURE__ */ f.createElement("th", null, "Action"))), /* @__PURE__ */ f.createElement("tbody", null, _.map((U) => /* @__PURE__ */ f.createElement("tr", { key: U.id }, /* @__PURE__ */ f.createElement("td", null, U.email), /* @__PURE__ */ f.createElement("td", null, U.role), /* @__PURE__ */ f.createElement("td", null, U.created_at), /* @__PURE__ */ f.createElement("td", null, U.role !== "admin" ? /* @__PURE__ */ f.createElement("form", { method: "post", action: `/admin/users/${U.id}/delete` }, /* @__PURE__ */ f.createElement("button", { type: "submit", className: "danger-button" }, "Delete Test User")) : /* @__PURE__ */ f.createElement("span", { className: "muted" }, "Protected"))))))), /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("h2", null, "Provider Overview"), /* @__PURE__ */ f.createElement("table", null, /* @__PURE__ */ f.createElement("thead", null, /* @__PURE__ */ f.createElement("tr", null, /* @__PURE__ */ f.createElement("th", null, "User"), /* @__PURE__ */ f.createElement("th", null, "Chat"), /* @__PURE__ */ f.createElement("th", null, "Embedding"), /* @__PURE__ */ f.createElement("th", null, "Chat Key"), /* @__PURE__ */ f.createElement("th", null, "Embedding Key"))), /* @__PURE__ */ f.createElement("tbody", null, h.map((U, _l) => /* @__PURE__ */ f.createElement("tr", { key: `${U.email}-${_l}` }, /* @__PURE__ */ f.createElement("td", null, U.email), /* @__PURE__ */ f.createElement("td", null, U.chat_provider || "Not set", " / ", U.chat_model || "Not set"), /* @__PURE__ */ f.createElement("td", null, U.embedding_provider || "Not set", " / ", U.embedding_model || "Not set"), /* @__PURE__ */ f.createElement("td", null, U.chat_api_key_masked), /* @__PURE__ */ f.createElement("td", null, U.embedding_api_key_masked)))))), /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("h2", null, "Uploaded File Metadata"), Q.length ? /* @__PURE__ */ f.createElement("table", null, /* @__PURE__ */ f.createElement("thead", null, /* @__PURE__ */ f.createElement("tr", null, /* @__PURE__ */ f.createElement("th", null, "User"), /* @__PURE__ */ f.createElement("th", null, "Filename"), /* @__PURE__ */ f.createElement("th", null, "Type"), /* @__PURE__ */ f.createElement("th", null, "Namespace"), /* @__PURE__ */ f.createElement("th", null, "Chunks"), /* @__PURE__ */ f.createElement("th", null, "Action"))), /* @__PURE__ */ f.createElement("tbody", null, Q.map((U) => /* @__PURE__ */ f.createElement("tr", { key: U.id }, /* @__PURE__ */ f.createElement("td", null, U.email), /* @__PURE__ */ f.createElement("td", null, U.original_filename), /* @__PURE__ */ f.createElement("td", null, U.file_type), /* @__PURE__ */ f.createElement("td", null, U.pinecone_namespace), /* @__PURE__ */ f.createElement("td", null, U.chunk_count), /* @__PURE__ */ f.createElement("td", null, /* @__PURE__ */ f.createElement("form", { method: "post", action: `/admin/documents/${U.id}/delete` }, /* @__PURE__ */ f.createElement("button", { type: "submit", className: "danger-button" }, "Delete Metadata"))))))) : /* @__PURE__ */ f.createElement("p", { className: "muted" }, "No uploaded files yet.")));
}
function Nh({ page: _, props: R }) {
  switch (_) {
    case "login":
      return /* @__PURE__ */ f.createElement(yh, null);
    case "signup":
      return /* @__PURE__ */ f.createElement(hh, null);
    case "dashboard":
      return /* @__PURE__ */ f.createElement(gh, { ...R });
    case "personality":
      return /* @__PURE__ */ f.createElement(Eh, { ...R });
    case "providers":
      return /* @__PURE__ */ f.createElement(Sh, { ...R });
    case "upload":
      return /* @__PURE__ */ f.createElement(bh, { ...R });
    case "chat":
      return /* @__PURE__ */ f.createElement(Th, { ...R });
    case "admin":
      return /* @__PURE__ */ f.createElement(_h, { ...R });
    default:
      return /* @__PURE__ */ f.createElement("section", { className: "card" }, /* @__PURE__ */ f.createElement("h1", null, "Page not found"), /* @__PURE__ */ f.createElement("a", { href: "/dashboard" }, "Return to dashboard"));
  }
}
function zh({ bootstrap: _ }) {
  const { page: R, props: Q = {}, currentUser: h, flashes: J = [] } = _;
  return /* @__PURE__ */ f.createElement(vh, { currentUser: h, flashes: J }, /* @__PURE__ */ f.createElement(Nh, { page: R, props: Q }));
}
const Oh = JSON.parse(document.getElementById("app-state").textContent);
dh.createRoot(document.getElementById("root")).render(/* @__PURE__ */ f.createElement(zh, { bootstrap: Oh }));

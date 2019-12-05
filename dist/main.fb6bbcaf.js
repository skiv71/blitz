// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@skivy71/utils/lib/random.js":[function(require,module,exports) {
class Module {

    static number(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

module.exports = Module
},{}],"../node_modules/@skivy71/utils/lib/string.js":[function(require,module,exports) {
class Module {

    static capitalise(str = '') {
        var s = str.length ? str[0].toUpperCase() : s
        return str.length > 1 ? s + str.substr(1).toLowerCase() : s
    }

    static pad(str = '', pad, len) {
        var delim = ''
        var arr = str.split(delim).slice()
        var method = len > 0 ? 'push' : 'unshift'
        while(arr.length < Math.abs(len)) {
            arr[method](pad)
        }
        return arr.join(delim)
    }

}

module.exports = Module
},{}],"../node_modules/@skivy71/utils/lib/index.js":[function(require,module,exports) {
var random  = require('./random')
var string = require('./string')

module.exports = { random, string }
},{"./random":"../node_modules/@skivy71/utils/lib/random.js","./string":"../node_modules/@skivy71/utils/lib/string.js"}],"../node_modules/@skivy71/utils/index.js":[function(require,module,exports) {
module.exports = require('./lib')
},{"./lib":"../node_modules/@skivy71/utils/lib/index.js"}],"js/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Canvas {
  constructor(elementId, width, height, background) {
    this.elementId = elementId;
    this.width = width;
    this.height = height;
    this.background = background;
    this.tilesets = new Map();
  }

  get context() {
    if (this._context) return this._context;
    if (!this.elementId) throw new Error(`Error creating canvas instance, elementId is required!`);
    var canvas = document.getElementById(this.elementId);
    canvas.width = this.width;
    canvas.height = this.height;
    this._context = canvas.getContext('2d');
    this._canvas = canvas;
    return this.context;
  }

  blocks(list) {
    console.log('buildings...');
    console.log(list);
  }

  draw() {
    console.log('draw');
    var {
      background,
      context,
      width,
      height
    } = this;
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    return this;
  }

  coords(tile, coords, offset = [0, 0]) {
    var [x, y] = coords;
    var [ox, oy] = offset; //        console.log

    var {
      width,
      height
    } = this;
    var dx = x + ox;
    var dy = height - y - tile.height - oy;
    return {
      dx,
      dy
    };
  }

  render(tilesetName, tileName, list, offset) {
    console.log(coords);
    var {
      context,
      tilesets
    } = this;
    var tileset = tilesets.get(tilesetName);
    var tile = tileset.tile(tileName); //var list = Array.isArray(coords) ? coords.slice() : [coords]

    for (var coords of list) {
      var {
        dx,
        dy
      } = this.coords(tile, coords, offset);
      console.log({
        dx,
        dy
      });
      context.drawImage(tileset.image, tile.x, tile.y, tile.width, tile.height, dx, dy, tile.width, tile.height);
    }
  }

  tileset(name, tileset) {
    this.tilesets.set(name, tileset);
    return this;
  }

}

var _default = Canvas;
exports.default = _default;
},{}],"js/tileset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Tileset {
  constructor() {
    this.tiles = new Map();
  }

  _init() {
    var image = new Image();
    image.src = this.src;
    this.image = image;
  }

  image(src) {
    console.log('image', src);
    return new Promise((resolve, reject) => {
      var image = new Image();
      image.src = src;

      image.onload = () => {
        resolve(this);
        this.image = image;
      };

      image.onerror = e => {
        reject(e);
      };
    });
  }

  define(name, x, y, width, height) {
    this.tiles.set(name, {
      x,
      y,
      width,
      height
    });
    return this;
  }

  tile(name) {
    return this.tiles.get(name);
  }

}

var _default = Tileset;
exports.default = _default;
},{}],"img/tilesheet.png":[function(require,module,exports) {
module.exports = "/tilesheet.16c339f5.png";
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _utils = require("@skivy71/utils");

var _canvas = _interopRequireDefault(require("./canvas"));

var _tileset = _interopRequireDefault(require("./tileset"));

var _tilesheet = _interopRequireDefault(require("../img/tilesheet.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main() {
  try {
    var tileset = new _tileset.default();
    await tileset.image(_tilesheet.default);
    tileset.define('brick', 0, 0, 32, 32);
    var canvas = new _canvas.default('canvas', 800, 600, 'black');
    canvas.tileset('main', tileset);
    canvas.draw();
    canvas.render('main', 'brick', [[0, 0], [0, 32], [0, 64], [0, 96]], [10, 10]);
  } catch (e) {
    console.log(e);
  }
}

main(); //canvas.blocks(Array(10).fill(0).map(i => random.number(1, 12)))
//canvas.draw()
},{"@skivy71/utils":"../node_modules/@skivy71/utils/index.js","./canvas":"js/canvas.js","./tileset":"js/tileset.js","../img/tilesheet.png":"img/tilesheet.png"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52460" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map
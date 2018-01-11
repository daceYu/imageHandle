/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId]) {
/******/            return installedModules[moduleId].exports;
/******/        }
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, {
/******/                configurable: false,
/******/                enumerable: true,
/******/                get: getter
/******/            });
/******/        }
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _imgload = __webpack_require__(2);

var _imgload2 = _interopRequireDefault(_imgload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imgload = new _imgload2.default({
    type: "lazyload",
    domclass: "imgload"
});
imgload.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _compatible = __webpack_require__(4);

var _compatible2 = _interopRequireDefault(_compatible);

var _common = __webpack_require__(5);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 构造函数
 * param {Object} type(配置options): 必选 onebyone顺序加载 || timeout延时加载 || lazyload懒加载
 * param {String} domclass(配置options): 必选 图片检索class
 * param {dom Object} container(配置options): 可选 加载容器
 */
function ImgLoad(options) {
    if (!options.type) {
        console.warn("error! Cannot find load type");
        return false;
    }

    var _ref = [options.type, options.domclass, options.container];
    this.type = _ref[0];
    this.domclass = _ref[1];
    var _ref$ = _ref[2];
    this.container = _ref$ === undefined ? document : _ref$;


    _compatible2.default.getClassName();
    this.oriImgs = this.container.getElementsByClassName(this.domclass);
}

/**
 * initialize function 
 * param {String} param: 可选参数
 *    type为'lazyload'时，param表示页面加载完时最多渲染图片的数量
 *    type为'timeout'时，param表示延时的时间间隔，默认为500ms
 */
/**!
 * ImgLoad 图片加载
 * 针对图片过多或过大的页面，可使用该插件选择合适的图片加载方式。目前支持顺序加载、延时加载以及懒加载。
 * 
 * author: yugang <yugang@myhexin.com>
 *
 * @ 兼容
 * PC端——IE6+(IE6不支持base64格式图片)；移动端。
 * v2.1新增: 支持webp格式 (如设置`window._NOWEBP = true`，则不使用webp格式)
 *
 * @ 参数
 * param {Object} type(配置options): 必选 onebyone顺序加载 || timeout延时加载 || lazyload懒加载
 * param {String} domclass(配置options): 必选 图片检索class
 * param {dom Object} container(配置options): 可选 加载容器
 *
 * @ 方法
 *  init(param): 触发加载器；
 *      param
 *  justrender(obj): 函数单加载某张图片；
 *      param {dom Object} obj：需要加载的img节点；
 *
 * @ Example
 * dom:
 *   <img class="imgload" src="base64" data-original='images/banner' data-format='png'>
 * js:
 *   let imgload = new ImgLoad({
 *      type: "lazyload",
 *      domclass: "imgload"
 *   })
 *   imgload.init();
 */
ImgLoad.prototype.init = function (param) {
    var _this = this;

    var init = function init() {
        switch (_this.type) {
            case 'lazyload':
                _this.lazyload(param);
                break;
            case 'timeout':
                _this.timeout(param);
                break;
            case "onebyone":
                _this.onebyone();
                break;
            default:
                console.warn("error! Unsupported type");
        }
    };
    _core2.default.supportWebp(init);
};

/**
 * load one by one 顺序加载
 */
ImgLoad.prototype.onebyone = function () {
    var _this2 = this;

    var loading = function loading(objidx, index) {
        // replace className caused oriImgs.length--
        objidx.className = objidx.className.replace(_this2.domclass, '');

        if (_this2.oriImgs.length > 0) {
            _core2.default.renderNewImg(_this2.oriImgs[0], loading);
        }
    };
    _core2.default.renderNewImg(this.oriImgs[0], loading);
};

/** 
 * timeout 延时加载
 * param {String} time: 延时的时间间隔，默认为500ms
 */
ImgLoad.prototype.timeout = function () {
    var _this3 = this;

    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

    var loading = function loading(objidx, index) {
        // console.log(this.oriImgs.length);
    };

    var _func = function _func(i) {
        return function () {
            console.log(i);
            _core2.default.renderNewImg(_this3.oriImgs[i], loading);
        };
    };
    for (var i = 0; i < this.oriImgs.length; i++) {
        var _time = i * time;
        setTimeout(_func(i), _time);
    }
};

/**
 * lazyLoad
 * param {String} length:页面加载完时最多渲染图片的数量，默认全部渲染
 */
ImgLoad.prototype.lazyload = function (length) {
    var _this4 = this;

    var isPC = _common2.default.isPC();
    var winHeight = parseInt(window.innerHeight || document.documentElement.clientHeight),
        winWidth = parseInt(window.innerWidth || document.documentElement.clientWidth);
    var eventName = isPC ? "scroll" : "touchmove";

    var init = function init() {
        // No rendering object exists
        if (_this4.oriImgs.length < 1) {
            _compatible2.default.removeEvent(window, eventName, init);
            return false;
        }
        scrollEnd(render);
    };

    // scroll handler
    var scrollEnd = function scrollEnd(cb) {
        var pos1 = document.documentElement.scrollTop || document.body.scrollTop;

        // handler scorll fast
        var timer = setInterval(function () {
            var pos2 = document.documentElement.scrollTop || document.body.scrollTop;
            if (Math.abs(pos1 - pos2) < 1.5) {
                clearInterval(timer);
                cb();
            } else {
                pos1 = pos2;
            }
        }, 35);
    };

    // render
    var render = function render(length) {
        var scTop = document.documentElement.scrollTop || document.body.scrollTop;
        scTop = parseInt(scTop);
        // 默认值
        if (!length) length = _this4.oriImgs.length;

        var loading = function loading(objidx) {
            objidx.className = objidx.className.replace(_this4.domclass, "");
        };

        for (var i = 0; i < length; i++) {
            var _height = _this4.oriImgs[i].offsetHeight,
                _top = parseInt(_this4.oriImgs[i].offsetTop);

            // judge render images or not
            if (scTop + winHeight + _height >= _top && _top >= scTop - _height) {
                _core2.default.renderNewImg(_this4.oriImgs[i], loading);
            }
        }
    };

    render(length);
    _compatible2.default.addEvent(window, 'load', function () {
        _compatible2.default.addEvent(window, eventName, init);
    });
};

/**
 * just render one image
 * param {dom Object} obj: image object 
 */
ImgLoad.prototype.justRender = function (obj) {
    _core2.default.renderNewImg(obj);
};

module.exports = ImgLoad;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**!
 * 加载图片核心方法
 * author: yugang <yugang@myhexin.com>
 */

/**
 * chose load `1x` or `2x`
 */
var suffix = function () {
    var dpr = window.devicePixelRatio > 1 ? 2 : 1;
    var suffix = "_" + dpr + "x.";
    return suffix;
}();

/**
 * judge support or not support webp
 * param {Function} callback: callback fucntion
 * explain: 
 *   window._NOWEBP: 是否启用webp，默认启用
 *   window._WEBP: 是否支持webp 0:不支持，1:支持
 */
var supportWebp = function supportWebp(callback) {
    var _img = new Image();
    _img.onload = function () {
        window._WEBP = window._NOWEBP ? 0 : 1;
        if (callback) callback();
    };
    _img.onerror = function () {
        window._WEBP = 0;
        if (callback) callback();
    };
    _img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vuUAAA=";
};

/**
 * render images
 * param {dom Object} objidx: img object
 * param {Function} callback: callback function
 */
var renderNewImg = function renderNewImg(objidx, callback) {
    var _ori = objidx.getAttribute("data-original"); // path
    var _fm = objidx.getAttribute("data-format"); // format

    if (!_ori) {
        console.warn('error! Cannot find "data-original"');
        return false;
    }

    var src = _fm ? "" + _ori + suffix + _fm : _ori;
    // support webp
    if (window._WEBP && _ori.indexOf('.') < 0) {
        src = _ori + ".webp";
    }

    var _img = new Image();
    _img.onload = function () {
        objidx.setAttribute('src', _img.src);
        objidx.removeAttribute('data-original');
        objidx.removeAttribute('data-format');
        if (callback) callback.call(this, objidx);
    };
    _img.src = src;
};

module.exports = {
    suffix: suffix,
    supportWebp: supportWebp,
    renderNewImg: renderNewImg
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _arguments = arguments;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * 兼容处理(IE6+)
 * author: yugang <yugang@myhexin.com>
 */

/** 
 * document.getElementsByClassName
 * Compatible with IE6、IE7、IE8
 */
var getClassName = function getClassName() {
  if (!document.getElementsByClassName) {
    document.getElmentsByClassName = function (className, element) {
      var children = (element || document).getElementsByTagName("*");
      var elements = [];
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(" ");
        for (var j = 0; j < classNames.length; j++) {
          if (classNames[j] === className) {
            elements.push(child);
          }
        }
      }
      return elements;
    };
  }
};

/**
 * add Event listener
 * Compatible with IE6、IE7、IE8
 * param {dom Object} object: 绑定对象
 * param {String} name: 事件名称
 * param {Function} handler: 绑定方法
 * param {Boolean} remove: 是否是移除的事件，本参数是为简化下面的removeEvent函数而写的，对添加事件处理程序不起任何作用
 */
var addEvent = function addEvent(object, name, handler, remove) {
  if ((typeof object === "undefined" ? "undefined" : _typeof(object)) != 'object' || typeof handler != 'function') return false;

  try {
    var type = remove ? "removeEventListener" : "addEventListener";
    object[type](name, handler, false);
  } catch (e) {
    var xc = "_" + name;
    object[xc] = object[xc] || [];

    if (remove) {
      var l = object[xc].length;
      for (var i = 0; i < l; i++) {
        if (object[xc][i].toString() === handler.toString()) object[xc].splice(i, 1);
      }
    } else {
      var _l = object[xc].length;
      var exists = false;
      for (var _i = 0; _i < _l; _i++) {
        if (object[xc][_i].toString() === handler.toString()) exists = true;
      }
      if (!exists) object[xc].push(handler);
    }

    object["on" + name] = function () {
      var l = object[xc].length;
      for (var _i2 = 0; _i2 < l; _i2++) {
        object[xc][_i2].apply(object, _arguments);
      }
    };
  }
};

/**
 * remove Event listener
 */
var removeEvent = function removeEvent(object, name, handler) {
  addEvent(object, name, handler, true);
};

module.exports = {
  getClassName: getClassName,
  addEvent: addEvent,
  removeEvent: removeEvent
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**!
 * 公用方法
 * author: yugang <yugang@myhexin.com>
 */

/**
 * judge Platform is pc
 * return {Boolean} flag: 是否为pc
 */
var isPC = function isPC() {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;break;
        }
    }
    return flag;
};

module.exports = {
    isPC: isPC
};

/***/ })
/******/ ]);
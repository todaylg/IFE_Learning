/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Vue = {
    init: function init(obj) {
        this.el = document.querySelector(obj.el);
        this.elString = this.el.innerHTML;
        this.Vue_obj = {};
        this.walk("data", obj.data);
    },
    walk: function walk(key, obj) {
        this.addParent(key, obj);
        if (this.Vue_obj) {
            this.changeDOM(this.Vue_obj);
        }
    },
    addParent: function addParent(key, obj) {
        var keys = Object.keys(obj); //返回该对象的所有可枚举自身属性的属性名。
        for (var i = 0; i < keys.length; i++) {
            if (_typeof(obj[keys[i]]) === 'object') {
                this.addParent(keys[i], obj[keys[i]]); //user data.user
                obj[keys[i]].parentName = key;
                obj[keys[i]].parentObj = obj;
            } else {
                var value = obj[keys[i]];
                obj[keys[i]] = {
                    Vue_value: value,
                    parentName: key,
                    parentObj: obj
                };
            }
            this.convert(keys[i], obj[keys[i]]);
        }
    },
    convert: function convert(key, val) {
        var key_val = false;
        var keys = Object.keys(val);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] == 'Vue_value') {
                key_val = true;
            }
        }
        if (key_val) {
            var str = "." + key;
            //迭代
            str = this.circle(str, val);
            //去掉最前面多的"."
            str = str.substr(1);
            //收集所有要修改的地方，避免多次操作DOM
            this.Vue_obj[str] = val.Vue_value;
        }
    },
    circle: function circle(str, val) {
        if (val && val.parentObj.parentName != 'data') {
            //没到头
            str = '.' + val.parentName + str;
            //迭代
            this.circle(val.parentObj);
        }
        return str;
    },
    changeDOM: function changeDOM(obj) {
        var keys = Object.keys(obj);
        var elString = this.el.innerHTML.replace(/^\s*|\s*$/g, ""); //去掉返回值里的空格
        for (var i = 0; i < keys.length; i++) {
            //动态生成正则表达式直接修改字符串
            var reg = new RegExp("\{\{" + keys[i] + "\}\}", "gm");
            elString = elString.replace(reg, obj[keys[i]]); //替换为输入的值
        }
        this.el.innerHTML = '';
        this.el.insertAdjacentHTML('afterbegin', elString);
    },
    removeDOM: function removeDOM(el) {
        var childs = el.childNodes;
        for (var i = 0; i < childs.length; i++) {
            el.removeChild(childs[i]);
        }
    }
};

/***/ })
/******/ ]);
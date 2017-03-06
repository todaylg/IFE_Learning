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
        this.data = obj.data;
        this.walk("data", obj.data);
    },
    walk: function walk(key, obj) {
        this.addParent(key, obj);
    },
    addParent: function addParent(key, obj) {
        var keys = Object.keys(obj); //返回该对象的所有可枚举自身属性的属性名。
        for (var i = 0; i < keys.length; i++) {
            if (_typeof(obj[keys[i]]) === 'object') {
                this.addParent(keys[i], obj[keys[i]]); 
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
            this.addEvent(keys[i], obj[keys[i]]);
        }
    },
    addEvent: function addEvent(key, val) {
        var _this = this;
        if (val && val.parentObj && val.parentName == 'data') {
            //第一级对象
            Object.defineProperty(_this.data, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    console.log('你访问了' + key);
                    return val;
                },
                set: function set(newVal) {
                    if (newVal === val.Vue_value) return;
                    val.Vue_value = newVal;
                    _this.convert(key, val);
                }
            });
        } else if (val && val.parentObj && val.parentName != 'data') {
            //深对象
            Object.defineProperty(val.parentObj, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    console.log('你访问了' + key);
                    return val.Vue_value;
                },
                set: function set(newVal) {
                    if (newVal === val.Vue_value) return;
                    val.Vue_value = newVal;
                    _this.convert(key, val);
                }
            });
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
            this.Vue_obj[str] = val.Vue_value;
            this.changeDOM(this.Vue_obj);
        }
    },
    circle: function circle(str, val) {
        if (val && val.parentObj && val.parentName != 'data') {
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
        var tempString;
        for (var i = 0; i < keys.length; i++) {
            //动态生成正则表达式直接修改字符串
            var reg = new RegExp("\{\{" + keys[i] + "\}\}", "gm");
            console.log("reg :" + reg);
            console.log("elString :" + elString);
            console.log("obj[keys[i]] :" + obj[keys[i]]);
            tempString = elString.replace(reg, obj[keys[i]]); //替换为输入的值
        }
        if (elString == tempString) {
            console.log('DOM较之前没有更改，不用重新渲染！');
        } else {
            this.el.innerHTML = '';
            this.el.insertAdjacentHTML('afterbegin', tempString);
        }
    }
};

/***/ })
/******/ ]);
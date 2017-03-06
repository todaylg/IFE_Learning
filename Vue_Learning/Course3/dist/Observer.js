/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.l = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // identity function for calling harmony imports with the correct context
/******/    __webpack_require__.i = function(value) { return value; };

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

/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };

/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Observer = {
    init: function init(key, value) {
        this[key] = value;
        this.watch = {};
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            this.walk(key, value);
        } else {
            console.log('请传入对象');
        }
    },
    walk: function walk(key, obj) {
        var keys = Object.keys(obj); //返回该对象的所有可枚举自身属性的属性名。
        for (var i = 0; i < keys.length; i++) {
            if (_typeof(obj[keys[i]]) === 'object') {
                //递归调用。从而给所有对象的属性都添加get、set
                this.init(keys[i], obj[keys[i]]);
                obj[keys[i]].parentObj = obj; //进行遍历时添加一个parentObj属性指向对象  
                obj[keys[i]].parentName = key;
            } else {
                var value = obj[keys[i]];
                obj[keys[i]] = {
                    value: value,
                    parentName: key,
                    parentObj: obj
                };
            }
            this.convert(keys[i], obj[keys[i]]);
        }
    },
    convert: function convert(key, val) {
        var _this = this;
        Object.defineProperty(val.parentObj, key, {
            enumerable: true,
            configurable: true,
            get: function get() {
                console.log('你访问了' + key);
                return val;
            },
            set: function set(newVal) {
                if (newVal === val) return;
                if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object') {
                    var a = Object.create(Observer);
                    a.init(key, newVal);
                }
                // console.log(`你设置了${key},新的值为${newVal}`);//EL表达式
                if (_this.watch[key]) {
                    ; //触发自己身上的$watch
                    _this.watch[key](newVal);
                }
                //需要循环触发parentObj的callback
                _this.circle(val);
                val.value = newVal;
            }
        });
    },
    $watch: function $watch(val, callback) {
        this.watch[val] = callback;
    },
    circle: function circle(beginObj) {
        if (beginObj.parentObj) {
            if (this.watch[beginObj.parentName]) {
                this.watch[beginObj.parentName]();
            }
            this.circle(beginObj.parentObj); //循环向上传播
        }
    }
};
var app2 = Object.create(Observer);
app2.init("data", {
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。');
});

app2.data.name.firstName = 'hahaha';
// // 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
// app2.data.name.lastName = 'blablabla';
// // 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。

/***/ })
/******/ ]);
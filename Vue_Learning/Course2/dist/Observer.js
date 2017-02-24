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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Code
var Observer = function () {
    function Observer(data) {
        _classCallCheck(this, Observer);

        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            this.data = data;
            this.walk(this.data);
            this.watch = {};
        } else {
            console.log('请传入对象');
        }
    }

    _createClass(Observer, [{
        key: 'walk',
        value: function walk(obj) {
            var keys = Object.keys(obj); //返回该对象的所有可枚举自身属性的属性名。
            for (var i = 0; i < keys.length; i++) {
                this.convert(keys[i], obj[keys[i]]);
                if (_typeof(obj[keys[i]]) === 'object') {
                    //递归调用。从而给所有对象的属性都添加get、set
                    new Observer(obj[keys[i]]);
                }
            }
        }
    }, {
        key: 'convert',
        value: function convert(key, val) {
            var _this = this;
            Object.defineProperty(this.data, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    console.log('你访问了' + key);
                    return val;
                },
                set: function set(newVal) {
                    if (newVal === val) return;
                    if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object') {
                        new Observer(newVal); //递归调用
                    }
                    val = newVal;
                    // console.log(`你设置了${key},新的值为${newVal}`);//EL表达式
                    _this.watch[key](newVal);
                }
            });
        }
    }, {
        key: '$watch',
        value: function $watch(val, callback) {
            this.watch[val] = callback;
        }
    }]);

    return Observer;
}();

var app1 = new Observer({
    name: 'youngwind',
    age: 25
});

// 你需要实现 $watch 这个 API
app1.$watch('age', function (age) {
    console.log('\u6211\u7684\u5E74\u7EAA\u53D8\u4E86\uFF0C\u73B0\u5728\u5DF2\u7ECF\u662F\uFF1A' + age + '\u5C81\u4E86');
});

app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'

/***/ })
/******/ ]);
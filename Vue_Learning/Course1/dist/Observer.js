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

// 要实现的结果如下：
// app1.data.name // 你访问了 name
// app.data.age = 100;  // 你设置了 age，新的值为100
// app2.data.university // 你访问了 university
// app2.data.major = 'science'  // 你设置了 major，新的值为 science


// 观察者构造函数
function Observer(data) {
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        this.data = data;
        this.walk(data);
    } else {
        console.log('请传入对象');
    }
}

var p = Observer.prototype;

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter
p.walk = function (obj) {
    var val = void 0;
    for (var key in obj) {
        // 这里为什么要用hasOwnProperty进行过滤呢？
        // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
        // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

p.convert = function (key, val) {
    //Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。
    //Object.defineProperty(obj, prop, descriptor) obj:需要定义属性的对象。prop:需定义或修改的属性的名字。descriptor:将被定义或修改的属性的描述符。
    Object.defineProperty(this.data, key, { //因为要求是data 属性要能够访问到传递进去的对象。
        enumerable: true, //当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
        configurable: true, //当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。
        get: function get() {
            console.log('你访问了' + key);
            return val;
        },
        set: function set(newVal) {
            console.log('你设置了' + key);
            console.log('新的' + key + ' 新的值为 ' + newVal);
            if (newVal === val) return;
            val = newVal;
        }
    });
};
var app1 = new Observer({
    name: 'youngwind',
    age: 25
});

var app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});

/***/ })
/******/ ]);
// 要实现的结果如下：
// app1.data.name // 你访问了 name
// app.data.age = 100;  // 你设置了 age，新的值为100
// app2.data.university // 你访问了 university
// app2.data.major = 'science'  // 你设置了 major，新的值为 science


// 观察者构造函数
function Observer(data) {
    if(typeof data === 'object'){
        this.data = data;
        this.walk(data)
    }else{
        console.log('请传入对象')
    }
}

let p = Observer.prototype;

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter
p.walk = function (obj) {
    let val;
    for (let key in obj) {
        // 这里为什么要用hasOwnProperty进行过滤呢？
        // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
        // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if (typeof val === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

p.convert = function (key, val) {
    //Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。
    //Object.defineProperty(obj, prop, descriptor) obj:需要定义属性的对象。prop:需定义或修改的属性的名字。descriptor:将被定义或修改的属性的描述符。
    Object.defineProperty(this.data, key, {//因为要求是data 属性要能够访问到传递进去的对象。
        enumerable: true,//当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
        configurable: true,//当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。
        get: function () {
            console.log('你访问了' + key);
            return val
        },
        set: function (newVal) {
            console.log('你设置了' + key);
            console.log('新的' + key + ' 新的值为 ' + newVal)
            if (newVal === val) return;
            val = newVal
        }
    })
};
let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});
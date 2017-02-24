// 观察者构造函数
function Observer(data) {
    if(typeof data === 'object'){
        this.data = data;
        this.walk(data)
    }else{
        console.log('请传入对象')
    }
}

Observer.prototype.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

Observer.prototype.convert = function (key, val) {
    //Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。
    //Object.defineProperty(obj, prop, descriptor) obj:需要定义属性的对象。prop:需定义或修改的属性的名字。descriptor:将被定义或修改的属性的描述符。
    Object.defineProperty(this.data, key, {//因为要求是data属性要能够访问到传递进去的对象。
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
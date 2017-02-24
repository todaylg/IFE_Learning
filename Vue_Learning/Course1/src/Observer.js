class Observer {
    constructor(data) {
    if(typeof data === 'object'){
        this.data = data
        this.walk(this.data)
    }else{
        console.log('请传入对象')
    }
}

    walk(obj) {
        let keys = Object.keys(obj)//返回该对象的所有可枚举自身属性的属性名。
        for (var i = 0; i < keys.length; i++) {
            this.convert(keys[i], obj[keys[i]])
        }
    }

    convert(key, val) {
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log('你访问了' + key);
                return val
            },
            set(newVal) {
                console.log(`你设置了${key},新的值为${newVal}`);//EL表达式
                if (newVal === val) return;
                val = newVal
            }
        })
    }
}

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});
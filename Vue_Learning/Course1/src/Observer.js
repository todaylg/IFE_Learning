var Observer = {
    init:function(data){
        this.data = data;
        if(typeof data === 'object'){
            this.walk(data)
        }else{
            console.log('请传入对象')
        }
    },
   walk:function(obj) {
        let keys = Object.keys(obj)//返回该对象的所有可枚举自身属性的属性名。
        for (var i = 0; i < keys.length; i++) {
            this.convert(keys[i], obj[keys[i]])
        }
    },
    convert:function(key, val) {
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

  
var app1 = Object.create(Observer);
    app1.init({
        name: 'youngwind',
        age: 25
    }) 
var app2 = Object.create(Observer);
    app2.init({
         university: 'bupt',
  major: 'computer'
    }) 

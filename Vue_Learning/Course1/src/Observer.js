var Observer = {
    init:function(data){
        this.data = data;
        this.watch = {};
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
            if(typeof obj[keys[i]] === 'object'){//递归调用。从而给所有对象的属性都添加get、set
                let a =  Object.create(Observer);
                a.init(obj[keys[i]]);
            }
        }
    },
    convert:function(key, val) {
        var _this = this;
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log('你访问了' + key);
                return val
            },
            set(newVal) {
                if (newVal === val) return;
                if(typeof newVal === 'object'){
                    let a =  Object.create(Observer);
                    a.init(newVal);
                }
                val = newVal;
                // console.log(`你设置了${key},新的值为${newVal}`);//EL表达式
                _this.watch[key](newVal);//对象
            }
        })
    },
    $watch:function(val,callback){
        this.watch[val] = callback;
    }
}

  
var app1 = Object.create(Observer);
    app1.init({
        name: 'youngwind',
        age: 25
    }) 

 // 你需要实现 $watch 这个 API
 app1.$watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });

 app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'

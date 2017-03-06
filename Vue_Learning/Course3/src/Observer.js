var Observer = {
    init:function(key,value){
        this[key] = value;
        this.watch = {};
        if(typeof value === 'object'){
            this.walk(key,value)
        }else{
            console.log('请传入对象')
        }
    },
   walk:function(key,obj) {
        let keys = Object.keys(obj)//返回该对象的所有可枚举自身属性的属性名。
        for (var i = 0; i < keys.length; i++) {  
            if(typeof obj[keys[i]] === 'object'){//递归调用。从而给所有对象的属性都添加get、set
                this.init(keys[i],obj[keys[i]]);
                obj[keys[i]].parentObj = obj;//进行遍历时添加一个parentObj属性指向对象  
                obj[keys[i]].parentName = key;
            }else{
                let value = obj[keys[i]];
                obj[keys[i]] = {
                    value: value,
                    parentName: key,
                    parentObj:obj
                };
            }
            this.convert(keys[i], obj[keys[i]])
        }
    },
    convert:function(key, val) {
        var _this = this;
        Object.defineProperty(val.parentObj, key, {
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
                    a.init(key,newVal);
                }
                // console.log(`你设置了${key},新的值为${newVal}`);//EL表达式
                if(_this.watch[key]){;//触发自己身上的$watch
                    _this.watch[key](newVal);
                }
                //需要循环触发parentObj的callback
                _this.circle(val);
                val.value = newVal;
            }
        })
    },
    $watch:function(val,callback){
        this.watch[val] = callback;
    },
    circle:function(beginObj){
        if(beginObj.parentObj){
            if(this.watch[beginObj.parentName]){
                this.watch[beginObj.parentName]();
            }
            this.circle(beginObj.parentObj);//循环向上传播
        }
    }
}
let app2 = Object.create(Observer);
 app2.init("data",{
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
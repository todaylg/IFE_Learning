
var Vue = {
    init:function(obj){
        this.el = document.querySelector(obj.el);
        this.elString = this.el.innerHTML;
        this.Vue_obj = {};
        this.data = obj.data;
        this.walk("data",obj.data);
    },
   walk:function(key,obj) {
        this.addParent(key,obj);
    },
    addParent:function(key,obj){
        var keys = Object.keys(obj)//返回该对象的所有可枚举自身属性的属性名。
        for (var i = 0; i < keys.length; i++) {  
            if(typeof obj[keys[i]] === 'object'){
                this.addParent(keys[i],obj[keys[i]]);
                obj[keys[i]].parentName = key;
                obj[keys[i]].parentObj = obj;
            }else{
               var value = obj[keys[i]];
                obj[keys[i]] = {
                    Vue_value: value,
                    parentName: key,
                    parentObj:obj
                };
            }
            this.addEvent(keys[i], obj[keys[i]])
        }
    },
    addEvent:function(key,val){
        var _this = this;
        if(val&&val.parentObj&&val.parentName =='data'){//第一级对象
            Object.defineProperty(_this.data, key, {
                enumerable: true,
                configurable: true,
                get() {
                    console.log('你访问了' + key);
                    return val
                },
                set(newVal) {
                    if (newVal === val.Vue_value) return;
                    val.Vue_value = newVal;
                    _this.convert(key,val);
                }
            });
        }else if(val&&val.parentObj&&val.parentName !='data'){//深对象
            Object.defineProperty(val.parentObj, key, {
                enumerable: true,
                configurable: true,
                get() {
                    console.log('你访问了' + key);
                    return val.Vue_value
                },
                set(newVal) {
                    if (newVal === val.Vue_value) return;
                    val.Vue_value = newVal;
                    _this.convert(key,val);
                }
            });
        }
    },
    convert:function(key, val) {
        var key_val = false;
        var keys = Object.keys(val)
        for(var i = 0;i<keys.length;i++){
            if(keys[i] == 'Vue_value'){
                key_val = true;
            }
        }
        if(key_val){
            var str = ("."+key);
            //迭代
            str = this.circle(str,val);
            //去掉最前面多的"."
            str = str.substr(1);
            //收集所有要修改的地方，避免多次操作DOM
            this.Vue_obj[str] = val.Vue_value;
            this.changeDOM(this.Vue_obj);
        }
    },
    circle:function(str,val){
         if(val&&val.parentObj&&val.parentName!='data'){//没到头  
            str = ('.'+val.parentName+str);
            //迭代
            this.circle(val.parentObj);
        }
        return str;
    },
    changeDOM:function(obj){
        var keys = Object.keys(obj);
        var elString = this.el.innerHTML.replace(/^\s*|\s*$/g, "");//去掉返回值里的空格
        var tempString;
        for(var i = 0;i<keys.length;i++){
            //动态生成正则表达式直接修改字符串
            var reg = new RegExp("\{\{"+keys[i]+"\}\}","gm");
            tempString = elString.replace(reg,obj[keys[i]]);//替换为输入的值
        }
        if(elString == tempString){//添加一次对比，没有改动就不渲染DOM
            console.log('DOM较之前没有更改，不用重新渲染！');
        }else{
            this.el.innerHTML = '';
            this.el.insertAdjacentHTML('afterbegin',tempString);
        }
    }
}

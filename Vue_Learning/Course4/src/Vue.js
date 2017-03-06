var Vue = {
    init:function(obj){
        this.el = document.querySelector(obj.el);
        this.elString = this.el.innerHTML;
        this.Vue_obj = {};
        this.walk("data",obj.data);
    },
   walk:function(key,obj) {
        this.addParent(key,obj);
        if(this.Vue_obj){
            this.changeDOM(this.Vue_obj);
        }
    },
    addParent:function(key,obj){//以便能解决多层对象嵌套以及底层对象重名的情况
        var keys = Object.keys(obj);
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
            this.convert(keys[i], obj[keys[i]])
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
        }
        
    },
    circle:function(str,val){//迭代完成字符串拼接
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
        for(var i = 0;i<keys.length;i++){
            //动态生成正则表达式直接修改字符串
            var reg = new RegExp("\{\{"+keys[i]+"\}\}","gm");
            elString = elString.replace(reg,obj[keys[i]]);//替换为输入的值
        }
        this.el.innerHTML = '';//先删除节点
        this.el.insertAdjacentHTML('afterbegin',elString);
    }
}

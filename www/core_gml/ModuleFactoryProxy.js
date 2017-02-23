/**
 * 模块工厂
 * Created by guominglong on 2017/2/21.
 */

/**
 * 程序主容器
 * */
var mod_m = "ModuleMaster";

/**
 * 我的中心
 * */
var mod_mc = "ModuleMyCenter";


/**
 * F&Q问答帮助模块
 * */
var mod_fq = "ModuleFandQ";

/**
 * 模块字典
 * */
var moduleMap = {}
moduleMap[mod_m] = {'viewPath':'./modules/mod_master/V_MasterPage.html','jsPath':'./modules/mod_master/P_MasterPage.js','view':null,'controller':null};
moduleMap[mod_mc] = {'viewPath':'./modules/mod_CustomCenter/V_CustomCenter.html','jsPath':'./modules/mod_CustomCenter/P_CustomCenter.js','view':null,'controller':null};
moduleMap[mod_fq] = {'viewPath':'./modules/mod_FandQ/V_FandQ.html','jsPath':'./modules/mod_CustomCenter/P_FandQ.js','view':null,'controller':null};
function ModuleFactoryProxy(){

    /**
     * 加载并呈现指定模块
     * @param mName 模块名称
     * @param completeFunc 加载成功后的回调函数
     * @param errFunc 加载失败后的回调函数
     * */
    this.loadModule = function(mName,completeFunc,errFunc){
        var mod = moduleMap[mName];
        if(mod == null || typeof(mod) == undefined){
            if(errFunc != null && typeof(errFunc) == "function"){
                errFunc("要加载的模块"+mName+"不存在");
            }
            return;
        }
        var viewPath = this.getViewPathByName(mName) || "";
        var controllerPath = this.getJsPathByName(mName) || "";
        if(viewPath == "" || controllerPath == ""){
            if(errFunc != "" && typeof(errFunc) == "function") {
                errFunc("模块" + mName + "缺少view或者controller");
            }
            return;
        }else{
            //所有的必要组件都存在
            //加载controller
            $.ajax({url:controllerPath,async:true,dataType:'script',type:'post',success:function(data){
                var resultText = data;
                if(resultText != ""){
                    var scrId = mName +'JS';
                    //创建一个新的脚本node
                    var controllerScriptNode = document.createElement('script');
                    controllerScriptNode.innerHTML = resultText;
                    controllerScriptNode.id = scrId;
                    //删除旧的同ID脚本
                    var oldJsNode = document.querySelector('#'+scrId);
                    if(oldJsNode != null){
                        document.head.removeChild(oldJsNode);
                    }
                    //添加新的脚本
                    document.head.appendChild(controllerScriptNode);
                    //通知上层,加载已完毕
                    completeFunc(viewPath);
                }else if(errFunc != "" && typeof(errFunc) == "function") {
                    errFunc("模块" + mName + "controller不合法");
                }else{
                    console.log("模块" + mName + "controller不合法");
                }
            },error:function(xr, textStatus, errorThrown){
                var resultIn = "加载模块" + mName + "的controller出错,原因:"+xr.responseText;
                if(errFunc != "" && typeof(errFunc) == "function") {
                    errFunc(resultIn);
                }else{
                    console.log(resultIn);
                }
            }})
        }

    }

    /**
     * 通过moduleName,获取view的html页面地址
     * */
    this.getViewPathByName = function(modName){
        return this.getModuleAttribute(modName,'viewPath');
    }

    /**
     * 通过moduleName,获取模块对应的JS的页面地址
     * */
    this.getJsPathByName = function(modName){
        return this.getModuleAttribute(modName,'jsPath');
    }

    /**
     * 通过moduleName,获取view视图节点对象
     * */
    this.getViewByName = function(modName){
        return this.getModuleAttribute(modName,'view');
    }

    /**
     * 通过moduleName,获取view的controller对象
     * */
    this.getControllerByName = function(modName){
        return this.getModuleAttribute(modName,'controller');
    }
    this.getModuleAttribute = function(modName,attribKey){
        var mod = moduleMap[modName]
        if(mod != null){
            return mod[attribKey];
        }else{
            return null;
        }
    }
}
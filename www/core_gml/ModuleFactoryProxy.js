/**
 * 模块工厂
 * Created by guominglong on 2017/2/21.
 */

/**
 * 首页
 * */
var mod_m = "ModuleMaster";

/**
 * 我的中心
 * */
var mod_mc = "ModuleMyCenter";

/**
 * 模块字典
 * */
var moduleMap = {}
moduleMap[mod_m] = {'view':'./modules/mod_master/V_MasterPage.html','controller':'./modules/mod_master/P_MasterPage.js'};
moduleMap[mod_mc] = {'view':'./modules/mod_myCenter/V_MyCenter.html','controller':'./modules/mod_myCenter/P_MyCenter.js'};

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
        var viewPath = mod["view"] || "";
        var controllerPath = mod["controller"] || "";
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

}
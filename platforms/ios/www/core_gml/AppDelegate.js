/**
 * 程序主入口
 * Created by guominglong on 2017/2/23.
 */
function AppDelegate(){
    /**
     * 开始
     * */
    this.start = function(){

        this.addEvents();//添加相关事件
        ons.ready(function() {
            console.log("Onsen UI is ready!");
        });


        //加载app的根页面
        new ModuleFactoryProxy().loadModule(mod_m,function(pagePath){
            $.ajax({url:pagePath,async:true,dataType:'html',type:'post',success:function(data){
                var resultText = data;
                if(resultText != ""){
                    var loadedNode = document.createElement('div')
                    loadedNode.innerHTML = resultText;
                    //添加根页面到dom树
                    document.body.appendChild(loadedNode);

                }else{
                    console.log("app根页面加载失败");
                }
            },error:function(xr, textStatus, errorThrown){
                var resultIn = "加载模块" + mName + "的controller出错,原因:"+xr.responseText;
                console.log(resultIn);
            }})
        },function(errInfo){
            console.log(errInfo)
        })
    }

    /**
     * 结束
     * */
    this.stop = function(){

    }

    /**
     * 添加监听事件
     * */
    this.addEvents = function(){
        //page初始化函数监听
        document.addEventListener(PageEvent.Init,function(e){
            var pageId = e.target.id;//获取pageID
            var modName = pageId.substring(0,pageId.lastIndexOf('_P'));//获取page所属的模块name
            var controller = new ModuleFactoryProxy().getControllerByName(modName);//根据模块name获取模块对应的controller
            if(controller != null){
                controller.init();//调用controller的初始化函数
            }
        });

        //page释放监听
        document.addEventListener(PageEvent.Destroy,function(e){

            var pageId = e.target.id;//获取pageID
            var modName = pageId.substring(0,pageId.lastIndexOf('_P'));//获取page所属的模块name
            var controller = new ModuleFactoryProxy().getControllerByName(modName);//根据模块name获取模块对应的controller
            if(controller != null){
                controller.destroy();//调用controller的释放函数
            }
        })

        //page显示时
        document.addEventListener(PageEvent.Show,function(e){

            var pageId = e.target.id;//获取pageID
            var modName = pageId.substring(0,pageId.lastIndexOf('_P'));//获取page所属的模块name
            var controller = new ModuleFactoryProxy().getControllerByName(modName);//根据模块name获取模块对应的controller
            if(controller != null){
                controller.show();//调用controller的显示函数
            }
        })

        //page隐藏时
        document.addEventListener(PageEvent.Hide,function(e){
            var pageId = e.target.id;//获取pageID
            var modName = pageId.substring(0,pageId.lastIndexOf('_P'));//获取page所属的模块name
            var controller = new ModuleFactoryProxy().getControllerByName(modName);//根据模块name获取模块对应的controller
            if(controller != null){
                controller.hide();//调用controller的隐藏函数
            }
        })


    }

}
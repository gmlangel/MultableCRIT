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
                    var loadedNode = document.createElement('html')
                    loadedNode.innerHTML = resultText;
                    var rootPageNode = loadedNode.children[1].children[0];
                    //添加根页面到dom树
                    document.body.appendChild(rootPageNode);
                    //初始化
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

        });

        //page释放监听
        document.addEventListener(PageEvent.Destroy,function(e){

        })

        //page显示时
        document.addEventListener(PageEvent.Show,function(e){

        })

        //page隐藏时
        document.addEventListener(PageEvent.Hide,function(e){

        })
    }
}
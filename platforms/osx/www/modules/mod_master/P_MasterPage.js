/**
 * Created by guominglong on 2017/2/20.
 */
function MasterPage(){
    var maxLoadCount = 0;
    var currentLoadCount = 0;
    var selfInstance = null;
    var dataProvider = [
        {"titName":'常见问题',"modName":mod_fq},
        {"titName":'全部工单',"modName":mod_tl},
        {"titName":'与我相关',"modName":mod_cc}
    ];

    this.init = function(){

        selfInstance = this;
        maxLoadCount = dataProvider.length;
        //添加相关处理事件
        this.addEvents();

        //加载各个子页面
        this.createMod(dataProvider[currentLoadCount].titName,dataProvider[currentLoadCount].modName);

    }

    this.show = function(){

    }

    this.destroy = function(){

    }

    this.hide = function(){

    }

    this.addEvents = function(){
        var tabContainer  = document.getElementById('mainTabbar');
        //为容器tabContainer添加页面切换事件
        tabContainer.addEventListener('postchange',function(e){
            var tabbar = e.target;
            var selecteIdx = tabbar.getActiveTabIndex();//获取当前选中项的索引
            //设置title
            var titNode = ons._util.createElement("<div class='center' id='mainT'>"+dataProvider[selecteIdx].titName+"</div>")
            var titBar = document.getElementById("mainTitleBar");
            //移除旧的
            if(titBar.querySelector('#mainT')){
                titBar.removeChild(titBar.querySelector('#mainT'))
            }
            //添加新的
            titBar.appendChild(titNode);
        })
    }

    this.createMod = function(title,modName){
        new ModuleFactoryProxy().loadModule(modName,function(path){

            var tabNode = ons._util.createElement('<ons-tab label="'+title+'" page="'+path+'"></ons-tab>');
            var tabContainer  = document.getElementById('mainTabbar');
            tabContainer.childNodes[1].appendChild(tabNode);
            if(currentLoadCount == 0){
                //当第一页加载完毕时,设置其为首页
                tabContainer.setActiveTab(0);
            }
            currentLoadCount ++;
            if(currentLoadCount < maxLoadCount)
            {
                //加载下一页
                selfInstance.createMod(dataProvider[currentLoadCount].titName,dataProvider[currentLoadCount].modName);
            }
        },function(errInfo){

            console.log(errInfo);
            currentLoadCount ++;
            if(currentLoadCount < maxLoadCount)
            {
                //加载下一页
                selfInstance.createMod(dataProvider[currentLoadCount].titName,dataProvider[currentLoadCount].modName);
            }
        })
    }
}

//向模块map中注册controller
moduleMap[mod_m]["controller"] = new MasterPage();
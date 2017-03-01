/**
 * Created by guominglong on 2017/2/23.
 */

function FandQ(){
    var selfinstance = null;
    var currentSelectedIdx = 0;//当前选择的子项
    this.init = function(){
        selfinstance = this;
        //加载数据源
        this.loadDataProvider('./assets/FandQ_Provider.html',function(){
            //当数据源加载成功后,将数据源绑定到显示对象列表
            selfinstance.makeLazyListDelegate();
            //批量添加点击事件
            var items = $('#ModuleFandQ_P').find('ons-list-item');
            $(items).each(function(idx,item){
                $(item).click(function(e){
                    currentSelectedIdx = parseInt(item.getAttribute('dataid'));
                    //加载子页面的脚本
                    new ModuleFactoryProxy().loadModule(mod_fq_grp,function(subPagePath){
                        //添加页面更换完毕的函数
                        document.getElementById('mainNav').addEventListener(NavigatorEvent.PushEnd,selfinstance.onmainNavPushEnd)
                        //显示子页面
                        document.getElementById('mainNav').pushPage(subPagePath);
                    })

                })
            })

        });
    }
    //当页面切换完毕
    this.onmainNavPushEnd = function(e){
        document.getElementById('mainNav').removeEventListener(NavigatorEvent.PushEnd,selfinstance.onmainNavPushEnd);
        //填充自页面的数据
        var ctr = new ModuleFactoryProxy().getControllerByName(mod_fq_grp);
        ctr.fillInfo(selfinstance.getGroupinfoByIdx(currentSelectedIdx).innerHTML,selfinstance.getGroupSubInfoArrByIdx(currentSelectedIdx));
    }

    this.show = function(){
    }

    this.destroy = function(){
    }

    this.hide = function(){
    }

    //懒加载list的委托
    this.makeLazyListDelegate = function(){
        var myList = document.getElementById('level_top');
        myList.delegate = {
            createItemContent: function(i) {
                return ons._util.createElement(
                    '<ons-list-item dataid="'+i+'" style="font-size: 14px;font-family: -apple-system, \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;">' + selfinstance.getGroupinfoByIdx(i).innerHTML + '<ons-toolbar-button class=\"right\"><ons-icon icon=\'md-chevron-right\'></ons-icon></ons-toolbar-button></ons-list-item>'
                );
            },
            countItems: function() {
                return FandQ.dataProvider.length;
            },
            calculateItemHeight: function(idx) {
                return ons.platform.isAndroid()?48:44;
            }
        };
        //刷新列表
        myList.refresh();
    }
    //加载数据源
    this.loadDataProvider = function(_url,comp){
        $.ajax({
            url:_url,
            type:'post',
            async:true,
            dataType:'html',
            success:function(data){
                if(data != ""){
                    var xmln = document.createElement('div');
                    xmln.innerHTML = data;
                    FandQ.dataProvider = selfinstance.appendStyle(xmln);
                }
                if(comp != null && typeof(comp) == 'function'){
                    comp()//加载成功
                }
            },
            error:function(xr, textStatus, errorThrown){
                if(err != null && typeof(err) == "function"){
                    err(xr.responseText);
                }else{
                    console.log(xr.responseText);
                }
            }
        })
    }
    this.appendStyle = function(baseNode){
        var bn = $(baseNode)[0]
        $(bn).find('span').each(function(idx,node){
            node.className = 'div-group-titleStyle';
        })
        $(bn).find('ul').each(function(idx,node){
            node.className = 'div-group-ulStyle';
        })
        $(bn).find('#t').each(function(idx,node){
            node.className = 'div-item-list-p';
        })
        $(bn).find('#c').each(function(idx,node){
            node.className = 'div-group-ulStyle';
        })
        return bn.children;
    }

    //获取一条指定索引的数据
    this.getGroupinfoByIdx = function(idx){
        if(FandQ.dataProvider == null || FandQ.dataProvider.length == 0){
            return null
        }else{
            var divGroup = FandQ.dataProvider[idx];
            return divGroup.getElementsByTagName('div-client-title')[0];
        }
    }

    //获取一条指定索引的子级数据
    this.getGroupSubInfoArrByIdx = function(idx){
        if(FandQ.dataProvider == null || FandQ.dataProvider.length == 0){
            return null
        }else{
            var divGroup = FandQ.dataProvider[idx];
            return divGroup.getElementsByTagName('div-group');
        }
    }
}

FandQ.dataProvider = null;//全局fandQ数据源
//向模块map中注册controller
moduleMap[mod_fq]["controller"] = new FandQ();
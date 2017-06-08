/**
 * Created by guominglong on 2017/2/23.
 */

function FandQGroup(){
    var selfinstance = null;
    var currentSelectedIdx = 0;//当前选择的子项
    var data = null;
    this.init = function(){
        selfinstance = this;
        //显示loading
        loadingNode = ons._util.createElement("<div class='loadingStyle'><ons-progress-circular indeterminate></ons-progress-circular></div>");
        document.getElementById('ModuleFandQgrp_P').appendChild(loadingNode)
        //加载数据源
        var tempproviderUrl = cur_language == 'zh' ? providerUrl_zh : providerUrl_en;
        this.loadDataProvider(tempproviderUrl,function(){
            document.getElementById('ModuleFandQgrp_P').removeChild(loadingNode);
            //当数据源加载成功后,将数据源绑定到显示对象列表
            selfinstance.fillInfo(selfinstance.getTitleByIdx(0).innerHTML,selfinstance.getDataArrByIdx(0));

        });
        //$('body').find('ons-back-button').each(function(idx,node){
        //    var titleStr = node.innerHTML;
        //    if(cur_language == 'zh'){
        //        node.innerHTML = titleStr.replace('>返回<','>back<')
        //    }
        //})
    }

    //加载数据源
    this.loadDataProvider = function(_url,comp){
        $.ajax({
            url:_url,
            type:'get',
            async:true,
            dataType:'html',
            success:function(data){
                if(data != ""){
                    //获取到了数据源
                    var xmln = document.createElement('div');
                    xmln.innerHTML = data;
                    FandQGroup.dataProvider = selfinstance.appendStyle(xmln);//为数据源追加样式
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

    //当页面切换完毕
    this.onmainNavPushEnd = function(e){
        document.getElementById('mainNav').removeEventListener(NavigatorEvent.PushEnd,selfinstance.onmainNavPushEnd);
        //填充自页面的数据
        var ctr = new ModuleFactoryProxy().getControllerByName(mod_fq_sub);
        ctr.fillInfo(selfinstance.getGroupSubInfoArrByIdx(currentSelectedIdx));
    }

    this.show = function(){
    }

    this.destroy = function(){
    }

    this.hide = function(){
    }

    //懒加载list的委托
    this.makeLazyListDelegate = function(){
        if(data == null || data.length == 0)
        {
            return;
        }
        var myList = document.getElementById('level1_list');
        myList.innerHTML = ''
        var j = data.length;
        for(var i=0;i<j;i++){
            var itemdata = ons._util.createElement(
                '<ons-list-item dataid="'+i+'" style="font-size: 14px;font-family: -apple-system, \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;">' + selfinstance.getGroupinfoByIdx(i).innerHTML + '<ons-toolbar-button class=\"right\"><ons-icon icon=\'md-chevron-right\'></ons-icon></ons-toolbar-button></ons-list-item>'
            );
            myList.appendChild(itemdata)
        }
    }

    this.fillInfo = function(title,dataObj){
        document.getElementById('myTitle').innerHTML = title;
        data = dataObj;
        this.makeLazyListDelegate();
        //批量添加点击事件
        var items = $('#ModuleFandQgrp_P').find('ons-list-item');
        $(items).each(function(idx,item){
            $(item).click(function(e){
                currentSelectedIdx = parseInt(item.getAttribute('dataid'));
                //加载子页面的脚本
                new ModuleFactoryProxy().loadModule(mod_fq_sub,function(subPagePath){
                    //添加页面更换完毕的函数
                    document.getElementById('mainNav').addEventListener(NavigatorEvent.PushEnd,selfinstance.onmainNavPushEnd)
                    //显示子页面
                    document.getElementById('mainNav').pushPage(subPagePath);
                })

            })
        })
    }

    //获取一条指定索引的数据
    this.getTitleByIdx = function(idx){
        if(FandQGroup.dataProvider == null || FandQGroup.dataProvider.length == 0){
            return null
        }else{
            var titleGroup = FandQGroup.dataProvider[idx];
            return titleGroup.getElementsByTagName('div-client-title')[0];
        }
    }

    //获取一条指定索引的子级数据
    this.getDataArrByIdx = function(idx){
        if(FandQGroup.dataProvider == null || FandQGroup.dataProvider.length == 0){
            return null
        }else{
            var dataGroup = FandQGroup.dataProvider[idx];
            return dataGroup.getElementsByTagName('div-group');
        }
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
        if(data == null || data.length == 0){
            return null
        }else{
            var divGroup = data[idx];
            return divGroup.getElementsByTagName('div-group-title')[0];
        }
    }

    //获取一条指定索引的子级数据
    this.getGroupSubInfoArrByIdx = function(idx){
        if(data == null ||data.length == 0){
            return null
        }else{
            var divGroup = data[idx];
            return divGroup.getElementsByTagName('div-item');
        }
    }
}

FandQGroup.dataProvider = null;
//向模块map中注册controller
moduleMap[mod_fq_grp]["controller"] = new FandQGroup();
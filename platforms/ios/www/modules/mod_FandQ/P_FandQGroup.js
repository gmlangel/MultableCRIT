/**
 * Created by guominglong on 2017/2/23.
 */

function FandQGroup(){
    var selfinstance = null;
    var currentSelectedIdx = 0;//当前选择的子项
    var data = null;
    this.init = function(){
        selfinstance = this;

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
        var myList = document.getElementById('level1_list');
        myList.delegate = {
            createItemContent: function(i) {
                return ons._util.createElement(
                    '<ons-list-item dataid="'+i+'" style="font-size: 14px;font-family: -apple-system, \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;">' + selfinstance.getGroupinfoByIdx(i).innerHTML + '<ons-toolbar-button class=\"right\"><ons-icon icon=\'md-chevron-right\'></ons-icon></ons-toolbar-button></ons-list-item>'
                );
            },
            countItems: function() {
                return data.length;
            },
            calculateItemHeight: function(idx) {
                return 0;
            }
        };
        //刷新列表
        myList.refresh();
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

//向模块map中注册controller
moduleMap[mod_fq_grp]["controller"] = new FandQGroup();
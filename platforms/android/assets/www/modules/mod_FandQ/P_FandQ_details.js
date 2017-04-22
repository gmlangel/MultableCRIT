/**
 * Created by guominglong on 2017/2/28.
 */
function FandQ_details(){
    var data = null;
    var selfinstance = null;
    this.init = function(){
        selfinstance = this;
    }


    this.show = function(){

    }

    this.destroy = function(){
    }

    this.hide = function(){
    }

    /**
     * 填充数据
     * */
    this.fillInfo = function(_data){
        data = _data;
        //当数据源加载成功后,将数据源绑定到显示对象列表
        this.makeList();

    }

    //显示列表
    this.makeList = function(){
        if(data == null || data.length == 0)
        {
            return;
        }
        var myList = document.getElementById('level3_list');
        //myList.innerHTML = "";
        var j = data.length;
        for(var i=0;i<j;i++)
        {
            var itemnode = ons._util.createElement('<ons-list-item  style="font-size: 14px;font-family: -apple-system, \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;">' + selfinstance.getGroupinfoByIdx(i).innerHTML + '</ons-list-item>');
            myList.appendChild(itemnode);
        }
    }


    //获取一条指定索引的数据
    this.getGroupinfoByIdx = function(idx){
        if(data == null || data.length == 0){
            return null
        }else{
            return data[idx];
        }
    }
}

//向模块map中注册controller
moduleMap[mod_fq_details]["controller"] = new FandQ_details();
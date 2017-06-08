/**
 * view和控制器的绑定关系注册器,  每一个view对应1个controller
 * Created by guominglong on 2017/2/27.
 */


/**
 * 模块实体类
 * */
function ModEntity(){

    //模块的id
    this.id = ''

    //视图的物理路径
    this.viewPath = ""

    //controller对应的物理路径
    this.jsPath = ""

    //可操作的controller
    this.controller = null;
}

/**
 * 模块字典
 * */
var moduleMap = {}

//url跟路径
var rootUrl = './'//'http://172.16.3.178/crit/';//'./'
//当前系统语言zh或者en
var cur_language = 'zh';
//provider路径
var providerUrl_zh = rootUrl + 'assets/FandQ_Provider_zh.html';
var providerUrl_en = rootUrl + 'assets/FandQ_Provider_en.html';
/**
 * 程序主容器
 * */
var mod_m = "ModuleMaster";//这个值必须和page中的id值对应(模块名 + "_P" = page的ID),否则模块将失效
var modMaster = new ModEntity();
modMaster.id = mod_m;
modMaster.viewPath = rootUrl + 'modules/mod_master/V_MasterPage.html';
modMaster.jsPath = rootUrl + 'modules/mod_master/P_MasterPage.js';
moduleMap[mod_m] = modMaster;


/**
 * 我的中心
 * */
var mod_cc = "ModuleMyCenter";
var modCC = new ModEntity();
modCC.id = mod_cc;
modCC.viewPath = rootUrl + 'modules/mod_CustomCenter/V_CustomCenter.html';
modCC.jsPath = rootUrl + 'modules/mod_CustomCenter/P_CustomCenter.js';
moduleMap[mod_cc] = modCC;

/**
 * F&Q问答帮助模块
 * */
var mod_fq = "ModuleFandQ";
var modfq = new ModEntity();
modfq.id = mod_fq;
modfq.viewPath = rootUrl + 'modules/mod_FandQ/V_FandQ.html';
modfq.jsPath = rootUrl + 'modules/mod_FandQ/P_FandQ.js';
moduleMap[mod_fq] = modfq;

/**
 * F&Q问答帮助模块的第一级子页面
 * */
var mod_fq_grp = "ModuleFandQgrp";
var modfqgrp = new ModEntity();
modfqgrp.id = mod_fq_grp;
modfqgrp.viewPath = rootUrl + 'modules/mod_FandQ/V_FandQGroup.html';
modfqgrp.jsPath = rootUrl + 'modules/mod_FandQ/P_FandQGroup.js';
moduleMap[mod_fq_grp] = modfqgrp;


/**
 * F&Q问答帮助模块的第二级子页面
 * */
var mod_fq_sub = "ModuleFandQsub";
var modfqsub = new ModEntity();
modfqsub.id = mod_fq_sub;
modfqsub.viewPath = rootUrl + 'modules/mod_FandQ/V_FandQ_sub.html';
modfqsub.jsPath = rootUrl + 'modules/mod_FandQ/P_FandQ_sub.js';
moduleMap[mod_fq_sub] = modfqsub;

/**
 * F&Q问答帮助模块的详细内容页面
 * */
var mod_fq_details = "ModuleFandQdet";
var modfqdet = new ModEntity();
modfqdet.id = mod_fq_details;
modfqdet.viewPath = rootUrl + 'modules/mod_FandQ/V_FandQ_details.html';
modfqdet.jsPath = rootUrl + 'modules/mod_FandQ/P_FandQ_details.js';
moduleMap[mod_fq_details] = modfqdet;

/**
 * 全部工单模块
 * */
var mod_tl = "TaskList";
var modtl = new ModEntity();
modtl.id = mod_tl;
modtl.viewPath = rootUrl + 'modules/mod_TaskList/V_TaskListPage.html';
modtl.jsPath = rootUrl + 'modules/mod_TaskList/P_TaskList.js';
moduleMap[mod_tl] = modtl;
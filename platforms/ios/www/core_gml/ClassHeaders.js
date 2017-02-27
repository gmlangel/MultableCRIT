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

/**
 * 程序主容器
 * */
var mod_m = "ModuleMaster";//这个值必须和page中的id值对应(模块名 + "_P" = page的ID),否则模块将失效
var modMaster = new ModEntity();
modMaster.id = mod_m;
modMaster.viewPath = './modules/mod_master/V_MasterPage.html';
modMaster.jsPath = './modules/mod_master/P_MasterPage.js';
moduleMap[mod_m] = modMaster;


/**
 * 我的中心
 * */
var mod_cc = "ModuleMyCenter";
var modCC = new ModEntity();
modCC.id = mod_cc;
modCC.viewPath = './modules/mod_CustomCenter/V_CustomCenter.html';
modCC.jsPath = './modules/mod_CustomCenter/P_CustomCenter.js';
moduleMap[mod_cc] = modCC;

/**
 * F&Q问答帮助模块
 * */
var mod_fq = "ModuleFandQ";
var modfq = new ModEntity();
modfq.id = mod_fq;
modfq.viewPath = './modules/mod_FandQ/V_FandQ.html';
modfq.jsPath = './modules/mod_FandQ/P_FandQ.js';
moduleMap[mod_fq] = modfq;


/**
 * 全部工单模块
 * */
var mod_tl = "TaskList";
var modtl = new ModEntity();
modtl.id = mod_tl;
modtl.viewPath = './modules/mod_TaskList/V_TaskListPage.html';
modtl.jsPath = './modules/mod_TaskList/P_TaskList.js';
moduleMap[mod_tl] = modtl;
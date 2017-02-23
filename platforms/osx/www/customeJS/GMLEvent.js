 /**
 * Created by guominglong on 2017/2/15.
  * 注意以来onsenui.js,否则GMLEvent不生效
 */
function PageEvent(){
}

//定义常用事件--------begin---------
/**
 * 初始化事件,每当<ons-page>附加到DOM之后在document上触发(会触发N次)。使用此事件可在创建页面时初始化代码或动态内容。
 * */
PageEvent.Init = 'init';

/**
 * 即将销毁事件,在<ons-page>被销毁之前和DOM分离之前在document上触发。使用此事件清理或保存您需要的任何内容。
 * */
PageEvent.Destroy = 'destroy';

/**
 * 视图被显示,<ons-page>当立即创建并显示新页面时或当现有页面显示时触发
 * */
PageEvent.Show = 'show';

/**
 * 视图被隐藏,每当<ons-page>消失时，即当可见页面被销毁或被隐藏但仍存在于页面堆栈中时被触发。使用此事件可在每次页面消失时运行代码。
 * */
PageEvent.Hide = 'hide';

/**
 * <ons-page>的滚动条滚动到屏幕最底部时触发
 * */
PageEvent.ScrollEnd = 'onInfiniteScroll';
//定义常用事件--------end---------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function NavigatorEvent(){


}

//定义常用事件--------begin---------
/**
 * 导航<ons-navigator>的专用事件,只新的视图已经被push完成
 * */
NavigatorEvent.PushEnd = 'postpush';
//定义常用事件--------end---------

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function CarouselEvent(){


}

//定义常用事件--------begin---------
/**
 * 轮播控件<ons-carousel>的专用事件,当轮播一个内容完毕时在document上触发这个事件
 * */
CarouselEvent.PostChange = 'postchange';
//定义常用事件--------end---------
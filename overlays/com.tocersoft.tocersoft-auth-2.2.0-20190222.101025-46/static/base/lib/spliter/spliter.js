/**
 * 类 名 称： Separator|SP
 * 功能说明： 分割条类
 * 版权信息： CopyRight 2005-2006 JoeCom
 * 参数说明： o1,o2 : 两个对象
 spTpe: 方向，是左右，还是上下
 w:宽度;wx:left的差值;wy:top的差值
 wh:左右拖动时，是宽度的差值，上下则是高度的差值
 wl:上下拉动时时的一个差值
 差值的存在是因为控件可能存在border,padding,top等一些情况，
 还有就是控件的position不是为absolute
 * 创 建 人： JoeCom | MSN:juwuyi@hotmail.com | blog:http://hi.baidu.com/joecom
 * 创建日期： 2006-07-27
 * 修改记录：
 * 备 注 ： IE下效果最好，FF下TD标签不支持onresize事件？
 */
//以下定义拖拉方向的常量
SP_LEFTRIGHT = 1; //左右拖拉
SP_UPDOWN = 2; //上下拖拉
function Separator(o1, o2, callback,spType, w, wx, wy, wh, wl){
  var me = this;
  this.o1 = (typeof o1 == "string") ? document.getElementById(o1) : o1;
  this.o2 = (typeof o2 == "string") ? document.getElementById(o2) : o2;
  this.w = w || 3; //Width or Height
  this.wx = wx || 0; //parentOffsetLeft
  this.wy = wy || 0; //parentOffsetTop
  this.wh = wh || 0; //parentOffsetHeight
  this.wl = wl || 0; //parentOffsetWidth
  //this.wr = wr||0; //parentOffsetRight
  this.autoresize = false;
  this.spType = (spType == SP_UPDOWN) ? SP_UPDOWN : SP_LEFTRIGHT;
  this.allWidth = this.o1.clientWidth + this.o2.clientWidth + this.w;
  this.allHeight = this.o1.clientHeight + this.o2.clientHeight + this.w;
  this.isIE = false;
  this.callback = callback;

  this.addEvent = function(el, evname, func){
    if (el.attachEvent) { // IE
      el.attachEvent("on" + evname, func);
      this.isIE = true;
    }
    else
    if (el.addEventListener) { // Gecko / W3C
      el.addEventListener(evname, func, false);
    }
    else {
      el["on" + evname] = func;
    }
  };



  this.sp = document.createElement("div");
  if (this.spType == SP_LEFTRIGHT) {
    $('body').append('<div id="spliterLeftDiv"></div>');
    var spliterLeftDiv = document.getElementById("spliterLeftDiv");
    spliterLeftDiv.innerHTML = "";
    $('#spliterLeftDiv').append("<b id='lrB'></b>");
  }else{
    $('body').append('<div id="spliterRightDiv"></div>');
    var spliterRightDiv = document.getElementById("spliterRightDiv");
    spliterRightDiv.innerHTML = "";
    $('#spliterRightDiv').append("<b id='udB'></b>");
  }
  this.init = function(){
    if (this.spType == SP_LEFTRIGHT) {
      with (this.sp) {
        style.position = "absolute";
        style.left = this.o1.offsetLeft + this.o1.clientWidth + this.wx + "px";
        style.top = this.o1.offsetTop + this.wy + "px";
        style.width = this.w + "px";
        style.height = this.o1.clientHeight + this.wh - 1 + "px";
        className = "lrSeparator";
        style.zIndex = "1000";
      }
      var spliterLeftDiv = document.getElementById("spliterLeftDiv");
      spliterLeftDiv.appendChild(this.sp);
      var left = $('.lrSeparator').css('left');
      $('#lrB').css('left',left);
    }
    else {
      with (this.sp) {
        style.position = "absolute";
        style.left = this.o1.offsetLeft + this.wx + "px";
        style.top = this.o1.offsetTop + this.o1.clientHeight + this.wy - 4 + "px";
        style.width = this.o1.clientWidth + this.wh + "px";
        style.height = this.w + "px";
        className = "udSeparator";
        style.zIndex = "200";
      }
      var spliterRightDiv = document.getElementById("spliterRightDiv");
      spliterRightDiv.appendChild(this.sp);
      var top = $('.udSeparator').css('top');
      $('#udB').css('top',top);
      $('#detailDiv').show();
    }
  }
  if(!this.sp.attachEvent){
    this.sp.innerHTML = "";	//火狐空白内容不显示
  }

  this.init();
  this.dd = new ObjectDragDrop(this.sp);
  this.dd.moveStyle = (this.spType == SP_LEFTRIGHT) ? DD_HMOVE : DD_VMOVE;

  this.resize = function(){
    this.init();
  }

  this.addEvent(window, "resize", function(){
    me.resize();
  });
  this.addEvent(this.o1, "resize", function(){
    me.resize();
  });

  this.dd.isMoved = function(newPosX, newPosY){
    if (me.spType == SP_LEFTRIGHT) {
      var mw1 = me.o1.getAttribute("minWidth");
      var mw2 = me.o2.getAttribute("minWidth");
      if (mw1 == null) {
        mw1 = 0;
      }
      if (mw2 == null) {
        mw2 = 0;
      }
      return {
        x: ((newPosX - me.o1.offsetLeft) >= mw1 && (newPosX - me.o1.offsetLeft) <= (me.allWidth - mw2)),
        y: false
      };
    }
    else {
      var mh1 = me.o1.getAttribute("minHeight");
      var mh2 = me.o2.getAttribute("minHeight");
      if (mh1 == null) {
        mh1 = 0;
      }
      if (mh2 == null) {
        mh2 = 0;
      }
      return {
        x: false,
        y: ((newPosY - me.o1.offsetTop - me.wy) >= mh1 && (newPosY - me.o1.offsetTop - me.wy) <= (me.allHeight - mh2))
      };
    }
  }

  this.dd.onDrop = function(){
    if (me.spType == SP_LEFTRIGHT) {
      me.o1.style.width = me.sp.offsetLeft - me.o1.offsetLeft - me.wx - me.wl + "px";
      if (!me.autoresize) {
        me.o2.style.width = me.allWidth - me.o1.clientWidth - me.w + "px";
        if (me.o2.tagName != "TD") {
          me.o2.style.left = me.sp.offsetLeft;
        }
      }
    }
    else {
      me.o1.style.height = me.sp.offsetTop - me.o1.offsetTop - me.wy + "px";
      if (!me.autoresize) {
        me.o2.style.height = me.allHeight - me.o1.clientHeight + "px";
        if (me.o2.tagName != "TR") {
          me.o2.style.top = me.sp.offsetTop;
        }
      }
    }
    if (!me.isIE) {
      me.init();
    }
    //回调函数
    if(me.callback){
      me.callback();
    }
  }
}

/**
 * 类 名 称： DragDrop|DD
 * 功能说明： 可拖动类
 * 版权信息： CopyRight 2005-2006 JoeCom
 * 创 建 人： JoeCom | MSN:juwuyi@hotmail.com | blog:http://hi.baidu.com/joecom
 * 创建日期： 2006-07-19
 * 修改记录： 1. 2006-07-21 加上scrollTop 和 scrollLeft的相对移动
 ł. 2006-07-25 加入moveStyle属性，增加水平移动和垂直移动的功能
 Ń. 2006-07-25 加入isMoved函数，增加范围移动功能
 */
//以下定义移动方向的常量
DD_FREEMOVE = 0; //自由移动，没有限制
DD_HMOVE = 1; //水平移动，也就是左右移动
DD_VMOVE = 2; //垂直移动，也就是上下移动
function ObjectDragDrop(obj){
  var me = this;
  this.moveStyle = DD_FREEMOVE;
  this.foo = (typeof obj == "string") ? document.getElementById(obj) : obj;
  this.onDrop = function(){
  };
  this.onDrag = function(){
  };
  this.isMoved = function(newPosX, newPosY){
    return {
      x: true,
      y: true
    }
  };//offsetX:x的移动距离;offsetY:y的移动距离
  this.foo.onmousedown = function(e){
    var foo = me.foo;
    e = e || event;
    /*if(foo.attachEvent){	//IE
      foo.oOffset = {
              x: e.offsetX,
              y: e.offsetY
          };
    }else{
      foo.oOffset = {
              x: e.layerX,
              y: e.layerY
          };
    }*/
    //解决IE拖动BUG
    foo.oOffset = {
      x: e.offsetX,
      y: e.offsetY
    };
    document.onmousemove = me.drag;
    document.onmouseup = me.drop;
    document.onselectstart = function(){
      return false;
    };
  }

  this.drag = function(e){
    var foo = me.foo;
    e = e || event;
    var mv = me.isMoved(e.clientX - foo.oOffset.x + document.body.scrollLeft, e.clientY - foo.oOffset.y + document.body.scrollTop);
    if (mv.x && me.moveStyle != DD_VMOVE) {
      if (foo.attachEvent) {
        foo.style.left = e.clientX - foo.oOffset.x + document.body.scrollLeft;
      }else{
        foo.style.left = e.clientX - foo.oOffset.x + document.documentElement.scrollLeft + "px";
        //console.log("drag,e.clientX:"+e.clientX+",foo.oOffset.x:"+foo.oOffset.x+",document.documentElement.scrollLeft:"+document.documentElement.scrollLeft);
      }

    }
    if (mv.y && me.moveStyle != DD_HMOVE) {
      foo.style.top = e.clientY - foo.oOffset.y + document.body.scrollTop + "px";
    }
    me.onDrag();
    $('.ui-jqgrid-bdiv').css('overflow','hidden');//解决火狐浏览器滚动时候 表格会上移动bug 谢荣超2017-10-27
  }

  this.drop = function(e){
    e = e || event;
    document.onmousemove = document.onmouseup = document.onselectstart = null;
    me.onDrop();
  }
}

var northHeight,westWidth;
var speed = 100;
var websocket = null;
$(document).ready(function () {
	//解决IE6 7中iframe的height 100% 不起作用的问题 IE6-8
	if(!$.support.leadingWhitespace){
		window.setInterval(resizeIframe4IE,500);
	}
  //如果cookie不为空的时候就读取cookie的路径
  if($.cookie("css_skin")!=null) {
    changecss($.cookie("css_skin"));
  }
	northHeight=$('#north').height();
	westWidth=$('#west').width();
	// 初始化菜单
	initMainMenu();
	// 初始化操作按钮
	initOperateBtn();
	// 初始化Websocket连接
	if(enableWebSocket){
	  initWebsocket();
  }
});

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//收缩二级菜单
	$(document).on('click','.west-menu h2',shrinkSecondMenu);

  /**
   * 点击全屏
   */
  $('#headFull').on('click',function(){
    var date = $('#west').attr('date');
    if(date == 0){
      $("#west").addClass("west-full");
      $("#east").addClass("east-full");
      $('#west').attr('date','1');
    }else{
      $("#west").removeClass("west-full");
      $("#east").removeClass("east-full");
      $('#west').attr('date','0');
    }
  })
  /**
   * 切换皮肤
   */
  $('.skin-choose').on('click',function(){
    $('#north,#west,#east,.skin-content-box').addClass('cur');
  })


  $('.index.swiper-container .swiper-slide').on('click',function(){
    var index = $(this).index();
  });


  /**
   * 关闭切换皮肤
   */
  $('#closeSkinBox').on('click',function(){
    $('#north,#west,#east,.skin-content-box').removeClass('cur');
  })

  $("#skinContentBox").click(function(e){
    var ev = e || window.event;
    if(ev.stopPropagation){
      ev.stopPropagation();
    }
    else if(window.event){
      window.event.cancelBubble = true;//兼容IE
    }
    $('#north,#west,#east,.skin-content-box').removeClass('cur');
  })
}


/**
 * 初始化websocket
 */
function initWebsocket(){
  var schema = "";
  if(window.location.href.indexOf("https") != -1){
    schema = "s";
  }
  var websocketBasePath = window.location.host + basePath;
  //var websocketUrl = "ws" + schema + "://" + websocketBasePath + "/ws/notifyWebServer";
  var sockjsWebsocketUrl = "http" + schema + "://" + websocketBasePath + "/sockjs/sockjsNotifyWebServer";
  try{
    websocket = new SockJS(sockjsWebsocketUrl);
    websocket.onopen = function (evnt) {
      console.log("连接成功:" + new Date() + "...");
    };
    websocket.onmessage = function (evnt) {
      var data = evnt.data;
      console.log("接收到的消息：" + data);
      //处理消息
      handleWebsocketBaseMessage(data);
    };
    websocket.onerror = function (evnt) {
      console.log("连接错误：" + evnt);
      // 5秒后重连
      setTimeout(initWebsocket,5000);
    };
    websocket.onclose = function (evnt) {
      console.log("连接关闭: " + new Date() + "...");
      // 5秒后重连
      setTimeout(initWebsocket,5000);
    }
  }catch(e){
    console.log(e);
    websocket = null;
  }
}


function changecss(str) {
	var src = $('#mainIframe').attr('src');
	document.getElementById('mainIframe').src=src;
	var csshref
	csshref=$("#skin").attr("href",str);  //改变一下href属性其实这里已经完成
	$.cookie("css_skin",str);    //这里是记录一下cookie,防止刷新就回到原来的css路径
	event.stopPropagation(); //阻止点击事件向上冒泡
}

/**
 * 收缩二级菜单
 */
function shrinkSecondMenu(){
	var state=$(this).next("ul").css('display');
	if(state=='none'){
		$(this).next("ul").slideDown('fast');
		$(this).removeClass("west-menu-h2-cur");
	}else{
		$(this).next("ul").slideUp('fast');
		$(this).addClass("west-menu-h2-cur");
	}
}

/**
 * 收缩上边菜单
 */
function shrinkNorthArea(){
	// 验证当前 north-seperate 的 top 值
	var top = $("#north-seperate").offset().top;
	if(top>0){
		$(this).addClass("icon-bottom");
		$("#north").fadeOut(function(){
			$("#north-seperate").animate({top: 0}, speed );
			//减小左侧、左侧分隔栏、右侧、右侧标签页 top
			var westTop=$('#west').offset().top-northHeight;
			$('#west').animate({top: westTop}, speed );
			$("#westSeperate").animate({top: westTop}, speed );
			$('#menubar').animate({top: westTop}, speed );
			$('#east').animate({top: $('#east').offset().top-northHeight}, speed );
		});
	}else{
		$(this).removeClass("icon-bottom");
		$("#north-seperate").animate({top: northHeight}, speed );
		//减小左侧、左侧分隔栏、右侧、右侧标签页 top
		var westTop=$('#west').offset().top+northHeight;
		$('#west').animate({top: westTop}, speed );
		$("#westSeperate").animate({top: westTop}, speed );
		$('#menubar').animate({top: westTop}, speed );
		$('#east').animate({top: $('#east').offset().top+northHeight}, speed ,function(){
			$("#north").fadeIn();
		});
	}
}


function resizeIframe4IE(){
	var h=$("#east").height();
	$("#east").find('iframe').height(h);
}
var currTab = "tabli_0";
var manuMenuId="#navTop";
//初始化主导航
function initMainMenu() {
	$.each(menu, function (k, v) {
		var item = $("<li><a href=\"javascript:;\" id=\"tab_" + v.id + "\" url=\"" + v.url + "\" >" + v.text + "</a></li>");
		item.children("a").click(function () {
			var tabName = this.id.substr(4);
			$("#west").removeClass("west-full");
			$("#east").removeClass("east-full");
			$('#west').attr('date','0');
			switchTab(tabName);
			$("#navTop").find("a").removeClass("select");
			$(this).addClass("select");
			//触发第一个选中
			//$("#west").find("ul").children("li:eq(0)").children("a").click();
			foldMenu();
		});
		$(manuMenuId).append(item);
	});
	switchFirstTab();
	
	//显示首页
	if(menu && menu.length > 0){
		var url = menu[0].url;
		if(!url || url == "null" || url.length == 0){
			//首页欢迎页
			url = "/admin/welcome.htm";
		}
		$("#mainIframe").attr("src",basePath + "/" + url);
		foldMenu();
	}
	
}

function switchFirstTab(){
	for(var i=0;i<menu.length;i=i+1){
		currTab = menu[i].id;
		pickTab();
		initSubmenu();
		break;
	}
}
function switchTab(tabName) {
	currTab = tabName;
	pickTab();
	initSubmenu();
	
	//显示内容页
	var id = "#tab_" + currTab;
	var url = $(id).attr("url");
	if(url && url != "null" && url.length > 0){
		$("#mainIframe").attr("src",basePath + "/" + url);
	}
}
function pickTab() {
	var id = "#tab_" + currTab;
	$(manuMenuId).find("a").each(function () {
		$(this).removeClass("select");
	});
	$(id).addClass("select");
}

//初始化子导航
function initSubmenu() {
	var m = 0;
	for(var i=0;i<menu.length;i=i+1){
		if(currTab == menu[i].id){
			m = menu[i];
		}
	}	
	$("#west").empty();	
	$("#west").append("<div class='tocer-icon35 sq-bofont'></div>");
	$.each(m.children, function (k, v) {		
		var wElement=$("<div class=\"west-menu\"><h2><i></i><a href=\"javascript:void(0);\">" + v.text + "</a></h2><ul></ul></div>");	
		$.each(v.children, function (tk, tv){
			var url = basePath + "/" + tv.url;
			var liElement=$("<li></li>");
			var aElement=$("<span class='"+tv.iconPath+"'onclick='clickHrefPage(\""+url+"\",this)'></span><a href=\""+url+"\" target=\"mainIframe\" id=\"nav_rights_"+tv.id+"\" >"+tv.text+"</a>");
			$(liElement).append(aElement);
			$(wElement).find("ul").append(liElement);
		});
		$("#west").append(wElement);
		$("#west").find("a").on("click",function(){
			$("#west").find("a").removeClass("select");
			$("#west").find("span").removeClass("select");
			$(this).addClass("select");
			$(this).siblings("span").addClass("select");
		});
	});
	$(".sq-bofont").on("click",function(){
		var flat = $('#west').attr('flat');
		if(flat == 0){
			$(this).addClass("tocer-icon34");
			$("#west").addClass("west-cur");
			$("#east").addClass("east-cur");
			$('#west').attr('flat','1');
		}else{
			$(this).removeClass("tocer-icon34");
			$("#west").removeClass("west-cur");
			$("#east").removeClass("east-cur");
			$('#west').attr('flat','0');
		}
	});
}

function clickHrefPage(url,obj){
	$("#west").find("a").removeClass("select");
	$("#west").find("span").removeClass("select");
	$(obj).addClass("select");
	$(obj).siblings("a").addClass("select");
	$("#mainIframe").attr("src",url);
}




//打开指定URL的页面
function showMyTab(url){
	for(var i=0;i<menu.length;i++){
		var m=menu[i];
		for(var x=0;x<m.children.length;x++){
			var mc=m.children[x];
			for(var y=0;y<mc.children.length;y++){
				var tmc=mc.children[y];
				if(tmc!=null&&tmc.url==url){
					tmc.tabId = "tabli_"+tmc.id;
					showTab(tmc);
					return;
				}
			}
		}
	}
}

// 点击后台首页
function showIndex(){
	var tv = {};
	tv.url = "admin/welcome.htm";
	tv.text = "首&nbsp;&nbsp;页";
	tv.tabId = "tabli_0";
	tv.refresh = true;
	showTab(tv);
}

//追加iframe
function appendIframe(element,iframe,url){
	$(element).append(iframe);
}
//显示iframe
function showIframe(iframeId,tv){
	//设置text
	$("#" + tv.tabId).find("label").text(tv.text);
	$("#"+iframeId).show();
	if(tv.refresh){
		document.getElementById(iframeId).src = basePath + "/" + tv.url; 
	}
}
//选中A标签
function selectLink(linkId){
	$("#east").find("ul").children("li").children("a").removeClass("select");
	$("#"+linkId).addClass("select");
}

/**
 * 处理websocket消息
 * @param message
 */
function handleWebsocketBaseMessage(message){
  var msgs = message.split("|");
  var messageType =  msgs[0]; //消息类型
  switch(messageType){
    // 踢出用户消息
    case "MSG_TYPE_KICK_USER_NOTIFY":
      processKickUserNotifyMessage();
      break;
    default:
      break;
  }

  // 处理其他项目中特有消息
  $("iframe[name^='OpenartDialog']").each(function(i,item){
    if(typeof ($(this).contentWindow.handleWebsocketMessage) == "function"){
        $(this).contentWindow.handleWebsocketMessage(message);
    }
  });

    if(typeof (handleWebsocketMessage) == "function"){
        handleWebsocketMessage(message);
    }

}

/**
 * 处理踢出用户消息
 */
function processKickUserNotifyMessage(){
  websocket = null;
  ajaxPOST(basePath + "/admin/logoutAsync.htm?m=" + Math.random(),{},function(){});
  $.dialog.alert("您的账号已在别处登入",function(){
    window.location.href = window.location.href = basePath + "/admin/login.htm";
  });
}



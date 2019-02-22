var selectedIdArray = new Array();  //表格对应选择的ID数组
var selectedScrollArray = new Array();//记住jqgrid列表中页面的滚动位置

$(document).ready(function(){
	initUI_inputext();
	initUI_button();
});

  //添加拖动块左侧缩小、上下缩小的动作
  var lrbCheck = 0;
  var udbCheck=0;
  $("body").on("click","#lrB",function () {
    if(lrbCheck ==0){
      $('.category-box').css('padding-left',0);
      $('#categoryTreeDiv').hide();
      $('#lrB,.lrSeparator').css('left',0);
      resizeWidth();
      lrbCheck =1;
    }else{
      $('.category-box').css('padding-left','170px');
      $('#categoryTreeDiv').show();
      var categoryTreeDivWidth=document.getElementById('categoryTreeDiv').offsetWidth;
      $('#lrB,.lrSeparator').css('left',categoryTreeDivWidth);
      $('.category-box').css('padding-left',categoryTreeDivWidth);
      resizeWidth();
      lrbCheck =0;
    }
  });
  $("body").on("click","#udB",function () {
    if(udbCheck ==0){
      $('#detailDiv').hide();
      $('#gridDiv').css('height',$(window).height());
      $("#table").setGridHeight($(window).height());
      $('#udB,.udSeparator').css('top',$(window).height()-4);
      upDownCallbackFN();
      udbCheck =1;
    }else{
      $('#detailDiv').show();
      $('#gridDiv').css('height',$(window).height()* 0.44 +33+31+28);
      $("#table").setGridHeight($(window).height() * 0.44);
      $('#udB,.udSeparator').css('top',$(window).height() * 0.44 +33+31+28);
      upDownCallbackFN();
      udbCheck =0;
    }
  });

/**
 * 初始化输入框样式
 */
function initUI_inputext(){
	//为所有类样式包含tc-input-text的input元素增加获得焦点样式
	$("input[class*='tc-input-text']").on('focus',function(){
		$(this).addClass("tc-input-text-hover");
	});
	$("input[class*='tc-input-text']").on('blur',function(){
		$(this).removeClass("tc-input-text-hover");
	});
	$("textarea[class*='tc-textarea']").on('focus',function(){
		$(this).addClass("tc-input-text-hover");
	});
	$("textarea[class*='tc-textarea']").on('blur',function(){
		$(this).removeClass("tc-input-text-hover");
	});
	$("input[class*='login-input']").focus(function(){
		$(this).addClass("login-input-hover");
	});
	$("input[class*='login-input']").blur(function(){
		$(this).removeClass("login-input-hover");
	});
	$("input[class*='ui_input_text_login']").focus(function(){
		$(this).addClass("login-input-hover");
	});
	$("input[class*='ui_input_text_login']").blur(function(){
		$(this).removeClass("login-input-hover");
	});
	$("input[class*='ui_input_text_yzm']").focus(function(){
		$(this).addClass("login-input-hover");
	});
	$("input[class*='ui_input_text_yzm']").blur(function(){
		$(this).removeClass("login-input-hover");
	});
	$("input[class*='input-text-2']").focus(function(){
		$(this).addClass("ui_input_text_hover");
	});
	$("input[class*='input-text-2']").blur(function(){
		$(this).removeClass("ui_input_text_hover");
	});

	
	//为所有类样式包含ui_input_text的不可用input元素增加获得不可用样式
	$("input[class*='ui_input_text']").each(function(i,n){
		if($(n).attr('disabled')){
			$(n).addClass("disabled");
		}
	});
	
	//初始化所有的文本框提示
	//$("input,textarea").placeholder();
}
/**
 * 初始化按钮样式
 */
function initUI_button(){
	var allUiButton = $("a[class*='ui_button']");
	$.each(allUiButton,function(i,n){
		var className = $(n).attr("class");
		if(className.indexOf("ui_button")!=-1){
			//var right=$("<span class='ui_button_right'></span>");
			if($(n).hasClass('ui_button')){
				//用于处理a标签具有多个类样式的情况
			}else{
				$(n).addClass("ui_button");
				var content=$(n).html();
				$(n).empty();
				$(n).append("<span class='ui_icon'></span>");
				$(n).append(content);
			}
		}
	});
}

/**
 * 为jggrid的表格填充空行
 * @param {} gridId  表格ID
 * @param {} data 从服务器查询到的数据条数 [data.resultList.length]
 */
function fillEmptyRow(gridId,data){
	var $this=$('#'+gridId);
	if(!$this){
		return;
	}
	
	if(data && data.status != "success"){
		$.dialog.alert(data.message);
		return;
	}
	
	var resultRows;
	if(!data||!data.resultList||!data.resultList.length){
		resultRows=0;
	}else{
		resultRows=data.resultList.length;
	}
	var rowNum=$this.getGridParam('rowNum');
	var resultNum=resultRows;
	var emptyTableId = "jqgrid-empty-row-tc-" + gridId;
	$('.jqg-empty-row').remove();
	$('#'+emptyTableId).remove();
	if(resultRows==0){
		var nowRow=$("<div />");
		nowRow.html('没有记录');
		nowRow.attr('id',emptyTableId);
		nowRow.css('text-align','center');
		nowRow.css('height',60);
		nowRow.css('padding-top',30);
		nowRow.css('font-size',20);
		nowRow.insertAfter($this);
		
		return;
	}
	
	if(rowNum > resultNum){
		var trs=rowNum-resultNum;
		for(var i=0;i<trs;i++){
			var emptyRow=$("<div />");
			emptyRow.addClass('jqg-empty-row');
			if(trs%2!=0&&i%2==0){
				emptyRow.addClass('ui-alt-row');
			}
			emptyRow.insertAfter($this);
		}
	}
}

/**
 * 消息提示
 */
//msg:消息提示文字
//icon:提示小图标,可选值 success, error ,warning, info
//time:持续时间,毫秒
(function($) {
	var $msgbox = function(options) {
		var defaults = {
			msg : '操作失败',
			icon : 'clear',
			time : '2000',
			callBack : null
		};
		var settings = jQuery.extend(defaults, options);
		var tipiconclass = "gtl_ico_" + settings.icon;
		$('#ts_Msgbox').remove();
		var box = "<div class=\"ts_msgbox_layer_wrap\" id=\"ts_Msgbox\" style=\"display:none\"><span class=\"ts_msgbox_layer\" style=\"z-index: 10000;\" id=\"mode_tips_v2\"><span class=\""
				+ tipiconclass
				+ "\"></span>"
				+ settings.msg
				+ "<span class=\"gtl_end\"></span></span></div>";
		$("body").append(box);
		$('#ts_Msgbox').fadeIn();
		window.setTimeout(function() {
					$('#ts_Msgbox').fadeOut(function() {
						if (settings.callBack != null
								&& typeof settings.callBack == 'function') {
							settings.callBack();
						}
					});
				}, settings.time);
	}
	$.msgbox = function(options) {
		return new $msgbox(options);
	}
	return $.msgbox;
})(jQuery);

//清除所有提示
function clearMsgs(){
	window.setTimeout("$('.error_tip').fadeOut();$('.success_tip').fadeOut();$('.warning_tip').fadeOut();", 2000);
}

//汇总提示
(function($) {
    var $msg = function(options) {
     	var defaults = {
     		wrapID:"",//包裹提示外层容器id
     		type:"success",//消息类型,success:成功,error:失败,warning:警告
     		time:'2000',//消息提示框自动消失时间
    		messages: ["系统提示"]//错误信息集合 
   		};
    	var settings = jQuery.extend(defaults, options);
    	$('#'+settings.wrapID).empty();
    	//清除其他类型的提示
    	$(".error_tip").remove();
    	$(".success_tip").remove();
    	$(".warning_tip").remove();
    	var d = new Date();
   		var t = d.getTime();
    	var randomID="msg_"+t;
    	var i = 1;
    	var html="<div id=\""+randomID+"\" class=\""+settings.type+"_tip\"><ul>";    	
    	if(typeof settings.messages == "string"){
    		html+="<li>"+i+"、"+settings.messages+"</li>";
    	}else{
    		$.map(settings.messages,function(msg){
    				html+="<li>"+i+"、"+msg+"</li>";
    				i++;
				}
			); 
    	}
    	html+="</ul></div>";
    	$('#'+settings.wrapID).append(html).show();
    	if(settings.time != 0){
    		window.setTimeout("$('#"+randomID+"').fadeOut();", settings.time);	
    	}
    	
    }
    $.msg = function(options){ return new $msg(options); }    
    return $.msg;
})(jQuery);

/**
 * 显示选项卡
 * @param tv
 */
function showTab(tv){
	window.location.href = basePath + '/' + tv.url;
}

/**
 * 将字符串转换为货币格式
 * @param number
 * @returns
 */
function outputMoney(number){
    if (number == "" || number == null || number == '--') return '--';
	    if (number < 0) {
	        return '￥-' + outputDollars(Math.floor(Math.abs(number) - 0) + '') + outputCents(Math.abs(number) - 0);
	    } else {
	       	if(number.toString().indexOf("￥") != -1){
	       		return number;
	       	}else{
	    		return '￥' + outputDollars(Math.floor(number - 0) + '') + outputCents(number - 0);
	       	}
	    }
}

/**
 * 重新加载表格
 * @param grid
 * @param postData
 */
	$(window).resize(function(){
		$("#table").setGridWidth($(window).width()-23);
	});

/**
 * 重新加载表格
 * @param grid
 * @param postData
 */
function reloadCommonGrid(grid,postData){
	if(typeof grid == "undefined" || !grid || typeof grid != "string"){
		grid = "table";
	}
	var gr = $('#'+grid);
	if(postData){
		$(gr).setGridParam({postData : postData});
	}
    // 刷新时将页码设置为刚才获取的页码
	$(gr).trigger('reloadGrid', [{page : 1}]);
}

/**
 * 查询表格
 * @param formId 查询表单
 * @param tableId 表格ID
 */
function searchGrid(formId,tableId){
	if(typeof formId == "undefined" || !formId || typeof formId != "string"){
		formId = "searchForm";
	}
	if(typeof tableId == "undefined" || !tableId || typeof tableId != "string"){
		tableId = "table";
	}
	
	var arr = $("#"+formId).serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		if(postData[entry["name"]]){
			postData[entry["name"]] += "," + entry["value"];
		}else{
			postData[entry["name"]]=entry["value"];	
		}
	}
	
	//清空查询条件
	var oldPostData = $('#' + tableId).jqGrid("getGridParam", "postData");
  $.each(oldPostData, function (k, v) {
    if(k.indexOf("condition.") != -1 && k != "condition.enterpriseId" && k.indexOf("PatentType") == -1){
      delete oldPostData[k];
    }
  });
  selectedScrollArray[tableId] = 0;
  console.log(selectedScrollArray);
	//重新查询
	$('#' + tableId).setGridParam({
		mtype:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}

/**
 * 时间戳转成日期
 * @param nS
 * @returns
 */
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}  

/**
 * 发送post请求
 * @param url
 * @param data
 * @param callbackFN
 */
function ajaxPOST(url,data,callbackFN){
	$.ajax({
		async:true,
		type:"POST",
		url:url,
		data:data,
		dataType:"json",
		success:function(data){
      if (data.status === "needLogin") {
        var curUrl = window.location.href;
        if (curUrl.indexOf("/admin/") != -1) {
          top.location.href = basePath + "/admin/login.htm";
        } else if (curUrl.indexOf("/member/") != -1) {
          top.location.href = basePath + "/member/login.htm";
        } else {
          $.dialog.alert(data.message);
        }
        return;
      }
      callbackFN(data);
    },
		error:function(){
			try{
				$("body").unmask();
				$("body",parent.document).unmask();
			}catch(e){}
			$.dialog.alert("服务器正忙，请稍后重试");
		}
	});
}

/**
 * 刷新表格
 */
function refreshGrid(){
	var pageIndex = $("#table").getGridParam("page");
	$('#table').setGridParam({
		mtype:'post'
	}).trigger('reloadGrid',[{page:pageIndex}]);
}

/**
 * 关闭窗口
 */
function closeWin(){
	$.dialog.close();
}

/**
 * 关闭当前窗口
 */
function closeCurWin(){
	$.dialog.close();
}

/**
 * 文本只能输入数字包含小数
 */
function numberValidator(event){
	var value = $(this).val();
	if (event.keyCode == 190 || event.keyCode == 110) {
		if (value.length > 1) {
			return;
		}
	}
	if (isNaN(value)) {
		$(this).val('');
	}
}

function sexFormater(cellvalue,options,rowObject){
	switch(cellvalue){
		case 0 : 
			return '<span class="status-red">女</span>';
		case 1 : 
			return '<span class="status-green">男</span>';
		default : 
			return '<span class="status-gray">未指定</span>';
	}
}

function weekdayFormater(cellvalue,options,rowObject){
	switch(cellvalue){
		case 1 :
			return '<span>周一</span>';
			break;
		case 2 :
			return '<span>周二</span>';
			break;
		case 3 :
			return '<span>周三</span>';
			break;
		case 4 :
			return '<span>周四</span>';
			break;
		case 5 :
			return '<span>周五</span>';
			break;
		case 6 :
			return '<span>周六</span>';
			break;
		case 0 :
			return '<span>周日</span>';
			break;
		default :
			return '';
			break;
	}
}

function photoUrl(url, size){
	if(url != null){
		var fname = url.substring(0,url.indexOf("."));
		var ext = url.substring(url.indexOf("."));
		return fname + "_" + size + ext;
	}else{
		return url;
	}
}

/**
 * 加载可编辑的空行
 * @param rowNum 要增加的行数
 */
function jqgridEditRow(id) {
  // 构建data
  var colModel = $(id).getGridParam("colModel");
  var curRowData = {};
  //加个前缀，区分是临时行
  var rowid = "-" + ($(id).jqGrid("getRowData").length + 1);
  for (var j = 0; j < colModel.length; j++) {
    var curKey = colModel[j].name;
    var curVal = "";
    if (curKey == "id") {
      curVal = rowid;
    }
    curRowData[curKey] = curVal;
  }
  $(id).addRowData(rowid, curRowData);
  $(id).jqGrid('editRow',rowid,true)
}


/**
 * table开单 光标置入最后行会增加一行
 * @param val
 * @returns {number}
 */
function addLastRow(id){
  $('body').on('mousedown','.editable',function(){
  	var trLength = $(''+id+' tr').length;
  	var trIndex = $(this).closest('tr').index();
  	if(trLength-1 === trIndex){
      jqgridEditRow(id);
		}
	})
}




// $(function(){
//   function funcname(param){
//     //do something
//
//     //callback
//     param.callback();
//   }
//
//   //调用
//   funcname({
//     callback:function(){
//       alert('callback do');
//     }
//   });
// });



Array.prototype.indexOf = function(val) { for (var i = 0; i < this.length; i++) { if (this[i] == val) return i; } return -1; };
Array.prototype.remove = function(val) { var index = this.indexOf(val); if (index > -1) { this.splice(index, 1); } };


/**
* 设置jqgrid选中并且存入到公共选中的集合中
* 作用：
* 1、用于选中后再次刷新任然选中那一行
* 2、用于选中后再次刷新滚动条位置任然定位到哪一行
* @param gridName
* @param rowId
*/
function setjqGridSelection(gridName,rowId){
    if(typeof gridName == "undefined" || !gridName || typeof gridName != "string"){
    	return;
	}
    if(typeof rowId == "undefined" || rowId == ""){
        return;
    }
    $("#"+gridName).jqGrid("setSelection",rowId);
    // 获取选中行位置定位
    var scrollPosition = $("#"+gridName).closest(".ui-jqgrid-bdiv").scrollTop();
    selectedScrollArray[gridName] = scrollPosition;
    var keyId = gridName+"+"+rowId;
    if($.inArray(keyId,selectedIdArray)==-1){
        for (var i = 0; i < selectedIdArray.length; i++) {
            var obj = selectedIdArray[i];
            if(obj != "remove"){
                var key = obj.split("+")[0];
                if(key == "table"){
                    selectedIdArray.remove(obj);
                }
            }
        }
        selectedIdArray.push(keyId);
    }
}


/**
 * 根据不同尺寸获取图片
 * @param imagePath 文件路径
 * @param size 尺寸 S,M,L,XL,XXL,C
 */
/**
 * 根据不同尺寸获取图片
 * @param imagePath 文件路径
 * @param size 尺寸 S,M,L,XL,XXL,C
 */
function getImageBySize(path,size){
    //如果没有图片就用这个路径的
    if(path == null || path == "" || path.indexOf(".")==-1){
        return '/static/base/images/no-img.jpg';
    }
    var pathArray = path.split(".");
    return pathArray[0] + '_' + size +"."+pathArray[1];
}
$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//初始化特效事件
	initEffectEvent();
	//初始化表单提交
	initAjaxForm();
});
/**
 * 初始化表单提交
 */
function initAjaxForm(){
	//异步表单提交设置
    $('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	// 回调函数中去除遮罩
			$("body",parent.document).unmask();
			if (data.status=='success'){
				$.dialog.close();
				var win = $.dialog.open.origin;
				win.reloadTree();
				if(undefined == id || id == 0){
					win.reloadNodes(parentId);
				}else{
					win.loadNewNode(id,data.itemId);
				}
			} else {
				$.dialog.alert("保存失败");
			}
        }
    });
}
/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	$("body").on("click","#saveBtn",saveRight);
	$("body").on("click","#exitBtn",exitWin);
}
/**
 * 初始化特效事件
 */
function initEffectEvent(){
	$("body").on("click",".the-icons li",function(){
		$(".the-icons li").removeClass("cur");
		$(this).addClass("cur");
		var className = $(this).find("i").attr("class");
		$("#iconPath").val(className);
	});
	//当前的图标
	var curIconPath = $("#iconPath").val();
	$(".the-icons li").each(function(){
		 var iconPath = $(this).children("i").attr("class");
		 $(".the-icons li").removeClass("cur");
		if(iconPath == curIconPath){
			$(this).addClass("cur");
			return false;
		}
	});
}

/**
 * 添加新的菜单
 */
function saveRight() {
	$("#nameDiv").hide();
	$("#sortDiv").hide();
	var name = $("#name").val();
	if (null == name || "" == name) {
		$("#nameDiv").show();
		return;
	}
	var sort = $("#sort").val();
	if (null == sort || "" == sort) {
		$("#sortDiv").show();
		return;
	}
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",parent.document).mask("正在保存，请稍候...");
	$("#saveForm").submit();
	
}

/**
 * 退出当前窗体
 */
function exitWin() {
	$.dialog.close();
}
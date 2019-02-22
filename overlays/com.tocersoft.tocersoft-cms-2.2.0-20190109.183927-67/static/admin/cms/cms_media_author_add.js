$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
	// 文本编辑器的初始化
	initEditor();
});
/**
 * 文本编辑器的初始化
 */
function initEditor(){
	var editor = UE.getEditor('artContent', {
	    autoHeightEnabled: true,
	    autoFloatEnabled: true
	});  
}
/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"自媒体名称不能为空",onErrorMax:"自媒体名称长度过长"});
    $("#nameSub").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"自媒体子名称，职称或者微信号不能为空",onErrorMax:"自媒体子名称，职称或者微信号长度过长"});
    $("#descBrief").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"自媒体简介不能为空",onErrorMax:"自媒体简介长度过长"});
    $("#descHtml").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"自媒体详细介绍不能为空",onErrorMax:"自媒体详细介绍长度过长"});
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status == "success"){
        		var win = $.dialog.open.origin;
        		win.reloadCommonGrid("table");
        		$.dialog.close();
        	}else{
        		$.dialog.alert(data.message);
        		if(typeof data.token != "undefined" && data.token.length > 0){
        			$("input[name='token']").val(data.token);
        		}
        	}
        }
    });
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存自媒体
	$("#saveBtn").on("click",saveCmsBlogAuthor);
	//关闭窗口
	$("#exitBtn").on("click",closeWin);
}

/**
 * 保存自媒体
 */
function saveCmsBlogAuthor(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
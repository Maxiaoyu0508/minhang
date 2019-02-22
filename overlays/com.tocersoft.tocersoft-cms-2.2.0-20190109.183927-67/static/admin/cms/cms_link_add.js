$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#name").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"友情链接名称不能为空",onErrorMax:"友情链接名称长度过长"});
    $("#linkUrl").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"友情链接地址不能为空",onErrorMax:"友情链接地址长度过长"});
    $("#photoThumb").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"友情链接缩略图不能为空",onErrorMax:"友情链接缩略图长度过长"});
    $("#remark").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"友情链接备注不能为空",onErrorMax:"友情链接备注长度过长"});
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status == "SUCCESS"){
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
 * 保存友情链接
 */
function saveCmsLink(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
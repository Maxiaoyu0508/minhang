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
    $("#settingName").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"配置项名称不能为空",onErrorMax:"配置项名称长度过长"});
    $("#settingKey").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"配置项代码不能为空",onErrorMax:"配置项代码长度过长"});
    $("#settingValue").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"配置项值不能为空",onErrorMax:"配置项值长度过长"});
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
 * 保存系统配置表
 */
function saveSysSetting(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
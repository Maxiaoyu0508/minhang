$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#activityId").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"活动信息不能为空"});
    $("#linkMan").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"联系人不能为空",onErrorMax:"联系人长度过长"});
    // $("#sex").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"性别：0-女，1-男不能为空",onErrorMax:"性别：0-女，1-男长度过长"});
    $("#mobile").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"手机号码不能为空",onErrorMax:"手机号码长度过长"});
    $("#telephone").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"固定电话不能为空",onErrorMax:"固定电话长度过长"});
    // $("#email").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"电子邮箱不能为空",onErrorMax:"电子邮箱长度过长"});
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
	//保存活动报名
    $("body").on("click","#saveBtn",saveActivityEnroll);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存活动报名
 */
function saveActivityEnroll(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
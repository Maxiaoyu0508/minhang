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
    $("#session").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"活动场次不能为空",onErrorMax:"活动场次长度过长"});
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
 * 保存活动场次表
 */
function saveActivitySession(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	if($("#limitederson").val() == null||$("#limitederson").val()=="" || $("#session").val() == null||$("#session").val()==""| $("#activityDate").val() == null||$("#activityDate").val()==""){
		alert("所有项目均为必填项");
		return

	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
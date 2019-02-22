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
    $("#theme").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"主题不能为空",onErrorMax:"主题长度过长"});
    $("#memberUserName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"会员姓名不能为空",onErrorMax:"会员姓名长度过长"});
    $("#provinceCity").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"省市区不能为空",onErrorMax:"省市区长度过长"});
    $("#province").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"省不能为空",onErrorMax:"省长度过长"});
    $("#provinceId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"省ID不能为空",onErrorMax:"省ID长度过长"});
    $("#city").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"市不能为空",onErrorMax:"市长度过长"});
    $("#cityId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"市ID不能为空",onErrorMax:"市ID长度过长"});
    $("#district").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"区不能为空",onErrorMax:"区长度过长"});
    $("#districtId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"区ID不能为空",onErrorMax:"区ID长度过长"});
    $("#organization").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"组织机构不能为空",onErrorMax:"组织机构长度过长"});
    $("#industryId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"行业类别ID不能为空",onErrorMax:"行业类别ID长度过长"});
    $("#email").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"电子邮件不能为空",onErrorMax:"电子邮件长度过长"});
    $("#contact").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"联系方式不能为空",onErrorMax:"联系方式长度过长"});
    $("#content").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"建议内容不能为空",onErrorMax:"建议内容长度过长"});
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
	//保存意见反馈表
    $("body").on("click","#saveBtn",saveSysFeedback);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存意见反馈表
 */
function saveSysFeedback(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
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
    $("#name").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"姓名不能为空",onErrorMax:"姓名长度过长"});
    $("#idCard").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"身份证不能为空",onErrorMax:"身份证长度过长"});
    $("#school").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"学校不能为空",onErrorMax:"学校长度过长"});
    $("#mobile").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"联系方式不能为空",onErrorMax:"联系方式长度过长"});
    $("#address").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"地址不能为空",onErrorMax:"地址长度过长"});
    $("#email").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"邮箱不能为空",onErrorMax:"邮箱长度过长"});
    $("#servicrTime").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"服务时间不能为空",onErrorMax:"服务时间长度过长"});
    $("#job").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"职务不能为空",onErrorMax:"职务长度过长"});
    $("#education").formValidator({validatorGroup:1,empty:true}).inputValidator({min:1,max:255,onErrorMin:"学历不能为空",onErrorMax:"学历长度过长"});
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
 * 保存志愿者招募
 */
function saveWxVolunteer(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}

        $("body").mask("正在保存，请稍后...");
        $("#saveForm").submit();
}
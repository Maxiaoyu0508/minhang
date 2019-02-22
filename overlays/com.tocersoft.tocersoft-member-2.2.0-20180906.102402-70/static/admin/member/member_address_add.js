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
    $("#memberId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"会员ID不能为空",onErrorMax:"会员ID长度过长"});
    $("#address").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收货地址不能为空",onErrorMax:"收货地址长度过长"});
    $("#province").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"省份不能为空",onErrorMax:"省份长度过长"});
    $("#city").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"城市不能为空",onErrorMax:"城市长度过长"});
    $("#district").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"区不能为空",onErrorMax:"区长度过长"});
    $("#provinceCity").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"省市区不能为空",onErrorMax:"省市区长度过长"});
    $("#linkman").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收货联系人不能为空",onErrorMax:"收货联系人长度过长"});
    $("#mobile").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收货人手机[非用户手机]不能为空",onErrorMax:"收货人手机[非用户手机]长度过长"});
    $("#postCode").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"邮政编号不能为空",onErrorMax:"邮政编号长度过长"});
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
	//保存会员收货地址表
    $("body").on("click","#saveBtn",saveMemberAddress);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存会员收货地址表
 */
function saveMemberAddress(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
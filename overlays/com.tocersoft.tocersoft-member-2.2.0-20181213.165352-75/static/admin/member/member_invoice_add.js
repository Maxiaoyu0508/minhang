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
    $("#type").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"发票类型0.普通发票 1.增值税发票不能为空",onErrorMax:"发票类型0.普通发票 1.增值税发票长度过长"});
    $("#invoiceTitle").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"发票抬头（公司名/个人名）不能为空",onErrorMax:"发票抬头（公司名/个人名）长度过长"});
    $("#invoiceDetails").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"发票明细不能为空",onErrorMax:"发票明细长度过长"});
    $("#companyName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"单位名称不能为空",onErrorMax:"单位名称长度过长"});
    $("#taxpayerId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"纳税人识别码不能为空",onErrorMax:"纳税人识别码长度过长"});
    $("#registeredAddress").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"注册地址不能为空",onErrorMax:"注册地址长度过长"});
    $("#registeredPhone").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"注册电话不能为空",onErrorMax:"注册电话长度过长"});
    $("#bankName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"开户银行不能为空",onErrorMax:"开户银行长度过长"});
    $("#bankAccount").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"银行账号不能为空",onErrorMax:"银行账号长度过长"});
    $("#billtoName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收票人姓名不能为空",onErrorMax:"收票人姓名长度过长"});
    $("#billtoPhone").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收票人手机不能为空",onErrorMax:"收票人手机长度过长"});
    $("#billtoPcd").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收票人省市区不能为空",onErrorMax:"收票人省市区长度过长"});
    $("#billtoProvince").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收票人省不能为空",onErrorMax:"收票人省长度过长"});
    $("#billtoCity").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收票人市不能为空",onErrorMax:"收票人市长度过长"});
    $("#billtoDistrict").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"收票人区不能为空",onErrorMax:"收票人区长度过长"});
    $("#billtoAddress").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"详细地址不能为空",onErrorMax:"详细地址长度过长"});
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
	//保存会员发票管理
    $("body").on("click","#saveBtn",saveMemberInvoice);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存会员发票管理
 */
function saveMemberInvoice(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
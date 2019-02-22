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
    $("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"客户名称不能为空",onErrorMax:"客户名称长度过长"});
    $("#type").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"请选择客户类型"});
    //$("#nameBrief").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"客户简称不能为空",onErrorMax:"客户简称长度过长"});
    //$("#namePinyin").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"拼音助记码不能为空",onErrorMax:"拼音助记码长度过长"});
    //$("#address").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"地址不能为空",onErrorMax:"地址长度过长"});
    //$("#desc").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"客户描述不能为空",onErrorMax:"客户描述长度过长"});
    //$("#linkname").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"联系人姓名不能为空",onErrorMax:"联系人姓名长度过长"});
    //$("#tel").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"联系电话不能为空",onErrorMax:"联系电话长度过长"});
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
	//保存客户表
    $("body").on("click","#saveBtn",saveClient);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存客户表
 */
function saveClient(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
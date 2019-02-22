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
    $("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"企业名称不能为空",onErrorMax:"企业名称长度过长"});
//    $("#telephone").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"企业电话不能为空",onErrorMax:"企业电话长度过长"});
//    $("#address").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"企业地址不能为空",onErrorMax:"企业地址长度过长"});
//    $("#website").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"企业网址不能为空",onErrorMax:"企业网址长度过长"});
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
        		closeWin();
        		var win = $.dialog.open.origin;
        		win.reloadTree();
        		if(undefined == id || id == 0){
					win.reloadNodes(parentId);
				}else{
					win.loadNewNode(id,data.itemId);
				}
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
	//保存会员所属企业信息
    $("body").on("click","#saveBtn",saveMemberCompany);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存会员所属企业信息
 */
function saveMemberCompany(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
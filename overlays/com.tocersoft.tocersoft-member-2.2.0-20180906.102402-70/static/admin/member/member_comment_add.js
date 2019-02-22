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
    $("#memberUserId").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"会员基本信息不能为空"});
    $("#content").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"评论内容不能为空",onErrorMax:"评论内容长度过长"});
    $("#replyCommentId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"回复对应的评论ID不能为空",onErrorMax:"回复对应的评论ID长度过长"});
    $("#objectId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"评论对象ID不能为空",onErrorMax:"评论对象ID长度过长"});
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
	//保存会员评论
    $("body").on("click","#saveBtn",saveMemberComment);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存会员评论
 */
function saveMemberComment(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
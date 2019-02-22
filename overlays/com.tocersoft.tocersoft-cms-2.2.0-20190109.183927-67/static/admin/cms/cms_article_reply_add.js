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
    $.formValidator.initConfig({validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#articleId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"文章ID不能为空",onErrorMax:"文章ID长度过长"});
    $("#replyId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"评论ID不能为空",onErrorMax:"评论ID长度过长"});
    $("#content").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"评论/回复内容不能为空",onErrorMax:"评论/回复内容长度过长"});
    $("#memberId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"评论/回复人ID不能为空",onErrorMax:"评论/回复人ID长度过长"});
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
	//保存文章评论与回复
	$("#saveBtn").on("click",saveCmsArticleReply);
	//关闭窗口
	$("#exitBtn").on("click",closeWin);
}

/**
 * 保存文章评论与回复
 */
function saveCmsArticleReply(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
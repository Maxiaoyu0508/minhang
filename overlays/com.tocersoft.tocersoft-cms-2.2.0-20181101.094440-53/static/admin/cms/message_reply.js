$(document).ready(function(){
	
	initFormValidator();
	initAjaxForm();
	$("#saveBtn").on('click',function(){
		var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
		if(!result){
			return;
		}
		// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
		$("body",parent.document).mask("正在保存，请稍候...");
		$("#messageForm").submit();
	});
});

function downImg(url){
	location.href=url;
}


/**
 * 初始化表单验证
 */
function initFormValidator(){
	$.formValidator.initConfig({validatorGroup: 1});
	$("#replyContent").formValidator({validatorGroup:1,onFocus:'请输入回复内容'}).inputValidator({min:1,max:100,onErrorMin:"回复内容不能为空",onErrorMax:"回复内容长度过长"});
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	//异步表单提交设置
    $('#messageForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
			$("body",parent.document).unmask();
			$.dialog.alert("回复成功！",function(){
				var viewId = "mainIframe_tabli_9573e6d626ac11e5b0ae50e549a83d86";
				var parentTab = top.document.getElementById(viewId);
				var win =parentTab.contentWindow;
				win.reloadGrid();
				location.reload();
			});
        },
        error:function(data){
        	$("body",parent.document).unmask();
        	$.dialog.alert(data.message);
        }
    });
}
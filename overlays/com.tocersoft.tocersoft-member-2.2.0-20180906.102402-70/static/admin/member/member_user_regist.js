$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
	
	var clientId = $.dialog.data("clientId");
	$("#clientId").val(clientId);
	
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
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
	//保存会员基本信息
    $("body").on("click","#saveBtn",saveMemberUser);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
    
    //重置密码按钮单击事件
	$('#toUpdatePwd').on("click",doUpdatePwd);
	
}

/**
 * 保存会员基本信息
 */
function saveMemberUser(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	var account = $("#account").val();
	if(account == ""){
		$.dialog.alert("会员账号必填！");
		return;
	}
	
//	var email = $("#email").val();
//	 var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
//	    if(!reg.test(email)){
//	        $.dialog.alert("邮箱格式不正确！");
//	        return;
//	    }
//	var mobile = $("#mobile").val();
//	 var reg = /^1\d{10}$/;
//	    if(!reg.test(mobile)){
//	    	$.dialog.alert("手机号格式不正确！");
//	    	return;
//	    }
//	    
//	    var qq = $("#qq").val();
//	    var reg=/^\d{5,10}$/; 
//		    if(!reg.test(qq)){
//		    	$.dialog.alert("QQ号格式不正确！");
//		    	return;
//		    }
	       
	
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}

//重置密码按钮单击事件
function doUpdatePwd(){
	$('#updatePwd').slideToggle("fast");
}

/**
 * 重置密码
 */
function resetPwd(){
	var pwd = $('#resetPwd').val();
	var userId = $('#itemId').val();
	$.post(basePath+'/admin/member/resetPwd.htm',{'item.password':pwd,'item.id':userId},function(data){
		if(data.status = "success"){
			$.dialog.alert('保存成功');
			window.location.reload();
		}else{
			$.dialog.alert(data.msg);
		}
	});
};

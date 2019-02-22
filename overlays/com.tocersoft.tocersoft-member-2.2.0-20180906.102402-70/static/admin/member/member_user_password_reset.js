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
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#pwdResetForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status == "success"){
    			$.dialog.close();
        		$.dialog.alert("密码重置成功");
        	}else{
        		$.dialog.alert(data.message);
        	}
        }
    });
}

/**
 * 重置密码
 */
function doResetPwd(){
	$('#pwdResetForm').submit();
};

function resetPasswordFN(id){
	$.dialog.open(basePath + '/admin/member/to_reset_pwd.htm?id='+id,{
		title : "重置密码",
		width : '600px',
		height : '400px',
		lock : true
	});
}

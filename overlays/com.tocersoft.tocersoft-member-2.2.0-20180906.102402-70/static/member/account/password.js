$(document).ready(function(){
	
	initFormValidate();
	initAjaxForm();
});

function initFormValidate(){
	$.formValidator.initConfig({validatorGroup:1});
	$("#oldPassword").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:1,max:255,onErrorMin:"原密码必填",onErrorMax:"长度过长"})
	.ajaxValidator({
		dataType:'json',
		async:true,
		type:'post',
		url:basePath + '/member/account/check_password.htm',
		data:{'oldPassword':function(){
			return $("#oldPassword").val();
		}},
		success:function(data){
			if(data.message == 'true'){
				return true;
			}else{
				return false;
			}
		},
		buttons:$("#updateBtn"),
		error:function(jqXHR, textStatus, errorThrown){
			$.dialog.alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onError:function(o){
			return "原密码不正确，请重新输入";
		},
		onWait:"正在校验，请稍候..."
	});
	$("#password").formValidator({onFocus:'密码必填，6-16位，区分大小写'}).inputValidator({min:6,max:16,onErrorMin: "密码必填，6-16位，区分大小写",onErrorMax: "密码不能大于16位，区分大小写"});
	$("#rePassword").formValidator({onFocus:'请再次输入密码，6-16位，区分大小写'}).inputValidator({min:6,max:16,onErrorMin: "请再次输入密码，6-16位，区分大小写"}).compareValidator({desID:'password',onError:'两次密码输入不一致，区分大小写'});
}

function initAjaxForm(){
	$('#submitForm').ajaxForm({
		dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status == "success"){
        		$.dialog.alert(data.message);
    		}else if(data.status == "error"){
    			$.dialog.alert(data.message);
    		}else{
    			$.dialog.alert("保存失败");
    		}
        }
	});
}

function doUpdatePwd(){
	var result = $.formValidator.pageIsValid(1);// 手动调用验证框架进行验证
	if(!result){
		return false;
	}
	$("body").mask("正在提交，请稍候...");
	$('#submitForm').submit();
}
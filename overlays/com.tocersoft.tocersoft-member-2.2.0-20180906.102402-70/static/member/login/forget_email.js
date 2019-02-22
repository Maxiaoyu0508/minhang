var v = 0;
var sendSMS = false;	//发送验证码
var interFetchCaptchaFN = null;
var fetchCaptchaInterval = 120;	//120秒内
$(document).ready(function() {
	
	// 判断是否需要验证码
	if($("#verCodeImage").length > 0){
		v = 1;
	}
	
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){}});
	$("#login_forgert_email").formValidator({onShow:'',onFocus:'电子邮箱必填',onCorrect:''}).inputValidator({min:1,max:255,onErrorMin:"电子邮箱必填",onErrorMax:"电子邮箱长度过长"})
	.regexValidator({regExp:'email',dataType:"enum",onError:"电子邮箱格式不正确"});
	$.formValidator.initConfig({validatorGroup:"2",onError:function(msg,obj,errorlist){}});
	$("#mobile").formValidator({validatorGroup:2,onShow:'',onFocus:'手机号码必填',onCorrect:''}).inputValidator({min:1,max:50,onErrorMin:"请输入有效的11位手机号码",onErrorMax:" 请输入有效的11位手机号码"})
	.regexValidator({regExp:'mobile',dataType:"enum",onError:"请输入有效的11位手机号码"});
	$.formValidator.initConfig({validatorGroup:"3",onError:function(msg,obj,errorlist){}});
	
	if(v == 1){
		$("#verCode").formValidator({validatorGroup:3,onShow:'',onFocus:'验证码必填',onCorrect:''}).inputValidator({min:1,max:10,onErrorMin:"短信验证码必填",onErrorMax:"短信验证码长度过长"})
	}
	
	$('input').live("keydown",function(e){
		if(e.keyCode == '13'){
			sendForgetEmail();
			return false;
		}
	});
	$("#sendCode").click(sendSMSCodeFN);
	
	initAjaxForm();
});

function initAjaxForm(){
	$('#forgetEmailForm').ajaxForm({
		dataType: 'json',
        success: function(data) {
        	if(data.status == "success"){
    			$.dialog.alert("密码找回邮件发送成功 ，请检查您的邮箱 ！",function(){
    				window.location.href = basePath + "/member/login.htm";
    			});
    		}else if(data.status == "error"){
    			$.dialog.alert(data.message);
    		}else{
    			$.dialog.alert("发送失败");
    		}
        }
	});
}

//发送短信验证码
function sendSMSCodeFN(){
	if(sendSMS){
		//已经发送，不再继续
		return;
	}
	//1.判断手机号码格式是否正确
	var result = $.formValidator.pageIsValid(2);// 手动调用验证框架进行验证
	if(!result){
		return false;
	}
	sendSMSCaptcha();
}


//发送短信验证码
function sendSMSCaptcha(){
	if(sendSMS){
		//已经发送了，不在继续发送
		return;
	}
	$.post(base + "/login/sendVerification.htm?m=" + Math.random(),{"item.mobile":$("#mobile").val()},function(data){
		if(data.status == "success"){
			sendSMS = true;
			//1分钟后可再次获取
			fetchCaptcha();
			interFetchCaptchaFN = setInterval(fetchCaptcha,1000);
		}else{
			$.dialog.alert(data.message);
		}
	});
}

function changeVerCode(){
	$("#verCodeImage").attr('src', basePath + '/japtcha.htm?r=' + Math.random());
}

//提交
function saveSubmit(){
	var result2 = $.formValidator.pageIsValid(2);// 手动调用验证框架进行验证
	var result3 = $.formValidator.pageIsValid(3);// 手动调用验证框架进行验证
	if(!result2||!result3){
		return false;
	}
	$("#mobileForm").ajaxSubmit(function(data){
		if(data.status=="success"){
			window.location.href=basePath+"/login/forgetEditPwdByMobileAndCode.htm?id="+$("#mobile").val()+"&code="+$("#verCode").val();
		}else{
			$.dialog.alert(data.message);
		}
	});
}

function sendForgetEmail(){
	var result = $.formValidator.pageIsValid(1);// 手动调用验证框架进行验证
	if(!result){
		return;
	}
	$('#forgetEmailForm').attr("action",basePath + "/member/forget_email_send.htm?v="+v);
	$('#forgetEmailForm').submit();
	return false;
}

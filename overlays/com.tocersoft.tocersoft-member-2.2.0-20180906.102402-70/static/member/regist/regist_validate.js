$(document).ready(function(){
	
	initFormValidate();
	
	if($("#pwdWeak").length > 0){
		// 鼠标移开验证密码强度
		$("#password").keyup(function(){
			checkPwdStrong();
		});
	}
	
});

function initFormValidate(){
	$.formValidator.initConfig({validatorGroup:1});
	$("#account").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:1,max:255,onErrorMin:"帐号必填",onErrorMax:"长度过长"})
		.ajaxValidator({
			dataType:'json',
			async:true,
			type:'post',
			url:basePath + '/member/check_account.htm',
			data:{'account':function(){
				return $("#account").val();
			}},
			success:function(data){
				if(data.message == 'true'){
					return true;
				}else{
					return false;
				}
			},
			buttons:$("#registBtn"),
			error:function(jqXHR, textStatus, errorThrown){
				$.dialog.alert("服务器没有返回数据，可能服务器忙，请重试");
			},
			onError:function(o){
				return "此帐号已被注册";
			},
			onWait:"正在校验，请稍候..."
		});
	$("#email").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:1,max:255,onErrorMin:"电子邮箱必填",onErrorMax:"长度过长"})
		.regexValidator({regExp:'email',dataType:"enum",onError:"电子邮箱格式不正确"})
		.ajaxValidator({
			dataType:'json',
			async:true,
			type:'post',
			url:basePath + '/member/check_email.htm',
			data:{'email':function(){
				return $("#email").val();
			}},
			success:function(data){
				if(data.message == 'true'){
					return true;
				}else{
					return false;
				}
			},
			buttons:$("#registBtn"),
			error:function(jqXHR, textStatus, errorThrown){
				$.dialog.alert("服务器没有返回数据，可能服务器忙，请重试");
			},
			onError:function(o){
				return "此电子邮箱已被注册";
			},
			onWait:"正在校验，请稍候..."
		});
	$("#mobile").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:1,max:255,onErrorMin:"手机号码必填",onErrorMax:"长度过长"})
		.regexValidator({regExp:'mobile',dataType:"enum",onError:"手机号码格式不正确"})
		.ajaxValidator({
			dataType:'json',
			async:true,
			type:'post',
			url:basePath + '/member/check_mobile.htm',
			data:{'mobile':function(){
				return $("#mobile").val();
			}},
			success:function(data){
				if(data.message == 'true'){
					return true;
				}else{
					return false;
				}
			},
			buttons:$("#registBtn"),
			error:function(jqXHR, textStatus, errorThrown){
				$.dialog.alert("服务器没有返回数据，可能服务器忙，请重试");
			},
			onError:function(o){
				return "此手机号码已被注册";
			},
			onWait:"正在校验，请稍候..."
		});
	$("#password").formValidator({onFocus:'密码必填，6-16位，区分大小写'}).inputValidator({min:6,max:16,onErrorMin: "密码必填，6-16位，区分大小写",onErrorMax: "密码不能大于16位，区分大小写"});
	$("#rePassword").formValidator({onFocus:'请再次输入密码，6-16位，区分大小写'}).inputValidator({min:6,max:16,onErrorMin: "请再次输入密码，6-16位，区分大小写"}).compareValidator({desID:'password',onError:'两次密码输入不一致，区分大小写'});
	$("#verCode").formValidator({onFocus:'验证码必填'}).inputValidator({min:1,max:10,onErrorMin: "验证码必填",onErrorMax: "验证码不能超过10位"});
}

// 密码输入框事件
function checkPwdStrong() {
	var password = $.trim($('#password').val());
	var username = "";
	if($("#mobile").length > 0){
		username = $.trim($('#mobile').val());
	}
	if($("#email").length > 0){
		username = $.trim($('#email').val());
	}
	if($("#account").length > 0){
		username = $.trim($('#account').val());
	}
	var num = testPassword(password,username);
	if(num < 33){
		$('#pwdWeak').removeClass('select-state');
		$('#pwdNormal').removeClass('select-state');
		$('#pwdStrong').removeClass('select-state');
		$('#pwdWeak').addClass('select-state');
	}else if(num < 67){
		$('#pwdWeak').removeClass('select-state');
		$('#pwdNormal').removeClass('select-state');
		$('#pwdStrong').removeClass('select-state');
		$('#pwdWeak').addClass('select-state');
		$('#pwdNormal').addClass('select-state');
	}else if(num <= 100){
		$('#pwdWeak').removeClass('select-state');
		$('#pwdNormal').removeClass('select-state');
		$('#pwdStrong').removeClass('select-state');
		$('#pwdWeak').addClass('select-state');
		$('#pwdNormal').addClass('select-state');
		$('#pwdStrong').addClass('select-state');
	}
}

/**
 * 验证密码强度
 * 
 * @param {} password
 * @return {}
 */
function testPassword(password,username){
    var score = 0;
    if (password.length < 4 ) { return -4; }
    if (typeof(username) != 'undefined' && password.toLowerCase() == username.toLowerCase()){return -2}
    score += password.length * 4;
    score += ( repeat(1,password).length - password.length ) * 1;
    score += ( repeat(2,password).length - password.length ) * 1;
    score += ( repeat(3,password).length - password.length ) * 1;
    score += ( repeat(4,password).length - password.length ) * 1;
    if (password.match(/(.*[0-9].*[0-9].*[0-9])/)){ score += 5;}
    if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){ score += 5 ;}
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){ score += 10;}
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)){ score += 15;}
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)){ score += 15;}
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)){score += 15;}
    if (password.match(/^\w+$/) || password.match(/^\d+$/) ){ score -= 10;}
    if ( score < 0 ){score = 0;}
    if ( score > 100 ){ score = 100;}
    return score;
     
    function repeat(len,str){
    var res = "";
    for (var i = 0; i < str.length; i++ ){
        var repeated = true;
        for (var j = 0, max = str.length - i - len; j < len && j < max; j++){
            repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + len));
        }
        if (j < len) repeated = false;
        if (repeated) {
            i += len - 1;
            repeated = false;
        }else{
            res += str.charAt(i);
        }
    }
    return res;
    }
}
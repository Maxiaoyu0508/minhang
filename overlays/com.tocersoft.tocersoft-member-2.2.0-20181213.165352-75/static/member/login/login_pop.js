// v=1表示需要验证码，v=0表示不需要验证码
var v = 0;
var loginText;
$(document).ready(function() {
	// 判断是否需要验证码
	if($("#verCodeImage").length > 0){
		v = 1;
	}
	
	loginText = $("#loginBtn").html();
	
	initAjaxForm();
	
	if(!$('input[name="isRmbPwd"]').attr('checked') ){
		$("#account").val('');
		$("#password").val('');
	}
	//敲击回车
	$("#account").on("keydown",function(e){
		if(e.keyCode == '13'){
			doLogin();
			return false;
		}
	});
	$("#password").on("keydown",function(e){
		if(e.keyCode == '13'){
			doLogin();
			return false;
		}
	});
	$("#verCode").on("keydown",function(e){
		if(e.keyCode == '13'){
			doLogin();
			return false;
		}
	});
	
	// 如果记住密码，页面渲染完后打勾
	var rp = $('#isRmbPwd').val();
	if(rp == 1){
		$('#isRmbPwd').attr('checked',true);
	}else{
		$('#isRmbPwd').attr('checked',false);
	}
	$('#isRmbPwd').click(function(){
		var c = $(this).attr('checked');
		if(c == true){
			$(this).val(1);
		}else{
			$(this).val(0);
			$("#email").val('');
			$("#password").val('');	
		}
	});
});

function initAjaxForm(){
	$('#loginForm').ajaxForm({
		dataType: 'json',
        success: function(data) {
   			if(data.status == "success"){
   				var win = $.dialog.open.origin;
   				win.reloadSessionMember();
   				$.dialog.close();
   			}else if(data.status == "error"){
   				$("#loginBtn").html(loginText);
   				$.dialog.alert(data.message);
   			}
        }
	});
}

function changeVerCode(){
	$("#verCodeImage").attr('src', basePath + '/japtcha.htm?r=' + Math.random());
}

//登录
function doLogin(){
	var tusername = $.trim($('#account').val());
	if(tusername == null || tusername == ''){
		$.dialog.alert("请输入帐号 !");
		tusername.focus();
		return;
	}
	var tpassword = $.trim($('#password').val());
	if(tusername == null || tusername == ''){
		$.dialog.alert("请输入密码 !");
		tpassword.focus();
		return;
	}
	$("#loginBtn").html("正在登录...");
	$('#loginForm').attr("action",basePath + "/member/do_login.htm?v="+v);
	$('#loginForm').submit();
}
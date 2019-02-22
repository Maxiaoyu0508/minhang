// v=1表示需要验证码，v=0表示不需要验证码
var v = 0;
$(document).ready(function(){
	// 判断是否需要验证码
	if($("#verCodeImage").length > 0){
		v = 1;
	}
	// 页面加载完后，即自适应浏览器的高度
	resize();
	// 当窗体改变后，改变背景蓝色的高度
	window.onresize = resize;
});

function resize(){
	// 初始化背景蓝色的高度
	$('.login-bg').height($(window).height());
}

function changeVerCode(){
	$("#verCodeImage").attr('src', basePath + '/japtcha.htm?r=' + Math.random());
}

/**
 * 登录
 */
function login(){
	var uname = $("#j_username").val();
	var pwd = $("#j_password").val();
	/*var p3 = $("#p3").val();*/
	if(uname.length == 0){	
		$.dialog.alert("用户名不能为空");
		return;
	}
	if(pwd.length == 0){
		$.dialog.alert("密码不能为空");
		return;
	}
	
	var verCode = "";
	if(v == 1){
		//验证验证码
		verCode = $("#verCode").val();
		if(verCode == null || verCode == ''){
			$.dialog.tips("请输入验证码");
			$("#verCode").focus();
			return;
		}
	}
	
	$(".user_login").mask("正在提交，请稍后...");
	$.post(basePath + "/member/do_login.htm?m=" + Math.random(),{"item.account":uname,"item.password":pwd,"v":v,"verCode":verCode},function(data){
		$(".user_login").unmask();
		if(data.status != "success"){
			$.dialog.alert(data.message);
			return;
		}
		$(".user_login").mask("正在加载页面，请稍后...");
		window.location.href = basePath + "/member/index.htm";
	});
}
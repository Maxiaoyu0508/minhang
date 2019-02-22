$(document).ready(function(){
	// 页面加载完后，即自适应浏览器的高度
	resize();
	// 当窗体改变后，改变背景蓝色的高度
	window.onresize = resize;
});

function resize(){
	// 初始化背景蓝色的高度
	$('.login-bg').height($(window).height());
}

/**
 * 登录
 */
function login(){
	var uname = $("#j_username").val();
	var pwd = $("#j_password").val();
	var entCode = null;
  if(runMode === "saas" || runMode === "SAAS"){
    entCode = $("#j_entcode").val();
  }

	/*var p3 = $("#p3").val();*/
	if(uname.length === 0){
		$.dialog.alert("用户名不能为空");
		return;
	}
	if(pwd.length === 0){
		$.dialog.alert("密码不能为空");
		return;
	}

	if(uname.length > 20){
    $.dialog.alert("用户名长度过长");
    return;
  }

  if(pwd.length > 20){
    $.dialog.alert("密码长度过长");
    return;
  }

  if((runMode === "saas" || runMode === "SAAS") && entCode.length === 0){
    $.dialog.alert("企业代码不能为空");
    return;
  }

  if(null != entCode && entCode.length > 0){
	  entCode = encryptedString(RSAKey, entCode);
  }
	
	$(".user_login").mask("正在提交，请稍后...");
	var params = encodeURI(uname);
	$.post(basePath + "/admin/doLogin.htm?m=" + Math.random(),{"p1":encryptedString(RSAKey, params),"p2":encryptedString(RSAKey, pwd),"p3":entCode},function(data){
		$(".user_login").unmask();
		if(data.status != "success"){
			$.dialog.alert(data.message);
			return;
		}
		$(".user_login").mask("正在加载页面，请稍后...");
		window.location.href = basePath + "/admin/index.htm";
	});
}
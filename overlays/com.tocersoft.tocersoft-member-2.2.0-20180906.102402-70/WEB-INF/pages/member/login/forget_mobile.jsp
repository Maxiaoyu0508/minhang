<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!doctype html >
<html>
	<head>
		<meta charset="utf-8" />
		<title>奇丰工业采购库-工业品|电力</title>
		<meta name="Keywords" content="奇丰工业采购库,工业品,电力行业">
		<meta name="description" content="奇丰工业采购库">
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_css.jsp" />
		<link href="${ctxPath}/static/front/base/main.css" rel="stylesheet" type="text/css"/>
		<link href="${ctxPath}/static/front/base/iconfont/iconfont.css" rel="stylesheet" type="text/css"/>
	</head>
  	<body>
		<div style="border-bottom: 3px solid #0099cc;" >
			<jsp:include page="/WEB-INF/pages/member/base/inc_header2.jsp"></jsp:include>
			<div class="w1200-auto pb20 pt30">
				<a href="">
					<img alt="" src="${ctxPath}/static/front/base/images/pwd-logo.png">
				</a>
			</div>
		</div>
		<div class="login-box clb">
				<div class="login-box-left fl">
					<div class="login-div">
						<h1 class="f20 fb color333">找回密码</h1>
					<form id="updatePwdForm" action="${ctxPath}/member/forget_mobile_edit.htm" method="POST">
						<div class="clb">
							<div class="login-input clb fl">
								<a class="login-user"><i class="iconfont icon-icon27"></i></a>
								<input id="mobiles" name="mobile" value="${mobile}" type="text" placeholder="手机">
							</div>
							<span id="mobilesTip" class="fl mt5" style="display: none;"></span>
						</div>
						<div class="clb">
							<div class="login-yzm clb fl">
								<a class="login-user"><i class="iconfont icon-yanzhengma"></i></a>
								<input id="verCode" name="verCode" type="text" placeholder="请输入验证码">
								<div id="send-captcha-btn" class="yzm-img fr"><a onclick="sendSMSCode();" class="sms-code cp">获取短信验证码</a></div>
							</div>
							<span id="verCodeTip" class="fl mt5" style="display: none;"></span>
						</div>
						<div class="clb">
							<div class="login-input clb fl">
								<a class="login-user"><i class="iconfont icon-password-copy f20"></i></a>
								<input id="password" name="password" type="password" placeholder="新密码">
							</div>
							<span id="passwordTip" class="fl mt5" style="display: none;"></span>
						</div>
						<a onclick="updatePwd();return false;" class="loginBtn cp">确认</a>
					</form>
					</div>
				</div>
				<div class="login-box-rigjt fl">
					<div class="rig-box">
						<p class="f14">还不是工业采购库会员？ <a href="${ctxPath}/member/regist.htm">立即注册</a></p>
						<p class="f12 color666 mt20">现在可以免费注册成为工业采购库会员，享受平台为您提供的海量工业产品技术参数及市场价格行情。</p>
					</div>
				</div>
		</div>
		<script type="text/javascript">
        	var codeMsg = '${codeMsg}'; 
        </script>
		
		<jsp:include page="/WEB-INF/pages/front/base/inc_footer.jsp"></jsp:include>
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_js.jsp"/>
		<script src="${ctxPath}/static/member/regist/regist_validate.js" type="text/javascript"></script>
		<script src="${ctxPath}/static/member/login/forget_mobile.js" type="text/javascript"></script>
  	</body>
</html>
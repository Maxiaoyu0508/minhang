<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!doctype html >
<html >
	<head>
		<meta charset="utf-8" />
		<title>会员登录 - 上海宏昌生物科技有限公司</title>
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_css.jsp" />
		<link href="${ctxPath}/static/front/base/iconfont/iconfont.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<jsp:include page="/WEB-INF/pages/front/base/inc_header.jsp">
			<jsp:param name="menu" value="member"/>
		</jsp:include>
		<div class="lg-bg-img">
			<form id="loginForm" method="POST">
				<div style="width: 500px;" class="cb-content clb">
					<div class="f24bt tc mb20">帐号登录</div>
					<input id="account" name="item.account" type="text" placeholder="用户名/邮箱/手机" class="login-ipt login-user">
					<input id="password" name="item.password" type="password" class="login-ipt login-pwd" placeholder="密码">
					<div class="login-yz clb">
						<input id="verCode" name="verCode" type="text" placeholder="验证码" class="vm login-code login-cd fl" >
						<a onclick="changeVerCode();return false;" class="ver-code fl" style="margin:3px 0 0 10px;" href="javascript:void(0);">
							<img id="verCodeImage" src="${ctxPath}/japtcha.htm" style="display:block;" class="vm"/>
						</a>
					</div>
					<a id="loginBtn" onclick="doLogin();return false;" href="javascript:void(0);" title="登录" class="login-in">登录</a>
					<div style="margin: auto auto;width: 337px;color: #999999;" class="clb f14">
						<a  href="${ctxPath}/member/forget_email.htm" style="color: #999999;margin-top: 2px;" class="ml20 fr" id="loginBtn">忘记密码</a>
						<label class="fr"><input type="checkbox" class="vm" value="1" name="isRmbPwd"><span class="vm ml5">记住我</span></label>
					</div>
					<a href="${ctxPath}/member/regist.htm" class="login-a">帐号注册</a>
				</div>
			</form>
		</div>
		<jsp:include page="/WEB-INF/pages/front/base/inc_footer.jsp"></jsp:include>
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_js.jsp"/>
		<script src="${ctxPath}/static/member/login/login.js" type="text/javascript"></script>
	</body>
</html>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!doctype html >
<html>
	<head>
    	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
    	<title>忘记密码 - 朗绿-健康家居材料采购平台</title>
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_css.jsp" />
		<link href="${ctxPath}/static/front/base/iconfont/iconfont.css" rel="stylesheet" type="text/css"/>
  	</head>
  	<body>
  		<%--头部 --%>
		<jsp:include page="/WEB-INF/pages/front/base/inc_header.jsp">
			<jsp:param name="menu" value="member"/>
		</jsp:include>
		<%--头部end --%>
		<form id="updatePwdForm" action="${ctxPath}/member/forget_email_do_edit.htm" method="POST">
			<input id="email" name="email" value="${email}" type="hidden" />
			<input id="code" name="code" value="${code}" type="hidden" />
			<div class="cb-content clb" style="margin-top:52px;width: 500px;">
				<div class="f24bt tc mb10">重置密码</div>
				<input id="password" name="password" class="login-ipt login-user" type="password" placeholder="新密码">
				<input id="rePassword" class="login-ipt login-user" type="password" placeholder="确认密码">
				<a class="login-in" onclick="updatePwd();return false;" href="javascript:;">保存新密码</a>
			</div>
		</form>
		<%--底部 --%>
		<jsp:include page="/WEB-INF/pages/front/base/inc_footer.jsp"></jsp:include>
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_js.jsp"/>
  		<script src="${ctxPath}/static/member/login/forget_email_edit_pwd.js"></script>
		<%--底部end --%>
  	</body>
</html>
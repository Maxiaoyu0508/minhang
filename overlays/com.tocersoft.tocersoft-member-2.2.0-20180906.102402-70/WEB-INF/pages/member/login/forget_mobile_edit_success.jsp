<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!doctype html>
<html>
	<head>
		<title>重置成功 - 忘记密码 - 采购库</title>
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_css.jsp" />
		<link href="${ctxPath}/static/front/base/iconfont/iconfont.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<%--头部 --%>
		<jsp:include page="/WEB-INF/pages/front/base/inc_header.jsp">
			<jsp:param name="menu" value="member"/>
		</jsp:include>
		<%--头部end --%>
		<div class="yy-bg"></div>
		<%--中间 --%>
		<div class="cb-content clb" style="margin-top:52px;width: 500px;margin-bottom:60px;">
			<div class="success-ico">密码重置成功</div>
			<div class="success-line"></div>
			<p class="mt20">您可直接进入 <a href="${ctxPath}/member/index.htm">[会员中心]</a>，或者继续访问 <a href="${ctxPath}/index.htm">[网站首页]</a></p>
		</div>
		<%--中间end --%>
		<%--底部 --%>
		<jsp:include page="/WEB-INF/pages/front/base/inc_footer.jsp"></jsp:include>
		<jsp:include page="/WEB-INF/pages/front/base/inc_front_js.jsp"/>
		<%--底部end --%>
	</body>
</html>

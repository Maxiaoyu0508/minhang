<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>闵行博物馆官网</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
</head>
<body >
	<jsp:include page="/WEB-INF/pages/front/base/header_inc.jsp"></jsp:include>

	<div>首页</div>
	<div>-----------------------------------------------------</div>
	<div><a href="${ctxPath}/index.htm">首页</a></div>
	<div><a href="${ctxPath}/about.htm">关于我们</a></div>
	<div><a href="${ctxPath}/product.htm">产品服务</a></div>
	<div><a href="${ctxPath}/case.htm">经典案例</a></div>
	<div><a href="${ctxPath}/news.htm">新闻动态</a></div>
	<div><a href="${ctxPath}/contact.htm">联系我们</a></div>

	<jsp:include page="/WEB-INF/pages/front/base/footer_inc.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
</body>
</html>

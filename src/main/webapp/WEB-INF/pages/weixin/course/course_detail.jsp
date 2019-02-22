<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core"%>
<!doctype html>
<html style="background: #fff;height: 100%">
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title>闵行博物馆-教育课件</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
</head>
<body >
<div class="detail-box">
	<div class="activity-top" style="background:url('${ctxPath}/upload/${jsonArray[0].path}') no-repeat;background-size:cover;">
		<div class="bot-line"></div>
	</div>
	<div class="activity-contant-box">
		<h2>${cmsArticle.name}</h2>

		<div class="activity-contant">
			<core:unescapeHtml value="${cmsArticle.content}" />
		</div>
	</div>
	<h3 class="more-activity-h3" >更多可见</h3>
	<div class="more-activity">
		<ul class="clb">
		<c:forEach items="${arcticArray}" end="5" var="arcticArray" >
			<li>
				<div class="more-activity-img">
					<img src="${ctxPath}/upload/${arcticArray.path}">
				</div>
				<span>${arcticArray.name}</span>
			</li>
		</c:forEach>
		</ul>
	</div>


</div>



<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />


</body>
</html>

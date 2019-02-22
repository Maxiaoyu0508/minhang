<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html style="background: #ebebeb;height: 100%">
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title>闵行博物馆-临时展览-列表</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
</head>
<body >
<div class="ex-box">
	<div class="activity-box" style="background:url('${ctxPath}/static/front/images/activity-01.png') no-repeat;background-size:cover;">
		<h2 class="interim-h2">临时展览</h2>
	</div>
	<ul class="ex-ul activity-ul">
	<c:forEach items="${interimArray}" end="5" var="interimArray">
		<li>
			<a href="${ctxPath}/weixin/interim/detail.htm?item.id=${interimArray.id}">
				<div class="ex-li-img">
					<img src="${ctxPath}/upload/${interimArray.path}">
				</div>
				<div class="ex-li-title">${interimArray.name}</div>
				<span class="apply-time">${interimArray.exhibitionTime}</span>
				<span class="ex-li-text">${interimArray.summary}</span>
			</a>
		</li>
	</c:forEach>
	</ul>
</div>



<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />


</body>
</html>

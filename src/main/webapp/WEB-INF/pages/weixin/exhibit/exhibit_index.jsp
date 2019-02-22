﻿<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<title>闵行博物馆-基本陈列</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
</head>
<body >
<div class="display-box">
	<ul class="display-box-ul">
		<c:forEach items="${uploadFile}" end="4" var="uploadFile">
			<li>
				<a href="${ctxPath}/weixin/exhibit/list.htm?item.id=${uploadFile.id}" style="background:url('${ctxPath}/upload/${uploadFile.url}') no-repeat;background-size:cover;">
					<div class="display-text ">${uploadFile.name}</div>
				</a>

			</li>
		</c:forEach>
	</ul>
</div>
<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
</body>
</html>

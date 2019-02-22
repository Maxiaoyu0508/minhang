<%@ page language="java" contentType="text/html; charset=utf-8"%>
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
	<title>闵行博物馆-虚拟展厅</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
</head>
<body >
	<div class="hall-box" style="background:url('${ctxPath}/static/front/images/hall-01.png') no-repeat;background-size:cover;">
		<div class="hall-cont">
			<ul class="hall-ul clb">
				<li style="background:url('${ctxPath}/static/front/images/hall-02.png') no-repeat;background-size:cover;">
					<div class="hall-text">马桥文化展示厅</div>
				</li>
				<li style="background:url('${ctxPath}/static/front/images/hall-03.png') no-repeat;background-size:cover;">
					<div class="hall-text">张充仁艺术人生展示厅</div>
				</li>
				<li style="background:url('${ctxPath}/static/front/images/hall-04.png') no-repeat;background-size:cover;">
					<div class="hall-text">民族乐器文化展示厅</div>
				</li>
				<li style="background:url('${ctxPath}/static/front/images/hall-05.png') no-repeat;background-size:cover;">
					<div class="hall-text">上海县七百年</div>
				</li>

			</ul>
		</div>
	</div>
<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
</body>
</html>

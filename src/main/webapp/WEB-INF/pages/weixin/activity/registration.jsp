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
	<title>闵行博物馆-活动报名</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<style>
		.ex-box {
			padding: 20px 15px;
		}
		.ex-ul {
			padding: 0 8px 0 0;
		}
		.ex-li-title{height: 45px;border-bottom: 1px solid #ddd;margin-bottom: 8px;}
	</style>
</head>
<body >
<div class="ex-box">
	<h4 class="detail-box-h4">我报名的活动</h4>
	<ul class="ex-ul ">
		<div class="ex-li-title" style="text-align:center;">${activityEnrolls}</div>
	<c:forEach items="${array}" end="100" var="array">
		<c:if test="${array.today > array.enrollTimeEnd}">
		<li class="cur">
			<a href="${ctxPath}/weixin/my_activity.htm?item.id=${array.id}&item.mobile=${array.phone}">
				<div class="ex-li-img">
					<img src="${ctxPath}/upload/${array.url}">
				</div>
				<div class="ex-li-title">${array.name}</div>
				<div class="apply-info">报名时间:<fmt:formatDate value="${array.enrollTimeBegin}" pattern="yyyy-MM-dd "/></div>
				<div class="apply-info">活动地点：${array.address}</div>
				<div class="apply-info">报名次数：${array.activityEnroll}次</div>
			</a>
		</li>
		</c:if>
		<c:if test="${array.today < array.enrollTimeEnd || array.today == array.enrollTimeEnd  }">
			<li >
				<a href="${ctxPath}/weixin/my_activity.htm?item.id=${array.id}&item.mobile=${array.phone}">
					<div class="ex-li-img">
						<img src="${ctxPath}/upload/${array.url}">
					</div>
					<div class="ex-li-title">${array.name}</div>
					<div class="apply-info">报名时间:<fmt:formatDate value="${array.enrollTimeBegin}" pattern="yyyy-MM-dd "/></div>
					<div class="apply-info">活动地点：${array.address}</div>
					<div class="apply-info">报名次数：${array.activityEnroll}次</div>
				</a>
			</li>
		</c:if>
	</c:forEach>
	</ul>
</div>



<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
<script src="${ctxPath}/static/weixin/activity/registration.js"></script>


</body>
</html>

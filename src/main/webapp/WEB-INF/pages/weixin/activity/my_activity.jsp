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
	<title>闵行博物馆-活动预约-详情</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
</head>
<body >
	<div class="detail-box">
		<div class="activity-contant-box">
			<div class="activity-detail-time">
				<ul>
					<li>
						<span class="detail-time-lf">报名时间</span>
						<span class="detail-time-rig"><fmt:formatDate value="${activityEnroll[0].enrollTime}" pattern="yyyy-MM-dd "/></span>
					</li>
					<li>
						<span class="detail-time-lf">联系人</span>
						<span class="detail-time-rig">${activityEnroll[0].linkMan}</span>
					</li>
					<li>
						<span class="detail-time-lf">手机号</span>
						<span class="detail-time-rig">${activityEnroll[0].mobile}</span>
					</li>
					<li>
						<span class="detail-time-lf">报名人数</span>
						<span class="detail-time-rig">${activityEnroll[0].number}</span>
					</li>

					<li>
						<span class="detail-time-lf">活动场次</span>
						<span class="detail-time-rig">${activitySessionArray[0].activitySession}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
</body>
</html>

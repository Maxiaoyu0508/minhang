<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core"%>
<!doctype html>
<html style="background: #ebebeb;height: 100%">
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title>闵行博物馆-活动预约</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />

</head>
<body >
<div class="ex-box">
	<div class="activity-box" style="background:url('${ctxPath}/static/front/images/activity-01.png') no-repeat;background-size:cover;">
		<span  onclick="openDiv()" class="reserve-box" ><i class="iconfont icon-wenjian"></i><span>我的预约</span></span>
	</div>
	<ul class="ex-ul activity-ul">
	<c:forEach items="${activitys}" end="3" var="activitys" >
		<li>
			<a href="${ctxPath}/weixin/activity/detail.htm?item.id=${activitys.id}">
				<div class="ex-li-img">
					<img src="${ctxPath}${fileRoot}${activitys.imageMain}">
				</div>
				<div class="ex-li-title">${activitys.name}</div>
				<span class="apply-time"><fmt:formatDate value="${activitys.enrollTimeBegin}" pattern="yyyy-MM-dd "/>-<fmt:formatDate value="${activitys.enrollTimeEnd}" pattern="yyyy-MM-dd"/></span>
				<span class="ex-li-text"><core:unescapeHtml value="${activitys.htmlDesc}" /></span>
			</a>
		</li>
	</c:forEach>
	</ul>
</div>
<div class="tc-div">
    <label>
        <h5>消息</h5>
        <input id="phone"type="tel"value="" placeholder="请输入报名的手机号">
        <a onclick="surePhone()" class="ui-button blue-skin" href="javascript:void(0);">确定</a>
        <a onclick="closeDiv()" class="ui-button blue-skin" href="javascript:void(0);" style="background-color:#eee;color:#999">取消</a>
    </label>
</div>
<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
<script src="${ctxPath}/static/weixin/activity/registration.js"></script>
</body>
</html>

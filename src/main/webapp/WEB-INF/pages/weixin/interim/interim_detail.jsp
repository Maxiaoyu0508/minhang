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
	<title>闵行博物馆-临展讯息</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
    <style>
        .activity-contant-box {
            padding: 15px 20px;
            box-shadow: 0 -4px 5px rgba(85,85,85,.1);
        }
        .bot-line{bottom:-30px;}
        .activity-contant-box h2 {
            padding: 20px 0 5px;
        }
        .activity-top{height: 295px;}
    </style>
</head>
<body >
<div class="detail-box">
	<div class="interim-box">
		<div class="activity-top" style="background:#ebebeb url('${ctxPath}/upload/${jsonArray[0].path}') no-repeat center;background-size:contain;">
			<div class="bot-line"></div>
		</div>
	</div>
	<div class="activity-contant-box">
		<h2>${cmsArticle.name}</h2>
		<div class="activity-detail-time">
			<ul>
				<li>
					<span class="detail-time-lf">展览时间</span>
					<span class="detail-time-rig">${cmsArticle.exhibitionTime}</span>
				</li>
				<li>
					<span class="detail-time-lf">展览地点</span>
					<span class="detail-time-rig">${cmsArticle.exhibitionPlace}</span>
				</li>
			</ul>
		</div>
		<div class="activity-contant">
			<core:unescapeHtml value="${cmsArticle.content}" />
		</div>
	</div>



</div>


<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />


</body>
</html>

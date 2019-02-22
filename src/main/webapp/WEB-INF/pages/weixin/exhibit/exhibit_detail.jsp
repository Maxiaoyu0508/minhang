<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core"%>
<!doctype html>
<html style="background: #868a8f;height: 100%">
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title>闵行博物馆-基本陈列-详情</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
	<style>
		.jq22-container{height: 100%;}
		.vidbacking{height:100%;width: 100vw;}
	</style>
</head>
<body >
	<div class="detail-box">
		<c:forEach items="${uploadFile}" end="1" var="uploadFile" >
		<div class="detail-top" >
			<div class="jq22-container none" style="background:url('${ctxPath}/upload/${uploadFile.path}') no-repeat;background-size:cover;"></div>


			<div class="detail-top-box">
				<div class="detail-top-list">
					<i class="iconfont icon-d" onclick="threeDimensions(${cmsArticle.id})"></i>
					<span>3D</span>
				</div>
				<div class="detail-top-list" onclick="music(${cmsArticle.id})">
					<img src="${ctxPath}/static/front/images/detail-03.png" >
					<div class="detail-top-icon none">
						<i class="iconfont icon-stop"></i>
					</div>
					<span>音频讲解</span>
				</div>
			</div>
			<div class="like-box" onclick="awesome(${cmsArticle.id})">
				<i class="iconfont icon-xin1 clb single-option" ></i>
				<i class="iconfont clb single-op icon-shoucang"></i>
				<span>赞</span>
			</div>
			<div class="bot-line"></div>
		</div>
		</c:forEach>

		<div class="detail-contant-box">
			<h2>${cmsArticle.name}</h2>
			<ul class="detail-contant-ul">
				<li>
					<h5>收藏时间</h5>
					<span>
						<fmt:formatDate value="${cmsArticle.publishDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
					</span>
				</li>
				<li>
					<h5>浏览次数</h5>
					<span>${cmsArticle.browseTime}</span>
				</li>
				<li>
					<h5>点赞次数</h5>
					<span id="spotTime">${cmsArticle.spotTime}</span>
				</li>
			</ul>
			<div class="detail-contant">
				<core:unescapeHtml value="${cmsArticle.content}" />
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
	<script src="${ctxPath}/static/weixin/exhibit/exhibit_detail.js"></script>
	<script>

	</script>
</body>
</html>

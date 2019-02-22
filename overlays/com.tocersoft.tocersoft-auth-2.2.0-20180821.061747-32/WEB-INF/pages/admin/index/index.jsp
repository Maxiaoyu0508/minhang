<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="html-bg">
	<head>
		<title>${projectName}</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link href="${ctxPath}/static/admin/index/iconfont/iconfont.css" rel="stylesheet" />
	</head>
	<body>
		<div id="north" class="clb">
			<div id="siteInfo" class="fl mr30">
				<div id="logo">
					<c:if test="${empty applicationScope.sysUploadSet.logoImage}">
						<img class="logo-color" alt="" src="${ctxPath}/static/admin/index/images/index-wel.png">
					</c:if>
					<c:if test="${not empty applicationScope.sysUploadSet.logoImage}">
						<img class="logo-color" alt="" src="${ctxPath}${fileRoot}${applicationScope.sysUploadSet.logoImage}">
					</c:if>
					<img class="logo-white" alt="" src="${ctxPath}/static/admin/index/images/index-wel-white.png">
				</div>
				<div class="cb"></div>
			</div>
			<ul id="navTop" class="fl">
			</ul>
			<div id="northRight" class="user-head fr cp  pr">
				<div class="fl north-img">
					<img alt="" src="${ctxPath}/static/admin/index/images/xkjr-mr.png">
				</div>
				<div class="north-rig fl ml15 clb">
					<span class="fl">${current_user.name}</span>
					<i class="iconfont icon-xiangxiajiantou fr mr10"></i>
				</div>
				<a class="white-tc-box css3-transition" href="${ctxPath}/admin/logout.htm">退出</a>
			</div>
			<div id="headFull" class="fr tocer-icon-58 head-full-icon"></div>
			<div class="skin-choose" title="切换主题"></div>
			<!-- 导航 -->
			<!-- 导航 end -->
		</div>
		<div id="skinContentBox" class="skin-content-box">
			<h5><i class="tocer-icon25"></i>个性化设置后台皮肤样式</h5>
			<!-- Swiper -->
		    <div class="index swiper-container">
		        <ul class="swiper-wrapper">
		            <li class="swiper-slide" onclick="changecss('${ctxPath}/static/admin/base/admin_common.css')"><img src="${ctxPath}/static/admin/base/images/skin1.jpg"></li>
		            <li class="swiper-slide" onclick="changecss('${ctxPath}/static/admin/base/admin_skin2.css')"><img src="${ctxPath}/static/admin/base/images/skin2.jpg"></li>
		            <li class="swiper-slide" onclick="changecss('${ctxPath}/static/admin/base/admin_skin3.css')"><img src="${ctxPath}/static/admin/base/images/skin3.jpg"></li>
		        </ul>
		    </div>
		    <i id="closeSkinBox" class="tocer-icon52"></i>
		</div>
		<div id="west" flat="0" date="0">
			<div class="tocer-icon35 sq-bofont" ></div>
			<div id="wm">
				<div class="west-menu"></div>
			</div>
		</div>
		<div id="east">
			<iframe id="mainIframe" name="mainIframe" marginheight="5px" marginwidth="5px" class="mainIframe" scrolling="auto" frameborder="0"></iframe>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript">var menu = $.parseJSON('${current_privilege}');var enableWebSocket = ${enableWebSocket};</script>
		<script type="text/javascript" src="${ctxPath}/static/admin/index/index.js?t=${sysVersion}"></script>
		<c:if test="${enableWebSocket}">
				<script type="text/javascript" src="${ctxPath}/static/admin/index/websocket.js?t=${sysVersion}"></script>
		</c:if>
		<script type="text/javascript" src="${ctxPath}/static/admin/index/menu_state.js?t=${sysVersion}"></script>
	</body>
</html>
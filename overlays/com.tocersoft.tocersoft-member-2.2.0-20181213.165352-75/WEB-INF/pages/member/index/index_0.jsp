<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html style="background-color:#efeff4">
	<head>
		<meta charset="utf-8" />
		<title>${projectName} - 会员中心 - 首页</title>
		<meta name="Keywords" content="">
		<meta name="description" content="">
		<jsp:include page="/WEB-INF/pages/member/base/inc_member_css.jsp" />
	</head>
	<body class="body-color-gray" style="width: 100%;margin: auto;height:100%">
		<div id="north" class="member-header clb">
			<a id="logo" class="member-logo fl" href="${ctxPath}/"><img src="${ctxPath}/static/front/base/images/logo.png" alt=""></a>
			<div class="pr fl">
				<div class="index-ico pr">
					<i class="iconfont icon-liaotian"></i>
					<a class="index-num">3</a>
				</div>
				<div class="hea-infor pr">
					<div class="ico-head">
						<i class="iconfont icon-xiangshangsanjiao"></i>
					</div>
					<header class="panel-heading bg-white">
						<span class="h5">
							<strong>You have <span class="count-n" style="display: inline;">5</span> notifications</strong>
						</span>
					</header>
					<ul>
						<li>
							<a href="#"> 
								<span class="media-body block m-b-none">
									Added the timeline, view it here.<br><small class="text-muted">1 minute ago</small>
								</span>
							</a>
						</li>
						<li>
							<a href="#"> 
								<span class="media-body block m-b-none">
									Added the timeline, view it here.<br><small class="text-muted">1 minute ago</small>
								</span>
							</a>
						</li>
					</ul>
					<footer class="panel-footer text-small clb">
		                <a href="#" class="pull-right fr"><i class="iconfont icon-shezhi"></i></a>
		                <a href="#" class="fl">See all the notifications</a>
		            </footer>
				</div>
			</div>
			<!-- 主导航 -->
			<ul id="navTop" class="nav-top fl"></ul>
			<div class="fr">
				<!-- 主导航 end -->
				<div id="northRight" class="user-head fr cp  pr">
					<div class="fl north-img">
						<img alt="" src="${ctxPath}/static/admin/index/images/xkjr-mr.png">
					</div>
					<div class="north-rig fl ml15 clb">
						
						<span class="fl">
						<c:if test="${current_member.name == null}">
									${current_member.account }
						</c:if>
						
						</span>
						<i class="iconfont icon-xiangxiajiantou fr mr10"></i>
					</div>
					<a class="white-tc-box css3-transition" href="${ctxPath}/member/logout.htm">退出</a>
				</div>
			</div>
			
		</div>
		<div id="west" class="member-sub-nav">
			<div class="tocer-icon35 sq-bofont"></div>
			<div id="wm">
				<div class="west-menu"></div>
			</div>	
		</div>
		<div id="east" class="member-content">
			<iframe id="mainIframe" name="mainIframe" marginheight="5px" marginwidth="5px" class="main-iframe" scrolling="auto" frameborder="0"></iframe>
		</div>
		
		<jsp:include page="/WEB-INF/pages/member/base/inc_member_js.jsp"/>
		<script type="text/javascript">var menu = $.parseJSON('${current_privilege}');</script>
		<script type="text/javascript" src="${ctxPath}/static/member/index/index.js?t=${sysVersion}"></script>
	</body>
</html>

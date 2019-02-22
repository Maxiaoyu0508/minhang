<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html>
	<head>
		<title>${projectName} - 会员中心 - 首页</title>
		<jsp:include page="/WEB-INF/pages/member/base/member_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/member/base/member_css_inc.jsp" />
		<link href="${ctxPath}/static/member/index/iconfont/iconfont.css" rel="stylesheet" />
		<link href="${ctxPath}/static/member/index/index.css?t=${sysVersion}" rel="stylesheet" />
	</head>
	<body>
		<div id="north" class="clb">
			<div id="siteInfo" class="fl mr30">
				<div id="logo"><img alt="" src="${ctxPath}/static/member/index/images/index-wel.png" style="height:40px"></div>
				<div class="cb"></div>
			</div>
			<!-- 
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
			 -->
			<ul id="navTop" class="fl">
			</ul>
			<div id="northRight" class="user-head fr cp  pr">
				<div class="fl north-img">
					<img alt="" src="${ctxPath}/static/member/index/images/xkjr-mr.png">
				</div>
				<div class="north-rig fl ml15 clb">
					<span class="fl">${current_member.account}</span>
					<i class="iconfont icon-xiangxiajiantou fr mr10"></i>
				</div>
				<a class="white-tc-box css3-transition" href="${ctxPath}/member/logout.htm">退出</a>
			</div>
			<div id="headFull" class="fr tocer-icon-58 head-full-icon"></div>
			<!-- 导航 -->
			<!-- 导航 end -->
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
		<jsp:include page="/WEB-INF/pages/member/base/member_js_inc.jsp"/>
		<script type="text/javascript">var menu = $.parseJSON('${current_privilege}');</script>
		<script type="text/javascript" src="${ctxPath}/static/member/index/index.js?t=${sysVersion}"></script>
	</body>
</html>
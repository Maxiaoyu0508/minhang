<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
	<base href="${ctxPath}"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>上海市网络与信息安全应急管理事务中心</title>
	<meta name="Keywords" content="网络 | 信息安全 | 应急 | 管理事务中心"/>
	<meta name="description" content="上海市网络与信息安全应急管理事务中心"/>
	<link href="${ctxPath}/static/base/base.css" rel="stylesheet" />
	<link href="${ctxPath}/static/front/base/main.css" rel="stylesheet" />
	<link href="${ctxPath}/static/front/base/iconfont/iconfont.css" rel="stylesheet" />
	<style>
		.list-box-left {
			float: left;
			width: 860px;
			margin-right: 13px;
			border-right: 1px solid #ddd;
			padding-right: 30px;
			box-sizing: border-box;
		}
	</style>
</head>
<body >
<jsp:include page="/WEB-INF/pages/front/base/header_inc.jsp">
	<jsp:param value="business" name="menu"/>
</jsp:include>
<div class="list-top">
	<a href="${ctxPath}/index.htm">首页</a> <span> > </span>
	<c:forEach items="${cmsChannelList}" var="channel">
	<a href="${ctxPath}/list.htm?cid=${channel.id}">${channel.name}</a> <span> > </span>
	</c:forEach>
<div class="cms-list-box clb">
	<div class="list-box-left">
		<div class="list-lf-top">威胁预警</div>
		<ul class="list-box-ul">
			<c:forEach items="${pageResult.result}" var="article" >
			<li class="clb">
				<a href="${ctxPath}/detail.htm">${article.name}</a>
				<span><fmt:formatDate value="${article.createDate}" pattern="yyyy/MM/dd"/></span>
			</li>
			</c:forEach>
		</ul>
		<div class="list-page clb">
			<ul class="clb">
				<li><a> << </a></li>
				<li><a> < </a></li>
				<c:forEach begin="1" end="${pageResult.allPages}" var="page">
					<li><a>${page}</a></li>
				</c:forEach>
				<li><a> > </a></li>
				<li><a> >> </a></li>
			</ul>
		</div>
	</div>
	<div class="list-box-rig">
		<div class="list-lf-top">快捷入口</div>
		<div class="list-rig-search clb">
			<i class="iconfont icon-sousuo"></i>
			<input type="text" placeholder="搜索相关资讯">
			<a>搜索</a>
		</div>
		<ul class="list-rig-ul clb">
			<li>
				<a href="">
					<img src="/static/front/images/brand.png" alt="">
					<span>关于中心</span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="/static/front/images/brand2.png" alt="">
					<span>网安动态</span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="/static/front/images/brand3.png" alt="">
					<span>政策法规</span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="/static/front/images/brand4.png" alt="">
					<span>职工园地</span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="/static/front/images/brand5.png" alt="">
					<span>党建工作</span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="/static/front/images/brand6.png" alt="">
					<span>相关下载</span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="/static/front/images/brand7.png" alt="">
					<span>联系我们</span>
				</a>
			</li>
		</ul>

	</div>
</div>
<jsp:include page="/WEB-INF/pages/front/base/footer_inc.jsp"/>
</body>
</html>


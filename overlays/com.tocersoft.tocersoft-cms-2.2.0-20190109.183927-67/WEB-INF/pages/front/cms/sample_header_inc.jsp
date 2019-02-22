<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link rel="stylesheet" type="text/css" href="/static/front/base/swiper.min.css">
<script src="/static/front/base/swiper.min.js"></script>
<script src="/static/front/base/jquery.min.js"></script>
<style>
	*{margin:0;padding:0;font-family:'微软雅黑';}
	header{width:100%;height:205px;}
	header .search{height:135px;background:url("/static/front/images/header-bg.png") no-repeat center;display:flex;align-items:center;}
	header .search .search-cover{width:1200px;height:60px;margin:auto;display:flex;align-items:center;}
	header .search .search-cover .logo{flex:1;background:url("/static/front/images/logo.png") no-repeat left center;background-size:58px 57px;}
	header .search .search-cover .logo .com-name{font-size:25px;}
    header .search .search-cover .logo .com-small{font-size:16px;}
	header .com-name,.com-small{color:white;margin-left:68px;}
	header .do-search{width:440px;height:44px;display:flex;align-items:center;position:relative;}
	header .do-search .search-icon{width:19px;height:19px;position:absolute;left:14px;top:50%;margin-top:-10px;background:url("/static/front/images/search.png") no-repeat center;background-size:100%;}
	header .do-search input{display:block;flex:1;height:42px;outline:none;padding-left:40px;}
	header .do-search .btn{width:111px;height:44px;background:#325faf;cursor:pointer;border:1px solid white;line-height:42px;text-align:center;font-size:14px;color:white;}
	header input::-webkit-input-placeholder{font-size:14px;color:#aaa;}
	header .nav{height:50px;background:#3e66ae;color:white;font-size:15px;}
	header .nav ul{width:1200px;margin:auto;height:50px;display:flex;}
	header .nav ul li{flex:1;height:50px;line-height:50px;text-align:center;list-style-type: none;cursor:pointer;}
	header .nav ul li a{font-size:15px;}
	header .nav ul li img{width:22px;height:22px;margin-right:13px;}
	header .nav ul .active{background: #5983cd;}
</style>
<header>
	<div class="search">
		<div class="search-cover">
			<div class="logo">
				<p class="com-name">上海市网络与信息安全应急管理事务中心</p>
				<p class="com-small">Shanghai Emergency Response Center for Information Security</p>
			</div>
			<div class="do-search">
				<div class="search-icon"></div>
				<input type="text" placeholder="搜索相关资讯">
				<div class="btn">搜索</div>
			</div>
		</div>
	</div>
	<div class="nav">
		<ul id="menu">
			<li class="home-li active"><img src="/static/front/images/home-icon.png" alt=""><a href="${ctxPath}/index.htm">网站首页</a></li>
			<li menu="about"><a href="${ctxPath}/about.htm">关于中心</a></li>
			<li menu="business"><a href="${ctxPath}/list.htm?cid=296">中心业务</a></li>
			<li menu="news"><a href="${ctxPath}/list.htm?cid=224">网安动态</a></li>
			<li menu="policy"><a href="${ctxPath}/list.htm?cid=230">政策法规</a></li>
			<li menu="party"><a href="${ctxPath}/list.htm?cid=342">党建工作</a></li>
			<li menu="employee"><a href="${ctxPath}/list.htm?cid=344">职工园地</a></li>
			<li menu="download"><a href="${ctxPath}/list.htm?cid=411">相关下载</a></li>
			<li menu="contact"><a href="${ctxPath}/list.htm?cid=421">联系我们</a></li>
		</ul>
	</div>
</header>
<script>
    var menu = '${param.menu}';
    if(menu && menu.length > 0){
        $('#menu li').removeClass("active");
        $('#menu li[menu='+menu+']').addClass("active");
    }
</script>
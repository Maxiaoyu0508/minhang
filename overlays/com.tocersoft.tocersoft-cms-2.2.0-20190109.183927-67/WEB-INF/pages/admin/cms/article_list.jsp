<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>文章管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/base/lib/spliter/spliter.js"></script>
	</head>
	<body class="clb h">
		<div class="category-box clb">
			<div id="categoryTreeDiv" class="category-tree fl" >
				<div class="bg-caption">
					<span class="bgc-title">栏目管理</span>
				</div>
				<div id="treeDiv" class="depart-tree">
					<div class="min-height"></div>
					<ul id="categoryTree" class="ztree"></ul>
				</div>
			</div>
				<input id="channelId" name="condition.channelId" value="${item.channelId}" type="hidden"/>
				<div id="categoryContentDiv" class="category-list pr" style="overflow:hidden;">
					<form id="searchForm">
						<div class='form-border-box'>
							<div class="welcome-right-title clb" >
								<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>文章列表</span>
								
								<div id="operBar" class="oper-box clb">
									<input id="AllChannelId" name="condition.AllChannelId" type="hidden"/>
									<a id="addArticle" class="ui-button blue-skin" href="javascript:void(0);">新增文章</a>
									<a id="delArticle" class="ui-button green-skin" href="javascript:void(0);">批量删除</a>
									<a id="refresh" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
									<a id="publish" class="ui-button white-skin" href="javascript:void(0);">发布</a>
									<a id="unPublish" class="ui-button white-skin" href="javascript:void(0);">取消发布</a>
									<a id="recommend" class="ui-button white-skin" href="javascript:void(0);">推荐</a>
									<a id="unRecommend" class="ui-button white-skin" href="javascript:void(0);">取消推荐</a>
									<input id="fastSearch" name="condition.articleName" value="" class="tc-input-text  w200 search-box" placeholder="请输入文章名称模糊查询" type="text"/>
									<a class="ui-button white-skin" href="javascript:;" onclick="searchArticleList();">查询</a>
									<%-- <a id="searchMoreBtn" class="ui-button fl ml5" href="javascript:;">更多查询</a> --%>
									<%-- <input id="isMoreSearch" value="0" type="hidden"/>--%>
								</div>
							</div>	
						</div>	
					</form>
					<table id="table"></table>
					<div id="pagerBar"></div>
				</div>
			</div>
		</div>
		<div id="rMenu" style="visibility: hidden; top: 130px; left: 89px;">
			<ul class="r-menu">
				<li class="bd bd_add"><a id="addNodeBtn" href="javascript:void(0);">新增栏目</a></li>
				<li class="bd bd_add"><a id="editNodeBtn" href="javascript:void(0);">修改栏目</a></li>
				<li class="bd bd_delete"><a id="selNodeDelete"  href="javascript:void(0);">删除栏目</a></li>
				<li class="bd bd_refresh"><a id="selNodeRefresh"  href="javascript:void(0);">刷新栏目</a></li>
			</ul>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/article_list.js"></script>
	</body>
</html>
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
	<body class="iframe-body">
		<div id="categoryContentDiv" class="category-list fl" style="overflow:hidden;width:100%;">
			<div id="operBar" class="oper mb3">
				<form id="searchForm">
					<input id="channelId" name="condition.channelId" type="hidden"/>
					<input id="authorType" value="${authorType }" type="hidden"/>
					<a id="addArticle" class="ui-button btn_add_user fl" href="javascript:void(0);">新增相关文章</a>
					<a id="delArticle" class="ui-button btn_add_user fl ml5" href="javascript:void(0);">批量删除</a>
					<input id="fastSearch" name="condition.articleName" value="" class="tc-input-text fl ml5 w200" placeholder="请输入文章名称模糊查询" type="text"/>
					<a class="ui-button fl ml5" href="javascript:;" onclick="searchArticleList();">查询</a>
					<a id="refresh" class="ui-button btn_add_user fl ml5" href="javascript:void(0);">刷新</a>
					<%-- <input id="isMoreSearch" value="0" type="hidden"/>--%>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/cms_blog_article_index.js"></script>
	</body>
</html>
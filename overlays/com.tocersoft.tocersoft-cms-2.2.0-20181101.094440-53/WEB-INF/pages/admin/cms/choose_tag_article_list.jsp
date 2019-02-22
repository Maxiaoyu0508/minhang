<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>文章管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
			<div id="operBar" class="oper mb3">
				<input id="tagId" type="hidden" value="${tagId }"/>
				<form id="searchForm">
					<a id="batchChoose" class="ui-button btn_add_user fl" href="javascript:void(0);">批量选择</a>
					<input id="fastSearch" name="condition.articleName" value="" class="tc-input-text fl ml5 w200" placeholder="请输入文章名称模糊查询" type="text"/>
					<a class="ui-button fl ml5" href="javascript:;" onclick="searchArticleList();">查询</a>
					<a id="refresh" class="ui-button btn_add_user fl ml5" href="javascript:void(0);">刷新</a>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/choose_tag_article_list.js?t=${sysVersion}"></script>
	</body>
</html>
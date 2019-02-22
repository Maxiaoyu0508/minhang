<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>专栏内的相关文章管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="category-list fl">
			<div class="oper mb3">
				<form id="searchForm">
					<a id="addBtn" class="ui-button fl mr5" href="javascript:void(0);">新增专栏内的相关文章</a>
					<a id="batchDelBtn" class="ui-button fl mr5" href="javascript:void(0);">批量删除</a>
					<input id="searchKey" name="condition.name" value="" class="tc-input-text fl mr5 w200" type="text" placeholder="专栏内的相关文章模糊查询"/>
					<a id="searchBtn" class="ui-button fl mr5" href="javascript:void(0);" >查询</a>
					<a id="refreshGridBtn" class="ui-button fl mr5" href="javascript:void(0);">刷新</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_column_article_index.js?t=${sysVersion}"></script>
	</body>
</html>
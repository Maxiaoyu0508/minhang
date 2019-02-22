<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>国家管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="category-list fl">
			<div class="oper mb3">
				<form id="searchForm">
					<a id="addBtn" class="ui-button white-skin" href="javascript:void(0);">新增国家</a>
					<a id="batchDelBtn" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
					<input id="searchKey" name="condition.name" value="" class="tc-input-text w200 search-box" type="text" placeholder="国家模糊查询"/>
					<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
					<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_region_country_index.js?t=${sysVersion}"></script>
	</body>
</html>
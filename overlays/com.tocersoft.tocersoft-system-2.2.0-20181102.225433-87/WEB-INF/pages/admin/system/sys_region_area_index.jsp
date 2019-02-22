<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>大区管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link href="${ctxPath}/static/base/lib/spliter/spliter.css" rel="stylesheet" type="text/css" />
		<script src="${ctxPath}/static/base/lib/spliter/spliter.js"></script>
	</head>
	<body class="iframe-body">
		<div class="border-ddd">
			<div class="form-border-box">
			<form id="searchForm">
				<div class="welcome-right-title clb">
					<span class="ml10 fl wrt-font-title" ><i class="tocer-icon10"></i>大区列表</span>
					
					<div id="operBar" class="oper-box">
						<a id="addRegionAreaBtn" class="ui-button blue-skin" href="javascript:void(0);">新增大区</a>
						<a id="batchDelRegionAreaBtn" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
						<input id="searchKey" name="condition.name" value="" class="tc-input-text w200 search-box" type="text" placeholder="大区模糊查询"/>
						<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
						<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
						<div class="cb"></div>
					</div>
				</div>
			</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_region_area_index.js?t=${sysVersion}"></script>
	</body>
</html>
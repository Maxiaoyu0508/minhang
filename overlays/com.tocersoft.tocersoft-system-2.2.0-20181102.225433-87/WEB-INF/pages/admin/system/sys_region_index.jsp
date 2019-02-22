<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<title>区域管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link href="${ctxPath}/static/base/lib/spliter/spliter.css" rel="stylesheet" type="text/css" />
		<script src="${ctxPath}/static/base/lib/spliter/spliter.js"></script>
	</head>
	<body class="iframe-body">
		<div class="border-ddd">
			<div class="form-border-box">
				<form id="searchForm">
					<div class="welcome-right-title clb">
						<span class="ml10 fl wrt-font-title" ><i class="tocer-icon10"></i>区域列表</span>
						
						<div id="operBar" class="oper-box">
							<input id="parentId" name="condition.parentId" type="hidden" value="0" >
							<input id="level" name="condition.level" type="hidden" value="1">
							<a id="addRegionBtn" class="ui-button blue-skin" href="javascript:void(0);">新增区域</a>
							<a id="setHotBtn" data-hot-status="1" class="ui-button white-skin" href="javascript:void(0);">设置热门</a>
							<a id="removeHotBtn" data-hot-status="0" class="ui-button white-skin" href="javascript:void(0);">取消热门</a>
							<a id="batchDelRegionBtn" class="ui-button green-skin" href="javascript:void(0);">批量删除</a>
							<input id="searchKey" name="condition.name" value="" class="tc-input-text w200 search-box" type="text" placeholder="区域模糊查询"/>
							<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
							<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
							<a id="" class="ui-button white-skin" onclick="$('#fileInput').click()" href="javascript:void(0);">批量导入</a>
							<input onchange="doImport();" id="fileInput" name="uploadFile"  class="none" type="file">
							<div class="cb"></div>
						</div>
					</div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_region_index.js?t=${sysVersion}"></script>
	</body>
</html>
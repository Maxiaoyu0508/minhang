<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<title>大区详情</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link href="${ctxPath}/static/base/lib/spliter/spliter.css" rel="stylesheet" type="text/css" />
		<script src="${ctxPath}/static/base/lib/spliter/spliter.js"></script>
	</head>
	<body class="iframe-body">
		<div id="categoryContentDiv" class="category-list fl">
			<div id="operBar" class="oper mb3">
				<form id="searchForm">
					<input id="circleId"  value="${circleId }" type="hidden">
					<input id="flag" type="hidden" value="${flag }" />
					<input id="parentId" name="condition.parentId" type="hidden" value="0" />
					<input id="level" name="condition.level" type="hidden" value="1"/>
					<a id="addRegionBtn" class="ui-button white-skin" href="javascript:void(0);">新增区域</a>
					<a id="setHotBtn" class="ui-button white-skin" href="javascript:void(0);">设置热门</a>
					<a id="removeHotBtn" class="ui-button white-skin" href="javascript:void(0);">取消热门</a>
					<a id="batchDelRegionBtn" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
					<input id="searchKey" name="condition.name" value="" class="tc-input-text w200 search-box" type="text" placeholder="区域模糊查询"/>
					<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
					<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<div class="cb"></div>
		<span class="fr mt10">
			<a class="ui-button" id="saveBtn" href="javascript:void(0);">保存</a> 
			<a class="ui-button" id="exitBtn" href="javascript:void(0);">关闭</a>
		</span>
		<div class="prompt_box" id="errorlist"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_region_circle_detail.js?t=${sysVersion}"></script>
	</body>
</html>
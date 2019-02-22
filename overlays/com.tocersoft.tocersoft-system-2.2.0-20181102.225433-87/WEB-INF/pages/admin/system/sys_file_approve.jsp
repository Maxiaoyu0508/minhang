<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<title>图片或附件审核</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link href="${ctxPath}/static/base/lib/spliter/spliter.css" rel="stylesheet" type="text/css" />
		<script src="${ctxPath}/static/base/lib/spliter/spliter.js"></script>
		<script>var type = '${objectType}'</script>
	</head>
	<body class="iframe-body">
		<div class="border-ddd">
			<form id="searchForm">
				<div class="welcome-right-title clb">
					<span class="ml10 fl" >文件审核</span>
				</div>
				<div id="operBar" class="oper-box">
					<input id="objectType" name="objectType" value="${objectType}" type="hidden">
					<a id="addRegionBtn" class="ui-button white-skin" href="javascript:void(0);">审核通过</a>
					<a id="addRegionBtn" class="ui-button white-skin" href="javascript:void(0);">审核不通过</a>
					<a id="batchDelRegionBtn" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
					<input id="searchKey" name="condition.name" value="" class="tc-input-text w200 search-box" type="text" placeholder="区域模糊查询"/>
					<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
					<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
					<div class="cb"></div>
				</div>
			</form>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_file_approve.js?t=${sysVersion}"></script>
	</body>
</html>
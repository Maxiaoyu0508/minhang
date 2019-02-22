<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
	<head>
		<title>商圈管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link href="${ctxPath}/static/base/lib/spliter/spliter.css" rel="stylesheet" type="text/css" />
		<script src="${ctxPath}/static/base/lib/spliter/spliter.js"></script>
	</head>
	<script type="text/javascript">
	</script>
	<body class="iframe-body">
		<div id="categoryContentDiv" class="category-list fl">
			<div id="operBar" class="oper mb3">
				<form id="searchForm">
					<a id="addRegionCircleBtn" class="ui-button white-skin" href="javascript:void(0);">新增商圈</a>
					<a id="batchDelRegionCircleBtn" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
					<div class="tc-select-div w150 fl mr5">
						<select id="regionId" name="condition.regionId" class="w">
							<option value="">请选择城市</option>
							<c:forEach items="${regionList}" var="vst">
								<option value="${vst.id}">${vst.name}</option>
							</c:forEach>
						</select>
					</div>
					<input id="searchKey" name="condition.name" value="" class="tc-input-text w200 search-box" type="text" placeholder="商圈模糊查询"/>
					<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
					<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
					<input id="filenameText" name="" value="" class="tc-input-text ml1 w160" type="text" placeholder="请选择导入文件" disabled="disabled"/>
					<input onchange="$('#filenameText').val(this.value)" id="fileInput" name="uploadFile"  class="none" type="file">
					<a id="" class="ui-button ml5" onclick="$('#fileInput').click();return false;" href="javascript:void(0);">浏览</a>
					<a id="" class="ui-button ml5" onclick="doImport()" href="javascript:void(0);">开始导入</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<div class="prompt_box" id="errorlist"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_region_circle_index.js?t=${sysVersion}"></script>
		<script src="${ctxPath }/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
	</body>
</html>
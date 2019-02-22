<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>用户管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<style>
			.ztree li span.button{
				background: url("${ctxPath}/static/admin/auth/images/zTreeStandard.png");
			}
		</style>
	</head>
	<body class="h">
	<div class="category-box clb">
		<div id="categoryTreeDiv" class="category-tree fl" >
			<div class="bg-caption">
				<span class="bgc-title">部门组织架构</span>
				<div class="sh-caption-div">
					<i class="tocer-icon-63 cz-icon"></i>
					<div class="scd-div" style="width:110px">
						<a onclick="makeNameIdChain();" href="javascript:void(0);">重构名称与ID链</a>
					</div>
				</div>
			</div>
			<div id="treeDiv" class="depart-tree">
				<div class="min-height"></div>
				<ul id="categoryTree" class="ztree"></ul>
				<div id="loadTip" class="load-tip">
					<p>正在加载部门</p>
				</div>
			</div>
		</div>
		
		<div id="categoryContentDiv" class="category-list fl border-ddd">
			<div class="form-border-box">
				<div class="welcome-right-title clb">
					<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>用户管理</span>
					<form id="searchForm">
						<div id="operBar" class="oper-box">
							<input id="departId" name="condition.departId" type="hidden"/>
							<a id="addBtn" class="ui-button blue-skin" href="javascript:void(0);">新增用户</a>
							<a id="delBtn" class="ui-button green-skin" href="javascript:void(0);">批量删除</a>
							<input id="searchKey" name="condition.key" value="" class="tc-input-text w200 search-box" type="text" placeholder="用户名或用户姓名模糊查询"/>
							<a id="searchBtn" class="ui-button green-skin" href="javascript:void(0);" >查询</a>
							<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
							<a id="" class="ui-button white-skin" onclick="$('#fileInput').click()" href="javascript:void(0);">批量导入</a>
							<a id="" class="ui-button white-skin"  href="${ctxPath}/static/admin/download/user_import.xls">导入模板</a>
							<a id="userMoveBtn" class="ui-button white-skin"  href="javascript:void(0);">用户移动部门</a>
							<input id="filenameText"  class="tc-input-text ml1 w160 vm none" style="background:#fff;" type="text" placeholder="请选择导入文件" disabled="disabled"/>
							<input onchange="doImport();" id="fileInput" name="uploadFile"  class="none" type="file">
							<div class="cb"></div>
						</div>
					</form>
				</div>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		</div>
		<div id="rMenu" style="visibility: hidden; top: 130px; left: 89px;">
			<ul class="r-menu">
				<li class="bd bd_add"><a id="addDepartNodeBtn" href="javascript:void(0);">新增子部门</a></li>
				<li class="bd bd_add"><a id="editDepartNodeBtn" href="javascript:void(0);">修改部门</a></li>
				<li class="bd bd_delete"><a id="delDepartNodeBtn"  href="javascript:void(0);">删除部门</a></li>
				<li class="bd bd_refresh"><a id="bathDelDepartNodeBtn"  href="javascript:void(0);">批量删除</a></li>
				<li class="bd bd_refresh"><a id="refreshDepartNodeBtn"  href="javascript:void(0);">刷新部门</a></li>
				<li class="bd bd_refresh"><a id="moveDepartNodeBtn"  href="javascript:void(0);">移动到</a></li>
			</ul>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
 		<script type="text/javascript" src="${ctxPath}/static/admin/auth/user_list.js?v=${sysVersion}"></script>
	</body>
</html>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%-- <%@ taglib prefix="s" uri="/struts-tags" %> --%>
<!DOCTYPE html>
<html>
	<head>
		<title>角色权限</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="category-list fl">
		<div class="welcome-right-title clb">
			<div class="oper-box clb">
				<form id="searchForm">
					<a class="ui-button blue-skin" href="javascript:void(0);" onclick="selectRole();return false;">确认提交</a>
					<a id="refreshBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
					<input id="searchName" name="condition.key" value="" class="tc-input-text fl search-box" type="text"/>
					<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);">查询</a>
					<a class="ui-button white-skin" href="javascript:void(0);" onclick="$.dialog.close();return false;">关闭</a>
					<div class="cb"></div>
				</form>
			</div>
			</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_choose_role.js?v=${sysVersion}"></script>
	</body>
</html>
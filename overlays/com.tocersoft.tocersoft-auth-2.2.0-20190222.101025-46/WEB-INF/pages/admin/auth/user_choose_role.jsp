<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%-- <%@ taglib prefix="s" uri="/struts-tags" %> --%>
<!DOCTYPE html>
<html>
	<head>
		<title>角色权限</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<style type="text/css">
			.ai{height:24px;line-height:24px;}
			.in{height:28px;line-height:28px;border-width: 1px;margin-right:3px;}
		</style>
	</head>
	<body class="iframe-body">
		<form id="searchForm">
		<div id="operBar" class="oper-box clb" style="padding:5px;">
			<a class="ui-button blue-skin ai" href="javascript:void(0);" onclick="selectRole();return false;">确认提交</a>
			<input id="searchName" name="condition.key" value="" class="tc-input-text fl w200 search-box in" type="text"/>
			<a id="searchBtn" class="ui-button white-skin ai" href="javascript:void(0);">查询</a>
			<a id="refreshBtn" class="ui-button white-skin ai" href="javascript:void(0);">刷新</a>
			<a class="ui-button white-skin ai" href="javascript:void(0);" onclick="$.dialog.close();return false;">关闭</a>
			<div class="cb"></div>
		</div>
		</form>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/auth/user_choose_role.js?v=${sysVersion}"></script>
	</body>
</html>
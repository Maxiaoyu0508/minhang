<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>活动报名管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
	<div class="form-border-box">
		<div class="welcome-right-title clb">
			<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>活动报名</span>
				<form id="searchForm">
					<a onclick="addActivityEnroll()" class="ui-button blue-skin" href="javascript:void(0);">后台报名</a>
					<input id="searchKey" name="condition.activityName" value="" class="tc-input-text w200 search-box" type="text" placeholder="活动名称模糊查询"/>
					<a onclick="searchActivityEnroll()" class="ui-button green-skin" href="javascript:void(0);" >查询</a>
					<a onclick="refreshGrid()" class="ui-button blue-skin" href="javascript:void(0);">刷新</a>
					<a onclick="auditPass()" class="ui-button white-skin" href="javascript:void(0);">审核通过</a>
					<a onclick="auditNotPass()" class="ui-button white-skin" href="javascript:void(0);">审核未通过</a>
					<a id="" class="ui-button white-skin" href="javascript:void(0);" onclick="exportInfo();return false;">报名信息导出</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/activity/activity_enroll_index.js?v=${sysVersion}"></script>
	</body>
</html>
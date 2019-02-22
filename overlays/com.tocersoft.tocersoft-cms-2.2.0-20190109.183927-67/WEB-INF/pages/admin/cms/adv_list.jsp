<%@ page language="java" contentType="text/html; charset=utf-8"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>广告管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link href="${ctxPath}/static/admin/work/work.css" rel="stylesheet" />
	</head>
	<body class="iframe-body">
		<div class="form-border-box">
			<div class="welcome-right-title clb">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>广告位列表</span>
				<form id="searchForm">
					<div class="oper-box clb">
						<a onClick="addAdv();" class="ui-button blue-skin" href="javascript:void(0);">新增广告位</a>
					</div>
				</form>
			</div>
			<input id="assigneeId" value="${item.assigneeId }" type="hidden">
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/adv_list.js"></script>
	</body>
</html>
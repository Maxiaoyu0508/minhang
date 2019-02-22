<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>志愿者招募管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="form-border-box">
			<div class="welcome-right-title clb">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>志愿者招募</span>
				<form id="searchForm">
					<div class="oper-box clb">
						<a onClick="addWxVolunteer();" class="ui-button blue-skin" href="javascript:void(0);">新增志愿者招募</a>
						<a onClick="doBatchDelWxVolunteer();" class="ui-button green-skin" href="javascript:void(0);">批量删除</a>
						<input id="searchKey" name="condition.searchKey" value="" class="tc-input-text w200 search-box" type="text" placeholder="志愿者招募模糊查询"/>
						<a onClick="searchWxVolunteer();" class="ui-button green-skin" href="javascript:void(0);" >查询</a>
						<a onClick="refreshGrid();" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
						<div class="cb"></div>
					</div>
				</form>
			</div>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/wx/wx_volunteer_index.js?v=${sysVersion}"></script>
	</body>
</html>
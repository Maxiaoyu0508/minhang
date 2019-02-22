<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>会员角色管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="form-border-box clb">
			<div class="welcome-right-title clb">
				<span class="ml10 fl wrt-font-title">会员角色管理</span>
				<div class="oper-box">
					<form id="searchForm">
						<a id="addBtn" class="ui-button blue-skin" href="javascript:void(0);">新增会员角色</a>
						<!-- <a id="batchDelBtn" class="ui-button fl mr5" href="javascript:void(0);">批量删除</a> -->
						<input id="searchKey" name="condition.name" value="" class="tc-input-text search-box w200" type="text" placeholder="会员角色模糊查询"/>
						<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
						<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
					</form>
				</div>
			</div>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_role_index.js?v=${sysVersion}"></script>
	</body>
</html>
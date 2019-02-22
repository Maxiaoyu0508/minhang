<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>角色权限管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body" style="overflow:hidden;">
		<div class="border-ddd">
			<div class="form-border-box">
				<div class="welcome-right-title clb">
					<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>角色权限</span>
					<form id="searchForm">
						<div id="operBar" class="oper-box">
							<a id="addBtn" class="ui-button blue-skin" href="javascript:void(0);">新增角色</a>
							<input name="condition.key" value="${condition.key}" class="tc-input-text w200 search-box" type="text" placeholder="请输入角色名称" />
							<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);">查询</a>
							<a id="refreshGridBtn" class="ui-button green-skin" href="javascript:void(0);">刷新</a>
							<c:if test="${haveRigth == true}">
								<a id="setSysRoleBtn" class="ui-button white-skin" href="javascript:void(0);" onclick="setSysRole(1);">设置为系统角色</a>
								<a id="canselSysRoleBtn" class="ui-button white-skin" href="javascript:void(0);" onclick="setSysRole(2);">取消设置系统角色</a>
							</c:if>
							<div class="cb"></div>
						</div>
					</form>
				</div>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>	
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/auth/role_list.js?t=${sysVersion}"></script>
	</body>
</html>
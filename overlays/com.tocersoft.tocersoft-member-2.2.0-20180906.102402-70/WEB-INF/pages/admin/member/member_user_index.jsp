<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<title>会员基本信息管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="form-border-box clb">
			<form id="searchForm">
				<div class="welcome-right-title clb">
					<span class="ml10 fl wrt-font-title">会员基本信息列表</span>
					<div id="operBar" class="oper-box clb">
						<input id="roleId" value="${roleId}" type="hidden"/>
						<a id="addBtn" class="ui-button  blue-skin" href="javascript:void(0);">新增会员基本信息</a>
						<a id="batchDelBtn" class="ui-button  green-skin" href="javascript:void(0);">批量删除</a>
						<input id="searchKey" name="condition.searchkey" value="" class="tc-input-text search-box w200" type="text" placeholder="会员基本信息模糊查询"/>
						<div class="tc-select-div w150">
							<select name="condition.roleId" class="w150">
								<option value="">请选择会员角色</option>
								<c:forEach items="${memberRoleList}" var="memberRole">
									<option value="${memberRole.id }">${memberRole.name }</option>
								</c:forEach>
							</select>
						</div>
						<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
						<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
					</div>
				</div>
			</form>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_user_index.js?t=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_user_password_reset.js?t=${sysVersion}"></script>
	</body>
</html>
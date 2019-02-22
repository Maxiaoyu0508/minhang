<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存角色</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link rel="stylesheet"  href="${ctxPath}/static/base/lib/tc_checkbox/tc_checkbox.css?v=${sysVersion}" />
		<style>
		.border-ddd{
			border:solid 1px #ddd;
		}
		</style>
	</head>
	<body class="iframe-body">
		<div class="border-ddd">

		<%-- 基本信息 --%>
			<form id="roleForm" action="${ctxPath}/admin/auth/role/saveRole.htm" method="post">
				<div class="welcome-right-title clb">
					<span class="ml10 fl" >基本信息</span>
				</div>
			<!--李宁0128批量删除<core:token/>标签避免重复提交提醒-->
			<input id="itemId" name="item.id" value="${item.id}" type="hidden" />
			<input id="rightCheckedList" name="item.rightIds" type="hidden" />
			<table class="form-table">
				<%-- <caption>
					基本信息
				</caption> --%>
				<tr>
					<td class="form-title" width="12%">
						<em>*</em>角色名称：
					</td>
					<td class="form-content" width="40%">
						<input id="roleName" name="item.name" value="${item.name}" class="tc-input-text w" type="text" autocomplete="off" />
					</td>
					<td class="form-content" width="48%">
						<span id="roleNameTip"></span>
					</td>
				</tr>
				<c:if test="${haveRight == true }">
				<tr>
					<td class="form-title" width="12%">
						角色代码：
					</td>
					<td class="form-content" width="40%">
						<input id="roleCode" name="item.code" value="${item.code}" class="tc-input-text w" type="text" autocomplete="off" />
					</td>
					<td class="form-content" width="48%">
						<span id="roleCodeTip"></span>
					</td>
				</tr>
				</c:if>
				<tr>
					<td class="form-title">
						角色描述：
					</td>
					<td class="form-content">
						<textarea id="roleRemark" name="item.remark" class="tc-textarea w h80">${item.remark}</textarea>
					</td>
					<td class="form-content">
					</td>
				</tr>

			</table>
			<div class="welcome-right-title clb" style="border-top:solid 1px #ddd" >
				<span class="ml10 fl" >权限设置</span>
			</div>
			<!-- <div class="caption-div mt3">
				权限设置

			</div> -->
			<div class="caption-div-border" style="border:none;">
				<ul class="right-big-class w100 fl">
					<c:forEach items="${rights}" var="curRight">
						<li class="rbc-item mb5">
							<a class="rbc-item-a" data="${curRight.id}" href="javascript:void(0);">
								<span rightId="${curRight.id}" class="button chk checkbox_true_disable"></span>
								<span class="rbc-item-span">${curRight.name}</span>
							</a>
						</li>
					</c:forEach>
				</ul>
				<div class="right-content fl" id="rightContent">
				</div>
				<div class="cb"></div>
			</div>
			</form>
			<div class="oper mb5 clb">
				<a id="saveBtn" class="ui-button blue-skin fr mr5" href="javascript:void(0);">保存</a>
				<a id="backBtn" class="ui-button white-skin fr mr5" href="javascript:void(0);">返回</a>
			</div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/auth/role_edit.js?v=${sysVersion}"></script>
	</body>
</html>
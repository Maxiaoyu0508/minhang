<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!doctype html >
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>保存部门</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/auth/depart/doSaveDepart.htm" method="post">
		<div>
			<core:token />
			<input id="parentId" name="item.parentId" value="${item.parentId}" type="hidden" autocomplete="off" />
			<input id="itemId" name="item.id" value="${item.id}" type="hidden" autocomplete="off" />
			<input id="level" name="item.level" value="${item.level}" type="hidden" autocomplete="off" />
			<table class="form-table ">
				<tr>
					<td class="form-title w100">
						部门编号：
					</td>
					<td class="form-content" colspan="2">
						<input name="item.no" value="${item.no}"  type="text" maxlength="100" class="fl tc-input-text w" />
					</td>
				</tr>
				<tr>
					<td class="form-title w100">
						部门名称：
					</td>
					<td class="form-content" colspan="2">
						<input id="itemName" name="item.name" value="${item.name}"  type="text" maxlength="100" class="tc-input-text" style="margin-top:3px;" />
						<span id="itemNameTip"></span>
					</td>
				</tr>
				<tr>
					<td class="form-title w100">
						所在省市：
					</td>
					<td class="form-content" colspan="2">
						<div id="regionSelectDiv" class="select_div clb" ></div>
					</td>
				</tr>
				<tr>
					<td class="form-title w100">
						备注：
					</td>
					<td class="form-content" colspan="2">
						<textarea id="itemNote" name="item.note"  class="tc-textarea w h100">${item.note}</textarea>
					</td>
				</tr>
			</table>
			<div class="tr p10">
				<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
				<a class="ui-button" href="javascript:void(0);" onclick="$.dialog.close();return false;">关闭</a>
			</div>
		</div>
	</form>
	<div id="errorlist" class="mt5 mb5"></div>
	<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
	<script type="text/javascript" src="${ctxPath}/static/base/lib/region/region_select.js?v=${sysVersion}"></script>
	<script type="text/javascript" src="${ctxPath}/static/admin/auth/depart_add.js?v=${sysVersion}"></script>
	</body>
</html>

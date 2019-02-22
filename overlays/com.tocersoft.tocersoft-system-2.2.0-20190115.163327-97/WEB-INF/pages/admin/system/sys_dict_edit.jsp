<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>数据字典</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/system/dict/saveDict.htm" method="post">
		<core:token/>
		<input type="hidden" id="dictId" name="item.id" value="${item.id}"/>
		<table class="form-table">
			<tr>
				<td style="width:20%;height:0"></td>
				<td style="width:80%;height:0"></td>
			</tr>
			<tr>
				<td class="form-title">
					<em>*</em>数据名称：
				</td>
				<td class="form-content">
					<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w"/>
				</td>
			</tr>

			<tr>
				<td class="form-title">
					<em>*</em>代码：
				</td>
				<td class="form-content">
					<input id="code" name="item.code" value="${item.code}" type="text" class="tc-input-text w"/>
				</td>
			</tr>
			<tr>
				<td class="form-title">
					排序：
				</td>
				<td class="form-content">
					<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text w80"/>
					注意：数字越小，排序越靠前
				</td>
			</tr>
		</table>
		</form>
		<span class="fr mt10">
			<a class="ui-button" id="saveBtn" href="javascript:void(0);">保存</a>
			<a class="ui-button" href="javascript:$.dialog.close();">关闭</a>
		</span>
		<div class="prompt_box" id="errorlist"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_dict_edit.js?t=${sysVersion}"></script>
	</body>
</html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html class="gray-bg">
	<head>
		<title>数据字典</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/system/dictItem/saveDictItem.htm" method="post">
			<div class="border-box clb">
				<input type="hidden" id="globalDictId" name="item.dictId" value="${sysDict.id}"/>
				<table class="form-table">
					<tr>
						<td style="width:20%;height:0"></td>
						<td style="width:80%;height:0"></td>
					</tr>
					<tr>
						<td class="form-title w100">
							数据名称：
						</td>
						<td class="form-content">
							${sysDict.name}
						</td>
					</tr>
					<tr>
						<td class="form-title">
							数据项：
						</td>
						<td class="form-content">
							<input type="text" class="tc-input-text fl mr5 w" name="item.name" id="dictItemName" />
						</td>
					</tr>

					<tr>
						<td class="form-title">
							代码：
						</td>
						<td class="form-content">
							<input type="text" class="tc-input-text fl mr5 w" name="item.code" id="dictItemCode" />
						</td>
					</tr>
					<tr>
						<td class="form-title">
							排序：
						</td>
						<td class="form-content">
							<input type="text" class="tc-input-text fl mr5 w80" name="item.sort" id="dictItemSort" />
							注意：数字越小，排序越靠前
						</td>
					</tr>
				</table>
			</div>
            <div class="prompt_box mt5 mr5 mb5 ml5" id="errorlist"></div>
			<div class="fr mt10">
				<a class="ui-button blue-skin fr mr10" id="saveBtn" href="javascript:void(0);">保存</a>
				<a class="ui-button white-skin mr5 fr" href="javascript:$.dialog.close();">关闭</a>
			</div>
		</form>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_dict_item_edit.js?t=${sysVersion}"></script>
	</body>
</html>
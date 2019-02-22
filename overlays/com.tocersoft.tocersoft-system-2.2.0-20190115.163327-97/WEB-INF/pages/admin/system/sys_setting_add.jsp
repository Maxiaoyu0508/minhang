<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存系统配置表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>编辑系统配置表</span>
				<div class="clb oper-box">
					<a onclick="saveSysSetting();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<form id="saveForm" action="${ctxPath}/admin/sys/setting/saveSysSetting.htm" method="post">
				<core:token/>
				<input name="item.id" value="${item.id}" type="hidden" />
				<table class="form-table">
					<tr>
						<td style="width:15%;height:0"></td>
						<td style="width:35%;height:0"></td>
						<td style="width:15%;height:0"></td>
						<td style="width:35%;height:0"></td>
					</tr>
					
					<tr>
						<td class="form-title">配置项代码：</td>
						<td class="form-content">
							<input id="settingKey" name="item.settingKey" value="${item.settingKey}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">配置项名称：</td>
						<td class="form-content">
							<input id="settingName" name="item.settingName" value="${item.settingName}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">配置项值：</td>
						<td class="form-content">
							<input id="settingValue" name="item.settingValue" value="${item.settingValue}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title"></td>
						<td class="form-content"></td>
					</tr>
					
				</table>
			</form>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_setting_add.js?v=${sysVersion}"></script>
	</body>
</html>
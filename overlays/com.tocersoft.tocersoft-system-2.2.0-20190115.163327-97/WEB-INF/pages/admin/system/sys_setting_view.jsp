<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>系统配置表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>系统配置表</span>
				<div class="clb oper-box">
					<a href="${ctxPath}/admin/sys/setting/edit.htm?item.id=${item.id}" class="ui-button blue-skin">修改</a>
					<a onclick="" class="ui-button white-skin" href="javascript:void(0);">删除</a>
					<a onclick="" class="ui-button white-skin" href="javascript:void(0);">复制新增</a>
					<a href="${ctxPath}/admin/sys/setting/edit.htm" class="ui-button blue-skin">空白新增</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<table class="form-table">
				<tr>
					<td style="width:15%;height:0"></td>
					<td style="width:35%;height:0"></td>
					<td style="width:15%;height:0"></td>
					<td style="width:35%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">配置项代码：</td>
					<td class="form-content">${item.settingKey}</td>
					<td class="form-title">配置项名称：</td>
					<td class="form-content">${item.settingName}</td>
				</tr>
				
				<tr>
					<td class="form-title">配置项值：</td>
					<td class="form-content">${item.settingValue}</td>
					<td class="form-title"></td>
					<td class="form-content"></td>
				</tr>
				
			</table>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_setting_add.js?v=${sysVersion}"></script>
	</body>
</html>
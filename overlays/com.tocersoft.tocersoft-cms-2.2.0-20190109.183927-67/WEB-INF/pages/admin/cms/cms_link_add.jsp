<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存友情链接</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>编辑友情链接</span>
				<div class="clb oper-box">
					<a onclick="saveCmsLink();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<form id="saveForm" action="${ctxPath}/admin/cms/link/saveCmsLink.htm" method="post">
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
						<td class="form-title">友情链接名称：</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">友情链接地址：</td>
						<td class="form-content">
							<input id="linkUrl" name="item.linkUrl" value="${item.linkUrl}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">友情链接缩略图：</td>
						<td class="form-content">
							<input id="photoThumb" name="item.photoThumb" value="${item.photoThumb}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">友情链接备注：</td>
						<td class="form-content">
							<input id="remark" name="item.remark" value="${item.remark}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
				</table>
			</form>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_link_add.js?v=${sysVersion}"></script>
	</body>
</html>
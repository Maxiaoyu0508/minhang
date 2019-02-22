<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>编辑</span>
				<div class="clb oper-box">
					<a onclick="saveCmsAdv();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<form id="saveForm" action="${ctxPath}/admin/cms/adv/saveCmsAdv.htm" method="post">
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
						<td class="form-title">广告位名称：</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">广告位描述：</td>
						<td class="form-content">
							<input id="note" name="item.note" value="${item.note}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">图片宽度：</td>
						<td class="form-content">
							<input id="photoWidth" name="item.photoWidth" value="${item.photoWidth}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">图片高度：</td>
						<td class="form-content">
							<input id="photoHeight" name="item.photoHeight" value="${item.photoHeight}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">最多的图片数量：</td>
						<td class="form-content">
							<input id="maxPhotoNum" name="item.maxPhotoNum" value="${item.maxPhotoNum}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">排序：</td>
						<td class="form-content">
							<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
				</table>
			</form>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/adv_add.js?v=${sysVersion}"></script>
	</body>
</html>
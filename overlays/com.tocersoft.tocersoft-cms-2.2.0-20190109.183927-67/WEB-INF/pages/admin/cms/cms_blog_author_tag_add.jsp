<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存博主与标签关联表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/cms/blog/author/tag/saveCmsBlogAuthorTag.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:80%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						标签ID：
					</td>
					<td class="form-content">
						<input id="tagId" name="item.tagId" value="${item.tagId}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						博主ID：
					</td>
					<td class="form-content">
						<input id="blogAuthorId" name="item.blogAuthorId" value="${item.blogAuthorId}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
			</table>
		</form>
		<span class="fr mt10">
			<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
			<a id="exitBtn" class="ui-button" href="javascript:void(0);">关闭</a>
		</span>
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_blog_author_tag_add.js?t=${sysVersion}"></script>
	</body>
</html>
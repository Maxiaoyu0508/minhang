<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存文章评论与回复</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<span class="fl mb2">
			<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
			<a id="exitBtn" class="ui-button" href="javascript:void(0);">关闭</a>
		</span>
		<form id="saveForm" action="${ctxPath}/admin/cms/article/reply/saveCmsArticleReply.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:80%;height:0"></td>
				</tr>
				<tr>
					<td class="form-title">
						评论人：
					</td>
					<td class="form-content">
						<input id="memberId" name="item.memberName" value="${item.memberName}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						所属栏目：
					</td>
					<td class="form-content">
						<input disabled="disabled" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						文章名称：
					</td>
					<td class="form-content">
						<input id="articleId" name="item.rname" value="${item.rname}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						评论/回复内容：
					</td>
					<td class="form-content">
						<input id="content" name="item.content" value="${item.content}" type="text" class="tc-input-text w" style="height:200px;"/>
					</td>
				</tr>
			</table>
		</form>
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_article_reply_add.js?t=${sysVersion}"></script>
	</body>
</html>
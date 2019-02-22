<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存专栏内的相关文章</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/cms/column/article/saveCmsColumnArticle.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:80%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						专栏ID：
					</td>
					<td class="form-content">
						<input id="columnId" name="item.columnId" value="${item.columnId}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						专栏子版块：1-动态报道，2-安拓推荐，3-相关资讯，4-大家看法，5-相关案例：
					</td>
					<td class="form-content">
						<input id="columnSection" name="item.columnSection" value="${item.columnSection}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						文章ID：
					</td>
					<td class="form-content">
						<input id="articleId" name="item.articleId" value="${item.articleId}" type="text" class="tc-input-text w"/>
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
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_column_article_add.js?t=${sysVersion}"></script>
	</body>
</html>
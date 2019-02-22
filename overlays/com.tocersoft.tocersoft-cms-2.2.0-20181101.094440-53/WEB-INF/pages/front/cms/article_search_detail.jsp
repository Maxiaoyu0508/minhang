<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>

<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1">
		<base href="${ctxPath}" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<!-- 引入tag editor标签 -->
		<link rel="stylesheet" href="${ctxPath}/static/base/lib/tageditor/jquery.tag-editor.css" />
		<style>
			.time{
				border-bottom: solid 1px #eee;padding: 4px 0px;
			}
			.content{
				padding-top: 10px;
			}
			.name{
				font-size:22px;
			}
		</style>
	</head>
	<body class="iframe-body">
		<div class="welcome-right-title clb"  style="background-color:#fff;padding:10px;">
			<div class="name">${item.name}</div>
			<div class="time"><fmt:formatDate value="${item.publishDate}" pattern="yyyy-MM-dd"/></div>
			<div class="content"><core:unescapeHtml value="${item.content}" /></div>
		</div>
	</body>
</html>
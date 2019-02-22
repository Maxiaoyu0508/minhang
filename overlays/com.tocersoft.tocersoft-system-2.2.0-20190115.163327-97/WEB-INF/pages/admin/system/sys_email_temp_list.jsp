<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%-- <%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="dv" uri="/WEB-INF/tags/default_value.tld"%> --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>邮件模板列表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="border-ddd">
			<div class="form-border-box">
				<form id="searchForm" style="margin-bottom:0;">
					<div class="welcome-right-title clb">
						<span class="ml10 fl"><i class="tocer-icon10"></i>邮件模板列表</span>
					</div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_email_temp_list.js"></script>
	</body>
</html>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@	taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html style="background-color:#f1f1f1;">
	<head>
		<title>首页</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link rel="stylesheet" href="${ctxPath}/static/admin/workbench/welcome.css" />
		<style type="text/css">
			.bcf4{background-color:#f4f4f4;}
			.col_264668{color:#264668;}
			.col_264668:hover{color:#264668;text-decoration:none;}
			#hello_left{text-align:left;padding-left:10px;}
			#hello_th{font-weight:bold;text-align:left;padding-left:10px;}
		</style>
	</head>
	<body class="iframe-body">
		<div class="welcome">
			<p class="tit">${projectName}V${sysVersion}</p>
			<p class="desc">${projectCompany}</p>
			<p class="version"><a href="http://${projectWebsite}" target="_blank" style="color:#d20303;">${projectWebsite}</a></a></p>
			<p class="copyright">@copyright 2015 - 2018</p>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
	</body>
</html>
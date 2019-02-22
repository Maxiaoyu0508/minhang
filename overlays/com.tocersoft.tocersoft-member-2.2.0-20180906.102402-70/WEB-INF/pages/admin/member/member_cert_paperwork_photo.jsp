<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>实名认证-会员证件照</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="category-list fl">
			<img alt="会员证件照" src="${ctxPath}/admin/member/readLocalImgWriteToClient.htm?item.id=${memberUser.id}">
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
	</body>
</html>
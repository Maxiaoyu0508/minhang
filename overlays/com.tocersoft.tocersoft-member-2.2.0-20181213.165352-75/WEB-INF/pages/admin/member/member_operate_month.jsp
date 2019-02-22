<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>月对比</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="oper mb3">
			<form id="searchForm">
				<input name="condition.beginDate" class="tc-input-text fl mr5 w120"  type="text" placeholder="开始日期" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'});"  />
				<input name="condition.endDate" class="tc-input-text fl mr5 w120" type="text" placeholder="结束日期" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'});" />
				<a id="searchBtn" class="ui-button fl mr5" href="javascript:void(0);" >查询</a>
				<div class="cb"></div>
			</form>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_operate_month.js?v=${sysVersion}"></script>
	</body>
</html>
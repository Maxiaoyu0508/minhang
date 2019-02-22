<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>会员基本信息管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="category-list fl">
			<div class="oper mb3">
				<form id="searchForm">
					<input id="searchKey" name="condition.nickName" value="" class="tc-input-text fl mr5 w200" type="text" placeholder="会员基本信息模糊查询"/>
					<!-- 城市 -->
					<div class="select_div fl w200 mr5">
						<select id="certState" name="condition.certState"  class="tc-input-text fl w200" style="height：19px;height: initial;">
							<option value="-1">请选择</option>
							<option value="0">待审核</option>
							<option value="1">审核通过</option>
							<option value="2">审核不通过</option>
						</select>
					</div>
					<a id="searchBtn" class="ui-button fl mr5" href="javascript:void(0);" >查询</a>
					<a id="passBtn" class="ui-button fl mr5" href="javascript:void(0);" >审核通过</a>
					<a id="failBtn" class="ui-button fl mr5" href="javascript:void(0);" >审核不通过</a>
					<a id="refreshGridBtn" class="ui-button fl mr5" href="javascript:void(0);">刷新</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_cert_index.js?v=${sysVersion}"></script>
	</body>
</html>
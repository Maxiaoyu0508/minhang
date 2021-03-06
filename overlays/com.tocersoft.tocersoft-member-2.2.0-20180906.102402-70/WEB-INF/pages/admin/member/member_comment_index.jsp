<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>会员评论管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="form-border-box">
			<div class="welcome-right-title clb">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>会员评论管理</span>
				<form id="searchForm">
					<div class="oper-box clb">
						<a onClick="auditAdopt();" class="ui-button green-skin" href="javascript:void(0);">审核通过</a>
						<a onClick="auditNotPass();" class="ui-button blue-skin" href="javascript:void(0);">审核不通过</a>
						<a onClick="doBatchDelMemberComment();" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
						<input id="searchKey" name="condition.key" value="" class="tc-input-text w200 search-box" type="text" placeholder="会员姓名/评论内容/评论对象名称模糊查询"/>
						<a onClick="searchMemberComment();" class="ui-button green-skin" href="javascript:void(0);" >查询</a>
						<a onClick="refreshGrid();" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
						<div class="cb"></div>
					</div>
				</form>
			</div>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>

		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_comment_index.js?t=${sysVersion}"></script>
	</body>
</html>
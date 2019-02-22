<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>文章管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="oper mb3">
		<a id="" onclick="delMessage();" class="ui-button btn_add_user fl mr5" href="javascript:void(0);">批量删除</a>
		<form id="searchForm">
		
		<div class="tc-select-div w100 fl mr5">
			<select id="isPublish" name="condition.status" class="w">
				<option value="">-- 全部 --</option>
				<option value="1">已处理</option>
				<option value="0">未处理</option>
			</select>
		</div>
		<div class="tc-select-div w120 fl mr5">
			<select id="messageType" name="condition.messageType" class="w120">
					<option value="">请选择信息类型</option>
				<c:forEach items="${sdiList}" var="sdi">
					<option value="${sdi.id}">${sdi.name}</option>
				</c:forEach>
			</select>
		</div>
		<input  name="condition.content" value="" placeholder="请输入相关内容进行查询" type="text" class="tc-input-text fl w200 mr5"/>
		</form>
		<a class="ui-button fl mr5" href="javascript:;" onclick="searchMessageList();return false;">查询</a>
		<a id="" onclick="reloadGrid();" class="ui-button btn_add_user fl" href="javascript:void(0);">刷新</a>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<div class="mb100"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/message_list.js"></script>
	</body>
</html>
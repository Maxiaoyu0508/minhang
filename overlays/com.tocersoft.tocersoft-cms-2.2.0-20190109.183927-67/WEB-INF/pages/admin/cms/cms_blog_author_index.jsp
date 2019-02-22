<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<title>博客博主管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<input id="type" value="${type }" type="hidden"/>
		<div class="category-list fl">
			<div class="oper mb3">
				<form id="searchForm">
					<!-- 类型判断 -->
					<c:if test="${type==1 }">
						<a id="addBtn" class="ui-button fl mr5" href="javascript:void(0);">新增博客博主</a>
					</c:if>
					<c:if test="${type==2 }">
						<a id="addBtn" class="ui-button fl mr5" href="javascript:void(0);">新增自媒体</a>
					</c:if>
					<a id="batchDelBtn" class="ui-button fl mr5" href="javascript:void(0);">批量删除</a>
					<!-- 类型判断 -->
					<c:if test="${type==1 }">
						<input id="searchKey" name="condition.name" value="" class="tc-input-text fl mr5 w200" type="text" placeholder="请输入博主名称模糊查询"/>
					</c:if>
					<c:if test="${type==2 }">
						<input id="searchKey" name="condition.name" value="" class="tc-input-text fl mr5 w200" type="text" placeholder="请输入自媒体名称模糊查询"/>
					</c:if>
					
					<a id="searchBtn" class="ui-button fl mr5" href="javascript:void(0);" >查询</a>
					<a id="refreshGridBtn" class="ui-button fl mr5" href="javascript:void(0);">刷新</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_blog_author_index.js?t=${sysVersion}"></script>
	</body>
</html>
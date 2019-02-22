<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>标签管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="border-ddd">
			<div class="welcome-right-title clb">
				<span class="ml10 fl wrt-font-title" ><i class="tocer-icon10"></i>标签管理</span>
				<div class="oper-box">
					<form id="searchForm">
						<a id="addBtn" class="ui-button white-skin" href="javascript:void(0);">新增标签</a>
						<a id="batchDelBtn" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
						<input id="searchKey" name="condition.name" value="" class="tc-input-text w200 search-box" type="text" placeholder="标签模糊查询"/>
                        <c:if test="${not empty tagTypeList}">
							<select id="selectTagType" name="condition.type" class="select search-box">
								<option value="">--请选择--</option>
								<c:forEach items="${tagTypeList}" var="tagType" varStatus="status">
									<option value="${tagType.id}">${tagType.name}</option>
								</c:forEach>
							</select>
						</c:if>
						<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
						<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
						<a id="hotTag" class="ui-button white-skin" href="javascript:void(0);">设置热门标签</a>
						<a id="unHotTag" class="ui-button white-skin" href="javascript:void(0);">取消热门标签</a>
						<div class="cb"></div>
					</form>
				</div>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
			<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		</div>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_tag_index.js?v=${sysVersion}"></script>
	</body>
</html>
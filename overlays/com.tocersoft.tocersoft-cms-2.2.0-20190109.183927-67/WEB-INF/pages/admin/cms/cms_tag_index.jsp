<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>文章标签管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="form-border-box">
			<div class="welcome-right-title clb">
				<div class="oper-box">
					<form id="searchForm">
						<a id="addBtn" class="ui-button blue-skin" href="javascript:void(0);">新增文章标签</a>
						<a id="batchDelBtn" class="ui-button white-skin" href="javascript:void(0);">批量删除</a>
						<input id="searchKey" name="condition.name" value="" class="tc-input-text search-box w200" type="text" placeholder="文章标签模糊查询"/>
						<span style="float: left;margin: 3px 5px 0px 2px;">
						    标签类型:
						   <select name="condition.type">
								<option value="">全部</option>
								<option value="1">普通标签 </option>
								<option value="2">资讯首页楼层标签</option>
						   </select>
						</span>
						<a id="searchBtn" class="ui-button white-skin" href="javascript:void(0);" >查询</a>
						<a id="refreshGridBtn" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
						<div class="cb"></div>
					</form>
				</div>
			</div>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_tag_index.js?t=${sysVersion}"></script>
	</body>
</html>
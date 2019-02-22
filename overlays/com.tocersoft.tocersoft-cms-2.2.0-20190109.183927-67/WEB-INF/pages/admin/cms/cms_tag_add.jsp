<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存文章标签</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<div class="clb">
			<span class="fl mb2">
				<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
				<a id="exitBtn" class="ui-button" href="javascript:void(0);">关闭</a>
			</span>
		</div>
		<form id="saveForm" action="${ctxPath}/admin/cms/tag/saveCmsTag.htm" method="post">
			<core:token/>
			<input id="tagId" name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:80%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						标签名称：
					</td>
					<td class="form-content">
						<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						标签类型：
					</td>
					<td class="form-content">
						<input id="type" name="item.type" value="${item.type}" type="text" class="tc-input-text w100"/>
						<span class="ml10">注意：1.普通标签  2.资讯首页楼层标签</span>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						排序：
					</td>
					<td class="form-content">
						<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text w100"/>
						<span class="ml10">注意：数字越小越靠前</span>
					</td>
				</tr>
			</table>
		</form>
		<div class="oper mb3">
			<form id="searchForm">
				<a id="chooseBtn" class="ui-button fl mr5" href="javascript:void(0);">选择文章</a>
				<a id="batchDelBtn" class="ui-button fl mr5" href="javascript:void(0);">批量删除</a>
				<input id="searchKey" name="condition.name" value="" class="tc-input-text fl mr5 w200" type="text" placeholder="文章糊查询"/>
				<a id="searchBtn" class="ui-button fl mr5" href="javascript:void(0);" >查询</a>
				<a id="refreshGridBtn" class="ui-button fl mr5" href="javascript:void(0);">刷新</a>
				<div class="cb"></div>
			</form>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_tag_add.js?t=${sysVersion}"></script>
	</body>
</html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>区域管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<span class="mt10">
			<a class="ui-button blue-skin" id="saveBtn" href="javascript:void(0);">保存</a>
			<a class="ui-button green-skin" id="exitBtn" href="javascript:void(0);">关闭</a>
		</span>
		<form id="saveForm">
			<input id="regionAreaId" name="item.id" value="${item.id }" type="hidden">
			<table class="form-table mt10">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:80%;height:0"></td>
				</tr>
				<tr>
					<td class="form-title">
						<em>*</em>大区名称：
					</td>
					<td class="form-content">
						<input id="name" name="item.name" value="${item.name }" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						排序：
					</td>
					<td class="form-content">
						<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text w80"/>
						注意：数字越小，排序越靠前
					</td>
				</tr>
				<tr>
					<td class="form-title">
						选择省份：
					</td>
					<td class="form-content">
						<c:forEach var="region" items="${regionList }">
						<label class="fl w130 mr5">
							<c:if test="${item.id == region.areaId }">
								<input class=" mt4 mr5" name="regionIds" value="${region.id }" type="checkbox" checked="checked"/>
							</c:if>
							<c:if test="${item.id != region.areaId }">
								<input class=" mt4 mr5" name="regionIds" value="${region.id }" type="checkbox"/>
							</c:if>
							<span class="ml5">${region.name }</span>
						</label>
						</c:forEach>
					</td>
				</tr>
			</table>
		</form>
		<div class="prompt_box" id="errorlist"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_region_area_add.js?t=${sysVersion}"></script>
	</body>
</html>
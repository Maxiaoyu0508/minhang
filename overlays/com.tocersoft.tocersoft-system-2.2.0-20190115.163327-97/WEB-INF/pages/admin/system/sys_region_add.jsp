<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html class="gray-bg">
	<head>
		<base href="${ctxPath}"/>
		<title>区域管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<div class="border-box clb">
			<form id="saveForm" action="${ctxPath}/admin/system/region/saveSysRegion.htm" method="post">
				<core:token />
				<input id="level" name="item.level" value="${item.level}" type="hidden" />
				<input type="hidden" id="parentId" name="item.parentId" value="${item.parentId}" />
				<input id="regionId" name="item.id" value="${item.id}" type="hidden" />
				<input id="areaId" name="item.areaId" value="${item.areaId}" type="hidden" />
				<table class="form-table">
					<tr>
						<td style="width:20%;height:0"></td>
						<td style="width:80%;height:0"></td>
					</tr>
					<tr>
						<td class="form-title">
							<em>*</em>区域名称：
						</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name }" type="text" class="tc-input-text w"/>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							<em>*</em>区域代码：
						</td>
						<td class="form-content">
							<input id="code" name="item.code" value="${item.code}" type="text" class="tc-input-text w"/>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							<em>*</em>当前级别：
						</td>
						<td class="form-content">
							<input id="level"  value="${level}" type="text" readonly="readonly" class="tc-input-text w"/>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							<em>*</em>设置热门：
						</td>
						<td class="form-content">
							
							<input type="radio" name="item.isHot" <c:if test="${ item.isHot == 0 or empty item.isHot}"> checked="checked"</c:if> value="0"> 否 
							<input type="radio" name="item.isHot" <c:if test="${ item.isHot == 1 }"> checked="checked"</c:if>  class="ml10" value="1"> 是
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
				</table>
			</form>
		</div>
		<div class="fr mt10">
			<a class="ui-button blue-skin fr mr10" id="saveBtn" href="javascript:void(0);">保存</a>
			<a class="ui-button white-skin mr5 fr" id="exitBtn" href="javascript:void(0);" onclick="$.dialog.close();return false;">关闭</a>
		</div>
		<div class="prompt_box" id="errorlist"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_region_add.js?t=${sysVersion}"></script>
	</body>
</html>
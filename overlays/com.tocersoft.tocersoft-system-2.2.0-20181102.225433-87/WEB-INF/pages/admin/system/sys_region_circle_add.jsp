<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>商圈管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<form id="saveForm">
			<input id="regionCircleId" name="item.id" value="${item.id }" type="hidden">
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:80%;height:0"></td>
				</tr>
				<tr>
					<td class="form-title">
						<em>*</em>商圈名称：
					</td>
					<td class="form-content">
						<input id="name" name="item.name" value="${item.name }" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						<em>*</em>选择城市：
					</td>
					<td class="form-content">
						<div class="tc-select-div fl mr5">
							<select class="w120" style="width:120px;" id="province">
								<option value="0">-- 请选择省份 --</option>
								<c:forEach var="region"  items="${regionList }">
									<option value="${region.id }">${region.name }</option>
								</c:forEach>
							</select>
						</div>
						<input id="regionName" name="item.regionName" value="${item.regionName }" type="hidden" >
						<div class="tc-select-div fl mr10">
							<select class="w120" style="width:120px;" name="item.regionId" id="selectCity">
								<option>-- 请选择城市 --</option>
							</select>
						</div>
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
			<span class="fr mt10">
				<a class="ui-button" id="saveBtn" href="javascript:void(0);">保存</a>
				<a class="ui-button" id="exitBtn" href="javascript:void(0);">关闭</a>
			</span>
		<div class="prompt_box" id="errorlist"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_region_circle_add.js?t=${sysVersion}"></script>
	</body>
</html>
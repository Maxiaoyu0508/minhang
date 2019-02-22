<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存标签</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/sys/tag/saveSysTag.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:18%;height:0"></td>
					<td style="width:62%;height:0"></td>
					<td style="width:20%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						标签名称：
					</td>
					<td class="form-content">
						<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<%-- 暂时注释 
				<tr>
					<td class="form-title">
						标签类型：
					</td>
					<td class="form-content">
						<input id="type" name="item.type" value="${item.type}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr> --%>
				
				<tr>
					<td class="form-title" style="vertical-align: top">
						标签描述：
					</td>
					<td class="form-content">
						<textarea id="desc" name="item.desc" class="tc-textarea w" style="height:100px">${item.desc}</textarea>
					</td>
					<td class="form-content"></td>
				</tr>
				<tr>
					<td class="form-title">
						标签类型：
					</td>
					<td class="form-content">

						<select id="type" name="item.type"  style="width:50%" >
							<c:forEach items="${dictItem}" var="tag">
								<option value="${tag.id }" <c:if test="${tag.id==item.type}">selected</c:if>>${tag.name }</option>
							</c:forEach>
						</select>
						<%--<input id="type" name="item.type" value="${item.type}" type="hidden" class="tc-input-text w" autocomplete="off" />
						<input value="${dictItem.name}" type="text" class="tc-input-text w" autocomplete="off" />--%>
					</td>
					<td class="form-content"></td>
				</tr>
				<tr>
					<td class="form-title">
						排序：
					</td>
					<td class="form-content">
						<input id="sort"  name="item.sort" value="${item.sort}" type="text" class="tc-input-text w50" autocomplete="off" />
						<span class="ml10 color777">排序数字越小越靠前</span>
					</td>
					<td class="form-content"></td>
				</tr>
				
			</table>
		</form>
		<span class="fr mt10">
			<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
			<a id="exitBtn" class="ui-button" href="javascript:void(0);">关闭</a>
		</span>
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_tag_add.js?v=${sysVersion}"></script>
	</body>
</html>
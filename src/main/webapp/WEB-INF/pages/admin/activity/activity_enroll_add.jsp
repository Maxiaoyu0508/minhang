<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存活动报名</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/activity/enroll/saveActivityEnroll.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:40%;height:0"></td>
					<td style="width:40%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						活动信息：
					</td>
					<td class="form-content">
						<div class="select_div fl w200">
							<select id="activityId" class="w" name="item.activityId">
									<option value="">-- 请选择 --</option>
								<c:forEach items="${activityList}" var="curActivity">
									<option value="${curActivity.id}" <c:if test="${curActivity.id == item.activityId}">selected</c:if>>${curActivity.name}</option>
								</c:forEach>
							</select>
						</div>
						
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						联系人：
					</td>
					<td class="form-content">
						<input id="linkMan" name="item.linkMan" value="${item.linkMan}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
					性别：
					</td>
					<td class="form-content">
						<%--<input id="sex" name="item.sex" value="${item.sex}" type="text" class="tc-input-text w" autocomplete="off" />--%>
						<select id="sex" name="item.sex" >
							<option value="0" <c:if test="${item.sex == '0'}">selected</c:if>>女</option>
							<option value="1"<c:if test="${item.sex== '1'}">selected</c:if>>男</option>
						</select>
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						手机号码：
					</td>
					<td class="form-content">
						<input id="mobile" name="item.mobile" value="${item.mobile}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						固定电话：
					</td>
					<td class="form-content">
						<input id="telephone" name="item.telephone" value="${item.telephone}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						电子邮箱：
					</td>
					<td class="form-content">
						<input id="email" name="item.email" value="${item.email}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						报名时间：
					</td>
					<td class="form-content">
						<input  id="enrollTime" class="Wdate tc-input-text w" name="item.enrollTime" type="text" onClick="WdatePicker()" dlsab="true" value="" >
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						状态：
					</td>
					<td class="form-content">
						<%--<input id="state" name="item.state" value="${item.state}" type="text" class="tc-input-text w" autocomplete="off" />--%>
						<select id="state" name="item.state" >
							<option value="0" <c:if test="${item.sex == '0'}">selected</c:if>>未审核</option>
							<option value="1"<c:if test="${item.sex== '1'}">selected</c:if>>审核通过</option>
							<option value="2"<c:if test="${item.sex== '1'}">selected</c:if>>审核未通过</option>
						</select>
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
		<script type="text/javascript" src="${ctxPath}/static/admin/activity/activity_enroll_add.js?v=${sysVersion}"></script>
	</body>
</html>
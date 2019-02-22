<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存会员收藏</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/member/collection/saveMemberCollection.htm" method="post">
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
						会员基本信息：
					</td>
					<td class="form-content">
						<div class="select_div fl w200">
							<select id="memberUserId" class="w" name="item.memberUserId">
									<option value="">-- 请选择 --</option>
								<c:forEach items="${memberUserList}" var="curMemberUser">
									<option value="${curMemberUser.id}" <c:if test="${curMemberUser.id == item.memberUserId}">selected</c:if>>${curMemberUser.name}</option>
								</c:forEach>
							</select>
						</div>
						
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收藏对象ID：
					</td>
					<td class="form-content">
						<input id="objectId" name="item.objectId" value="${item.objectId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收藏对象类型：用户自定义：
					</td>
					<td class="form-content">
						<input id="objectType" name="item.objectType" value="${item.objectType}" type="text" class="tc-input-text w" autocomplete="off" />
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
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_collection_add.js?t=${sysVersion}"></script>
	</body>
</html>
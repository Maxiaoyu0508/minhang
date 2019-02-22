<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存会员角色</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link rel="stylesheet"  href="${ctxPath}/static/base/lib/tc_checkbox/tc_checkbox.css?v=${sysVersion}" />
	</head>
	<body class="iframe-body">
		<div class="border-ddd">
			<form id="saveForm" action="${ctxPath}/admin/member/role/saveMemberRole.htm" method="post">
				<%--<core:token/>--%>
				<input id="itemId" name="item.id" value="${item.id}" type="hidden" />
				<input id="rightCheckedList" name="item.rightIds" type="hidden" />
				<table class="form-table">
					<tr>
						<td style="width:20%;height:0"></td>
						<td style="width:40%;height:0"></td>
						<td style="width:40%;height:0"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							<em>*</em>会员角色名称：
						</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-content"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							<em>*</em>会员角色代码：
						</td>
						<td class="form-content">
							<input id="code" name="item.code" value="${item.code}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-content"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							角色类型 ：
						</td>
						<td class="form-content">
							<label class="mr20 vm">
								<input name="item.type" value="2" type="radio" <c:if test="${item.type == 2 || empty item.type}">checked="checked"</c:if> /><span class="ml5">用户角色</span>
							</label>
							<label class="vm">
								<input name="item.type" value="1" type="radio" <c:if test="${item.type == 1}">checked="checked"</c:if> /><span class="ml5">系统角色</span>
							</label>
						</td>
						<td class="form-content"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							说明：
						</td>
						<td class="form-content">
							<input id="remark" name="item.remark" value="${item.remark}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-content"></td>
					</tr>
					
				</table>
				<div class="welcome-right-title clb" style="border-top:solid 1px #ddd" >
					<span class="ml10 fl" style="line-height:33px;">权限设置</span>
				</div>
				<div class="caption-div-border" style="border:none;">
					<ul class="right-big-class w100 fl" style="width:150px;">
						<c:forEach items="${rights}" var="curRight">
							<li class="rbc-item mb5">
								<a class="rbc-item-a" data="${curRight.id}" href="javascript:void(0);">
									<span rightId="${curRight.id}" class="button chk checkbox_true_disable"></span>
									<span class="rbc-item-span">${curRight.name}</span>
								</a>
							</li>
						</c:forEach>
					</ul>
					<div class="right-content fl" id="rightContent" style="width:300px;">
					</div>
					<div class="cb"></div>
				</div>
			</form>
		</div>
		<span class="fr mt10">
				<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
				<a id="exitBtn" class="ui-button" href="javascript:void(0);">关闭</a>
			</span>
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_role_add.js?v=${sysVersion}"></script>
	</body>
</html>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%-- <%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="dv" uri="/WEB-INF/tags/default_value.tld"%> --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>新增角色 / 修改角色</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link rel="stylesheet" type="text/css" href="static/base/lib/tc_checkbox/tc_checkbox.css"/>
	</head>
	<body class="iframe-body">
		<%-- 基本信息 --%>
		<form id="roleForm" action="admin/user/accountsaveCurrentUser.htm">
		<input id="itemId" name="item.id" value="${item.id }" type="hidden" />
		<table class="form-table">
			<caption>
				基本信息
			</caption>
			<tr>
				<td class="form-title" width="12%">
					<em>*</em>角色名称：
				</td>
				<td class="form-content" width="40%">
					<input id="name" name="item.name" value="${item.name }" class="tc-input-text w" type="text"/>
				</td>
				<td class="form-content" width="48%">
					<span id="nameTip"></span>
				</td>
			</tr>
			<tr>
				<td class="form-title">
					角色描述：
				</td>
				<td class="form-content">
					<textarea id="remark" name="item.remark" class="tc-textarea w h50">${item.remark }</textarea>
				</td>
				<td class="form-content">
				</td>
			</tr>
		</table>
		<div class="caption-div mt3">
			权限设置
			<input id="rightCheckedList" name="permissionIds" type="hidden" />
		</div>
		<div class="caption-div-border">
			<ul class="right-big-class w100 fl">
				<!-- <s:iterator value="rights" var="right" status="sta">
				 </s:iterator > -->
				  <c:forEach var="right" items="${rights}"  varStatus="sta">
				  
					<li class="rbc-item mb5">
						<a class="rbc-item-a" data="${right.id }" href="javascript:void(0);">
							<c:when test="#right.id == 4">
								<span rightId="${right.id }" class="button chk checkbox_true_disable"></span>
								<!-- 
								<span  class="button chk checkbox_true_part"></span>
								<span  class="button chk checkbox_true_full"></span>
								<span  class="button chk checkbox_true_disable"></span>
								<span  class="button chk checkbox_false_part"></span>
								<span  class="button chk checkbox_false_full"></span>
								<span  class="button chk checkbox_false_disable"></span>
								 -->
							</c:when>
							<c:otherwise>
								<span  class="button chk checkbox_false_full"></span>
							</c:otherwise>
							<span class="rbc-item-span">${right.name}</span>
						</a>
					</li>
				</c:forEach>
			</ul>
			<div class="right-content fl" id="rightContent">
			</div>
			<div class="cb"></div>
		</div>
		<div class="oper mt10">
			<a class="ui-button white-skin" href="javascript:void(0);" id="saveNewRoleBtn" onclick="saveNewRole();return false;">保存</a>
			<a class="ui-button white-skin" href="javascript:void(0);" onclick="top.closeTab('tabli_addrole',event);return false;">取消</a>
		</div>
		</form>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/lib/lhgcalendar/lhgcalendar.min.js"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/auth/role_add_update.js"></script>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/tc_checkbox/tc_checkbox.js"></script>
	</body>
</html>
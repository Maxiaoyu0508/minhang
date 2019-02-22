<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存会员基本信息</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="pwdResetForm" action="${ctxPath}/admin/member/resetPwd.htm" method="POST">
		<input name="item.id" value="${item.id }" type="hidden" />
		<table class="form-table">
			<caption>
				重置密码
			</caption>
			<tr>
				<td class="form-title" width="20%">
					会员帐号：
				</td>
				<td class="form-content" width="40%">
					${item.account}
				</td>
				<td class="form-content" width="40%">
				</td>
			</tr>
			<tr>
				<td class="form-title">
					会员手机：
				</td>
				<td class="form-content">
					${item.mobile}
				</td>
				<td class="form-content">
				</td>
			</tr>
			<tr>
				<td class="form-title">
					会员邮箱：
				</td>
				<td class="form-content">
					${item.email}
				</td>
				<td class="form-content">
				</td>
			</tr>
			<tr>
				<td class="form-title">
					<em>*</em>重置密码：
				</td>
				<td class="form-content">
					<input id="resetPwd" name="item.password" class="tc-input-text w" type="password"/>
				</td>
				<td class="form-content">
				</td>
			</tr>
		</table>
		</form>
		<a id="doUpdatePwd" onclick="doResetPwd();" class="ui-button mt5" href="javascript:void(0);">重置密码</a>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_user_password_reset.js?t=${sysVersion}"></script>
	</body>
</html>
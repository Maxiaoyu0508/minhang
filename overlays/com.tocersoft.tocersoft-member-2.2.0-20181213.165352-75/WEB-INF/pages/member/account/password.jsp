<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>重置密码</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>重置密码</span>
				<div class="clb oper-box">
					<a onclick="saveStudent();" class="ui-button blue-skin" href="javascript:void(0);">确认重置</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<form id="saveForm" action="${ctxPath}/member/account/do_update_pwd.htm" method="post">
				<core:token/>
				<input name="item.id" value="${item.id}" type="hidden" />
				<table class="form-table">
					<tr>
						<td style="width:15%;height:0"></td>
						<td style="width:35%;height:0"></td>
						<td style="width:15%;height:0"></td>
						<td style="width:35%;height:0"></td>
					</tr>
					<tr>
						<td class="form-title">登录帐号：</td>
						<td class="form-content">
							<input value="${item.name}" readonly type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					<tr>
						<td class="form-title">原密码：</td>
						<td class="form-content">
							<input id="birthday" name="item.birthday" value="" type="password" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					<tr>
						<td class="form-title">新密码：</td>
						<td class="form-content">
							<input id="code" name="item.code" value="" type="password" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					<tr>
						<td class="form-title">确认密码：</td>
						<td class="form-content">
							<input id="sex" name="item.sex" value="" type="password" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
				</table>
			</form>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/student/student_add.js?v=${sysVersion}"></script>
	</body>
</html>
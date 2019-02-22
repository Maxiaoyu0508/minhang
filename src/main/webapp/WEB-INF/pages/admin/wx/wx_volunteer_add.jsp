<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存志愿者招募</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>编辑志愿者招募</span>
				<div class="clb oper-box">
					<a onclick="saveWxVolunteer();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<form id="saveForm" action="${ctxPath}/admin/wx/volunteer/saveWxVolunteer.htm" method="post">
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
						<td class="form-title">类型（数据字典）：</td>
						<td class="form-content">
							<input id="type" name="item.type" value="${item.type}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">姓名：</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">身份证：</td>
						<td class="form-content">
							<input id="idCard" name="item.idCard" value="${item.idCard}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">性别：1-男，2-女；：</td>
						<td class="form-content">
							<input id="sex" name="item.sex" value="${item.sex}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">年龄：</td>
						<td class="form-content">
							<input id="age" name="item.age" value="${item.age}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">学校：</td>
						<td class="form-content">
							<input id="school" name="item.school" value="${item.school}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">联系方式：</td>
						<td class="form-content">
							<input id="mobile" name="item.mobile" value="${item.mobile}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">地址：</td>
						<td class="form-content">
							<input id="address" name="item.address" value="${item.address}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">邮箱：</td>
						<td class="form-content">
							<input id="email" name="item.email" value="${item.email}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">语种：</td>
						<td class="form-content">
							<input id="language" name="item.language" value="${item.language}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">服务时间：</td>
						<td class="form-content">
							<input id="servicrTime" name="item.servicrTime" value="${item.servicrTime}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title">职务：</td>
						<td class="form-content">
							<input id="job" name="item.job" value="${item.job}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					
					<tr>
						<td class="form-title">学历：</td>
						<td class="form-content">
							<input id="education" name="item.education" value="${item.education}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-title"></td>
						<td class="form-content"></td>
					</tr>
					
				</table>
			</form>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/wx/wx_volunteer_add.js?v=${sysVersion}"></script>
	</body>
</html>
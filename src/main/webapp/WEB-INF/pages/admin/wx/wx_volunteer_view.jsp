<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>志愿者招募</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>志愿者招募</span>
				<div class="clb oper-box">
					<a href="${ctxPath}/admin/wx/volunteer/edit.htm?item.id=${item.id}" class="ui-button blue-skin">修改</a>
					<a onclick="" class="ui-button white-skin" href="javascript:void(0);">删除</a>
					<a onclick="" class="ui-button white-skin" href="javascript:void(0);">复制新增</a>
					<a href="${ctxPath}/admin/wx/volunteer/edit.htm" class="ui-button blue-skin">空白新增</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<table class="form-table">
				<tr>
					<td style="width:15%;height:0"></td>
					<td style="width:35%;height:0"></td>
					<td style="width:15%;height:0"></td>
					<td style="width:35%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">类型（数据字典）：</td>
					<td class="form-content">${item.type}</td>
					<td class="form-title">姓名：</td>
					<td class="form-content">${item.name}</td>
				</tr>
				
				<tr>
					<td class="form-title">身份证：</td>
					<td class="form-content">${item.idCard}</td>
					<td class="form-title">性别：1-男，2-女；：</td>
					<td class="form-content">${item.sex}</td>
				</tr>
				
				<tr>
					<td class="form-title">年龄：</td>
					<td class="form-content">${item.age}</td>
					<td class="form-title">学校：</td>
					<td class="form-content">${item.school}</td>
				</tr>
				
				<tr>
					<td class="form-title">联系方式：</td>
					<td class="form-content">${item.mobile}</td>
					<td class="form-title">地址：</td>
					<td class="form-content">${item.address}</td>
				</tr>
				
				<tr>
					<td class="form-title">邮箱：</td>
					<td class="form-content">${item.email}</td>
					<td class="form-title">语种：</td>
					<td class="form-content">${item.language}</td>
				</tr>
				
				<tr>
					<td class="form-title">服务时间：</td>
					<td class="form-content">${item.servicrTime}</td>
					<td class="form-title">职务：</td>
					<td class="form-content">${item.job}</td>
				</tr>
				
				<tr>
					<td class="form-title">学历：</td>
					<td class="form-content">${item.education}</td>
					<td class="form-title"></td>
					<td class="form-content"></td>
				</tr>
				
			</table>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/wx/wx_volunteer_add.js?v=${sysVersion}"></script>
	</body>
</html>
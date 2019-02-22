<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存意见反馈表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="border-ddd">
		<form id="saveForm" action="${ctxPath}/admin/sys/feedback/saveSysFeedback.htm" method="post">
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
						主题：
					</td>
					<td class="form-content">
						<input id="theme" name="item.theme" value="${item.theme}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						会员姓名：
					</td>
					<td class="form-content">
						<input id="memberUserName" name="item.memberUserName" value="${item.memberUserName}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						省市区：
					</td>
					<td class="form-content">
						<input id="provinceCity" name="item.provinceCity" value="${item.provinceCity}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						省：
					</td>
					<td class="form-content">
						<input id="province" name="item.province" value="${item.province}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						省ID：
					</td>
					<td class="form-content">
						<input id="provinceId" name="item.provinceId" value="${item.provinceId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						市：
					</td>
					<td class="form-content">
						<input id="city" name="item.city" value="${item.city}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						市ID：
					</td>
					<td class="form-content">
						<input id="cityId" name="item.cityId" value="${item.cityId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						区：
					</td>
					<td class="form-content">
						<input id="district" name="item.district" value="${item.district}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						区ID：
					</td>
					<td class="form-content">
						<input id="districtId" name="item.districtId" value="${item.districtId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						组织机构：
					</td>
					<td class="form-content">
						<input id="organization" name="item.organization" value="${item.organization}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						行业类别ID：
					</td>
					<td class="form-content">
						<input id="industryId" name="item.industryId" value="${item.industryId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						电子邮件：
					</td>
					<td class="form-content">
						<input id="email" name="item.email" value="${item.email}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						联系方式：
					</td>
					<td class="form-content">
						<input id="contact" name="item.contact" value="${item.contact}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						建议内容：
					</td>
					<td class="form-content">
						<input id="content" name="item.content" value="${item.content}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
			</table>
		</form>
		<div class="clb mt5 mb5">
			<a id="saveBtn" class="ui-button blue-skin mr10 fr" href="javascript:void(0);">保存</a>
			<a id="exitBtn" class="ui-button white-skin mr5 fr" href="javascript:void(0);">关闭</a>
		</div>
		<div id="errorlist" class="prompt_box"></div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_feedback_add.js?v=${sysVersion}"></script>
	</body>
</html>
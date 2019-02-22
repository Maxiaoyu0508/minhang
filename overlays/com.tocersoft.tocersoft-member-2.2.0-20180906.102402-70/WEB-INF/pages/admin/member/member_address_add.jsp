<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存会员收货地址表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/member/address/saveMemberAddress.htm" method="post">
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
						会员ID：
					</td>
					<td class="form-content">
						<input id="memberId" name="item.memberId" value="${item.memberId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收货地址：
					</td>
					<td class="form-content">
						<input id="address" name="item.address" value="${item.address}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						省份：
					</td>
					<td class="form-content">
						<input id="province" name="item.province" value="${item.province}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						省市ID：
					</td>
					<td class="form-content">
						<input id="provinceId" name="item.provinceId" value="${item.provinceId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						城市：
					</td>
					<td class="form-content">
						<input id="city" name="item.city" value="${item.city}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						市区ID：
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
						省市区：
					</td>
					<td class="form-content">
						<input id="provinceCity" name="item.provinceCity" value="${item.provinceCity}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收货联系人：
					</td>
					<td class="form-content">
						<input id="linkman" name="item.linkman" value="${item.linkman}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						默认地址 0-否  1-是：
					</td>
					<td class="form-content">
						<input id="addressStatus" name="item.addressStatus" value="${item.addressStatus}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收货人手机[非用户手机]：
					</td>
					<td class="form-content">
						<input id="mobile" name="item.mobile" value="${item.mobile}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						邮政编号：
					</td>
					<td class="form-content">
						<input id="postCode" name="item.postCode" value="${item.postCode}" type="text" class="tc-input-text w" autocomplete="off" />
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
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_address_add.js?v=${sysVersion}"></script>
	</body>
</html>
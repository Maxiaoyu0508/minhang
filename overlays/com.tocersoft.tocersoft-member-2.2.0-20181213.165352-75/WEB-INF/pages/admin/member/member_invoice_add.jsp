<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存会员发票管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/member/invoice/saveMemberInvoice.htm" method="post">
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
						发票类型0.普通发票 1.增值税发票：
					</td>
					<td class="form-content">
						<input id="type" name="item.type" value="${item.type}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						发票抬头（公司名/个人名）：
					</td>
					<td class="form-content">
						<input id="invoiceTitle" name="item.invoiceTitle" value="${item.invoiceTitle}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						发票明细：
					</td>
					<td class="form-content">
						<input id="invoiceDetails" name="item.invoiceDetails" value="${item.invoiceDetails}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						单位名称：
					</td>
					<td class="form-content">
						<input id="companyName" name="item.companyName" value="${item.companyName}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						纳税人识别码：
					</td>
					<td class="form-content">
						<input id="taxpayerId" name="item.taxpayerId" value="${item.taxpayerId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						注册地址：
					</td>
					<td class="form-content">
						<input id="registeredAddress" name="item.registeredAddress" value="${item.registeredAddress}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						注册电话：
					</td>
					<td class="form-content">
						<input id="registeredPhone" name="item.registeredPhone" value="${item.registeredPhone}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						开户银行：
					</td>
					<td class="form-content">
						<input id="bankName" name="item.bankName" value="${item.bankName}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						银行账号：
					</td>
					<td class="form-content">
						<input id="bankAccount" name="item.bankAccount" value="${item.bankAccount}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人姓名：
					</td>
					<td class="form-content">
						<input id="billtoName" name="item.billtoName" value="${item.billtoName}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人手机：
					</td>
					<td class="form-content">
						<input id="billtoPhone" name="item.billtoPhone" value="${item.billtoPhone}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人省市区：
					</td>
					<td class="form-content">
						<input id="billtoPcd" name="item.billtoPcd" value="${item.billtoPcd}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人省：
					</td>
					<td class="form-content">
						<input id="billtoProvince" name="item.billtoProvince" value="${item.billtoProvince}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人省ID：
					</td>
					<td class="form-content">
						<input id="billtoProvinceId" name="item.billtoProvinceId" value="${item.billtoProvinceId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人市：
					</td>
					<td class="form-content">
						<input id="billtoCity" name="item.billtoCity" value="${item.billtoCity}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人市ID：
					</td>
					<td class="form-content">
						<input id="billtoCityId" name="item.billtoCityId" value="${item.billtoCityId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人区：
					</td>
					<td class="form-content">
						<input id="billtoDistrict" name="item.billtoDistrict" value="${item.billtoDistrict}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						收票人区ID：
					</td>
					<td class="form-content">
						<input id="billtoDistrictId" name="item.billtoDistrictId" value="${item.billtoDistrictId}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						详细地址：
					</td>
					<td class="form-content">
						<input id="billtoAddress" name="item.billtoAddress" value="${item.billtoAddress}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						默认状态：0:非默认发票，1：默认发票：
					</td>
					<td class="form-content">
						<input id="invoiceStatus" name="item.invoiceStatus" value="${item.invoiceStatus}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						是否开票状态：0:未开 1，已开：
					</td>
					<td class="form-content">
						<input id="isTicket" name="item.isTicket" value="${item.isTicket}" type="text" class="tc-input-text w" autocomplete="off" />
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
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_invoice_add.js?v=${sysVersion}"></script>
	</body>
</html>
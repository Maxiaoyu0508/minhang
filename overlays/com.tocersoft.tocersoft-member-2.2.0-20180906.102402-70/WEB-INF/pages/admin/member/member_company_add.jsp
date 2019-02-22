<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<title>保存会员所属企业信息</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/member/company/saveMemberCompany.htm" method="post">
			<input id="id" name="item.id" type="hidden" value="${item.id }" />
			<input id="parentId" name="item.parentId" type="hidden" value="${item.parentId }" />
			<input id="level" name="item.level" type="hidden" value="${item.level }" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:40%;height:0"></td>
					<td style="width:40%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						<em>*</em>企业名称：
					</td>
					<td class="form-content">
						<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						企业电话：
					</td>
					<td class="form-content">
						<input id="telephone" name="item.telephone" value="${item.telephone}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						企业地址：
					</td>
					<td class="form-content">
						<input id="address" name="item.address" value="${item.address}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						企业网址：
					</td>
					<td class="form-content">
						<input id="website" name="item.website" value="${item.website}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>
				<tr>
					<td class="form-title">
						是否叶节点：
					</td>
					<td class="form-content">
						<label class="mr20 vm">
							<input id="isLeaf" name="item.isLeaf" value="0" type="radio" autocomplete="off" /><span class="ml5">否</span>
						</label>
						<label class="vm">
							<input id="isLeaf" name="item.isLeaf" value="1" checked="checked" type="radio" autocomplete="off" /><span class="ml5">是</span>
						</label>
					</td>
					<td class="form-content"></td>
				</tr>
				<tr>
					<td class="form-title">
				  		排序参数：
				  	</td>
					<td class="form-content">
						<input id="sort" name="item.sort" value="${item.sort}" class="tc-input-text w80" type="text"/>
						<span class="status-gray-666 ml5">注意：排序参数越小越靠前</span>
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
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_company_add.js?t=${sysVersion}"></script>
	</body>
</html>
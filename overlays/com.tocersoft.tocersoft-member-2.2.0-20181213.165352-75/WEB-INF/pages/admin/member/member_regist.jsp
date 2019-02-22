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
	
	<span class="fl">
			<div class="p5">
				<a id="saveBtn" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
				<a id="exitBtn" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
			</div>
			<c:if test="${item.id != null}">
			<a id="toUpdatePwd" class="ui-button" href="javascript:void(0);" >重置密码</a>
			<div id="updatePwd" class="mt5 none">
				<form id="advSellerUpdatePwdForm" action="admin/member/resetPwd.htm">
				<input id="itemId" name="item.id" value="${item.id }" type="hidden" />
				<table class="form-table">
					<caption>
						重置密码
					</caption>
					<tr>
						<td class="form-title" width="12%">
							<em>*</em>重置密码：
						</td>
						<td class="form-content" width="30%">
							<input id="resetPwd" name="item.password" class="tc-input-text w" type="password" autocomplete="off"/>
						</td>
						<td class="form-content" width="58%"><span id="resetPwdTip"></span>
						</td>
					</tr>
				</table>
				</form>
				<a class="ui-button mt5" href="javascript:void(0);" id="doUpdatePwd" onclick="resetPwd();">提交修改</a>
			</div>
			</c:if>
		</span>

		<form id="saveForm" action="${ctxPath}/admin/member/do_regist.htm" method="post" autocomplete="off">
			<core:token/>
			<input id="clientId" name="clientId" type="hidden" />
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:30%;height:0"></td>
					<td style="width:40%;height:0"></td>
					<td style="height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						会员帐号：
					</td>
					<td class="form-content">
						<input id="account" name="item.account" value="${item.account}" type="text" class="tc-input-text w" autocomplete="off"/>
					</td>
					<td class="form-content">
						<span id="accountTip" style="display: none;"></span>
					</td>
				</tr>
				
				<c:if test="${item.id == null}">
				<tr>
					<td class="form-title">
						初始密码：
					</td>
					<td class="form-content">
						<input id="password" name="item.password" value="${item.password}" type="password" class="tc-input-text w" autocomplete="off"/>
					</td>
					<td class="form-content"></td>
				</tr>
				</c:if>

				<tr>
					<td class="form-title">
						帐号状态：
					</td>
					<td class="form-content">
						<label class="mr20 vm">
							<input name="item.state" value="0" <c:if test="${item.state == 0 || empty item.state }">checked="checked"</c:if> type="radio" autocomplete="off" /><span class="ml5">启用</span>
						</label>
						<label class="vm">
							<input name="item.state" value="1" <c:if test="${item.state == 1 }">checked="checked"</c:if> type="radio" autocomplete="off" /><span class="ml5">禁用</span>
						</label>
					</td>
					<td class="form-content"></td>
				</tr>

				<tr>
					<td class="form-title">
						会员角色：
					</td>
				<td class="form-content">
						<span id="notRow" class='fl <c:if test="${not empty item.roleList}">none</c:if>'>暂无角色</span>
							<div id="rows" class="status-gray mr10 fl">
								<c:forEach var="curRole" items="${item.roleList}">
								<div class="choose-main-li fl mr15">${curRole.name}<a href="javascript:void(0);" onclick="delRow(this,'${curRole.id}');return false;" class="ml5">X</a></div>
								</c:forEach>
								<div class="cb"></div>
							</div>
							<a id="chooseRoleBtn" href="javascript:void(0);" class="fl ml10">选择角色</a>
						<div class="cb"></div>
						<input id="roleIds" name="item.roleIds" value="${item.roleIds}" type="hidden" autocomplete="off"/>
					</td>
					<td class="form-content"></td>
				</tr>
			</table>
		</form>
		
		<div id="errorlist" class="prompt_box"></div>
		
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_regist.js?t=${sysVersion}"></script>
	</body>
</html>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存员工</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<style>
		.border-ddd{
			border:solid 1px #DDD;
		}
		.status-gray{
			z-index:1;
		}
		.status-gray:after{
			border-width: 11px;
    		top: 1px;
		}
		#chooseRoleBtn{
			position:relative;
			z-index:2;
		}
		</style>
		<script type="text/javascript">
		function inputPassword(){
			　　if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1){
			　　　　var selectors = document.getElementsByTagName("input");
			　　　　for(var i=0;i<selectors.length;i++){
			　　　　if((selectors[i].type != "submit") && (selectors[i].type != "password")){
			　　　　　　selectors[i].disabled= true;
			　　　　}
			　　}
			　　setTimeout(function inputPassword(){
			　　　　for(var i=0;i<selectors.length;i++){
			　　　　　　if(selectors[i].type != "submit"){
			　　　　　　　　selectors[i].disabled= false;
			　　　　　　}
			　　　　}
			　　},100)
			　　}
			}
		</script>
	</head>
	<body class="iframe-body">
		<%-- 基本信息 --%>
		<form id="userForm" action="${ctxPath}/admin/auth/user/saveUser.htm" method="post">
			<div id="errorlist" class="mt5 mb5"></div>
			<div class="form-border-box">
				<div class="welcome-right-title clb">
					<span class="ml10 fl wrt-font-title"><i class="tocer-icon10">用户信息</i></span>
					<div class="clb oper-box">
						<a id="saveBtn" class="ui-button blue-skin" href="javascript:void(0);">保存用户</a>
						<a id="backBtn" class="ui-button white-skin" href="javascript:void(0);">返回</a>
						<a id="toUpdatePwd" class="ui-button white-skin" href="javascript:void(0);">重置密码</a>
					</div>
				</div>
				<div id="updatePwd" class="mt5 none">
					<form id="advSellerUpdatePwdForm">
						<input id="itemId"  name="item.id" value="${item.id }" type="hidden" />
						<table class="form-table">
							<caption>
								重置密码
							</caption>
							<tr>
								<td class="form-title" width="12%">
									<em>*</em>重置密码：
								</td>
								<td class="form-content" width="30%">
									<input id="resetPwd" class="tc-input-text w" type="password"/>
								</td>
								<td class="form-content" width="58%"><span id="resetPwdTip"></span>
								</td>
							</tr>
						</table>
					</form>
					<a class="ui-button mt5 mb5 ml5" href="javascript:void(0);" id="doUpdatePwd">提交修改</a>
				</div>
<%-- 				<input id="itemId" name="item.id" value="${item.id}" type="hidden" autocomplete="off"/> --%>
				<input id="departIds" name="item.departIds" value="${item.departIds}" type="hidden" autocomplete="off"/>
				<input id="roleIds" name="item.roleIds" value="${item.roleIds}" type="hidden" autocomplete="off"/>
				<table class="form-table mt3">
					<%-- <caption>
						用户信息
					</caption> --%>
					<tr>
						<td class="form-title" width="12%">
							<em>*</em>账号：
						</td>
						<td class="form-content" width="30%">
							<c:if test="${empty item.id}">
							<input id="account" name="item.account" value="" class="tc-input-text w" type="text" autocomplete="off"/>
							</c:if>
							<c:if test="${not empty item.id}">
								${item.account}
							</c:if>
						</td>
						<td class="form-content" width="58%">
							<span id="accountTip"></span>
						</td>
					</tr>
					<c:if test="${item.id == null}">
					<tr>
						<td class="form-title">
							<em>*</em>初始密码：
						</td>
						<td class="form-content">
							<input id="password" name="item.password" class="tc-input-text w" type="password" autocomplete="off" />
						</td>
						<td class="form-content">
							<span id="passwordTip"></span>
						</td>
					</tr>
					</c:if>
					<c:if test="${item.id != null}">
					<tr>
						<td class="form-title">
							初始密码：
						</td>
						<td class="form-content">
							<c:if test="${item.isChangePwd == 0 || item.isChangePwd==null}">
								<span class="status-red">初始密码未修改</span>
							</c:if>
							<c:if test="${item.isChangePwd == 1}">
								<span class="status-green">初始密码已修改</span>
							</c:if>
						</td>
						<td class="form-content">
							<span id="passwordTip"></span>
						</td>
					</tr>
					</c:if>
					<tr>
						<td class="form-title">
							<em>*</em>姓名：
						</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name}" class="tc-input-text w" type="text" autocomplete="off"/>
						</td>
						<td class="form-content">
							<span id="nameTip"></span>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							工号：
						</td>
						<td class="form-content">
							<input id="staffId" name="item.staffId" value="${item.staffId}" class="tc-input-text w" type="text" autocomplete="off"/>
						</td>
						<td class="form-content">
							<span id="staffIdTip"></span>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							性别：
						</td>
						<td class="form-content">
							<label class="fl mr10">
								<input name="item.sex" value="1" class="mt2 fl mr5" <c:if test="${null == item.sex || item.sex == 1}">checked="checked"</c:if> type="radio"/>
								<span class="ml5">男</span>
							</label>
							<label class="fl mr10">
								<input name="item.sex" value="0" class="mt2 fl mr5" <c:if test="${item.sex == 0}">checked="checked"</c:if> type="radio"/>
								<span class="ml5">女</span>
							</label>
						</td>
						<td class="form-content">
							<span id="sexTip"></span>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							生日：
						</td>
						<td class="form-content">
							<input id="birthday" name="item.birthday" value="<fmt:formatDate value='${item.birthday}' pattern='yyyy-MM-dd'/>" class="tc-input-text w150" type="text" onfocus="WdatePicker({skin:'default',maxDate: '%y-%M-%d' })" autocomplete="off"/>
						</td>
						<td class="form-content">
							<span id="birthdayTip"></span>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							电子邮箱：
						</td>
						<td class="form-content">
							<input id="email" name="item.email" value="${item.email}" type="text" class="tc-input-text w" autocomplete="off"/>
						</td>
						<td class="form-content">
							<span id="emailTip"></span>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							手机号码：
						</td>
						<td class="form-content">
							<input id="mobile" name="item.mobile" value="${item.mobile}" type="text" class="tc-input-text w" autocomplete="off"/>
						</td>
						<td class="form-content">
							<span id="mobileTip"></span>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							固定电话：
						</td>
						<td class="form-content">
							<input id="tel" name="item.tel" value="${item.tel}" class="tc-input-text w" type="text" autocomplete="off"/>
						</td>
						<td class="form-content">
							<span id="telTip"></span>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							担任角色：
						</td>
						<td id="forAddRows" class="form-content" colspan="2">
							<div id="rows" class="status-gray mr10 fl">
								<c:forEach var="curRole" items="${item.roleList}">
								<div class="choose-main-li fl mr15">${curRole.name}<a href="javascript:void(0);" onclick="delRow(this,'${curRole.id}');return false;" class="ml5" style="color:#fff">X</a></div>
								</c:forEach>
								<div class="cb"></div>
							</div>
							<a id="chooseRoleBtn" href="javascript:void(0);" class="ui-button blue-skin fl">选择角色</a>
							<div class="cb"></div>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							所属部门：
						</td>
						<td class="form-content ">
							<div id="categoryTreeDiv" class="category-tree" style="width:100%;margin:0;background:none;position:static;">
								<div id="treeDiv" class="depart-tree h200">
									<div class="min-height"></div>
									<ul id="categoryTree" class="ztree"></ul>
									<div id="loadTip" class="load-tip">
										<p>正在加载部门</p>
									</div>
								</div>
							</div>
						</td>
						<td class="form-content">
							<span id="telTip"></span>
						</td>
					</tr>
				</table>
			</div>
		</form>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript">
  			var departIds = '${item.departIds}';
  		</script>
		<script type="text/javascript" src="${ctxPath}/static/admin/auth/user_add.js?v=${sysVersion}"></script>
	</body>
</html>
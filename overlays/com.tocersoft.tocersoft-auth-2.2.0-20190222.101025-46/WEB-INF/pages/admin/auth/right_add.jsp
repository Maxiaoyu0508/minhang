<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html >
<html>
	<head>
		<title>新增\修改权限</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp"></jsp:include>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"></jsp:include>
	</head>
	<body class="iframe-body">
	<form id="saveForm"  action="${ctxPath }/admin/auth/right/saveRight.htm" method="post">
		<div>
				<input id="parentId" name="item.parentId" type="hidden" value="${item.parentId }" />
				<input id="id" name="item.id" type="hidden" value="${item.id }" />
				<input id="location" name="item.location" type="hidden" value="${item.location }" />
				
			<table class="form-table">
				<tr>
					<td class="form-title w100">
						菜单名称：
					</td>
					<td class="form-content" colspan="2">
						<input id="name" name ="item.name" value="${item.name}"  type="text" maxlength="100" class="tc-input-text w"/>
						<span id="nameDiv" style="display: none; color: red">权限名称不能为空</span>
					</td>
				</tr>
				<tr>
				<td class="form-title w100">
						功能链接：
					</td>
					<td class="form-content" colspan="2">
						<input id="url" name ="item.url" value="${item.url}"  type="text" maxlength="100" class="tc-input-text w"/>
					</td>
				</tr>
				<tr>
					<td class="form-title w100">
						提示文字：
					</td>
					<td class="form-content" colspan="2">
						<textarea id="tip" name="item.tip"  class="tc-textarea w h100">${item.tip}</textarea>
					</td>
				</tr>
				<tr>
					<td class="form-title" >
						图标：
					</td>
					<td class="form-content" colspan="2">
						<div class="clb" style="height:160px;">
							<div class="container pb20" >
								<section class="row" id="icons-new">
								  <div class="clb">
									  <div class="list-box">
									    <ul class="the-icons">
									      <li><i class="tocer-icon01"></i></li>
									      <li><i class="tocer-icon02"></i></li>
									      <li><i class="tocer-icon03"></i></li>
									      <li><i class="tocer-icon04"></i></li>
									      <li><i class="tocer-icon05"></i></li>
									      <li><i class="tocer-icon06"></i></li>
									      <li><i class="tocer-icon07"></i></li>
									      <li><i class="tocer-icon08"></i></li>
									      <li><i class="tocer-icon09"></i></li>
									      <li><i class="tocer-icon10"></i></li>
									      <li><i class="tocer-icon11"></i></li>
									      <li><i class="tocer-icon12"></i></li>
									      <li><i class="tocer-icon13"></i></li>
									      <li><i class="tocer-icon14"></i></li>
									      <li><i class="tocer-icon15"></i></li>
									      <li><i class="tocer-icon16"></i></li>
									      <li><i class="tocer-icon17"></i></li>
									      <li><i class="tocer-icon18"></i></li>
									      <li><i class="tocer-icon19"></i></li>
									      <li><i class="tocer-icon20"></i></li>
									      <li><i class="tocer-icon21"></i></li>
									      <li><i class="tocer-icon22"></i></li>
									      <li><i class="tocer-icon23"></i></li>
									      <li><i class="tocer-icon24"></i></li>
									      <li><i class="tocer-icon25"></i></li>
									      <li><i class="tocer-icon26"></i></li>
									      <li><i class="tocer-icon27"></i></li>
									      <li><i class="tocer-icon28"></i></li>
									      <li><i class="tocer-icon29"></i></li>
									      <li><i class="tocer-icon30"></i></li>
									      <li><i class="tocer-icon31"></i></li>
									      <li><i class="tocer-icon32"></i></li>
									      <li><i class="tocer-icon33"></i></li>
									    </ul>
									  </div>
								   </div> 
								</section>
							</div>
						</div>
						<input id="iconPath" name="item.iconPath" value="${item.iconPath }" type="hidden">
					</td>
				</tr>
				<tr>
					<td class="form-title w100" id="sortTd">
						排序：
					</td>
					<td class="form-content" colspan="2">
						<input id="sort" name="item.sort" value="${item.sort}" type="text" maxlength="5" class="tc-input-text w100"/>
						<label class="ml5">
							友情提示：排序数字越小越靠前
						</label>
						<span id="sortDiv" style="display: none; color: red">排序不能为空</span>
					</td>
				</tr>
			</table>
			<div class="tr p10">
				<a id="saveBtn"  class="ui-button" href="javascript:void(0);" >保存</a>
				<a id="exitBtn" class="ui-button" href="javascript:void(0);">退出</a>
			</div>
		</div>
	</form>
	<div id="errorlist" class="mt5 mb5"></div>
	<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"></jsp:include>
	<script src="${ctxPath}/static/admin/auth/right_add.js?v=${sysVersion}"></script>
	</body>
</html>

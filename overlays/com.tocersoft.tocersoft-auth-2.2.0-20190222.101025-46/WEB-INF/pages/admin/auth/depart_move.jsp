<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!doctype html >
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>移动部门</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="saveForm"  method="post">
		<div>
			<core:token />
			<input id="selIds"  value="${selIds}" type="hidden" autocomplete="off" />
			<input id="departId" value="0"  type="hidden" autocomplete="off" />
			<input id="moveType" value="${moveType }"  type="hidden" autocomplete="off" />
			<input id="oldDepartId" value="${oldDepartId }"  type="hidden" autocomplete="off" />
			<table class="form-table ">
				<tr>
					<td class="form-title w100" rowspan="3">
						选择目标部门：
					</td>
					<td class="form-content" colspan="2" >
						<div id="treeDiv" class="depart-tree">
							<div class="min-height"></div>
							<ul id="categoryTree" class="ztree"></ul>
							<div id="loadTip" class="load-tip">
								<p>正在加载部门</p>
							</div>
						</div>
					</td>
				</tr>
			</table>
			<div class="tr p10">
				<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
				<a class="ui-button" href="javascript:void(0);" onclick="$.dialog.close();return false;">关闭</a>
			</div>
		</div>
	</form>
	<div id="errorlist" class="mt5 mb5"></div>
	<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
	<script type="text/javascript" src="${ctxPath}/static/admin/auth/depart_move.js?v=${sysVersion}"></script>
	</body>
</html>

<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存活动场次表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box mb5"></div>
		<div class="form-border-box clb">
			<div class="welcome-right-title">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>编辑活动场次表</span>
				<div class="clb oper-box">
					<a onclick="saveActivitySession();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
					<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
				</div>
			</div>
			<form id="saveForm" action="${ctxPath}/admin/activity/session/saveActivitySession.htm" method="post">
				<core:token/>
				<input name="item.id" value="${item.id}" type="hidden" />
				<input id="activityId"  name="item.activityId" value="${item.activityId}" type="hidden" class="tc-input-text w" autocomplete="off" />
				<table class="form-table">
					<tr>
						<td style="width:15%;height:0"></td>
						<td style="width:35%;height:0"></td>
						<td style="width:15%;height:0"></td>
						<td style="width:35%;height:0"></td>
					</tr>

					<tr>
						<td class="form-title">活动日期：</td>
						<td class="form-content">
							<input id="activityDate" name="item.activityDate" value="<fmt:formatDate value='${item.activityDate}' pattern='yyyy-MM-dd'/>" type="text" class="tc-input-text w" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'});" autocomplete="off" />
						</td>
						<td class="form-title">活动场次：</td>
						<td class="form-content">
							<input id="session" name="item.session" value="${item.session}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
					</tr>
					<tr>
						<td class="form-title">限定人数：</td>
						<td class="form-content">
							<input id="limitederson" name="item.limitederson" value="${item.limitederson}" autocomplete="off" />
						</td>
						<td class="form-title">：</td>
						<td class="form-content">

						</td>
					</tr>
				</table>
			</form>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/activity/activity_session_add.js?v=${sysVersion}"></script>
	</body>
</html>
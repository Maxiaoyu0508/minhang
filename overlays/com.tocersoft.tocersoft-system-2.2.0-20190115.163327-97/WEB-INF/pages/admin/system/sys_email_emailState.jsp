<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>邮件发送状态列表</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form id="searchForm" name="searchForm" action="searchForm">
	 		<div id="operBar" class="oper mb3">
				<table class="form-table mb3">
					<tr>
						<td style="width:10%;height:0"></td>
						<td style="width:50%;height:0"></td>
						<td style="width:40%;height:0"></td>
					</tr>
					<tr>
						<td class="form-title">
							 	邮件发送状态：
						</td>
						<td class="form-content">
							<div class="tc-select-div w100 fl">
							<select id="flag" class="w100" name="condition.flag">
									<option value="">全部</option>
									<option value="0">未发送</option>
									<option value="1">已发送</option>
									<option value="2">发送失败</option>
								</select>
							</div>
							    <input id="key" name ="condition.key" class="tc-input-text w200 search-box"  type="text" placeholder="请输入邮件标题/收件人邮箱查询"/>
								<a id="searchEmailBtn" class="ui-button white-skin"  href="javascript:;">查询</a>
								<a id="refreshBtn" class="ui-button white-skin" href="javascript:;">刷新</a>
						</td>
						<td class="form-content"></td>
					</tr>
				</table>
			</div>
		</form>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<div class="prompt_box" id="errorlist"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath }/static/admin/system/sys_email_emailState.js?t=${sysVersion}"></script>
	</body>
</html>


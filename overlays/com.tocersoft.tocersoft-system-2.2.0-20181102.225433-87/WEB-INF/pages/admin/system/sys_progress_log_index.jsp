<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>操作进度日志管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="form-border-box">
			<div class="welcome-right-title clb">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>操作进度日志</span>
				<form id="searchForm">
					<div class="oper-box clb">
						<!-- <a onClick="addSysProgressLog();" class="ui-button blue-skin" href="javascript:void(0);">新增操作进度日志</a>
						<a onClick="doBatchDelSysProgressLog();" class="ui-button green-skin" href="javascript:void(0);">批量删除</a> -->
						<input id="searchKey" name="condition.content" value="" class="tc-input-text w200 search-box" type="text" placeholder="操作进度日志内容模糊查询"/>
						时间:
						<input id="dateBegin" placeholder="开始时间" type="text" name="condition.dateBegin" class="tc-input-text w100 search-box" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" />
						<span class=" w20 mr5 vm">&nbsp;至&nbsp;</span>
						<input id="dateEnd" placeholder="结束时间" type="text" name="condition.dateEnd" class="tc-input-text w100 search-box" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" />
						<a onClick="searchSysProgressLog();" class="ui-button green-skin" href="javascript:void(0);" >查询</a>
						<a onClick="refreshGrid();" class="ui-button white-skin" href="javascript:void(0);">刷新</a>
						<div class="cb"></div>
					</div>
				</form>
			</div>
		</div>
		<table id="table"></table>
		<div id="pagerBar"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_progress_log_index.js?v=${sysVersion}"></script>
	</body>
</html>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${BASE_PATH}" />
		<title>系统日志查询</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<div class="form-border-box">
		<div class="welcome-right-title clb">
			<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>系统配置表</span>
			<form id="searchForm">
				<div class="oper-box clb">
					<input id="searchKey" name="condition.desc" value="" class="tc-input-text w200 search-box" type="text" placeholder="操作描述模糊查询"/>
					<a id="searchBtn" class="ui-button green-skin" href="javascript:void(0);" >查询</a>
					<a id="" onclick="$('#searchMoreDiv').toggle('fast')" class="ui-button white-skin" href="javascript:;">更多查询</a>
					<a id="refreshGridBtn" class="ui-button blue-skin" href="javascript:void(0);">刷新</a>
				</div>
				<div id="searchMoreDiv" class="none">
					<table class="form-table ">
						<tr>
							<td class="form-title" width="11%">时间:</td>
							<td class="form-content" width="30%">
								<input id="dateBegin" name="condition.dateBegin" placeholder="开始时间"   type="text" class="tc-input-text w90 mr5 vm" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'});" />
								<input id="dateEnd" name="condition.dateEnd" placeholder="结束时间"  type="text" class="tc-input-text w90 mr5 vm" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'});"/>
							</td>
							<td class="form-title" width="11%">来源:</td>
							<td class="form-content" width="11%">
								<select id = "source" name = "condition.source">
									<option value="">--全部--</option>
									<option value="0">后台</option>
									<option value="1">网站</option>
								</select>
							</td>
							<td class="form-title" width="11%">
								操作：
							</td>
							<td class="form-content" width="22%">
								<select id = "type" name = "condition.type">
									<option value="">全部</option>
									<c:if test="${not empty calcData }">
										<c:forEach items="${calcData }" var="calc">
											<option value="${calc }">${calc }</option>
										</c:forEach>
									</c:if>
								</select>
							</td>
						</tr>
					</table>
				</div>
				<div class="cb"></div>
			</form>
		</div>
	</div>
	<table id="table"></table>
	<div id="pagerBar"></div>
	<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
	<script src="${ctxPath}/static/base/lib/calendar/WdatePicker.js?t=${sysVersion}" type="text/javascript" ></script>
	<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_log_index.js?t=${sysVersion}"></script>
	</body>
</html>
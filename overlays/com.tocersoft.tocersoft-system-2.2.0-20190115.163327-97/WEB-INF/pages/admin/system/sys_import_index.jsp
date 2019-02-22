<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>导入</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<style>
			
		</style>
	</head>
	<body class="iframe-body">
		<div class="border-ddd" style="height:100%">
			<div class="form-border-box">
				<div class="welcome-right-title clb">
					<div class="oper-box ml3">
						<input id="importAddUrl" name="importAddUrl" value="${importAddUrl}" type="hidden" />
						<input id="importDelUrl" name="importDelUrl" value="${importDelUrl}" type="hidden" />
						<input onchange="doImport();" id="fileInput" name="uploadFile" class="none" type="file">
						<a id="" class="ui-button green-skin" onclick="$('#fileInput').click()" href="javascript:void(0);">执行导入</a>
                        <c:if test="${not empty importDelUrl}">
						<a class="ui-button white-skin" onclick="$('#delInput').click()" href="javascript:void(0);">执行删除</a>
                        </c:if>
						<input id="delInput" onchange="delImport();" name="uploadFile" class="none" type="file">
						<c:if test="${not empty importDownloadUrl}">
							<a href="${ctxPath}${importDownloadUrl}"class="ui-button blue-skin">下载模板</a>
						</c:if>
						<c:if test="${empty importDownloadUrl}">
							<a href="${ctxPath}/admin/sys/import/download_template.htm?importTemplateName=${importTemplateName}" class="ui-button blue-skin" >下载模板</a>
						</c:if>
                        <a href="javascript:void(0);" class="ui-button blue-skin" onclick="exportLog();return false;">日志导出</a>
					</div>
				</div>
			</div>
			<div style="height:calc(100% - 45px);padding: 5px;position: relative;">
				<textarea id="progressLogView" rows="10" cols="10" style="width: 100%;height: 100%;resize: none;line-height: 2;border: 1px dashed #ddd;margin: auto;display: block;" readonly="readonly"></textarea>
				<div class="import-loding" style="display:none">正在导入...</div>
			</div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js?v=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/logger/progress_logger.js?v=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_import_index.js?v=${sysVersion}"></script>
	</body>
</html>
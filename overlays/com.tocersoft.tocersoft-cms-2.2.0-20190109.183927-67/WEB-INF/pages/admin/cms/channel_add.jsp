<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!doctype html >
<html>
	<head>
		<base href="${ctxPath }">
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>新增\修改栏目</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/tc_file_upload.js"></script>
	</head>
	<body class="p10">
		<div>
			<input id="parentId" value="${parentId }" type="hidden" />
			<input id="nodeId" value="${nodeid }" type="hidden" />
			<div class="mb5">
				<c:if test="${empty nodeid}">
					<a class="ui-button blue-skin w80" href="javascript:;" onclick="addCmsChannel();">保存</a>
				</c:if>
				<c:if test="${not empty nodeid}">
					<a class="ui-button blue-skin w80" href="javascript:;" onclick="updateCmsChannel();">保存</a>
				</c:if>
				<a class="ui-button white-skin" href="javascript:;" onclick="exitWin();">退出</a>
			</div>
			<table class="form-table ">
				<tr>
					<td class="form-title w100">
						栏目名称：
					</td>
					<td class="form-content" colspan="2">
						<input id="name" value="${item.name }" type="text" maxlength="100" class="tc-input-text w150"/>
						<span id="nameDiv" style="display: none; color: red">名称不能为空</span>
					</td>
				</tr>
				<tr>
					<td class="form-title w100">
						页面模板：
					</td>
					<td class="form-content" colspan="2">
						<select id="cmsTemplateId" class="w150">
							<option value="">-- 请选择 --</option>
							<c:forEach items="${cmsTemplateList}" var="curcmsTemplate">
								<option value="${curcmsTemplate.id}" <c:if test="${curcmsTemplate.id == item.cmsTemplateId}">selected</c:if>>${curcmsTemplate.name}</option>
							</c:forEach>
						</select>
						<input id="cmsTemplate" value="${item.cmsTemplateId }" type="hidden" maxlength="100" class="tc-input-text w150"/>
					</td>
				</tr>
				<tr>
					<td class="form-title w100">
						备注：
					</td>
					<td class="form-content" colspan="2">
						<textarea id="remark" class="tc-textarea w300 h100">${item.remark }</textarea>
					</td>
				</tr>
				<tr>
					<td class="form-title w100" id="sortTd">
						排序：
					</td>
					<td class="form-content" colspan="2">
						<input id="sortNum" value="${item.sort}" type="text" maxlength="5" class="tc-input-text w100"/>
						<label>
							友情提示：排序数字越小越靠前
						</label>
						<span id="sortDiv" style="display: none; color: red">排序不能为空</span>
					</td>
				</tr>
				<tr>
					<td class="form-title w100">
						上传附件：
					</td>
					<td class="form-content" colspan="2">
						<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
							<div class="oper-box" style="padding: 0 0 3px;">
								<a href="javascript:void(0);" class="ui-button pr blue-skin">
									<input type="hidden" id="path" name="item.annexPath"/>
									<input type="hidden" id="fileName" name="item.annexFileName"/>
									<input id="fileId" class="image-upload" name="uploadFile" onchange="doUploadFilesChannel()" type="file" />上传附件
								</a>
								<a onclick="delBtn()" class="ui-button" href="javascript:void(0);">批量删除</a>
							</div>
							<table id="grid"></table>
							<div id="pager"></div>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/channel_add.js"></script>
	</body>
</html>

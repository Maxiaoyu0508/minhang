<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>广告管理 - 管理广告图片</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<script type="text/javascript">var swfu;</script>
	</head>
	<body class="iframe-body">
	
		<form id="advPhotoForm" action="${ctxPath}/admin/cms/advPhoto/add.htm" method="post">
			<input id="advId" name="item.advId"  value="${item.advId}" type="hidden"/>
			<input id="itemId" name="item.id"  value="${item.id}" type="hidden"/>
			<div id="login_info_bar">
				<table class="form-table ">
					<tr>
						<td class="form-title w150">
							广告图片名称：
						</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name }" type="text" class="tc-input-text w" />
						</td>
					</tr>
					<tr>
						<td class="form-title w150">
							图片超链接：
						</td>
						<td class="form-content">
							<c:if test="${item.linkUrl == null}">
							<input id="linkUrl" name="item.linkUrl" value="http://${item.linkUrl }" type="text" class="tc-input-text w" />
							</c:if>
							<c:if test="${item.linkUrl != null}">
							<input id="linkUrl" name="item.linkUrl" value="${item.linkUrl }" type="text" class="tc-input-text w" />
							</c:if>
						</td>
					</tr>
					<tr>
						<td class="form-title w150">
							图片说明：
						</td>
						<td class="form-content">
							<input id="note" name="item.note" value="${item.note }" type="text" class="tc-input-text w" />
						</td>
					</tr>
					<tr>
						<td class="form-title w150">
							排序：
						</td>
						<td class="form-content">
							<c:if test="${item.sort == null}">
							<input id="sort" name="item.sort" value="1" type="text" class="tc-input-text w80 mr10" />
							</c:if>
							<c:if test="${item.sort != null}">
							<input id="sort" name="item.sort" value="${item.sort }" type="text" class="tc-input-text w80 mr10" />
							</c:if>
							注意：数字越小，排序越靠前
						</td>
					</tr>
					<tr>
						<td class="form-title w120">
							图片：
						</td>
						<td class="form-content">
							<div class="mr20 fl" style="padding:10px 0">
								<a href="javascript:void(0);" class="adv-photo" style="color:#666;font-size:16px;text-decoration:none;">
									<c:if test="${not empty item.path}">
										<c:if test="${uploadType eq 'oss'}">
											<img id="showImg" alt="选择图片" src="${aliyunOssFileAccessUrl}${item.path}"/>
										</c:if>
										<c:if test="${uploadType ne 'oss'}">
											<img id="showImg" alt="选择图片" src="${ctxPath}${fileRoot}${item.path}"/>
										</c:if>
									</c:if>
									<c:if test="${empty item.path}">
										<img id="showImg" alt="选择图片" src=""/>
									</c:if>
									<input id="fileInput" name="uploadFile" type="file" style="height:150px" class="image-upload" onchange="doUploadFile();"/>
								</a>
								<input id="imgPath" name="item.path" value="${item.path}" type="hidden"/>
								<input id="fileName" name="item.fileName" type="hidden"/>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div class="oper mt5 fr">
				<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
				<a id="cancelBtn" class="ui-button" href="javascript:void(0);">取消</a>
			</div>
			<div class="cb mt10" id="errorlist"></div>
		</form>
		<div class="mb50"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/tc_file_upload.js"></script>
		<script src="${ctxPath}/static/admin/cms/adv_photo_add.js" type="text/javascript"></script>
	</body>
</html>
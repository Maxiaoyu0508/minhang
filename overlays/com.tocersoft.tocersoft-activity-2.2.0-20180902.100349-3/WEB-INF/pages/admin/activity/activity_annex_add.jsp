<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>活动视屏管理 - 管理活动视屏</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<script type="text/javascript">var swfu;</script>
	</head>
	<body class="iframe-body">
		<form id="advPhotoForm" action="${ctxPath}/admin/activity/add_activity_annex.htm" method="post">
			<input id="itemId" name="item.id"  value="${item.id}" type="hidden"/>
			<input id="objectId" name="item.objectId"  value="${objectId}" type="hidden"/>
			<div id="login_info_bar">
				<table class="form-table ">
					<tr>
						<td style="height:0;width:25%;"></td>
						<td style="height:0;width:55%;"></td>
						<td style="height:0;width:20%;"></td>
					</tr>
					<!-- 暂时不做上传附近的区分  -->
					<tr class="none">
						<td class="form-title w150">
							附件类别：
						</td>
						<td class="form-content">
								<input id="objectType" name="item.objectType" value="1"/>
								<%-- <input id="objectType" name="item.objectType" value="2" type="radio" 
														<c:if test="${item.objectType == 2}">
															checked="checked"
														</c:if>/>
													    <span class="mr10">缩略图</span>缩略图片最佳尺寸 200x200 --%>
						</td>
						<td class="form-content"></td>
					</tr>
					<tr>
						<td class="form-title">
								视屏上传：
						</td>
						<td class="form-content">
							<span id="uploadFileNameSpan" style="color:#f64646">温馨提示：请上传格式为mp4的视频</span>
							<input id="filePath" name="annexPath" type="hidden"/>
							<input id="uploadFileName" name="annexName" type="hidden"/>
							<input id="fileExtend" name="item.extend" type="hidden"/>
							<input id="fileSize" name="item.size" type="hidden"/>
						</td>
						<td class="form-content">
							<a class="ui-button fl" style="position:relative;" href="javascript:void(0);">
								<input id="fileInput" name="uploadFile" type="file" class="image-upload" onchange="doUploadFileForHere();"/>
								选择视频
							</a>
						</td>
					</tr>
					<tr id="uploadCover">
						<td class="form-title">
							封面图片：
						</td>
						<td class="form-content" rowspan="4">
							<div class="photo-add-div mr20 fl">
								<a href="javascript:void(0);" class="adv-photo">
									<img id="showImg2" alt="封面图片" src="${ctxPath}${fileRoot}${coverPath}" class="adv-photo-add"/>
									<input id="fileInput2" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile('fileInput2','showImg2','imgPath2','imgName2');"/>
								</a>
								<input id="imgPath2" name="coverPath" value="coverPath" hidden="hidden"/>
								<input id="imgName2" name="coverName" value="coverName" hidden="hidden"/>
							</div>
						</td>
						<td class="form-content"></td>
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
		<script src="${ctxPath}/static/admin/activity/activity_annex_add.js" type="text/javascript"></script>
	</body>
</html>
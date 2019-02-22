<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<%@ taglib prefix="cfn" uri="http://www.tocersoft.com/jsp/tags/function" %>
<!DOCTYPE html>
<html>
	<head>
		<title>文件上传路径设置管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="errorlist" class="prompt_box"></div>
		<div class="form-border-box">
			<div class="welcome-right-title clb">
				<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>系统配置</span>
				<div class="clb oper-box">
					<a onclick="saveSysUploadSet();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
				</div>

			</div>
		</div>

		<form id="saveForm" action="${ctxPath}/admin/sys/upload/set/saveSysUploadSet.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:40%;height:0"></td>
					<td style="width:40%;height:0"></td>
				</tr>

				<tr>
					<td class="form-title">
						公开资源根路径：
					</td>
					<td class="form-content">
						<input id="publicRoot" name="item.publicRoot" value="${item.publicRoot}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>

				<tr>
					<td class="form-title">
						非公开资源根路径：
					</td>
					<td class="form-content">
						<input id="privateRoot" name="item.privateRoot" value="${item.privateRoot}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>

				<tr>
					<td class="form-title">
						系统LOGO图片：
					</td>
					<td class="form-content" >
						<div class="photo-add-div mr20 fl">
							<a href="javascript:void(0);" class="adv-photo" style="width: 132px;height: 40px;">
                                <img id="showImg" alt="上传缩略图" src="${ctxPath}${fileRoot}${item.logoImage}" style="width: 132px;height: 40px;" class="adv-photo-add"/>
								<input id="fileInput" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile();"/>
							</a>
							<input id="imgPath" name="item.logoImage" value="${item.logoImage}" type="hidden"/>
						</div>
					</td>
					<td class="form-content">
						注意：LOGO图片尺寸：130px * 40px
					</td>
				</tr>

				<tr>
					<td class="form-title">
						系统名称：
					</td>
					<td class="form-content">
						<input id="systemName" name="item.systemName" value="${item.systemName}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>

				<tr>
					<td class="form-title">
						系统使用公司名称：
					</td>
					<td class="form-content">
						<input id="systemCompany" name="item.systemCompany" value="${item.systemCompany}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content"></td>
				</tr>

			</table>
		</form>

		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/tc_file_upload.js"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_upload_set_index.js?v=${sysVersion}"></script>
	</body>
</html>
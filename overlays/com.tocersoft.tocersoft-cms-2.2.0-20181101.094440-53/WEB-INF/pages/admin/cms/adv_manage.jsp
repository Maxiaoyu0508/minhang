<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>广告管理 - 管理广告图片</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="border-ddd" style="background:#fff;">
			<form id="articleForm">
				<div class="welcome-right-title clb">
					<span class="ml10 fl" style="line-height:33px;">广告位信息</span>
				</div>
				<input name="item.id" id="itemId" value="${item.id }" type="hidden" >
				<div id="login_info_bar">
					<table class="form-table ">
						<tr>
							<td class="form-title w100">
								广告位名称：
							</td>
							<td class="form-content">
								${item.name }
							</td>
							<td class="form-title w200">
								图片尺寸（像素宽×像素高）：
							</td>
							<td class="form-content">
								${item.photoWidth }PX × ${item.photoHeight }PX
							</td>
							<td class="form-title w200">
								最多上传图片（张）：
							</td>
							<td class="form-content">
								${item.maxPhotoNum }
							</td>
						</tr>
						<tr>
							<td class="form-title w120">
								广告位描述：
							</td>
							<td class="form-content" colspan="5">
								${item.note }
							</td>
						</tr>
					</table>
					<div class="welcome-right-title clb">
						<span class="ml10 fl" style="line-height:33px;">广告位信息</span>
					</div>
					<div id="advPhotoList" class="adv-photo-list " style="margin:5px 5px 0px 5px;">
						<%-- 此处AJAX请求获取图片列表HTML片段 --%>
						<span class="status-wait">正在加载，请稍候...</span>
					</div>
				</div>
			</form>
			<div class="clb">
				<div class="mt10 mr5 mb10 fr">
					<a id="refreshBtn" href="javascript:void(0);" class="ui-button blue-skin" style="width:80px;" onclick="submitForm();">刷新</a>
				</div>
			</div>
			<!-- <div class="oper mt10">
				<a id="refreshBtn" class="ui-button" href="javascript:void(0);">刷新</a>
			</div> -->
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/adv_manage.js" type="text/javascript"></script>
	</body>
</html>
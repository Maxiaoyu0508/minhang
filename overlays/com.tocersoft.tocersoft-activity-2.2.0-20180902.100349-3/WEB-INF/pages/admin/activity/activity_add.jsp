<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<title>保存活动信息</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
	<div id="errorlist" class="prompt_box mb5"></div>
	<div class="form-border-box clb">
		<div class="welcome-right-title">
			<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>编辑活动信息</span>
			<div class="clb oper-box">
				<a onclick="saveActivity();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
				<a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
			</div>
		</div>
		<form id="saveForm" action="${ctxPath}/admin/activity/saveActivity.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table mt3">
				<tr>
					<td style="width:10%;height:0"></td>
					<td style="width:20%;height:0"></td>
					<td style="width:8%;height:0"></td>
					<td style="width:20%;height:0"></td>
					<td style="width:8%;height:0"></td>
					<td style="width:12%;height:0"></td>
					<td style="width:24%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						<em>*</em>活动标题：
					</td>
					<td class="form-content" colspan="5">
						<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content" rowspan="5">
						<div class="photo-add-div mr20 fl">
							<a href="javascript:void(0);" class="adv-photo">
								<c:if test="${uploadType eq 'oss'}">
									<img id="showImg" alt="活动主图" src="${aliyunOssFileAccessUrl}${item.imageMain}" class="adv-photo-add"/>
								</c:if>
								<c:if test="${uploadType ne 'oss'}">
									<img id="showImg" alt="活动主图" src="${ctxPath}${fileRoot}${item.imageMain}" class="adv-photo-add"/>
								</c:if>
								<input id="fileInput" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile();"/>
							</a>
							<input id="imgPath" name="item.imageMain" value="${item.imageMain }" type="hidden"/>
						</div>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						活动地点：
					</td>
					<td class="form-content" colspan="5">
						<input id="address" name="item.address" value="${item.address}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						活动时间说明：
					</td>
					<td class="form-content" colspan="5">
						<textarea id="timeNote" name="item.timeNote" class="tc-textarea w"/>${item.timeNote}</textarea>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						活动时间：
					</td>
					<td class="form-content">
						<input id="timeBegin" name="item.timeBegin" value="<fmt:formatDate value="${item.timeBegin }" pattern="yyyy-MM-dd HH:mm"/>" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm'});" class="tc-input-text w120 fl mr5" placeholder="活动开始时间" type="text" autocomplete="off"/>
						<input id="timeEnd" name="item.timeEnd" value="<fmt:formatDate value="${item.timeEnd }" pattern="yyyy-MM-dd HH:mm"/>" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm'});" class="tc-input-text w120 fl mr5" placeholder="活动结束时间" type="text" autocomplete="off"/>
					</td>
					<td class="form-title">
						报名时间：
					</td>
					<td class="form-content">
						<input id="enrollTimeBegin" name="item.enrollTimeBegin" value="<fmt:formatDate value="${item.enrollTimeBegin }" pattern="yyyy-MM-dd"/>" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'});" class="tc-input-text w80 fl mr5" placeholder="报名开始时间" type="text" autocomplete="off"/>
						<input id="enrollTimeEnd" name="item.enrollTimeEnd" value="<fmt:formatDate value="${item.enrollTimeEnd }" pattern="yyyy-MM-dd"/>" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'});" class="tc-input-text w80 fl mr5" placeholder="报名结束时间" type="text" autocomplete="off"/>
					</td>
					<td class="form-title">
						报名名额：
					</td>
					<td class="form-content">
						<input id="enrollNum" name="item.enrollNum" value="${item.enrollNum}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
				</tr>
				<tr>
					<td class="form-title">
						报名说明：
					</td>
					<td class="form-content" colspan="5">
						<input id="enrollNote" name="item.enrollNote" value="${item.enrollNote}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
				</tr>
				<tr>
					<td class="form-title">
						活动状态：
					</td>
					<td class="form-content">
						<div class="tc-select-div w">
							<select class="w" id="state" name="item.state">
								<option value="0">草稿</option>
								<option value="1">预告</option>
								<option value="2">正在进行</option>
								<option value="3">已结束</option>
							</select>
						</div>
					</td>
					<td class="form-title">
						排序：
					</td>
					<td class="form-content">
						<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content">
						活动单价
					</td>
					<td class="form-content">
						<input id="" name="item.unitPrice" value="${item.unitPrice}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
					<td class="form-content" rowspan="4">
						<div class="photo-add-div mr20 fl">
							<a href="javascript:void(0);" class="adv-photo">
								<c:if test="${uploadType eq 'oss'}">
									<img id="showImg2" alt="列表缩略图" src="${aliyunOssFileAccessUrl}${item.imageThumb}" class="adv-photo-add"/>
								</c:if>
								<c:if test="${uploadType ne 'oss'}">
									<img id="showImg2" alt="列表缩略图" src="${ctxPath}${fileRoot}${item.imageThumb}" class="adv-photo-add"/>
								</c:if>
								<input id="fileInput2" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile('fileInput2','showImg2','imgPath2','');"/>
							</a>
							<input id="imgPath2" name="item.imageThumb" value="${item.imageThumb }" type="hidden"/>
						</div>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						主办单位：
					</td>
					<td class="form-content" colspan="5">
						<input id="organizerMain" name="item.organizerMain" value="${item.organizerMain}" type="text" class="tc-input-text w" autocomplete="off" />
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						协办单位：
					</td>
					<td class="form-content" colspan="5">
						<textarea id="organizerSupport" name="item.organizerSupport" class="tc-textarea w"/>${item.organizerSupport}</textarea>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						活动简介：
					</td>
					<td class="form-content" colspan="5">
						<textarea id="summary" name="item.summary" class="tc-textarea w"/>${item.summary}</textarea>
					</td>
				</tr>
				</table>
				
				<div class="tab-div mt3 mb3">
					<a id="webDetail" class="tab-btn J-tab-sub" href="javascript:void(0);">活动介绍</a>
					<a id="webPhoto" class="tab-btn J-tab-sub" href="javascript:void(0);">活动特色</a>
					<a id="webFile" class="tab-btn J-tab-sub" href="javascript:void(0);">活动议程</a>
					<a id="WebProduct" class="tab-btn J-tab-sub" href="javascript:void(0);">出席嘉宾</a> 
					<a id="fileList" class="tab-btn J-tab-sub" href="javascript:void(0);">活动视频</a>
				</div>
				
				<div class="tab-sub-content-div">
					<div class="tab-btn-content J-tab-sub-content">
						<div class="caption-div">
							<span class="">活动介绍</span>
						</div>
						<textarea id="htmlDesc" name="item.htmlDesc" class="" style="height:350px;">${item.htmlDesc}</textarea>
						<div class="mb30"></div>
					</div>
					
					<div class="tab-btn-content J-tab-sub-content">
						<div class="caption-div">
							<span class="">活动特色</span>
						</div>
						<textarea id="htmlFeature" name="item.htmlFeature" class="" style="height:350px;">${item.htmlFeature}</textarea>
						<div class="mb30"></div>
					</div>
					
					<div class="tab-btn-content J-tab-sub-content">
						<div class="caption-div">
							<span class="">活动议程</span>
						</div>
						<textarea id="htmlAgenda" name="item.htmlAgenda" class="" style="height:350px;">${item.htmlAgenda}</textarea>
						<div class="mb30"></div>
					</div>
					
					<div class="tab-btn-content J-tab-sub-content">
						<div class="caption-div">
							<span class="">出席嘉宾</span>
						</div>
						<textarea id="htmlGuests" name="item.htmlGuests" class="" style="height:350px;">${item.htmlGuests}</textarea>
						<div class="mb30"></div>
					</div>
					
					<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
						<div id="login_info_bar">
							<div class="caption-div"><span class="">活动视频管理</span></div>
							<div id="advPhotoList" class="adv-photo-list">
								<%-- 此处AJAX请求获取视屏列表HTML片段 --%>
								<span class="status-wait">正在加载，请稍候...</span>
							</div>
						</div>
					</div>
				</div>
		</form>
	</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script src="${ctxPath}/static/base/lib/calendar/WdatePicker.js?t=${sysVersion}" type="text/javascript" ></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/tc_file_upload.js"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.config.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.all.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/lang/zh-cn/zh-cn.js?t=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/activity/activity_add.js?v=${sysVersion}"></script>
		<script src="${ctxPath}/static/admin/activity/activity_annex_list.js" type="text/javascript"></script>
	</body>
</html>
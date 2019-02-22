<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存博客博主/自媒体</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<div class="mb3">
			<a id="saveBtn" class="ui-button" style="width:60px;" href="javascript:void(0);">保存</a>
			<a id="exitBtn" class="ui-button" style="width:60px;" href="javascript:void(0);">关闭</a>
		</div>
		<form id="saveForm" action="${ctxPath}/admin/cms/blog/author/saveCmsBlogAuthor.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<input id="type" name="item.type" value="${type}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:20%;height:0"></td>
					<td style="width:50%;height:0"></td>
					<td style="width:10%;height:0"></td>
					<td style="width:20%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						博主（自媒体）名称：
					</td>
					<td class="form-content">
						<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w"/>
					</td>
					<td class="form-content" colspan="2" rowspan="3">
						
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						博主（自媒体）子名称：
					</td>
					<td class="form-content">
						<input id="nameSub" name="item.nameSub" value="${item.nameSub}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						博主（自媒体）简介：
					</td>
					<td class="form-content">
						<textarea id="descBrief" name="item.descBrief" type="text" class="tc-textarea w" style="h50">${item.descBrief}</textarea>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						排序：
					</td>
					<td class="form-content">
						<c:if test="${item.sort ==null }">
							<input id="sort" name="item.sort" value="1" type="text" class="tc-input-text fl w100"/>
						</c:if>
						<c:if test="${item.sort !=null }">
							<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text fl w100"/>
						</c:if>
						<span class="fl ml10 mt3">注意：数字越小越靠前</span>
					</td>
					<td class="form-title">
						是否推荐：
					</td>
					<td class="form-content">
						<label class="vm">
							<input name="item.isRecommend" value="1" class="mr5 vm" type="radio" <c:if test="${item.isRecommend==1 }">checked='checked'</c:if> />
							<span class="mr30 vm">是</span>
						</label>
						<label class="vm">
							<input name="item.isRecommend" value="0" class="mr5 vm" type="radio" <c:if test="${item.isRecommend==0 }">checked='checked'</c:if>/>
							<span class="mr20 vm">否</span>
						</label>
					</td>
				</tr>
				<c:if test="${type==2 }">
					<tr>
						<td class="form-title">
							自媒体标签：
						</td>
						<td class="form-content" colspan="3" style="padding:0 5px;">
							<select id="gjc" name="item.tagList" multiple="true" class="w" data-placeholder="多项选择自媒体标签"> 
						 	 	<option value="-1"></option><%-- 要想显示出默认文字，select下的第一个选择项必须为空的option--%>
							    <c:forEach items="${cmsTagList}" var="tag">
							   		 <option value="${tag.id }" <c:if test="${fn:indexOf(item.tagList,tag.id) >= 0}">selected</c:if>>${tag.name }</option>
							    </c:forEach>
							</select>
						</td>
					</tr>
				</c:if>
			</table>
			<div class="tab-div mt3 mb3">
				<a id="content" class="tab-btn J-tab-sub" href="javascript:void(0);">详细介绍</a>
				<a id="photoList" class="tab-btn J-tab-sub" href="javascript:void(0);">博主图片</a>
			</div>
			
			<div class="tab-sub-content-div">
				<div class="tab-btn-content J-tab-sub-content">
					<div class="caption-div mt3"><span class="">博主（自媒体）详细介绍</span></div>
					<div class="art-content">
						<textarea id="artContent" name="item.descHtml" class="ui_textarea">${item.descHtml }</textarea>
					</div>
				</div>
				
				<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
					<div class="caption-div"><span class="">博主图片</span></div>
					<div id="tcPhotoList" class="adv-photo-list">
						<div class="fl mr20">
							<a href="javascript:void(0);" class="adv-photo" style="color:#666;font-size:16px;text-decoration:none;">
								<c:if test="${uploadType eq 'oss'}">
									<img id="showImg" alt="选择图片" src="${aliyunOssFileAccessUrl}${item.photoUrl}"/>
								</c:if>
								<c:if test="${uploadType ne 'oss'}">
									<img id="showImg" alt="选择图片" src="${ctxPath}${fileRoot}${item.photoUrl}"/>
								</c:if>
								<input id="fileInput" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile();"/>
							</a>
							<input id="imgPath" name="item.photoUrl" value="${item.photoUrl}" type="hidden"/>
							<div class="tc mt5">博主头像</div>
						</div>
						<div class="fl mr20">
							<a href="javascript:void(0);" class="adv-photo" style="color:#666;font-size:16px;text-decoration:none;">
								<c:if test="${uploadType eq 'oss'}">
									<img id="showImg2" alt="选择图片" src="${aliyunOssFileAccessUrl}${item.showImg2}"/>
								</c:if>
								<c:if test="${uploadType ne 'oss'}">
									<img id="showImg2" alt="选择图片" src="${ctxPath}${fileRoot}${item.showImg2}"/>
								</c:if>
								<input id="fileInput2" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile('fileInput2','showImg2','imgPath2');"/>
							</a>
							<input id="imgPath2" name="item.codeImg" value="${item.codeImg}" type="hidden"/>
							<div class="tc mt5">二维码图片</div>
						</div>
						<div class="cb"></div>
					</div>
				</div>
			</div>
		</form>
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.config.js?t=${sysVersion}"></script>
		<script src="http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/lang/zh-cn/zh-cn.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/tc_file_upload.js"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_blog_author_add.js?t=${sysVersion}"></script>
	</body>
</html>
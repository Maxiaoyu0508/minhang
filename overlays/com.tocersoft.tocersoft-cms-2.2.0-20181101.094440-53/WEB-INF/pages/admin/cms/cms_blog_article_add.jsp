<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存博客内的相关文章</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<span class="mt10">
			<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
			<c:if test="${authorType==1 }">
				<a id="exitBtn" class="ui-button" href="${ctxPath}/admin/cms/blog/article/index.htm?authorType=1">关闭</a>
			</c:if>
			<c:if test="${authorType==2 }">
				<a id="exitBtn" class="ui-button" href="${ctxPath}/admin/cms/blog/article/index.htm?authorType=2">关闭</a>
			</c:if>
		</span>
		<form id="saveForm" action="${ctxPath}/admin/cms/blog/article/saveCmsBlogArticle.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<input id="authorType" name="authorType" value="${authorType}" type="hidden" />
			<table class="form-table mt5">
					<caption>基本信息</caption>
					<tr>
						<td style="height:0;width:12%;"></td>
						<td style="height:0;width:24%;"></td>
						<td style="height:0;width:12%;"></td>
						<td style="height:0;width:24%;"></td>
						<td style="height:0;width:12%;"></td>
						<td style="height:0;width:24%;"></td>
					</tr>
					<tr>
						<td class="form-title">
							文章标题：
						</td>
						<td class="form-content" colspan="3">
							<input id="itemName" name="item.name" value="${item.name}" type="text" class="tc-input-text fl w"/>
						</td>
						<td class="form-title">
							<c:if test="${authorType == 1 }">
								博主姓名:
							</c:if>
							<c:if test="${authorType == 2 }">
								自媒体名称：
							</c:if>
						</td>
						<td class="form-content">
							<input id="blogId" name="item.blogId" value="${item.blogId}" type="hidden"/>
							<input id="blogName" name="item.blogName" value="${item.blogName}" type ="text" class="tc-input-text w" placeholder="双击补全"/>
						</td>
					</tr>
					<tr>
						<td class="form-title">
							文章标签：
						</td>
						<td class="form-content" colspan="3" style="padding:0 5px;">
							<select id="gjc" name="item.tagList" multiple="true" class="w" data-placeholder="多项选择文章标签"> 
						 	 	<option value="-1"></option><%-- 要想显示出默认文字，select下的第一个选择项必须为空的option--%>
							    <c:forEach items="${cmsTagList}" var="tag">
							   		 <option value="${tag.id }" <c:if test="${fn:indexOf(item.tagList,tag.id) >= 0}">selected</c:if>>${tag.name }</option>
							    </c:forEach>
							</select>
						</td>
						<td class="form-title w120">
							排序：
						</td>
						<td class="form-content">
							<c:if test="${item.sort != null}">
							<input type="text" class="tc-input-text w60 fl" name="item.sort" value="${item.sort}"/>
							</c:if>
							<c:if test="${item.sort == null}">
							<input type="text" class="tc-input-text w60 fl" name="item.sort" value="1"/>
							</c:if>
							<span class="ml10 sort-tip">注意：数字越小越靠前</span>
						</td>
					</tr>
					<tr>
						<td class="form-title" rowspan="2">
							文章摘要：
						</td>
						<td class="form-content" colspan="3" rowspan="2">
							<textarea id="summary" name="item.summary" class="tc-textarea fl w" style="height:33px;">${item.summary}</textarea>
						</td>
						<td class="form-content" colspan="3" ></td>
					</tr>
				</table>
		
		<div class="tab-div mt3 mb3">
			<a id="content" class="tab-btn J-tab-sub J-tab" href="javascript:void(0);">文章内容</a>
			<a id="photoList" class="tab-btn J-tab-sub J-tab" href="javascript:void(0);">文章图片</a>
		</div>
		
		<div class="tab-sub-content-div">
			<div class="tab-btn-content J-tab-sub-content">
				<div class="caption-div"><span class="">文章内容</span></div>
				<div class="art-content">
					<textarea id="artContent" name="item.content" class="ui_textarea h300">${item.content}</textarea>
				</div>
			</div>
			
			<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
				<div class="caption-div"><span class="">文章列表图片</span></div>
				<div id="tcPhotoList" class="adv-photo-list">
					<div class="mr20 fl">
						<a href="javascript:void(0);" class="adv-photo" style="color:#666;font-size:16px;text-decoration:none;">
							<c:if test="${uploadType eq 'oss'}">
								<img id="showImg" alt="选择图片" src="${aliyunOssFileAccessUrl}${item.path}"/>
							</c:if>
							<c:if test="${uploadType ne 'oss'}">
								<img id="showImg" alt="选择图片" src="${ctxPath}${fileRoot}${item.path}"/>
							</c:if>
							<input id="fileInput" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile();"/>
						</a>
						<input id="imgPath" name="item.path" value="${item.path}" type="hidden"/>
					</div>
					<div class="cb"></div>
				</div>
			</div>
		</div>
		</form>
		
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript">var currentTabIndex = '${currentTabIndex}';</script>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.config.js?t=${sysVersion}"></script>
		<script src="http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/lang/zh-cn/zh-cn.js?t=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_blog_article_add.js?t=${sysVersion}"></script>
	</body>
</html>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>保存自媒体</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<form id="saveForm" action="${ctxPath}/admin/cms/blog/author/saveCmsMediaAuthor.htm" method="post">
			<core:token/>
			<input name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:25%;height:0"></td>
					<td style="width:75%;height:0"></td>
				</tr>
				
				<tr>
					<td class="form-title">
						自媒体名称：
					</td>
					<td class="form-content">
						<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						自媒体子名称：
					</td>
					<td class="form-content">
						<input id="nameSub" name="item.nameSub" value="${item.nameSub}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						自媒体简介：
					</td>
					<td class="form-content">
						<input id="descBrief" name="item.descBrief" value="${item.descBrief}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						排序：数字越小越靠前：
					</td>
					<td class="form-content">
						<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						文章数量：
					</td>
					<td class="form-content">
						<input id="numArticle" name="item.numArticle" value="${item.numArticle}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						收藏量：
					</td>
					<td class="form-content">
						<input id="countCollect" name="item.countCollect" value="${item.countCollect}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						浏览量（热度）：
					</td>
					<td class="form-content">
						<input id="countView" name="item.countView" value="${item.countView}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title">
						点赞量：
					</td>
					<td class="form-content">
						<input id="countLike" name="item.countLike" value="${item.countLike}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
<!-- 				<tr> -->
<!-- 					<td class="form-title"> -->
<!-- 						是否精华： -->
<!-- 					</td> -->
<!-- 					<td class="form-content"> -->
<!-- 						<input id="isBest" name="item.isBest" value="${item.isBest}" type="text" class="tc-input-text w"/> -->
<!-- 						<label class="vm"> -->
<!-- 							<input name="item.isBest" value="1" class="mr5 vm" type="radio" <c:if test="${empty item.isBest || item.isBest==1 }">checked='checked'</c:if> /> -->
<!-- 							<span class="mr30 vm">是</span> -->
<!-- 						</label> -->
<!-- 						<label class="vm"> -->
<!-- 							<input name="item.isBest" value="0" class="mr5 vm" type="radio" <c:if test="${item.isBest==0 }">checked='checked'</c:if>/> -->
<!-- 							<span class="mr20 vm">否</span> -->
<!-- 						</label> -->
<!-- 					</td> -->
<!-- 				</tr> -->
				
				<tr>
					<td class="form-title">
						是否推荐：
					</td>
					<td class="form-content">
<!-- 						<input id="isRecommend" name="item.isRecommend" value="${item.isRecommend}" type="text" class="tc-input-text w"/> -->
						<label class="vm">
							<input name="item.isRecommend" value="1" class="mr5 vm" type="radio" <c:if test="${empty item.isRecommend || item.isRecommend==1 }">checked='checked'</c:if> />
							<span class="mr30 vm">是</span>
						</label>
						<label class="vm">
							<input name="item.isRecommend" value="0" class="mr5 vm" type="radio" <c:if test="${item.isRecommend==0 }">checked='checked'</c:if>/>
							<span class="mr20 vm">否</span>
						</label>
					</td>
				</tr>
				
<!-- 				<tr> -->
<!-- 					<td class="form-title"> -->
<!-- 						是否最新： -->
<!-- 					</td> -->
<!-- 					<td class="form-content"> -->
<!-- 						<label class="vm"> -->
<!-- 							<input name="item.isNew" value="1" class="mr5 vm" type="radio" <c:if test="${empty item.isNew || item.isNew==1 }">checked='checked'</c:if> /> -->
<!-- 							<span class="mr30 vm">是</span> -->
<!-- 						</label> -->
<!-- 						<label class="vm"> -->
<!-- 							<input name="item.isNew" value="0" class="mr5 vm" type="radio" <c:if test="${item.isNew==0 }">checked='checked'</c:if>/> -->
<!-- 							<span class="mr20 vm">否</span> -->
<!-- 						</label> -->
<!-- 						<input id="isNew" name="item.isNew" value="${item.isNew}" type="text" class="tc-input-text w"/> -->
<!-- 					</td> -->
<!-- 				</tr> -->
			</table>
			<div class="caption-div mt3"><span class="">自媒体详细介绍</span></div>
			<div class="art-content">
				<textarea id="artContent" name="item.descHtml" class="ui_textarea">${item.descHtml }</textarea>
			</div>
		</form>
		<span class="fr mt10">
			<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
			<a id="exitBtn" class="ui-button" href="javascript:void(0);">关闭</a>
		</span>
		<div id="errorlist" class="prompt_box"></div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.config.js?t=${sysVersion}"></script>
		<script src="http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/lang/zh-cn/zh-cn.js?t=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_media_author_add.js?t=${sysVersion}"></script>
	</body>
</html>
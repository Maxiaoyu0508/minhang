<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<style>
	.svt-span{position:absolute;top:0;left:0;background:#ff5757;padding:2px 5px;color:#fff;}
</style>
<c:if test="${cmsArticlePhotoList != null}">
	<c:forEach var="photo" items="${cmsArticlePhotoList}">
		<div class="article-photo-item mr20 fl">
			<div class="article-photo">
				<c:if test="${uploadType eq 'oss'}">
					<img src="${aliyunOssFileAccessUrl}${photo.path }" />
				</c:if>
				<c:if test="${uploadType ne 'oss'}">
					<img src="${ctxPath}${fileRoot}${photo.path }" />
				</c:if>
				<div class="photo-btn hide">
					<c:if test="${photo.location != 0}"><a class="adv-photo-btn J-ap-thumb" href="javascript:void(0);"  onclick="setThumb('${photo.id}');">设为缩略图</a></c:if>
					<a class="adv-photo-btn J-ap-edit2" href="javascript:void(0);"  data="${photo.id }">编辑</a>
					<a class="adv-photo-btn J-ap-remove2" href="javascript:void(0);"  data="${photo.id }">删除</a>
				</div>
			</div>
			<div class="photo-desc mt5">
				<span class="pd-span" title="${photo.name}">名称：${photo.name}</span>
				<span class="pd-span" title="${photo.link}">链接：${photo.link}</span>
				<span class="pd-span" title="${photo.desc}">说明：${photo.desc}</span>
			</div>
			<c:if test="${photo.location == 0}"><span class="svt-span">缩略图</span></c:if>
		</div>
	</c:forEach>
</c:if>
<div class="adv-photo-item-btn mr20 fl">
	<a id="tcPhotoList" class="adv-photo-add" onclick="toArticleAdd();" href="javascript:void(0);">新增图片</a>
</div>
<div class="cb"></div>

<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<c:if test="${pageResult.result != null}">
	<c:forEach var="photo" items="${pageResult.result }">
		<div class="adv-photo-item mr20 fl">
			<div class="adv-photo">
				<c:if test="${uploadType eq 'oss'}">
					<img src="${aliyunOssFileAccessUrl}${photo.path }" />
				</c:if>
				<c:if test="${uploadType ne 'oss'}">
					<img src="${ctxPath}${fileRoot}${photo.path }" />
				</c:if>
				<div class="photo-btn hide">
					<a class="adv-photo-btn J-ap-edit" href="javascript:void(0);"  data="${photo.id }">编辑</a>
					<a class="adv-photo-btn J-ap-remove" href="javascript:void(0);"  data="${photo.id }">删除</a>
				</div>
			</div>
			<div class="photo-desc mt5">
				<span class="pd-span" title="${photo.name}">名称：${photo.name}</span>
				<span class="pd-span" title="${photo.linkUrl}">链接：${photo.linkUrl}</span>
				<span class="pd-span" title="${photo.note}">说明：${photo.note}</span>
			</div>
		</div>
	</c:forEach>
</c:if>
<c:if test="${(cmsAdv.maxPhotoNum gt fn:length(pageResult.result)) or (fn:length(pageResult.result) == 0)}">
	<div class="adv-photo-item-btn mr20 fl">
		<a id="advPhotoAdd" onclick="toAdd();" class="adv-photo-add" href="javascript:void(0);">新增图片</a>
	</div>
</c:if>
<div class="cb"></div>

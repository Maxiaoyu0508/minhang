<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<input id="objectId" value="${objectId}" type="hidden"/>
<input id="objectType" value="${objectType}" type="hidden"/>
<c:if test="${not empty pageResult.result}">
<c:forEach items="${pageResult.result}" var="photo" varStatus="sta">
<div class="sys-photo-item mr20 fl mb10">
	<a href="javascript:void(0);" class="adv-photo" style="color:#666;font-size:16px;text-decoration:none;">
		<c:if test="${uploadType eq 'oss'}">
			<img id="showImg_${sta.index+1}" src="${aliyunOssFileAccessUrl}${photo.url}"/>
		</c:if>
		<c:if test="${uploadType ne 'oss'}">
			<img id="showImg_${sta.index+1}" src="${ctxPath}${fileRoot}${photo.url}"/>
		</c:if>
		<input id="fileInput_${sta.index+1}" name="uploadFile" style="height:150px" type="file" class="image-upload" onchange="doUploadPhotoSave(${sta.index+1});"/>
	</a>
	<div class="photo-btn">
		<a class="adv-photo-btn J-ap-remove" href="javascript:void(0);" data="${photo.id }">删除</a>
	</div>
	<input id="filePath_${sta.index+1}" name="item.path" value="${photo.url}" type="hidden"/>
</div>
</c:forEach>
</c:if>
<div class="mr20 fl mb10">
	<a href="javascript:void(0);" class="adv-photo" style="color:#666;font-size:16px;text-decoration:none;">
		<img id="showImg_0" alt="选择图片" src=""/>
		<input id="fileInput_0" name="uploadFile" style="height:150px" type="file" class="image-upload" onchange="doUploadPhotoSave(0);"/>
	</a>
	<input id="filePath_0" name="item.path" type="hidden"/>
</div>
<div class="cb"></div>
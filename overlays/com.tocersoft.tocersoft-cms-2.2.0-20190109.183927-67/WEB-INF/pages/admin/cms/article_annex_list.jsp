<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
	<c:forEach var="item" items="${annexList}">
		<div class="adv-photo-item mr20 fl">
			<div class="adv-photo">
				<img src="${ctxPath}${fileRoot}${item.path}" />
				<div class="photo-btn hide">
					<%-- <a class="adv-photo-btn J-ap-edit" href="javascript:void(0);"  data="${item.id}" type="hidden">编辑</a> --%>
					<a class="adv-photo-btn J-ap-remove" href="javascript:void(0);"  data="${item.id}">删除</a>
				</div>
			</div>
			<div class="photo-desc mt5">
				<span class="pd-span" title="${item.name}">名称：${item.name}</span>
			</div>
		</div>
	</c:forEach>
<div class="adv-photo-item-btn mr20 fl">
	<a id="advPhotoAdd" onclick="toAdd();" class="adv-photo-add" href="javascript:void(0);">新增视频</a>
</div>
<div class="cb"></div>

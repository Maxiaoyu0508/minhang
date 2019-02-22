﻿<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html style="background: #ebebeb;height: 100%">
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title>闵行博物馆-基本陈列</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
</head>
<body >
	<div class="ex-box">
		<div class="ex-box-top" style="background:url('${ctxPath}/static/front/images/list-01.png') no-repeat;background-size:cover;">
			<div class="ex-box-back">
				<h2>${cmsChannel.name}</h2>
			</div>
		</div>
		<div class="service-box">
			<p>${cmsChannel.remark}</p>
			<div class="service-box-img">
				<img src="${ctxPath}/static/front/images/arrow.png">
			</div>
		</div>
		<ul class="ex-ul">
			<c:forEach items="${uploadFileArray}" end="5" var="uploadFile" >
			<li>
				<a href="${ctxPath}/weixin/exhibit/detail.htm?item.id=${uploadFile.id}">
					<div class="ex-li-img">
				<img src="${ctxPath}/upload/${uploadFile.path}"/>
					</div>
					<div class="ex-li-title">${uploadFile.name}</div>
					<span class="ex-li-text">${uploadFile.summary}</span>
				</a>
			</li>
		</c:forEach>
		</ul>
	</div>

	<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />

<script>
  var check = 1;
  $('.service-box-img').on('click',function(){
    if(check == 1){
      $(".service-box").css('height','auto');
      check = 0;
    }else{
      $(".service-box").css('height','19vh');
      check = 1;
    }
  });


</script>
</body>
</html>

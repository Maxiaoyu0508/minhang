<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core"%>
<!doctype html>
<html style="background: #ebebeb;height: 100%">
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title>闵行博物馆-教育课件</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
</head>
<body >
<div class="ex-box">

	<ul class="ex-ul">
<c:forEach items="${uploadFileArry}" end="5" var="cmsArticleArray" >
		<li>
			<a href="${ctxPath}/weixin/course/detail.htm?item.id=${cmsArticleArray.id}">
				<div class="ex-li-img">
					<img src="${ctxPath}${fileRoot}${cmsArticleArray.path}">
				</div>
				<div class="ex-li-title">${cmsArticleArray.name}</div>
				<span class="ex-li-text"><core:unescapeHtml value="${cmsArticleArray.content}" /></span>
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

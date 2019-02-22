<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html style="background: #ebebeb;height: 100%">
<head>
    <base href="${ctxPath}" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>闵行博物馆</title>
    <meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
    <meta name="description" content="闵行博物馆"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/base.css">
    <link rel="stylesheet" type="text/css" href="${ctxPath}/static/touch/base/animate.min.css">
    <link rel="stylesheet" type="text/css" href="${ctxPath}/static/touch/base/swiper.min.css">
    <script src="${ctxPath}/static/touch/base/swiper.min.js"></script>
    <script src="${ctxPath}/static/front/base/jquery.min.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=26OSkHqb2jCicibhPn9BhqQU"></script>
    <style>
        .touch-main{width:875px;height:1630px;position:relative;top:108px;left:105px;}
        .main-content{width:100%;height:1312px;position:absolute;top:128px;overflow:hidden;}
        .main-top{width:100%;height:130px;position:absolute;background:url("/static/touch/images/v-top.png") no-repeat;background-size:100%;}
        .bg{position:absolute;top:0;left:0;z-index:-1;width:1080px;height:1920px;background:url("/static/touch/images/v-common.png") no-repeat top left;background-size:100%;}
        #menuUl{width:100%;height:177px;position:absolute;bottom:0}
        .slide{width:600px;height:125px;position:absolute;top:18px;left:120px;display:flex;justify-content: space-between;}
        #menuUl a{width:125px;height:120px;display:inline-block;}
        #menuUl a img{width:100%;height:100%;}
        .back{width:100px;height:100px;position:absolute;left:50%;margin-left:-50px;bottom:74px;}
    </style>
</head>
<body>
<div class="bg">
    <div class="touch-main">
        <div class="main-top"></div>
        <div class="main-content"></div>
        <div id="menuUl">
            <div class="slide ul">
                <a appendHref="/info.htm" class="li"><img asrc="${ctxPath}/static/touch/images/menu-01.png" bsrc="${ctxPath}/static/touch/images/menu-1.png" alt=""></a>
                <a appendHref="/nav.htm" class="li"><img asrc="${ctxPath}/static/touch/images/menu-02.png" bsrc="${ctxPath}/static/touch/images/menu-2.png" alt=""></a>
                <a appendHref="/note.htm" class="li"><img asrc="${ctxPath}/static/touch/images/menu-03.png" bsrc="${ctxPath}/static/touch/images/menu-3.png" alt=""></a>
            </div>
        </div>
    </div>
    <div class="back" onclick="window.history.back(-1)"></div>
</div>

<script type="text/javascript">
  (function(win){
    let oUl=document.getElementsByClassName('ul')[0];
    let aLi=oUl.getElementsByTagName('img');
    let href=window.location.href;
    let param=href.split('/')[href.split('/').length-1].split('.')[0];
    for(let i=0;i<aLi.length;i++){
      aLi[i].src=aLi[i].getAttribute('asrc');
    }

    // 获取url中传递的参数
    function getQueryString(name) {
      var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
      if (result == null || result.length < 1) {
        return "";
      }
      return result[1];
    }
    var str = getQueryString("key");
    // 获取url中传递的参数对应加载页面片段
    if(str === '0'){
      $('.main-content').load('/info.htm');
      aLi[0].src=aLi[0].getAttribute('bsrc');
    }else if(str === '1'){
      $('.main-content').load('/nav.htm');
      aLi[1].src=aLi[1].getAttribute('bsrc');
    }else if(str === '2'){
      $('.main-content').load('/note.htm');
      aLi[2].src=aLi[2].getAttribute('bsrc');
    }

    $('#menuUl a').on('click',function () {
      var index = $(this).index();
      var link = $(this).attr('appendHref');
      $('.main-content').load(link);
      for(let i=0;i<aLi.length;i++){
        aLi[i].src=aLi[i].getAttribute('asrc');
      }
      aLi[index].src=aLi[index].getAttribute('bsrc');
    })
  }(window))
</script>
</body>
</html>


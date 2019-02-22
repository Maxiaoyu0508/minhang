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
  <link href="${ctxPath}/static/touch/base/mui.min.css" rel="stylesheet">
  <script src="${ctxPath}/static/touch/base/mui.min.js"></script>
  <script src="${ctxPath}/static/touch/base/swiper.min.js"></script>
  <script src="${ctxPath}/static/front/base/jquery.min.js"></script>
  <script src="http://api.map.baidu.com/api?v=2.0&ak=26OSkHqb2jCicibhPn9BhqQU"></script>
  <script src="/static/touch/base/signature_pad.js"></script>
  <style>
    .bg{position:absolute;top:0;left:0;z-index:-1;width:1920px;height:1080px;background:url("/static/touch/images/menu-bg.png") no-repeat top left;background-size:100% 100%;}
    .side{position:absolute;top:52px;right:95px;width:153px;height:974px;}
    .side .back{height:83px;width:153px;display:flex;justify-content: center;align-items: center;}
    .side .back>img{width:30%;}
    .side .ul{box-sizing: border-box;width:100%;height:890px;padding:95px 0;display: flex;flex-direction: column;justify-content: center;}
    .side .li{flex:1;display: flex;justify-content: center;align-items: center;}
    .side .li>img{width:70%;}
    .touch-main{position:absolute;left:95px;width:1577px;height:890px;top:137px;overflow: hidden;}
    .hue{-webkit-filter:hue-rotate(90deg);filter:hue-rotate(90deg);}
  </style>
</head>
<body>
  <div class="bg">
    <div class="side">
      <div class="back" onclick="window.history.back(-1)">
        <img src="${ctxPath}/static/touch/images/menu-back.png" alt="">
      </div>
      <div id="menuUl" class="ul">
        <a appendHref="/information.htm" class="li"><img asrc="${ctxPath}/static/touch/images/menu-01.png" bsrc="${ctxPath}/static/touch/images/menu-1.png" alt=""></a>
        <a appendHref="/navigation.htm" class="li"><img asrc="${ctxPath}/static/touch/images/menu-02.png" bsrc="${ctxPath}/static/touch/images/menu-2.png" alt=""></a>
        <a appendHref="/notice.htm" class="li"><img asrc="${ctxPath}/static/touch/images/menu-03.png" bsrc="${ctxPath}/static/touch/images/menu-3.png" alt=""></a>
        <a appendHref="/messageList.htm" class="li"><img asrc="${ctxPath}/static/touch/images/menu-04.png" bsrc="${ctxPath}/static/touch/images/menu-4.png" alt=""></a>
      </div>
    </div>
  </div>
  <%--需要加载内容的容器--%>
  <div class="touch-main"></div>
<script type="text/javascript">
  (function(win){
    let oUl=document.getElementsByClassName('ul')[0];
    let aLi=oUl.getElementsByTagName('img');
    let href=window.location.href;
    let param=href.split('/')[href.split('/').length-1].split('.')[0];
    for(let i=0;i<aLi.length;i++){
      aLi[i].src=aLi[i].getAttribute('asrc');
    }
    // if(param==='information'){
    //   //menu-1
    //   aLi[0].src=aLi[0].getAttribute('bsrc');
    // }else if(param==='navigation'){
    //   //menu-2
    //   aLi[1].src=aLi[1].getAttribute('bsrc');
    // }else if(param==='notice'){
    //   //menu-3
    //   aLi[2].src=aLi[2].getAttribute('bsrc');
    // }else if(param==='messageList' || param==='messageWrite'){
    //   //menu-4
    //   aLi[3].src=aLi[3].getAttribute('bsrc');
    // }

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
      $('.touch-main').load('/information.htm');
      aLi[0].src=aLi[0].getAttribute('bsrc');
    }else if(str === '1'){
      $('.touch-main').load('/navigation.htm');
      aLi[1].src=aLi[1].getAttribute('bsrc');
    }else if(str === '2'){
      $('.touch-main').load('/notice.htm');
      aLi[2].src=aLi[2].getAttribute('bsrc');
    }else if(str === '3'){
      $('.touch-main').load('/messageList.htm');
      aLi[3].src=aLi[3].getAttribute('bsrc');
    }

    $('#menuUl a').on('click',function () {
      var index = $(this).index();
      // location.search = '?key='+index+'';
      var link = $(this).attr('appendHref');
      $('.touch-main').load(link);
      for(let i=0;i<aLi.length;i++){
        aLi[i].src=aLi[i].getAttribute('asrc');
      }
      aLi[index].src=aLi[index].getAttribute('bsrc');
    })
  }(window))
</script>
</body>
</html>


<%@ page language="java" contentType="text/html; charset=utf-8"%>
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
  <title>闵行博物馆-地图导览 · 一楼</title>
  <meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
  <meta name="description" content="闵行博物馆"/>
  <link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/base.css">
  <script src="http://api.map.baidu.com/api?v=2.0&ak=26OSkHqb2jCicibhPn9BhqQU"></script>
  <script src="${ctxPath}/static/front/base/infoBox.min.js"></script>
    <style>
        .anchorBL{display: none !important;}
    </style>
</head>
<body >
<div id="map" style="width:100%;height:100vh;" class="blue-bg"></div>
<script type="text/javascript">
  var tileLayer = new BMap.TileLayer();
  tileLayer.getTilesUrl = function(tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return '${ctxPath}/static/front/1F/' + zoom + '/tile-' + x + '_' + y + '.png';
  }
  var MyMap = new BMap.MapType('MyMap', tileLayer, {minZoom: 5, maxZoom: 7});
  var map = new BMap.Map('map', {mapType: MyMap});
  map.addControl(new BMap.NavigationControl());
  map.centerAndZoom(new BMap.Point(0, 0), 5);
</script>
  <%--<div id="mapArea" style="width:100vw;height:100vh;display: none"></div>--%>

  <%--<script type="text/javascript">--%>
    <%--function map(){--%>
      <%--var y=121.3577270000;--%>
      <%--var x=31.1688640000;--%>
      <%--var map=new BMap.Map("mapArea");--%>
      <%--map.enableScrollWheelZoom(true);--%>
      <%--var point=new BMap.Point(y,x);--%>
      <%--map.centerAndZoom(point,15);--%>
      <%--var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {--%>
        <%--anchor: new BMap.Size(10, 25),--%>
        <%--imageOffset: new BMap.Size(0, 0)   // 设置图片偏移--%>
      <%--});--%>
      <%--// 创建标注对象并添加到地图--%>
      <%--var marker = new BMap.Marker(point, {icon: myIcon});--%>
      <%--map.addOverlay(marker);--%>
      <%--// var marker=new BMap.Marker(point);--%>
      <%--// map.addOverlay(marker);--%>
      <%--var html =`<div style="font-size:16px;background:white;border-radius:5px;width:100px;height:25px;line-height:25px;text-align:center;">闵行博物馆</div>`;--%>
      <%--var infoBox = new BMapLib.InfoBox(map,html,{--%>
        <%--boxStyle:{--%>
          <%--width: "100px",--%>
          <%--height: "25px"--%>
        <%--}--%>
        <%--,enableAutoPan: true--%>
        <%--,align: INFOBOX_AT_BOTTOM--%>
      <%--});--%>
      <%--infoBox.open(marker);--%>
    <%--}--%>
    <%--window.onload=function(){--%>
      <%--map();--%>
    <%--}--%>
  <%--</script>--%>
</body>
</html>


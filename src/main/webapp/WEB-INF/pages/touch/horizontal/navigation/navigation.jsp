<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%--展馆导览--%>
<style>
    .touch-main .mark-first{width:328px;height:142px;border-radius:5px;background:rgb(214,220,225);position:absolute;top:652px;left:1187px;padding:15px;overflow:hidden}
    .touch-main .mark-second{width:137px;height:147px;border-radius:5px;background:rgb(214,220,225);position:absolute;top:688px;left:1364px;padding-left:20px}
    .touch-main .mark-second div{height:50px;line-height:50px}
    .touch-main .mark-first div{width:50%;height:30px;line-height:30px;margin-bottom:5px;float:left}
    .touch-main .mark-first img,.touch-main .mark-second img{vertical-align:middle;margin-right:10px}
    .around,.periphery{width:73px;height:92px;position:absolute;top:40px;left:1449px;cursor:pointer;}
    .periphery{background:url("${ctxPath}/static/touch/images/periphery.png") no-repeat;background-size:100%;}
    .around{background:url("${ctxPath}/static/touch/images/inroom.png") no-repeat;background-size:100%;}
    .first-floor,.second-floor{width:101px;height:101px;position:absolute;left:1435px;cursor:pointer}
    .first-floor{top:420px}
    .second-floor{top:308px}
    .second,.first{width:101px;height:101px}
    .second-small,.first-small{position:absolute;width:54px;height:54px;top:50%;left:50%;margin-top:-27px;margin-left:-27px}
    .first-small{display:none}
    .second{display:none}
    #map1,#map2{width:100%;height:100%;background:rgba(0,0,0,0) !important}
    .around-map{position:absolute;top:37px;left:456px;width:850px;height:780px;background:url("${ctxPath}/static/touch/images/around.png") no-repeat;background-size:100%;display:none}
    .anchorBL{display:none}
    .BMap_stdMpZoom{width:33px !important}
    .out-up{
        animation: outUp .8s ease-in forwards;
    }
    @keyframes outUp{
        0%{
            transform: translateY(0);
            opacity: 1;
        }
        100%{
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    .in-up{
        animation: inUp .8s ease-in forwards;
    }
    @keyframes inUp{
        0%{
            transform: translateY(100%);
            opacity: 0;
        }
        100%{
            transform: translateY(0);
            opacity: 1;
        }
    }
    .out-down{
        animation: outDown .8s ease-in forwards;
    }
    @keyframes outDown{
        0%{
            transform: translateY(0);
            opacity: 1;
        }
        100%{
            transform: translateY(100%);
            opacity: 0;
        }
    }
    .in-down{
        animation: inDown .8s ease-in forwards;
    }
    @keyframes inDown{
        0%{
            transform: translateY(-100%);
            opacity: 0;
        }
        100%{
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>
<div class="gray-bg" style="width:100%;height:100%; background:rgba(0,0,0,.2)">
    <div id="map2" style="display:none"></div>
    <div id="map1" ></div>
    <div class="periphery"></div>
    <div class="around-map"></div>
    <div class="around" style="display:none"></div>
    <div class="mark-second" style="display:none">
        <div>
            <img src="${ctxPath}/static/touch/images/mark7.png" alt="">
            <span>一楼楼梯</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark6.png" alt="">
            <span>厕所</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark8.png" alt="">
            <span>本机位置</span>
        </div>
    </div>
    <div class="mark-first" >
        <div>
            <img src="${ctxPath}/static/touch/images/mark1.png" alt="">
            <span>报告厅</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark2.png" alt="">
            <span>升降电梯</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark3.png" alt="">
            <span>会议厅</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark4.png" alt="">
            <span>服务台（租赁点）</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark5.png" alt="">
            <span>文创服务</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark6.png" alt="">
            <span>厕所</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark7.png" alt="">
            <span>二楼楼梯</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark8.png" alt="">
            <span>本机位置</span>
        </div>
    </div>
    <div class="second-floor">
        <img src="${ctxPath}/static/touch/images/second.png" alt="" class="second">
        <img src="${ctxPath}/static/touch/images/second-small.png" alt="" class="second-small">
    </div>
    <div class="first-floor">
        <img src="${ctxPath}/static/touch/images/first.png" alt="" class="first">
        <img src="${ctxPath}/static/touch/images/first-small.png" alt="" class="first-small">
    </div>
</div>

<script>
  var tileLayer1 = new BMap.TileLayer();
  tileLayer1.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return '${ctxPath}/static/front/1F/' + zoom + '/tile-' + x + '_' + y + '.png';
  }
  var MyMap1 = new BMap.MapType('MyMap', tileLayer1, {minZoom: 5, maxZoom: 7});
  var map1 = new BMap.Map('map1', {mapType: MyMap1});
  map1.addControl(new BMap.NavigationControl());
  map1.centerAndZoom(new BMap.Point(0, 0), 6);

  var tileLayer2 = new BMap.TileLayer();
  tileLayer2.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return '${ctxPath}/static/front/2F/' + zoom + '/tile-' + x + '_' + y + '.png';
  }
  var MyMap2 = new BMap.MapType('MyMap', tileLayer2, {minZoom: 5, maxZoom: 7});
  var map2 = new BMap.Map('map2', {mapType: MyMap2});
  map2.addControl(new BMap.NavigationControl());
  map2.centerAndZoom(new BMap.Point(-29, 17), 6);
</script>
<script src="${ctxPath}/static/touch/navigation/navigation.js"></script>




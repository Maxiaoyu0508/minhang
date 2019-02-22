<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%--展馆导览--%>
<style>
    #map2,#map1{width:795px;height:416px;position:absolute;left:51px;}
    #map3{width:786px;height:704px;position:absolute;top:224px;left:55px;background:url("${ctxPath}/static/touch/images/v-around.png") no-repeat;background-size:100%;}
    #map2{top:107px;background:url("${ctxPath}/static/touch/images/v-secondFloor.png") no-repeat;}
    #map1{top:570px;background:url("${ctxPath}/static/touch/images/v-firstFloor.png") no-repeat;}
    .mark{width:819px;height:81px;position:absolute;border-radius:10px;top:1183px;left:32px;background:rgb(214,220,225)}
    .around,.in-room{width:73px;height:92px;position:absolute;top:1054px;left:776px;}
    .around{background:url("${ctxPath}/static/touch/images/periphery.png") no-repeat;background-size:100%;}
    .in-room{background:url("${ctxPath}/static/touch/images/inroom.png") no-repeat;background-size:100%;}
    .mark{display:flex;flex-wrap:wrap;align-items:center;}
    .mark>div{width:25%;}
    .mark img{vertical-align: middle;margin-left:40px;}
    .mark span{margin-left:10px;}
    .floor-txt{width:78px;height:58px;font-family:'微软雅黑';font-size:76px;color:white;position:absolute;left:10px;top:290px;}
</style>
<div class="gray-bg" style="width:100%;height:100%; background:rgba(0,0,0,.2)">
    <div id="map2">
        <div class="floor-txt">2F</div>
    </div>
    <div id="map1">
        <div class="floor-txt">1F</div>
    </div>
    <div id="map3" style="display:none"></div>
    <div class="around"></div>
    <div class="in-room" style="display:none;"></div>
    <div class="mark">
        <div>
            <img src="${ctxPath}/static/touch/images/mark1.png" alt="">
            <span>报告厅</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark2.png" alt="">
            <span>升降电梯</span>
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
            <img src="${ctxPath}/static/touch/images/mark3.png" alt="">
            <span>会议厅</span>
        </div>
        <div>
            <img src="${ctxPath}/static/touch/images/mark4.png" alt="">
            <span>服务台（租赁点）</span>
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
</div>
<script src="${ctxPath}/static/touch/navigation/nav.js"></script>




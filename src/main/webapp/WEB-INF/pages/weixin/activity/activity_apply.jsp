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
	<title>闵行博物馆-活动报名</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link type="text/css" rel="stylesheet" href="${ctxPath}/static/weixin/jeDate/skin/jedate.css">
	<style>
		*{margin: 0;padding: 0;}
		ul{list-style: none;}
		.schedule-hd{display: flex;justify-content: space-between;padding: 0 15px;}
		.today{flex: 1;text-align: center;color: #676c72;font-weight: bold;margin-bottom: 10px;font-size: 14px;}
		.ul-box{overflow: hidden;}
		.week-ul.ul-box{border-bottom: 1px solid #b4b4b5;padding-bottom: 5px;}
		.ul-box > li{float: left;width: 14.28%;text-align: center;padding:3px 0;}
		.other-month{color: #999999;}
		.current-month{color: #999999;}
        .canClick span{color:#555;font-weight:bold}
		.active.dayStyle{border-radius: 50%;background: #c69c6d;color:#fff}
		.arrow{cursor: pointer;color:#676c72;font-size: 14px;}
		.dayStyle{display: inline-block;width: 25px;height: 25px;border-radius: 50%;text-align: center;line-height: 25px;cursor: pointer;font-size: 12px;}
		.today-flag{background: #c69c6d;color: #fff;}
		.boxshaw{box-shadow: 2px 2px 15px 2px #e3e3e3;}
		.selected-style {background: #00BDFF;color: #ffffff;}
		#h3Ele{text-align: center;padding: 10px;}



        .jedate .jedate-content .daystable td.other, .jedate .jedate-content .daystable td.other .nolunar, .jedate .jedate-content .daystable td.other .lunar{
            color:#999
        }
        .jedate .yearprev,.jedate .yearnext{display: none}
        .jedate .monthprev{left:0;width:50px !important;}
        .jedate .monthnext{right:0;width:50px !important;}
        .jedate .jedate-pane,.jedate{width:100%;}
        .jedate .jedate-header .ymbtn{display: inline}
        .jedate *{
            width: 100%;
            display: inline-block;
        }
        .jedate table thead, .jedate table td{width:100%;}
        .jedate .jedate-content .daystable td{width:calc(100% / 7);float:left;height: 35px}
        .jedate-footbtn{display: none}
        .jedate .jedate-content .daystable th{width:calc(100% / 7);float:left;}
        .jedate .jedate-content .daystable td.action, .jedate .jedate-content .daystable td.action:hover, .jedate .jedate-content .daystable td.action .lunar{
          background:none;
        }
        .jedate .jedate-content .daystable td .nolunar{
            line-height: 35px;
        }
        .normal.action .nolunar{
            border-radius: 50%;
            background: #c69c6d;
            color: #fff;
            width: 33px;
            height: 33px;
            display: inline-block;
        }
        .jedate .jedate-content .yeartable td, .jedate .jedate-content .monthtable td{
            width: calc(100% / 3);
            height: 53px;
            line-height: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
            float: left;
            font-size: 14px;
        }
        .jedate .jedate-content .yeartable td.action span, .jedate .jedate-content .monthtable td.action span, .jedate .jedate-content .yeartable td.action span:hover, .jedate .jedate-content .monthtable td.action span:hover{
            background: #c69c6d;
            color: #fff;
            border:1px solid #c69c6d;
        }
	</style>
</head>
<body >
<div class="apply-dix">
	<input id="chlickDay"type="hidden">
	<input id="minDay" type="hidden" value="<fmt:formatDate value="${activity.enrollTimeBegin}" pattern="yyyy-MM-dd "/>" >
	<input id="maxDate"type="hidden"value="<fmt:formatDate value="${activity.enrollTimeEnd}" pattern="yyyy-MM-dd "/>">
	<input id="activityId"type="hidden"value="${activity.id}">
	<input id="sessionsId"type="hidden" >
	<h4 class="detail-box-h4">基本信息填写</h4>
	<div class="apply-box">
		<div class="from-text clb">
			<i class="iconfont icon-yonghu"></i>
			<span>姓名</span>
			<input id="peopleName" type="text" class="">
		</div>
		<div class="from-text clb">
			<i class="iconfont icon-shouji" style="font-size: 22px;"></i>
			<span>手机</span>
			<input id="phone"  type="text" class="">
			<%--<a class="code-btn">获取验证码</a>--%>
		</div>
		<%--<div class="from-text clb">--%>
			<%--<i class="iconfont icon-yanzhengma2"></i>--%>
			<%--<span>验证码</span>--%>
			<%--<input type="text" class="">--%>
		<%--</div>--%>
	</div>
	<h4 class="detail-box-h4">活动日期选择</h4>
	<%--<div id='schedule-box' class="boxshaw apply-box select-activity" style="margin-bottom: 15px;"></div>--%>
    <div id="dateinfo" style="margin-bottom:20px;"></div>
	<h4 class="detail-box-h4">其他信息</h4>
	<div class="apply-box select-activity">
		<span class="check-box">选择场次</span>
		<ul class="time-period clb" id="activitySession">
		</ul>
		<span class="check-box">参与人数</span>
		<div class="number-box">
			<a class="add-btn" id="subtract"><i class="iconfont icon-jianhao"></i></a>
			<input id="peopleNumber"type="number" value="1" >
			<a class="add-btn" id="add"><i class="iconfont icon-jiahao"></i></a>
		</div>
	</div>
	<a class="detail-apply" onclick="submitInformation(${activity.id})">提交信息</a>
</div>
<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />
<script src="${ctxPath}/static/weixin/activity/activity_apply.js"></script>
<script type="text/javascript" src="${ctxPath}/static/weixin/jeDate/jedate.min.js"></script>
</body>
</html>

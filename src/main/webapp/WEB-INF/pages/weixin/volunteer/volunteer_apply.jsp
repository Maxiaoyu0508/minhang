<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!doctype html>
<html style="background: #ebebeb;height: 100%">
<head>
  <base href="${ctxPath}" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <title>闵行博物馆-志愿者招募</title>
  <jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
  <jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
  <meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
  <meta name="description" content="闵行博物馆"/>
  <link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/base.css">
  <link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/iconfont/iconfont.css">
  <style>
    *{box-sizing: border-box;}
    .volunteer .banner>img{width:100%;object-fit: cover;vertical-align: top;}
    .volunteer .form-img{width:90px;height:90px;margin:0 auto 30px;}
    .volunteer .form-img>img{width:100%;object-fit: cover;vertical-align: top;}
    .volunteer .form{padding:0 30px;margin-top:-90px;}
    .volunteer .form-item{width:100%;height:40px;margin-bottom:20px;border-radius:4px;overflow:hidden;}
    .volunteer .form-item .icon{background-color:#c69d6c;width:40px;height:40px;float:left;display:flex;justify-content: center;align-items: center;}
    .volunteer .form-item .icon>img{width:55%;}
    .volunteer .form-item .inp-wrap{position:relative;float:left;width:calc(100% - 40px);height:100%;}
    .volunteer .form-item .inp-wrap .inp{display:block;width:100%;height:100%;border:1px solid #c69d6c;
      border-bottom-right-radius:4px;border-top-right-radius:4px;padding-left:15px;font-size:16px;border-left:none;outline:none;}
    .volunteer .form-item .inp-wrap ::placeholder{color:#b4b4b5;}
    .volunteer .btn-wrap{width:100%;height:40px;margin:25px 0 30px;display:flex;flex-direction: row;align-items: center;justify-content: space-between;}
    .volunteer .btn-wrap .btn{text-decoration: none;width:100%;height:40px;font-size:19px;color:white;font-weight:400;letter-spacing:5px;padding:0;
      line-height:40px;background-color: #c69d6c;border-radius:3px;text-align: center;}
    .volunteer .vicon{position:absolute;right:15px;top:12px;width:15px;height:15px;color:#727171;}
  </style>
</head>
<body >
<div class="volunteer">
  <div class="banner"><img src="${ctxPath}/static/front/images/volunteer-03.jpg" alt=""></div>
  <form id="saveForm" action="${ctxPath}/front/wx/volunteer/saveWxVolunteer.htm" method="post" style="width:90%;margin:0 auto;position: relative;top: -100px;">
    <core:token/>
    <div class="form-img">
      <img src="${ctxPath}/static/front/images/volunteer-04.png" alt="">
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-05.png" alt="">
      </div>
      <div class="inp-wrap">
          <select id="regionId" name="condition.regionId" class="inp">
            <option value="">请选择类型</option>
            <c:forEach items="${typeList}" var="type">
              <option value="${type.id}">${type.name}</option>
            </c:forEach>
          </select>
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-06.png" alt="" >
      </div>
      <div class="inp-wrap">
        <input class="inp"  name="item.name" type="text" placeholder="姓名" >
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-15.png" alt="">
      </div>
      <div class="inp-wrap">
        <input id="idCard" class="inp" name="item.idCard" type="text" placeholder="身份证号" value="" onchange="checkIdCardFN(this.value)">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-07.png" alt="">
      </div>
      <div class="inp-wrap">
        <%--<input class="inp" type="text" placeholder="性别">--%>
        <select id="sex" class="inp"  name="item.sex">
          <option value="1">男</option>
          <option value="2">女</option>
        </select>
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-08.png" alt="">
      </div>
      <div class="inp-wrap">
        <input  id="age" class="inp" name="item.age" type="text" placeholder="年龄">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-09.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp"  name="item.education"  type="text" placeholder="学历">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-10.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp" name="item.school" type="text" placeholder="学校院系/工作单位">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-11.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp" name="item.job" type="text" placeholder="职务">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-12.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp" name="item.mobile" type="text" placeholder="联系电话">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-13.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp" name="item.address" type="text" placeholder="通讯地址">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-14.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp" name="item.email" type="text" placeholder="邮箱/微信">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-16.png" alt="">
      </div>
      <div class="inp-wrap">
        <select id="" name="condition.regionId" class="inp">
          <option value="">请选择语种</option>
          <c:forEach items="${languageList}" var="language">
            <option value="${language.id}">${language.name}</option>
          </c:forEach>
        </select>
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-17.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp" name="item.language" type="text" placeholder="熟练程度/语言等级">
      </div>
    </div>
    <div class="form-item">
      <div class="icon">
        <img src="${ctxPath}/static/front/images/volunteer-18.png" alt="">
      </div>
      <div class="inp-wrap">
        <input class="inp" name="item.servicrTime" type="text" placeholder="可提供服务时间">
      </div>
    </div>
    <div class="btn-wrap">
      <a onclick="saveWxVolunteer();" class="btn" href="javascript:;">提交</a>
    </div>
  </form>

</div>

<script type="text/javascript"></script>
<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
<script type="text/javascript" src="${ctxPath}/static/weixin/volunteer/volunteer_apply.js?v=${sysVersion}"></script>


</body>
</html>


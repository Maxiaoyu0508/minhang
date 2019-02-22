<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <base href="${ctxPath}" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>闵行博物馆</title>
    <meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
    <meta name="description" content="闵行博物馆"/>
    <style>
        *{margin:0;padding:0;}
        .container{width:1080px;height:1920px;position:relative;background:url("${ctxPath}/static/touch/images/v-home.png") no-repeat;background-size:100%;}
        .home-nav{width:130px;height:130px;position:absolute;top:1323px;}
        .nav-info{left:222px}
        .nav-nav{left:470px;}
        .nav-notice{left:740px}
    </style>
</head>
<body>
<div class="container">
    <a href="/vMenu.htm?key=0"><div class="home-nav nav-info"></div></a>
    <a href="/vMenu.htm?key=1"><div class="home-nav nav-nav"></div></a>
    <a href="/vMenu.htm?key=2"><div class="home-nav nav-notice"></div></a>
</div>
</body>
</html>

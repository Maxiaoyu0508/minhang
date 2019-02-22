<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>闵行博物馆-首页</title>
</head>
<body>
<div class="container">
    <a href="/menu.htm?key=0">
        <div class="nav nav-info"></div>
    </a>
    <a href="/menu.htm?key=1">
        <div class="nav nav-hall"></div>
    </a>
    <a href="/menu.htm?key=2">
        <div class="nav nav-notice"></div>
    </a>
    <a href="/menu.htm?key=3">
        <div class="nav nav-msg"></div>
    </a>
</div>
</body>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .container {
        width: 1920px;
        height: 1080px;
        background: url("${ctxPath}/static/touch/images/home-bg.png") no-repeat;
        background-size: 100%;
        position: relative;
    }

    .container div {
        width: 204px;
        height: 204px;
        border-radius: 200px;
        position: absolute;
    }

    .nav-info {
        top: 621px;
        left: 257px;
    }

    .nav-hall {
        top: 680px;
        left: 530px;
    }

    .nav-notice {
        top: 680px;
        left: 1165px;
    }

    .nav-msg {
        top: 621px;
        left: 1427px;
    }

</style>
</html>

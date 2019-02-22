<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!doctype html >
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>${projectName} - 会员中心 - 登录</title>
		<script type="text/javascript">
			if(typeof top.checkFrame == "function"){
				top.location.href = "${ctxPath}/member/login.htm";
			}
			var basePath = "${ctxPath}";
		</script>
		<link rel="shortcut icon" href="${ctxPath}/favicon.ico" /> 
		<link rel="stylesheet" type="text/css" href="${ctxPath}/static/base/base.css?v=${sysVersion}" />
		<link rel="stylesheet" type="text/css" href="${ctxPath}/static/base/lib/loadmask/jquery.loadmask.css?v=${sysVersion}" />
		<link rel="stylesheet" type="text/css" href="${ctxPath}/static/member/login/login.css?v=${sysVersion}" />
		<link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
		<link href="//cdn.bootcss.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" rel="stylesheet">
		<style>.footer-bottom-cont a:hover{color:#fff;}</style>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/jquery-1.12.0.min.js?v=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/loadmask/jquery.loadmask.js?v=${sysVersion}" ></script>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/artdialog/jquery.artDialog.source.js?v=${sysVersion}&skin=default"></script>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/artdialog/plugins/iframeTools.source.js?v=${sysVersion}"></script>
		<style>
			html{
				background:url("${ctxPath}/static/member/login/images/login-bg.jpg");
				width:100%;
				height:100%;
				overflow:hidden;
			}
		</style>
	</head>
	<body style="background:none">
		<!-- Top content -->
        <div class="top-content">
            <div class="inner-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8 col-sm-offset-2 text">
                            <h1><strong>Member System</strong> Sign In</h1>
                            <div class="description">
                            	<p>
	                            	数字生活改变世界，科技创新引领未来。
                            	</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                        	<div class="form-top">
                        		<div class="form-top-left">
                        			<h3>${projectName}</h3>
                            		<p>请输入您的用户名和密码登录</p>
                        		</div>
                        		<div class="form-top-right">
                        			<i class="fa fa-key"></i>
                        		</div>
                            </div>
                            <div class="form-bottom">
                           		<form id="loginForm">
			                    	<div class="form-group">
			                    		<label class="sr-only" for="form-username">用户名</label>
			                        	<input id="j_username" name="p1" placeholder="用户名" onkeypress="if(event.keyCode == 13){login();return false;}" autocomplete="off" type="text" class="form-username form-control" >
			                        </div>
			                        <div class="form-group">
			                        	<label class="sr-only" for="form-password">密码</label>
			                        	<input  id="j_password" name="p2" placeholder="密码" onkeypress="if(event.keyCode == 13){login();return false;}" autocomplete="off" type="password" class="form-password form-control" >
			                        </div>
			                        <button type="submit" class="btn btn-success"  onclick="javascript:login();return false;" title="登录">登录</button>
			                    </form>
		                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p style="color:#999;font-size:12px;">©2015 - 2020 ${projectCompany}所有版权 </p>
		
		
	</body>
	<script type="text/javascript" src="${ctxPath}/static/member/login/login.js?v=${sysVersion}"></script>
</html>
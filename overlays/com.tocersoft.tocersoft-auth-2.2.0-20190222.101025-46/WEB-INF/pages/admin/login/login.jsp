<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html >
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>${projectName} - 登录</title>
		<script type="text/javascript">
			if(typeof top.checkFrame == "function"){
				top.location.href = "${ctxPath}/admin/login.htm";
			}
			var basePath = "${ctxPath}";
		</script>
		<link rel="shortcut icon" href="${ctxPath}/favicon.ico" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<link rel="stylesheet" type="text/css" href="${ctxPath}/static/base/lib/iconfont/iconfont.css?t=${sysVersion}" />
		<link rel="stylesheet" type="text/css" href="${ctxPath}/static/base/lib/loadmask/jquery.loadmask.css?v=${sysVersion}" />
		<link rel="stylesheet" type="text/css" href="${ctxPath}/static/admin/login/login.css?v=${sysVersion}" />
		<link rel="stylesheet" type="text/css" href="${ctxPath}/static/base/lib/bootstrap/bootstrap.min.css?v=${sysVersion}" />
		<script type="text/javascript" src="${ctxPath}/static/base/lib/loadmask/jquery.loadmask.js?v=${sysVersion}" ></script>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/artdialog/jquery.artDialog.source.js?v=${sysVersion}&skin=default"></script>
		<script type="text/javascript" src="${ctxPath}/static/base/lib/artdialog/plugins/iframeTools.source.js?v=${sysVersion}"></script>
        <script type="text/javascript" src="${ctxPath}/static/base/lib/rsa/bigint.js?v=${sysVersion}"></script>
        <script type="text/javascript" src="${ctxPath}/static/base/lib/rsa/rsa.js?v=${sysVersion}"></script>
        <script type="text/javascript" src="${ctxPath}/static/base/lib/rsa/barrett.js?v=${sysVersion}"></script>
		<script type="text/javascript" src="${ctxPath}/static/admin/base/common.js?t=${sysVersion}"></script>
		<style>
			html{background:url("${ctxPath}/static/admin/login/images/login-bg.jpg");width:100%;height:100%;overflow:hidden}
			.form-control{height:34px;box-sizing:border-box}
			.btn-success{color:#fff;background-color:#5cb85c;border-color:#5cb85c}
			.btn{height:35px;box-sizing:border-box;display:inline-block;padding:.375rem 1rem;font-size:14px;font-weight:400;line-height:1.5;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;border-radius:.25rem}
			.btn-success:hover{color:#fff;background-color:#449d44;border-color:#419641}
			h3{font-size:28px;font-weight:normal}
			.form-group{margin-bottom:1rem}
			@media(min-width:1200px){
				.container{
				    width:1000px;
				}
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
                            <h1><strong>Admin System</strong> Sign In</h1>
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
                        		<%--<div class="form-top-right">
                        			<i class="fa fa-key"></i>
                        		</div>--%>
                            </div>
                            <div class="form-bottom">
                           		<form id="loginForm">
			                    	<div class="form-group">
			                    		<label class="sr-only" for="form-username">用户名</label>
			                        	<input id="j_username" name="p1" placeholder="用户名" onkeypress="if(event.keyCode == 13){login();return false;}" autocomplete="off" type="text" class="form-username form-control" maxlength="20">
			                        </div>
			                        <div class="form-group">
			                        	<label class="sr-only" for="form-password">密码</label>
			                        	<input  id="j_password" name="p2" placeholder="密码" onkeypress="if(event.keyCode == 13){login();return false;}" autocomplete="off" type="password" class="form-password form-control" maxlength="20">
			                        </div>
                              <c:if test="${runMode == 'saas' || runMode == 'SAAS'}">
                              <div class="form-group">
                                  <label class="sr-only" for="form-entcode">企业代码</label>
                                  <input  id="j_entcode" name="p3" placeholder="企业代码" onkeypress="if(event.keyCode == 13){login();return false;}" autocomplete="off" type="text" class="form-password form-control" >
                              </div>
                              </c:if>
                              <button type="submit" class="btn btn-success"  onclick="javascript:login();return false;" title="登录">登录</button>
			                    </form>
		                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
        <script type="text/javascript">
          setMaxDigits(130);
          var RSAKey = new RSAKeyPair("${rsaKeyMap.exponent}", "", "${rsaKeyMap.modulus}");
          var runMode = '${runMode}';
        </script>
		<script type="text/javascript" src="${ctxPath}/static/admin/login/login.js?v=${sysVersion}"></script>
	</body>
</html>
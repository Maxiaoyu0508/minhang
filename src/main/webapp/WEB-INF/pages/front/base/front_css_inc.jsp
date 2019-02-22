<%@ page language="java" pageEncoding="UTF-8"%>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8;">
<link rel="shortcut icon" type="image/x-icon">
<link href="${ctxPath}/static/base/base.css" rel="stylesheet" />
<link href="${ctxPath}/static/front/base/iconfont/iconfont.css" rel="stylesheet" />
<link href="${ctxPath}/static/front/base/common.css" rel="stylesheet" />
<script src="${ctxPath}/static/base/lib/jquery-1.12.0.js"></script>

<script>
	var basePath = '${ctxPath}';
	var base = '${ctxPath}';
	var domPath = '${domPath}';
	//var uploadPublicRoot = '${sysUploadSet.publicRoot}';
	var fileRoot = '${fileRoot}';
</script>
<script>
//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?152d97d8a87f900c2cf3474bd528776a";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//判断IE版本
function cheackIE(){
	var appName = navigator.appName,
	userAgent = navigator.userAgent,
	version;
	if(appName == 'Microsoft Internet Explorer'){
		version = /MSIE\s(\S)/.exec(userAgent)[1];
		versionfloat = parseFloat(version);
		return versionfloat;
	}
	return null;
}
</script>

<%-- <style  type="text/css">
.snow-canvas{display:block;width:100%;height:100%;top:0;left:0;position:fixed;pointer-events:none;z-index:99999}
@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){.snow-canvas{display:none}}
</style>
<!--[if IE]>
<style type="text/css">
.snow-canvas {display: none;}
</style>
<![endif]-->
雪花canvas
<jsp:include page="/WEB-INF/pages/front/test/xh_canvas.jsp"></jsp:include>
雪花canvas end --%>
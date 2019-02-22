<%@ page language="java" pageEncoding="UTF-8"%>
<meta http-equiv="X-UA-Compatible" content="edge" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/bootstrap/bootstrap.min.css?t=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/bootstrap/bootstrap-select.css?t=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/base.css?t=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/jqgrid/css/ui.jqgrid.tocer.css?t=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/loadmask/jquery.loadmask.css" rel="stylesheet" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/ztree/css/zTreeStyle/zTreeStyle.css?v=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/chosen/chosen.min.css?v=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/iconfont/iconfont.css?v=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/ui_tag/ui_tag.css?v=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/spliter/spliter.css?v=${sysVersion}" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/icheck-1.x/skins/flat/blue.css?v=${sysVersion}">
<link rel="stylesheet" href="${ctxPath}/static/admin/base/admin_common.css?t=${sysVersion}" />
<%--<link id="skin" rel="stylesheet" href="" />--%>
<!-- <link rel="stylesheet" href="${ctxPath}/static/admin/base/admin_form_skin.css?t=${sysVersion}" /> -->
<script type="text/javascript" src="${ctxPath}/static/base/lib/jquery-1.12.0.min.js?v=${sysVersion}"></script>
<script type="text/javascript">
	var basePath = '${ctxPath}';
	var fileRoot = '${fileRoot}';
	var uploadType = '${uploadType}';
	var aliyunOssFileAccessUrl = '${aliyunOssFileAccessUrl}';
	// $(function(){
	//   //如果cookie不为空的时候就读取cookie的路径
	//   if($.cookie("css_skin")!=null)
	//   {
	//   	$('#skin').attr('href',$.cookie("css_skin"));
	//   }
	// })
</script>
<audio id="notifySound" src="${ctxPath}/static/base/lib/artdialog/plugins/notify.mp3" hidden="true"></audio>
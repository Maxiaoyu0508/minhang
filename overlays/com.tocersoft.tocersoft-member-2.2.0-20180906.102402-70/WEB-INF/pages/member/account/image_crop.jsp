<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link href="${ctxPath}/static/base/base.css" rel="stylesheet" />
<link rel="stylesheet" href="${ctxPath}/static/base/lib/jcrop/jquery.Jcrop.css" />
<style>
html{background-color:#fff;}
.msg-box-content{background:#ffffff none repeat scroll 0 0;border-radius:3px;min-height:300px;padding:20px;position:fixed;width:800px;z-index:1500;}
.tip-gray{color:#999;display:inline;font-size:14px;height:30px;line-height:30px;padding-left:10px}
.ui-input-text-h25{border:1px solid #aaa;height:30px;line-height:30px;margin:0;padding-left:5px}
.white_button{background:pink;color:#333;height:24px;line-height:24px;overflow:hidden;position:relative}
.default-pic-line{float:left;height:300px;width:300px}
.default-pic{border:1px solid #a3a3a3;height:300px;overflow:hidden;width:300px;display:table-cell;vertical-align:middle;text-align:center}
.default-pic img{max-height:300px;max-width:300px;vertical-align:middle;text-align:center;margin:0 auto !important;display:table-cell}
.jcrop-holder{margin:0 auto !important}
.middle-line{float:left;height:280px;margin-left:50px;margin-top:20px;width:100px}
.ui-input-text-h25{border:1px solid #aaa;height:30px;line-height:30px;margin:0;padding-left:5px}
.white_button{background:url("${ctxPath}/static/member/base/images/37bg.png");color:#333;height:24px;line-height:24px;overflow:hidden;position:relative;display:block}
.input_f{border:0 none;cursor:pointer;font:12px/27 Microsoft Yahei;height:27px;left:0px;top:0px;filter:alpha(opacity =   0);-moz-opacity:0;-khtml-opacity:0;opacity:0;position:absolute;width:70px;height:30px}
.scl-tpsc-btn{background-color:#ff5a5f;border-radius:4px;color:#fff;font-size:12px;margin-left:10px;padding:2px 15px}
.marketing-btn{background-color:#ff5a5f ;border-radius:3px;bottom:50px;color:white;display:inline-block;height:32px;line-height:32px;min-width:80px;padding:0 35px;position:absolute;right:55px;text-align:center;text-decoration:none;}
.marketing-btn:hover{background:#f95459 none repeat scroll 0 0}
.big-headpic{border:1px solid #a3a3a3;height:180px;overflow:hidden;width:180px}
.middle-headpic{border:1px solid #a3a3a3;height:90px;overflow:hidden;width:90px}
.small-headpic{border:1px solid #a3a3a3;height:45px;overflow:hidden;width:45px}
</style>
<jsp:include page="/WEB-INF/pages/front/base/inc_front_css.jsp" />

<script src="${ctxPath}/static/base/lib/artdialog/jquery.artDialog.source.js"></script>
<script src="${ctxPath}/static/base/lib/artdialog/plugins/iframeTools.source.js"></script>
<div class="msg-box-content" style="height: 460px;" id="portrait-upload-div">
	<div class="clb mb10">
		<div class="fl mbs-font f18">头像图片</div>
	</div>
	<form id="imageCropForm" action="${ctxPath}/member/account/save_face_photo.htm" method="post" enctype="multipart/form-data">
		<input id="x3" name="x" type="hidden" size="4"/>
		<input id="y3" name="y" type="hidden" size="4"/>
		<input id="w3" name="w" type="hidden" size="4"/>
		<input id="h3" name="h" type="hidden" size="4"/>
		<input id="width" name="width" type="hidden">
		<input id="height" name="height" type="hidden">
		<input id="broundX" name="broundX" type="hidden">
		<input id="broundY" name="broundY" type="hidden">
		
		<div class="f14 mt15">
			选择要上传的头像图片：
			<span class="tip-gray">（最大为2MB,300px X 300px）</span>
		</div>
		<div class="mt10 clb">
			<div style="float:left;">
				<input id="photo3" name="photo" type="hidden" value="">
				<input id="fileFieldText3" type="text"  class="ui-input-text-h25 w300 vm" readonly="readonly" />
			</div>
			<div style="float:left;overflow:hidden;">
				<a class="ml5 scl-tpsc-btn" style="position:relative;width:70px;height:30px;display:block;line-height:30px;text-align:center;padding:0px;">
				<input id="imageFile3" name="uploadFile" type="file" class="input_f" maxSize="2097152" onchange="doFileUploadTx(this,event)" />上传图片</a>
			</div>
		</div>
		<div class="clb">
		<%-- 默认图片 --%>
		<div class="default-pic-line mt20">
			<div class="default-pic">
				<img id="fileChecker" src="${ctxPath}/static/base/lib/jcrop/images/defualt_Jcrop.png"/>
			</div>
		</div>
		<%-- 大尺寸 --%>
		<div class="fl mt20 ml30">
			<div class="big-headpic">
				<img id="fileChecker_big" src="${ctxPath}/static/base/lib/jcrop/images/defualt_Jcrop.png"/>
			</div>
			<p id="bigTip" class="f12 mt10 tc color666" style="width:100%;">
				180*180
			</p>
		</div>
		<%-- 中尺寸 --%>
		<div class="fl mt20 ml30">
			<div class="middle-headpic">
				<img id="fileChecker_middle" src="${ctxPath}/static/base/lib/jcrop/images/defualt_Jcrop.png"/>
			</div>
			<p id="midTip" class="f12 mt10 tc color666" style="width:100%;">
				90*90
			</p>
		</div>
		<%-- 小尺寸 --%>
		<div class="fl mt20 ml30">
			<div class="small-headpic">
				<img id="fileChecker_small" src="${ctxPath}/static/base/lib/jcrop/images/defualt_Jcrop.png"/>
			</div>
			<p id="smallTip" class="f12 mt10 tc color666" style="width:100%;">
				45*45
			</p>
		</div>
		<a href="javascript:void(0)" class="marketing-btn size14" onclick="formPhoto3Submit();return false;" >保存设置</a>
	</form>
	</div>
</div>
<script type="text/javascript">
	var screenShotWidth = ${postData.screenShotWidth};
	var screenShotHeight = ${postData.screenShotHeight};
	var screenShotX = ${postData.screenShotX};
	var screenShotY = ${postData.screenShotY};
	var photoWidth = ${postData.photoWidth};
	var photoHeight = ${postData.photoHeight};
</script>
<script src="${ctxPath}/static/base/lib/loadmask/jquery.loadmask.min.js?v=${sysVersion}" type="text/javascript"></script>
<script src="${ctxPath}/static/base/lib/jcrop/jquery.Jcrop.min.js"></script>
<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
<script src="${ctxPath}/static/base/lib/jcrop/image_crop.js"></script>
<script src="${ctxPath}/static/base/lib/jquery.form.3.5.js"></script>

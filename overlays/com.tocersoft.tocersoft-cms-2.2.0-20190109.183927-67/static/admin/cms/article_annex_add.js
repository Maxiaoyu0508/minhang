$(document).ready(function(){
	// 验证表单
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#imgPath").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"上传的图片不能为空"});
	
	$('#cancelBtn').on('click',function(){
		$.dialog.close();
	});
	
	$('#saveBtn').on('click',save);
	
});

// 保存广告图片
function save(){
	var result = $.formValidator.pageIsValid("1");	// 手动调用验证框架进行验证
	if(!result){
		return;
	}
	var imgName2 = $('#imgName2').val();
	if(imgName2 == 'coverName'){
		$.dialog.alert('请上传一张封面图片');
		return;
	}
	
	$("body",parent.document).mask("正在处理，请稍候...");
	var itemId  = $("#itemId").val();
   	if(null != itemId && "" != itemId){
   		$('#advPhotoForm').attr('action',basePath+'/admin/cms/article/to_update_article_annex.htm');
   		formSubmit();
   	}else{
   		formSubmit()
   	}
}

function formSubmit(){
	$('#advPhotoForm').ajaxSubmit(function(data){
		$("body",parent.document).unmask();
		var win = $.dialog.open.origin;
		win.loadAdvPhotos();
		$.dialog.close();
	});
}

/**
 * 文件上传 - 公开私有模式 - HTTP
 */
function doUploadFileForHere(fileId, showImg, imgPath, fileName){
	if(typeof fileId == 'undefined' || !fileId){
		fileId = 'fileInput';
	}
	if(typeof showImg == 'undefined' || !showImg){
		showImg = 'showImg';
	}
	if(typeof imgPath == 'undefined' || !imgPath){
		imgPath = 'imgPath';
	}
	if(typeof fileName == 'undefined' || !fileName){
		fileName = 'fileName';
	}
	
	/*var file = $("#" + fileId).val();
	var fileSuffix = file.substring(file.lastIndexOf(".") + 1).toLowerCase();
	var fileSuffixStr = "jpeg,pjpeg,gif,bmp,x-ms-bmp,png,x-png,jpg";
	if(fileSuffixStr.indexOf(fileSuffix)==-1){
		$.dialog.alert("上传的图片格式不正确");
		return;
	}*/
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",parent.document).mask("正在保存，请稍候...");
	$.ajaxFileUpload({
		url:basePath+'/uploadPublicFileByHttp.htm',//用于文件上传的服务器端请求地址
		secureuri:false,//一般设置为false
		fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			// 回调函数中去除遮罩
			$("body",parent.document).unmask();
			if(data.status == 'success'){
				$("#filePath").val(data.path);
				$("#uploadFileNameSpan").text(data.fileName);
				$("#uploadFileName").val(data.fileName);
			}else{
				$.dialog.alert(data.message);
			}
		},
		error: function (data, status, e){//服务器响应失败处理函数
			$.dialog.alert(data.message);
		}
	});
}

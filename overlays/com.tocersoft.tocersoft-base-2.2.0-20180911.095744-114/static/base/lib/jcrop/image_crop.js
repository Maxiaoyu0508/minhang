var jcrop_api3, boundx3, boundy3;
var photoIndex="";
$(document).ready(function(){
	ininAjaxFormTx();
	$(".add-portrait-pic").click(function(){
		 /*$("#portrait-upload-div").mCustomScrollbar({scrollButtons:{enable:true}});*/
		$("body").css("overflow","hidden");
		$("#portrait-upload-div").show();
		editPhoto2("");
	});
	$(".mcl-tcc-close-btn").click(function(){
		$(".default-pic").html("<img id='fileChecker'  src='${ctxPath}/static/base/lib/jcrop/images/defualt_Jcrop.png'/>");
		$("body").css("overflow","");
		$("#portrait-upload-div").hide();
	});
	// 为文件上传控件进行样式伪装
	$("#imageFile3").bind({
		change : function() {
			$("#fileFieldText3").val($(this).val());
		}
	});
	initPhoto3();
	initImgSize();
});
/**
 * 初始化大小
 */
function initImgSize(){
	
	$("#fileChecker_big").width(photoWidth).height(photoHeight);
	$("#fileChecker_mid").width(photoWidth/2).height(photoHeight/2);
	$("#fileChecker_small").width(photoWidth/4).height(photoHeight/4);
	
	$("#big-headpic").width(photoWidth).height(photoHeight);
	$("#mid-headpic").width(photoWidth/2).height(photoHeight/2);
	$("#small-headpic").width(photoWidth/4).height(photoHeight/4);
	
	$("#bigTip").text(photoWidth + "*" + photoHeight);
	$("#midTip").text(Number(photoWidth/2) + "*" + Number(photoHeight / 2));
	$("#smallTip").text(Number(photoWidth/4) + "*" + Number(photoHeight/4));
}
function editPhoto2(index){
	if(null!=index && index!="" ){
		photoIndex=index;
		flag=true;
	}
	$("#fileChecker").prop("src",base+"/static/base/lib/jcrop/images/defualt_Jcrop.png");
	$("#fileChecker_big").prop("src",base+"/static/base/lib/jcrop/images/defualt_Jcrop.png");
	$("#fileChecker_middle").prop("src",base+"/static/base/lib/jcrop/images/defualt_Jcrop.png");
	$("#fileChecker_small").prop("src",base+"/static/base/lib/jcrop/images/defualt_Jcrop.png");
	$("body").css("overflow","hidden");
	$("#portrait-upload-div").show();
	$(".msg-box").show();
	initPhoto3();
}

function formPhoto3Submit(){
	$("body").css("overflow","");
	var photo=$("#photo3").val();
	var x=$("#x3").val();
	var y=$("#y3").val();
	var w=$("#w3").val();
	var h=$("#h3").val();
	if(null == photo || photo == ''){
		$.dialog.alert("请上传图片");
		return;
	}
	if(null==x||x==''){
		$.dialog.alert("请裁剪图片");
		return;
	}
	if(null==y||y==''){
		$.dialog.alert("请裁剪图片");
		return;
	}
	if(null==w||w==''){
		$.dialog.alert("请裁剪图片");
		return;
	}
	if(null==h||h==''){
		$.dialog.alert("请裁剪图片");
		return;
	}
	$("#imageCropForm").submit();
}

function ininAjaxFormTx(){
	//表单提交
	$("#imageCropForm").ajaxForm({
		dataType: 'json',
		success: function(data){
			if(data.status == "success"){
				$("#brandTx").attr("src",data.message);
				$.dialog.alert("裁剪图片成功!");
				//用于单图上传后的回掉
				$.dialog.data("singPhotoPath",data.message);
				var win = $.dialog.open.origin;
				win.updatePhotoPath(data.message);
				$.dialog.close();
			}else{
				$.dialog.alert("裁剪失败");
			}
		},
		error:function(data){
			$("body",parent.document).unmask();
			$.dialog.alert(data.message);
		}
	});
}

function initPhoto3() {
	$('#fileChecker').data('Jcrop',null);
	$('#fileChecker').show();
	$('#fileChecker').parent().children('div').remove();
	$('#fileChecker').Jcrop({
		onChange : updatePreviewTx,
		onSelect : updatePreviewTx,
		aspectRatio : photoWidth / photoHeight,
		cornerHandles:true,
	}, function() {
		var bounds = this.getBounds();
		boundx3 = bounds[0];
		boundy3 = bounds[1];
		jcrop_api3 = this;
		jcrop_api3.animateTo([screenShotX, screenShotY, screenShotWidth, screenShotHeight]);
		jcrop_api3.focus();
	});
}
function updatePreviewTx(c) {
	$('#x3').val(c.x);
	$('#y3').val(c.y);
	$('#w3').val(c.w);
	$('#h3').val(c.h);
	$("#width").val(photoWidth);
	$("#height").val(photoHeight);
	$("#broundX").val(boundx3);
	$("#broundY").val(boundy3);
	if (parseInt(c.w) > 0) {
		var big_rx = photoWidth / c.w;
		var big_ry = photoHeight / c.h;
		$('#fileChecker_big').css({
			width : Math.round(big_rx * boundx3) + 'px',
			height : Math.round(big_ry * boundy3) + 'px',
			marginLeft : '-' + Math.round(big_rx * c.x) + 'px',
			marginTop : '-' + Math.round(big_ry * c.y) + 'px'
		});
		var middle_rx = (photoWidth / 2) / c.w;
		var middle_ry = (photoHeight / 2) / c.h;
		$('#fileChecker_middle').css({
			width : Math.round(middle_rx * boundx3) + 'px',
			height : Math.round(middle_ry * boundy3) + 'px',
			marginLeft : '-' + Math.round(middle_rx * c.x) + 'px',
			marginTop : '-' + Math.round(middle_ry * c.y) + 'px'
		});
		var small_rx = (photoWidth / 4) / c.w;
		var small_ry = (photoHeight / 4) / c.h;
		$('#fileChecker_small').css({
			width : Math.round(small_rx * boundx3) + 'px',
			height : Math.round(small_ry * boundy3) + 'px',
			marginLeft : '-' + Math.round(small_rx * c.x) + 'px',
			marginTop : '-' + Math.round(small_ry * c.y) + 'px'
		});
	}
};


/** 图片上传 */
function doFileUploadTx(obj,event) {
	var file = $(obj).val();
	var maxSize = $(obj).attr("maxSize");
	
	if(typeof event.target.files !="underfined"){
		var files = event.target.files;
		if(files[0].size > maxSize){
			$.dialog.alert('你上传的图片过大,请重新选择！');
		}
	}
	var ext = file.substring(file.lastIndexOf(".")).toLocaleLowerCase();
	
	if (null == file || file == "") {
		$.dialog.alert('请选择要上传的图片！');
		
	} else if (ext != ".gif" && ext != ".jpg" && ext != ".jpeg" && ext != ".png" && ext != ".bmp") {
		$.dialog.alert('只支持.gif/.jpg/.jpeg/.png/.bmp格式');
		
	} else {
		$.ajaxFileUpload({
			url:basePath + '/uploadPublicFileByHttp.htm',// 用于文件上传的服务器端请求地址
			secureuri:false,// 一般设置为false
			fileElementId:'imageFile3',// 文件上传空间的id属性 <input type="file" id="file" name="file" />
			dataType: 'json',// 返回值类型 一般设置为json
			success: function (data, status){ // 服务器成功响应处理函数
				if(data.status == 'success'){
					if(typeof uploadType != 'undefined' && uploadType == 'oss'){
						$('#fileChecker').prop('src',aliyunOssFileAccessUrl+data.ossFileKey);
						$('#fileChecker_big').prop('src',aliyunOssFileAccessUrl+data.ossFileKey);
						$('#fileChecker_middle').prop('src',aliyunOssFileAccessUrl+data.ossFileKey);
						$('#fileChecker_small').prop('src',aliyunOssFileAccessUrl+data.ossFileKey);
						$("#photo3").val(data.path);
					}else{
						$('#fileChecker').prop('src',basePath+fileRoot+data.path);
						$('#fileChecker_big').prop('src',basePath+fileRoot+data.path);
						$('#fileChecker_middle').prop('src',basePath+fileRoot+data.path);
						$('#fileChecker_small').prop('src',basePath+fileRoot+data.path);
						$("#photo3").val(data.path);
					}
					initPhoto3();
					$('#fileChecker').css({"width":"auto","height":"auto"});
				}else{
					$.dialog.alert(data.message);
				}
			},
			error: function (data, status, e){// 服务器响应失败处理函数
				$.dialog.alert("error:"+data.message);
			}
		});
		return false;
	}
}



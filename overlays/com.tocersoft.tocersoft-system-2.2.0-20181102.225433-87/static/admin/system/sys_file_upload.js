var objectIdGlobal, objectTypeGlobal, incDomIdGlobal;
$(document).ready(function(){
	initOper();
});

/**
 * 适用于多图上传与展示，存入sys_upload_file表
 */
function initOper(){
	// 点击图片中的删除按钮
	$(document).on("click",".J-ap-remove",function(){
		var id = $(this).attr('data');
		removeSysPhoto(id);
	});
}

function listUploadPhoto(objectId, objectType, incDomId){
	objectIdGlobal = objectId;
	objectTypeGlobal = objectType;
	incDomIdGlobal = incDomId;
	$.post(basePath+'/admin/upload/list.htm',{'objectId':objectId, 'objectType':objectType, 'location':1},function(data){
		$('#'+incDomId).html(data);
	});
}

function doUploadPhotoSave(i){
	
	var fileId = 'fileInput';
	var filePath = 'filePath';
	var uploadFileNameSpan = 'uploadFileNameSpan';
	var uploadFileName = 'uploadFileName';

	if(typeof i == 'undefined'){
		
	}else{
		fileId = 'fileInput_' + i;
		filePath = 'filePath_' + i;
		uploadFileNameSpan = 'uploadFileNameSpan_' + i;
		uploadFileName = 'uploadFileName_' + i;
	}
	// 判断上传格式是否正确
	var file = $("#" + fileId).val();
	var fileSuffix = file.substring(file.lastIndexOf(".") + 1).toLowerCase();
	var fileSuffixStr = "jpeg,pjpeg,gif,bmp,x-ms-bmp,png,x-png,jpg";
	if(fileSuffixStr.indexOf(fileSuffix)==-1){
		$.dialog.alert("上传的图片格式不正确");
		return;
	}
	
	var url = '';
	if(i > 0){
		url = $("#"+filePath).val();
	}
	
	$.ajaxFileUpload({
		url:basePath+'/uploadPhotoSave.htm',//用于文件上传的服务器端请求地址
		data:{
			"objectId":objectIdGlobal,
			"objectType":objectTypeGlobal,
			"url":url,
			"location":1 // 表示存放的是图片位置
		},
		secureuri:false,//一般设置为false
		fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			if(data.status == 'success'){
				listUploadPhoto(objectIdGlobal, objectTypeGlobal, incDomIdGlobal);
			}else{
				$.dialog.alert(data.message);
			}
		},
		error: function (data, status, e){//服务器响应失败处理函数
			$.dialog.alert(data.message);
		}
	});
	return false;
}

//删除广告图
function removeSysPhoto(id){
	$.dialog.confirm("确认要删除吗？",function(){
		$.post(basePath+'/admin/upload/del.htm?m='+Math.random(),{"selIds":id},function(data){
			listUploadPhoto(objectIdGlobal, objectTypeGlobal, incDomIdGlobal);
		});
	});
}

/**
 * 适用于多文件上传与列表展示，存入sys_upload_file表
 */
function uploadFileSave(fileId, objectId, objectType, location){
	
	if(typeof fileId == 'undefined' || !fileId){
		fileId = 'fileInput';
	}

	$.ajaxFileUpload({
		url:basePath+'/uploadPhotoSave.htm',//用于文件上传的服务器端请求地址
		data:{
			"objectId":objectId,
			"objectType":objectType,
			"location":location // 表示存放的是文件位置
		},
		secureuri:false,//一般设置为false
		fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			if(data.status == 'success'){
				$('#gridFile').setGridParam({
					datatype:'json'
				}).trigger('reloadGrid',[{page:1}]);
			}else{
				$.dialog.alert(data.message);
			}
		},
		error: function (data, status, e){//服务器响应失败处理函数
			$.dialog.alert(data.message);
		}
	});
	return false;
}

function removeSysFile(id){
	$.dialog.confirm("确认要删除吗？",function(){
		$.post(basePath+'/admin/upload/del.htm?m='+Math.random(),{"selIds":id},function(data){
			$('#gridFile').setGridParam({
				datatype:'json'
			}).trigger('reloadGrid',[{page:1}]);
		});
	});
}


/**
 * 下载阿里云OSS文件
 * @param ossFileKey
 * @param authType
 */
function downloadFileOss(ossFileKey,authType){
	window.location.href=basePath+"/downloadFileOss.htm?ossFileKey=" + ossFileKey + "&ossFileAuthType="+authType;
}
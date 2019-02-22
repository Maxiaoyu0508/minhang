/**
 * 文件上传 - 公开私有模式 - HTTP
 */
function doUploadFile(fileId, showImg, imgPath, fileName){
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
	
	if(uploadType != undefined && uploadType == 'oss'){
		$.ajaxFileUpload({
			url:basePath+"/uploadPublicFileByHttp.htm",//用于文件上传的服务器端请求地址
			secureuri:false,//一般设置为false
			fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
			dataType: 'json',//返回值类型一般设置为json
			success: function (data, status){ //服务器成功响应处理函数
				if(data.status == 'success'){
					var imgSrc = aliyunOssFileAccessUrl + data.ossFileKey;
					var image  = ('#' + showImg);
					/*
					if(image != undefined){
						if(imgSrc != ""){
							var imgArray = imgSrc.split(".");
							var fileSuffix = imgSrc.split(".")[imgArray.length-1].toLowerCase();
							var fileSuffixStr = "jpeg,pjpeg,gif,bmp,x-ms-bmp,png,x-png,jpg";
							if(fileSuffixStr.indexOf(fileSuffix)==-1){
								$.dialog.alert("上传的图片格式不正确");
								return;
							}
						}
					}
					*/
					$("#" + imgPath).val(data.ossFileKey);
					//公开文件
					$('#' + showImg).attr('src',imgSrc);
					$("#" + fileName).val(data.fileName);
					$("#" + fileName + "Show").html(data.fileName);
				}else{
					$.dialog.alert(data.message);
				}
			},
			error: function (data, status, e){//服务器响应失败处理函数
				$.dialog.alert(data.message);
			}
		});
	}else{
		$.ajaxFileUpload({
			url:basePath+'/uploadPublicFileByHttp.htm',//用于文件上传的服务器端请求地址
			secureuri:false,//一般设置为false
			fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
			dataType: 'json',//返回值类型一般设置为json
			success: function (data, status){ //服务器成功响应处理函数
				if(data.status == 'success'){
					var image  = ('#' + showImg);
					var imgSrc = data.path;
					/*
					if(image != undefined){
						if(imgSrc != ""){
							var fileSuffix = imgSrc.split(".")[1].toLowerCase();
							var fileSuffixStr = "jpeg,pjpeg,gif,bmp,x-ms-bmp,png,x-png,jpg";
							if(fileSuffixStr.indexOf(fileSuffix)==-1){
								$.dialog.alert("上传的图片格式不正确");
								return;
							}
						}
					}
					*/
					$("#" + imgPath).val(data.path);
					$('#' + showImg).attr('src',basePath + fileRoot + data.path);
					$("#" + fileName).val(data.fileName);
					$("#" + fileName + "Show").html(data.fileName);
					
				}else{
					$.dialog.alert(data.message);
				}
			},
			error: function (data, status, e){//服务器响应失败处理函数
				$.dialog.alert(data.message);
			}
		});
	}
	return false;
}

/**
 * 文件上传 - 非公开私有模式 - HTTP
 */
function uploadPrivateFileByHttp(fileId, filePath, uploadFileNameSpan, uploadFileName, fileExtend, fileSize){
	if(typeof fileId == 'undefined' || !fileId){
		fileId = 'uploadFile';
	}
	if(typeof filePath == 'undefined' || !filePath){
		filePath = 'filePath';
	}
	if(typeof uploadFileNameSpan == 'undefined' || !uploadFileNameSpan){
		uploadFileNameSpan = 'uploadFileNameSpan';
	}
	if(typeof uploadFileName == 'undefined' || !uploadFileName){
		uploadFileName = 'uploadFileName';
	}
	if(typeof fileExtend == 'undefined' || !fileExtend){
		fileExtend = 'fileExtend';
	}
	if(typeof fileSize == 'undefined' || !fileSize){
		fileSize = 'fileSize';
	}
 	if(typeof ossFileAuthType != 'uploadType' && uploadType == 'oss'){
 		
 		$("body").mask("正在上传，请稍后...");
 		$.ajaxFileUpload({
 			url:basePath+'/uploadPrivateFileByHttp.htm',//用于文件上传的服务器端请求地址
 			secureuri:false,//一般设置为false
 			fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
 			dataType: 'json',//返回值类型一般设置为json
 			success: function (data, status){ //服务器成功响应处理函数
 				if(data.status == 'success'){
 					$("#"+filePath).val(data.ossFileKey);
					$("#"+uploadFileNameSpan).text(data.fileName);
					$("#"+uploadFileName).val(data.fileName);
 				}else{
 					$.dialog.alert(data.message);
 				}
 			},
 			error: function (data, status, e){//服务器响应失败处理函数
 				$.dialog.alert(data.message);
 			}
 		});
	}else{
		$("body").mask("正在上传，请稍后...");
		$.ajaxFileUpload({
			url:basePath+'/uploadPrivateFileByHttp.htm',//用于文件上传的服务器端请求地址
			secureuri:false,//一般设置为false
			fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
			dataType: 'json',//返回值类型一般设置为json
			success: function (data, status){ //服务器成功响应处理函数
				$("body").unmask();
				if(data.status == 'success'){
					$("#"+filePath).val(data.path);
					$("#"+uploadFileNameSpan).text(data.fileName);
					$("#"+uploadFileName).val(data.fileName);
					$("#"+fileExtend).val(data.extend);
					$("#"+fileSize).val(data.size);
				}else{
					$.dialog.alert(data.message);
				}
			},
			error: function (data, status, e){//服务器响应失败处理函数
				$("body").unmask();
				$.dialog.alert(data.message);
			}
		});
	}
}
 
 
/**
 * 文件上传 - 公开私有模式 - FTP
 */
 function uploadPublicFileByFtp(){
	 $("body").mask("正在上传，请稍后...");
	 $.ajaxFileUpload({
		url:basePath+'/uploadPublicFileByFtp.htm',//用于文件上传的服务器端请求地址
		secureuri:false,//一般设置为false
		fileElementId:'uploadFile',//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			$("body").unmask();
			if(data.status == 'success'){
				$("#filePath").val(data.path);
				$("#uploadFileNameSpan").text(data.fileName);
				$("#uploadFileName").val(data.fileName);
			}else{
				$.dialog.alert(data.message);
			}
		},
		error: function (data, status, e){//服务器响应失败处理函数
			$("body").unmask();
			$.dialog.alert(data.message);
		}
	});
 }
 
/**
 * 文件上传 - 非公开私有模式 - FTP
 */
 function uploadPrivateFileByFtp(){
	 $("body").mask("正在上传，请稍后...");
	 $.ajaxFileUpload({
		url:basePath+'/uploadPrivateFileByFtp.htm',//用于文件上传的服务器端请求地址
		secureuri:false,//一般设置为false
		fileElementId:'uploadFile',//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			$("body").unmask();
			if(data.status == 'success'){
				$("#filePath").val(data.path);
				$("#uploadFileNameSpan").text(data.fileName);
				$("#uploadFileName").val(data.fileName);
			}else{
				$.dialog.alert(data.message);
			}
		},
		error: function (data, status, e){//服务器响应失败处理函数
			$("body").unmask();
			$.dialog.alert(data.message);
		}
	});
 }
 
/**
 * 文件上传 - 云模式
 */
 function uploadFileByCloud(){
	 $("body").mask("正在上传，请稍后...");
	 $.ajaxFileUpload({
		url:basePath+'/uploadFileByCloud.htm',//用于文件上传的服务器端请求地址
		secureuri:false,//一般设置为false
		fileElementId:'uploadFile',//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			$("body").unmask();
			if(data.status == 'success'){
				$("#filePath").val(data.path);
				$("#uploadFileNameSpan").text(data.fileName);
				$("#uploadFileName").val(data.fileName);
			}else{
				$.dialog.alert(data.message);
			}
		},
		error: function (data, status, e){//服务器响应失败处理函数
			$("body").unmask();
			$.dialog.alert(data.message);
		}
	});
 }
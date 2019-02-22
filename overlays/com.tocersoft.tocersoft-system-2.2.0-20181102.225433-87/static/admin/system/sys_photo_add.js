$(document).ready(function(){
	
	// 验证表单
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#imgPath").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"上传的图片不能为空"});
	$('#cancelBtn').on('click',function(){
		$.dialog.close();
	});
	
	$('#saveBtn').on('click',save);
	
});

function doUploadFile(){
	$.ajaxFileUpload({
		url:basePath+'/ajaxFileUpload.htm',//用于文件上传的服务器端请求地址
		secureuri:false,//一般设置为false
		fileElementId:'fileInput',//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			if(data.status == 'success'){
				$('#showImg').attr('src',basePath+data.path);
				$("#imgPath").val(data.path);
				$("#fileName").val(data.fileName);
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

// 保存广告图片
function save(){
	var result = $.formValidator.pageIsValid("1");	// 手动调用验证框架进行验证
	if(!result){
		return;
	}
	var objectId = $("#objectId").val();
	var objectType = $("#objectType").val();
	$("#fileInput").attr("disabled",true);
	$("body",parent.document).mask("正在处理，请稍候...");
	var itemId  = $("#itemId").val();
  $('#addPhotoForm').ajaxSubmit(function(data){
    $("body",parent.document).unmask();
    $("#fileInput").attr("disabled",false);
    var win = $.dialog.open.origin;
    win.listPhoto(objectId, objectType);
    $.dialog.close();
  });
}


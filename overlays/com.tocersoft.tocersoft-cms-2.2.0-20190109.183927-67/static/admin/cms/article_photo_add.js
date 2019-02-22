var editor;
$(document).ready(function(){
	
	// 验证表单
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#imgPath").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"上传的图片不能为空"});
	
	// 初始化选择框
	$("#gjc").chosen();
	// 保存
	$('#saveBtn').on('click',save);
	//取消
	$('#cancelBtn').on('click',function(){
		$.dialog.close();
	});
    
  //点击图片中的编辑按钮
    $('.J-ap-edit').on('click',function(){
    	var id = $(this).attr('data');
    	toUpdate(id);
    });

    // 点击图片中的删除按钮
    $('.J-ap-remove').on('click',function(){
    	var id = $(this).attr('data');
    	remove(id);
    });
});


/**
 * 上传附件
 */
function doUploadFiles(){
	if($("#fileId").val() == "" || $("#fileId").val() == null){
		$.dialog.alert("请选择需要上传的文件");
		return;
	}
	$.ajaxFileUpload({
		url:basePath+'/uploadPublicFileByHttp.htm',
//		url:basePath+'/ajaxFileUpload.htm',//用于文件上传的服务器端请求地址
		secureuri:false,//一般设置为false
		fileElementId:'fileId',//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			if(data.status == 'success'){
				var objectId = $("#itemId").val(); 
				if(objectId == ""){
					objectId = "-1";
				}
				var fileName = data.fileName;
				var path = data.path;
				$("#path").val(path);
				$("#fileName").val(fileName);
				var extend=fileName.substring(fileName.lastIndexOf('.'),fileName.Length);
				var postData = {"item.url":path,"item.fileName":fileName,"item.objectId":objectId,"item.extend":extend,"item.objectType":'1'} ;
				$.post(basePath+"/admin/cms/article/saveSysFileUpload.htm",postData,function(data){
					if(data.status == "success"){
						refreshGrid();
						$.dialog.alert("上传成功");
					}
				});
			}else{
				$.dialog.alert(data.message);
			}
		}
	});
}





//保存广告图片
function save(){
	var result = $.formValidator.pageIsValid("1");	// 手动调用验证框架进行验证
	if(!result){
		return;
		}
	$("body",parent.document).mask("正在处理，请稍候...");
	var itemId  = $("#itemId").val();
   	if(null != itemId && "" != itemId){
   		$('#articlePhotoForm').attr('action',basePath+'/admin/cms/article/update_cms_article_photo.htm');
   		$('#articlePhotoForm').ajaxSubmit(function(data){
   			$("body",parent.document).unmask();
   			var win = $.dialog.open.origin;
   			win.loadAdvPhotos2();
   			$.dialog.close();
   		});
   	}else{
   		$('#articlePhotoForm').ajaxSubmit(function(data){
   			$("body",parent.document).unmask();
   			var win = $.dialog.open.origin;
   			win.loadAdvPhotos2();
   			$.dialog.close();
   		});
   	}
}



/** 关闭当前页 */
function closeCurrentTab(event){
	var current = $("#menubar_tabs",parent.document).find("a[class='currenttab']")[0];
	var id = current.id;
	id = id.substring(6,id.length);
	parent.closeTab(id,event);
}

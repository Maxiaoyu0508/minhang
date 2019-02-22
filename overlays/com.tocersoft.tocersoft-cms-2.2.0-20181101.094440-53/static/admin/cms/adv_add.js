$(document).ready(function(){
	
	// 验证表单
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#imgPath").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"上传的图片不能为空"});
	
	$('#cancelBtn').on('click',function(){
		$.dialog.close();
	});
	
	$('#saveBtn').on('click',save);
	
});

//跳转到添加广告图
function toAdd(){
	var advId = $('#itemId').val();
	$.dialog.open(basePath+'/admin/cms/advPhoto/to_add.htm?m='+Math.random()+'&item.advId='+advId,{
		title:'新增图片',
		width:'600px',
		height:'420px'
	});
}

// 保存广告图片
function save(){
	var result = $.formValidator.pageIsValid("1");	// 手动调用验证框架进行验证
	if(!result){
		return;
		}
	$("body",parent.document).mask("正在处理，请稍候...");
	var itemId  = $("#itemId").val();
   	if(null != itemId && "" != itemId){
   		$('#advPhotoForm').attr('action',basePath+'/admin/cms/advPhoto/update.htm');
   		$('#advPhotoForm').ajaxSubmit(function(data){
   			$("body",parent.document).unmask();
   			var win = $.dialog.open.origin;
   			win.loadAdvPhotos();
   			$.dialog.close();
   		});
   	}else{
   		$('#advPhotoForm').ajaxSubmit(function(data){
   			$("body",parent.document).unmask();
   			var win = $.dialog.open.origin;
   			win.loadAdvPhotos();
   			$.dialog.close();
   		});
   	}
}


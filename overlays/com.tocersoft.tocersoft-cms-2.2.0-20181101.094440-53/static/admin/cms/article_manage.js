$(document).ready(function(){
	
	// 验证表单
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#imgPath").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"上传的图片不能为空"});
	
	// 默认加载当前广告位下的广告图
	loadAdvPhotos2();
	
	$(document).on("mouseenter",".article-photo-item",function(){
		var e = $(this);
		var btn = $(e).find('.photo-btn');
		if(e.is('.select')){
			$(e).removeClass('select');
			$(btn).addClass('hide');
		}else{
			$(e).addClass('select');
			$(btn).removeClass('hide');
		}
	});
	
	// 点击图片中的编辑按钮
	$(document).on("click",".J-ap-edit2",function(){
		var id = $(this).attr('data');
		var index = $(this).attr('position');
		toUpdate(id,index);
	});
	
	// 点击图片中的删除按钮
	$(document).on("click",".J-ap-remove2",function(){
		var id = $(this).attr('data');
		remove(id);
	});
	
	
	// 点击刷新按钮刷新文章图
	$('#refreshBtn').on('click',function(){
		loadAdvPhotos2();
	});
});

// 跳转到修改文章图
function toUpdate(id,index){
	$.dialog.open(basePath+'/admin/cms/article/to_update_cms_article_photo.htm?m='+Math.random()+'&item.id='+id,{
		title:'修改图片',
		width:'600px',
		height:'420px'
	});
}

// 删除文章图
function remove(id){
	$.dialog.confirm("确认要删除吗？",function(){
		$.post(basePath+'/admin/cms/article/remove_cms_article_photo.htm?m='+Math.random(),{"item.id":id},function(data){
//			wait.remove();
//			$.dialog.alert('删除成功');
			loadAdvPhotos2();
		});
	});
}

// 加载文章图片
function loadAdvPhotos2(){
	var objectId = $('#itemId').val();
	$.post(basePath+'/admin/cms/article/list_cms_article_photo.htm?m='+Math.random(),{'item.objectId':objectId},function(data){
		$('#articlePhotoList').html(data);
	});
}

/** 设为缩略图 */
function setThumb(id){
    var postData = {"id":id};
    $.post(basePath + '/admin/cms/article/set_thumb.htm',postData,function(data){
        if(data.status == 'success'){
            loadAdvPhotos2();
        }else{
            $.dialog.alert(data.message);
        }
    });
}
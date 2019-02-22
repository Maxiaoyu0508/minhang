$(document).ready(function(){
	
	// 默认加载当前广告位下的广告图
	loadAdvPhotos();
	
	$(document).on("mouseenter",".adv-photo-item",function(){
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
	$(document).on("click",".J-ap-edit",function(){
		var id = $(this).attr('data');
		var index = $(this).attr('position');
		toUpdate(id,index);
	});
	
	// 点击图片中的删除按钮
	$(document).on("click",".J-ap-remove",function(){
		var id = $(this).attr('data');
		remove(id);
	});
	
	// 点击刷新按钮刷新广告图
	$('#refreshBtn').on('click',function(){
		loadAdvPhotos();
	});
});


// 跳转到添加广告图
function toAdd(){
	var advId = $('#itemId').val();
	$.dialog.open(basePath+'/admin/cms/advPhoto/to_add.htm?m='+Math.random()+'&item.advId='+advId,{
		title:'新增图片',
		width:'600px',
		height:'420px',
		lock:true
	});
}

// 跳转到修改广告图
function toUpdate(id,index){
	var advId = $('#itemId').val();
	$.dialog.open(basePath+'/admin/cms/advPhoto/to_update.htm?m='+Math.random()+'&item.id='+id,{
		title:'修改图片',
		width:'600px',
		height:'420px',
        lock:true
	});
}

// 删除广告图
function remove(id){
	$.dialog.confirm("确认要删除吗？",function(){
		$.post(basePath+'/admin/cms/advPhoto/remove.htm?m='+Math.random(),{"item.id":id},function(data){
//			wait.remove();
//			$.dialog.alert('删除成功');
			loadAdvPhotos();
		});
	});
}

// 加载广告图片
function loadAdvPhotos(){
	var advId = $('#itemId').val();
	$.post(basePath+'/admin/cms/advPhoto/list.htm?m='+Math.random(),{'advId':advId},function(data){
		$('#advPhotoList').html(data);
	});
}
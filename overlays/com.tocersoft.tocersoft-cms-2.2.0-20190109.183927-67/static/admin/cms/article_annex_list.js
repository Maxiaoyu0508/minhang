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
		remove1(id);
		});
	
	// 点击刷新按钮刷新文章附件
	$('#refreshBtn').on('click',function(){
		loadAdvPhotos();
	});
});


// 跳转到添加文章附件
function toAdd(){
	var objectId = $('#itemId').val();
	$.dialog.open(basePath+'/admin/cms/article/to_article_annex_add.htm?m='+Math.random()+'&objectId='+objectId,{
		title:'新增图片',
		width:'600px',
		height:'300px'
	});
}

// 跳转到修改文章附件
function toUpdate(id,index){
	$.dialog.open(basePath+'/admin/cms/article/to_update_article_annex.htm?m='+Math.random()+'&item.id='+id,{
		title:'修改图片',
		width:'600px',
		height:'420px'
	});
}

// 删除文章附件
function remove1(id){
	$.dialog.confirm("确认要删除吗？",function(){
		$.post(basePath+'/admin/cms/article/remove_article_annex.htm?m='+Math.random(),{"item.id":id},function(data){
			loadAdvPhotos();
		});
	});
}

// 加载文章附件
function loadAdvPhotos(){
	var objectId = $('#itemId').val();
	$.post(basePath + '/admin/cms/article/article_annex_list.htm?m='+Math.random(),{'objectId':objectId},function(data){
		$('#advPhotoList').html(data);
	});
}


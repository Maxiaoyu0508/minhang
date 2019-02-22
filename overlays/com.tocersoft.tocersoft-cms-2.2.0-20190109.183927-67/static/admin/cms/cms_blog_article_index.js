$(document).ready(function(){
	var gh = $(window).height() - 120;
	var authorType =$("#authorType").val();
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/cms/article/blogArticleList.htm?m='+Math.random(),
	    datatype:"json",
	    postData:{
	    	"condition.authorType":authorType
	    },
	    colNames:['操作','排序','文章名称','博主姓名/自媒体名称',''],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			{name:"sort",width:50},
            {name:"name",width:300},
            {name:"blogName",width:150},
            {name:"",width:300}
		],
		viewrecords: true,
		caption:"文章列表",
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
  	
	
    //异步表单提交设置
    $('#articleForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
     		$("#itemName").val("");
     		$("#channelName").val("");
     		$("#itemContent").val("");
     		$("#itemId").val("");
        	$.dialog.alert(data.message);
        	reloadGrid();
        }
    });

	$("#delArticle").click(delArticle);
	
	$('#unPublish').click(unPublish);
	$('#publish').click(publish);
	
	// 打开新增文章的页面
	$('#addArticle').on('click',function(){
			var cid = $('#channelId').val();
			var tv = {};
			tv.text="新增文章";
			tv.url = "admin/cms/blog/article/to_add.htm?item.channelId=" + cid+"&authorType="+$("#authorType").val();
			tv.tabId = "cms_article_add";
			tv.doc = parent.document;
			showTab(tv);
	});
	
	
	$('#refresh').on('click',function(){
		reloadGrid();
	});
	$('#isPublish').change(function(){
		var isPublish = $(this).val();
		$('#table').setGridParam({
			mtype:'post',
			postData:{'condition.isPublish':isPublish}
		}).trigger('reloadGrid',[{page:1}]);
	});
	
	
	
	
});

//格式化操作单元格
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' title='查看\修改' class='no_unl' onclick=\"updateFN('"+rowObject.id+"');return false;\">查看/修改</a>";
	btns.push(updateBtn);
	return btns.join(" ");
}
function isPublishFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return '<span class="status-red-f12">不发布</span>';
	}else if(cellvalue == 1){
		return '<span class="stauts-green-f12">已发布</span>';
	}else{
		return '<span class="status-gray-f12">未知</span>';
	}
}

//修改
function updateFN(id){
	var tv = {};
	tv.text="修改文章";
	tv.url = "admin/cms/blog/article/edit.htm?item.id=" + id+"&authorType="+$("#authorType").val();
	tv.tabId = "cms_article_update_" + id;
	tv.doc = parent.document;
	showTab(tv);
}

//查询
function searchArticleList(){
	//var channelChoose = $("#channelChoose").val();
	//if(null==channelChoose||''==channelChoose){
		//$("#channelId").val("");
	//}
	var arr = $("#searchForm").serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		postData[entry["name"]]=entry["value"];
	}
	$('#table').setGridParam({
		mtype:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}

//批量删除
function delArticle(){
	//确认提示
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm("确认要删除此项数据吗？",function(){
		$.post(basePath+"/admin/cms/article/delArticle.htm?m="+Math.random(),{"articleId":selIds.join(",")},function(data){
			$.dialog.alert(data.message);
			reloadGrid();
		},"json");
	});
}

function unPublish(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	$.post(basePath+"/admin/cms/article/unPublish.htm?m="+Math.random(),{"articleId":selIds.join(",")},function(data){
		$.dialog.alert(data.message);
		reloadGrid();
	},"json");
}
function publish(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	$.post(basePath+"/admin/cms/article/publish.htm?m="+Math.random(),{"articleId":selIds.join(",")},function(data){
		$.dialog.alert(data.message);
		reloadGrid();
	},"json");
}
//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}
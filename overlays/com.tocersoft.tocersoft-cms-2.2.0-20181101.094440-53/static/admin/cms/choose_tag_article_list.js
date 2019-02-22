$(document).ready(function(){
	
	initOptertion();
	
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url: basePath + "/admin/cms/article/searchArticleList.htm?m=" + Math.random(),
	    datatype:"json",
	    mtype:'post',
	    postData:{"condition.tagId":$("#tagId").val()},
	    colNames:['操作','文章名称','栏目名称','发布时间','是否发布'],
		colModel:[
			{name:"id",index:"id",width:50,hidden:true}, 
			{name:'name',index:'name', align:'left', width:200},
			{name:"channelName",index:'channelName',width:60},
			{name:'createDate',index:'createDate',width:70},
			{name:'isPublish',index:'isPublish',width:50,formatter:isPublishFormater}
		],
		caption:"文章列表",
		loadComplete: function(data){
	   	},
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
	   	rowNum:10,
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
  	$('#table_name').css('text-align','left');
});

function initOptertion(){
	$("#batchChoose").on("click",delArticle);
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


//查询
function searchArticleList(){
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

//批量选择
function delArticle(){
	//确认提示
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请至少选择一篇文章!");
		return;
	}
	var postData = {};
	postData["condition.tagId"] = $("#tagId").val();
	postData["selIds"] = selIds.join(",");
	$.post(basePath+"/admin/cms/article/tag/saveCmsTagArticleList.htm?m="+Math.random(),postData,function(data){
		var win = $.dialog.open.origin;
		win.reload();
		$.dialog.close();
	},"json");
}
//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}
$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//初始化表格
 	initTable();
});

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
    // 新增文章标签关联表
	$("#addBtn").on("click",addCmsArticleTag);
	// 批量文章标签关联表
	$("#batchDelBtn").on("click",doBatchDelCmsArticleTag);
	// 查询
	$("#searchBtn").on("click",searchCmsArticleTag);
	// 刷新
	$("#refreshGridBtn").on("click",refreshGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 111;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/cms/article/tag/listCmsArticleTagByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','标签ID','专栏ID',''],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
            {name:"tagId",width:100},
            {name:"columnId",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"文章标签关联表列表",
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,
	   	rowNum:100,
	   	scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
}


/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateCmsArticleTagFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCmsArticleTagFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加文章标签关联表
 */
function addCmsArticleTag(){
	$.dialog.open(basePath + "/admin/cms/article/tag/edit.htm?m="+Math.random(),{
			title : "添加文章标签关联表",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除文章标签关联表
 * @param {Object} id
 */
function removeCmsArticleTagFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/article/tag/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsArticleTag(){
	//删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/article/tag/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询文章标签关联表
 */
function searchCmsArticleTag(){
	var arr = $("#searchForm").serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		postData[entry["name"]]=entry["value"];
	};
	$('#table').setGridParam({
		dataType:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
};


/**
 * 修改文章标签关联表
 */
function updateCmsArticleTagFN(id){
	$.dialog.open(basePath + "/admin/cms/article/tag/edit.htm?m="+Math.random()+"&item.id=" + id,{
		title : "修改文章标签关联表",
		width : "600px",
		height : "400px",
		lock : true
	});
}


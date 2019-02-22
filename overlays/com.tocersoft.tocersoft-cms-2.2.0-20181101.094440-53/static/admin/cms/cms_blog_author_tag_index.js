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
    // 新增博主与标签关联表
	$("#addBtn").on("click",addCmsBlogAuthorTag);
	// 批量博主与标签关联表
	$("#batchDelBtn").on("click",doBatchDelCmsBlogAuthorTag);
	// 查询
	$("#searchBtn").on("click",searchCmsBlogAuthorTag);
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
	    url:basePath + '/admin/cms/blog/author/tag/listCmsBlogAuthorTagByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','标签ID','博主ID',''],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
            {name:"tagId",width:100},
            {name:"blogAuthorId",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"博主与标签关联表列表",
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateCmsBlogAuthorTagFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCmsBlogAuthorTagFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加博主与标签关联表
 */
function addCmsBlogAuthorTag(){
	$.dialog.open(basePath + "/admin/cms/blog/author/tag/edit.htm?m="+Math.random(),{
			title : "添加博主与标签关联表",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除博主与标签关联表
 * @param {Object} id
 */
function removeCmsBlogAuthorTagFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/blog/author/tag/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsBlogAuthorTag(){
	//删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/blog/author/tag/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询博主与标签关联表
 */
function searchCmsBlogAuthorTag(){
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
 * 修改博主与标签关联表
 */
function updateCmsBlogAuthorTagFN(id){
	$.dialog.open(basePath + "/admin/cms/blog/author/tag/edit.htm?m="+Math.random()+"&item.id=" + id,{
		title : "修改博主与标签关联表",
		width : "600px",
		height : "400px",
		lock : true
	});
}


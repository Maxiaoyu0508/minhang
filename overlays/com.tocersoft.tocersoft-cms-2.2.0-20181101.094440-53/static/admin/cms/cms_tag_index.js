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
    // 新增文章标签
	$("#addBtn").on("click",addCmsTag);
	// 批量删除文章标签
	$("#batchDelBtn").on("click",doBatchDelCmsTag);
	// 查询
	$("#searchBtn").on("click",searchCmsTag);
	// 刷新
	$("#refreshGridBtn").on("click",refreshGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/cms/tag/listCmsTagByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','排序','标签名称','文章数量'],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			{name:"sort",width:80},
            {name:"name",width:150},
            {name:"numArticle",width:80},
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width()-23;
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateCmsTagFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCmsTagFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加文章标签
 */
function addCmsTag(){
	$.dialog.open(basePath + "/admin/cms/tag/edit.htm?m="+Math.random(),{
		title : "添加文章标签",
		width : "1000px",
		height : "500px",
		lock : true
	});
}

/**
 * 删除文章标签
 * @param {Object} id
 */
function removeCmsTagFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/tag/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsTag(){
	//删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/tag/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询文章标签
 */
function searchCmsTag(){
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
 * 修改文章标签
 */
function updateCmsTagFN(id){
	$.dialog.open(basePath + "/admin/cms/tag/edit.htm?m="+Math.random()+"&item.id=" + id,{
		title : "修改文章标签",
		width : "1000px",
		height : "550px",
		lock : true
	});
}

function reload(){
	reloadCommonGrid("table");
}

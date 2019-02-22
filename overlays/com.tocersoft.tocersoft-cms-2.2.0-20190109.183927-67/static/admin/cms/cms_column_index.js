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
	// 批量专栏管理
	$("#batchDelBtn").on("click",doBatchDelCmsColumn);
	// 查询
	$("#searchBtn").on("click",searchCmsColumn);
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
	    url:basePath + '/admin/cms/column/listCmsColumnByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','排序','专栏名称','专栏简介','文章数量','收藏量','浏览量（热度）','点赞量','是否精华','是否推荐','是否最新'],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			 {name:"sort",width:60},
            {name:"name",width:300},
            {name:"descBrief",width:300},
            {name:"numArticle",width:80},
            {name:"countCollect",width:80},
            {name:"countView",width:80},
            {name:"countLike",width:80},
            {name:"isBest",width:100},
            {name:"isRecommend",width:100},
            {name:"isNew",width:100}
		],
		viewrecords: true,
		caption:"专栏管理列表",
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateCmsColumnFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCmsColumnFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 删除专栏管理
 * @param {Object} id
 */
function removeCmsColumnFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/column/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsColumn(){
	//删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/column/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询专栏管理
 */
function searchCmsColumn(){
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
 * 修改专栏管理
 */
function updateCmsColumnFN(id){
	window.location.href = basePath + "/admin/cms/column/edit.htm?m="+Math.random()+"&item.id=" + id;
}


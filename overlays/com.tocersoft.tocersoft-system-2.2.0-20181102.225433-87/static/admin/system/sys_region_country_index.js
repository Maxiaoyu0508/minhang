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
	// 新增国家
	$("#addBtn").on("click",addCountry);
	// 批量国家
	$("#batchDelBtn").on("click",doBatchDelCountry);
	// 查询
	$("#searchBtn").on("click",searchCountry);
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
	    url:basePath + '/admin/system/region/country/listSysRegionCountryByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','国家名称','排序',''],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			{name:"name",width:200,align:'left'},
			{name:"sort",width:60},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"国家列表",
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateCountryFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCountryFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加国家
 */
function addCountry(){
	$.dialog.open(basePath + "/admin/system/region/country/edit.htm?m="+Math.random(),{
		title : "添加国家",
		width : "600px",
		height : "400px",
		lock : true
	});
}

/**
 * 删除国家
 * @param {Object} id
 */
function removeCountryFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/system/region/country/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除国家
 */
function doBatchDelCountry(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/system/region/country/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询国家
 */
function searchCountry(){
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
 * 修改国家
 */
function updateCountryFN(id){
	$.dialog.open(basePath + "/admin/system/region/country/edit.htm?m="+Math.random()+"&item.id=" + id,{
		title : "修改国家",
		width : "600px",
		height : "400px",
		lock : true
	});
}


$(document).ready(function(){
	//初始化表格
 	initTable();
 	
 	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
	 	var width = $(window).width()-23;
	 	$("#table").jqGrid('setGridWidth', width);
	}
});

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/system/region/listSysRegionByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','图片预览','文件名称','审核状态','关联ID','文件路径','文件大小','扩展名'],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			{name:"code",width:70},
			{name:"name",width:100,index:'name',align:'left'},
			{name:"level",width:50},
			{name:"isHot",width:50},
			{name:"sort",width:50},
			{name:"sort",width:50},
			{name:"sort",width:50}
		],
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
  	$('#table_name').css('text-align','left');
}

/**
 * 查询用户
 */
function searchRegionList(){
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
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var passBtn = "<a href='javascript:;' title='审核通过' class='no_unl' onclick=\"updateRegionFN('"+rowObject.id+"');return false;\">审核通过</a>";
	var unPassBtn = "<a href='javascript:;' title='审核不通过' class='no_unl' onclick=\"updateRegionFN('"+rowObject.id+"');return false;\">审核不通过</a>";
	btns.push(passBtn);
	btns.push(unPassBtn);
	return btns.join(" | ");
}

/**
 * 刷新表格
 */
function refreshGrid(){
	reloadGrid("table");
}

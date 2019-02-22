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
	// 查询
    $("body").on("click","#searchBtn",searchMemberUserExtend);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 125;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/member/listWeekOperateForCreateDate.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['周数','会员数'],
		colModel:[ 
		          {name:"week",width:200,align:'left',formatter:weekFormatter},
		          {name:"num",width:100,align:'left'}
		],
		viewrecords: true,
		caption:"周对比列表",
		loadComplete: function(data){
			var width = $(window).width() - 10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: false,
	   	autoScroll: true,
	   	height:gh,
	   	multiselect: false,
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
}

function weekFormatter(cellvalue,options,rowObject){
	var year = cellvalue.substring(0,4);
	var week = cellvalue.substring(4,6);
	var ok = year+"年第"+week+"周";
	return ok;
}

/**
 * 查询日对比信息
 */
function searchMemberUserExtend(){
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
	
	//清空上次累加数据
	var oldPostData = $('#table').jqGrid("getGridParam", "postData");
	$.each(oldPostData, function (k, v) {
		delete oldPostData[k];	
    });
};


/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
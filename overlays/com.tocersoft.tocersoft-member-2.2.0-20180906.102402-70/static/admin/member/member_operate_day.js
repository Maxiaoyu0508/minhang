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
	    url:basePath + '/admin/member/listDayOperateForCreateDate.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['日期','会员数'],
		colModel:[ 
		          {name:"day",width:200,align:'left',
		        	  formatter:'date',formatoptions: {srcformat:'Y-m-d H:i:s',newformat:'Y-m-d'}},
		          {name:"num",width:100,align:'left'}
		],
		viewrecords: true,
		caption:"日对比列表",
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
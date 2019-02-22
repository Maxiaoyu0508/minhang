$(document).ready(function(){
	//初始化表格
 	initTable();
});

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 145;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/system/progress/log/listSysProgressLogByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作日期','操作KEY','日志内容','是否完成标记位','id'],
		colModel:[ 
			{name:"createDate",width:100},
            {name:"optKey",width:200},
            {name:"content",width:400},
            {name:"finishFlag",hidden:true},
            {name:"id",hidden:true}
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width() - 23;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: false,
        autoScroll:true,
	   	height:gh,
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
function optKeyFormater(cellvalue,options,rowObject){
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"updateSysProgressLogFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加操作进度日志
 */
function addSysProgressLog(){
	$.dialog.open(basePath + "/admin/sys/progress/log/edit.htm?m="+Math.random(),{
			title : "添加操作进度日志",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除操作进度日志
 * @param {Object} id
 */
function removeSysProgressLogFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/sys/progress/log/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelSysProgressLog(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/sys/progress/log/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询操作进度日志
 */
function searchSysProgressLog(){
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
 * 修改操作进度日志
 */
function updateSysProgressLogFN(id){
	$.dialog.open(basePath + "/admin/sys/progress/log/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改操作进度日志",
		width : "800px",
		height : "500px",
		lock : true
	});
}

/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
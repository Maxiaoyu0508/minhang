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
    // 新增网站日志
	$("#addBtn").on("click",addSysLog);
	// 批量网站日志
	$("#batchDelBtn").on("click",doBatchDelSysLog);
	// 查询
	$("#searchBtn").on("click",searchSysLog);
	// 刷新
	$("#refreshGridBtn").on("click",reloadGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 95;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/system/sysLog/listSysLogByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['','创建时间','操作人','来源','操作','操作描述'],
		colModel:[ 
		    {name:"id",width:30,hidden:true},
		    {name:"createDate",width:120,align:'center'},
            {name:"createBy",width:70,align:'center'},
            {name:"source",width:50,align:'center',formatter:sourceFormater},
            {name:"type",width:70,align:'center'},
            {name:"desc",width:500,align:'left'}
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
        shrinkToFit: false,
        autoScroll:true,
	   	height:gh,
	   	multiselect: false,
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
    $("#jqgh_table_source").css({"textAlign":"center"});
    $("#jqgh_table_createDate").css({"textAlign":"center"});
    $("#jqgh_table_createBy").css({"textAlign":"center"});
    $("#jqgh_table_type").css({"textAlign":"center"});
}
function sourceFormater(cellValue,options,rowObject){
	var str = "";
	if(cellValue == 0){
		str = "后台";
	}else if(cellValue == 1){
		str = "网站";
	}
	return str;
}

/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateSysLogFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeSysLogFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加网站日志
 */
function addSysLog(){
	$.dialog.open(basePath + "/edit.htm?m="+Math.random(),{
			title : "添加网站日志",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除网站日志
 * @param {Object} id
 */
function removeSysLogFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			reloadGrid();
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelSysLog(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadGrid();
		});
	});
}

/**
 * 查询网站日志
 */
function searchSysLog(){
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
 * 修改网站日志
 */
function updateSysLogFN(id){
	$.dialog.open(basePath + "/edit.htm?m="+Math.random()+"&item.id=" + id,{
		title : "修改网站日志",
		width : "600px",
		height : "400px",
		lock : true
	});
}

/**
 * 刷新表格
 */
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}
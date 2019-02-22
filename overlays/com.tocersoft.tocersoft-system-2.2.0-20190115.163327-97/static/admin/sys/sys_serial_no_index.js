$(document).ready(function(){
	//初始化表格
 	initTable();
});

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 95;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/sys/serial/no/listSysSerialNoByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['前缀','流水号','最终流水号','','id'],
		colModel:[ 
            {name:"prefix",width:100,formatter:prefixFormater},
            {name:"curValue",width:100},
            {name:"serialNo",width:150},
			{name:"blank",width:400},
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
function prefixFormater(cellvalue,options,rowObject){
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"viewSysSerialNoFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加流水号表
 */
function addSysSerialNo(){
	$.dialog.open(basePath + "/admin/sys/serial/no/edit.htm?m="+Math.random(),{
			title : "添加流水号表",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除流水号表
 * @param {Object} id
 */
function removeSysSerialNoFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/sys/serial/no/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelSysSerialNo(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/sys/serial/no/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询流水号表
 */
function searchSysSerialNo(){
	var arr = $("#searchForm").serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		postData[entry["name"]]=entry["value"];
	}
	$('#table').setGridParam({
		dataType:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}


/**
 * 查看流水号表
 */
function viewSysSerialNoFN(id){
	$.dialog.open(basePath + "/admin/sys/serial/no/view.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "流水号表",
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
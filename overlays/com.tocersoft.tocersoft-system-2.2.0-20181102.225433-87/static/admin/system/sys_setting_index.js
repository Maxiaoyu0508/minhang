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
	    url:basePath + '/admin/sys/setting/listSysSettingByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['配置项代码','配置项名称','配置项值','','id'],
		colModel:[
            {name:"settingKey",width:260,formatter:settingNameFormater},
            {name:"settingName",width:200},
            {name:"settingValue",width:120,align:'right'},
			{name:"blank",width:600},
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
    $("#jqgh_table_settingValue").css({"textAlign":"right"});
}


/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function settingNameFormater(cellvalue,options,rowObject){
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"viewSysSettingFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加系统配置表
 */
function addSysSetting(){
	$.dialog.open(basePath + "/admin/sys/setting/edit.htm?m="+Math.random(),{
			title : "添加系统配置表",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除系统配置表
 * @param {Object} id
 */
function removeSysSettingFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/sys/setting/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelSysSetting(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/sys/setting/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询系统配置表
 */
function searchSysSetting(){
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
 * 查看系统配置表
 */
function viewSysSettingFN(id){
	$.dialog.open(basePath + "/admin/sys/setting/view.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "系统配置表",
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
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
	//查询
	$("body").on("click","#searchBtn",searchGrid);
	//刷新
	$("body").on("click","#refreshBtn",reloadCommonGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	$('#table').jqGrid({
		url:basePath + '/member/role/listMemberRoleByPage.htm',
		colNames:['操作','角色名称','角色类型','描述'],
		colModel:[
			{name:'id',width:40,formatter:optFormater},
			{name:'name',width:60,align:'left'},
			{name:'type',width:80,align:'left',formatter:roleTypeFormater},
			{name:'remaTrk',width:100,align:'left'}
		],
		caption:"角色列表",
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
	   	height:300,
	   	rowNum:100,
	   	scroll:true,//一页显示100条，滚动加载
	   	rownumbers:true
	});
	$('#table').jqGrid('navGrid','#pagerBar');
}

/**
 * 格式化操作按钮
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function optFormater(cellvalue,options,rowObject){
	return "<a href='javascript:;' onclick=\"chooseFN('"+rowObject.id+"','"+rowObject.name+"');return false;\">选择</a>&nbsp;";
}

/**
 * 格式化角色类型
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function roleTypeFormater(cellvalue,options,rowObject){
	var str = "";
	if(cellvalue == 1){
		str = '<span class="status-red">系统</span>';
	}else if(cellvalue == 2){
		str = '<span class="status-green">用户</span>';
	}
	return str;
}

//查询
function searchTable(){
	var arr = $("#searchForm").serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		postData[entry["name"]]=entry["value"];
	}
	$('#table').setGridParam({
		mtype:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}

/**
 * 选择角色
 * @param rowid
 * @param rowName
 */
function chooseFN(rowid,rowName){
	var rowObject = $("#table").jqGrid("getRowData",rowid);
	rowObject.id = rowid;
	var rows=[];
	rows.push(rowObject);
	var win = $.dialog.open.origin;
	win.addRole(rows);
	$.dialog.close();
}

/**
 * 批量选择角色
 */
function selectRole(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	var rows=[];
	for(var i=0;i<selIds.length;i++){
		var rowid = selIds[i];
		var rowObject = $("#table").jqGrid("getRowData",rowid);
		rowObject.id = rowid;
		rows.push(rowObject);
	}
	var win = $.dialog.open.origin;
	win.addRole(rows);
	$.dialog.close();
}
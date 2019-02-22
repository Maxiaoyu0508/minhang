var zTree,rMenu,gh,curNode;	//定义变量
$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//初始化表格
 	initTable();
});
/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 106;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/system/region/area/listSysRegionAreaByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','大区名称','排序',''],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			{name:"name",width:200},
			{name:"sort",width:60,align:'left'},
			{name:"blank",width:400}
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
	$('#table_sort').css('text-align','center');
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	// 新增用户
	$("#addRegionAreaBtn").on("click",addRegionArea);

	// 批量删除用户
	$("#batchDelRegionAreaBtn").on("click",doBatchDelRegionArea);
	// 查询
	$("#searchBtn").on("click",searchRegionAreaList);
	// 刷新
	$("#refreshGridBtn").on("click",refreshGrid);
}
/**
 * 添加区域
 */
function addRegionArea(){
	$.dialog.open(basePath + "/admin/system/region/area/add.htm?m="+Math.random(),{
			title : "添加大区",
			width : "600px",
			height : "500px",
			lock : true
		}
	);
}
/**
 * 用于对 Ajax 返回数据进行预处理的函数
 * @param {Object} treeId
 * @param {Object} parentNode
 * @param {Object} responseData
 */
function parseDepartTreeDataFilter(treeId,parentNode,responseData){
	var treeData = $.parseJSON(responseData.data);
	return treeData;
}


/**
 * 删除用户
 * @param {Object} id
 */
function removeRegionFN(id){
	var selIds = [id];
	//确认提示
	var dialog = $.dialog({
	    title: '确认删除',
	    content: '确认要删除吗？',
	    okVal:"删除",
	    cancelVal:"取消",
	    ok: function(){
	    	$.post(basePath + "/admin/system/region/area/del.htm?m="+Math.random(),{"selIds":selIds.join(',')},function(data){
				 $.dialog.alert(data.message);
				 refreshGrid();
			});
	    },
	    cancel:function(){
	    	this.close();
	    }
	});
}

/**
 * 批量删除用户
 */
function doBatchDelRegionArea(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		$.post(basePath + "/admin/system/region/area/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			$.dialog.alert(data.message);
			refreshGrid();
		});
	});
}

/**
 * 查询用户
 */
function searchRegionAreaList(){
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

var index = 0; //记录parentIds的下标
/**
 * 查看详情
 * @param id
 */
function checkDetailFN(id){
	$.dialog.open(basePath + "/admin/system/region/area/alreadySelectArea.htm?areaId="+id,{
		title : "已选区域",
		width : "800px",
		height : "500px",
		lock : true
	});
}
/**
 * 修改大区
 */
function updateRegionFN(id){
	$.dialog.open(basePath + "/admin/system/region/area/update.htm?m="+Math.random()+"&areaId="+id,{
		title : "修改大区",
		width : "600px",
		height : "500px",
		lock : true
	}
	);
}

/**
 * 设置拥有省
 */
function fitFN(id){
	$.dialog.open(basePath + "/admin/system/region/area/selectArea.htm?areaId="+id,{
		title : "选择区域",
		width : "800px",
		height : "500px",
		lock : true
	});
}

/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateRegionFN('"+rowObject.id+"');return false;\">修改</a>";
	var ckeckBtn = null;
	ckeckBtn = "<a href='javascript:;'  class='no_unl' title='查看' onclick=\"checkDetailFN('"+rowObject.id+"');return false;\">查看</a>";
	var fitBtn = null;
	/*fitBtn = "<a href='javascript:;'  class='no_unl' title='设置' onclick=\"fitFN('"+rowObject.id+"');return false;\">设置</a>";*/
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeRegionFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(ckeckBtn);
	/*btns.push(fitBtn);*/
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 刷新表格
 */
function refreshGrid(){
	reloadGrid("table");
}
function reloadDict(){
	reloadGrid("table");
}


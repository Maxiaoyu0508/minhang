var zTree,rMenu,gh,curNode;	//定义变量
var parentIds = [0];
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
	var postData = {
		"condition.parentId":parentIds[0]
	};
	if($("#flag").val() != 1)
	{
		postData["condition.areaId"] = $("#areaId").val();
		postData["condition.flag"] = 1;
		
	}else{
		postData["condition.flag"] = 2;
		postData["condition.areaId"] = $("#areaId").val();
	}
	
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/system/region/listSysRegionAreaDetailByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','区域名称','级别','是否热门',''],
		colModel:[ 
			{name:"id",index:"id",width:150,formatter:optFormater},
//			{name:"code",width:100},
			{name:"name",width:300},
			{name:"level",width:200,formatter:levelFormater},
			{name:"isHot",width:200,formatter:hotFormater},
			{name:"",width:300}
		],
		caption:"区域列表",
		loadComplete: function(data){
			$(this).setGridWidth(790);
			if(data!=null && data.resultList[0]!=null && data.resultList!=null && data.resultList[0].cityName!=null && data.resultList[0].cityName!=''){
				$("#table").jqGrid("setCaption","区域列表："+data.resultList[0].cityName+" ");
			}else{
				$("#table").jqGrid("setCaption","区域列表");
			}
	   	},
	   	shrinkToFit: true,
	   	postData:postData,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
}
/**
 * 格式化是否热门
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns
 */
function hotFormater(cellValue,options,rowObject){
	var str = "";
	if(cellValue == 1){
		str = "热门";
	}
	return str;
}
/**
 * 格式化省市区
 */
function levelFormater(cellValue,options,rowObject){
	var str = "";
	if(cellValue == 1){
		str = "省";
	}else if (cellValue == 2){
		str = "市";
	}else {
		str = "区";
	}
	return str;
}
/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	// 新增用户
	$("#addRegionBtn").on("click",addRegion);
	// 设置热门
	$("#setHotBtn").on("click",1,setHot);
	//取消热门
	$("#removeHotBtn").on("click",0,setHot);
	//批量设置
	$("#batchFitAreaBtn").on("click",batchFitArea);
	//退出
	$("#exitBtn").on("click",exit);
	//保存按钮
	$("#saveBtn").on("click",saveData);
	//批量移除
	$("#batchRemoveAreaBtn").on("click",batchRemoveArea)
	// 批量删除用户
	$("#batchDelRegionBtn").on("click",doBatchDelRegion);
//	// 查询
	$("#searchBtn").on("click",searchRegionList);
//	// 刷新
	$("#refreshGridBtn").on("click",refreshGrid);
}
function batchRemoveArea(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(typeof(selIds) =="undefined" || selIds.length == 0 ){
		$.dialog.alert("请选择需要设置的区域");
		return;
	}
	var ids = "";
	if(selIds.length == 1){
		ids = selIds[0];
		removeAreaFN(ids);
	}else {
		ids = selIds.join(",");
		var postData = {
			"selIds":ids,
			"condition.areaId":$("#areaId").val()
		};
		$.post(basePath + "/admin/system/region/batchRemoveArea.htm?m="+Math.random(),postData,function(data){
			if(data.status == "success"){
				$.dialog.alert(data.message);
				refreshGrid();
			}
			else{
				$.dialog.alert(data.message);
			}
		});
	}
}
/**
 * 保存数据
 */
function saveData(){
	var selIds = $("#table").jqGrid("getGridParam","selarrrow");
	if(typeof(selIds) == "undefined" || selIds.length == 0){
		$.dialog.close();
	}else{
		batchFitArea();
		$.dialog.close();
	}
}

/**
 * 退出
 */
function exit(){
	$.dialog.close();
}
/**
 * 批量设置
 */
function batchFitArea(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(typeof(selIds) =="undefined" || selIds.length == 0 ){
		$.dialog.alert("请选择需要设置的区域");
		return;
	}
	var ids = "";
	if(selIds.length == 1){
		ids = selIds[0];
		fitAreaFN(ids);
	}else {
		ids = selIds.join(",");
		var postData = {
			"selIds":ids,
			"condition.areaId":$("#areaId").val()
		};
		$.post(basePath + "/admin/system/region/batchFitArea.htm?m="+Math.random(),postData,function(data){
			if(data.status == "success"){
				$.dialog.alert(data.message);
				refreshGrid();
			}
			else{
				$.dialog.alert(data.message);
			}
		});
	}
}
/**
 * 添加区域
 */
function addRegion(){
	var parentIdsInfo = [];
	for ( var i = 0; i <= index; i++) {
		parentIdsInfo.push(parentIds[i]);
	}
	$.dialog.open(
				basePath + "/admin/system/region/add.htm?level=" + $("#level").val() + "&parentIds="+parentIdsInfo.join(',') + "&areaId="+$("#areaId").val(),{
				title : "添加区域",
				width : "400px",
				height : "230px",
				lock : true
			}
	);
}
/**
 * 设置热门
 */
function setHot(statusHot){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(typeof(selIds) =="undefined" || selIds.length == 0 ){
		$.dialog.alert("请选择需要设置的区域");
		return;
	}
	var ids = "";
	if(selIds.length == 1){
		ids = selIds[0];
	}else {
		ids = selIds.join(",");
	}
	
	$.post(basePath + "/admin/system/region/setHot.htm",
			{"selIds":ids,"statusHot":statusHot.data},
			function(data){
				if(data.status == "success"){
					$.dialog.alert(data.message);
					refreshGrid();
				}
				else{
					$.dialog.alert(data.message);
				}
	});
 	
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
 * 修改用户
 * @param {Object} id
 */
function updateRegionFN(id){

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
	    	$.post(basePath + "/admin/system/region/del.htm?m="+Math.random(),{"selIds":selIds.join(',')},function(data){
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
function doBatchDelRegion(){
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		$.post(basePath + "/admin/system/region/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			$.dialog.alert(data.message);
			refreshGrid();
		});
	});
	
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
	if($("#flag").val() != 1)
	{
		postData["condition.areaId"] = $("#areaId").val();
		postData["condition.flag"] = 1;
	}else{
		postData["condition.areaId"] = $("#areaId").val();
		postData["condition.flag"] = 2;
	}
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
	var level = $("#level").val();
	level++;
	$("#level").val(level);
	index++;
	parentIds[index] = id;
	var postData = {
		"condition.parentId":parentIds[index],
		/*"condition.areaId":0,*/
		"condition.flag":1
	};
	$("#table").jqGrid("setGridParam",{
		dataType:'json',
		postData:postData,
		page:1
	}).trigger("reloadGrid");
}
/**
 * 返回上一级
 * @param id
 */
function backFN(id){
	var level = $("#level").val();
	level--;
	$("#level").val(level);
	if(index >= 1){
		index = parseInt(index) - 1;
	}
	else{
		index = 0;
	}
	var postData = {
			"condition.parentId":parentIds[index],
			"condition.areaId":$("#areaId").val(),
			"condition.flag":1
		};
	/*if(index == 0){*/
		postData["condition.areaId"] = $("#areaId").val();
	/*}else{
		postData["condition.areaId"] = 0;
	}*/
	$("#table").jqGrid("setGridParam",{
		dataType:'json',
		postData:postData,
		page:1
	}).trigger("reloadGrid");
}
/**
 * 设置改省为大区的范围
 * @param id
 */
function fitAreaFN(id){
	var postData = {
		"condition.areaId":$("#areaId").val(),
		"condition.regionId":id
	};
	$.post(basePath + "/admin/system/region/fitArea.htm?m="+Math.random(),postData,function(data){
		if(data.status == "success"){
			$.dialog.alert(data.message);
			refreshGrid();
		}
		else{
			$.dialog.alert(data.message);
		}
	});
}
/**
 * 取消设置
 * @param id
 */
function removeAreaFN(id){
	var postData = {
			"condition.areaId":$("#areaId").val(),
			"condition.regionId":id
		};
	$.post(basePath + "/admin/system/region/removeArea.htm?m="+Math.random(),postData,function(data){
		if(data.status == "success"){
			$.dialog.alert(data.message);
			refreshGrid();
		}
		else{
			$.dialog.alert(data.message);
		}
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
	/*var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateRegionFN('"+rowObject.id+"');return false;\">修改</a>";*/
	var fitAreaBtn = "";
	if(rowObject.areaId != $("#areaId").val() && rowObject.level == 1){
		fitAreaBtn = "<a href='javascript:;' class='no_unl' title='设置区域' onclick=\"fitAreaFN('"+rowObject.id+"');return false;\">设置区域</a>";
	}else if(rowObject.areaId == $("#areaId").val() && rowObject.level == 1){
		fitAreaBtn = "<a href='javascript:;' class='no_unl' title='移除' onclick=\"removeAreaFN('"+rowObject.id+"');return false;\">移除</a>";
	}
	var checkBtn ="";
	var backBtn = "";
	if($("#flag").val() != 1){
		if(rowObject.level!=3){
			checkBtn = "<a href='javascript:;'  class='no_unl' title='下一级' onclick=\"checkDetailFN('"+rowObject.id+"');return false;\">下一级</a>";
		}
		if(rowObject.level!=1){
			backBtn = "<a href='javascript:;' class='no_unl' title='返回' onclick=\"backFN('"+rowObject.id+"');return false;\">返回</a>";
		}
	}
	var removeBtn = "";
	if($("#flag").val() == 1){
		removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeUserFN('"+rowObject.id+"');return false;\">删除</a>";
	}
	
	/*btns.push(updateBtn);*/
	btns.push(checkBtn);
	btns.push(backBtn);
	btns.push(fitAreaBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 刷新表格
 */
function refreshGrid(){
	reloadGrid("table");
}


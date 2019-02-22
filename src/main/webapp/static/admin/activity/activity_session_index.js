var activityId = null;
$(document).ready(function(){
    activityId = $.dialog.data('activityId');
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
	    url:basePath + '/admin/activity/session/listActivitySessionByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['活动场次','活动日期','限制人数','活动ID','','id'],
		colModel:[
            {name:"session",width:230,formatter:activityDateFormater},
            {name:"activityDate",width:130},
            {name:"limitederson",width:130},
            {name:"activityId",width:100,hidden:true},
            {name:"blank",width:400},
            {name:"id",hidden:true}
		],
		postData : {'condition.activityId':activityId},
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
function activityDateFormater(cellvalue,options,rowObject){
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"viewActivitySessionFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加活动场次表
 */
function addActivitySession(){
	$.dialog.open(basePath + "/admin/activity/session/edit.htm?m="+Math.random()+"&item.activityId="+activityId,{
			title : "添加活动场次表",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除活动场次表
 * @param {Object} id
 */
function removeActivitySessionFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/activity/session/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelActivitySession(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/activity/session/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询活动场次表
 */
function searchActivitySession(){
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
 * 查看活动场次表
 */
function viewActivitySessionFN(id){
	$.dialog.open(basePath + "/admin/activity/session/view.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "活动场次表",
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
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
	    url:basePath + '/admin/activity/listActivityByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['活动标题','活动地点','活动开始时间','活动结束时间','主办单位','协办单位','报名名额','报名开始时间','报名结束时间','活动状态',''],
		colModel:[ 
            {name:"name",width:200,formatter:nameFormater},
            {name:"address",width:200},
            {name:"timeBegin",width:100,formatter:'date',formatoptions: {newformat:'Y-m-d'}},
            {name:"timeEnd",width:100,formatter:'date',formatoptions: {newformat:'Y-m-d'}},
            {name:"organizerMain",width:100},
            {name:"organizerSupport",width:100},
            {name:"enrollNum",width:100},
            {name:"enrollTimeBegin",width:100,formatter:'date',formatoptions: {newformat:'Y-m-d'}},
            {name:"enrollTimeEnd",width:100,formatter:'date',formatoptions: {newformat:'Y-m-d'}},
            {name:"state",width:100,formatter:stateFormater},
            {name:"id",hidden:true}
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width() - 23;
			$(this).setGridWidth(width);
	   	},
        shrinkToFit: false,
        autoScroll: true,
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
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateActivityFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeActivityFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

function nameFormater(cellvalue,options,rowObject){
	return '<a href="javascript:void(0);" onclick="updateActivityFN('+ rowObject.id +')">' + cellvalue + '</a>'
}

/**
 * 格式化活动状态
 */
function stateFormater(cellvalue,options,rowObject){
	if(cellvalue==0){
		return "<span style='color:gray;'>草稿</span>";
	}else if(cellvalue==1){
		return "<span style='color:orange;'>预告</span>";
	}else if(cellvalue==2){
		return "<span style='color:green;'>正在进行</span>";
	}else if(cellvalue==3){
		return "<span style='color:red;'>已结束</span>";
	}
}

/**
 * 添加活动信息
 */
function addActivity(){
    $.dialog.open(basePath + "/admin/activity/edit.htm?m="+Math.random(),{
        title : "新增活动",
        width : "1200px",
        height : "600px",
        lock : true
    });
}

/**
 * 删除活动信息
 * @param {Object} id
 */
function removeActivityFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/activity/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelActivity(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/activity/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询活动信息
 */
function searchActivity(){
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
 * 修改活动信息
 */
function updateActivityFN(id){
    $.dialog.open(basePath + "/admin/activity/edit.htm?item.id=" + id,{
        title : "编辑活动信息",
        width : "1200px",
        height : "600px",
        lock : true
    });
}

/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
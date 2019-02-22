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
	    url:basePath + '/admin/activity/enroll/listActivityEnrollByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','活动信息','联系人','性别','手机号码','电子邮箱','报名时间','状态 ','报名人数','付款方式','总金额'],
		colModel:[ 
			{name:"id",width:80,formatter:optFormater,hidden:true},
            {name:"activity.name",width:250},
            {name:"linkMan",width:100},
            {name:"sex",width:100,formatter:sexFormater},
            {name:"mobile",width:120},
            {name:"email",width:120},
            {name:"enrollTime",width:100,formatter:'date',formatoptions: {newformat:'Y-m-d'}},
            {name:"state",width:100,formatter:stateFormater},
            {name:"number",width:100},
            {name:"payState",width:100,formatter:payStateFormatter},
            {name:"sumPrice",width:100}
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width() - 10;
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateActivityEnrollFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeActivityEnrollFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

function sexFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return "女";
	}else if(cellvalue == 1){
		return "男";
	}else{
		return "--";
	}
}

function stateFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return "<span style='color:gray;'>未审核</span>";
	}else if(cellvalue == 1){
		return "<span style='color:green;'>审核通过</span>";
	}else if(cellvalue == 2){
		return "<span style='color:red;'>审核未通过</span>";
	}else{
		return "--";
	}
}

function payStateFormatter(cellvalue,options,rowObject){
	if(cellvalue == 1){
		return "线下付款 ";
	}else if(cellvalue == 2){
		return "线上付款 ";
	}else{
		return "--";
	}
}

/**
 * 添加活动报名
 */
function addActivityEnroll(){
	$.dialog.open(basePath + "/admin/activity/enroll/edit.htm?m="+Math.random(),{
			title : "添加活动报名",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 审核通过
 */
function auditPass(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length<=0){
		$.dialog.alert("请至少选择一条数据!");
		return;
	}
	for (var i = 0; i < selIds.length; i++) {
		var rowData = $("#table").jqGrid('getRowData',selIds[i]);
		if(rowData.payState == 2){
			$.dialog.alert("线上付款不需要审核,请重新选择!");
			return;
		}
	}
	$("body").mask("正在修改审核状态，请稍后...");
	ajaxPOST(basePath + "/admin/activity/enroll/updateActivityEnrollState.htm?m="+Math.random(),{"selIds":selIds.join(","),"item.state":1},function(data){
		$("body").unmask();
		 reloadCommonGrid("table");
	});
}

/**
 * 审核不通过
 */
function auditNotPass(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length<=0){
		$.dialog.alert("请至少选择一条数据!");
		return;
	}
	$("body").mask("正在修改审核状态，请稍后...");
	ajaxPOST(basePath + "/admin/activity/enroll/updateActivityEnrollState.htm?m="+Math.random(),{"selIds":selIds.join(","),"item.state":2},function(data){
		$("body").unmask();
		 reloadCommonGrid("table");
	});
}

/**
 * 删除活动报名
 * @param {Object} id
 */
function removeActivityEnrollFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/activity/enroll/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelActivityEnroll(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/activity/enroll/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询活动报名
 */
function searchActivityEnroll(){
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
 * 修改活动报名
 */
function updateActivityEnrollFN(id){
	$.dialog.open(basePath + "/admin/activity/enroll/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改活动报名",
		width : "600px",
		height : "400px",
		lock : true
	});
}

/**
 * 报名信息导出
 */
function exportInfo(){
	var searchKey = $("#searchKey").val();
	window.location.href = basePath+"/admin/activity/enroll/doExportInfo.htm?m="+ Math.random()+"&condition.activityName="+searchKey;
}  

/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
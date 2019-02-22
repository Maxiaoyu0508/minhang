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
    // 新增意见反馈表
    $("body").on("click","#addBtn",addSysFeedback);
	// 批量意见反馈表
    $("body").on("click","#batchDelBtn",doBatchDelSysFeedback);
	// 查询
    $("body").on("click","#searchBtn",searchSysFeedback);
	// 刷新
    $("body").on("click","#refreshGridBtn",refreshGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 95;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/sys/feedback/listSysFeedbackByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','客户名称','提交时间','电子邮件','联系方式','内容'],
		colModel:[ 
			{name:"id",width:80,align:"left",formatter:optFormater},
            {name:"memberUserName",width:100},
            {name:"createDate",width:150},
            {name:"email",width:200},
            {name:"contact",width:100},
            {name:"content",width:700}
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
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	//var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateSysFeedbackFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeSysFeedbackFN('"+rowObject.id+"');return false;\">删除</a>";
	//btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" | ");
}

/**
 * 添加意见反馈表
 */
function addSysFeedback(){
	$.dialog.open(basePath + "/admin/sys/feedback/edit.htm?m="+Math.random(),{
			title : "添加意见反馈表",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除意见反馈表
 * @param {Object} id
 */
function removeSysFeedbackFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/sys/feedback/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelSysFeedback(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/sys/feedback/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询意见反馈表
 */
function searchSysFeedback(){
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
 * 修改意见反馈表
 */
function updateSysFeedbackFN(id){
	$.dialog.open(basePath + "/admin/sys/feedback/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改意见反馈表",
		width : "600px",
		height : "400px",
		lock : true
	});
}

/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
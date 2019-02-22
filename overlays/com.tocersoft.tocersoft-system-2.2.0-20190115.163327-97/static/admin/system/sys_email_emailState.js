$(document).ready(function(){
	//初始化操作按钮
	initOperatorBtn();
	//初始化表格
	initable();
});	

/**
 * 初始化表格
 */
function initable(){
	var gh = $(window).height() - $('#operBar').height() - 91;
	$("#table").jqGrid({
		url:basePath+"/admin/email/ajaxEmailList.htm",
		colNames:["操作","发送时间","邮件标题 ","接收人","发送状态"],
		colModel:[
			{name:"id",title:false,width:50,align:"center",sortable:false,formatter:optFormater},
			{name:"planSendDate",title:false,width:100,align:"center"},
			{name:"title",title:false,width:300,align:"center",sortable:false,editable:true,editoptions:{size:20}},
			{name:"email",title:false,width:300,align:"center"},
			{name:"flag",width:100,align:"center",formatter:flagFormater}
		],
		caption:"邮件发送列表",
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
	   	height:gh,
		jsonReader:{id: "id",root:"resultList"}
	});
	$("#table").jqGrid("navGrid","#pagerBar");
	
	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
	 	var width = $(window).width()-23;
	 	$("#table").jqGrid('setGridWidth', width);
	}
	
}

/**
 * 格式化操作按钮
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns
 */
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var deleteUpdateBtn = "<a href='javascript:;' class='no_unl' onclick=\"del('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(deleteUpdateBtn);
	return btns.join(" ");
}

function flagFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return "<span style='color:grey;'>未发送</span>";;
	}else if(cellvalue == 1){
		return "<span style='color:green;'>已发送</span>";
	}else if(cellvalue == 2){
		return "<span style='color:red;'>发送失败</span>";
	}else{
		return "--";
	}
}
/**
 * 初始化操作按钮
 */
function initOperatorBtn(){
	//查询
	$("#searchEmailBtn").click(searchEmailFn);
	//刷新
	$("#refreshBtn").click(reloadGrid);
}

/**
 * 删除
 * @param id
 */
function del(id){
	$.dialog.confirm('确认要进行删除吗？',function(){
		$.post(basePath+"/admin/email/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$.dialog.alert(data.message,function(){
				reloadGrid();
			});
		});
	});
}

//查询
function searchEmailFn(){
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

// 加载属性页面
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}
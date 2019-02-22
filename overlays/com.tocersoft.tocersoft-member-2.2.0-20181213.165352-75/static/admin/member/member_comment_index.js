$(document).ready(function(){
	//初始化表格
 	initTable();
});

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/member/comment/listMemberCommentByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','会员姓名','评论内容','评论对象类型','评论对象名称','审核状态'],
		colModel:[ 
			{name:"id",width:50,formatter:optFormater},
            {name:"memberName",width:100},
            {name:"content",width:400},
            {name:"objectType",width:80,formatter:typeFormater},
            {name:"objectName",width:100},
            {name:"state",width:80,formatter:stateFormater}
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width() - 10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
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
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeMemberCommentFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 格式化评论对象类型
 */
function typeFormater(cellvalue,options,rowObject){
	if(cellvalue == 1){
		return "资源";
	}else if(cellvalue == 2){
		return "课程";
	}else{
		return "--";
	}
}

/**
 * 格式化审核状态
 */
function stateFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return "<span class='status-gray'>未审核</span>";
	}else if(cellvalue == 1){
		return "<span class='status-green'>审核通过</span>";
	}else if(cellvalue == 2){
		return "<span class='status-red'>审核不通过</span>";
	}else{
		return "--";
	}
}

/**
 * 添加会员评论
 */
function addMemberComment(){
	$.dialog.open(basePath + "/admin/member/comment/edit.htm?m="+Math.random(),{
			title : "添加会员评论",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除会员评论
 * @param {Object} id
 */
function removeMemberCommentFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/member/comment/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelMemberComment(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/comment/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 审核通过
 */
function auditAdopt(){
	//审核通过确认
	$.dialog.confirm('确认审核通过吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/comment/auditComment.htm?m=" + Math.random(),{"selIds":selIds.join(","),"item.state":1},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 审核不通过
 */
function auditNotPass(){
	//审核不通过确认
	$.dialog.confirm('确认审核不通过吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/comment/auditComment.htm?m=" + Math.random(),{"selIds":selIds.join(","),"item.state":2},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询会员评论
 */
function searchMemberComment(){
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
 * 修改会员评论
 */
function updateMemberCommentFN(id){
	$.dialog.open(basePath + "/admin/member/comment/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改会员评论",
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
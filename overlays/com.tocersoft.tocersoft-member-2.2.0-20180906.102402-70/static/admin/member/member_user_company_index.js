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
    // 新增会员企业关联表
    $("body").on("click","#addBtn",addMemberUserCompany);
	// 批量会员企业关联表
    $("body").on("click","#batchDelBtn",doBatchDelMemberUserCompany);
	// 查询
    $("body").on("click","#searchBtn",searchMemberUserCompany);
	// 刷新
    $("body").on("click","#refreshGridBtn",refreshGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/member/user/company/listMemberUserCompanyByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','会员ID','会员企业ID','所属职位',''],
		colModel:[ 
			{name:"id",width:80,formatter:optFormater},
            {name:"memberUserId",width:100},
            {name:"memberCompanyId",width:100},
            {name:"position",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"会员企业关联表列表",
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateMemberUserCompanyFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeMemberUserCompanyFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加会员企业关联表
 */
function addMemberUserCompany(){
	$.dialog.open(basePath + "/admin/member/user/company/edit.htm?m="+Math.random(),{
			title : "添加会员企业关联表",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除会员企业关联表
 * @param {Object} id
 */
function removeMemberUserCompanyFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/member/user/company/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelMemberUserCompany(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/user/company/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询会员企业关联表
 */
function searchMemberUserCompany(){
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
 * 修改会员企业关联表
 */
function updateMemberUserCompanyFN(id){
	$.dialog.open(basePath + "/admin/member/user/company/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改会员企业关联表",
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
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
    // 新增会员角色
    $("body").on("click","#addBtn",addMemberRole);
	// 批量会员角色
    $("body").on("click","#batchDelBtn",doBatchDelMemberRole);
	// 查询
    $("body").on("click","#searchBtn",searchMemberRole);
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
	    url:basePath + '/admin/member/role/listMemberRoleByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','会员角色名称','会员角色代码','角色类型 ','说明',''],
		colModel:[ 
			{name:"id",width:80,formatter:optFormater},
            {name:"name",width:100},
            {name:"code",width:100},
            {name:"type",width:100,formatter:roleTypeFormater},
            {name:"remark",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"会员角色列表",
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateMemberRoleFN('"+rowObject.id+"');return false;\">修改</a>";
	btns.push(updateBtn);
	if(rowObject.type != 1){
		var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeMemberRoleFN('"+rowObject.id+"');return false;\">删除</a>";
		btns.push(removeBtn);
	}
	return btns.join(" ");
}

/**
 * 添加会员角色
 */
function addMemberRole(){
	$.dialog.open(basePath + "/admin/member/role/edit.htm?m="+Math.random(),{
			title : "添加会员角色",
			width : "1000px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除会员角色
 * @param {Object} id
 */
function removeMemberRoleFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/member/role/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelMemberRole(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/role/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询会员角色
 */
function searchMemberRole(){
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
 * 修改会员角色
 */
function updateMemberRoleFN(id){
	$.dialog.open(basePath + "/admin/member/role/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改会员角色",
		width : "1000px",
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
/**
 *  格式化角色类型
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function roleTypeFormater(cellvalue,options,rowObject){
	var str = "";
	if(cellvalue == 1){
		str = '<span class="status-red">系统角色</span>';
	}else if(cellvalue == 2){
		str = '<span class="status-green">用户角色</span>';
	}
	return str;
}
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
	//新增角色
	$("body").on("click","#addBtn",addNewRole);
	//查询角色
	$("body").on("click","#searchBtn",searchGrid);
	// 刷新
	$("#refreshGridBtn").on("click",reloadCommonGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 95;
	$('#table').jqGrid({
		url:basePath + '/admin/auth/role/listRoleByPage.htm',
		colNames:['操作','角色名称','角色代码','角色类型','描述','授权用户'],
		colModel:[
			{name:"id",width:60,formatter:optFormater},
			{name:'name',width:100,align:"left"},
			{name:"code",width:80,align:"left"},
			{name:"type",width:60,align:"center",formatter:roleTypeFormater},
			{name:"remark",width:100,align:"left"},
			{name:"userNames",width:300,align:"left"}
		],
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
        autoScroll:true,
	   	height:gh,
		jsonReader:{id: "id",root:"resultList"}
  	});
		
		
	$('#jqgh_table_type').css({"textAlign":"center"});
	$('.ui-jqgrid-bdiv').css({"height":$(window).height() - 95});
		
		
	/*	
	   	height:gh
	});*/
	$("#table").jqGrid("navGrid","#pagerBar");
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
	var updateBtn = "<a href='javascript:void(0);' onclick=\"updateFN('"+rowObject.id+"');return false;\">修改</a>&nbsp;";
	btns.push(updateBtn);
	if(rowObject.type != 1){
		var removeBtn = "<a href='javascript:void(0);' onclick=\"removeFN('"+rowObject.id+"');return false;\">删除</a>&nbsp;"
		btns.push(removeBtn);
	}
	return btns.join(" ");
}

/**
 * 格式化角色类型
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function roleTypeFormater(cellvalue,options,rowObject){
	var str = "";
	if(cellvalue == 1){
		str = '<span class="status-red">系统</span>';
	}else if(cellvalue == 2){
		str = '<span class="status-green">用户</span>';
	}
	return str;
}

/**
 * 添加新角色
 */
function addNewRole(){
	var url = basePath + '/admin/auth/role/edit.htm?m=' + Math.random();
	window.location.href = url;
}

/**
 * 删除角色
 * @param id
 */
function removeFN(id){
	var rowData = $("#table").jqGrid('getRowData',id);
	if(rowData.userNames.length > 0){
		$.dialog.alert("该角色下存在授权的用户，<br/>请先解除授权后再删除该角色");
		return;
	}
	
	$.dialog.confirm("确定要删除该角色吗？",function(){
		$("body",parent.document).mask("正在删除，请稍候...");
		ajaxPOST(basePath + "/admin/auth/role/del.htm?m=" + Math.random(),{"selIds":id},function(data){
			$("body",parent.document).unmask();
			if(data.status != "success"){
				$.dialog.alert(data.message);
				return;
			}
			reloadCommonGrid();
		});
	});
}

/**
 * 修改角色
 * @param id
 * @param name
 */
function updateFN(id){
	var url = basePath + '/admin/auth/role/edit.htm?item.id=' + id;
	window.location.href = url;
}


/**
 * 修改角色
 * @param type 1 系统脚色 2普通脚色
 */
function setSysRole(type){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(!selIds || selIds.length == 0){
		$.dialog.alert("请选择要设置的角色");
		return;
	}
	ajaxPOST(basePath + "/admin/auth/role/setSysRole.htm?m=" + Math.random(),{"selIds":selIds.join(","),"type":type},function(data){
		$("body",parent.document).unmask();
		if(data.status != "success"){
			$.dialog.alert(data.message);
			return;
		}
		reloadCommonGrid();
	});
}
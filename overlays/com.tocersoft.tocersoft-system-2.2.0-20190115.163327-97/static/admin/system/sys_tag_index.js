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
    // 新增标签
    $("body").on("click","#addBtn",addSysTag);
	// 批量标签
    $("body").on("click","#batchDelBtn",doBatchDelSysTag);
	// 查询
    $("body").on("click","#searchBtn",searchSysTag);
	// 刷新
    $("body").on("click","#refreshGridBtn",refreshGrid);
    // 设置热门标签
    $("body").on("click","#hotTag",doHotTag);
    // 取消热门标签
    $("body").on("click","#unHotTag",delHotTag);
}

/**
 * 初始化表格    ---{name:"type",width:100},---'标签类型'  可能会需要类型属性暂时注释
 */
function initTable(){
	var gh = $(window).height() - 95;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/sys/tag/listSysTagByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','标签名称','标签类型','标签描述','排序：数字越小越靠前',''],
		colModel:[ 
			{name:"id",width:50,formatter:optFormater,align:'center'},
            {name:"name",width:100,align:'left'},
            {name:"typeName",width:50,align:'center'},
            {name:"desc",width:100},
            {name:"sort",width:80,align:'center'},
			{name:"blank",width:450}
		],
		viewrecords: true,
		loadComplete: function(data){
			var width = $(window).width() - 22;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,
		jsonReader:{id: "id",root:"resultList"}
  	});
    $('#jqgh_table_id').css({"textAlign":"center"});
    $('#jqgh_table_typeName').css({"textAlign":"center"});
    $('#jqgh_table_sort').css({"textAlign":"center"});
  	$("#table").jqGrid("navGrid","#pagerBar");
}
/**
 * 设置热门标签
 */
function doHotTag(){
	var array =[];
	//标签id数组
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds == null || selIds == ''){
		$.dialog.alert("请选择要设置的标签");
		return;
	}
	
	array = selIds;
	for (var i = 0; i < array.length; i++) {
		var data = $("#table").jqGrid("getRowData",array[i]);
		var type = data.type;
		if(type == '热门标签'){
			$.dialog.alert("选中的标签中已有热门标签，请检查");
			return;
		}
	}
	
	 $.post(basePath +"/admin/sys/tag/update.htm",{"item.type":1,"selIds":selIds.join(",")},function(data){
		   if(data.status == 'success'){
			   $.dialog.alert(data.message);
			    refreshGrid();
		   }else{
			   $.dialog.alert(data.message);
		   }
	 });
	
}

/**
 * 取消热门标签
 */
function delHotTag(){
	var array =[];
	//标签id数组
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds == null || selIds == ''){
		$.dialog.alert("请选择要设置的标签");
		return;
	}
	
	array = selIds;
	for (var i = 0; i < array.length; i++) {
		var data = $("#table").jqGrid("getRowData",array[i]);
		var type = data.type;
		if(type == ''){
			$.dialog.alert("只能选中热门标签");
			return;
		}
	}
	
	 $.post(basePath +"/admin/sys/tag/update.htm",{"item.type":0,"selIds":selIds.join(",")},function(data){
		   if(data.status == 'success'){
			   $.dialog.alert(data.message);
			    refreshGrid();
		   }else{
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateSysTagFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeSysTagFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加标签
 */
function addSysTag(){
	$.dialog.open(basePath + "/admin/sys/tag/edit.htm?m="+Math.random(),{
			title : "添加标签",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除标签
 * @param {Object} id
 */
function removeSysTagFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/sys/tag/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelSysTag(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/sys/tag/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询标签
 */
function searchSysTag(){
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
 * 修改标签
 */
function updateSysTagFN(id){
	$.dialog.open(basePath + "/admin/sys/tag/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改标签["+id+"]",
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
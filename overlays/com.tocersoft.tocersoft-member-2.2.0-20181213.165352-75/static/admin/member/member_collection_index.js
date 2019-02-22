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
	// 批量会员收藏
    $("body").on("click","#batchDelBtn",doBatchDelMemberCollection);
	// 查询
    $("body").on("click","#searchBtn",searchMemberCollection);
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
	    url:basePath + '/admin/member/collection/listMemberCollectionByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','会员姓名','收藏对象类型','收藏对象名称',''],
		colModel:[ 
			{name:"id",width:80,formatter:optFormater},
            {name:"memberUserName",width:100},
            {name:"objectType",width:100,formatter:typeFormater},
            {name:"objectName",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"会员收藏列表",
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
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeMemberCollectionFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 格式化收藏类型
 * @param cellvalue
 * @param options
 * @param rowObject
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
 * 删除会员收藏
 * @param {Object} id
 */
function removeMemberCollectionFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/member/collection/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelMemberCollection(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/collection/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询会员收藏
 */
function searchMemberCollection(){
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
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
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
    // 新增文章评论与回复
	$("#addBtn").on("click",addCmsArticleReply);
	// 批量文章评论与回复
	$("#batchDelBtn").on("click",doBatchDelCmsArticleReply);
	// 查询
	$("#searchBtn").on("click",searchCmsArticleReply);
	// 刷新
	$("#refreshGridBtn").on("click",refreshGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/cms/article/reply/listCmsArticleReplyByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','评论人','文章名称','评论内容'],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			{name:"member.name",width:100,formatter:memberFormater},
            {name:"cmsArticle.name",width:400},
            {name:"content",width:500},
		],
		viewrecords: true,
		caption:"文章评论与回复列表",
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
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
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCmsArticleReplyFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(removeBtn);
	return btns.join(" ");
}

function memberFormater(cellvalue,options,rowObject){
	if(cellvalue == null || cellvalue == "" || cellvalue == undefined){
		return rowObject.memberName;
	}else{
		return cellvalue;
	}
}

/**
 * 添加文章评论与回复
 */
function addCmsArticleReply(){
	$.dialog.open(basePath + "/admin/cms/article/reply/edit.htm?m="+Math.random(),{
			title : "添加文章评论与回复",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除文章评论与回复
 * @param {Object} id
 */
function removeCmsArticleReplyFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/article/reply/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsArticleReply(){
	//删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/article/reply/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询文章评论与回复
 */
function searchCmsArticleReply(){
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
 * 修改文章评论与回复
 */
function updateCmsArticleReplyFN(id){
	$.dialog.open(basePath + "/admin/cms/article/reply/edit.htm?m="+Math.random()+"&item.id=" + id,{
		title : "修改文章评论与回复",
		width : "600px",
		height : "400px",
		lock : true
	});
}


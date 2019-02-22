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
    // 新增自媒体
	$("#addBtn").on("click",addCmsBlogAuthor);
	// 批量删除自媒体
	$("#batchDelBtn").on("click",doBatchDelCmsBlogAuthor);
	// 查询
	$("#searchBtn").on("click",searchCmsBlogAuthor);
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
	    url:basePath + '/admin/cms/blog/author/listCmsBlogAuthorByPage.htm?m='+Math.random(),
	    postData:{
	    	"condition.type":2
	    },
	    datatype:"json",
	    colNames:['操作','自媒体名称','自媒体子名称','自媒体简介','排序','文章数量','收藏量','浏览量','点赞量','是否推荐',''],
		colModel:[ 
			{name:"id",index:"id",width:100,formatter:optFormater},
            {name:"name",width:200},
            {name:"nameSub",width:200},
            {name:"descBrief",width:200},
            {name:"sort",width:60},
            {name:"numArticle",width:80},
            {name:"countCollect",width:80},
            {name:"countView",width:80},
            {name:"countLike",width:80},
            {name:"isRecommend",formatter:recommendFormater,width:80},
			{name:"blank",width:10}
		],
		viewrecords: true,
		caption:"自媒体列表",
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateCmsBlogAuthorFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCmsBlogAuthorFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}
/**
 * 对是否推荐的格式化
 * @param c
 * @param o
 * @param r
 * @returns {String}
 */
function recommendFormater(c,o,r){
	if(c==1){
		return "是";
	}else if(c==0){
		return "否";
	}else{
		return "--";
	}
}
/**
 * 添加自媒体
 */
function addCmsBlogAuthor(){
	$.dialog.open(basePath + "/admin/cms/blog/author/media_edit.htm?m="+Math.random(),{
			title : "添加自媒体",
			width : "900px",
			height : "700px",
			lock : true
		}
	);
}

/**
 * 删除自媒体
 * @param {Object} id
 */
function removeCmsBlogAuthorFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/blog/author/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsBlogAuthor(){
	//删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/blog/author/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询博客博主
 */
function searchCmsBlogAuthor(){
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
 * 修改博客博主
 */
function updateCmsBlogAuthorFN(id){
	$.dialog.open(basePath + "/admin/cms/blog/author/edit.htm?m="+Math.random()+"&item.id=" + id,{
		title : "修改自媒体",
		width : "900px",
		height : "700px",
		lock : true
	});
}


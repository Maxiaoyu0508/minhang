$(document).ready(function(){
	//初始化表格
 	initTable();
});

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 95;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/cms/link/listCmsLinkByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['缩略图','友情链接名称','友情链接地址','备注','id'],
		colModel:[
            {name:"photoThumb",width:60},
            {name:"name",width:150,formatter:nameFormater},
            {name:"linkUrl",width:200},
            {name:"remark",width:600},
            {name:"id",hidden:true}
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
function nameFormater(cellvalue,options,rowObject){
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"viewCmsLinkFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加友情链接
 */
function addCmsLink(){
	$.dialog.open(basePath + "/admin/cms/link/edit.htm?m="+Math.random(),{
			title : "添加友情链接",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除友情链接
 * @param {Object} id
 */
function removeCmsLinkFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/link/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsLink(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/cms/link/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询友情链接
 */
function searchCmsLink(){
	var arr = $("#searchForm").serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		postData[entry["name"]]=entry["value"];
	}
	$('#table').setGridParam({
		dataType:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}


/**
 * 查看友情链接
 */
function viewCmsLinkFN(id){
	$.dialog.open(basePath + "/admin/cms/link/view.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "友情链接",
		width : "800px",
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
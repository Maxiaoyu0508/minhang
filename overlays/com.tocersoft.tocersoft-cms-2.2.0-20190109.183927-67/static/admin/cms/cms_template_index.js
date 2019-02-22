$(document).ready(function(){
	//初始化表格
 	initTable();
});

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 32-28-33;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/cms/template/listCmsTemplateByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['模板名称','模板代号','模板类型','页面链接','','id'],
		colModel:[ 
            {name:"name",width:100,formatter:nameFormater},
            {name:"code",width:100},
            {name:"type",width:100,formatter:typeFormater},
            {name:"path",width:100},
						{name:"blank",width:400},
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
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"updateCmsTemplateFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加页面模板
 */
function addCmsTemplate(){
	$.dialog.open(basePath + "/admin/cms/template/edit.htm?m="+Math.random(),{
			title : "添加页面模板",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除页面模板
 * @param {Object} id
 */
function removeCmsTemplateFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/cms/template/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsTemplate(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/cms/template/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询页面模板
 */
function searchCmsTemplate(){
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
 * 修改页面模板
 */
function updateCmsTemplateFN(id){
	$.dialog.open(basePath + "/admin/cms/template/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改页面模板",
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

/**
 * 格式化模板类型
 * 1:文章，2：栏目
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function typeFormater(cellvalue,options,rowObject){
    var str = "";
    if(cellvalue == 1){
        str = "栏目";
    }else if(cellvalue == 2){
        str = "文章";
    }else{
        str = "--";
    }
	return str;
}
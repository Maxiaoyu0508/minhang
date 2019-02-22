$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
	//初始化表格
 	initTable();
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"标签名称不能为空",onErrorMax:"标签名称长度过长"});
    $("#type").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"标签类型不能为空",onErrorMax:"标签类型长度过长"});
}

/**
 * 初始化表格
 */
function initTable(){
	var tagId = $("#tagId").val();
	if(tagId == ''){
		tagId = 'null';
	}
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/cms/article/tag/listCmsArticleTagByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','排序','文章名称','简介','文章id'],
		colModel:[ 
			{name:"id",index:"id",width:50,formatter:optFormater},
			{name:"cmsArticle.sort",index:"sort",width:50,editable: true},
            {name:"cmsArticle.name",width:400},
            {name:"cmsArticle.summary",width:450},
            {name:"cmsArticle.id",hidden:true,width:30}
		],
		postData:{"condition.tagId":tagId},
		viewrecords: true,
		caption:"文章列表",
		loadComplete: function(data){
			$(this).setGridWidth(990);
	   	},
	   	afterSaveCell:function(rowId, colName, cellValue, iRow, iCol){
	   		var rowData = $("#table").jqGrid("getRowData",rowId);
	   		var postData = {
   				"condition.articleId" :rowData["cmsArticle.id"],
   				"condition.sort" : cellValue
	   		};
	   		$.post(basePath + "/admin/cms/article/tag/updateSort.htm?m="+ Math.random(),postData,function(data){
	   			if(data.status == "error"){
	   				$.dialog.alert(data.message);
	   				return;
	   			}else{
	   				refreshGrid();
	   			}
	   		});
	   	},
	    cellEdit : true,
	    cellsubmit: "clientArray",
	   	rowNum:10,
	   	shrinkToFit: true,
	   	height:282,
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status == "success"){
        		var win = $.dialog.open.origin;
        		win.reloadCommonGrid("table");
        		$.dialog.alert("保存成功!");
        		if($("#tagId").val() == ''){
        			$("#tagId").val(data.data.id);
        		}
        	}else{
        		$.dialog.alert(data.message);
        		if(typeof data.token != "undefined" && data.token.length > 0){
        			$("input[name='token']").val(data.token);
        		}
        	}
        }
    });
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存标签
	$("#saveBtn").on("click",saveCmsTag);
	//选择文章
	$("#chooseBtn").on("click",chooseArticleFn);
	//关闭窗口
	$("#exitBtn").on("click",closeWin);
	// 查询
	$("#searchBtn").on("click",searchCmsTag);
	// 刷新
	$("#refreshGridBtn").on("click",refreshGrid);
	// 批量文章标签
	$("#batchDelBtn").on("click",doBatchDelCmsTag);
}

/**
 * 选择文章
 */
function chooseArticleFn(){
	if($("#tagId").val() == ''){
		$.dialog.alert("请先保存该标签!");
		return;
	}
	$.dialog.open(basePath + "/admin/cms/article/choose_tag_article.htm?m="+Math.random()+"&condition.tagId=" + $("#tagId").val(),{
		title : "选择文章",
		width : "1000px",
		height : "550px",
		lock : true
	});
}

/**
 * 批量删除
 */
function doBatchDelCmsTag(){
	//删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return;
	}
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/article/tag/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			var win= $.dialog.open.origin;//获取父窗口
			win.reload();
			reloadCommonGrid("table");
		});
	});
}

function removeCmsTagFN(id){
	var selIds = new Array();
	selIds.push(id);
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/cms/article/tag/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			var win= $.dialog.open.origin;//获取父窗口
			win.reload();
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询文章标签
 */
function searchCmsTag(){
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
 * 保存文章标签
 */
function saveCmsTag(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}

/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeCmsTagFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(removeBtn);
	return btns.join(" ");
}

function reload(){
	var win= $.dialog.open.origin;//获取父窗口
	win.reload();
	reloadCommonGrid("table",{"condition.tagId":$("#tagId").val()});
}

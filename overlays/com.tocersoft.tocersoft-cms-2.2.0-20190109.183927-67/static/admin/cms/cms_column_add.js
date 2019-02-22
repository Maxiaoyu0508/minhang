var editor,nowIndex=1;
//专栏子版块：1-动态报道，2-安拓推荐，3-相关资讯，4-大家看法，5-相关案例
var section = ["动态报道","安拓推荐","相关资讯","大家看法","相关案例"];
$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
	//初始化页签
	initTab();
	initTabSub();
	//百度编辑器
	initEditor();
	//初始化选择框
	$("#gjc").chosen();
	function initEditor(){
		editor = UE.getEditor('descHtml', {
		    autoHeightEnabled: true,
		    autoFloatEnabled: true
		});
	}
	
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 10, onError: function (msg, obj, errorlist) { 
    	$.dialog.tips(errorlist);
    	//$.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" });
    } });
    $("#name").formValidator({validatorGroup:10}).inputValidator({min:1,max:255,onErrorMin:"专栏名称不能为空",onErrorMax:"专栏名称长度过长"});
    $("#descBrief").formValidator({validatorGroup:10}).inputValidator({min:1,max:255,onErrorMin:"专栏简介不能为空",onErrorMax:"专栏简介长度过长"});
   // $("#descHtml").formValidator({validatorGroup:10}).inputValidator({min:1,max:10000,onErrorMin:"专栏介绍不能为空",onErrorMax:"专栏介绍长度过长"});
    //$("#gjc").formValidator({validatorGroup:10}).inputValidator({min:1,max:255,onErrorMin:"专栏标签不能为空"});
    $("#sort").formValidator({validatorGroup:10}).inputValidator({min:1,max:255,onErrorMin:"专栏排序不能为空"});
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
        		$("#itemId").val(data.message);
        		$.dialog.alert("保存成功!");
        	}else{
        		$.dialog.alert(data.message);
        	}
        }
    });
}

/**
 * 初始化表格
 */
function initTable(index){
	nowIndex = index;
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table"+index).jqGrid({
	    url:basePath + '/admin/cms/article/listColumnArticleByPageAndSection.htm?m='+Math.random(),
	    datatype:"json",
	    postData:{"condition.columnId":$("#itemId").val(),"condition.sectionId":index},
	    colNames:['操作','文章名称','阅读次数','点赞次数','排序',''],
		colModel:[ 
		    {name:"id",index:"id",width:80,sortable:false,formatter:optFormater},
            {name:"name",width:300},
            {name:"readNum",width:300},
            {name:"likeNum",width:300},
            {name:"sort",width:100,editable:true,editoptions:{size:30}},
            {name:"columnArticleId",index:"columnArticleId",width:80,hidden:true}
		],
		viewrecords: true,
		sortname:"order",
		sortorder:"desc",
		caption:section[index-1]+"列表",
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table"+index).jqGrid("navGrid","#pagerBar");
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存专栏管理
	$("#saveBtn").on("click",saveCmsColumn);
	//关闭窗口
	$("#exitBtn").on("click",closeWin);
	//选择文章按钮事件
	$(".chooseArticle").each(function(i,item){
		$(this).click(function(){
			//栏目id
			var columnId = $('#itemId').val();
			if(columnId == "" || columnId == null){
				$.dialog.alert("请先保存该栏目!");
				return;
			}
			/**
			 *选择文章列表
			 */
			$.dialog.open(basePath + "/admin/cms/article/choose_article.htm?m="+Math.random()+"&condition.columnId=" + columnId + "&condition.sectionId="+(i+1),{
				title : section[i]+"管理",
				width : "850px",
				height : "560px",
				lock : true
			});
		});
	});
	
	//删除文章按钮事件
	$(".delGameEnroll").each(function(j,item){
		$(this).click(function(){
			var selIds = $("#table"+(j+1)).jqGrid("getGridParam", "selarrrow");
			if(selIds.length == 0){
				$.dialog.alert("请至少选择一条记录!");
				return;
			}
			var ids = new Array();
			for(var k = 0;k < selIds.length ; k++){
				var rowData = $("#table"+(j+1)).jqGrid('getRowData',selIds[k]);
				ids.push(rowData.columnArticleId);
			}
			$.post(basePath+"/admin/cms/column/article/del.htm?m="+Math.random(),{"selIds":ids.join(",")},function(data){
				reloadTableBySection(j+1);
			},"json");
		});
	});
}

//初始化页签
function initTab(){
	// 默认状态
	$('.J-tab-content').eq(0).siblings().hide();
	// 切换tab选项
	$(".J-tab").eq(0).addClass('no-bg').siblings().addClass('yes-bg').removeClass('no-bg');
	$(".J-tab").each(function(i){
		$(this).click(function(){
			$(this).addClass('no-bg').removeClass('yes-bg');
			$(this).siblings().addClass('yes-bg').removeClass('no-bg');
			$('.J-tab-content').eq(i).show().siblings().hide();
		});
	});
	
	$(".J-tab").eq(parseInt(currentTabIndex)).trigger("click");
}

//初始化页签
function initTabSub(){
	// 默认状态
	$('.J-tab-sub-content').eq(0).siblings().hide();
	
	// 切换tab选项
	$(".J-tab-sub").eq(0).addClass('no-bg').siblings().addClass('yes-bg').removeClass('no-bg');
	$(".J-tab-sub").each(function(i){
		$(this).click(function(){
			if(!$(this).is(".no-click")){
				$(this).addClass('no-bg').removeClass('yes-bg');
				$(this).siblings().addClass('yes-bg').removeClass('no-bg');
				$('.J-tab-sub-content').eq(i).show().siblings().hide();
				if(i > 0){
					initTable(i);
				}
			}
		});
	});
}

function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' id='toUpdateBtn_"+rowObject.columnArticleId+"' onclick=\"updateFN('"+rowObject.id+"','"+rowObject.columnArticleId+"','"+rowObject.name+"',"+nowIndex+");return false;\" title='修改'>修改</a>";
	btns.push(updateBtn);
	var doUpdateBtn = "<a href='javascript:;' id='doUpdateBtn_"+rowObject.columnArticleId+"' onclick=\"doUpdate('"+rowObject.id+"','"+rowObject.columnArticleId+"',"+nowIndex+");return false;\" style='display:none;' title='保存'>保存</a>";
	btns.push(doUpdateBtn);
	var cancelBtn = "<a href='javascript:;' id='cancelBtn_"+rowObject.columnArticleId+"' onclick=\"cancelFN('"+rowObject.id+"','"+rowObject.columnArticleId+"','"+rowObject.name+"',"+nowIndex+");return false;\" style='display:none;' title='取消'>取消</a>";
	btns.push(cancelBtn);
	return btns.join(" ");
}

/** 修改操作 */
function updateFN(id,columnArticleId,name,index){
  	$("#table"+index).jqGrid('editRow',id);
	toggleBtn(id,columnArticleId);
}

/** 按钮显示/隐藏切换 */
function toggleBtn(id,columnArticleId){
	$('#toUpdateBtn_'+columnArticleId).toggle();
	$('#doUpdateBtn_'+columnArticleId).toggle();
	$('#cancelBtn_'+columnArticleId).toggle();
}
/** 取消*/
function cancelFN(id,columnArticleId,name,index){
	$("#table"+index).jqGrid('restoreRow',id);
	toggleBtn(id,columnArticleId);
}

//执行修改操作
function doUpdate(id,columnArticleId,index){
	var sort = $("#table"+index).find('#'+id+'_sort').val();
	if(isNaN(sort)){
		var dialog = $.dialog({
			title:"提交失败",
			content:"排序输入错误!",
			ok:true
		});
		return;
	}
	sort = parseInt(sort);
	var postData = {
		'item.id':columnArticleId,
		'item.sort':sort
	}
	$.ajax({
		url:basePath+'/admin/cms/column/article/editCmsColumnArticle.htm?m='+Math.random(),
		type:'post',
		data:postData,
		success:function(data){
	        if (data.status == "success"){
	        	refreshGrid("#table"+index);
	        }else {
	          $.dialog.alert(data.message);
	        }
		},
		error:function(){
	       $.dialog({content: '保存失败!',okVal:"确定",ok: function(){}});
		}
	});
}

/**
 * 保存专栏管理
 */
function saveCmsColumn(){
	editor.sync();
	var result = $.formValidator.pageIsValid(10);
	if(!result){
		return;
	}
   	$("#fileInput").attr("disabled",true);
   	
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}

/**
 * 根据指定栏目加载数据
 * @param sectionId
 */
function reloadTableBySection(sectionId){
	$("#table"+sectionId).trigger('reloadGrid',[{page:1}]);
}
var dictId;
$(document).ready(function(){
	//初始化表格
	initTable();
	leftMenuTab();
	resizeWidth();
	
	//左右拖拽
	var divsp = new Separator(document.getElementById("categoryTreeDiv"),document.getElementById("categoryContentDiv"),separatorCallbackFN,SP_LEFTRIGHT,4); 
	$(window).resize(function(){
		resizeWidth();
	});
});

//拖拽后回调函数
function separatorCallbackFN(){
	resizeWidth();
}

function resizeWidth(){
	var ww = $(window).width();
	var tw = $("#categoryTreeDiv").width();
	var cw = ww-tw;
	$("#categoryContentDiv").width(cw);
	$("#table").setGridWidth(cw);
	$(".category-box").css('padding-left',tw);
}
//左侧菜单切换效果
function leftMenuTab(){
	$('.lmb-ul li').on('click',function(){
		$('.lmb-ul li').removeClass('cur');
		$(this).addClass('cur');
		dictId = $(this).attr('data-id');
	});
}

/**
 * 初始化表格
 */
function initTable(){
	var dictId = $('.lmb-ul li.cur').attr('data-id');
	var gh = $(window).height() - 90;
	$("#table").jqGrid({
		url:basePath+"/admin/system/dictItem/listSysDictItemByPage.htm?condition.dictId=" + dictId + "&m=" + Math.random(),
		colNames:["操作","ID","排序","名称","代码",""],
		colModel:[
			{name:"opt",width:50,formatter:optFormater},
			{name:"id",width:30,align:"center",hidden:true},
			{name:"sort",width:30,align:"center",editable:true,editoptions:{size:20}},
			{name:"name",width:120,align:"left",editable:true,editoptions:{size:50}},
			{name:"code",width:120,align:"left",editable:true,editoptions:{size:50}},
			{name:"blank",width:300}
		],
		sortname:"sort",
		sortorder:"asc",
		rownumbers:true,
		height:gh,
		rowNum:100,
		scroll:true,
		/*onSelectRow:function(id){
			dictId = id;
	   		var row = $("#table").jqGrid("getRowData",id);
	   		changeSelect(id,row.name);
//	   		$("#table2").jqGrid("setCaption","表单项列表 - " + row.name);
//	   		$("#table2").jqGrid("setGridParam",{datatype:'json',postData:{"condition.formId":id}}).trigger('reloadGrid',[{page:1}]);
	   	},*/
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
		jsonReader:{id: "id",root:"resultList"}
	});
	$("#table").jqGrid("navGrid","#pagerBar");
	
	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
	 	var width = $(window).width()-23;
	 	$("#table").jqGrid('setGridWidth', width);
	};
	
	$('#jqgh_table_id').css({"textAlign":"center"});
	$('#jqgh_table_sort').css({"textAlign":"center"});
	$('.ui-jqgrid-bdiv').css({"height":$(window).height() - 98})
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
	var updateBtn = "<a href='javascript:;' id='toUpdateBtn_"+rowObject.id+"' onclick='updateFN(\""+rowObject.id+"\",\""+rowObject.name+"\","+rowObject.type+");return false;'title='修改'>修改</a>";
	btns.push(updateBtn);
	var doUpdateBtn = "<a href='javascript:;' id='doUpdateBtn_"+rowObject.id+"' onclick=\"doUpdate('"+rowObject.id+"');return false;\" style='display:none;' title='保存'>保存</a>";
	btns.push(doUpdateBtn);
	var cancelBtn = "<a href='javascript:;' id='cancelBtn_"+rowObject.id+"' onclick='cancelFN(\""+rowObject.id+"\",\""+rowObject.name+"\","+rowObject.type+");return false;' style='display:none;' title='取消'>取消</a>";
	btns.push(cancelBtn);
	if(rowObject.type != 1){
		var removeBtn = "<a href='javascript:;' id='deleteBtn_"+rowObject.id+"' onclick=\"doDel('"+rowObject.id+"');return false;\" title='删除'>删除</a>";
		btns.push(removeBtn);
	}
	return btns.join(" ");
}

/**
 * 新增字典
 */
function toAddDict(){
	$.dialog.open(basePath+'/admin/system/dict/edit.htm?m=' + Math.random(),{
		title:'新增字典',
		width:'520px',
		height:'200px',
		lock:true
	});
	
}


/**
 * 修改字典
 */
function toUpdateDict(){
	var dictId = $(".lmb-ul li.cur").attr('data-id');
	$.dialog.open(basePath+'/admin/system/dict/edit.htm?item.id=' + dictId + '&m='+Math.random(),{
		title:'修改数据',
		width:'520px',
		height:'200px',
		lock:true
	});
}

/**
 * 删除字典
 */
function delDict(){
	$.dialog.confirm("确认要进行删除吗？",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath+"/admin/system/dict/del.htm?m="+Math.random(),{"selIds":dictId},function(data){
			$("body").unmask();
            if (data.status == "success") {
            	refreshDictSelect(data.options);
            }else{
           	 	$.dialog.alert(data.message);
            }
		});
	});
}

/**
 * 切换字典数据
 * @param dictId
 */
function changeSelect(dictId){
	/*if(dictId && dictId.length > 0){
		id = dictId;
	}else{
		id = $('#globalDict').val();
	}*/
	
	/*$('#changeId').attr("onclick","toUpdateDict(" + id + ")");*/
	/*$('#delId').attr("onclick","delDict(" + id + ")");*/
	var url =basePath+'/admin/system/dictItem/listSysDictItemByPage.htm?condition.dictId=' + dictId + '&m=' + Math.random();
	$("#table").jqGrid("setGridParam", {
	    url: url,    //设置表格的url  
	    datatype: "json"   //设置数据类型                                                    
 	}).trigger("reloadGrid",[{page:1}]);
	
}

/** 修改操作 */
function updateFN(id,name,type){
  	$("#table").jqGrid('editRow',id);
	toggleBtn(id,type);
}

/** 按钮显示/隐藏切换 */
function toggleBtn(id,type){
	$('#toUpdateBtn_'+id).toggle();
	$('#doUpdateBtn_'+id).toggle();
	$('#cancelBtn_'+id).toggle();
	if(type != 1){
		$('#deleteBtn_'+id).toggle();
	}
}

/**
 * 保存字典项
 * @param id
 */
function doUpdate(id){
	var name = $('#'+id+'_name').val();
	var code = $('#'+id+'_code').val();
	var sort = parseInt($('#'+id+'_sort').val());
	var globalId = $('#globalDict .cur').attr('id');
	if(null == name || name == ""){
		var dialog = $.dialog({
			title:"提交失败",
			content:"名称不能为空!",
			ok:true
		});
		return;
	}
	var reg = /^\d+$/;
	if(!reg.test(sort)){
		var dialog = $.dialog({
			title:"提交失败",
			content:"排序输入错误!",
			ok:true
		});
		return;
	}
	var postData = {
		'item.id':id,
		'item.name':name,
		'item.code':code,
		'item.sort':sort
	}
	ajaxPOST(basePath+'/admin/system/dictItem/saveDictItem.htm?m='+Math.random(),postData,function(data){
		if (data.status != "success"){
			$.dialog.alert(data.message);
			return;
        }

		refreshGrid();
	});
}

function cancelFN(id,name,type){
	$("#table").jqGrid('restoreRow',id);
	toggleBtn(id,type);
}

// 删除操作
function doDel(id){
	delDictItem([id]);
}

//批量删除
function doBatchDel(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(null == selIds || selIds.length == 0){
		$.dialog.alert("请选择要删除的行");
		return false;
	}
	delDictItem(selIds);
}

/**
 * 删除字典项
 * @param ids
 */
function delDictItem(ids){
	$.dialog.confirm("确认要进行删除吗？",function(){
		// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
		$("body",parent.document).mask("正在处理，请稍候...");
		ajaxPOST(basePath+"/admin/system/dictItem/del.htm?m="+Math.random(),{"selIds":ids.join(",")},function(data){
			// 回调函数中去除遮罩
			$("body",parent.document).unmask();
            if (data.status == "success") {
            	refreshGrid();
            } else {
            	 $.dialog.alert(data.message);
            }
		});
	});
}

/**
 * 添加字典项
 */

function toAddDictItem(){
	var dictId = $('.lmb-ul li.cur').attr('data-id');
	$.dialog.open(basePath+'/admin/system/dictItem/edit.htm?item.dictId=' + dictId + '&m=' + Math.random(),{
		title:'新增字典项',
		width:'520px',
		height:'250px',
		lock:true
	});
}
/**
 * 重新加载下拉字典数据
 * @param options
 */
function refreshDictSelect(options){
	var id = $("#globalDict").val();
	$("#globalDict").html('');
	for(var i=0;i<options.length;i++){
		var option = options[i];
		var optionHtml = '<li data-id="' + option.id + '" id="' + option.id + '"  value="' + option.id + '" onclick="changeSelect(' + option.id + ');">' + option.name + '</li>';
		$("#globalDict").append(optionHtml);
	}
	leftMenuTab();
	$('.lmb-ul li').eq(0).addClass('cur');
	$('.lmb-ul li').eq(0).click();
	
}
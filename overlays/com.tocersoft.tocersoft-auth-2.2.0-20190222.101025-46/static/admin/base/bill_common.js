var lastSelectRowId = null;	//上次选择行ID
$(document).ready(function(){
	
});

/**
 * 初始化标签
 */
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
	
	$(".J-tab").eq(0).trigger("click");
}


/**
 * 加载可编辑的空行
 * @param table  表格名
 * @param data   数据集
 * @param rowNum 条数
 */
function loadEmptyEditRow(grid,data,rowNum){
	if(typeof grid == "undefined" || !grid || typeof grid != "string"){
		grid = "table";
	}
	var gr = $('#'+grid);
	var emptyRowNum = rowNum;
	var notEmptyRowNum = data.resultList.length;
	if(data.resultList != null){
		emptyRowNum = rowNum - notEmptyRowNum;
	}
	if(emptyRowNum <= 0){
		addEmptyRow();
		return;
	}
	
	// 构建data
	var colModel = $(gr).getGridParam("colModel");
	for(var i=notEmptyRowNum;i<rowNum;i++){
		var curRowData = {};
		var rowid = "-" + (i+1);	//加个前缀，区分是临时行
		for(var j=0;j<colModel.length;j++){
			var curKey = colModel[j].name;
			var curVal = "";
			if(curKey == "id"){
				curVal = rowid;
			}
			curRowData[curKey] = curVal;
		}
		$(gr).addRowData(rowid,curRowData);
	}
}

/**
 * 官网原话如下：
 * gets and sets the value from in form in order to be posted to the server
 * @param elem
 * @param operation
 * @param value
 */
function skuCodeValueFN(elem,operation,value){
	if(operation === 'get') {
       return $(elem).val();
    } else if(operation === 'set') {
       $('input',elem).val(value);
    }
}

/**
 * 创建隐藏域
 * @param name
 * @param value
 */
function createInputHiddenEl(name,value){
	var el = document.createElement("input");
	el.type = "hidden";
	el.name = name;
	el.value = value;
	return el;
}

/**
 * 显示错误提醒
 * @param id
 * @param msg
 */

function showErrorMag(id,msg){
	$('#'+id).addClass('base-style');
	$('#'+id).attr("title",msg);
	$('#'+id).parent().css({'overflow':'visible','position':'relative'});
	$('#'+id).next('.serial-number').remove();
	$('#'+id).parent().append("<b class='serial-number'>"+msg+"</b>");
	$('#'+id).parent().parent().css({'overflow':'visible','position':'relative'});
}
/**
 * 隐藏显示错误提醒
 * @param id
 */
function hideErrorMag(id){
	$('#'+id).parent().css({'overflow':'hidden','position':'static'});
	$('#'+id).siblings('.serial-number').remove();
	$('#'+id).removeClass('base-style');
}

/**
 * 按钮启用禁用
 * @param id 按钮ID  
 * @param color 根据颜色区分启用禁用
 */
function disableBtn(id,color){
	$("#"+id).attr("class","ui-button "+color+"-skin");
}

/**
 * 添加空行
 */
function addEmptyRow(grid){
	if(typeof grid == "undefined" || !grid || typeof grid != "string"){
		grid = "table";
	}
	var gr = $('#'+grid);
	var rowDataList = $(gr).jqGrid("getRowData");
	var rowNum = rowDataList.length + 1;
	var newRowData = {id:-rowNum, amount:"",productId:""};
	$(gr).jqGrid("addRowData",-rowNum,newRowData,"last");
	var width = $(window).width() - 23;
	$(gr).setGridWidth(width);
}


/**
 * 重新加载表格
 * @param grid
 * @param postData
 */
function reloadGrid(grid,postData){
	if(typeof grid == "undefined" || !grid || typeof grid != "string"){
		grid = "table";
	}
	var gr = $('#'+grid);
	if(postData){
		$(gr).setGridParam({postData : postData});
	}
    // 获取当前页码
    var pageIndex = $(gr).getGridParam("page");
    // 刷新时将页码设置为刚才获取的页码
	$(gr).trigger('reloadGrid', [{page : pageIndex}]);
}

/**
 * 查询表格-
 * @param grid 列表ID
 * @param formId 查询表单
 */
function searchGrid(grid,form){
	if(typeof grid == "undefined" || !grid || typeof grid != "string"){
		grid = "table";
	}
	if(typeof form == "undefined" || !form || typeof form != "string"){
		form = "searchForm";
	}
	var arr = $("#"+form).serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		if(postData[entry["name"]]){
			postData[entry["name"]] += "," + entry["value"];
		}else{
			postData[entry["name"]]=entry["value"];	
		}
	}
	//清空查询条件
	var oldPostData = $('#' + grid).jqGrid("getGridParam", "postData");
    $.each(oldPostData, function (k, v) {
		if(k.indexOf("condition.") != -1 && k != "condition.enterpriseId" && k.indexOf("PatentType") == -1){
			delete oldPostData[k];	
		}
    });
    selectedScrollArray[grid] = 0;
	//重新查询
	$('#' + grid).setGridParam({
		mtype:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}

// 编辑列的数组
var editArray = null;
/**
 * 获得编辑列用于键盘操作行编辑的定位
 * @param grid
 * @returns
 */
function initEditData(grid){
	if(typeof grid == "undefined" || !grid || typeof grid != "string"){
		grid = "table";
	}
	editArray = new Array();
	var colModels = $("#"+grid).jqGrid('getGridParam','colModel'); 
	var index = 1;
	for (var i = 0; i < colModels.length; i++) {
		var o = colModels[i];
		var name = o.name;
		var editable = o.editable;
		var edittype = o.edittype;
		var hidden = o.hidden;
		if(editable==true && hidden!=true){
			var edit = {};
			edit.index = index++;
			edit.name =  name;
			edit.edittype = edittype;
			editArray.push(edit);
		}
	}
}

/**
 * 李宁20171120
 * 表格键盘编辑
 * 1.左右键左右移动定位
 * 2.上下键编辑行上下移动定位
 * 3.回车弹框进行查询
 * @param grid 表格
 * @param name 回车触发弹框的编辑列名称
 * @returns
 */
function keyboardGridEdit(grid,colName){
	if(typeof grid == "undefined" || !grid || typeof grid != "string"){
		grid = "table";
	}
	if(typeof colName == "undefined" || !colName || typeof colName != "string"){
		colName = "productCode";
	}
	// 获取编辑列
	initEditData(grid);
	// 键盘CODE
	var KEY = {
		UP : 38,
		DOWN : 40,
		DEL : 46,
		TAB : 9,
		ENTER: 13,
		LEFT : 37,
		RIGHT : 39
	};
	var gridObj = $('#' + grid);
	gridObj.keydown(function (e){
		var code = e.keyCode;
		var target = e.target;
		var targetRowId = target.id;
		var targetId = targetRowId.split("_")[0];
		var targetName = targetRowId.split("_")[1];
		var nextTargetId = "";
		if(code == KEY.UP || code == KEY.DOWN){
			var ids = gridObj.jqGrid("getDataIDs");	
			var lastIdIndex = ids.length-1;
			for(var a = 0;a <= lastIdIndex; a++){
				var id = ids[a];
				if(id == targetId){
					if(code == KEY.UP){
						if(a == 0){
							return;
						}else{
							nextTargetId = ids[a-1];
						}
					}else if(code == KEY.DOWN){
						if(a == lastIdIndex){
							return;
						}else{
							nextTargetId = ids[a+1];
						}
					}
					gridObj.resetSelection();
					gridObj.jqGrid("setSelection",nextTargetId);
					break;
				}
			}
			e.preventDefault();
		}else if(code == KEY.LEFT || code == KEY.RIGHT){
			var lastIndex = editArray.length-1;
			for (var i = 0; i <= lastIndex; i++) {
				var edit = editArray[i];
				var name = edit.name;
				if(name == targetName){
					if(code == KEY.LEFT){
						if(i == 0){
							nextTargetRowId = targetRowId;
						}else{
							nextTargetRowId = targetId+"_"+editArray[i-1].name;
						}
					}else if(code == KEY.RIGHT){
						if(i == lastIndex){
							nextTargetRowId = targetRowId;
						}else{
							nextTargetRowId = targetId+"_"+editArray[i+1].name;
						}
					}
					$('#'+nextTargetRowId).focus();
					break;
				}
			}
			e.preventDefault();
		}else if(code == KEY.ENTER){
			// 满足条件的列进行弹框展示
			if(targetName==colName){
				keyboardGridEditEnter($("#"+targetRowId).val());
				e.preventDefault();
			// 其余条件回车切换下一行
			}else{
				var dataIds = gridObj.jqGrid("getDataIDs");
				var dataLastIdIndex = dataIds.length-1;
				for(var b = 0;b <= dataLastIdIndex; b++){
					var id = dataIds[b];
					if(id == targetId){
						nextTargetId = dataIds[b+1];
						gridObj.resetSelection();
						gridObj.jqGrid("setSelection",nextTargetId);
						$('#'+nextTargetId+"_"+colName).focus();
					}
				}
			}
		}
	});
}

/**
 * 行编辑回车事件，默认打开产品选择
 * 如果要自定义可在自己的js中定义该方法重写
 * 如果要传递客户ID，则默认获取clientId
 * @param param
 * @returns
 */
function keyboardGridEditEnter(param){
	$.dialog.data("proAndSkuKey",param);
	var clientId = $("#clientId").val();
	if(clientId!=undefined){
		$.dialog.data("clientId",clientId);
	}
	$.dialog.open(basePath+"/admin/product/choose.htm", {
		title: '查询选择  ',
		width:'1000px',
		height:'540px',
		lock:true
	});
}
/**
 * 单位编辑如果需要调用页面覆盖重置
 * @param id
 * @returns
 */
function doEditUnit(id){
	
}
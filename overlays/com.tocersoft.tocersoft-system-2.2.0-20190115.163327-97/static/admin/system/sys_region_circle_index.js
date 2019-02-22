var zTree,rMenu,gh,curNode;	//定义变量
$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//初始化表格
 	initTable();
});
/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 111;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/system/region/circle/listSysRegionCircleByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','生成时间','商圈名称','所属市','城市ID','排序',''],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater},
			{name:'createDate',width:130,formmatter:'date',formatoptions: {srcformat:'Y-m-d',newformat:'Y-m.d'}},
			{name:"name",width:300,align:'left'},
			{name:'regionName',width:100},
			{name:'regionId',hidden:true},
			{name:"sort",width:50},
			{name:"blank",width:350}
		],
		viewrecords: true,
		caption:"商圈列表",
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
  	$('#table_name').css('text-align','left');
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	// 新增用户
	$("#addRegionCircleBtn").on("click",addRegionCircle);

	// 批量删除用户
	$("#batchDelRegionCircleBtn").on("click",doBatchDelRegionCircle);
	// 查询
	$("#searchBtn").on("click",searchRegionCircleList);
	// 刷新
	$("#refreshGridBtn").on("click",refreshGrid);
}
/**
 * 添加商圈
 */
function addRegionCircle(){
	$.dialog.open(
				basePath + "/admin/system/region/circle/add.htm?m="+Math.random(),{
				title : "添加大区",
				width : "600px",
				height : "500px",
				lock : true
			}
	);
}
/**
 * 用于对 Ajax 返回数据进行预处理的函数
 * @param {Object} treeId
 * @param {Object} parentNode
 * @param {Object} responseData
 */
function parseDepartTreeDataFilter(treeId,parentNode,responseData){
	var treeData = $.parseJSON(responseData.data);
	return treeData;
}


/**
 * 删除商圈
 * @param {Object} id
 */
function removeRegionCircleFN(id){
	var selIds = [id];
	//确认提示
	var dialog = $.dialog({
	    title: '确认删除',
	    content: '确认要删除吗？',
	    okVal:"删除",
	    cancelVal:"取消",
	    ok: function(){
	    	$.post(basePath + "/admin/system/region/circle/del.htm?m="+Math.random(),{"selIds":selIds.join(',')},function(data){
				 $.dialog.alert(data.message);
				 refreshGrid();
			});
	    },
	    cancel:function(){
	    	this.close();
	    }
	});
}

/**
 * 批量删除商圈
 */
function doBatchDelRegionCircle(){
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		$.post(basePath + "/admin/system/region/circle/del.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			$.dialog.alert(data.message);
			refreshGrid();
		});
	});
}

/**
 * 查询商圈
 */
function searchRegionCircleList(){
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

var index = 0; //记录parentIds的下标

/**
 * 设置拥有省
 */
function fitFN(id){
	$.dialog.open(basePath + "/admin/system/region/circle/selectCity.htm?circleId="+id,{
		title : "选择区域",
		width : "800px",
		height : "500px",
		lock : true
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateRegionFN('"+rowObject.id+"');return false;\">修改</a>";
	//var ckeckBtn = null;
	//ckeckBtn = "<a href='javascript:;'  class='no_unl' title='选择城市' onclick=\"fitFN('"+rowObject.id+"');return false;\">选择城市</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeRegionCircleFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	//btns.push(ckeckBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}
/**
 * 修改商圈
 */
function updateRegionFN(id){
	$.dialog.open(
			basePath + "/admin/system/region/circle/update.htm?m="+Math.random()+"&circleId="+id,{
			title : "修改商圈",
			width : "600px",
			height : "300px",
			lock : true
		}
	);
}
//导入
function doImport(){
	if($("#filenameText").val()==''){
		$.dialog.alert("请选择要导入的文件!");
		return;
	}
	$('#uploadMessage').html('正在上传，请稍候');
	$.ajaxFileUpload({
		url:basePath+'/ajaxFileUpload.htm',//用于文件上传的服务器端请求地址
		secureuri:false,//一般设置为false
		fileElementId:'fileInput',//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型 一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			$("body",document).mask("正在提交，请稍候...");
			$('#uploadMessage').html('上传成功，正在导入');
			$.post(basePath+'/admin/system/region/circle/doImport.htm' , {'filePath':data.path} , function(data){
				$("body",document).unmask();
				$('#uploadMessage').html('');
				if(data.status == "success"){
					$.dialog.alert("导入成功!!!");
					reloadGrid();
				}else if(data.status == "error"){
					$.dialog.alert(data.message)
				}else{
					$.dialog.alert("导入失败")
				}
			})
		},
		error: function (data, status, e){//服务器响应失败处理函数
			$('#uploadMessage').html('上传失败');
		}
	})
	return false;
}
/**
 * 刷新表格
 */
function refreshGrid(){
	reloadGrid("table");
}
function reloadDict(){
	reloadGrid("table");
}


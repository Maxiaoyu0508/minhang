$(document).ready(function(){
	var gh = $(window).height() - $('#operBar').height() - 91;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath+'/admin/cms/channel/searchCmsChannelList.htm', 
	    datatype:"json",
	    colNames:['操作','栏目名称'],
		colModel:[ 
			{name:"id",index:"id",width:98,formatter:optFormater},
			{name:'name',index:'name',width:68}
		], 
		caption:"栏目列表",
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
			fillEmptyRow('table',data);
	   	},
	   	height:gh
  	});
  	
  	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
	 	var width = $(window).width()-10;
	 	$("#table").jqGrid('setGridWidth', width);
	};
  	$("#table").jqGrid("navGrid","#pagerBar");
/*
	$('#table').jqGrid({
		url:'admin/cms/channel/searchRoleList.htm',
		colNames:['操作','序号','排序','栏目标题','文章数量','状态','备注','右侧显示'],
		colModel:[
			{name:'opt',index:'opt',formatter:optFormater},
			{name:'id',index:'id',hidden:true},
			{name:'sort',index:'sort'},
			{name:'name',index:'name'},
			{name:'articleNum',index:'articleNum'},
			{name:'state',index:'state',formatter:stateFormatter},
			{name:'remark',index:'remark'},
			{name:'isRight',index:'isRight',formatter:rightFormater}
		],
		caption:"查询结果列表",
		treeGrid: true,
		ExpandColumn : 'name',
		treeGridModel:'adjacency',
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
	   	},
		jsonReader:{id: "id",root:"resultList"}
	});*/
	
	//异步表单提交设置
    $('#channelForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$.dialog.alert(data.message);
        	$("#itemName").val("");
        	$("#itemRemark").val("");
        	$("#itemId").val("");
         	reloadGrid();
        }
    });
    
    //保存
    $("#saveChannel").click(save);
    
    $('#unShowRight').click(unShowRight);
	$('#showRight').click(showRight);
});

function stateFormatter(cellvalue,options,rowObject){
	var str = "";
	if(cellvalue == 1){
		str = '<span class="status-red-f12">系统</span>';
	}else if(cellvalue == 2){
		str = '<span class="status-blue-f12">用户</span>';
	}
	return str;
}
function rightFormater(cellvalue,options,rowObject){
	if(cellvalue == 1){
		return '<span class="stauts-green-f12">右侧显示</span>';
	}else{
		return '<span class="status-gray-f12">--</span>';
	}
}

function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' onclick=\"updateFN('"+rowObject.id+"');return false;\">修改</a>&nbsp;";
	var deleteBtn = "<a href='javascript:;' onclick=\"deleteFN('"+rowObject.id+"');return false;\">删除</a>&nbsp;";
	btns.push(updateBtn);
	btns.push(deleteBtn);
	return btns.join(" ");
}

//删除产品栏目
function deleteFN(id){
	var rowData = $("#table").jqGrid('getRowData',id);

	if(rowData.state == "系统"){
		$.dialog.alert("系统产品栏目，无法删除!");
		return;
	}else{
		$.dialog.confirm("确认要删除此项数据吗？",function(){
			$.post(basePath+"/admin/cms/channel/delCmsChannelById.htm?m="+Math.random(),{"model.channelId":id},function(data){
					$.dialog.alert(data.message);
					reloadGrid();
			},"json");
		});
	}
}

//保存角色
function save(){
	var itemName = $("#itemName").val();
	if(itemName.length == 0){
		//提示消息
        $.msg({wrapID:"errorlist",type:"error",messages:"请输入栏目标题"});
		return;
	}
	$("#channelForm").submit();
}

//修改
function updateFN(id){
	//var offsetTop=$("#lastBottomDom").offset().top;
	//$("html").animate({scrollTop: offsetTop}, 800);
	var rowData = $("#table").jqGrid('getRowData',id);
	$("#itemRemark").val(rowData.remark);
	$("#itemId").val(id);
	$("#itemName").val(rowData.name);
	$('#itemSort').val(rowData.sort);
}

function unShowRight(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	$.post(basePath+"/admin/cms/channel/unShowRight.htm?m="+Math.random(),{"model.channelId":selIds.join(",")},function(data){
		$.dialog.alert(data.message);
		reloadGrid();
	},"json");
}
function showRight(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	$.post(basePath+"/admin/cms/channel/showRight.htm?m="+Math.random(),{"model.channelId":selIds.join(",")},function(data){
		$.dialog.alert(data.message);
		reloadGrid();
	},"json");
}
//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}


function optFormater(cellvalue,options,rowObject){
	var str = "";
	if(rowObject.showAdd == true ){
		str += "<a href='javascript:void(0)' onclick=\"toAddCmsChannel('"+rowObject.id+"');return false;\">添加子栏目</a>";
	}
	str += "&nbsp;&nbsp;<a href='javascript:void(0)' onclick=\"updateCmsChannel('"+rowObject.id+"');return false;\">修改</a>";
	if(rowObject.state == 2){
	 	str += "&nbsp;&nbsp;<a href='javascript:void(0)' onclick=\"delCmsChannel('"+rowObject.id+"');return false;\">删除</a>";	
	}
	return str;
}


 /**
  * 添加大类别
  */
 function toAddCmsChannel(parentId){
 	$.dialog.open(basePath+'/admin/cms/channel/toAddCmsChannel.htm?parentId='+parentId+'&m='+Math.random(), {
			title:'新增栏目',
			lock : true,
			width : "740px"
		});
 }
 
 /**
 * 修改栏目
 * @param {} goodsCategoryId
 */
function updateCmsChannel(goodsCategoryId){
 	$.dialog.open(basePath+'admin/cms/channel/toUpdateCmsChannel.htm?nodeid='+goodsCategoryId+'&m='+Math.random(), {
			title:'修改类别',
			lock : true,
			width : "600px",
			height:"300px",
		});
 }
/**
 * 删除栏目
 * @param {} goodsCategoryId
 */
 function delCmsChannel(cmsChannelId){
 		$.dialog({
			title:"操作确认",
			content:"确认要删除吗？",
			lock:true,
			follow:document.getElementById("batchPassBtn"),
			ok:function(){
				$("body",parent.document).mask("正在处理，请稍候...");
				$.post(basePath+"/admin/cms/channel/delCmsChannelById.htm",{"nodeid":cmsChannelId},function(data){
					$("body",parent.document).unmask();
			        if (data.status=='success') {
			        	$.msgbox({
			        		msg:data.message,
			        		icon:'success',
			        		callBack:function(){reloadGird();}
			        	});
			        } else {
				       $.msgbox({
			        		msg:data.message,
			        		icon:'error'
			        	});
			        }
				});
			},
			cancel:function(){}
		});
 }
 
 function reloadGird(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}
 
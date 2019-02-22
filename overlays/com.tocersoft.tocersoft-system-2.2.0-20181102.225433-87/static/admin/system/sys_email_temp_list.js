$(document).ready(function(){
	var gh = $(window).height()- 105;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath+"/admin/email/ajaxTempList.htm?m="+Math.random(),
	    datatype:"json",
	    colNames:['操作','模板','说明'],
		colModel:[ 
			{name:'id',index:"id",width:40,formatter:optFormater},
			{name:'type',width:100,index:'type'},
			{name:'description',width:200,index:'description'}
		], 
		rownumbers:true,
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
	   	height:gh,
	   	rowNum:100,
	   	scroll:true,//一页显示100条，滚动加载
	   	pager : "pagerBar",
		jsonReader:{id: "id",root:"resultList"}
  	});
	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
	 	var width = $(window).width()-23;
	 	$("#table").jqGrid('setGridWidth', width);
	}
});
		//格式化操作单元格
	function optFormater(cellvalue,options,rowObject){
		var btns = [];
		var updateBtn = "<a href='javascript:;' title='查看\修改' class='no_unl' onclick=\"updateFN('"+rowObject.id+"');return false;\">查看/修改</a>";
		btns.push(updateBtn);
		return btns.join(" ");
	}
	function updateFN(id){
		var url = basePath + "/admin/email/viewTemplate.htm?id="+id;
		$.dialog.open(url,{
			width:900,
			height:600,
			title:'修改模板',
			lock:true
		});
	
	}
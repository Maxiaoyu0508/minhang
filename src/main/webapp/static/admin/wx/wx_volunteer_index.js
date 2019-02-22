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
	    url:basePath + '/admin/wx/volunteer/listWxVolunteerByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['类型（数据字典）','姓名','身份证','性别：1-男，2-女；','年龄','学校','联系方式','地址','邮箱','语种','服务时间','职务','学历','','id'],
		colModel:[ 
            {name:"type",width:100,formatter:typeFormater},
            {name:"name",width:100},
            {name:"idCard",width:100},
            {name:"sex",width:100},
            {name:"age",width:100},
            {name:"school",width:100},
            {name:"mobile",width:100},
            {name:"address",width:100},
            {name:"email",width:100},
            {name:"language",width:100},
            {name:"servicrTime",width:100},
            {name:"job",width:100},
            {name:"education",width:100},
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
function typeFormater(cellvalue,options,rowObject){
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"viewWxVolunteerFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加志愿者招募
 */
function addWxVolunteer(){
	$.dialog.open(basePath + "/admin/wx/volunteer/edit.htm?m="+Math.random(),{
			title : "添加志愿者招募",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除志愿者招募
 * @param {Object} id
 */
function removeWxVolunteerFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/wx/volunteer/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelWxVolunteer(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/wx/volunteer/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询志愿者招募
 */
function searchWxVolunteer(){
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
 * 查看志愿者招募
 */
function viewWxVolunteerFN(id){
	$.dialog.open(basePath + "/admin/wx/volunteer/view.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "志愿者招募",
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
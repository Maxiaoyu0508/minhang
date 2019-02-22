$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//初始化表格
 	initTable();
});

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	// 查询
    $("body").on("click","#searchBtn",searchMemberUser);
	// 刷新
    $("body").on("click","#refreshGridBtn",refreshGrid);
    // 通过审核按钮
    $("body").on("click","#passBtn",passBtnFN);
    // 未通过审核按钮
    $("body").on("click","#failBtn",failBtnFN);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/member/listRealNameCertInfoByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','会员昵称','会员姓名','身份证号','认证状态','证件照',''],
		colModel:[ 
			{name:"id",width:80,align:"left",formatter:optFormater},
            {name:"nickName",width:100},
            {name:"name",width:100},
            {name:"certIdcard",width:100},
            {name:"certState",width:100,formatter:certStateFormat},
            {name:"certIdcardPath",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"实名认证",
		loadComplete: function(data){
			var width = $(window).width() - 10;
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
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var lookBtn = "<a href='javascript:;' title='查看' class='no_unl' onclick=\"lookMemberUserFN('"+rowObject.id+"');return false;\">查看</a>";
	btns.push(lookBtn);
	return btns;
}

/**
 * 格式化认证状态
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function certStateFormat(cellvalue,options,rowObject){
	str ='';
	switch(cellvalue){
		case 1:
			str = '审核通过';
			break;
		case 2:
			str = '审核不通过';
			break;
		default:
			str = '待审核';
			break;
	}
	return str;
}


/**
 * 查看会员基本信息
 */
function lookMemberUserFN(id){
	$.dialog.open(basePath + "/admin/member/lookCertIdcardPhoto.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "查看证件照",
		width : "600px",
		height : "400px",
		lock : true
	});
} 


/**
 * 通过审核
 */
function passBtnFN(){
	auditByIds(1);
}

/**
 * 未通过审核
 */
function failBtnFN(){
	auditByIds(2);
}


/**
 * 审核
 */
function auditByIds(certState) {
	// 删除确认
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	ajaxPOST(basePath + "/admin/member/auditingCertByIds.htm?m="
			+ Math.random(), {
		"selIds" : selIds.join(","),
		"item.certState" : certState
	}, function(data) {
		reloadCommonGrid("table");
	});
}


/**
 * 查询会员基本信息
 */
function searchMemberUser(){
	var arr = $("#searchForm").serializeArray();
	var postData = {};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		postData[entry["name"]]=entry["value"];
	};
	var certState = $("#certState").val();
	if(certState != -1){
		postData["condition.certState"] = certState;
	}
	var nickName = $("#searchKey").val();
	if(nickName != "" && nickName != null){
		postData["condition.nickName"] = nickName;
	}
	$('#table').setGridParam({
		dataType:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
};


/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
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
    // 新增会员发票管理
    $("body").on("click","#addBtn",addMemberInvoice);
	// 批量会员发票管理
    $("body").on("click","#batchDelBtn",doBatchDelMemberInvoice);
	// 查询
    $("body").on("click","#searchBtn",searchMemberInvoice);
	// 刷新
    $("body").on("click","#refreshGridBtn",refreshGrid);
}

/**
 * 初始化表格
 */
function initTable(){
	var gh = $(window).height() - 124;
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/member/invoice/listMemberInvoiceByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','会员ID','发票类型0.普通发票 1.增值税发票','发票抬头（公司名/个人名）','发票明细','单位名称','纳税人识别码','注册地址','注册电话','开户银行','银行账号','收票人姓名','收票人手机','收票人省市区','收票人省','收票人省ID','收票人市','收票人市ID','收票人区','收票人区ID','详细地址','默认状态：0:非默认发票，1：默认发票','是否开票状态：0:未开 1，已开',''],
		colModel:[ 
			{name:"id",width:80,formatter:optFormater},
            {name:"memberId",width:100},
            {name:"type",width:100},
            {name:"invoiceTitle",width:100},
            {name:"invoiceDetails",width:100},
            {name:"companyName",width:100},
            {name:"taxpayerId",width:100},
            {name:"registeredAddress",width:100},
            {name:"registeredPhone",width:100},
            {name:"bankName",width:100},
            {name:"bankAccount",width:100},
            {name:"billtoName",width:100},
            {name:"billtoPhone",width:100},
            {name:"billtoPcd",width:100},
            {name:"billtoProvince",width:100},
            {name:"billtoProvinceId",width:100},
            {name:"billtoCity",width:100},
            {name:"billtoCityId",width:100},
            {name:"billtoDistrict",width:100},
            {name:"billtoDistrictId",width:100},
            {name:"billtoAddress",width:100},
            {name:"invoiceStatus",width:100},
            {name:"isTicket",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"会员发票管理列表",
		loadComplete: function(data){
			var width = $(window).width() - 10;
			$(this).setGridWidth(width);
	   	},
	   	shrinkToFit: true,
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateMemberInvoiceFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeMemberInvoiceFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加会员发票管理
 */
function addMemberInvoice(){
	$.dialog.open(basePath + "/admin/member/invoice/edit.htm?m="+Math.random(),{
			title : "添加会员发票管理",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除会员发票管理
 * @param {Object} id
 */
function removeMemberInvoiceFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/member/invoice/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelMemberInvoice(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/invoice/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询会员发票管理
 */
function searchMemberInvoice(){
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
 * 修改会员发票管理
 */
function updateMemberInvoiceFN(id){
	$.dialog.open(basePath + "/admin/member/invoice/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改会员发票管理",
		width : "600px",
		height : "400px",
		lock : true
	});
}

/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
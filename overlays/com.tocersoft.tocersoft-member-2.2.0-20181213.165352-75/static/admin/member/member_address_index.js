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
    // 新增会员收货地址表
    $("body").on("click","#addBtn",addMemberAddress);
	// 批量会员收货地址表
    $("body").on("click","#batchDelBtn",doBatchDelMemberAddress);
	// 查询
    $("body").on("click","#searchBtn",searchMemberAddress);
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
	    url:basePath + '/admin/member/address/listMemberAddressByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['操作','会员ID','收货地址','省份','省市ID','城市','市区ID','区','区ID','省市区','收货联系人','默认地址 0-否  1-是','收货人手机[非用户手机]','邮政编号',''],
		colModel:[ 
			{name:"id",width:80,formatter:optFormater},
            {name:"memberId",width:100},
            {name:"address",width:100},
            {name:"province",width:100},
            {name:"provinceId",width:100},
            {name:"city",width:100},
            {name:"cityId",width:100},
            {name:"district",width:100},
            {name:"districtId",width:100},
            {name:"provinceCity",width:100},
            {name:"linkman",width:100},
            {name:"addressStatus",width:100},
            {name:"mobile",width:100},
            {name:"postCode",width:100},
			{name:"blank",width:400}
		],
		viewrecords: true,
		caption:"会员收货地址表列表",
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
	var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateMemberAddressFN('"+rowObject.id+"');return false;\">修改</a>";
	var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeMemberAddressFN('"+rowObject.id+"');return false;\">删除</a>";
	btns.push(updateBtn);
	btns.push(removeBtn);
	return btns.join(" ");
}

/**
 * 添加会员收货地址表
 */
function addMemberAddress(){
	$.dialog.open(basePath + "/admin/member/address/edit.htm?m="+Math.random(),{
			title : "添加会员收货地址表",
			width : "600px",
			height : "400px",
			lock : true
		}
	);
}

/**
 * 删除会员收货地址表
 * @param {Object} id
 */
function removeMemberAddressFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/member/address/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelMemberAddress(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/address/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询会员收货地址表
 */
function searchMemberAddress(){
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
 * 修改会员收货地址表
 */
function updateMemberAddressFN(id){
	$.dialog.open(basePath + "/admin/member/address/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改会员收货地址表",
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
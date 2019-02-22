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
	    url:basePath + '/admin/member/invite/listMemberInviteByPage.htm?m=' + Math.random(),
	    datatype:"json",
	    colNames:['邀请人ID','被邀请人ID','邀请码','','id'],
		colModel:[ 
            {name:"fromMemberUserId",width:100,formatter:fromMemberUserIdFormater},
            {name:"toMemberUserId",width:100},
            {name:"code",width:100},
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
function fromMemberUserIdFormater(cellvalue,options,rowObject){
    return "<a href='javascript:void(0);' title='"+cellvalue+"' class='no_unl' onclick=\"viewMemberInviteFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
}

/**
 * 添加会员邀请
 */
function addMemberInvite(){
	$.dialog.open(basePath + "/admin/member/invite/edit.htm?m="+Math.random(),{
			title : "添加会员邀请",
			width : "800px",
			height : "500px",
			lock : true
		}
	);
}

/**
 * 删除会员邀请
 * @param {Object} id
 */
function removeMemberInviteFN(id){
	//删除确认
	$.dialog.confirm("确认要删除吗?",function(){
		$("body").mask("正在删除，请稍后...");
		ajaxPOST(basePath + "/admin/member/invite/del.htm?m="+Math.random(),{"selIds":id},function(data){
			$("body").unmask();
			 reloadCommonGrid("table");
		});
	});
}

/**
 * 批量删除
 */
function doBatchDelMemberInvite(){
	//删除确认
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
		ajaxPOST(basePath + "/admin/member/invite/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
			reloadCommonGrid("table");
		});
	});
}

/**
 * 查询会员邀请
 */
function searchMemberInvite(){
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
 * 查看会员邀请
 */
function viewMemberInviteFN(id){
	$.dialog.open(basePath + "/admin/member/invite/view.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "会员邀请",
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
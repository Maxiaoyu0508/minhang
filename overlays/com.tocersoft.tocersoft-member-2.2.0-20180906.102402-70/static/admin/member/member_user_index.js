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
    // 新增会员基本信息
    $("body").on("click","#addBtn",addMemberUser);
	// 批量会员基本信息
    $("body").on("click","#batchDelBtn",doBatchDelMemberUser);
	// 查询
    $("body").on("click","#searchBtn",searchMemberUser);
	// 刷新
    $("body").on("click","#refreshGridBtn",refreshGrid);
}

/**
 * 初始化表格
 */
function initTable() {
  var gh = $(window).height() - 95;
  //渲染表格骨架
  $("#table").jqGrid({
    url: basePath + '/admin/member/listMemberUserByPage.htm?m=' + Math.random(),
    datatype: "json",
    postData: {"condition.roleId":$("#roleId").val()},
    colNames: ['重置密码', '注册日期', '会员帐号', '手机号码', '电子邮箱', '帐号状态', '审核', '会员角色', '会员级别', '姓名', '昵称', '性别', '详细描述', 'QQ', '微信号', '其他联系方式', '地址', '备注描述'],
    colModel: [
      {name: "id", width: 120, formatter: optFormater},
      {name: "createDate", width: 100, align: 'left'},
      {name: "account", width: 120, align: 'left', formatter: updateFormater},
      {name: "mobile", width: 100, align: 'left', formatter: updateFormater},
      {name: "email", width: 150, align: 'left', formatter: updateFormater},
      {name: "state", width: 100, align: 'left', formatter: stateFormater},
      {name: "approvalState", width: 100, align: 'left', formatter: apprFormater},
      {name: "roleName", width: 80, align: 'left'},
      {name: "level", width: 150, align: 'left'},
      {name: "name", width: 150, align: 'left'},
      {name: "nickName", width: 150, align: 'left'},
      {name: "sex", width: 150, align: 'left', formatter: sexFormater},
      {name: "desc", width: 150, align: 'left'},
      {name: "qq", width: 150, align: 'left'},
      {name: "wechat", width: 150, align: 'left'},
      {name: "contactOther", width: 150, align: 'left'},
      {name: "address", width: 150, align: 'left'},
      {name: "remark", width: 150, align: 'left'}
    ],
    viewrecords: true,
    loadComplete: function (data) {
      var width = $(window).width() - 22;
      $(this).setGridWidth(width);
    },
    shrinkToFit: false,
    autoScroll: true,
    height: gh,
    jsonReader: {id: "id", root: "resultList"}
  });
  $("#table").jqGrid("navGrid", "#pagerBar");
}


/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue, options, rowObject) {
  return "<a href='javascript:;' title='重置密码' class='no_unl' onclick=\"resetPasswordFN('" + rowObject.id + "');return false;\">重置密码</a>";

}


/**
 * 设置会员账号、手机号、电子邮箱 弹出修改
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function updateFormater(cellvalue, options, rowObject) {
  if (cellvalue == null)
    cellvalue = "";
  return "<a href='javascript:;'  class='no_unl' onclick=\"updateMemberUserFN('" + rowObject.id + "');return false;\">" + cellvalue + "</a>";

}


/**
 * 启用/禁用会员
 */
function isUseMemberUserExtendFN(id, state) {
  if (state == "1") {
    $.dialog.confirm("确定要禁用该会员吗？", function () {
      commonChange(id, state);
    });
  } else {
    $.dialog.confirm("确定要启用该会员吗？", function () {
      commonChange(id, state);
    });
  }
}

/**
 * 审核会员
 */
function apprFormater(cellvalue, options, rowObject) {
  var str = "";
  if (cellvalue == 0) {
    str = '<span class="status-red">待审核</span>';
  } else if (cellvalue == 1) {
    str = "<a href='#' class='status-green' onclick=\"apprChange('" + rowObject.id + "',2)\">通过</a>";
  } else if (cellvalue == 2) {
    str = "<a href='#' class='status-gray' onclick=\"apprChange('" + rowObject.id + "',1)\">未通过</a>";
  } else {
    str = '--';
  }
  return str;
}

function commonChange(id, state) {
  ajaxPOST(basePath + "/admin/member/changeState.htm?m=" + Math.random(), {
    "item.state": state,
    "item.id": id
  }, function (data) {
    $.dialog.alert(data.message);
    refreshGrid();
  });
}

/**
 * 审核状态
 * @param id
 * @param apprState
 */
function apprChange(id, apprState) {
  $.dialog.confirm("确定要变更该会员的审核状态吗？", function () {
    ajaxPOST(basePath + "/admin/member/apprState.htm?m=" + Math.random(), {
      "item.id": id,
      "item.approvalState": apprState
    }, function (data) {
      $.dialog.alert(data.message);
      refreshGrid();
    });
  });
}


/**
 * 添加会员基本信息
 */
function addMemberUser() {
  $.dialog.open(basePath + "/admin/member/edit.htm?m=" + Math.random(), {
      title: "添加会员基本信息",
      width: "700px",
      height: "600px",
      lock: true
    }
  );
}

/**
 * 删除会员基本信息
 * @param {Object} id
 */
function removeMemberUserFN(id) {
  //删除确认
  $.dialog.confirm("确认要删除吗?", function () {
    $("body").mask("正在删除，请稍后...");
    ajaxPOST(basePath + "/admin/member/del.htm?m=" + Math.random(), {"selIds": id}, function (data) {
      $("body").unmask();
      reloadCommonGrid("table");
    });
  });
}

/**
 * 批量删除
 */
function doBatchDelMemberUser(){
	//删除确认
    var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
    if(!selIds || selIds.length == 0){
        $.dialog.alert("请选择要删除的会员");
        return;
    }
	$.dialog.confirm('确认要进行批量删除吗？',function(){
		ajaxPOST(basePath + "/admin/member/del.htm?m=" + Math.random(),{"selIds":selIds.join(",")},function(data){
            $.dialog.alert(data.message);
			reloadCommonGrid("table");
		});
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
	$('#table').setGridParam({
		dataType:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
};


/**
 * 修改会员基本信息
 */
function updateMemberUserFN(id){
	$.dialog.open(basePath + "/admin/member/edit.htm?m=" + Math.random() + "&item.id=" + id,{
		title : "修改会员基本信息",
		width : "700px",
		height : "600px",
		lock : true
	});
}

/**
 * 查看会员基本信息
 */
function lookMemberUserFN(id){
	window.location.href=basePath + "/admin/member/look.htm?item.id=" + id;
} 

/**
 * 刷新表格
 */
function refreshGrid(){
    reloadCommonGrid("table");
}
/**
 * 帐号状态格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function stateFormater(cellvalue,options,rowObject){
	var btns = [];
	if(rowObject.state == "0"){
		var calBtn = "<a href='javascript:;' class='no_unl' title='启用' onclick=\"isUseMemberUserExtendFN('"+rowObject.id+"',1);return false;\">启用</a>";
	}else{
		var calBtn = "<a href='javascript:;' class='no_unl' title='禁用' onclick=\"isUseMemberUserExtendFN('"+rowObject.id+"',0);return false;\">禁用</a>";
	}
	btns.push(calBtn);
	return btns.join(" ");;
}
/**
 * 性别格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function sexFormater(cellvalue,options,rowObject){
	var str = "";
	if(cellvalue == 0){
		str = '女';
	}else if(cellvalue == 1){
		str = '男';
	}
	return str;
}
var zTree, rMenu, gh, curNode;	//定义变量
var parentIds = [0];
$(document).ready(function () {
  //初始化操作按钮
  initOperateBtn();
  //初始化表格
  initTable();

  // 随窗体大小改变而改变Grid宽度
  window.onresize = function _doResize() {
    var width = $(window).width() - 23;
    $("#table").jqGrid('setGridWidth', width);
  }
});

/**
 * 初始化表格
 */
function initTable() {
  var gh = $(window).height() - 105;
  var postData = {
    "condition.parentId": parentIds[0]
  };
  //渲染表格骨架
  $("#table").jqGrid({
    url: basePath + '/admin/system/region/listSysRegionByPage.htm?m=' + Math.random(),
    datatype: "json",
    colNames: ['操作', '编号', '区域名称', '区号', '级别', '是否热门', '排序'],
    colModel: [
      {name: "id", index: "id", width: 80, formatter: optFormater},
      {name: "code", width: 70},
      {name: "name", width: 300, index: 'name', align: 'left'},
      {name: "areaCode", width: 80},
      {name: "level", width: 50, formatter: levelFormater},
      {name: "isHot", width: 50, formatter: hotFormater},
      {name: "sort", width: 50}
    ],
    loadComplete: function (data) {
      var width = $(window).width() - 23;
      $(this).setGridWidth(width);
      /*if(data!=null && data.resultList[0]!=null && data.resultList!=null && data.resultList[0].cityName!=null && data.resultList[0].cityName!=''){
        $("#table").jqGrid("setCaption","区域列表："+data.resultList[0].cityName+" ");
      }else{
        $("#table").jqGrid("setCaption","区域列表");
      }*/
    },
    shrinkToFit: true,
    postData: postData,
    height: gh, rowNum: 100, scroll: true,//一页显示100条，滚动加载
    jsonReader: {id: "id", root: "resultList"}
  });
  $("#table").jqGrid("navGrid", "#pagerBar");
  $('#table_name').css('text-align', 'left');
}

/**
 * 格式化是否热门
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns
 */
function hotFormater(cellValue, options, rowObject) {
  var str = "";
  if (cellValue == 1) {
    str = "是";
  } else {
    str = "否";
  }
  return str;
}

/**
 * 格式化省市区
 */
function levelFormater(cellValue, options, rowObject) {
  var str = "";
  if (cellValue == 1) {
    str = "省";
  } else if (cellValue == 2) {
    str = "市";
  } else {
    str = "区";
  }
  return str;
}

/**
 * 初始化操作按钮
 */
function initOperateBtn() {
  // 新增用户
  $("#addRegionBtn").on("click", addRegion);
  // 设置热门
  $("#setHotBtn").on("click", setHot);
  // 取消热门
  $("#removeHotBtn").on("click", setHot);

  // 批量删除用户
  $("#batchDelRegionBtn").on("click", doBatchDelRegion);
  // 查询
  $("#searchBtn").on("click", searchRegionList);
	// 刷新
  $("#refreshGridBtn").on("click", refreshGrid);
}

/**
 * 添加区域
 */
function addRegion() {
  var parentIdsInfo = [];
  for (var i = 0; i <= index; i++) {
    parentIdsInfo.push(parentIds[i]);
  }
  $.dialog.open(
    basePath + "/admin/system/region/add.htm?level=" + $("#level").val() + "&parentIds=" + parentIdsInfo.join(','), {
      title: "添加区域",
      width: "500px",
      height: "300px",
      lock: true
    }
  );
}

/**
 * 设置热门
 */
function setHot() {
  var statusHot = $(this).attr("data-hot-status");
  var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
  if (typeof(selIds) == "undefined" || selIds.length == 0) {
    $.dialog.alert("请选择需要设置的区域");
    return;
  }
  var ids = "";
  if (selIds.length == 1) {
    ids = selIds[0];
  } else {
    ids = selIds.join(",");
  }

  ajaxPOST(basePath + "/admin/system/region/setHot.htm", {"selIds": ids, "statusHot": statusHot},
    function (data) {
      if (data.status == "success") {
        $.dialog.alert(data.message);
        refreshGrid();
      } else {
        $.dialog.alert(data.message);
      }
    });

}

/**
 * 用于对 Ajax 返回数据进行预处理的函数
 * @param {Object} treeId
 * @param {Object} parentNode
 * @param {Object} responseData
 */
function parseDepartTreeDataFilter(treeId, parentNode, responseData) {
  var treeData = $.parseJSON(responseData.data);
  return treeData;
}


/**
 * 修改用户
 * @param {Object} id
 */
function updateRegionFN(id) {
  $.dialog.open(
    basePath + "/admin/system/region/edit.htm?item.id=" + id, {
      title: "修改区域",
      width: "500px",
      height: "300px",
      lock: true
    }
  );
}

/**
 * 删除区域
 * @param {Object} id
 */
function removeRegionFN(id) {
  $.dialog.confirm("确定要删除吗？", function () {
    $("body").mask("正在删除，请稍后...");
    ajaxPOST(basePath + "/admin/system/region/del.htm?m=" + Math.random(), {"selIds": id}, function (data) {
      $("body").unmask();
      reloadCommonGrid("table");
    });
  });
}

/**
 * 批量删除用户
 */
function doBatchDelRegion() {
  var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
  if (selIds.length == 0) {
    $.dialog.alert("请选择要删除的数据");
    return;
  }

  $.dialog.confirm('确认要进行批量删除吗？', function () {
    $("body").mask("正在删除，请稍后...");
    ajaxPOST(basePath + "/admin/system/region/del.htm?m=" + Math.random(), {"selIds": selIds.join(",")}, function (data) {
      $("body").unmask();
      reloadCommonGrid("table");
    });
  });

}

/**
 * 查询用户
 */
function searchRegionList() {
  var arr = $("#searchForm").serializeArray();
  var postData = {};
  for (var i = 0; i < arr.length; i++) {
    var entry = arr[i];
    postData[entry["name"]] = entry["value"];
  }
  ;
  $('#table').setGridParam({
    dataType: 'post',
    postData: postData
  }).trigger('reloadGrid', [{page: 1}]);
};

var index = 0; //记录parentIds的下标
/**
 * 查看详情
 * @param id
 */
function checkDetailFN(id) {
  var level = $("#level").val();
  level++;
  $("#level").val(level);
  index++;
  parentIds[index] = id;
  var postData = {
    "condition.parentId": parentIds[index]
  };
  $("#table").jqGrid("setGridParam", {
    dataType: 'json',
    postData: postData,
    page: 1
  }).trigger("reloadGrid");
}

/**
 * 返回上一级
 * @param id
 */
function backFN(id) {
  var level = $("#level").val();
  level--;
  $("#level").val(level);
  if (index >= 1) {
    index = parseInt(index) - 1;
  }
  else {
    index = 0;
  }
  var postData = {
    "condition.parentId": parentIds[index]
  };
  $("#table").jqGrid("setGridParam", {
    dataType: 'json',
    postData: postData,
    page: 1
  }).trigger("reloadGrid");
}

/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue, options, rowObject) {
  var btns = [];
  var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateRegionFN('" + rowObject.id + "');return false;\">修改</a>";
  var checkBtn = "";
  var backBtn = "";
  var fitAreaBtn = "";
  if (rowObject.level != 3) {
    checkBtn = "<a href='javascript:;'  class='no_unl' title='查看' onclick=\"checkDetailFN('" + rowObject.id + "');return false;\">查看</a>";
  }
  if (rowObject.level != 1) {
    backBtn = "<a href='javascript:;' class='no_unl' title='返回' onclick=\"backFN('" + rowObject.id + "');return false;\">返回</a>";
  }
  var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeRegionFN('" + rowObject.id + "');return false;\">删除</a>";
  btns.push(updateBtn);
  btns.push(checkBtn);
  btns.push(backBtn);
  btns.push(removeBtn);
  return btns.join(" ");
}

/**
 * 刷新表格
 */
function refreshGrid() {
  reloadGrid("table");
}

/**
 * 区号导入
 */
function doImport() {
  if ($("#fileInput").val() == "" || $("#fileInput").val() == null) {
    $.dialog.alert("请选择需要导入的文件");
    return;
  }
  $.ajaxFileUpload({
    url: basePath + '/admin/system/region/doImport.htm',//用于文件上传的服务器端请求地址
    secureuri: false,//一般设置为false
    fileElementId: 'fileInput',//文件上传空间的id属性 <input type="file" id="file" name="file" />
    dataType: 'json',//返回值类型一般设置为json
    success: function (data, status) { //服务器成功响应处理函数
      var msg = data.message;
      if (msg == "") {
        $.dialog.alert("导入成功");
        refreshGrid();
      } else {
        $.dialog.alert("导入失败：第" + msg + "行");
      }
    },
    error: function (data, status, e) {//服务器响应失败处理函数
      $.dialog.alert("导入失败");
    }
  });
}

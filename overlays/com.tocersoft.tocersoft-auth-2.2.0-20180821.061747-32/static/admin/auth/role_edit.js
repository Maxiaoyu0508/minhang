var zTree, curNode, pid, isCheck;
$(document).ready(function () {
  //初始化树
  initTree();
  //初始化操作按钮
  initOperateBtn();
  //验证框架信息
  initFormValidator();
  //初始化表单提交
  initAjaxForm();
});

/**
 * 初始化树
 */
function initTree() {
  var setting = {
    view: {
      dblClickExpand: false,//去除双击展开
      showLine: true,//展示树形左侧连接线
      selectedMulti: false//非多选
    },
    check: {
      enable: true//显示checkbox
    },
    data: {
      simpleData: {
        enable: true,
        idKey: "id",
        pIdKey: "pid",
        rootPId: "0"
      }
    },
    callback: {
      onCheck: zTreeOnCheck
    }
  };
  var itemId = $('#itemId').val();
  var rightUrl = basePath + "/admin/auth/right/listRightByRoleId.htm?m=" + Math.random();

  ajaxPOST(rightUrl, {"roleId": itemId}, function (data) {
    if (data.status != "success") {
      $.dialog.alert(data.message);
      return;
    }

    data = $.parseJSON(data.data);

    //初始化各个树形
    var treeContent = $('#rightContent');
    $('.rbc-item a').each(function (i, n) {
      var $firstMenu = $(this);
      var id = $(this).attr('data');
      var treeContainer = $('<div />');
      treeContainer.addClass('treeContainer');
      treeContainer.hide();
      var tree = $('<ul />');
      var treeId = 'children-' + id;
      tree.attr('id', treeId);
      tree.addClass("ztree");
      treeContainer.append(tree);
      treeContent.append(treeContainer);
      var treeNode = [];
      //获得子集
      $.each(data, function (i, n) {
        if (n.pid == id) {
          treeNode.push(n);
          for (var j = 0; j < data.length; j++) {
            if (n.id == data[j].pid) {
              treeNode.push(data[j]);
              for (var k = 0; k < data.length; k++) {
                if (data[j].id == data[k].pid) {
                  treeNode.push(data[k]);
                }
              }
            }
          }
        }
      });

      //初始化树
      zTree = $.fn.zTree.init(tree, setting, treeNode);
      zTreeOnCheck(null, treeId, null);

      if (treeNode.length == 0) {
        //判断一级菜单是否需要选中
        $.each(data, function (i, n) {
          if (n.id == id && n.checked) {
            $firstMenu.find("span.button").removeClass("checkbox_true_disable").addClass("checkbox_true_full");
            return false;
          }
        });
      }
    });
    //激活第一个选项
    $(".rbc-item-a:eq(0)").trigger("click");
  });
}

/**
 * 初始化操作按钮
 */
function initOperateBtn() {
  //保存角色
  $("body").on("click", "#saveBtn", saveRole);
  //返回
  $("body").on("click", "#backBtn", backToPage);
  //左侧顶级权限 点击显示对应子权限
  $('.rbc-item-a').on('click', showRightTree);
  //全选、反选
  $('.rbc-item-a .button').on('click', chkTreeNode);
}

/**
 * 初始化表单验证
 */
function initFormValidator() {
  $.formValidator.initConfig({validatorGroup: 1});
  $("#roleName").formValidator({
    validatorGroup: 1,
    onShow: '',
    onFocus: '请输入角色名称',
    onError: '角色名称不能为空'
  }).inputValidator({min: 1, max: 100, onErrorMin: "角色名称不能为空", onErrorMax: "角色名称长度过长"});
}

/**
 * 初始化表单提交
 */
function initAjaxForm() {
  //异步表单提交设置
  $('#roleForm').ajaxForm({
    dataType: 'json',
    success: function (data) {
      $("body").unmask();
      if (data.status == "success") {
        backToPage();
      } else {
        $.dialog.alert(data.message);
        //判断是否需要设置token
        if (data.token && data.token.length > 0) {
          $("input[name='token']").val(data.token);
        }
      }
    }
  });
}

/**
 * 全选、反选树
 */
function chkTreeNode() {
  var $this = $(this);
  var checkedAll = false;
  if ($this.hasClass('checkbox_false_full')) {
    checkedAll = true;
    $this.removeClass("checkbox_false_full").addClass("checkbox_true_full");
  } else {
    $this.removeClass("checkbox_true_full").addClass("checkbox_false_full");
  }
  var id = $(this).parent().attr('data');
  var treeId = 'children-' + id;
  var zTree = $.fn.zTree.getZTreeObj(treeId);
  zTree.checkAllNodes(checkedAll);
}

/**
 * 显示右侧菜单树
 */
function showRightTree() {
  var id = $(this).attr('data');
  $(".treeContainer").hide();
  var treeId = 'children-' + id;
  $('#' + treeId).parent().show();
}


//单个节点选中 或 取消选中
function zTreeOnCheck(event, treeId, treeNode) {
  var parentTid = treeId.split('-')[1];
  var span;
  $(".rbc-item-a").each(function (i, n) {
    if ($(n).attr('data') == parentTid) {
      span = $(n).children('.button');
      span.attr('class', '');
      span.addClass('button');
      span.addClass('chk');
      var ztreeContainer = $('#' + treeId).parent();
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      var chkNodes = zTree.getCheckedNodes(true);
      var unchkNodes = zTree.getCheckedNodes(false);
      if (chkNodes.length == 0) {
        span.addClass('checkbox_false_full');
      } else if (unchkNodes.length == 0) {
        span.addClass('checkbox_true_full');
      } else {
        span.addClass('checkbox_true_part');
      }
    }
  });
};

/**
 * 保存新角色
 */
function saveRole() {
  var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
  if (!result) {
    return;
  }
  var ids = [];
  $('.rbc-item-a .button').each(function (i, n) {
    var $this = $(this);
    if ($this.hasClass('checkbox_true_full') || $this.hasClass('checkbox_true_part') || $this.hasClass('checkbox_true_disable')) {
      var id = $(this).parent().attr('data');
      ids.push(id);
    }
  });
  $('.rbc-item-a').each(function (i, n) {
    var id = $(this).attr('data');
    var treeId = 'children-' + id;
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    var allChkNodes = zTree.getCheckedNodes(true);
    for (var i = 0, l = allChkNodes.length; i < l; i++) {
      ids.push(allChkNodes[i].id);
    }
  });
  $("#rightCheckedList").val(ids.join(','));

  $("body").mask("正在提交，请稍后...");
  $('#roleForm').submit();
}

/**
 * 返回页面
 */
function backToPage() {
  window.location.href = basePath + "/admin/auth/role/index.htm";
}
$(document).ready(function(){
  // 初始化验证框架
  initFormValidator();
  // 初始化操作按钮
  initOperateBtn();
  // 初始化表单提交
  initAjaxForm();
});

/**
 * 初始化验证框架
 */
function initFormValidator(){
//验证框架信息
  $.formValidator.initConfig({
    validatorGroup: 1, onError: function (msg, obj, errorlist) {
      $.msg({wrapID: "errorlist", type: "error", messages: errorlist, time: "5000"});
    }
  });
  $("#hostName").formValidator({validatorGroup: 1}).inputValidator({min: 1, onErrorMin: "主机不能为空"});
  $("#account").formValidator({validatorGroup: 1}).inputValidator({min: 1, max: 250, onErrorMax: "账号不能为空"});
  $("#password").formValidator().inputValidator({min: 1, onError: "密码不能为空"}).defaultPassed();
  $("#fromName").formValidator({validatorGroup: 1}).inputValidator({min: 1, max: 250, onErrorMax: "发件名称不能为空"});
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
  $("body").on("click","#saveConfigBtn",saveEmailConfig);
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
  //异步表单提交设置
  $('#configForm').ajaxForm({
    dataType: 'json',
    success: function (data) {
      if (data.status == 'success') {
        $.dialog.alert('保存成功');
      } else if (data.status = 'error') {
        $.dialog.alert('保存失败');
      }
    }
  });
}


/**
 * 保存邮件配置
 */
function saveEmailConfig(){
  var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
  if (!result) {
    return;
  }
  $('#configForm').submit();
}
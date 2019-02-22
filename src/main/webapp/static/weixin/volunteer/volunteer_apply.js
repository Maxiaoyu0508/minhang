$(document).ready(function(){
    //初始化表单提交
    initAjaxForm();

});


function checkIdCardFN(value) {
  var idCardRule = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  var myDate = new Date();
  var age = myDate.getFullYear() - value.substring(6, 10);

  if(idCardRule.test(value) == true){
    $("#age").val(age);
    if(value.substring(16, 17)%2 == 0){
      $("#sex").val(2);
    }else {
      $("#sex").val(1);
    }
  }else {
    alert("请输入正确的身份证号码");
  }
}


/**
 * 初始化表单提交
 */
function initAjaxForm(){
    $('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
            $("body").unmask();
            if(data.status == "SUCCESS"){
                var win = $.dialog.open.origin;
                win.reloadCommonGrid("table");
                $.dialog.close();
            }else{
                $.dialog.alert(data.message);
                if(typeof data.token != "undefined" && data.token.length > 0){
                    $("input[name='token']").val(data.token);
                }
            }
        }
    });
}

/**
 * 保存志愿者招募
 */
function saveWxVolunteer(){
    $.dialog.confirm("确认是否提交",function() {
        $("body").mask("正在保存，请稍后...");
        $("#saveForm").submit();
    });
}
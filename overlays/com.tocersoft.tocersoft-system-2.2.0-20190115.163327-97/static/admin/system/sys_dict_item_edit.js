$(document).ready(function(){
	//初始化验证框架
	initFormValidator();
	//初始化操作按钮
	initOperateBtn();
	//初始化表单提交
	initAjaxForm();
});

/**
 * 初始化验证框架
 */
function initFormValidator(){
	//验证框架信息
	$.formValidator.initConfig({validatorGroup:1,onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#dictItemName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"数据项不能为空",onErrorMax:"数值长度过长"});
	$("#dictItemSort").formValidator({validatorGroup:1,empty:true}).regexValidator({regExp:"^[1-9]\\d*$",onError:"排序输入错误，只能为正整数"});
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	$('#saveBtn').on("click",saveDictItem);
}


/**
 * 初始化表单提交
 */
function initAjaxForm(){
	//异步表单提交设置
    $('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
			$("body",parent.document).unmask();
        	if(data.status == 'success'){
				var win = $.dialog.open.origin;
				win.changeSelect($("#globalDictId").val());
				//关闭窗口
				$.dialog.close();
        	}else {
        		$.dialog.alert(data.message);
				//判断是否需要设置token
				if(data.token && data.token.length > 0){
					$("input[name='token']").val(data.token);
				}
        	}
        }
    });
}


/**
 * 保存字典项
 */
function saveDictItem(){
	var result = $.formValidator.pageIsValid('1');
	if(!result){
		return;
	}
	$("body",parent.document).mask("正在保存，请稍后....");
	$("#saveForm").submit();
}
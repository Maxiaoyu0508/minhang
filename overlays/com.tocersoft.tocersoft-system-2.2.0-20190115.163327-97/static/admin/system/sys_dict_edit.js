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
	$("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"名称不能为空",onErrorMax:"长度过长"});
	$("#sort").formValidator({validatorGroup:1,empty:true}).regexValidator({regExp:"^[1-9]\\d*$",onError:"排序输入错误，只能为正整数"});
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存字典
	$("#saveBtn").on("click",saveDict);
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
				win.refreshDictSelect(data.options);
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
 * 保存字典
 */
function saveDict(){
	//校验
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	
	//提交
	$("body",parent.document).mask("保存中....");
	$("#saveForm").submit();
}
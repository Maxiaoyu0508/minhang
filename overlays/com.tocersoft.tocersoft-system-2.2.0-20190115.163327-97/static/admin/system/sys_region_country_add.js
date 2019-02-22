$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
	$.formValidator.initConfig({validatorGroup:1,onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#itemName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"国家名称不能为空",onErrorMax:"国家名称长度过长"});
	$("#itemSort").formValidator({validatorGroup:1}).regexValidator({regExp:"^[1-9]\\d*$",onError:"排序输入错误，只能为正整数"});
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status == "success"){
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
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存国家
	$("#saveBtn").on("click",saveCountry);
	//关闭窗口
	$("#exitBtn").on("click",closeWin);
}

/**
 * 保存国家
 */
function saveCountry(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}
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
	$("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"区域名称不能为空",onErrorMax:"区域名称长度过长"});
	$("#code").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"区域代码不能为空",onErrorMax:"区域代码长度过长"});
	$("#sort").formValidator({validatorGroup:1,empty:true}).regexValidator({regExp:"^[1-9]\\d*$",onError:"排序输入错误，只能为正整数"});
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存区域
	$("body").on("click","#saveBtn",saveSysRegion);
}

/**
 * 保存区域
 */
function saveSysRegion(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	var regionId = $("#regionId").val();
	$("body",parent.document).mask("保存中....");
	$("#saveForm").submit();
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body",parent.document).unmask();
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

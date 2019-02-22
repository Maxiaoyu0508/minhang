var regionSelect = null;	//省市区选择控件
$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//验证框架信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化区域选择控件
	initRegionSelect();
});

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存
	$("body").on("click","#saveBtn",saveDepart);
}

/**
 * 初始化表单验证
 */
function initFormValidator(){
	$.formValidator.initConfig({validatorGroup: 1});
	$("#itemName").formValidator({validatorGroup:1,onShow:'请输入部门名称',onFocus:'请输入部门名称'}).inputValidator({min:1,max:100,onErrorMin:"部门名称不能为空",onErrorMax:"部门名称长度过长"});
	var itemId = $("#itemId").val();
	if(itemId && itemId.length > 0){
		$.formValidator.pageIsValid(1);
	}
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
				//刷新当前节点
				var win = $.dialog.open.origin;
				win.refreshDepartTreeNode();
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
 * 保存部门
 */
function saveDepart() {
	var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
	if(!result){
		return;
	}
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",parent.document).mask("正在保存，请稍候...");
	$("#saveForm").submit();
}

/**
 * 初始化区域选择控件
 * @returns
 */
function initRegionSelect(){
	regionSelect = $("#regionSelectDiv").regionselect({
        districtSelectName : 'item.regionId'	//地区下拉框name
        	
	});
	 
}
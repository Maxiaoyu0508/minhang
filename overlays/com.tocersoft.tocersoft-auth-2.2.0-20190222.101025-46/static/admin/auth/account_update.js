$(document).ready(function(){
	//初始化验证表单
	initFormValidator();	
	//初始化操作按钮
	initOperateBtn();
	//初始化表单提交
    //initAjaxForm();
});

/**
 * 初始化验证表单
 */
function initFormValidator(){
	//验证框架信息
	$.formValidator.initConfig({validatorGroup:1});
	$("#name").formValidator({validatorGroup:1,onShow:'请输入姓名',onFocus:'姓名不能为空',onCorrect:''}).inputValidator({min:1,max:255,onErrorMin:"姓名不能为空",onErrorMax:"姓名长度过长"});
	$.formValidator.initConfig({validatorGroup:2});
	$("#resetPwd").formValidator({validatorGroup:2,onShow:'请输入重置密码',onFocus:'重置密码不能为空',onCorrect:'重置密码输入正确'}).inputValidator({min:1,max:50,onErrorMin:"重置密码不能为空",onErrorMax:"重置密码长度过长"});
	
	$.formValidator.pageIsValid(1);
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	$("body").on("click","#toUpdatePwd",toUpdatePwd);	//显示修改密码区域
	$("body").on("click","#updateBtn",updateUser);	//执行修改用户信息操作
	$("body").on("click","#doUpdatePwd",doUpdatePwd);	//执行重置密码操作
	//选择角色
	$("#chooseRoleBtn").on("click",chooseRole);
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	//异步表单提交设置
    $.ajax({
    	url:basePath + '/admin/user/account/saveCurrentUser.htm',
        dataType: 'json',
        type:'post',
        data:$("#roleForm").serialize(),
        success: function(data) {
			$("body",parent.document).unmask();
        	if(data.status=='success'){
        			$.dialog.alert("保存修改成功!");
        		}else{
        			$.dialog.alert("保存修改失败!");
        		}
        }
    });
}

/**
 * 显示修改密码区域
 */
function toUpdatePwd(){
	$('#updatePwd').slideToggle("fast");
}

/**
 * 更新角色
 */
function updateUser(){
	var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
	if(!result){
		return;
	}
	$("body",parent.document).mask("正在提交，请稍后...");
	initAjaxForm();
}
/**
 * 重置密码
 */
function doUpdatePwd(){
	var pwd = $('#resetPwd').val();
	if(null == pwd || pwd == "" || pwd == undefined){
		$.dialog.alert("请输入重置密码");
		return ;
	}
	var userId = $('#itemId').val();
	$.post(basePath + '/admin/user/account/changeCurrentPwd.htm?m=' + Math.random(),
		{'item.password':pwd,'item.isChangePwd':1},
		function(data){
		if(data.status = "success"){
			window.location.reload();
			$.dialog.alert("重置密码成功!");
		}else{
			$.dialog.alert("重置密码失败!");
		}
	});
}

/**
 * 删除角色
 * @param e
 * @param id
 */
function delRow(e,id){
	$(e).parent('div').remove();
	
	var sendRows = $("#roleIds").val().split(",");
	
	if(sendRows && sendRows.length > 0){
		for(var j=0;j<sendRows.length;j++){
			var row = sendRows[j];
			if(row == id){
				//找到ID
				sendRows.splice(j,1);
				break;
			}
		}
	};
	if(!$('#rows').children().has('.fl')){
		$('#notRow').show();
	}
	
	$("#roleIds").val(sendRows.join(","));
};

/**
 * 选择角色
 */
function chooseRole(){
	$.dialog.open(basePath + "/admin/auth/user/choose_role.htm?m=" + Math.random(), {
		title: '选择角色',width:'800px',height:'500px',lock:true
	});
};

/**
 * 新增角色
 * @param rows
 */
function addRole(rows){
	if(!rows||rows.length == 0){
		return;
	}
	
	var sendRows = $("#roleIds").val().split(",");
	
	// 隐藏掉提示文字
	$('#notRow').hide();
	for(var i=0; i<rows.length; i++){
		var row = rows[i];
		// 以下操作去除重复
		var isRepeat = false;
		for(var j=0; j<sendRows.length; j++){
			var userId = sendRows[j];
			if(userId == row.id){
				isRepeat = true;
				break;
			}
		}
		// 没有与原来重复的，则加入列表中
		if(!isRepeat){
			var liHtml = '<div class="choose-main-li fl mr15">'+row.name+'<a class="ml5" onclick="delRow(this,\''+row.id+'\');return false;" href="javascript:void(0);">X</a></div>';
			$('#rows').find('.cb').before(liHtml);
			sendRows.push(row.id);
		}
	}
	
	$("#roleIds").val(sendRows.join(","));
};
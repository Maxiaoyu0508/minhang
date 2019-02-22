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
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
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
        		win.updateMemberId(data.message);
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
	//保存会员基本信息
    $("body").on("click","#saveBtn",saveMemberUser);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
    //选择角色
    $("body").on("click","#chooseRoleBtn",chooseRole);
    //重置密码按钮单击事件
	$('#toUpdatePwd').on("click",doUpdatePwd);
	
}

/**
 * 保存会员基本信息
 */
function saveMemberUser(){
//	var result = $.formValidator.pageIsValid(1);
//	if(!result){
//		return;
//	}
//	var account = $("#account").val();
//	if(account == ""){
//		$.dialog.alert("会员账号必填！");
//		return;
//	}
//	var memberRoleId = $("#memberRoleId").val();
//	if(memberRoleId == ""){
//		$.dialog.alert("会员角色必填！");
//		return;
//	}
//	var email = $("#email").val();
//	 var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
//	    if(!reg.test(email)){
//	        $.dialog.alert("邮箱格式不正确！");
//	        return;
//	    }
//	var mobile = $("#mobile").val();
//	 var reg = /^1\d{10}$/;
//	    if(!reg.test(mobile)){
//	    	$.dialog.alert("手机号格式不正确！");
//	    	return;
//	    }
//	    
//	    var qq = $("#qq").val();
//	    var reg=/^\d{5,10}$/; 
//		    if(!reg.test(qq)){
//		    	$.dialog.alert("QQ号格式不正确！");
//		    	return;
//		    }
	var clientId = $.dialog.data("clientId");
	$("#clientId").val(clientId);     
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
}

//重置密码按钮单击事件
function doUpdatePwd(){
	$('#updatePwd').slideToggle("fast");
}

/**
 * 重置密码
 */
function resetPwd(){
	var pwd = $('#resetPwd').val();
	var userId = $('#itemId').val();
	$.post(basePath+'/admin/member/resetPwd.htm',{'item.password':pwd,'item.id':userId},function(data){
		if(data.status = "success"){
			$.dialog.alert('保存成功');
			window.location.reload();
		}else{
			$.dialog.alert(data.msg);
		}
	});
};


/**
 * 选择角色
 */
function chooseRole(){
	$.dialog.open(basePath + "/admin/member/choose_role.htm?m=" + Math.random(), {
		title: '选择角色',width:'800px',height:'500px',lock:true
	});
};

/**
 * 添加角色
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


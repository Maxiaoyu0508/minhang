var zTree = null;
$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//初始化验证框架信息
	initFormValidator();
	//初始化异步提交
	initAjaxForm();
	//初始化部门树
	initDepartTree();
	
	inputPassword();
});

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	// 保存用户
	$("body").on("click","#saveBtn",saveUser);
	// 返回
	$("body").on("click","#backBtn",backToPage);
	// 选择角色
	$("#chooseRoleBtn").on("click",chooseRole);
	// 显示重置密码页面
	$("body").on("click","#toUpdatePwd",toUpdatePwd);	//显示修改密码区域
	// 重置密码操作
	$("body").on("click","#doUpdatePwd",doUpdatePwd);	//执行重置密码操作
}

/**
 * 初始化验证框架信息
 */
function initFormValidator(){
	var itemId = $("#itemId").val();
	//验证框架信息
	$.formValidator.initConfig({validatorGroup:1});
	$("#account").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:1,max:100,onErrorMin:"账号不能为空",onErrorMax:"账号长度过长"})
	.ajaxValidator({
		dataType:'json',
		async:true,
		type:'post',
		url:basePath + '/admin/auth/user/check_account.htm',
		data:{'item.account':function(){
			return $("#account").val();
		}},
		success:function(data){
			if(data.message == 'true'){
				return true;
			}else{
				return false;
			}
		},
		buttons:$("#saveBtn"),
		error:function(jqXHR, textStatus, errorThrown){
			$.dialog.alert("服务器没有返回数据，可能服务器忙，请重试");
		},
		onError:function(o){
			return "账号已存在，请重新输入";
		},
		onWait:"正在校验，请稍候..."
	});
	$("#password").formValidator({onFocus:'密码必填'}).inputValidator({min:1,max:100,onErrorMin:"密码必填",onErrorMax:"密码长度过长"});
	$("#name").formValidator({onFocus:'用户名必填'}).inputValidator({min:1,max:100,onErrorMin:"用户姓名必填",onErrorMax:"用户姓名长度过长"});
	$("#staffId").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:0,max:100,onErrorMax:"用户编号长度过长"});
	$("#birthday").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:0,max:20,onErrorMax:"生日长度过长"});
	$("#email").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:0,max:100,onErrorMax:"电子邮箱长度过长"});
	$("#mobile").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:0,max:20,onErrorMax:"手机号码长度过长"});
	$("#tel").formValidator({onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:0,max:50,onErrorMax:"固定电话长度过长"});

	if(itemId && itemId.length > 0){
		$("#account").unFormValidator(true);	//解除绑定
	}
};

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	//异步表单提交设置
	$('#userForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status = 'success'){
        		$("body").mask("正在加载页面，请稍后...");
        		backToPage();
        	}else if(data.status = 'error'){
        		$.dialog.alert('保存失败');
        	}
        }
    });
}

/**
 * 初始化部门树
 */
function initDepartTree(){
	// 生成Ztree
	var setting = {
		async : {
			enable : true,
			url : departTreeLoadUrl,
			autoParam : ["id","name","parentId","isParent"],
			dataFilter : parseDepartTreeDataFilter
		},
		callback : {
			onAsyncSuccess : hideTipFN
		},
		view : {
			 nameIsHTML : true
		},
		/*check : {
			enable : true,
			chkStyle : "checkbox"
		}*/
		check : {
			enable : true,
			chkStyle : "checkbox",
			chkboxType: { "Y": "", "N": "" }
		}
	};
	
	$.fn.zTree.init($("#categoryTree"), setting);
	zTree = $.fn.zTree.getZTreeObj("categoryTree");
}

/**
 * 选择角色
 */
function chooseRole(){
	$.dialog.open(basePath + "/admin/auth/user/choose_role.htm?m=" + Math.random(), {
		title: '选择角色',width:'800px',height:'500px',lock:true
	});
};

/**
 * 保存用户
 */
function saveUser(){
	var result = $.formValidator.pageIsValid(1);// 手动调用验证框架进行验证
	if(!result){
		return;
	}
	
	//获取选中的部门ID
	var departIds = [];
	var nodes = zTree.getCheckedNodes(true);
	for(var i=0;i<nodes.length;i++){
		var node = nodes[i];
		if(node.id != "0"){
			departIds.push(node.id);
		}
	}
	$("#departIds").val(departIds.join(","));
	
	$("body").mask("正在保存，请稍后...");
	$("#userForm").submit();
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
			var liHtml = '<div class="choose-main-li fl mr15">'+row.name+'<a class="ml5" onclick="delRow(this,\''+row.id+'\');return false;" href="javascript:void(0);" style="color:#fff">X</a></div>';
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

/**
 * 返回列表页面
 */
function backToPage(){
	window.location.href = basePath + "/admin/auth/user/index.htm";
}


/**
 * 用于对 Ajax 返回数据进行预处理的函数
 * @param {Object} treeId
 * @param {Object} parentNode
 * @param {Object} responseData
 */
function parseDepartTreeDataFilter(treeId,parentNode,responseData){
	var treeData = $.parseJSON(responseData.data);
	return treeData;
}

/**
 * 加载树URL
 * @param {Object} treeId
 * @param {Object} treeNode
 */
function departTreeLoadUrl(treeId, treeNode) {
	var url = basePath + "/admin/auth/depart/list_all_depart.htm";
//	if(treeNode != null){
//		url += "?pid=" + treeNode.id;
//	}
//	
	return url;
}

/**
 * 隐藏加载框
 */
function hideTipFN(){
	$("#loadTip").hide();
	
	var nodes = zTree.getNodes();
	zTree.selectNode(nodes[0]);
	var departIds = $("#departIds").val();
	if(departIds && departIds.length > 0){
		//设置树选中
		var departIdArr = departIds.split(",");
		for(var i=0;i<departIdArr.length;i++){
			var departId = departIdArr[i];
			var node = zTree.getNodeByParam("id",departId,null);
			if(null != node){
				zTree.checkNode(node,true,false);
			}
		}
	}
}
/**
 * 显示修改密码区域
 */
function toUpdatePwd(){
	$('#updatePwd').slideToggle("fast");
}
/**
 * 重置密码
 */
function doUpdatePwd(){
	var pwd = $('#resetPwd').val();
	if(pwd == "" || pwd == null){
		$.dialog.alert("请输入重置密码");
		return;
	}
	var userId = $('#itemId').val();
	$.post(basePath + '/admin/auth/user/resetPwd.htm?m=' + Math.random(),
		{'item.password':pwd,'item.isChangePwd':1,'item.id':userId},
		function(data){
		if(data.status = "success"){
			$.dialog.alert("重置密码成功!",function(){
				window.location.reload();
			});
		}else{
			$.dialog.alert("重置密码失败!");
		}
	});
}
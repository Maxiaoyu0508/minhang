var zTree,rMenu,gh,curNode;	//定义变量
$(document).ready(function(){
	//初始化操作按钮
	initOperateBtn();
	//初始化部门树
	initDepartTree();
});

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存
	$("body").on("click","#saveBtn",saveDepart);
}

/**
 * 初始化部门树
 */
function initDepartTree(){
	$("#treeDiv").css("height",220);
	// 生成Ztree
	var setting = {
		async : {
			enable : true,
			url : departTreeLoadUrl,
			autoParam : ["id","name","parentId","isParent"],
			dataFilter : parseDepartTreeDataFilter
		},
		callback : {
			onClick : clickDepartTreeFN,
			onAsyncSuccess : hideTipFN
		},
		view : {
			 nameIsHTML : true
		},
		check : {
			enable : false,
			chkStyle : "checkbox"
		}
	};
	
	$.fn.zTree.init($("#categoryTree"), setting);
	zTree = $.fn.zTree.getZTreeObj("categoryTree");
	
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
 * 单击部门树函数
 * @param {Object} event
 * @param {Object} treeId
 * @param {Object} treeNode
 */
function clickDepartTreeFN(event,treeId,treeNode){
	curNode = treeNode;
	//全部查询
	if(curNode.id != 0){
		$("#departId").val(curNode.id);
	}else{
		$("#departId").val("0");
	}
}

/**
 * 隐藏加载框
 */
function hideTipFN(){
	$("#loadTip").hide();
	if(curNode == null){
		var nodes = zTree.getNodes();
		zTree.selectNode(nodes[0]);
		curNode = nodes[0];
	}
}

/**
 * 加载树URL
 * @param {Object} treeId
 * @param {Object} treeNode
 */
function departTreeLoadUrl(treeId, treeNode) {
	return treeNode == null ? basePath + "/admin/auth/depart/list_depart.htm" : basePath + "/admin/auth/depart/list_depart.htm?pid="+treeNode.id;
}


/**
 * 保存部门
 */
function saveDepart() {
	if(curNode == null){
		$.dialog.alert("请选择目标部门");
		return;
	}
	var selIds = $("#selIds").val();
	var newDepartId = $("#departId").val();
	if(newDepartId!="0"&&selIds.indexOf(newDepartId) != -1){
		$.dialog.alert("所选择的目标部门不能和待移动部门相同");
		return;
	}
	var postData = {
		"selIds" : selIds,
		"newDepartId" : newDepartId
	}
	var name = curNode.name;
	$.dialog.confirm("确定要移动到\""+name+"\"吗？",function(){
		// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
		$("body",parent.document).mask("正在移动，请稍候...");
		var url = "";
		var moveType = $("#moveType").val();
		if(moveType=="1"){
			url = basePath + "/admin/auth/depart/doMove.htm?m=" + Math.random();
		}else if(moveType=="2"){
			url = basePath + "/admin/auth/user/doMove.htm?m=" + Math.random();
			postData["oldDepartId"] = $("#oldDepartId").val();
		}
		$.post(url,postData,function(data){
			$("body",parent.document).unmask();
			if(data.status == "success"){
				var win = $.dialog.open.origin;
				win.reloadDepartNodes(0);
				win.searchGrid();
				//关闭窗口
				$.dialog.close();
			}else{
				$.dialog.alert(data.message);
			}
		},'json');
	});
	
}

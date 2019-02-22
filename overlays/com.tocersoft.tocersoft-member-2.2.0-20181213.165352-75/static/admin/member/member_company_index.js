var zTree, rMenu, curNode, categoryId;
$(document).ready(function(){
	//初始化Ztree
	initZtree();
	//初始化操作按钮
	initOperateBtn();
 	// 初始化ajaxForm
 	initAjaxForm();
});
/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	// 修改类别
	$("body").on("click","#editNodeBtn",editNode);
	// 刷新选定节点
	$("body").on("click","#selNodeRefresh",refreshSelNode);
	// 删除节点
	$("body").on("click","#selNodeDelete",delSelNode);
	//添加子集菜单
	$("body").on("click","#addNodeBtn",addChild);
	// 新增顶级菜单
	$("body").on("click","#addParentBtn",addParent);
	// 刷新功能
	$("body").on("click","#freshBtn",reloadTree);
	//提交修改内容
	$("body").on("click","#saveRightBtn",submitForm);
    
}
/**
 * 初始化ajaxForm
 */
function initAjaxForm(){
	 //异步表单提交设置
    $('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body",parent.document).unmask();
        	if(data.stauts = 'success'){
        		$.dialog.alert('保存成功！',function(){
        			reloadNodes(curNode.parentId);
        		});
        	}else if(data.stauts = 'error'){
        		$.dialog.alert('保存失败！');
        	}
        }
    });
}
/**
 * 初始化Ztree
 */
function initZtree(){
	var gh = $(window).height() - 46;
	$("#treeDiv").css("height",gh);
	resizeWidth();
	// 生成Ztree
	var setting = {
		async : {
			enable : true,
			url : treeLoadUrl,
			autoParam : ["id", "name", "telephone", "website", "sort", "parentId","level","isLeaf"],
			dataFilter : parseRoleTreeDataFilter
		},
		callback : {
			onRightClick : OnRightClick,
			onClick : treeClickFN,
			onAsyncSuccess : hideTipFN,
			
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
 	rMenu = $("#rMenu");
}
/**
 * tree远程请求的地址
 * @param treeId
 * @param treeNode
 * @returns
 */
function treeLoadUrl(treeId, treeNode) {
	return treeNode == null
			? basePath+"/admin/member/company/listRightByTree.htm?pid=0"
			: basePath+"/admin/member/company/listRightByTree.htm?pid="+treeNode.id;
}
/**
 * 格式化Z_TREE的数据
 * @param treeId
 * @param parentNode
 * @param responseData
 * @returns
 */
function parseRoleTreeDataFilter(treeId,parentNode,responseData){
	var treeData =$.parseJSON(responseData.data);
	return treeData;
}
/**
 * 拖拽回调函数
 */
function separatorCallbackFN(){
	resizeWidth();
}
/**
 * 初始化特效事件
 */
function initEffectEvent(){
	//左右拖拽
	var divsp = new Separator(document.getElementById("categoryTreeDiv"),document.getElementById("categoryContentDiv"),separatorCallbackFN,SP_LEFTRIGHT,4); 
	$(window).resize(function(){
		resizeWidth();
	});
}
/**
 * 修改节点
 */
function editNode(){
	// 隐藏右键菜单
	hideRMenu();
	if(curNode == null){
		$.dialog.alert("请选择类别！");
		return;
	}
	// 判断是否有下级
	$.post(basePath+"/admin/member/company/checkParent.htm",{"item.id":curNode.id},function(data){
		if(data.status == "success"){
			var flag = data.data.flag;
			if(flag == 1 && curNode.isLeaf == "0"){
				$.dialog.alert("非叶节点不能修改");
			}else{
				$.dialog.open(basePath+"/admin/member/company/edit.htm?item.id="+curNode.id,{
						title : "修改资源标签",
						width : "700px",
						height : "300px",
						lock : true
					}
				);
			}
		}
	});
}
/**
 * 刷新选中的节点
 */
function refreshSelNode(){
	hideRMenu();
	if(curNode == null){
		$.dialog.alert("请选择要刷新的菜单！");
		return ;
	}
	reloadNodes(curNode.id);
}
/**
 * 删除选中节点
 */
function delSelNode(){
	hideRMenu();
	if(curNode == null){
		$.dialog.alert("请选择要删除的菜单！");
		return;
	}
	
	$.dialog.confirm("确定要删除此菜单吗？",function(){
		$("body",parent.document).mask("正在删除，请稍候...");
		
		var treeObj=$.fn.zTree.getZTreeObj("categoryTree");
		//获取选中的节点
		var nodes=treeObj.getSelectedNodes();
		var v = new Array();
		for(var i = 0;i<nodes.length;i++){
			v.push(nodes[i].id);
		}
		deleteSelectNode(v.join(","));
	});
}
/**
 * 删除选中的节点
 * @param nodeId
 */
function deleteSelectNode(nodeId){
	var parentId=$("#parentId").val();
	$.post(basePath+"/admin/member/company/del.htm?m="+Math.random(),{"selIds":nodeId,"item.parentId":curNode.id},function(data){
		$("body",parent.document).unmask();
		if(data.status=="success"){
			reloadNodes(parentId);
		}else{
			$.dialog.alert("删除失败！");
		}
	},"json");
}
/**
 * 新增子节点
 */
function addChild(){
	hideRMenu();
	if(curNode == null){
		$.dialog.alert("请选择父类！");
		return;
	}
	// 隐藏右键菜单
	hideRMenu();
	// 若是多选，则只选中当前一个
	var level = curNode.level;
	level = parseInt(level);
	level++;
	var isParent = curNode.isParent;
	var isParentItem = 0;
	if(isParent){
		isParentItem = 1;
	}
	$.dialog.open(
		basePath+"/admin/member/company/edit.htm?item.parentId="+curNode.id+"&item.level="+level,{
			title : "新增会员企业",
			width : "700px",
			height : "300px",
			lock : true
		}
	);
}
/**
 * 新增父级节点
 */
function addParent(){
	$.dialog.open(basePath+"/admin/member/company/edit.htm?item.parentId=0&item.level=1",{
		title : "新增会员企业",
		width : "700px",
		height : "300px",
		lock : true
	});
}
/**
 * 重新加载
 */
function reloadTree() {
	hideRMenu();
	zTree.reAsyncChildNodes(null, "refresh");
}
/** 
 * 隐藏右键菜单 
 */
function hideRMenu() {
	if (rMenu)
		rMenu.css({
					"visibility" : "hidden"
				});
	$("body").unbind("mousedown", onBodyMouseDown);
}
/**
 * 自适应Ztree宽度
 */
function resizeWidth(){
	var ww = $(window).width();
	var tw = $("#categoryTreeDiv").width();
	$("#categoryContentDiv").width(ww-tw-50);
	$(".category-box").css('padding-left',tw);
}
/**
 * 右键点击事件
 * @param event
 * @param treeId
 * @param treeNode
 */
function OnRightClick(event, treeId, treeNode) {
	if (!treeNode && event.target.tagName.toLowerCase() != "button"
			&& $(event.target).parents("a").length == 0) {
		zTree.cancelSelectedNode();
		showRMenu("root", event.clientX, event.clientY);
		curNode = null;
	} else if (treeNode && !treeNode.noR) {
		// 暂时取消 右键选中 节点功能
		// curNode = treeNode;
		// zTree.selectNode(treeNode);
		showRMenu("node", event.clientX, event.clientY);
	}
}
/**
 * 树单击事件
 */
function treeClickFN(event,treeId,treeNode){
	$("#itemId").val(treeNode.id);
	$("#parentId").val(treeNode.parentId);
	$("#name").val(treeNode.name);
	$("#telephone").val(treeNode.telephone);
	$("#address").val(treeNode.address);
	$("#website").val(treeNode.website);
	$("#sort").val(treeNode.sort);
	$("#level").val(treeNode.level);
	
//	$("input[name='item.isLeaf']").prop("checked",false).eq(treeNode.isLeaf).prop("checked",true);
	if(treeNode.isLeaf == 0){
//		$("#saveRightBtn").hide();
		$("input[name='item.isLeaf'][value=0]").prop("checked",true);
	}else if(treeNode.isLeaf == 1){
//		$("#saveRightBtn").show();
		$("input[name='item.isLeaf'][value=1]").prop("checked",true); 
	}
	// 判断是否有下级
	$.post(basePath+"/admin/member/company/checkParent.htm",{"item.id":treeNode.id},function(data){
		if(data.status == "success"){
			var flag = data.data.flag;
			if(flag == 0){
				$("#editLeaf").show();
				$("#textLeaf").hide();
				$("#saveRightBtn").show();
			}else if(flag == 1){
				$("#textLeaf").show();
				$("#editLeaf").hide();
				$("#saveRightBtn").hide();
			}
				
		}
	});
	
	curNode = treeNode;
}
/**
 * 回调隐藏提示
 */
function hideTipFN(){
	$("#loadTip").hide();
}
/**
 * 展示右键菜单
 * @param type
 * @param x
 * @param y
 */
function showRMenu(type, x, y) {
	$("#rMenu ul").show();
	if (type == "root") {
		curNode = null;
		$("#m_del").hide();
		$("#m_check").hide();
		$("#m_unCheck").hide();
	} else {
		$("#m_del").show();
		$("#m_check").show();
		$("#m_unCheck").show();
	}
	rMenu.css({
		"top" : y + "px",
		"left" : x + "px",
		"visibility" : "visible"
	});

	$("body").bind("mousedown", onBodyMouseDown);
}
/**
 * 鼠标放下事件
 * @param event
 */
function onBodyMouseDown(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}
/**
 * 提交表单
 */
function submitForm(){
	var rightId =$("#itemId").val();
	if(rightId==null || rightId ==''){
		$.dialog.alert("请选择一个菜单！");
		return;
	}
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",parent.document).mask("正在处理，请稍候...");
	$("#saveForm").submit();
}

/** 刷新指定节点 */
function reloadNodes(id) {
	var node = zTree.getNodeByParam('id', id);
	if (node != null) {
		if (node.open) {
			zTree.reAsyncChildNodes(node, 'refresh');
		} else {
			zTree.expandNode(node);
		}
	}
	hideRMenu();
}
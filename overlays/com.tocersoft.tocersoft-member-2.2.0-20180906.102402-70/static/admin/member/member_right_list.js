var zTree, rMenu, curNode, categoryId;
$(document).ready(function(){
	//初始化Ztree
	initZtree();
	//初始化操作按钮
	initOperateBtn();
	//初始化AjaxForm
	initAjaxForm();
	//初始化特效事件
	initEffectEvent();
});
/**
 * 初始化特效事件
 */
function initEffectEvent(){
	//左右拖拽
	var divsp = new Separator(document.getElementById("categoryTreeDiv"),document.getElementById("categoryContentDiv"),separatorCallbackFN,SP_LEFTRIGHT,4); 
	$(window).resize(function(){
		resizeWidth();
	});
	
	//添加图标的效果
	$("body").on("click",".the-icons li",function(){
		$(".the-icons li").removeClass("cur");
		$(this).addClass("cur");
		var className = $(this).find("i").attr("class");
		$("#iconPath").val(className);
	});
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
			autoParam : ["id", "name", "location", "open", "tip", "funUrl", "sort", "parentId"],
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
 * 初始化操作按钮
 */
function initOperateBtn(){
	// 修改类别
	$("body").on("click","#editNodeBtn",editNode);
	// 刷新选定节点
	$("body").on("click","#selNodeRefresh",refreshSelNode);
	// 删除节点
	$("body").on("click","#selNodeDelete",delSelNode);
	// 新增顶级菜单
	$("body").on("click","#addParentBtn",addParent);
	//添加子集菜单
	$("body").on("click","#addNodeBtn",addChild);
	// 刷新功能
	$("body").on("click","#freshBtn",reloadTree);
	//提交修改内容
	$("body").on("click","#saveRightBtn",submitForm);
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
	$.post(basePath+"/admin/member/right/del.htm?m="+Math.random(),{"selIds":nodeId,"item.parentId":curNode.id},function(data){
		$("body",parent.document).unmask();
		if(data.status=="success"){
			reloadNodes(parentId);
		}else{
			$.dialog.alert("删除失败！");
		}
	},"json");
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
 * 回调隐藏提示
 */
function hideTipFN(){
	$("#loadTip").hide();
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
 * 树单击事件
 */
function treeClickFN(event,treeId,treeNode){
	$("#rightId").val(treeNode.id);
	$("#parentId").val(treeNode.parentId);
	$("#name").val(treeNode.name);
	$("#tip").val(treeNode.tip);
	$("#funUrl").val(treeNode.funUrl);
	$("#sort").val(treeNode.sort);
	var curIconPath = treeNode.iconPath;
	$("#iconPath").val(curIconPath);
	//选中图标
	$(".the-icons li").each(function(){
		 var iconPath = $(this).children("i").attr("class");
		 $(".the-icons li").removeClass("cur");
		if(iconPath == curIconPath){
			$(this).addClass("cur");
			return false;
		}
	});
	curNode = treeNode;
}

/**
 * 提交表单
 */
function submitForm(){
	 var rightId =$("#rightId").val();
	if(rightId==null || rightId ==''){
		$.dialog.alert("请选择一个菜单！");
		return;
	}
	if($("#iconPath").val() == null || $("#iconPath").val() == ""){
		$("#iconPath").val("tocer-icon01");
	}
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",parent.document).mask("正在处理，请稍候...");
	$("#saveForm").submit();
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
	var location = curNode.location;
	location = parseInt(location);
	location++;
	var isParent = curNode.isParent;
	var isParentItem = 0;
	if(isParent){
		isParentItem = 1;
	}
	$.dialog.open(
		basePath+"/admin/member/right/edit.htm?item.parentId="+curNode.id+"&item.location="+location,{
			title : "新增资源标签",
			width : "700px",
			height : "500px",
			lock : true
		}
	);
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
	if(curNode.id == "0"){
		$.dialog.alert("根节点不能修改");
		return;
	}
	$.dialog.open(basePath+"/admin/member/right/edit.htm?item.id="+curNode.id,{
			title : "修改资源标签",
			width : "700px",
			height : "500px",
			lock : true
		}
	);
}
/**
 * tree远程请求的地址
 * @param treeId
 * @param treeNode
 * @returns
 */
function treeLoadUrl(treeId, treeNode) {
	
	return treeNode == null
			? basePath+"/admin/member/right/listRightByTree.htm?pid=0"
			: basePath+"/admin/member/right/listRightByTree.htm?pid="+treeNode.id;
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
 * 点击zTree查询
 * @param event
 * @param treeId
 * @param treeNode
 */
function OnClick(event, treeId, treeNode) {
	$("#name").val(treeNode.name);
	$.post('admin/member/right/getRightById?id='+treeNode.id,
		function(date){
			reloadTree();
		}
	);
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
 * 重新加载
 */
function reloadTree() {
	hideRMenu();
	zTree.reAsyncChildNodes(null, "refresh");
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
 * 鼠标放下事件
 * @param event
 */
function onBodyMouseDown(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}

/**
 * 新增父级节点
 */
function addParent(){
	$.dialog.open(basePath+"/admin/member/right/edit.htm?item.parentId=0&item.location=1",{
		title : "新增资源标签",
		width : "700px",
		height : "500px",
		lock : true
	});
}
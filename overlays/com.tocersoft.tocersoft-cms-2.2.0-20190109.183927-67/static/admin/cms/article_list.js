var zTree, rMenu, curNode, categoryId;
$(document).ready(function(){
	var gh = $(window).height() - 95;
	$("#treeDiv").css("height",$(window).height());
	
	//返回的值
	var channelId = $('#channelId').val();
	
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath+'/admin/cms/article/searchArticleList.htm?m='+Math.random(),
	    datatype:"json",
	    mtype:'post',
	    colNames:[/*'操作',*/'排序','文章名称','栏目名称','发布时间','是否发布','是否推荐','栏目ID'],
		colModel:[
			/*{name:"id",index:"id",width:50,formatter:optFormater}, */
			{name:'sort',index:'sort', width:30, align:'center'},
			{name:'name',index:'name', width:160,formatter:nameFormater},
			{name:"channelName",index:'channelName',width:90},
			{name:'publishDate',index:'publishDate',width:70, align:'center'},
			{name:'isPublish',index:'isPublish',width:50, align:'center',formatter:isPublishFormater},
			{name:'isRecommend',index:'isRecommend',width:60, align:'center',formatter:isRecommendFormater},
			{name:'channelId',index:'channelId',hidden:true}
		],
		loadComplete: function(data){
			resizeWidth();
	   	},
	   	postData:{"condition.channelId":channelId},
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
  	$('#table_name').css('text-align','left');
  	$('#jqgh_table_isRecommend').css('text-align','center');
  	$('#jqgh_table_isPublish').css('text-align','center');
  	$('#jqgh_table_sort').css('text-align','center');
  	$('#jqgh_table_publishDate').css('text-align','center');
  	
  	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
		resizeWidth();
	}
	
		  
	resizeWidth();
	
	// 生成Ztree
	var setting = {
		async : {
			enable : true,
			url : treeLoadUrl,
			autoParam : ["id", "name", "isDelete","level","state","isParent"],
			dataFilter : parseRoleTreeDataFilter
		},
		callback : {
			onRightClick: OnRightClick,
			onClick: onClickTree,
			onAsyncSuccess: backSelectedTreeNode//返回选中节点
		},
		view : {
		},
		check : {
			enable : false,
			chkStyle : "checkbox"
		}
	};
	$.fn.zTree.init($("#categoryTree"), setting);
	zTree = $.fn.zTree.getZTreeObj("categoryTree");
	rMenu = $("#rMenu");
	
	function parseRoleTreeDataFilter(treeId,parentNode,responseData){
		var treeData =responseData.data;
		return treeData;
	}
	
    //异步表单提交设置
    $('#articleForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
     		$("#itemName").val("");
     		$("#channelName").val("");
     		$("#itemContent").val("");
     		$("#itemId").val("");
        	$.dialog.alert(data.message);
        	reloadGrid();
        }
    });
    
    //验证框架信息
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	
	$("#itemName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"文章标题不能为空",onErrorMax:"文章标题长度过长"});
	$("#channelName").formValidator().inputValidator({min:1,onError: "请选择栏目名称"}).defaultPassed();
	$("#itemContent").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"内容不能为空"});

	$("#delArticle").click(delArticle);
	
	$('#unPublish').click(unPublish);
	$('#publish').click(publish);
	
	$('#unRecommend').click(unRecommend);
	$('#recommend').click(recommend);

	
	// 打开新增文章的页面
	$('#addArticle').on('click',function(){
		if(curNode == undefined){
			$.dialog.alert("请选择栏目！");
			return;
		}else{
			//获取选中树节点
			var node = zTree.getSelectedNodes();
			var treeNodeId;
			if(node.length > 0){
				treeNodeId = node[0].id;
			}
			
			var cid = $('#channelId').val();
			var tv = {};
			tv.text="新增文章";
			tv.url = "admin/cms/article/to_add.htm?item.channelId=" + cid + "&treeNodeId=" + treeNodeId;
			tv.tabId = "cms_article_add";
			tv.doc = parent.document;
			showTab(tv);
		}
	});
	
	$('#channel').on('change',function(){
		searchArticleList();
	});
	
	$('#refresh').on('click',function(){
		reloadGrid();
	});
	$('#isPublish').change(function(){
		var isPublish = $(this).val();
		$('#table').setGridParam({
			mtype:'post',
			postData:{'condition.isPublish':isPublish}
		}).trigger('reloadGrid',[{page:1}]);
	});
	
	// 新增栏目
	$("#addNodeBtn").on('click',function(){
		hideRMenu();

		if(curNode == undefined){
			$.dialog.alert("请选择栏目！");
			return;
		}
		$.dialog.open(basePath+"/admin/cms/channel/toAddCategory.htm?parentId="+curNode.id,{
			title:'添加栏目',
            width:'100%',
            height:'100%',
			lock:true
		});
	});
	
	// 修改栏目editNodeBtn
	$("#editNodeBtn").on('click',function(){
		hideRMenu();
		if(curNode == undefined){
			$.dialog.alert("请选择栏目！");
			return;
		}
		$.dialog.open(basePath+"/admin/cms/channel/toUpdateCmsChannel.htm?nodeid="+curNode.id,{
			title:'修改栏目',
			width:'100%',
			height:'100%',
			lock:true
		});
	});
	
	// 删除栏目
	$("#selNodeDelete").on('click',function(){
		hideRMenu();
		if(curNode == undefined){
			$.dialog.alert("请选择栏目！");
			return;
		}
		if(curNode.state == 1){
			$.dialog.alert("此类别为系统类别，不可删除");
			return;
		}
		if(curNode.isDelete == 1){
			$.dialog.alert("此类别下有子类别与文章，请先删除下级类别与文章，再删除该类别");
			return;
		}
		$.dialog.confirm("确定要删除此栏目吗？",function(){
			$.post(basePath+"/admin/cms/channel/delCmsChannelById.htm?nodeid="+curNode.id,function(data){
				if(data.status=="success"){
					reloadNodes(curNode.parentId);
				}else{
					$.dialog.alert("删除失败");
				}
			},'json');
		});
	});
	
	// 刷新栏目
	$("#selNodeRefresh").on('click',function(){
		hideRMenu();
		if(curNode == undefined){
			$.dialog.alert("请选择栏目！");
			return;
		}
		reloadNodes(curNode.id);
		
	});
	
	//左右拖拽
	var divsp = new Separator(document.getElementById("categoryTreeDiv"),document.getElementById("categoryContentDiv"),separatorCallbackFN,SP_LEFTRIGHT,4); 
	$(window).resize(function(){
		resizeWidth();
	});
	
	//页面初始化改变部分元素样式
	$('#treeDiv').css({"height":$(window).height() - 34});
	$('.lrSeparator').css({"height":$(window).height()});
	
});

//返回选中节点
function backSelectedTreeNode(event, treeId, treeNode, msg){
	var treeNodeId = $('#channelId').val();
	if(treeNodeId != undefined && treeNodeId.length > 0){
		var node = zTree.getNodeByParam("id",treeNodeId);
		if(node != undefined){
			zTree.selectNode(node);
			curNode = node;
		}
	}
}

function getNodeById(nodes,id){
	for(var i = 0 ; i < nodes.length; i++){
		if(nodes[i].id == id){
			return nodes[i];
		}else if(nodes[i].children != undefined && nodes[i].children.length > 0){
			return getNodeById(nodes[i].children,id);
		}
	}
}

// 拖拽后回调函数
function separatorCallbackFN(){
	resizeWidth();
}

function hideTipFN(){
	$("#loadTip").hide();
}

function resizeWidth(){
	var ww = $(window).width();
	var tw = document.getElementById("categoryTreeDiv").offsetWidth;
	var cw = ww-tw;
	$("#categoryContentDiv").width(cw);
	$("#table").setGridWidth(cw);
	$('.category-box').css('padding-left',tw)
}

// 加载tree
function treeLoadUrl(treeId, treeNode) {
	return treeNode == null ? basePath+"/admin/cms/channel/list_channel.htm" : basePath+"/admin/cms/channel/list_channel.htm?parentId="+treeNode.id;
}

//zTree点击事件		
function onClickTree(e, treeId, treeNode) {
	curNode = treeNode;
	//返回文章列表进行的操作----如果treeNodeId存在则中断事件查询动作，并清空
	if($('#treeNodeId').val() != null && $('#treeNodeId').val() != ""){
		$('#treeNodeId').val("");
		return false;
	}
	$('#channelChoose').val(treeNode.name);
	$("#AllChannelId").val(treeNode.id);
	$("#channelId").val(treeNode.id);
	searchArticleList();
	hideRMenu();
		
}

// tree右键事件
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

// 显示右键菜单
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

/** 重新加载 * */
function reloadTree(){
	hideRMenu();
	zTree.reAsyncChildNodes(null, "refresh");
}

/** 刷新指定节点 */
function reloadNodes(id){
	hideRMenu();
	var node = zTree.getNodeByParam('id', id);
	if(node.isParent == 0){
		pNode = zTree.getNodeByParam('id',node.parentId);
		zTree.reAsyncChildNodes(pNode, 'refresh');
	}else{
		if (node != null) {
			if (node.open) {
				zTree.reAsyncChildNodes(node, 'refresh');
			} else {
				zTree.expandNode(node);
			}
		}
	}
}

/** 隐藏右键菜单 */
function hideRMenu() {
	if (rMenu)
		rMenu.css({
					"visibility" : "hidden"
				});
	$("body").unbind("mousedown", onBodyMouseDown);
}

// 隐藏菜单
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}

function onBodyMouseDown(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}

//格式化操作单元格
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' title='查看\修改' class='no_unl' onclick=\"updateFN('"+rowObject.id+"');return false;\">查看/修改</a>";
	btns.push(updateBtn);
	return btns.join(" ");
}
//格式化操作单元格()
function nameFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' title='查看\修改' class='no_unl' onclick=\"updateFN('"+rowObject.id+"');return false;\">"+cellvalue+"</a>";
	btns.push(updateBtn);
	return btns.join(" ");
}
function isPublishFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return '<span class="status-red-f12">不发布</span>';
	}else if(cellvalue == 1){
		return '<span class="stauts-green-f12">已发布</span>';
	}else{
		return '<span class="status-gray-f12">未知</span>';
	}
}

function isRecommendFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return '<span class="status-red-f12">不推荐</span>';
	}else if(cellvalue == 1){
		return '<span class="stauts-green-f12">已推荐</span>';
	}else{
		return '<span class="status-gray-f12">不推荐</span>';
	}
}

//修改
function updateFN(id){
	var tv = {};
	tv.text="修改文章";
	tv.url = "admin/cms/article/to_update.htm?item.id=" + id;
	tv.tabId = "cms_article_update_" + id;
	tv.doc = parent.document;
	showTab(tv);
}

//查询
function searchArticleList(){
	//var channelChoose = $("#channelChoose").val();
	//if(null==channelChoose||''==channelChoose){
		//$("#channelId").val("");
	//}
	var arr = $("#searchForm").serializeArray();
	var postData = {'condition.channelId' : $("#channelId").val()};
	for(var i=0;i<arr.length;i++){
		var entry = arr[i];
		postData[entry["name"]]=entry["value"];
	}
	$('#table').setGridParam({
		mtype:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}

//批量删除
function delArticle(){
	//确认提示
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请选择要删除的数据");
		return ;
	}
	$.dialog.confirm("确认要删除此项数据吗？",function(){
        $.post(basePath+"/admin/cms/article/delArticles.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data) {
			reloadGrid();
		},"json");
	});
}

function unPublish(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请至少选择一篇文章!");
		return ;
	}
	$.post(basePath+"/admin/cms/article/unPublishAll.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
		reloadGrid();
	},"json");
}

function publish(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请至少选择一篇文章!");
		return ;
	}
	$.post(basePath+"/admin/cms/article/publishAll.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
		reloadGrid();
	},"json");
}

function unRecommend(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请至少选择一篇文章!");
		return ;
	}
	$.post(basePath+"/admin/cms/article/recommendAll.htm?m="+Math.random(),{"selIds":selIds.join(","),"condition.isRecommend":0},function(data){
		reloadGrid();
	},"json");
}

function recommend(){
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){
		$.dialog.alert("请至少选择一篇文章!");
		return ;
	}
	$.post(basePath+"/admin/cms/article/recommendAll.htm?m="+Math.random(),{"selIds":selIds.join(","),"condition.isRecommend":1},function(data){
		reloadGrid();
	},"json");
}

//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}
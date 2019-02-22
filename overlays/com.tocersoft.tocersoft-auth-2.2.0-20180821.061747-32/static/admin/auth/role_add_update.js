var zTree, curNode, pid, isCheck;
$(document).ready(function(){
	
	var setting = {
		view: {
			dblClickExpand: false,//去除双击展开
			showLine: true,//展示树形左侧连接线
			selectedMulti: false//非多选
		},
		check: {
			enable: true//显示checkbox 
		},
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: ""
			}
		},
		callback: {
			onCheck: zTreeOnCheck
		}
	};
	var itemId=$('#itemId').val();
	var rightUrl=basePath + "/admin/auth/right/list_right_all.htm?roleId="+itemId;
	$.get(rightUrl,function(data){
		if(data){
			//初始化各个树形
			var treeContent = $('#rightContent');
			$('.rbc-item a').each(function(i,n){
				var id=$(this).attr('data');	
				var treeContainer=$('<div />');
				treeContainer.addClass('treeContainer');
				treeContainer.hide();
				var tree=$('<ul />');
				var treeId='children-'+id;
				tree.attr('id',treeId);
				tree.addClass("ztree"); 
				treeContainer.append(tree);
				treeContent.append(treeContainer);
				var treeNode=[];
				//获得子集
				$.each(data,function(i,n){
					if(n.pid==id){
						treeNode.push(n);
						for(var j=0;j<data.length;j++){
							if(n.id==data[j].pid){
								treeNode.push(data[j]);
							}
						}
					}
				});
				//初始化树
				var zTree=$.fn.zTree.init(tree, setting,treeNode);
				if(id!=4){
					zTreeOnCheck(null,treeId,null);
				}
				if(id==4){
					//禁用 用户帐号权限的选择
					var allNodes=zTree.getNodes();
					for (var i=0, l=allNodes.length; i < l; i++) {
						zTree.checkNode(allNodes[i], true, true);
						zTree.setChkDisabled(allNodes[i], true);
					}
				}
				
			});
			//激活第一个选项
			$($('.rbc-item-a')[0]).click();
		}
	});
	//左侧顶级权限 点击显示对应子权限
	$('.rbc-item-a').click(function(){
		var id=$(this).attr('data');	
		$(".treeContainer").hide();
		var treeId='children-'+id;
		$('#'+treeId).parent().show();
	});
	//全选、反选
	$('.rbc-item-a .button').click(function(){
		var $this=$(this);
		var checkedAll=false;
		if($this.hasClass('checkbox_false_full')){
			checkedAll=true;
		}
		var id=$(this).parent().attr('data');	
		var treeId='children-'+id;
		var zTree = $.fn.zTree.getZTreeObj(treeId);
		zTree.checkAllNodes(checkedAll);
	});
	
	//验证框架信息
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#name").formValidator({validatorGroup:1,onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:1,max:255,onErrorMin:"角色名称不能为空",onErrorMax:"角色名称长度过长"});
	/**
	.ajaxValidator({
		dataType : "html",
		type:'POST',
		async : true,
		url : "admin/auth/role/judgeNameExist.htm?item.id="+itemId,
		data:{
			"item.name":function(){
				return $("#name").val();
			}
		},
		success : function(data){
			return data == "true";
		},
		buttons: $("#saveNewRoleBtn"),
		error: function(jqXHR, textStatus, errorThrown){alert("服务器没有返回数据，可能服务器忙，请重试"+errorThrown);},
		onError : "角色已存在。",
		onWait : "正在校验，请稍候..."
	});*/
	
	//异步表单提交设置
    $('#roleForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	if(data.status = 'success'){
        		$('#itemId').val(data.message);
        		$.dialog.alert('保存成功');
        	}else if(data.status = 'error'){
        		$.dialog.alert('保存失败');
        	}
        }
    });
	
});
//单个节点选中 或 取消选中
function zTreeOnCheck(event, treeId, treeNode) {
	var parentTid=treeId.split('-')[1];
	var span;
	$(".rbc-item-a").each(function(i,n){
		if($(n).attr('data')==parentTid){
			span = $(n).children('.button');
			span.attr('class','');
			span.addClass('button');
			span.addClass('chk');
			var ztreeContainer=$('#'+treeId).parent();
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			var chkNodes= zTree.getCheckedNodes(true);
			var unchkNodes= zTree.getCheckedNodes(false);
			if(chkNodes.length==0){
				span.addClass('checkbox_false_full');
			}else if(unchkNodes.length==0){
				span.addClass('checkbox_true_full');
			}else{
				span.addClass('checkbox_true_part');
			}
		}	
	});
};
/**
 * 保存新角色
 */
function saveNewRole(){
	var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
	if(!result){
		return;
	}
	var ids=[];
	$('.rbc-item-a .button').each(function(i,n){
		var $this=$(this);
		if($this.hasClass('checkbox_true_full')||$this.hasClass('checkbox_true_part')||$this.hasClass('checkbox_true_disable')){
			var id=$(this).parent().attr('data');	
			ids.push(id);
		}
	});
	$('.rbc-item-a').each(function(i,n){
		var id=$(this).attr('data');	
		var treeId='children-'+id;
		var zTree = $.fn.zTree.getZTreeObj(treeId);
		var allChkNodes=zTree.getCheckedNodes(true);
		for (var i=0, l=allChkNodes.length; i < l; i++) {
			ids.push(allChkNodes[i].id);
		}
	});
	$("#rightCheckedList").val(ids.join(','));
	$('#roleForm').attr("action",basePath + "/admin/auth/role/doSave.htm");
	$('#roleForm').submit();
}
/** 关闭当前页 */
function closeCurrentTab(event){
	var current = $("#menubar_tabs",parent.document).find("a[class='currenttab']")[0];
	var id = current.id;
	id = id.substring(6,id.length);
	parent.closeTab(id,event);
}

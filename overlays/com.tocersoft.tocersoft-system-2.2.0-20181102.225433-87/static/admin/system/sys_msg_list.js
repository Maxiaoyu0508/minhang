$(document).ready(function(){
	var gh = $(window).height() - 127;
	var type = $("#type").val();
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/sysMsg/listSysMsgByPage.htm?m='+Math.random(),
	    postData:{"type":type},
	    datatype:"json",
	    colNames:['创建时间',"创建人","内容"],
		colModel:[ 
			{name:'createDate',index:'createDate'},
			{name:"createBy",index:'createBy'},
			{name:'content',index:'content'}
		], 
		caption:"系统消息列表",
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
	   	shrikToFit: true,  //是否自适应宽度
	   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
		  
	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
	 	var width = $(window).width()-23;
	 	$("#table").jqGrid('setGridWidth', width);
	}
	
	$('#channelChoose').focus(function(){
		var cityObj = $("#channelChoose");
		var cityOffset = $("#channelChoose").offset();
		$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
	});
	
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
    
	$('#refresh').on('onclick',function(){
		reloadGrid();
	});
	
});

//格式化操作单元格
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var detailBtn = "<a href='javascript:;' title='详细' class='no_unl' onclick=\"toDetail('"+rowObject.id+"');return false;\">详细</a>";
	var modifyBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"toModify('"+rowObject.id+"');return false;\">详细/修改</a>";
	var updateState = "<a href='javascript:;' title='启用/禁用' class='no_unl' onclick=\"changeStateFN('"+rowObject.id+"');return false;\">启用/禁用</a>";
	var deleteBtn = "<a href='javascript:;' title='删除' class='no_unl' onclick=\"toDelete('"+rowObject.id+"');return false;\">删除</a>";
	//	var toOpportunity = '<a href="javascript:void(0);" onclick="toOpportunity(\''+cellvalue+'\')">列为商机</a>'
	btns.push(modifyBtn,updateState,deleteBtn);
//	btns.push(toOpportunity);
	return btns.join("&nbsp ");
}


function ifNull(cellvalue,options,rowObject){
	if(cellvalue == null){
		return '--';
	}else{
		return cellvalue;
	}
}

function add(){
	var tv = {};
	tv.text = '新增系统消息';
	tv.url = 'admin/sysMsg/edit.htm';
	tv.tabId = "tabli_add_member";
	tv.doc = parent.document;
	tv.refresh=true;
	showTab(tv);
}

function changeStateFN(id){
	$.post('admin/sysMsg/saveSysMsg.htm',{'selIds':id},function(data){
		if(data.status == "success"){
			reloadGrid();
			$.dialog({
				title : '保存成功',
				content : '保存成功',
				icon:'face-smile',
				okVal : "确定",
				ok:function(){
				}
			})
		}else if(data.status == "error"){
			$.dialog.alert(data.message)
		}else{
			$.dialog.alert("保存失败")
		}
	})
}

//查看详情
function toDetail(id){
	var tv = {};
	tv.text="会员详细";
	tv.url = "admin/member/detail.htm?item.id=" + id;
	tv.tabId = "member_detail_" + id;
	tv.doc = parent.document;
	showTab(tv);
}

//修改会员
function toModify(id){
	var tv={};
	tv.text="修改会员";
	tv.url="admin/member/update.htm?item.id=" + id;
	tv.tabId="member_detail_"+id;
	tv.doc=parent.document;
	showTab(tv);
}

function toDelete(){
	var id = $("#table").jqGrid('getGridParam','selarrrow'); 
	if(id==""){
		$.dialog.tips("请选择要删除的信息!");
		return;
	}
	// 确认提示
	var dialog = $.dialog({
				title : '确认删除选中的信息吗，发送给用户的也会删除？',
				content : '确认要删除吗？',
				okVal : "删除",
				cancelVal : "取消",
				lock:true,
				ok : function() {
					$.post(basePath+"/admin/sysMsg/del.htm?selIds=" + id+"", function(data) {
						reloadGrid();
					});
				},
				cancel : function() {
					this.close();
				}
			});
}

//查询
function searchArticleList(){
	var postData = {"condition.content":$("#searchKey").val()};
	$('#table').setGridParam({
		mtype:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}

//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}


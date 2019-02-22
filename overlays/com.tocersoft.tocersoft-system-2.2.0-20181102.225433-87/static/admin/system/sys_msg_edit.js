$(document).ready(function(){
	var gh = $(window).height() - 127;
	var type = $("#type").val();
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath + '/admin/member/listMemberByPage.htm?m='+Math.random(),
	    postData:{"type":type},
	    datatype:"json",
	    colNames:['操作','状态','注册时间','会员姓名','会员等级','性别','手机号码','电子邮件','已参加的活动'],
		colModel:[ 
			{name:"id",index:"id",width:80,formatter:optFormater}, 
			{name:"state",index:"id",width:30,formatter:function(c,o,r){
				if(c == '0'){
					return '<span class="status-green">启用</span>'; 
				}else{
					return '<span class="status-red">禁用</span>'; 
				}
			}},
			{name:'createDate',index:'createDate', width:50,formatter:ellipsis},
			{name:"name",index:'name',width:60},
			{name:"level",index:'C_LEVEL',width:60,sortable: true},
			{name:"sex",index:'sex',width:30,formatter:sexFormater},
			{name:"mobile",index:'mobile',width:60},
			{name:'email',index:'email',width:100},
			{name:'enrollCount',index:'enrollCount',width:50,formatter:enrollCond}
		], 
		caption:"网站会员列表",
		loadComplete: function(data){
			var width = $(window).width()-23;
			$(this).setGridWidth(width);
	   	},
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

function sexFormater(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return "女";
	}else if(cellvalue == 1){
		return "男";
	}else{
		return "--";
	}
}

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

function ifFormater(cellvalue,options,rowObject){
	if(cellvalue == 2 || cellvalue == null){
		return '<span class="status-red">否</span>';
	}else{
		return '<span class="status-green">是</span>';
	}
}

function wayFormater(cellvalue,options,rowObject){
	if(cellvalue == 1){
		return '<span class="status-green">电子邮箱</span>';
	}else if(cellvalue == 2){
		return '<span class="status-green">手机号码</span>';
	}else{
		return '<span class="status-gray">--</span>';
	}
}

function ifNull(cellvalue,options,rowObject){
	if(cellvalue == null){
		return '--';
	}else{
		return cellvalue;
	}
}
function ellipsis(cellvalue,options,rowObject){
	return '<div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block; ">'+cellvalue+'</div>'
}
function isReply(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return '<span class="status-red">未回复</span>';
	}else if(cellvalue == 1){
		return '<span class="status-green">已回复</span>';
	}else{
		return '<span class="status-gray">未知</span>';
	}
}

function enrollCond(c,o,r){
	if(c == null || c == 'undefined'){
		c = 0;
	}
	var toEnrollVisit = '<a href="javascript:;" onclick="toEnrollVisit(\''+r.id+'\')">'+c+'场</a>'
	return toEnrollVisit;
}

function add(status){
	var id = $("#table").jqGrid('getGridParam','selarrrow'); 
	var content = $("#content").val();
	if(content==""){
		$.dialog.tips("请输入要发送的信息!");
		return;
	}
	//选中发送
	if(status==0){
		//检查是否选中id
		if(id==""){
			$.dialog.tips("请选择要发送的会员!");
			return;
		}
		$.post(basePath+"/admin/sysMsg/saveSysMsg.htm",{"memberIds":""+id,"status":0,"item.content":content},function(data){
      $.dialog.alert(data.message);
		});
	}
	//全部发送
	if(status==1){
		// 确认提示
		var dialog = $.dialog({
					title : '确认全部发送吗',
					content : '确认要全部发送吗？',
					okVal : "发送",
					cancelVal : "取消",
					lock:true,
					ok : function() {
						//检查是否选中id
						$.post(basePath+"/admin/sysMsg/saveSysMsg.htm",{"status":1,"item.content":content},function(data){
              $.dialog.alert(data.message);
						});
					},
					cancel : function() {
						this.close();
					}
				});
	}

}

function changeStateFN(id){
	$.post('admin/member/changeState.htm',{'selIds':id},function(data){
		if(data.status == "success"){
			reloadGrid();
			$.dialog({
				title : '发送成功',
				content : '发送成功',
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

function toDelete(id){
	// 确认提示
	var dialog = $.dialog({
				title : '确认删除',
				content : '确认要删除吗？',
				okVal : "删除",
				cancelVal : "取消",
				lock:true,
				ok : function() {
					$.post(basePath+"/admin/member/del.htm?selIds=" + id, function(data) {
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
	var postData = {
			"condition.key":$("#searchKey").val(),
			"condition.level":$("#level").val()
			};
	$('#table').setGridParam({
		mtype:'post',
		postData:postData
	}).trigger('reloadGrid',[{page:1}]);
}

//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}


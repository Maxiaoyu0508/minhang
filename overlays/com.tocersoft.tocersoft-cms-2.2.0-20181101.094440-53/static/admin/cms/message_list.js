$(document).ready(function(){
	//渲染表格骨架
	$("#table").jqGrid({
	    url:basePath+'/admin/cms/message/listMessageByPage.htm?m='+Math.random(),
	    datatype:"json",
	    colNames:['操作','留言内容','留言分类ID','留言分类','相关内容','留言人/留言时间','留言时间','状态','处理人/处理时间','处理内容','处理时间',''],
		colModel:[ 		          
			{name:"id",index:"id",width:40,formatter:optFormater}, 
			{name:'content',index:'sort', width:150,align:'left',formatter:ellipsis},
			{name:'messageType',index:'messageType',width:50,hidden:true},
			{name:'messageTypeName',index:'messageTypeName',width:50},
			{name:'related',index:'related',width:130,align:'left',formatter:relatedFormater},
			{name:'createName',index:'createName',width:70,formatter:nameFormater},
			{name:"createDate",index:'createDate',width:70,hidden:true},
			{name:'status',index:'status',width:30,formatter:isReply},
			{name:'replyName',index:'replyName',width:70,formatter:replyFormater},
			{name:'replyContent',index:'replyContent',width:130,align:'left'},
			{name:"replyDate",index:'replyDate',width:70,hidden:true},
			{name:'replyId',index:'replyId',width:120,hidden:true},
		], 
		caption:"站内信列表",
		loadComplete: function(data){
			var width = $(window).width()-10;
			$(this).setGridWidth(width);
			fillEmptyRow('table',data);
	   	},
		jsonReader:{id: "id",root:"resultList"}
  	});
  	$("#table").jqGrid("navGrid","#pagerBar");
  	$('#table_content').css('text-align','left');
  	$('#table_related').css('text-align','left');
  	$('#table_replyContent').css('text-align','left');
  	
		  
	// 随窗体大小改变而改变Grid宽度
	window.onresize = function _doResize(){
	 	var width = $(window).width()-10;
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

function relatedFormater(cellvalue,options,rowObject){
	if(rowObject.mobile!=null&&rowObject.mobile!=''){
		return "手机号："+rowObject.mobile;
	}else if(rowObject.productNo!=null&&rowObject.productNo!=''){
		return "商品编号："+rowObject.productNo;
	}else if(rowObject.orderNo!=null&&rowObject.orderNo!=''){
		return "订单编号："+rowObject.orderNo;
	}else{
		return "--";
	}
}

//格式化操作单元格
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	if(rowObject.status==0&&rowObject.messageTypeName!='预约设计'){
		var replyBtn = "<a href='javascript:;' title='回复' class='no_unl' onclick=\"toReply('"+rowObject.id+"');return false;\">回复</a>";
		btns.push(replyBtn);
	}
	if(rowObject.status==0 && rowObject.messageTypeName == '预约设计'){
		var status="<a href='javascript:;' title='处理' class='no_unl' onclick=\"toStatus('"+rowObject.id+"');return false;\">处理</a>"
		btns.push(status);
	}
	var showBtn = "<a href='javascript:;' title='查看' class='no_unl' onclick=\"toDetail('"+rowObject.id+"');return false;\">查看</a>";
	btns.push(showBtn);
	return btns.join(" ");
}

function nameFormater(cellvalue,options,rowObject){
	var name = '<p>'+cellvalue+'</p>';
	var time = '<p>'+rowObject.createDate+'</p>';
	return name + time;
}

function replyFormater(cellvalue,options,rowObject){
	var name = '<p>'+cellvalue+'</p>';
	if(cellvalue == '' || cellvalue == null){
		name = '<p class="status-gray">--</p>';
	}
	var time = '<p>'+rowObject.replyDate+'</p>';
	if(rowObject.replyDate == '' || rowObject.replyDate == null){
		time = '<p class="status-gray">--</p>';
	}
	return name + time;
}


function ifNull(cellvalue,options,rowObject){
	if(cellvalue == null){
		return '--';
	}else{
		return cellvalue.substring(0,10);
	}
}
function ellipsis(cellvalue,options,rowObject){
	return '<div style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block; ">'+cellvalue+'</div>'
}
function isReply(cellvalue,options,rowObject){
	if(cellvalue == 0){
		return '<span class="status-red">未处理</span>';
	}else if(cellvalue == 1){
		return '<span class="status-green">已处理</span>';
	}else{
		return '<span class="status-gray">未知</span>';
	}
}

//查看详情
function toDetail(id){
	var tv = {};
	tv.text="查看信件";
	tv.url = "admin/cms/message/toDetail.htm?item.id=" + id;
	tv.tabId = "cms_message_detail_" + id;
	tv.doc = parent.document;
	showTab(tv);
}
//回复
function toReply(id){
	var tv = {};
	tv.text="回复信件";
	tv.url = "admin/cms/message/toReply.htm?item.id=" + id;
	tv.tabId = "cms_message_reply_" + id;
	tv.doc = parent.document;
	showTab(tv);
}
//状态的更改
function toStatus(id){
	//进行post提交
	$.post(basePath+"/admin/cms/message/toStatus.htm",{'item.id':id},function(data){
		if(data.status == 'success'){
			reloadGrid();
		}else{
			$.dialog.alert(data.message);
		}
	});
}
//查询
function searchMessageList(){
	var arr = $("#searchForm").serializeArray();
	var postData = {};
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
function delMessage(){
	//确认提示
	var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
	if(selIds == null || selIds.length == 0){
		$.dialog.alert("请选择要删除的数据。");
		return;
	}
	$.dialog.confirm("确认要删除此项数据吗？",function(){
		$.post(basePath+"/admin/cms/message/doDel.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			if(data.status=='success'){
				$.dialog.alert('删除成功');
				reloadGrid();
			}else{
				$.dialog.alert('删除失败');
			}
		});
	});
}

//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}
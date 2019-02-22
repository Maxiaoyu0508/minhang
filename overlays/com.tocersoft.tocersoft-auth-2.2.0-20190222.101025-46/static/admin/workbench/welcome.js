$(document).ready(function(){
	init();
});
function init(){
	resizeMiddle();
	initTask();
	initReport();
	$(window).resize(function(){
		resizeMiddle();
	});
	
	$(".J-menu-fast").live("click",function(){
		var tv = {};
		tv.text = $(this).html();
		tv.url = $(this).attr("url");
		tv.tabId = $(this).html();
		tv.doc = parent.document;
		showTab(tv);
	});
}
//初始加载我的任务
function initTask(){
	$.post("admin/task/task_list.htm?condition.state=0",function(data){
		$("#tasklist").html(data);
	});
}
//初始加载我得档期
function initReport(){
	$.post("admin/report/daily/rept_listByUserDate.htm",function(data){
		$("#workList").html(data);
	});
}
//加载已经完成的任务
function initTaskOK(){
	var tv = {};
	tv.text="已完成任务";
	tv.url = "admin/task/listTaskOK.htm";
	tv.tabId = "tabli_listtask_doquery";
	tv.doc = parent.document;
	showTab(tv);
}
//调高优先级
function taskPriority(id){
	$.post('admin/task/taskPriority.htm?condition.id='+id,function(data){
		$("#tasklist").html(data);
	});
}
function resizeMiddle(){
	var ww = $(window).width();
	var lw = $('#indexLeft').width();
	var rw = $('#indexRight').width();
	var mw = ww - lw - rw - 50;
	$('#indexMiddle').width(mw);
	$('.j-content-middle').width(mw-155);
}
//查看单个任务信息
function doquery(id){
	var tv = {};
	tv.text="任务信息";
	tv.url = "admin/task/infoTask.htm?item.id="+id;
	tv.tabId = "tabli_information_doquery_"+id;
	tv.doc = parent.document;
	showTab(tv);
}
/*
 *新增档期
 * 弹出新增档期的对话框
 */
function toAdd(){
	$.dialog.open("admin/report/daily/add.htm?call=1",{
		id:'toAddReportDialy',
		title:'新增工作日报',
		width:'900px',
		height:'550px',
		lock:true
	});
}
/**
 * 新增任务
 * 弹出新增任务的对话框
 */
function add(){
	$.dialog.open("admin/task/add.htm",{
		title:"新增任务",
		width:"900px",
		height:"530px",
		lock:true
	});
	
}
//任务反馈
function taskIdea(id){
		$.dialog.open('admin/task/reply/add.htm?item.taskId='+id,{
			title:"任务反馈",
			width:"700px",
			height:"500px",
			lock:true
		});
	}
//修改任务
function upTask(id){
	$.dialog.open('admin/task/update.htm?item.Id='+id,{
		title:"任务反馈",
		width:"700px",
		height:"500px",
		lock:true
	});
}
//删除任务
function delTask(id){

	$.dialog.confirm("是否确认删除？",function(){
		// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
		$("body",parent.document).mask("正在处理，请稍候...");
		$.post("admin/task/del.htm?m="+Math.random(),{"selIds":id},function(data){
			// 回调函数中去除遮罩
			$("body",parent.document).unmask();
			if(data.status == "success"){
				//调用初始的方法
        		initTask();
			}else{
				$.dialog.alert('删除失败');
			}
			reloadGrid();
		});
	});
}
//任务完成
function TaskState(id){
	$.dialog.confirm("是否确认任务已完成？",function(){
		// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
		$("body",parent.document).mask("正在处理，请稍候...");
		$.post("admin/task/upState.htm?m="+Math.random(),{"selIds":id,"condition.state":1},function(data){
			if(data.status == "success"){
				// 回调函数中去除遮罩
				$("body",parent.document).unmask();
				//调用父级的方法
        		var win = $.dialog.open.origin.initTask();
				//刷新
        		win.reloadGrid();
			}else{
				$.dialog.alert('更改失败');
			}	
			reloadGrid();
		});
	});
}
//档期完成
function ReportState(id,state){
	var str="";
	if(state==0){
		str="确定撤销吗？";
	}else{
		str="确定完成吗？";
	}
	$.dialog.confirm(str,function(){
		// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
		$("body",parent.document).mask("正在处理，请稍候...");
		var url="admin/report/daily/upState.htm?m="+Math.random();
		$.post(url,{"selIds":id,"item.state":state,"item.id":id},function(data){
			if(data.status == "success"){
				// 回调函数中去除遮罩
				$("body",parent.document).unmask();
				//调用父级的方法
        		var win = $.dialog.open.origin.initReport();
				//刷新
        		win.reloadGrid();
			}else{
				$.dialog.alert('更改失败');
			}	
			reloadGrid();
		});
	});
}
function operate(id){
	$.post("mainstation/information/information/operate.do",{"id":id},function(data){
		if(data.success){
			//type == 1 机器注册审核  result == 审核通过
			if( data.result && data.type == 1){
				$.dialog({
				    title: '消息',
				    content: '是否直接进行维修开单',
				    okVal:"直接开单",
				    cancelVal:"取消",
				    ok:function(){
				    	createNewMaintainOrder(data);
				    },
				    cancel:function(){
				    	return;
				    }
	    		 });
			}else{
				//机器注册 打回修改
				var tv = {};
				tv.text=data.text;
				tv.url = data.URL;
				tv.tabId = "tabli_update_machine";
				tv.doc = parent.document;
				tv.refresh = true;
				showTab(tv);
			}
			// type 维修单 
			if(data.type == 0){
				var tv = {};
				tv.text=data.text;
				tv.url = data.URL;
				tv.tabId = "tabli_operate_maintainOrder";
				tv.doc = parent.document;
				tv.refresh = true;
				showTab(tv);
			}
		}else{
			$.dialog({content:data.msg,ok: function (){
					return true;					
				},width:'200px'});
		}
	});
}


//直接开单
function createNewMaintainOrder(data){
	var tv = {};
	tv.text="新建开单";
	tv.url = "mainstation/mainservice/maintainreport/toAddMaintainOrder.do?macType="+data.mactype+"&serialNumber="+data.serialNumber;
	tv.tabId = "tabli_maintainOrder_create";
	tv.doc = parent.document;
	tv.refresh = true;
	showTab(tv);
}

function moreInfo(type){
	var tv = {};
	if(type == "toList"){
		tv.text="维修站通知";
	}
	if(type == "doList"){
		tv.text="政策信息";
	}
	if(type == "getList"){
		tv.text="技术通告";
	}
	if(type == "download"){
		tv.text="下载中心";
	}
	tv.url = "mainstation/information/information/"+type+".do?m="+ Math.random();
	tv.doc = parent.document;
	showTab(tv);
}

//查看更多私信
function moreInfo(){
	var tv = {};
	tv.text="我的消息";
	tv.url = "admin/info/user/index.htm";
	tv.tabId = "tabli_my_info_";
	tv.doc = parent.document;
	tv.refresh=true;
	showTab(tv);
}

//查看公告
function viewPublicNotice(id){
	var tv = {};
	tv.text="系统公告";
	tv.url = "admin/info/infomation/viewPublicNotice.htm?item.id="+id;
	tv.tabId = "tabli_public_notice_"+id;
	tv.doc = parent.document;
	tv.refresh=true;
	showTab(tv);
}

function toViewMyNotice(id){
	var tv = {};
	tv.text="查看我的通知";
	tv.url = "admin/info/user/toDetail.htm?m="+Math.random()+"&item.id="+id;
	tv.tabId = "tabli_detail_"+id;
	tv.doc = parent.document;
	tv.refresh=true;
	showTab(tv);
}

function viewWorkList(){
	var tv = {};
	tv.text="查看档期";
	tv.url = "admin/report/daily/index.htm?m="+Math.random();
	tv.tabId = "tabli_view_work";
	tv.doc = parent.document;
	tv.refresh=true;
	showTab(tv);
}

//修改
function updateFN(id){
	$.dialog.open('admin/report/daily/update.htm?call=1&m='+Math.random()+'&item.id='+id,{
		id:'toAddReportDialy',
		title:'修改工作日报',
		width:'900px',
		height:'570px',
		lock:true
	});
}
//删除任务
function removeFN(id){
	$.dialog.confirm("是否确认删除？",function(){
		// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
		$("body",parent.document).mask("正在处理，请稍候...");
		var url ="admin/report/daily/del.htm?m="+Math.random();
		$.post(url,{"selIds":id},function(data){
			// 回调函数中去除遮罩
			$("body",parent.document).unmask();
			if(data.status == "success"){
				//调用初始的方法
        		initReport();
			}else{
				$.dialog.alert('删除失败');
			}
			reloadGrid();
		});
	});
}
function reloadGrid(){}
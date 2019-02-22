$(document).ready(function(){
	// 构造表格
	buildGrid();
    // 验证框架信息
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#searchKey").formValidator({validatorGroup:1,onShowText:'请输入员工姓名',onShow:'',onFocus:'',onCorrect:''}).inputValidator({min:0,max:255,onErrorMax:"关键词长度过长"});
	
	// 重新选择年月
	$('#reChooseMonth').live('click',function(){
		$('#year').removeAttr('disabled');
		$('#month').removeAttr('disabled');
		$('#reChooseMonth').hide();
		$('#reBuildGrid').show();
	});
	
	// 重新生成考勤表
	$('#reBuildGrid').live('click',function(){
		$('#reBuildGrid').hide();
		$('#reChooseMonth').show();
		$('#year').attr('disabled','disabled');
		$('#month').attr('disabled','disabled');
		buildGrid();
	});
	
});

// 重新构造列表 - 根据年月动态渲染列
function buildGrid(){
	
	var year = $('#year').val();
	var month = $('#month').val();
	
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",top.document).mask("正在构造列表，请稍候...");
	$.post('admin/hradm/hr/list_date_header.htm',{'year':year,'month':month},function(data){
		
		var colNames = ['','员工姓名'];
		
		var colNamesStr = data.colNames;
		var strArray = colNamesStr.split(",");
		for(var i=0; i<strArray.length; i++){
			colNames.push(strArray[i]);
		}
		colNames.push('');
		
		var colModel = [
			{name:'id',width:40,hidden:true},
			{name:'name',width:60,align:'center',formatter:nameFormater},
		];
		
		var colModelStr = data.colModel;
		var modelStrArray = colModelStr.split(",");
		for(var i=0; i<modelStrArray.length; i++){
			var colModelItem = {};
			colModelItem.name = modelStrArray[i];
			colModelItem.width = 30;
			colModelItem.align = 'center';
			colModelItem.formatter = attendFormater;
			colModel.push(colModelItem);
		}
		colModel.push({name:'blank',width:10,align:'center'});
		
		var gh = $(window).height() - $('#operBar').height() - 91;
		
		// 先将列表卸载掉，为了重新加载
		$('#table').GridUnload();
		$('#table').jqGrid({
			url:'admin/hradm/hr/user_attend_list.htm',
			postData:{'year':year,'month':month},
			colNames:colNames,
			colModel:colModel,
			caption:"员工考勤表 [ " + year + "年" + month + "月份 ]",
			loadComplete: function(data){
				// 回调函数中去除遮罩
   				$("body",parent.document).unmask();
				var width = $(window).width()-23;
				$(this).setGridWidth(width);
				fillEmptyRow('table',data);
		   	},
		   	height:gh,rowNum:100,scroll:true,//一页显示100条，滚动加载
		   	multiselect:false,
		   	rownumbers:true,
			jsonReader:{id:"id",root:"resultList"}
		});
		$('#table').jqGrid('navGrid','#pagerBar');
		
	});
}

function nameFormater(cellvalue,options,rowObject){
	return '<a href="javascript:void(0);" onclick=\'updateFN("'+rowObject.id+'","'+cellvalue+'");return false;\'>'+cellvalue+'</a>';
}

function attendFormater(cellvalue,options,rowObject){
	var info = $.parseJSON(cellvalue);
	var attDate = info.attDate;
	var state = info.attState;
	
	if(state == 0){
		var status = '<a onclick="toDetail(\''+rowObject.id+'\',\''+attDate+'\')" class="attend-sign attend-green" href="javascript:void(0);">正</a>';
	}else if(state == 1){
		var status = '<a onclick="toDetail(\''+rowObject.id+'\',\''+attDate+'\')" class="attend-sign attend-yellow" href="javascript:void(0);">迟</a>';
	}else if(state == 2){
		var status = '<a onclick="toDetail(\''+rowObject.id+'\',\''+attDate+'\')" class="attend-sign attend-orange" href="javascript:void(0);">假</a>';
	}else if(state == 3){
		var status = '<a onclick="toDetail(\''+rowObject.id+'\',\''+attDate+'\')" class="attend-sign attend-gray" href="javascript:void(0);">休</a>';
	}else if(state == 4){
		var status = '<a onclick="toDetail(\''+rowObject.id+'\',\''+attDate+'\')" class="attend-sign attend-purple" href="javascript:void(0);">加</a>';
	}else if(state == null){
		var status = '<a href="javascript:void(0);">无</a>';
	}
	return status;
}

function attendFormater2(cellvalue,options,rowObject){
	return '<span class="attend-sign attend-gray">休</span>';
}

function attendFormater3(cellvalue,options,rowObject){
	return '<a class="attend-sign attend-yellow" href="javascript:void(0);">迟</a>';
}

function attendFormater4(cellvalue,options,rowObject){
	return '<a class="attend-sign attend-orange" href="javascript:void(0);">假</a>';
}

function attendFormater5(cellvalue,options,rowObject){
	var info = $.parseJSON(cellvalue);
	var attDate = info.attDate;
	return '<a onclick="toAddAttend(\'' + rowObject.id + '\',\'' + attDate + '\');return false;" href="javascript:void(0);">登记</a>';
}

function attendFormater6(cellvalue,options,rowObject){
	return 
}

function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' onclick=\"updateFN('"+rowObject.id+"','"+rowObject.name+"');return false;\">修改</a>&nbsp;";
	btns.push(updateBtn);
	if(rowObject.roleType != 1){
		var removeBtn = "<a href='javascript:;' onclick=\"removeFN('"+rowObject.id+"');return false;\">删除</a>&nbsp;"
		btns.push(removeBtn);
	}
	return btns.join(" ");
}

function toAddWeekend(){
	// 遮罩
	$("body",top.document).mask("正在构造列表，请稍候...");
	$.post('admin/hradm/hr/addWeekend.htm',function(data){
		// 去除遮罩
		$("body",top.document).unmask();
		if(data.success){
			$.dialog.alert('添加成功');
		}else{
			$.dialog.alert('添加失败');
		}
	})
}

function toDetail(userId,date){
	$.dialog.open('admin/hradm/hr/toUserDetail.htm?m='+Math.random()+'&item.userId='+userId+'&item.attendDateInt='+date,{
		title:'查看详情',
		width:'500px',
		height:'300px'
	})
}

//重新加载
function reloadGrid(){
	$('#table').trigger('reloadGrid',[{page:1}]);
}

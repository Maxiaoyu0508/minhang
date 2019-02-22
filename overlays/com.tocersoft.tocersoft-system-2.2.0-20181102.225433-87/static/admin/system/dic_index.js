$(document).ready(function(){
	var id = $("#globalDict").val();
	$("#table").jqGrid({
		url:basePath + "/admin/system/dict/searchDictItem.htm?item.id="+id+"&m="+Math.random(),
		colNames:["操作","排序","数值","类型","类型"],
		colModel:[
			{name:"id",index:"id",title:false,width:50,align:"center",sortable:false,formatter:optFormater},
			{name:"sort",index:"sort",title:false,width:50,align:"center",sortable:false,editable:true,editoptions:{size:20}},
			{name:"name",index:"name",title:false,width:120,align:"center",sortable:false,editable:true,editoptions:{size:50}},
			{name:"type",index:"type",title:false,hidden:true},
			{name:"typeString",title:false,index:"typeString",sortable:false,width:100,align:"center"}
		],
		sortname:"sort",
		rowNum:100,
		sortorder:"desc",
		caption:"数据项",
		jsonReader:{id:"id",root:"globalDictItemList"}
	});
	$("#table").jqGrid("navGrid","#pagerBar");
});
function optFormater(cellvalue,options,rowObject){
	var btns = [];
	var updateBtn = "<a href='javascript:;' id='toUpdateBtn_"+rowObject.id+"'   onclick='updateFN("+rowObject.id+",\""+rowObject.name+"\","+rowObject.type+");return false;'title='修改'>修改</a>&nbsp;";
	btns.push(updateBtn);	
	var doUpdateBtn = "<a href='javascript:;' id='doUpdateBtn_"+rowObject.id+"' onclick=\"doUpdate('"+rowObject.id+"');return false;\" style='display:none;' title='保存'>保存</a>";
	btns.push(doUpdateBtn);
	if(rowObject.type != 1){
		var removeBtn = "<a href='javascript:;' id='deleteBtn_"+rowObject.id+"' onclick=\"doDel('"+rowObject.id+"');return false;\" title='删除'>删除</a>&nbsp;";
		btns.push(removeBtn);
	}
	return btns.join(" ");
}

//改变字典
function changeSelect(dictId){
	var id=null;
	if(dictId && dictId.length > 0){
		id = dictId;
	}else{
		id = $('#globalDict').val();
	}
	var url ='admin/system/dict/searchDictItem.do?item.id='+id+'&m='+Math.random();
	$("#table").jqGrid("setGridParam", {
	    url: url,    //设置表格的url  
	    datatype: "json"   //设置数据类型                                                    
 	}).trigger("reloadGrid",[{page:1}]);
}

/** 修改操作 */
function updateFN(id,name,type){
  	$("#table").jqGrid('editRow',id);
	toggleBtn(id,type);
}
/** 按钮显示/隐藏切换 */
function toggleBtn(id,type){
	$('#toUpdateBtn_'+id).toggle();
	$('#doUpdateBtn_'+id).toggle();
	if(type != 1){
		$('#deleteBtn_'+id).toggle();
	}
	
}
/** 执行修改操作 */
function doUpdate(id){
	var name = $('#'+id+'_name').val();
	var sort = parseInt($('#'+id+'_sort').val());
	var globalId = $('#globalDict').val();
	if(null == name || name == ""){
		var dialog = $.dialog({
		title:"提交失败",
		content:"名称不能为空!",
		ok:function(){
		}
		});
		return;
	}
	var reg = /^\d+$/;
	if(!reg.test(sort)){
		var dialog = $.dialog({
		title:"提交失败",
		content:"排序输入错误!",
		ok:function(){
		}
		});
		return;
	}
	var postData = {
		'dictItem.id':id,
		'dictItem.name':name,
		'dictItem.sort':sort,
		'dictItem.globalDict.id':globalId
	}
	$.ajax({
		url:'admin/system/dict/doEdit.do?m='+Math.random(),
		type:'post',
		data:postData,
		success:function(data){
			var msgs = "";
	        var type = "success";
	        if (data == "true") {
	        	refreshGrid("#table");
	            msgs = "保存成功!";
	        }else if(data == "exists"){
	        	msgs = "名称已经存在!";
	        	type = "error"; 
	        }else {
	           msgs = "保存失败!";
	           type = "error";
	        }
	        //提示消息
	        //$.msgbox({time: 5000,msg: msgs,icon:type});
	        $.dialog({content: msgs,okVal:"确定",ok: function(){}});
		},
		error:function(){
			//提示消息
	       // $.msgbox({time: 5000,msg:"保存失败!",icon:"error"});
	       $.dialog({content: '保存失败!',okVal:"确定",ok: function(){}});
		}
	});
}

//删除操作
function doDel(id){
	var dialog = $.dialog({
		title:"删除确认",
		content:"确认要删除此项数据吗？",
		cancel:function(){},
		ok:function(){
			$.ajax({
				url:'admin/system/dict/doDel.do?m='+Math.random(),
				type:'post',
				data:{
					"dictItem.id":id
				},
				success:function(data){
					var msgs = "";
			        var type = "success";
			        if (data == "true") {
			        	refreshGrid("#table");
			            msgs = "删除成功!";
			        }else {
			           msgs = "删除失败!";
			           type = "error";
			        }
			        //提示消息
			        //$.msgbox({time: 5000,msg: msgs,icon:type});
			        $.dialog({content: msgs,okVal:"确定",ok: function(){}});
				},
				error:function(){
					//提示消息
			        //$.msgbox({time: 5000,msg:"删除失败!",icon:"error"});
			        $.dialog({content: '删除失败!',okVal:"确定",ok: function(){}});
				}
			});
		}
		});
}

//批量删除
function doBatchDel(){
	//确认提示
	var dialog = $.dialog({
		follow:document.getElementById("batchDelBtn"),
	    title: '确认删除',
	    content: '确认要进行批量删除吗？',
	    okVal:"删除",
	    cancelVal:"取消",
	    ok: function(){
			var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
			$.post("admin/system/dict/doBatchDel.do?m="+Math.random(),{"selIds":selIds.join("-")},function(data){
				var msgs = "";
	            var type = "success";
	            if (data == "true") {
	            	refreshGrid("#table");
	                msgs = "删除成功!";
	            } else {
	               msgs = "删除失败!";
	               type = "error";
	            }
	            //提示消息
	            //$.msgbox({time: 5000,msg: msgs,icon:type});
	            $.dialog({content: msgs,okVal:"确定",ok: function(){}});
			});
			
	    },
	    cancel:function(){
	    	this.close();
	    }
	});
}

//添加字典
function toAddDict(){
	var dictId = $("#globalDict").val();
	$.dialog.open('admin/system/dict/toAdd.do?item.id='+dictId+'&m='+Math.random(),{
		title:'添加字典',
		width:'700px',
		height:'200px'
	});
}
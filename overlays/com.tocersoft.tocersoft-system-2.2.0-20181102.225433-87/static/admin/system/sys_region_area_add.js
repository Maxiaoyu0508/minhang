$(document).ready(function(){
	//验证框架信息
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	$("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"名称不能为空",onErrorMax:"长度过长"});
	$("#sort").formValidator({empty:true}).regexValidator({regExp:"^[1-9]\\d*$",onError:"排序输入错误，只能为正整数"});


	$('#saveBtn').click(function(){
		var result = $.formValidator.pageIsValid('1');
		if(!result){
			return;
		}
		var regionAreaId = $("#regionAreaId").val();
		$("body",parent.document).mask("保存中....");
		/*if(regionAreaId != null && regionAreaId !=''){
			$.post(basePath+"/admin/system/dict/doUpdate.htm",{
				"areaItem.id":regionAreaId,
				"areaItem.name":$("#name").val(),
				"areaItem.sort":$("#sort").val()
				},function(data){
					if(data.status=="success"){
						$("body",parent.document).unmask();
						var win=$.dialog.open.origin;
						win.reloadDict(data.options);
						$.dialog.close();
					}else{
						$.dialog.alert("保存失败");
					}
				
			},"json");
		}else{*/
			var postData = $("#saveForm").serializeArray();
			$.post(basePath+"/admin/system/region/area/doAdd.htm",postData,function(data){
					if(data.status=="success"){
						$("body",parent.document).unmask();
						var win=$.dialog.open.origin;
						win.refreshGrid();
						$.dialog.close();
					}else{
						$.dialog.alert("保存失败");
					}
				
			},"json");
		/*}*/
	});
	$("#exitBtn").click(function(){
		$.dialog.close();
	});
});
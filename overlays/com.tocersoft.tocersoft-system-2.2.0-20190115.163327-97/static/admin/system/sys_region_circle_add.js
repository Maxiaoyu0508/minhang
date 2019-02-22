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
		var regionCircleId = $("#regionCircleId").val();
		$("body",parent.document).mask("保存中....");
		if(regionCircleId != null && regionCircleId !=''){
			$.post(basePath+"/admin/system/region/circle/doAdd.htm",{
				"item.id":regionCircleId,
				"item.name":$("#name").val(),
				"item.sort":$("#sort").val(),
				"item.regionId":$("#selectCity").val()
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
		}else{
			$("#regionName").val($("#selectCity option:selected").text());
			var postData = $("#saveForm").serializeArray();
			$.post(basePath+"/admin/system/region/circle/doAdd.htm",postData,function(data){
					if(data.status=="success"){
						$("body",parent.document).unmask();
						var win=$.dialog.open.origin;
						win.refreshGrid();
						$.dialog.close();
					}else{
						$.dialog.alert("保存失败");
					}
				
			},"json");
		}
	});
	$("#exitBtn").click(function(){
		$.dialog.close();
	});
	selectCity();
});
/**
 * 选择城市
 */
function selectCity(){
	$("#province").change(function(){
		$("#selectCity").html("");
		if($("#province").val() == 0){
			$("#selectCity").append("<option>-- 请选择城市 -- </option>");
			return;
		}
		var postData = {
			"condition.parentId":$("#province").val()
		};
		$.post(basePath + "/admin/system/region/selectNextLevel.htm",postData,function(data){
			
			$(data.regionList).each(function(){
				$("#selectCity").append("<option value= '" + this.id + "'>"+this.name+"</option>");
			})
		});
	});
	/*$("#regionName").focus(function(){
		$.dialog.open(basePath + "/admin/system/region/circle/selectCity.htm?circleId=" + $("#circleId").val() + "&flag=1",{
			title : "选择城市",
			width : "800px",
			height : "500px",
			lock : true
		});
	});*/
}
/**
 * 设置城市
 * @param id
 * @param name
 */
function setCity(id,name){
	$("#regionId").val(id);
	$("#regionName").val(name);
}
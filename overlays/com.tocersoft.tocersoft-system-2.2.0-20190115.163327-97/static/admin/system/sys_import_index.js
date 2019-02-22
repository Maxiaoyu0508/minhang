var progressLogger = null;	//日志进度组件
var optKey = "";
$(document).ready(function(){	
	progressLogger = $("#progressLogView").progressLogger();
});


/**
 * 批量导入历史订单
 */
function doImport(){
    var importAddUrl = $("#importAddUrl").val();
    if(importAddUrl==""||importAddUrl==undefined){
    	$.dialog("未配置批量导入方法");
    	return;
	}
    if($("#fileInput").val() == "" || $("#fileInput").val() == null){
		$.dialog.alert("请选择需要导入的文件	");
		return;
	}
	var lastIndex = $("#fileInput").val().lastIndexOf("\\");
	var fileName = $("#fileInput").val().substring(lastIndex+1,$("#fileInput").val().length);
	$.dialog.confirm('请确认上传导入表格文档：'+fileName+" ?",function(){
		progressLogger.stop();
		$("#progressLogView").val("");
		$.ajaxFileUpload({
			url:basePath+'/'+importAddUrl,//用于文件上传的服务器端请求地址
			secureuri:false,//一般设置为false
			fileElementId:'fileInput',//文件上传空间的id属性 <input type="file" id="file" name="file" />
			dataType: 'json',//返回值类型一般设置为json
			data: {"fileName":fileName},
			success: function (data, status){ 
				$("body").unmask();
				if(data.status == "success" || data.status == "SUCCESS"){
          optKey = data.message;
					progressLogger.start(data.message);
				}else{
				  $.dialog.alert(data.message);
        }
			},
			error: function (data, status, e){//服务器响应失败处理函数
				$.dialog.alert("导入失败");
			}
		});
	});
}

/**
 * 批量导入删除
 */
function delImport(){
    var importDelUrl = $("#importDelUrl").val();
    if(importDelUrl==""||importDelUrl==undefined){
        $.dialog("未配置批量删除方法");
        return;
    }
	if($("#delInput").val() == "" || $("#delInput").val() == null){
		$.dialog.alert("请选择需要导入的文件	");
		return;
	}
	var lastIndex = $("#delInput").val().lastIndexOf("\\");
	var fileName = $("#delInput").val().substring(lastIndex+1,$("#delInput").val().length);
	$.dialog.confirm('请确认上传导入表格文档：'+fileName+" ?",function(){
		progressLogger.stop();
		$("#progressLogView").val("");
		$(".import-loding").show();
		$('#progressLogView').hide();
		$.ajaxFileUpload({
			url:basePath+'/'+importDelUrl,//用于文件上传的服务器端请求地址
			secureuri:false,//一般设置为false
			fileElementId:'delInput',//文件上传空间的id属性 <input type="file" id="file" name="file" />
			dataType: 'json',//返回值类型一般设置为json
			data: {"fileName":fileName},
			success: function (data, status){ 
				$("body").unmask();
        if(data.status == "success" || data.status == "SUCCESS"){
					optKey = data.message;
					progressLogger.start(data.message);
					$('#progressLogView').show();
					$(".import-loding").hide();
				}else{
          $.dialog.alert(data.message);
        }
			},
			error: function (data, status, e){//服务器响应失败处理函数
				$.dialog.alert("导入失败");
			}
		});
	});
}

/**
 * 导出日志
 */
function exportLog(){
  if(!optKey){
    $.dialog.alert("没有导出记录");
    return;
  }
  window.location.href = basePath+"/admin/system/progress/log/export.htm?condition.optKey=" + optKey + "&m=" + Math.random();
}
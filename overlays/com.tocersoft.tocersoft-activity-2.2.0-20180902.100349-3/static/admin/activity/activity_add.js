$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
	//初始化Tab页
	initTab();
	//初始化富文本编辑器
	initKindEditor();
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#name").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"活动标题不能为空",onErrorMax:"活动标题长度过长"});
    $("#imageMain").formValidator({validatorGroup:1}).inputValidator({min:0,max:255,onErrorMin:"",onErrorMax:"活动主图长度过长"});
    $("#imageThumb").formValidator({validatorGroup:1}).inputValidator({min:0,max:255,onErrorMin:"",onErrorMax:"列表缩略图长度过长"});
    $("#address").formValidator({validatorGroup:1}).inputValidator({min:0,max:255,onErrorMin:"",onErrorMax:"活动地点长度过长"});
    $("#timeNote").formValidator({validatorGroup:1}).inputValidator({min:0,max:255,onErrorMin:"",onErrorMax:"活动时间说明长度过长"});
    $("#enrollNote").formValidator({validatorGroup:1}).inputValidator({min:0,max:255,onErrorMin:"",onErrorMax:"报名说明长度过长"});
    $("#enrollNum").formValidator({validatorGroup:1}).inputValidator({min:0,max:255,onErrorMin:"",onErrorMax:"报名名额长度过长"});
}

//初始化页签
function initTab(){
	$(".J-tab-sub").eq(0).addClass('no-bg').siblings().addClass('yes-bg').removeClass('no-bg');
	$('.J-tab-sub-content').eq(0).siblings().hide();
	// 切换tab选项
	$(".J-tab-sub").each(function(i){
		$(this).click(function(){
			if(!$(this).hasClass("no-click")){
				$(this).addClass('no-bg').removeClass('yes-bg');
				$(this).siblings().addClass('yes-bg').removeClass('no-bg');
				$('.J-tab-sub-content').eq(i).show().siblings().hide();
			}
		});
	});
}

//初始化kindEditor
function initKindEditor(){
	editor = UE.getEditor('htmlDesc',{
		resizeMode :1,
		allowPreviewEmoticons : false,
		allowUpload : true,
		width:'100%',
		uploadJson : basePath + '/editorUpload.htm?m='+Math.random()
	});
	editor = UE.getEditor('htmlFeature',{
		resizeMode :1,
		allowPreviewEmoticons : false,
		allowUpload : true,
		width:'100%',
		uploadJson : basePath + '/editorUpload.htm?m='+Math.random()
	});
	editor = UE.getEditor('htmlAgenda',{
		resizeMode :1,
		allowPreviewEmoticons : false,
		allowUpload : true,
		width:'100%',
		uploadJson : basePath + '/editorUpload.htm?m='+Math.random()
	});
	editor = UE.getEditor('htmlGuests',{
		resizeMode :1,
		allowPreviewEmoticons : false,
		allowUpload : true,
		width:'100%',
		uploadJson : basePath + '/editorUpload.htm?m='+Math.random()
	});
	
	// 调整KindEditor的宽度大小
	resizeKindeditor();
	window.onresize = function _doResize(){
	 	resizeKindeditor();
	};
}

function resizeKindeditor(){
	var w = $('.caption-div').width();
	var nw = w + 8;
	$('.art-content').width(nw);
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	$("#fileInput").removeAttr("disabled");
        	$("#fileInput2").removeAttr("disabled");
        	if(data.status == "success"){
        		var win = $.dialog.open.origin;
        		win.reloadCommonGrid("table");
        		$.dialog.alert("保存成功!");
        	}else{
        		$.dialog.alert(data.message);
        		if(typeof data.token != "undefined" && data.token.length > 0){
        			$("input[name='token']").val(data.token);
        		}
        	}
        }
    });
}

/**
 * 初始化操作按钮
 */
function initOperateBtn(){
	//保存活动信息
    $("body").on("click","#saveBtn",saveActivity);
	//关闭窗口
    $("body").on("click","#exitBtn",closeWin);
}

/**
 * 保存活动信息
 */
function saveActivity(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("body").mask("正在保存，请稍后...");
	$("#fileInput").attr("disabled",true);
	$("#fileInput2").attr("disabled",true);
	$("#saveForm").submit();
}
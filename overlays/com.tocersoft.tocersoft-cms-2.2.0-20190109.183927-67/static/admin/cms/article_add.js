var editor;
$(document).ready(function(){
	//初始化选择框
	$("#gjc").chosen();
	// 初始化页签
	initTab();
	initTabSub();
	// 初始化百度富文本编辑器
	initEditor();
	//取消
	$('#cancelBtn').on('click',function(){
		$.dialog.close();
	});
	// 单击广告图片的时候
	$('.adv-photo-item').on('click',function(){
		var e = $(this);
		var btn = $(e).find('.photo-btn');
		if(e.is('.select')){
			$(e).removeClass('select');
			$(btn).addClass('hide');
		}else{
			$(e).addClass('select');
			$(btn).removeClass('hide');
		}
	});
	
	// 调整KindEditor的宽度大小
	resize();
	window.onresize = function _doResize(){
	 	resize();
	}
	
	// 生成Ztree
	var setting = {
		async : {
			enable : true,
			url : treeLoadUrl,
			autoParam : ["id", "name", "level"],
			dataFilter : parseRoleTreeDataFilter
		},
		callback : {
			onClick: onClickTree
		},
		view : {
		}
	};
	$.fn.zTree.init($("#treeDemo"), setting);
	zTree = $.fn.zTree.getZTreeObj("treeDemo");
	
	function parseRoleTreeDataFilter(treeId,parentNode,responseData){
		var treeData =responseData.data;
		return treeData;
	}
	
	$('#channelChoose').focus(function(){
		var cityObj = $("#channelChoose");
		var cityOffset = $("#channelChoose").offset();
		$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
	});
	
	//验证框架信息
	$.formValidator.initConfig({validatorGroup:"1",onError:function(msg,obj,errorlist){$.msg({wrapID:"errorlist",type:"error",messages:errorlist,time:"5000"});}});
	
	$("#itemName").formValidator({validatorGroup:1}).inputValidator({min:1,onErrorMin:"文章标题不能为空"});
	$("#summary").formValidator({validatorGroup:1}).inputValidator({min:1,max:500,onErrorMin:"文章摘要不能为空",onErrorMax:"文章摘要长度过长"});
	$("#channelName").formValidator().inputValidator({min:1,onError: "请选择栏目名称"}).defaultPassed();
	
	//异步表单提交设置
    $('#articleForm').ajaxForm({
        dataType: 'json',
        success: function(data){
        	if(data.status == 'success'){
        		$.dialog.alert('保存成功');
        		$("#itemId").val(data.message);
        		$(".tab-btn").removeClass("no-click");
        	}else{
        		$.dialog.alert(data.message);
        	}
        },
        error:function(data) {
        	$.dialog.alert(data.message);
        }
    });
    
  //点击图片中的编辑按钮
    $('.J-ap-edit').on('click',function(){
    	var id = $(this).attr('data');
    	toUpdate(id);
    });

    // 点击图片中的删除按钮
    $('.J-ap-remove').on('click',function(){
    	var id = $(this).attr('data');
    	remove(id);
    });
    
    //页面初始化时改变部分元素样式
	$('#gjc_chosen').css({"width":"100%"});
	$('#gjc_chosen ul').css({"borderRadius":3});
	$('.art-content').css({"width":$(this).width() - 30});
	$('#summary').parents('.form-content').css({"paddingRight":5});
	var tongjiV = setTimeout(function(){
		$('#edui1_wordcount').css({"paddingRight":3});
	},500)
    initChosen();
});

/**
 * 初始化选择框
 */
function initChosen(){
    $("#tagList").chosen({});
}

/**
 * 初始化表格
 */
function initGrid(){
 	var objectId = $("#itemId").val();
 	if(objectId == null || objectId == ""){
 		objectId = "-1";
 	}
	//渲染表格骨架
	$("#grid").jqGrid({
		url:basePath + '/admin/cms/article/listArticleFileByPage.htm?m=' + Math.random(),
		postData:{'condition.objectId':objectId,"condition.objectType":1},
		datatype:"json",
		colNames:['关联下载','附件名称'],
		colModel:[
			{name:"id",width:80,formatter:optFormatter},
			{name:"name",width:300}
		],
		viewrecords: true,
		caption:"",
		loadComplete: function(data){
			var width = $(window).width();
			$(this).setGridWidth(width-40);
		},
		autoScroll:true,
		pager:'#pager',
		jsonReader:{id: "id",root:"resultList"}
	});
	$("#grid").jqGrid("navGrid","#grid");
}


function optFormatter(cellvalue,options,rowObject){
	var btns = [];
	var downloadBtn = "<a href='javascript:void(0);' class='no_unl' title='下载' onclick=\"downloadFN('"+rowObject.id+"');return false;\">下载</a>";
	btns.push(downloadBtn);
	return btns.join(" | ");
}


/**
 * 批量删除
 */
function delBtn(){
	//确认提示
	var selIds = $("#grid").jqGrid("getGridParam", "selarrrow");
	if(selIds.length == 0){s
		$.dialog.alert("请选择要删除的数据");
		return ;
	}
	$.dialog.confirm("确认要删除此项数据吗？",function(){
		$.post(basePath+"/admin/cms/article/remove_article_upload.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
			if(data.status == "success"){
				refreshGrid();
			}
		},"json");
	});
}

/**
 * 刷新表格
 */
function refreshGrid(){
	$('#grid').trigger('reloadGrid',[{page:1}]);
}

/*
 * 下载
 */
function downloadFN(id){
	window.location.href=basePath+"/admin/cms/article/download.htm?item.id="+id;
}

/**
 * 上传附件
 */
function doUploadFiles(){
	if($("#fileId").val() == "" || $("#fileId").val() == null){
		$.dialog.alert("请选择需要上传的文件");
		return;
	}
	$.ajaxFileUpload({
		url:basePath+'/uploadPrivateFileByHttp.htm',
		secureuri:false,//一般设置为false
		fileElementId:'fileId',//文件上传空间的id属性 <input type="file" id="file" name="file" />
		dataType: 'json',//返回值类型一般设置为json
		success: function (data, status){ //服务器成功响应处理函数
			if(data.status == 'success'){
				var objectId = $("#itemId").val(); 
				if(objectId == ""){
					objectId = "-1";
				}
				var fileName = data.fileName;
				var path = data.path;
				$("#path").val(path);
				$("#fileName").val(fileName);
				var extend=fileName.substring(fileName.lastIndexOf('.'),fileName.Length);
				var postData = {"item.url":path,"item.fileName":fileName,"item.objectId":objectId,"item.extend":extend,"item.objectType":'1'} ;
				$.post(basePath+"/admin/cms/article/saveSysFileUpload.htm",postData,function(data){
					if(data.status == "success"){
						refreshGrid();
						$.dialog.alert("上传成功");
					}
				});
			}else{
				$.dialog.alert(data.message);
			}
		}
	});
}


//初始化页签
function initTab(){
	// 默认状态
	$('.J-tab-content').eq(0).siblings().hide();
	// 切换tab选项
	$(".J-tab").eq(0).addClass('no-bg').siblings().addClass('yes-bg').removeClass('no-bg');
	$(".J-tab").each(function(i){
		$(this).click(function(){
			$(this).addClass('no-bg').removeClass('yes-bg');
			$(this).siblings().addClass('yes-bg').removeClass('no-bg');
			$('.J-tab-content').eq(i).show().siblings().hide();
		});
	});
	
	$(".J-tab").eq(parseInt(currentTabIndex)).trigger("click");
}

//初始化页签
function initTabSub(){
	// 默认状态
	$('.J-tab-sub-content').eq(0).siblings().hide();
	
	// 切换tab选项
	$(".J-tab-sub").eq(0).addClass('no-bg').siblings().addClass('yes-bg').removeClass('no-bg');
	$(".J-tab-sub").each(function(i){
		$(this).click(function(){
			if(!$(this).is(".no-click")){
				$(this).addClass('no-bg').removeClass('yes-bg');
				$(this).siblings().addClass('yes-bg').removeClass('no-bg');
				$('.J-tab-sub-content').eq(i).show().siblings().hide();
			}
		});
	});
}

function initEditor(){
	var editor = UE.getEditor('artContent', {
	    autoHeightEnabled: true,
	    autoFloatEnabled: true
	});  
}

function treeLoadUrl(treeId, treeNode) {
	return treeNode == null ? basePath + "/admin/cms/channel/list_channel.htm" : basePath + "/admin/cms/channel/list_channel.htm?parentId="+treeNode.id;
}

//zTree点击事件		
function onClickTree(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = zTree.getSelectedNodes();
	$('#channelChoose').val(nodes[0].name);
	$("#channelId").val(nodes[0].id);
	hideMenu();
}

function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}
function resize(){
	var w = $('.caption-div').width();
	var nw = w + 8;
	$('.art-content').width('auto');
}
//提交表单
function submitForm(frm){
	var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
	if(!result){
		return;
	}
   	$("#fileInput").attr("disabled",true);
   	
   	var publishDate = $("#publishDate").val();
   	if(publishDate == ""){
   		$.dialog.alert("请填写发布时间！");
   		return;
   	}

    $("#cmsTags").tagEditor('addTag','');//手动触发一次，不触发就会取不到值
    // alert($("#cmsTags").tagEditor('getTags')[0].tags);

   	var itemId  = $("#itemId").val();
   	if(null != itemId && "" != itemId){
   		$(frm).attr("action",basePath+"/admin/cms/article/updateArticle.htm");
    	$(frm).submit();
   	}else{
   		$(frm).attr("action",basePath+"/admin/cms/article/addArticle.htm");
   		$(frm).submit();
   	}
}

//保存广告图片
function save(){
	var result = $.formValidator.pageIsValid("1");	// 手动调用验证框架进行验证
	if(!result){
		return;
		}
	$("body",parent.document).mask("正在处理，请稍候...");
	var itemId  = $("#itemId").val();
   	if(null != itemId && "" != itemId){
   		$('#articlePhotoForm').attr('action',basePath+'/admin/cms/article/update_cms_article_photo.htm');
   		$('#articlePhotoForm').ajaxSubmit(function(data){
   			$("body",parent.document).unmask();
   			var win = $.dialog.open.origin;
   			win.loadAdvPhotos2();
   			$.dialog.close();
   		});
   	}else{
   		$('#articlePhotoForm').ajaxSubmit(function(data){
   			$("body",parent.document).unmask();
   			var win = $.dialog.open.origin;
   			win.loadAdvPhotos2();
   			$.dialog.close();
   		});
   	}
}

//跳转到添加文章图
function toArticleAdd(){
	var objectId = $('#itemId').val();
	$.dialog.open(basePath+'/admin/cms/article/to_article_add.htm?m='+Math.random()+'&item.objectId='+objectId,{
		title:'新增图片',
		width:'600px',
		height:'420px',
		lock:true
	});
}

/** 关闭当前页 */
function closeCurrentTab(event){
	var current = $("#menubar_tabs",parent.document).find("a[class='currenttab']")[0];
	var id = current.id;
	id = id.substring(6,id.length);
	parent.closeTab(id,event);
}

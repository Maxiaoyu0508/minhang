var editor;
$(document).ready(function(){
	//初始化表单验证信息
	initFormValidator();
	//初始化表单提交
	initAjaxForm();
	//初始化操作按钮
	initOperateBtn();
	//初始化下拉列表
	initMemberComp();
	

	$("#advPhotoAdd").on('click',function(){
		toAdd();
	});
	//初始化选择框
	$("#gjc").chosen();
	loadAdvPhotos();
	
	// 初始化页签
	initTab();
	initTabSub();
	
	// 初始化百度富文本编辑器
	initEditor();
	
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
	$("#summary").formValidator({validatorGroup:1}).inputValidator({min:1,max:2000,onErrorMin:"文章摘要不能为空",onErrorMax:"文章摘要长度过长"});
	$("#channelName").formValidator().inputValidator({min:1,onError: "请选择栏目名称"}).defaultPassed();
	
	//异步表单提交设置
    $('#articleForm').ajaxForm({
        dataType: 'json',
        data:$('#articleForm').serialize(),
        success: function(data) {
        	if(data.status == 'success'){
        		$("#filephoto1").attr("disabled",false);
        		$.dialog.alert('保存成功',function(){
        			$('#itemId').val(data.message);
        			loadAdvPhotos();
        		});
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

    // 点击刷新按钮刷新广告图
    $('#refreshBtn').on('click',function(){
    	loadAdvPhotos();
    });
    

});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
	//验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#authorId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"博主ID不能为空",onErrorMax:"博主ID长度过长"});
    $("#articleId").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"文章ID不能为空",onErrorMax:"文章ID长度过长"});
}

function initMemberComp(){
	//博主下拉补全
	if($("#authorType").val()==1){
			var memberComp = $('#blogName').autocomplete(
				basePath+'/autocomplete/listBloger.htm',{
					minChars : 0,
					width : $("#blogName").width(),
					max : 0,
					extraParams : {
						'keyName' : function() {
							var staffId = $('#blogName').val();
							if ($.trim(staffId).length > 0) {
								return $("#blogName").val();
							}else {
								return '';
							}
						}
					},
					formatItem : function(row, i, max) {
						return row.name;
					},
					formatMatch : function(row, i, max) {
						return row.name;
					},
					formatResult : function(row) {
						return row.name;
					},
					parse : function(dataArr) {
						return $.map(dataArr.data, function(row) {
							var obj = {};
								obj["data"] = row;
								obj["value"] = row.name;
								obj["result"] = row.name;
								obj["id"] = row.id;
							return obj;
						});
					}
				}).result(function(event, data, formatted) {
					$('#blogId').val(data.id);
					$('#blogName').val(data.name);
					$('#blogName').css('color', '#333');
					memberComp.flushCache();
				});
	}
	//自媒体下拉补全
	if($("#authorType").val()==2){
		var memberComp = $('#blogName').autocomplete(
			basePath+'/autocomplete/listmedia.htm',{
				minChars : 0,
				width : $("#blogName").width(),
				max : 0,
				extraParams : {
					'keyName' : function() {
						var staffId = $('#blogName').val();
						if ($.trim(staffId).length > 0) {
							return $("#blogName").val();
						}else {
							return '';
						}
					}
				},
				formatItem : function(row, i, max) {
					return row.name;
				},
				formatMatch : function(row, i, max) {
					return row.name;
				},
				formatResult : function(row) {
					return row.name;
				},
				parse : function(dataArr) {
					return $.map(dataArr.data, function(row) {
						var obj = {};
							obj["data"] = row;
							obj["value"] = row.name;
							obj["result"] = row.name;
							obj["id"] = row.id;
						return obj;
					});
				}
			}).result(function(event, data, formatted) {
				$('#blogId').val(data.id);
				$('#blogName').val(data.name);
				$('#blogName').css('color', '#333');
				memberComp.flushCache();
			});
		}
}


/**
 * 初始化表单提交
 */
function initAjaxForm(){
	$('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
        	$("body").unmask();
        	if(data.status == "success"){
        		$.dialog.alert("保存成功！");
//        		window.location.href = basePath+"admin/cms/blog/article/index.htm?authorType=1";
        		var win = $.dialog.open.origin;
        		win.reloadCommonGrid("table");
        		$.dialog.close();
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
	//保存博客内的相关文章
	$("#saveBtn").on("click",saveCmsBlogArticle);
	//关闭窗口
	$("#exitBtn").on("click",closeWin);
}

/**
 * 保存博客内的相关文章
 */
function saveCmsBlogArticle(){
	var result = $.formValidator.pageIsValid(1);
	if(!result){
		return;
	}
	$("#fileInput").attr("disabled",true);
	$("body").mask("正在保存，请稍后...");
	$("#saveForm").submit();
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
	return treeNode == null ? basePath+"/admin/cms/channel/list_channel.htm" : base+"/admin/cms/channel/list_channel.htm?parentId="+treeNode.id;
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
	$('.art-content').width(nw);
}
//提交表单
function submitForm(frm){
	editor.sync();
	var result = $.formValidator.pageIsValid(1);	//手动调用验证框架进行验证
	if(!result){
		return;
	}
   	var itemId  = $("#itemId").val();
   	$("#filephoto1").attr("disabled",true);
   	if(null != itemId && "" != itemId){
   		$(frm).attr("action",basePath+"/admin/cms/article/updateArticle.htm");
    	$(frm).submit();
   	}else{
   		$(frm).attr("action",basePath+"/admin/cms/article/addArticle.htm");
   		$(frm).submit();
   	}
}



////图片上传
//function doUploadFile(){
//	$.ajaxFileUpload({
//		url:basePath+'/upload.htm',//用于文件上传的服务器端请求地址
//		secureuri:false,//一般设置为false
//		fileElementId:'filephoto1',//文件上传控件的id属性 <input type="file" id="file" name="file" />
//		dataType: 'json',//返回值类型 一般设置为json
//		success: function(data, status){ //服务器成功响应处理函数
//			if(data.status=='success'){
//				$("#path").val(data.url);
//				$("#downloadImg").attr('src',data.url);
//			}else{
//				$.dialog.alert(data.message);
//			}
//		},
//		error: function(data, status, e){//服务器响应失败处理函数
//			$.dialog.alert(data.message);
//		}
//	});
//	return false;
//}





//加载广告图片
function loadAdvPhotos(){
	var itemId = $('#itemId').val();
	if(itemId!=null&&itemId!=''){
		$.post(basePath+'/admin/cms/articlePhoto/list.htm?m='+Math.random(),{'item.articleId':itemId},function(data){
			$('#advPhotoList').html(data);
		});
		$("#photoDiv").show();
	}else{
		$("#photoDiv").hide();
	}
}


//跳转到添加图
function toAdd(){
	var itemId = $('#itemId').val();
	$.dialog.open(basePath+'/admin/cms/articlePhoto/add.htm?m='+Math.random()+'&item.articleId='+itemId,{
		title:'新增图片',
		width:'600px',
		height:'420px'
	});
}

// 跳转到修改图
function toUpdate(id){
	var itemId = $('#itemId').val();
	$.dialog.open(basePath+'/admin/cms/articlePhoto/update.htm?m='+Math.random()+'&item.id='+id+'&item.articleId='+itemId,{
		title:'修改图片',
		width:'600px',
		height:'420px'
	});
}
//删除图
function remove(id){
	$.dialog.confirm("确认要删除吗？",function(){
		$.post(basePath+'/admin/cms/articlePhoto/del.htm?m='+Math.random(),{"selIds":id},function(data){
			if(data.status == 'success'){
				$.dialog.alert('删除成功',function(){
					loadAdvPhotos();
				});
			}else{
				$.dialog.alert(data.message);
			}
		});
	});
}


/** 关闭当前页 */
function closeCurrentTab(event){
	var current = $("#menubar_tabs",parent.document).find("a[class='currenttab']")[0];
	var id = current.id;
	id = id.substring(6,id.length);
	parent.closeTab(id,event);
}
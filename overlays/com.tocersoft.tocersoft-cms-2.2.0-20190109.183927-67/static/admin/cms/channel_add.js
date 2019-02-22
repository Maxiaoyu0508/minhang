$(document).ready(function () {
    initGrid();
})

/**
 * 保存类别
 */
function addCmsChannel(parentId) {
	$("#nameDiv").hide();
	$("#sortDiv").hide();
	var id = $("#parentId").val();
	var name = $("#name").val();
	var sort = $("#sortNum").val();
	var remark = $('#remark').val();
	var cmsTemplateId = $("#cmsTemplateId option:selected").val(); //获取选中的项
	if (null == name || "" == name) {
		$("#nameDiv").show();
		return;
	}
	if (null == sort || "" == sort) {
		$("#sortDiv").show();
		return;
	}
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",parent.document).mask("正在保存，请稍候...");
	$.post(basePath+"/admin/cms/channel/doAddCmsChannel.htm", {
				"parentId" : id,
				"name" : name,
				"remark" : remark,
				"sortNum" : sort,
                "item.cmsTemplateId" : cmsTemplateId
			}, function(data) {
				// 回调函数中去除遮罩
				$("body",parent.document).unmask();
				if (data.status=='success'){
					$.dialog.close();
					var win = $.dialog.open.origin;
					if(undefined == id || id == 0){
						win.reloadTree();
					}else{
						win.reloadNodes(id);
					}
				} else {
					$.dialog.alert("保存失败");
				}
			});
}


/**
 * 修改栏目类别
 */
function updateCmsChannel() {
	var id = $("#nodeId").val();
	var name = $("#name").val();
	var remark = $("#remark").val();
	var sort = $("#sortNum").val();
    var cmsTemplateId = $("#cmsTemplateId option:selected").val(); //获取选中的项
	// 所有异步提交，必须都要加上遮罩，为了防止AJAX重复提交
	$("body",parent.document).mask("正在保存，请稍候...");
	$.post(basePath+"/admin/cms/channel/doUpdateCmsChannel.htm", {
				"nodeid" : id,
				"name" : name,
				"remark" : remark,
				"sortNum" : sort,
                "item.cmsTemplateId" : cmsTemplateId
		}, function(data) {
			// 回调函数中去除遮罩
			$("body",parent.document).unmask();
			if (data.status=='success') {
				$.dialog.close();
				var win = $.dialog.open.origin;
				win.location.reload();
			} else {
				$.dialog.alert(data.message);
			}
		});

}

// 退出当前窗体
function exitWin() {
	$.dialog.close();
}


/**
 * 上传附件
 */
function doUploadFilesChannel(){
    if($("#fileId").val() == "" || $("#fileId").val() == null){
        $.dialog.alert("请选择需要上传的文件");
        return;
    }
    $.ajaxFileUpload({
        url:basePath+'/uploadPublicFileByHttp.htm',
//		url:basePath+'/ajaxFileUpload.htm',//用于文件上传的服务器端请求地址
        secureuri:false,//一般设置为false
        fileElementId:'fileId',//文件上传空间的id属性 <input type="file" id="file" name="file" />
        dataType: 'json',//返回值类型一般设置为json
        success: function (data, status){ //服务器成功响应处理函数
            if(data.status == 'success'){
                var objectId = $("#nodeId").val();
                if(objectId == ""){
                    objectId = "-1";
                }
                var fileName = data.fileName;
                var path = data.path;
                $("#path").val(path);
                $("#fileName").val(fileName);
                var extend=fileName.substring(fileName.lastIndexOf('.'),fileName.Length);
                var postData = {"item.url":path,"item.fileName":fileName,"item.objectId":objectId,"item.extend":extend,"item.objectType":'2'} ;//1.文章 2.栏目
                $.post(basePath+"/admin/cms/channel/saveSysFileUpload.htm",postData,function(data){
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

/**
 * 刷新表格
 */
function refreshGrid(){
    $('#grid').trigger('reloadGrid',[{page:1}]);
}

function initGrid(){
    var objectId = $("#nodeId").val();
    if(objectId == null || objectId == ""){
        objectId = "-1";
    }
    //渲染表格骨架
    $("#grid").jqGrid({
        url:basePath + '/admin/cms/channel/listArticleFileByPage.htm?m=' + Math.random(),
        postData:{'condition.objectId':objectId,"condition.objectType":2},
        datatype:"json",
        colNames:['关联下载','附件名称'],
        colModel:[
            {name:"id",width:300,formatter:optFormatter},
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
 * 下载
 */
function downloadFN(id){
    window.location.href=basePath+"/admin/cms/channel/download.htm?item.id="+id;
}


/**
 * 批量删除
 */
function delBtn(){
    //确认提示
    var selIds = $("#grid").jqGrid("getGridParam", "selarrrow");
    if(selIds.length == 0){
        $.dialog.alert("请选择要删除的数据");
        return ;
    }
    $.dialog.confirm("确认要删除此项数据吗？",function(){
        $.post(basePath+"/admin/cms/channel/remove_article_upload.htm?m="+Math.random(),{"selIds":selIds.join(",")},function(data){
            if(data.status == "success"){
                refreshGrid();
            }
        },"json");
    });
}
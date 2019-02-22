$(document).ready(function(){
    //初始化表单验证信息
    initFormValidator();
    //初始化表单提交
    initAjaxForm();
});

/**
 * 初始化表单验证信息
 */
function initFormValidator(){
    //验证框架信息
    $.formValidator.initConfig({ validatorGroup: 1, onError: function (msg, obj, errorlist) { $.msg({ wrapID: "errorlist", type: "error", messages: errorlist, time: "5000" }); } });
    $("#publicRoot").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"公开资源的根路径，不能为空",onErrorMax:"公开资源的根路径，长度过长"});
    $("#privateRoot").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"非公开资源的根路径，不能为空",onErrorMax:"非公开资源的根路径，长度过长"});
    $("#logoImage").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"系统LOGO图片不能为空",onErrorMax:"系统LOGO图片长度过长"});
    $("#systemName").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"系统名称不能为空",onErrorMax:"系统名称长度过长"});
    $("#systemCompany").formValidator({validatorGroup:1}).inputValidator({min:1,max:255,onErrorMin:"系统使用公司名称不能为空",onErrorMax:"系统使用公司名称长度过长"});
}

/**
 * 初始化表单提交
 */
function initAjaxForm(){
    $('#saveForm').ajaxForm({
        dataType: 'json',
        success: function(data) {
            $("body").unmask();
            $.dialog.alert(data.message);
            if(typeof data.token != "undefined" && data.token.length > 0){
                $("input[name='token']").val(data.token);
            }
        }
    });
}

/**
 * 保存文件上传路径设置
 */
function saveSysUploadSet(){
    var result = $.formValidator.pageIsValid(1);
    if(!result){
        return;
    }
    $("body").mask("正在保存，请稍后...");
    $("#saveForm").submit();
}

/**
 * 文件上传 - 公开私有模式 - HTTP
 */
function doUploadFile(fileId, showImg, imgPath, fileName){
    if(typeof fileId == 'undefined' || !fileId){
        fileId = 'fileInput';
    }
    if(typeof showImg == 'undefined' || !showImg){
        showImg = 'showImg';
    }
    if(typeof imgPath == 'undefined' || !imgPath){
        imgPath = 'imgPath';
    }
    if(typeof fileName == 'undefined' || !fileName){
        fileName = 'fileName';
    }

    /*var file = $("#" + fileId).val();
    var fileSuffix = file.substring(file.lastIndexOf(".") + 1).toLowerCase();
    var fileSuffixStr = "jpeg,pjpeg,gif,bmp,x-ms-bmp,png,x-png,jpg";
    if(fileSuffixStr.indexOf(fileSuffix)==-1){
        $.dialog.alert("上传的图片格式不正确");
        return;
    }*/

    if(uploadType != undefined && uploadType == 'oss'){
        $.ajaxFileUpload({
            url:basePath+"/uploadPublicFileByHttp.htm",//用于文件上传的服务器端请求地址
            secureuri:false,//一般设置为false
            fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
            dataType: 'json',//返回值类型一般设置为json
            success: function (data, status){ //服务器成功响应处理函数
                if(data.status == 'success'){
                    var imgSrc = aliyunOssFileAccessUrl + data.ossFileKey;
                    var image  = ('#' + showImg);
                    /*
                    if(image != undefined){
                        if(imgSrc != ""){
                            var imgArray = imgSrc.split(".");
                            var fileSuffix = imgSrc.split(".")[imgArray.length-1].toLowerCase();
                            var fileSuffixStr = "jpeg,pjpeg,gif,bmp,x-ms-bmp,png,x-png,jpg";
                            if(fileSuffixStr.indexOf(fileSuffix)==-1){
                                $.dialog.alert("上传的图片格式不正确");
                                return;
                            }
                        }
                    }
                    */
                    $("#" + imgPath).val(data.ossFileKey);
                    //公开文件
                    $('#' + showImg).attr('src',imgSrc);
                    $("#" + fileName).val(data.fileName);
                    $("#" + fileName + "Show").html(data.fileName);
                }else{
                    $.dialog.alert(data.message);
                }
            },
            error: function (data, status, e){//服务器响应失败处理函数
                $.dialog.alert(data.message);
            }
        });
    }else{
        $.ajaxFileUpload({
            url:basePath+'/uploadPublicFileByHttp.htm',//用于文件上传的服务器端请求地址
            secureuri:false,//一般设置为false
            fileElementId:fileId,//文件上传空间的id属性 <input type="file" id="file" name="file" />
            dataType: 'json',//返回值类型一般设置为json
            success: function (data, status){ //服务器成功响应处理函数
                if(data.status == 'success'){
                    var image  = ('#' + showImg);
                    var imgSrc = data.path;
                    /*
                    if(image != undefined){
                        if(imgSrc != ""){
                            var fileSuffix = imgSrc.split(".")[1].toLowerCase();
                            var fileSuffixStr = "jpeg,pjpeg,gif,bmp,x-ms-bmp,png,x-png,jpg";
                            if(fileSuffixStr.indexOf(fileSuffix)==-1){
                                $.dialog.alert("上传的图片格式不正确");
                                return;
                            }
                        }
                    }
                    */
                    $("#" + imgPath).val(data.path);
                    $('#' + showImg).attr('src',basePath + fileRoot + data.path);

                }else{
                    $.dialog.alert(data.message);
                }
            },
            error: function (data, status, e){//服务器响应失败处理函数
                $.dialog.alert(data.message);
            }
        });
    }
    return false;
}



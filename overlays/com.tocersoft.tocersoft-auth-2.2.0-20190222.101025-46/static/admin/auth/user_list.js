var zTree,rMenu,gh,curNode,topId=-1;	//定义变量
$(document).ready(function(){
    gh = $(window).height() - 33-28-32;
    $("#treeDiv").css("height",gh+51);
    resizeWidth();
    rMenu = $("#rMenu");
    //初始化部门树
    initDepartTree();
    //初始化操作按钮
    initOperateBtn();

    clickDepartTreeFN();

    // 随窗体大小改变而改变Grid宽度
    window.onresize = resizeWidth;

    //左右拖拽
    var divsp = new Separator(document.getElementById("categoryTreeDiv"),document.getElementById("categoryContentDiv"),separatorCallbackFN,SP_LEFTRIGHT,4);
    $(window).resize(function(){
        resizeWidth();
    });
});

/**
 * 拖拽回调函数
 */
function separatorCallbackFN(){
    resizeWidth();
}

/**
 * 初始化表格
 */
function initTable(curNodeId){
    //渲染表格骨架
    $("#table").jqGrid({
        url:basePath + '/admin/auth/user/listUserByPage.htm?m='+Math.random(),
        postData:{'condition.departId':curNodeId},
        colNames:['操作','用户姓名','部门','状态','用户名','主管','性别','手机号码','电子邮箱','用户角色'],
        colModel:[
            {name:"id",width:120,align:'center',formatter:optFormater},
            {name:'name',width:100,align:'center',index:'C_NAME',sortable:true},
            {name:"departNames",width:120,align:'left'},
            {name:"state",width:65,formatter:stateFormater,align:'center'},
            {name:'account',width:100,align:'left'},
            {name:"isManager",width:60,align:'center',formatter:isManagerFormater},
            {name:'sex',width:58,formatter:sexFormater,align:'center'},
            {name:'mobile',width:120,align:'center'},
            {name:'email',width:180,align:'left'},
            {name:"roleNames",width:158,align:'left'}
        ],
        loadComplete: function(data){
            resizeWidth();
        },
        sortable:true,
        sortorder:'asc',
        height:gh
    });
    $("#table").jqGrid("navGrid","#pagerBar");
    $('#jqgh_table_id').css({"textAlign":"center"});
    $('#jqgh_table_name').css({"textAlign":"center"});
    $('#jqgh_table_name').css({"textAlign":"center"});
    $('#jqgh_table_state').css({"textAlign":"center"});
    $('#jqgh_table_sex').css({"textAlign":"center"});
    $('#jqgh_table_mobile').css({"textAlign":"center"});
    $('#jqgh_table_isManager').css({"textAlign":"center"});
    $('.ui-jqgrid-bdiv').css({"height":$(window).height() - 105});
    $('#treeDiv').css({"height":$(window).height() - 45});
}

/**
 * 初始化部门树
 */
function initDepartTree(){
    // 生成Ztree
    var setting = {
        async : {
            enable : true,
            url : departTreeLoadUrl,
            autoParam : ["id","name","parentId","isParent"],
            dataFilter : parseDepartTreeDataFilter
        },
        callback : {
            onRightClick : rightClickDepartTreeFN,
            onClick : clickDepartTreeFN,
            onAsyncSuccess : hideTipFN
        },
        view : {
            nameIsHTML : true
        },
        check : {
            enable : false,
            chkStyle : "checkbox"
        }
    };
    $.fn.zTree.init($("#categoryTree"), setting);
    zTree = $.fn.zTree.getZTreeObj("categoryTree");
}


/**
 * 初始化操作按钮
 */
function initOperateBtn(){
    // 新增部门
    $("body").on("click","#addDepartNodeBtn",addDepartNode);
    // 修改部门
    $("body").on("click","#editDepartNodeBtn",editDepartTreeNode);
    // 删除部门
    $("body").on('click',"#delDepartNodeBtn",delDepartTreeNode);
    // 刷新部门
    $("body").on('click',"#refreshDepartNodeBtn",refreshDepartTreeNode);
    // 移动部门
    $("body").on('click',"#moveDepartNodeBtn",modeDepartTreeNode);
    // 批量删除
    $("body").on('click',"#bathDelDepartNodeBtn",bathDelDepartTreeNode);



    // 新增用户
    $("body").on("click","#addBtn",addNewUser);
    // 批量删除用户
    $("body").on("click","#delBtn",doBatchDelUser);
    // 查询
    $("body").on("click","#searchBtn",searchGrid);
    // 刷新
    $("body").on("click","#refreshGridBtn",reloadCommonGrid);
    // 批量更换部门
    $("body").on("click","#userMoveBtn",batchUserMoveDepart);

}

/**
 * 刷新部门树节点
 */
function refreshDepartTreeNode(){
    hideRMenu();
    if(curNode == null){
        $.dialog.alert("请选择要刷新的部门");
        return ;
    }
    reloadDepartNodes(curNode.id);
}


/**
 * 新增部门
 */
function addDepartNode(){
    hideRMenu();
    if(curNode == null){
        $.dialog.alert("请选择父类");
        return;
    }
    // 隐藏右键菜单
    hideRMenu();
    // 若是多选，则只选中当前一个
    var location = curNode.location;
    location = parseInt(location);
    location++;
    var url = basePath + "/admin/auth/depart/edit.htm?item.parentId="+curNode.id;
    $.dialog.open(url,{
            title : "新增部门",
            width : "500px",
            height : "300px",
            lock : true
        }
    );
}

/**
 * 修改部门
 */
function editDepartTreeNode(){
    // 隐藏右键菜单
    hideRMenu();
    if(curNode == null){
        $.dialog.alert("请先选择要修改的部门");
        return;
    }
    $.dialog.open(
        basePath + "/admin/auth/depart/edit.htm?item.id="+curNode.id,{
            title : "修改部门",
            width : "500px",
            height : "300px",
            lock : true
        }
    );
}

/**
 * 删除部门树节点
 */
function delDepartTreeNode(){
    hideRMenu();
    if(curNode == null){
        $.dialog.alert("请选择部门");
        return;
    }

    //判断该部门下是否有用户
    var dataIds = $("#table").jqGrid("getRowData");
    if(null != dataIds && dataIds.length > 0){
        $.dialog.alert("请先将该部门下的人员转移到其他部门下再删除");
        return;
    }

    $.dialog.confirm("确定要删除此部门吗？",function(){
        $("body",parent.document).mask("正在删除，请稍后...");
        $.post(basePath + "/admin/auth/depart/del.htm?m=" + Math.random(),{"selIds":curNode.id},function(data){
            $("body",parent.document).unmask();
            if(data.status == "success"){
                var pid = curNode.parentId;
                //删除该节点
                zTree.removeNode(curNode);
                //判断当前节点下面是否还有节点
                var parentNode = zTree.getNodeByParam('id',pid);
                var nodes = zTree.getNodeByParam('parentId',pid, parentNode);
                if(null == nodes || nodes.length == 0){
                    //没有子节点了
                    zTree.selectNode(parentNode);
                    curNode = parentNode;
                    reloadDepartNodes(parentNode.id);
                }
            }else{
                $.dialog.alert(data.message);
            }
        },'json');
    });
}


/**
 * 用于对 Ajax 返回数据进行预处理的函数
 * @param {Object} treeId
 * @param {Object} parentNode
 * @param {Object} responseData
 */
function parseDepartTreeDataFilter(treeId,parentNode,responseData){
    var treeData = $.parseJSON(responseData.data);
    if(-1 ==topId){
        topId = treeData[0].id;
    }
    //初始化表格
    initTable(topId);
    searchGrid();
    return treeData;
}


/**
 * 单击部门树函数
 * @param {Object} event
 * @param {Object} treeId
 * @param {Object} treeNode
 */
function clickDepartTreeFN(event,treeId,treeNode){
    curNode = treeNode;
    //全部查询
    if(curNode != undefined && curNode.id != 0){
        $("#departId").val(curNode.id);
        //初始化表格
        initTable(curNode.id);
    }else{

        if(null != topId){
            //如果是顶级就给他传个不存在参数
            $("#departId").val(topId);
            //初始化表格
            initTable(topId);
        }else{
            //如果是顶级就给他传个不存在参数
            $("#departId").val(0);
            //初始化表格
            initTable(0);
        }

    }
    searchGrid();
    hideRMenu();
}

/**
 * 隐藏加载框
 */
function hideTipFN(){
    $("#loadTip").hide();

    if(curNode == null){
        var nodes = zTree.getNodes();
        zTree.selectNode(nodes[0]);
        curNode = nodes[0];
    }

}

/**
 * 加载树URL
 * @param {Object} treeId
 * @param {Object} treeNode
 */
function departTreeLoadUrl(treeId, treeNode) {
    return treeNode == null ? basePath + "/admin/auth/depart/list_depart_user.htm" : basePath + "/admin/auth/depart/list_depart_user.htm?pid="+treeNode.id;
}

/**
 * 右击菜单
 * @param {Object} event
 * @param {Object} treeId
 * @param {Object} treeNode
 */
function rightClickDepartTreeFN(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button"
        && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
        curNode = null;
    } else if (treeNode && !treeNode.noR) {
        // 暂时取消 右键选中 节点功能
        // curNode = treeNode;
        // zTree.selectNode(treeNode);
        /*if(treeNode.level==3){
            $.dialog.alert("只能新增到三级部门！");
            $("#delDepartNodeBtn").parent("li").hide();
            return;
        }*/
        if(treeNode.id == 0){
            //根节点
            $("#editNodeBtn,#delDepartNodeBtn").parent("li").hide();
        }else if(treeNode.isParent){
            $("#delDepartNodeBtn").parent("li").hide();
        }else{
            $("#editNodeBtn,#delDepartNodeBtn").parent("li").show();
        }

        showRMenu("node", event.clientX, event.clientY);
    }
}

/**
 * 刷新指定节点
 * @param {Object} id
 */
function reloadDepartNodes(id) {
    var node = zTree.getNodeByParam('id', id);
    if (node != null) {
        if(!node.isParent && "0" != node.id){
            node = zTree.getNodeByParam('id', node.parentId);
        }

        if (node.open) {
            zTree.reAsyncChildNodes(node, 'refresh');
        } else if(node.id == "0"){
            zTree.destroy();
            initDepartTree();
        }else {
            zTree.expandNode(node);
        }
    }
    hideRMenu();
}

/**
 * 新增用户
 */
function addNewUser(){
    var departId = $("#departId").val();

    var tv = {};
    tv.url = 'admin/auth/user/edit.htm?item.departId=' + departId;
    showTab(tv);
}


/**
 * 修改用户
 * @param {Object} id
 */
function updateUserFN(id){
    var tv = {};
    tv.url ='admin/auth/user/edit.htm?m='+Math.random()+'&item.id='+id;
    showTab(tv);
}

/**
 * 删除用户
 * @param {Object} id
 */
function removeUserFN(id){
    delUser(id);
}

/**
 * 批量删除用户
 */
function doBatchDelUser(){
    var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
    if(!selIds || selIds.length == 0){
        $.dialog.alert("请选择要删除的用户");
        return;
    }
    delUser(selIds.join(","));
}

/**
 * 删除用户
 * @param selIds
 */
function delUser(selIds){
    $.dialog.confirm("确认要删除吗？",function(){
        $("body").mask("正在删除，请稍后...");
        ajaxPOST(basePath + "/admin/auth/user/del.htm?m="+Math.random(),{"selIds":selIds},function(data){
            $("body").unmask();
            if(data.status != "success"){
                $.dialog.alert(data.message);
                return;
            }
            reloadCommonGrid();
        });
    });
}

/**
 * 操作用户状态函数
 * @param {Object} id
 * @param {Object} state
 */
function updateUserStateFN(id,state){
    ajaxPOST(basePath + "/admin/auth/user/updateState.htm?m=" + Math.random(),{"item.id":id,"item.state":state},function(item){
        reloadCommonGrid();
    });
}


/**
 * 设置操作按钮
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function optFormater(cellvalue,options,rowObject){
    var btns = [];
    var updateBtn = "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateUserFN('"+rowObject.id+"');return false;\">修改</a>";
    var stateBtn = null;
    if(rowObject.state==1){
        stateBtn = "<a href='javascript:;'  class='no_unl' title='禁用' onclick=\"updateUserStateFN('"+rowObject.id+"',0);return false;\">禁用</a>";
    }else{
        stateBtn = "<a href='javascript:;' class='no_unl' title='启用' onclick=\"updateUserStateFN('"+rowObject.id+"',1);return false;\">启用</a>";
    }
    var removeBtn = "<a href='javascript:;' class='no_unl' title='删除' onclick=\"removeUserFN('"+rowObject.id+"');return false;\">删除</a>";
    btns.push(updateBtn);
    btns.push(stateBtn);
    btns.push(removeBtn);
    return btns.join(" ");
}

/**
 * 状态格式化
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function stateFormater(cellvalue,options,rowObject){
    var str="";
    if(cellvalue == 1){
        str = "<font color='green'><span style='cursor:pointer' onclick='changeState(\""+rowObject.account+"\")'>正职</span></font>";
    }else if(cellvalue == 2){
        str = "<font color='red'><span style='cursor:pointer' onclick='changeState(\""+rowObject.account+"\")'>离职</span></font>";
    }else if(cellvalue == 3){
        str = "<font color='blue'><span style='cursor:pointer' onclick='changeState(\""+rowObject.account+"\")'>试用</span></font>";
    }else{
        str = "<font color='gray'><span style='cursor:pointer' onclick='changeState(\""+rowObject.account+"\")'>未知</span></font>";
    }
    return str;
}


function changeState(account) {
    $.dialog.open(basePath + "/admin/auth/user/changeState.htm?item.account="+account, {
        title: '修改状态',width:'320px',height:'150px',lock:true
    });
}

/**
 * 格式化性别
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function sexFormater(cellvalue,options,rowObject){
    var str = null;
    if(cellvalue == 1){
        str = "男";
    }else{
        str = "女";
    }
    return str;
}

/**
 * 显示快捷菜单
 * @param {Object} type
 * @param {Object} x
 * @param {Object} y
 */
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type == "root") {
        curNode = null;
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
    } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
    }
    rMenu.css({
        "top" : y + "px",
        "left" : x + "px",
        "visibility" : "visible"
    });

    $("body").bind("mousedown", onBodyMouseDown);
}

/** 隐藏右键菜单 */
function hideRMenu() {
    if (rMenu)rMenu.css({"visibility" : "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
}

/**
 * 重新设置宽度
 */
function resizeWidth(){
    var ww = $(window).width();
    var tw = document.getElementById("categoryTreeDiv").offsetWidth;
    var cw = ww - tw;
    $("#categoryContentDiv").width(cw);
    $("#table").setGridWidth(cw);
    $(".category-box").css('padding-left',tw);
}

/**
 * 隐藏右键菜单
 * @param {Object} event
 */
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({"visibility" : "hidden"});
    }
}

/**
 * 导入
 */
function doImport(){
    if($("#fileInput").val() == "" || $("#fileInput").val() == null){
        $.dialog.alert("请选择需要导入的文件");
        return;
    }
    $.ajaxFileUpload({
        url:basePath+'/admin/auth/user/import.htm',//用于文件上传的服务器端请求地址
        secureuri:false,//一般设置为false
        fileElementId:'fileInput',//文件上传空间的id属性 <input type="file" id="file" name="file" />
        dataType: 'json',//返回值类型一般设置为json
        success: function (data){ //服务器成功响应处理函数
            $("#fileInput").val("");
            if(data.status !== "SUCCESS"){
                $.dialog.alert("导入失败：" + data.message);
                return;
            }

            var importMsg = data.message;
            if(importMsg.length !== 0){
                $.dialog.alert(importMsg);
                return;
            }

            $.dialog.alert("导入成功");
            searchGrid();
            refreshDepartTreeNode();
        },
        error: function (data, status, e){//服务器响应失败处理函数
            $.dialog.alert("导入失败");
        }
    });
}


/**
 * 移动部门树节点
 */
function modeDepartTreeNode(){
    hideRMenu();
    if(curNode == null){
        $.dialog.alert("请选择要移动的部门");
        return ;
    }
    if(curNode.id=="0"){
        $.dialog.alert("请勿选择根部门");
        return ;
    }
    var location = curNode.location;
    var nodes = zTree.getSelectedNodes();
    var selIds = "";
    for(var i=0;i<nodes.length;i++){
        var id = nodes[i].id;
        //过滤根目录拼接选中id
        if(id!="0"){
            if(selIds == ""){
                selIds = id;
            }else{
                selIds += ","+id;
            }
        }
    }
    var url = basePath + "/admin/auth/depart/move.htm?selIds="+selIds+"&moveType=1";
    $.dialog.open(url,{
            title : "移动部门",
            width : "500px",
            height : "300px",
            lock : true
        }
    );
}

/**
 * 批量删除
 */
function bathDelDepartTreeNode(){
    hideRMenu();
    if(curNode == null){
        $.dialog.alert("请选择要批量删除的部门");
        return ;
    }
    if(curNode.id=="0"){
        $.dialog.alert("请勿选择根部门");
        return ;
    }
    var nodes = zTree.getSelectedNodes();
    var selIds = "";
    for(var i=0;i<nodes.length;i++){
        var id = nodes[i].id;
        //过滤根目录拼接选中id
        if(id!="0"){
            if(selIds == ""){
                selIds = id;
            }else{
                selIds += ","+id;
            }
        }
    }
    $.dialog.confirm("确定要批量删除所选部门吗？",function(){
        $("body",parent.document).mask("正在删除，请稍后...");
        $.post(basePath + "/admin/auth/depart/del.htm?m=" + Math.random(),{"selIds":selIds},function(data){
            $("body",parent.document).unmask();
            if(data.status == "success"){
                var pid = curNode.parentId;
                //删除该节点
                zTree.removeNode(curNode);
                //判断当前节点下面是否还有节点
                var parentNode = zTree.getNodeByParam('id',pid);
                var nodes = zTree.getNodeByParam('parentId',pid, parentNode);
                if(null == nodes || nodes.length == 0){
                    //没有子节点了
                    zTree.selectNode(parentNode);
                    curNode = parentNode;
                    reloadDepartNodes(parentNode.id);
                }
            }else{
                $.dialog.alert(data.message);
            }
        },'json');
    });
}

/**
 * 批量移动部门
 */
function batchUserMoveDepart(){

    if(curNode == null){
        $.dialog.alert("请选择部门筛选用户");
        return ;
    }
    var selIds = $("#table").jqGrid("getGridParam", "selarrrow");
    if(!selIds || selIds.length == 0){
        $.dialog.alert("请选择要移动部门的用户");
        return;
    }
    var url = basePath + "/admin/auth/depart/move.htm?selIds="+selIds.join(",")+"&moveType=2&oldDepartId="+curNode.id;
    $.dialog.open(url,{
            title : "移动部门",
            width : "500px",
            height : "300px",
            lock : true
        }
    );
}

/**
 * 格式化主管
 * @param {Object} cellvalue
 * @param {Object} options
 * @param {Object} rowObject
 */
function isManagerFormater(cellvalue,options,rowObject){
    var str = null;
    var newValue = "";
    if(cellvalue == 1){
        str = "是";
        newValue = 0;
    }else{
        str = "否";
        newValue = 1;
    }
    return "<a href='javascript:;' title='修改' class='no_unl' onclick=\"updateIsManager('"+rowObject.id+"',"+newValue+");return false;\">"+str+"</a>";
}

function updateIsManager(id,value){
    if(curNode == null||curNode.id=="0"){
        $.dialog.alert("请先选择左侧部门再设置主管");
        return ;
    }
    var confirMsg = "";
    if(value=="0"){
        confirMsg = "确定要取消该主管吗？";
    }else{
        confirMsg = "确定要设置为主管吗？";
    }
    $.dialog.confirm(confirMsg,function(){
        ajaxPOST(basePath + "/admin/auth/user/updateManager.htm?m="+Math.random(),{"item.id":id,"item.isManager":value,"item.departIds":curNode.id},function(data){
            $("body").unmask();
            if(data.status != "success"){
                $.dialog.alert(data.message);
                return;
            }
            reloadCommonGrid();
        });
    });
}

function makeNameIdChain(){
    $("body").mask("正在重新生成，请稍候...");
    $.post(basePath+"/admin/auth/depart/make_chain.htm",function(data){
        $("body").unmask();
        $.dialog.alert(data.message);
    });
}

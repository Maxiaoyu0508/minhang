<%@ page language="java" contentType="text/html; charset=utf-8"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
	<head>
		<title>操作权限</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp"></jsp:include>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"></jsp:include>
	</head>
	<body class="h">
	<div class="category-box clb">
		<div id="categoryTreeDiv" class="category-tree fl" >
			<div class="bg-caption">
				<span class="bgc-title">权限设置</span>
				<div class="sh-caption-div">
					<i class="tocer-icon-63 cz-icon"></i>
					<div class="scd-div" style="width:110px">
						<a id="addParentBtn"  href="javascript:void(0);">新增菜单</a>
						<a id="freshBtn"  href="javascript:void(0);">刷新</a>
					</div>
				</div>
			</div>
			<div id="treeDiv" class="depart-tree">
				<div class="min-height"></div>
				<ul id="categoryTree" class="ztree"></ul>
				<div id="loadTip" class="load-tip">
					<p>正在加载菜单</p>
					<p>…………</p>
				</div>
			</div>
		</div>
		<div id="categoryContentDiv" class="category-list fl pr" style="margin-top:-1px;border:1px solid #ddd;">
			<form id="saveForm" action="${ctxPath }/admin/auth/right/saveRight.htm" method="POST">
				<div class="welcome-right-title clb">
					<span class="ml10 fl" >菜单管理</span>
				</div>
				<input id="rightId" name="item.id" type="hidden"/>
				<input id="parentId" name="item.parentId" type="hidden"/>
				<table class="form-table ">
					<tr>
						<td style="height:0;width:12%"></td>
						<td style="height:0;width:40%"></td>
						<td style="height:0;width:48%"></td>
					</tr>
					<tr>
						<td class="form-title">
					  		菜单名称：
					  	</td>
						<td class="form-content">
							<input id="name" name="item.name" value="" class="tc-input-text w" type="text"/>
						</td>
						<td class="form-content"></td>
					</tr>
					<tr>
						<td class="form-title">
					  		提示文字：
					  	</td>
						<td class="form-content">
							<input id="tip" name="item.tip" value="" class="tc-input-text w" type="text"/>
						</td>
						<td class="form-content"></td>
					</tr>
					<tr>
						<td class="form-title">
					  		功能链接：
					  	</td>
						<td class="form-content">
							<input id="funUrl" name="item.url" value="" class="tc-input-text w" type="text"/>
						</td>
						<td class="form-content"></td>
					</tr>
					<tr>
						<td class="form-title">
							图标：
						</td>
						<td class="form-content" colspan="2">
							<div class="clb" style="height:160px;">
								<div class="container pb20" style="margin: 0">
									<section class="row" id="icons-new">
									  <div class="clb">
										  <div class="list-box">
										    <ul class="the-icons">
										      <li><i class="tocer-icon01"></i></li>
										      <li><i class="tocer-icon02"></i></li>
										      <li><i class="tocer-icon03"></i></li>
										      <li><i class="tocer-icon04"></i></li>
										      <li><i class="tocer-icon05"></i></li>
										      <li><i class="tocer-icon06"></i></li>
										      <li><i class="tocer-icon07"></i></li>
										      <li><i class="tocer-icon08"></i></li>
										      <li><i class="tocer-icon09"></i></li>
										      <li><i class="tocer-icon10"></i></li>
										      <li><i class="tocer-icon11"></i></li>
										      <li><i class="tocer-icon12"></i></li>
										      <li><i class="tocer-icon13"></i></li>
										      <li><i class="tocer-icon14"></i></li>
										      <li><i class="tocer-icon15"></i></li>
										      <li><i class="tocer-icon16"></i></li>
										      <li><i class="tocer-icon17"></i></li>
										      <li><i class="tocer-icon18"></i></li>
										      <li><i class="tocer-icon19"></i></li>
										      <li><i class="tocer-icon20"></i></li>
										      <li><i class="tocer-icon21"></i></li>
										      <li><i class="tocer-icon22"></i></li>
										      <li><i class="tocer-icon23"></i></li>
										      <li><i class="tocer-icon24"></i></li>
										      <li><i class="tocer-icon25"></i></li>
										      <li><i class="tocer-icon26"></i></li>
										      <li><i class="tocer-icon27"></i></li>
										      <li><i class="tocer-icon28"></i></li>
										      <li><i class="tocer-icon29"></i></li>
										      <li><i class="tocer-icon30"></i></li>
										      <li><i class="tocer-icon31"></i></li>
										      <li><i class="tocer-icon32"></i></li>
										      <li><i class="tocer-icon33"></i></li>
										    </ul>
										  </div>
									   </div> 
									</section>
								</div>
							</div>
							<input id="iconPath" name="item.iconPath" value="" type="hidden">
						</td>
					</tr>
					<tr>
						<td class="form-title">
					  		排序参数：
					  	</td>
						<td class="form-content">
							<input id="sort" name="item.sort" value="" class="tc-input-text w80" type="text"/>
							<span class="status-gray-666 ml5">注意：排序参数越小越靠前</span>
						</td>
						<td class="form-content"></td>
					</tr>
					<tr>
						<!-- <td class="form-content"></td>
						<td class="form-content" colspan="2">
							<a id="saveRightBtn" class="ui-button" style="margin:5px 0;width:85px;text-align:center;" href="javascript:void(0);" >保存修改</a>
						</td> -->
					</tr>
				</table>
				<div class="tip-div">
					<p class="tip-p">操作提示：</p>
					<p class="tip-p">1、右键单击左侧菜单项可对菜单项进行新增、修改、删除、刷新操作。</p>
				</div>
				<div class="clb fl ml5 mb5">
					<a id="save" class="ui-button blue-skin" style="width:80px;" onclick="submitForm();">保存</a>
				</div>
			</div>
			</form>
		</div>
		</div>
		<div id="rMenu" style="visibility: hidden; top: 130px; left: 89px;">
			<ul class="r-menu">
				<li class="bd bd_add"><a id="addNodeBtn"  href="javascript:void(0);">新增菜单</a></li>
				<li class="bd bd_add"><a id="editNodeBtn" href="javascript:void(0);">修改菜单</a></li>
				<li class="bd bd_delete"><a id="selNodeDelete" href="javascript:void(0);">删除菜单</a></li>
				<li class="bd bd_refresh"><a id="selNodeRefresh" href="javascript:void(0);">刷新菜单</a></li>
			</ul>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"></jsp:include>
		<script src="${ctxPath}/static/admin/auth/right_list.js?v=${sysVersion}"></script>
	</body>
</html>
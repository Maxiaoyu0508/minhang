<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>会员所属企业信息管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div id="categoryTreeDiv" class="category-tree fl" >
			<div class="bg-caption">
				<span class="bgc-title">会员企业</span>
			</div>
			<div id="treeDiv" class="depart-tree">
				<div class="min-height"></div>
				<ul id="categoryTree" class="ztree"></ul>
				<div id="loadTip" class="load-tip">
					<p>正在加载菜单</p>
					<p>…………</p>
				</div>
				<a id="addParentBtn" class="ui-button mt10" href="javascript:void(0);">新增菜单</a>
				<a id="freshBtn" class="ui-button mt10" href="javascript:void(0);">刷新</a>
			</div>
		</div>
		<div id="categoryContentDiv" class="category-list fl" style="margin-top:-1px;">
			<form id="saveForm" action="${ctxPath}/admin/member/company/saveMemberCompany.htm" method="post">
				<input id="itemId" name="item.id" value="${item.id}" type="hidden" />
				<input id="parentId" name="item.parentId" value="${item.parentId}" type="hidden"/>
				<input id="level" name="item.level" type="hidden"/>
				<table class="form-table">
					<caption>会员企业信息</caption>
					<tr>
						<td style="width:12%;height:0"></td>
						<td style="width:40%;height:0"></td>
						<td style="width:48%;height:0"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							企业名称：
						</td>
						<td class="form-content">
							<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-content"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							企业电话：
						</td>
						<td class="form-content">
							<input id="telephone" name="item.telephone" value="${item.telephone}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-content"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							企业地址：
						</td>
						<td class="form-content">
							<input id="address" name="item.address" value="${item.address}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-content"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							企业网址：
						</td>
						<td class="form-content">
							<input id="website" name="item.website" value="${item.website}" type="text" class="tc-input-text w" autocomplete="off" />
						</td>
						<td class="form-content"></td>
					</tr>
					
					<tr>
						<td class="form-title">
							是否叶节点：
						</td>
						<td class="form-content" >
							<div id="editLeaf">
								<label class="vm">
									<input name="item.isLeaf" value="0" type="radio"  /><span class="ml5">否</span>
								</label>
								<label class="ml20 vm">
									<input name="item.isLeaf" value="1" type="radio" /><span class="ml5">是</span>
								</label>
							</div>
							<div id="textLeaf" class="none">
								否
							</div>
						</td>
						<td class="form-content"></td>
					</tr>
					<tr>
						<td class="form-title">
					  		排序参数：
					  	</td>
						<td class="form-content">
							<input id="sort" name="item.sort" value="${item.sort }" class="tc-input-text w80" type="text"/>
							<span class="status-gray-666 ml5">注意：排序参数越小越靠前</span>
						</td>
						<td class="form-content"></td>
					</tr>
					<tr>
						<td class="form-content"></td>
						<td class="form-content" colspan="2">
							<a id="saveRightBtn" class="ui-button" style="margin:5px 0;width:85px;text-align:center;" href="javascript:void(0);" >保存修改</a>
						</td>
					</tr>
				</table>
			</form>
			<div class="tip-div">
				<p class="tip-p">操作提示：0000</p>
				<p class="tip-p">1、右键单击左侧菜单项可对菜单项进行新增、修改、删除、刷新操作。</p>
			</div>
		</div>
		<!-- <div class="category-list fl">
			<div class="oper mb3">
				<form id="searchForm">
					<a id="addBtn" class="ui-button fl mr5" href="javascript:void(0);">新增会员所属企业信息</a>
					<a id="batchDelBtn" class="ui-button fl mr5" href="javascript:void(0);">批量删除</a>
					<input id="searchKey" name="condition.name" value="" class="tc-input-text fl mr5 w200" type="text" placeholder="会员所属企业信息模糊查询"/>
					<a id="searchBtn" class="ui-button fl mr5" href="javascript:void(0);" >查询</a>
					<a id="refreshGridBtn" class="ui-button fl mr5" href="javascript:void(0);">刷新</a>
					<div class="cb"></div>
				</form>
			</div>
			<table id="table"></table>
			<div id="pagerBar"></div>
		</div> -->
		
		<div id="rMenu" style="visibility: hidden; top: 130px; left: 89px;">
			<ul class="r-menu">
				<li class="bd bd_add"><a id="addNodeBtn"  href="javascript:void(0);">新增菜单</a></li>
				<li class="bd bd_add"><a id="editNodeBtn" href="javascript:void(0);">修改菜单</a></li>
				<li class="bd bd_delete"><a id="selNodeDelete" href="javascript:void(0);">删除菜单</a></li>
				<li class="bd bd_refresh"><a id="selNodeRefresh" href="javascript:void(0);">刷新菜单</a></li>
			</ul>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/member/member_company_index.js?t=${sysVersion}"></script>
	</body>
</html>
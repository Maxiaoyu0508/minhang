<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>数据字典</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<style type="text/css">
			.oper-box{padding:1px 0;}
			.content-menu-box{padding-left:190px;}
			.lmb-ul li{width:100%;box-sizing: border-box;}
			.sh-caption-div:hover .scd-div{display: block;position: absolute;left: 70px;background: #fff;width: 100px;z-index: 1000;box-shadow: 0 0 10px rgba(0,0,0,.1);border-radius: 3px;top: 30px;}
			.sh-caption-div .scd-div a.cur{background: #ecf6fd;color: #0983f5;border-radius: 2px;}
			.sh-caption-div .scd-div a{display: block;padding: 3px 10px;}
			#categoryTreeDiv{width:190px;}
		</style>
	</head>
	<body class="iframe-body content-menu-box category-box">
			<div class="left-menu-box" id="categoryTreeDiv">
				<div class="lmb-title sh-caption-div">数据名称<i class="tocer-icon-63 cz-icon"></i>
					<div class="scd-div" style="left: 89px;">
						<a class="cur" href="javascript:void(0);" onclick="toAddDict();">新增数据名称</a>
						<a id="changeId" href="javascript:void(0);" onclick="toUpdateDict();">修改数据名称</a>
						<a id="delId" href="javascript:void(0);" onclick="delDict();">删除数据名称</a>
					</div>
				
				</div>
				 <ul class="lmb-ul" id="globalDict">
					<c:forEach var="item" items="${sysDictList }" varStatus="status">
						<c:choose>
							<c:when test="${status.index==0}">
								<li data-id="${item.id}" id="${item.id}" class="cur" onclick="changeSelect(${item.id});" value="${item.id }">${item.name }</li>
							</c:when>
							<c:otherwise>
								<li data-id="${item.id}"  onclick="changeSelect(${item.id});"  id="${item.id}"  value="${item.id }">${item.name }</li>
							</c:otherwise>
						</c:choose>
					</c:forEach>
				</ul> 
			</div>
			<div id="categoryContentDiv" class="right-menu-box">
				<div class="form-border-box">
					<div class="welcome-right-title clb">
						<span class="ml10 fl wrt-font-title" ><i class="tocer-icon10"></i>数据字典</span>
						<div class="clb oper-box">
							<form id="searchForm">
								<a class="ui-button blue-skin" href="javascript:void(0);" onclick="toAddDictItem();">新增数据项</a>
								<a id="batchDelBtn" class="ui-button green-skin" href="javascript:void(0);" onclick="doBatchDel();return false;">批量删除</a>
								<a class="ui-button green-skin" href="javascript:refreshGrid();">刷新</a>
								<div class="cb"></div>
							</form>
						</div>
					</div>
					  <%-- <table class="form-table" style="margin:0">
						<tr>
							<td style="width:10%;height:0"></td>
							<td style="width:90%;height:0"></td>
						</tr>
						<tr>
							<td class="form-title">
								数据名称：
							</td>
							<td class="form-content">
								<div class="tc-select-div w150 fl">
								<select id="globalDict" class="w" onchange="changeSelect();return false;">
									<c:forEach var="item" items="${sysDictList }">
										<option value="${item.id }">${item.name }</option>
									</c:forEach>
								</select>
								</div>
								
							</td>
							<!-- <td class="form-content"></td> -->
						</tr>
					</table>   --%>
				</div>
				<table id="table"></table>
				<div id="pagerBar"></div>
			</div>
			<core:token />
			
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_dict_list.js?t=${sysVersion}"></script>
	</body>
</html>
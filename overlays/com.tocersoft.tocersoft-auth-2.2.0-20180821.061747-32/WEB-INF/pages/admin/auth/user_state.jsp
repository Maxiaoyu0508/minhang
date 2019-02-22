<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html style="background:#fff;">
	<head>
		<title>项目计划-查看详细</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<style type="text/css">
			.type-spa{margin-left:8px;font-size:14px;color:#000;}
			.client-type li{padding:6px 0;}
			.client-type li label{width:90px;}
			.expl-dix{width:360px;}
		</style>
	</head>
	<body class="iframe-body" >
		<div class="">
		<form id="saveForm" action="${ctxPath}/admin/auth/user/updateState.htm" method="post">
			<!--李宁0128批量删除<core:token/>标签避免重复提交提醒-->
			<input name="item.id" value="${item.id}" type="hidden" />
			<ul class="client-type w">
				<li class="clb">
					<label class="clb mr10 fl">
						<div class="iradio_flat-blue fl" style="position: relative;"><input <c:if test="${item.state == 1}">checked</c:if> name="item.state" value="1" class="mt2 fl mr5" type="radio" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
						<span class="type-spa fl">正职</span>
					</label>
				</li>
				<li class="clb">
					<label class="clb mr10 fl">
						<div class="iradio_flat-blue fl" style="position: relative;"><input <c:if test="${item.state == 2}">checked</c:if> name="item.state" value="2" class="mt2 fl mr5" type="radio" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
						<span class="type-spa fl">离职</span>
					</label>
				</li>
				<li class="clb">
					<label class="clb mr10 fl">
						<div class="iradio_flat-blue fl" style="position: relative;"><input <c:if test="${item.state == 3}">checked</c:if> name="item.state" value="3" class="mt2 fl mr5" type="radio" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
						<span class="type-spa fl">试用</span>
					</label>
				</li>
			</ul>
		</form>
		<div class="clb mt15 ">
			<a id="saveBtn" class="ui-button blue-skin mr10 fr" href="javascript:void(0);">保存</a>
			<a id="exitBtn" class="ui-button white-skin mr5 fr" href="javascript:void(0);">关闭</a>
		</div>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
		<script type="text/javascript" src="${ctxPath}/static/admin/auth/user_state.js?v=${sysVersion}"></script>
	</body>
</html>
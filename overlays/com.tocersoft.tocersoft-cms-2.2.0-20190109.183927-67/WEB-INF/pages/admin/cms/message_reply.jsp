<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!doctype html >
<html>
	<head>
		<base href="${ctxPath}">
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<meta name="robots" content="all" />
		<title>回复-站内信</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<div class="oper-bar mb5">
			<a id="saveBtn" class="ui-button" href="javascript:void(0);">保存</a>
		</div>
		<c:if test="${item.status == 0}">
			<form id="messageForm" action="${ctxPath}/admin/cms/message/isReply.htm" method="post">
				<table class="form-table ">
						<input id="itemId" name="item.id" value="${item.id}" type="hidden"/>
						<tr>
							<td class="form-title w100">
								<em>*</em>回复：
							</td>
							<td class="form-content">
								<textarea id="replyContent" name="item.replyContent"  class="tc-textarea w500 h100">${item.replyContent}</textarea>
							</td>
							<td class="form-content">
								<div id="replyContentTip"></div>
							</td>
						</tr>
						<tr>
						
						</tr>
				</table>
			</form>
			
		</c:if>
		<div class="info-main">
			<div class="message-person">
				<c:if test="${item.status == null || item.status == 0}">
				<div class="msg-status fl no-reply">未处理</div>
				</c:if>
				<c:if test="${item.status == 1}">
				<div class="msg-status fl yes-reply">已处理</div>
				</c:if>
				<div class="msg-person-info fl">
					<span class="ml20">留言人：${item.createName }</span>
					<span class="ml20">留言时间：
						<fmt:formatDate value="${item.createDate }" pattern="yyyy-MM-dd HH:mm"/>
					</span>
					<c:choose>
						<c:when test="${item.messageTypeName eq '投诉建议'}"><span class="ml20">订单编号：${item.orderNo}</span></c:when>
						<c:when test="${item.messageTypeName eq '商品咨询'}"><span class="ml20">商品编号：${item.productNo}</span></c:when>
						<c:when test="${item.messageTypeName eq '预约设计'}">
							<span class="ml20">手机：${item.mobile}</span>
							<span class="ml20">地区：${item.provinceCity}-${item.address}</span>
						</c:when>
					</c:choose>
				</div>
				<div class="cb"></div>
			</div>
			<c:if test="${item.messageTypeName eq '预约设计'}">
				<div class="message-person">
					<div class="msg-person-info fl">
						<span class="ml20">住房面积：${item.housingAreaName}</span>
						<span class="ml20">户型：${item.housingTypeName}</span>
						<span class="ml20">设计风格：${item.designStyleName}</span>
						<span class="ml20">预算：<fmt:formatNumber value="${item.budget}"  type="currency" pattern="#万"/></span>
					</div>
					<div class="cb"></div>
				</div>
				<div>
					<div class="msg-imgDIV">
						<div class="msg-imgBox">
							<c:if test="${not empty item.houseTypeImgOne}">
								<a href="javascript:downImg('${item.houseTypeImgOne}')"><img  src="${item.houseTypeImgOne}"></a>
							</c:if>
						</div>
					</div>
					<div class="msg-imgDIV">
						<div class="msg-imgBox">
							<c:if test="${not empty item.houseTypeImgTwo}">
							<a href="javascript:downImg('${item.houseTypeImgTwo}')" ><img  src="${item.houseTypeImgTwo}"></a>
							</c:if>
						</div>
					</div>
					<div class="msg-imgDIV">
						<div class="msg-imgBox">
							<c:if test="${not empty item.houseTypeImgTri}">
							<a href="javascript:downImg('${item.houseTypeImgTri}')" ><img  src="${item.houseTypeImgTri}"></a>
							</c:if>
						</div>
					</div>
					<div class="msg-imgDIV">
						<div class="msg-imgBox">
							<c:if test="${not empty item.houseTypeImgFour}">
							<a href="javascript:downImg('${item.houseTypeImgFour}')" ><img  src="${item.houseTypeImgFour}"></a>
							</c:if>
						</div>
					</div>
					<div class="msg-imgDIV">
						<div class="msg-imgBox">
							<c:if test="${not empty item.houseTypeImgFive}">
							<a href="javascript:downImg('${item.houseTypeImgFive}')" ><img src="${item.houseTypeImgFive}"></a>
							</c:if>
						</div>
					</div>
					<div class="cb"></div>
				</div>
			</c:if>
			<div class="message-content">
				${item.content}
			</div>
		</div>
		<c:if test="${item.status == 1}">
				<div class="info-main mt10">
					<div class="message-person">
						<div class="msg-status fl yes-reply">回复</div>
						<div class="msg-person-info fl">
							<span class="ml20">回复人：${item.replyName}</span>
							<span class="ml20">回复时间：<fmt:formatDate value="${item.replyDate}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
						</div>
						<div class="cb"></div>
					</div>
					<div class="message-content">
						${item.replyContent}
					</div>
				</div>
		</c:if>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script src="${ctxPath}/static/admin/cms/message_reply.js"></script>
	</body>
</html>























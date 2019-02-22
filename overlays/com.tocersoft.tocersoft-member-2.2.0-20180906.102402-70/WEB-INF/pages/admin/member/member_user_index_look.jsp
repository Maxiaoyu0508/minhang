<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
	<head>
		<title>会员基本信息查看</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<style>
			.imageUrl img{max-width:200px;max-height:130px;vertical-align: middle;}
			.imageUrl{display:table-cell;width:200px;height:130px;text-align: center;vertical-align: middle;border: 1px solid #ddd;}
		</style>
	</head>
	
	<body class="iframe-body">
	<a class="ui-button" href="${ctxPath}/admin/member/index.htm">关闭</a>
		<table class="form-table">
				<tr>
					<td class="form-title" width="25%">
						会员账号：
					</td>
					<td class="form-content" width="50%">
						${member.account}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				
				<tr>
					<td class="form-title" width="25%">
						会员手机号：
					</td>
					<td class="form-content" width="50%">
						${member.mobile}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						邮箱 ：
					</td>
					<td class="form-content" width="50%">
					${member.email}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				
				<tr>
					<td class="form-title" width="25%">
						会员角色：
					</td>
					<td class="form-content"  width="50%">
						<c:forEach items="${memberRole}" var="role">
							${role.name}
						</c:forEach>
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						会员姓名：
					</td>
					<td class="form-content"   width="50%">
					${member.name}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						会员昵称：
					</td>
					<td class="form-content"  width="50%">
					${member.nickName}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						会员性别：
					</td>
					<td class="form-content"  width="50%">
						${member.sex}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						一句话简介：
					</td>
					<td class="form-content"  width="50%">
						${member.descBrief}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						会员详细描述：
					</td>
					<td class="form-content"  width="50%">
						${member.desc}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						会员QQ：
					</td>
					<td class="form-content"  width="50%">
						${member.qq}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						会员微信号：
					</td>
					<td class="form-content"  width="50%">
						${member.wechat}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						其他联系方式：
					</td>
					<td class="form-content"  width="50%">
						${member.contactOther}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						地址：
					</td>
					<td class="form-content"  width="50%">
						${member.address}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						备注描述：
					</td>
					<td class="form-content" width="50%">
						${member.remark}
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr> 
			 <c:if test="${not empty member.company}">
				<tr>
					<td class="form-title" width="25%">
						企业名称：
					</td>
					<td class="form-content" width="50%">
						${memberCompany.name }
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						企业网址：
					</td>
					<td class="form-content" width="50%">
						${memberCompany.address }
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						组织结构代码证：
					   (社会信用代码证)
					</td>
					<td class="form-content" width="50%">
						${memberCompany.organCode }				
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						组织结构代码证：
					</td>
					<td class="form-content" width="50%">
						<div class="imageUrl">
							<c:if test="${not empty memberCompany.organCodeUrl }">
								<c:if test="${uploadType eq 'oss'}">
									<img src="${aliyunOssFileAccessUrl}${memberCompany.organCodeUrl }"/>	
								</c:if>
								<c:if test="${uploadType ne 'oss'}">
									<img src="${ctxPath}${fileRoot}${memberCompany.organCodeUrl }"/>	
								</c:if>	
							</c:if>
							<c:if test="${empty memberCompany.organCodeUrl }">
								<img src=""/>
							</c:if>
						</div>		
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						营业执照：
					</td>
					<td class="form-content" width="50%">
						<div class="imageUrl">
							<c:if test="${not empty memberCompany.businessLicenseUrl }">
								<c:if test="${uploadType eq 'oss'}">
									<img src="${aliyunOssFileAccessUrl}${memberCompany.businessLicenseUrl }"/>	
								</c:if>
								<c:if test="${uploadType ne 'oss'}">
									<img src="${ctxPath}${fileRoot}${memberCompany.businessLicenseUrl }"/>	
								</c:if>	
							</c:if>
							<c:if test="${empty memberCompany.businessLicenseUrl }">
								<img src=""/>
							</c:if>
						</div>
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
				<tr>
					<td class="form-title" width="25%">
						税务登记证书：
					</td>
					<td class="form-content" width="50%">
						<div class="imageUrl">
							<c:if test="${not empty memberCompany.taxRegistUrl }">
								<c:if test="${uploadType eq 'oss'}">
									<img src="${aliyunOssFileAccessUrl}${memberCompany.taxRegistUrl }"/>	
								</c:if>
								<c:if test="${uploadType ne 'oss'}">
									<img src="${ctxPath}${fileRoot}${memberCompany.taxRegistUrl }"/>	
								</c:if>
							</c:if>
							<c:if test="${empty memberCompany.taxRegistUrl }">
								<img src=""/>
							</c:if>	
						</div>		
					</td>
					<td class="form-content" width="25%">
					</td>
				</tr>
			</c:if> 
			</table>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
	</body>
</html>
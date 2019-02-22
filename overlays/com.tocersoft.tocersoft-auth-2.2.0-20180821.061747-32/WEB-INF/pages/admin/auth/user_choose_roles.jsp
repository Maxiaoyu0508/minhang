<%@ page language="java" pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="s" uri="/struts-tags" %> --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- 该页面为片段页面 --%>
<style type="text/css">
	li.mr10 input {
		margin-right:2px;
	}
</style>
<div class="p10" id="roleListDv">
<ul style="width:330px;">
<%-- 	<s:iterator value="roleList" var="role">
	</s:iterator> --%>
	<c:forEach items="${roleList}" var="role" >
		<li class="fl mr10" style="width:100px">
			<input value="${role.id}" type="checkbox" />
			${role.name}
		</li>
	</c:forEach>
</ul>
</div>
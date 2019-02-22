<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%-- <%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="dv" uri="/WEB-INF/tags/default_value.tld"%> --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>添加或修改模板模板</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
	</head>
	<body class="iframe-body">
		<form action="${ctxPath}/admin/email/saveOrUpdateTemplate.htm" id="templateForm" method="post">
			<input type="hidden" name="emailTemplate.id" id="emailTemplateId" value="${emailTemplate.id }" />
			<a class="ui-button blue-skin mt10 mb10" style="width:100px;" href="javascript:void(0);" id="saveConfig">保存</a>
			<textarea id="content" name="emailTemplate.content" style="height:550px;">${emailTemplate.content }</textarea>
		</form>
		
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.config.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.all.min.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/lang/zh-cn/zh-cn.js?t=${sysVersion}"></script>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript">
			var editor = null;
			$(function(){
				editor = UE.getEditor('content', {
					toolbars: [
			           ['source','fullscreen', 'undo', 'redo'],
			           ['bold', 'fontsize','forecolor', 'backcolor','inserttable','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'underline', 'strikethrough',  'removeformat', 'formatmatch', 'autotypeset', 'insertimage', 'pasteplain', '|','insertvideo']
			       ],
				    autoHeightEnabled: true,
				    autoFloatEnabled: true
				});  
				//异步表单提交设置
			    $('#templateForm').ajaxForm({
			        dataType: 'json',
			        success: function(data) {
			        	if(data.status = 'success'){
			        		$.dialog.alert('保存成功');
			        	}else if(data.status = 'error'){
			        		$.dialog.alert('保存失败');
			        	}
			        }
			    });
				initClicks();
					
			});
			function initClicks()
			{
				$("#saveConfig").on("click",saveEmail);
			}
			function saveEmail()
			{
				editor.sync();
				$("#templateForm").submit();
			}
		</script>
	</body>
</html>
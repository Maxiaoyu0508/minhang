<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%-- <%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="dv" uri="/WEB-INF/tags/default_value.tld"%> --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <base href="${ctxPath}"/>
    <title>邮件服务器配置</title>
    <jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
</head>
<body class="iframe-body">
<div class="form-border-box">
    <form id="configForm" action="${ctxPath}/admin/email/saveConfig.htm" method="post">
        <div class="welcome-right-title clb">
            <span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>邮件服务器配置</span>
            <div class="oper-box">
                <a id="saveConfigBtn" class="ui-button blue-skin" style="width:80px;">保存</a>
            </div>
        </div>
        <table class="form-table">
            <%-- <caption>
                邮件服务器配置
            </caption> --%>
            <tr>
                <td class="form-title" width="15%">
                    <em>*</em>邮箱服务器（SMTP）：
                </td>
                <td class="form-content" width="30%">
                    <input id="hostName" name="serverConfig.hostName" value="${serverConfig.hostName }"
                           class="tc-input-text w" type="text"/>
                </td>
                <td class="form-content" width="55%">
                    <span class="status-gray">1、类似于mail.tocersoft.com或者smtp.163.com；2、确保邮箱设置中开启POP3/SMTP服务</span>
                </td>
            </tr>
            <tr>
                <td class="form-title" width="12%">
                    <em>*</em>发件人名称：
                </td>
                <td class="form-content" width="30%">
                    <input id="fromName" name="serverConfig.fromName" value="${serverConfig.fromName }"
                           class="tc-input-text w" type="text"/>
                </td>
                <td class="form-content" width="58%">
                    <span id="fromNameTip"></span>
                </td>
            </tr>
            <tr>
                <td class="form-title" width="12%">
                    <em>*</em>邮箱帐号：
                </td>
                <td class="form-content" width="30%">
                    <input id="account" name="serverConfig.account" value="${serverConfig.account }"
                           class="tc-input-text w" type="text"/>
                </td>
                <td class="form-content" width="58%">
                    <span class="status-gray">类似于test@163.com</span>
                </td>
            </tr>
            <tr>
                <td class="form-title" width="12%">
                    <em>*</em>密码：
                </td>
                <td class="form-content" width="30%">
                    <input id="password" name="serverConfig.password" value="${serverConfig.password }"
                           class="tc-input-text w" type="password"/>
                </td>
                <td class="form-content" width="58%">
                    <span id="passwordTip"></span>
                </td>
            </tr>
        </table>
        <!-- <div class="oper mt5">
            <a class="ui-button" style="width:129px;" href="javascript:void(0);" id="saveConfig">保存</a>
        </div> -->
    </form>
</div>
<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
<script type="text/javascript" src="${ctxPath}/static/admin/system/sys_email_config.js?t=${sysVersion}"></script>
</body>
</html>
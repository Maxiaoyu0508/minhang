<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>保存页面模板</title>
    <jsp:include page="/WEB-INF/pages/admin/base/admin_meta_inc.jsp" />
    <jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
</head>
<body class="iframe-body">
<div id="errorlist" class="prompt_box mb5"></div>
<div class="form-border-box clb">
    <div class="welcome-right-title">
        <span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>编辑页面模板</span>
        <div class="clb oper-box">
            <a onclick="saveCmsTemplate();" class="ui-button blue-skin" href="javascript:void(0);">保存</a>
            <a onclick="closeWin();" class="ui-button white-skin" href="javascript:void(0);">关闭</a>
        </div>
    </div>
    <form id="saveForm" action="${ctxPath}/admin/cms/template/saveCmsTemplate.htm" method="post">
        <core:token/>
        <input name="item.id" value="${item.id}" type="hidden" />
        <table class="form-table">
            <tr>
                <td style="width:20%;height:0"></td>
                <td style="width:40%;height:0"></td>
                <td style="width:40%;height:0"></td>
            </tr>

            <tr>
                <td class="form-title">
                    模板名称：
                </td>
                <td class="form-content">
                    <input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w" autocomplete="off" />
                </td>
                <td class="form-content"></td>
            </tr>

            <tr>
                <td class="form-title">
                    模板代号：
                </td>
                <td class="form-content">
                    <input id="code" name="item.code" value="${item.code}" type="text" class="tc-input-text w" autocomplete="off" />
                </td>
                <td class="form-content"></td>
            </tr>

            <tr>
                <td class="form-title">
                    模板类型：
                </td>
                <td class="form-content">
                    <label class="fl mr10">
                        <input name="item.type" value="1" class="mt2 fl mr5" <c:if test="${item.type == 1  || empty item.type}">checked</c:if> type="radio"/>
                        <span class="">栏目</span>
                    </label>
                    <label class="fl mr10">
                        <input name="item.type" value="2" class="mt2 fl mr5" <c:if test="${item.type == 2 }">checked</c:if> type="radio"/>
                        <span class="">文章</span>
                    </label>
                </td>
                <td class="form-content"></td>
            </tr>

            <tr>
                <td class="form-title">
                    页面链接：
                </td>
                <td class="form-content">
                    <input id="path" name="item.path" value="${item.path}" type="text" class="tc-input-text w" autocomplete="off" />
                </td>
                <td class="form-content"></td>
            </tr>

        </table>
    </form>
</div>
<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp" />
<script type="text/javascript" src="${ctxPath}/static/admin/cms/cms_template_add.js?v=${sysVersion}"></script>
</body>
</html>
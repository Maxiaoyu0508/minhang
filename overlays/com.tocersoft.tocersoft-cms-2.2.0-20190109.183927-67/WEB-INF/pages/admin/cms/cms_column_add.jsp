<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="http://www.tocersoft.com/jsp/tags/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}"/>
		<title>新增专栏</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp"/>
	</head>
	<body class="iframe-body">
		<span class="fl clb mb3">
			<a id="returnBtn" class="ui-button" href="${ctxPath}/admin/cms/column/index.htm">返回专题列表</a>
			<a id="saveBtn" class="ui-button" style="width:70px;" href="javascript:void(0);">保存</a>
		</span>
		<form id="saveForm" action="${ctxPath}/admin/cms/column/saveCmsColumn.htm" method="post">
			<core:token/>
			<input id="itemId" name="item.id" value="${item.id}" type="hidden" />
			<table class="form-table">
				<tr>
					<td style="width:12%;height:0"></td>
					<td style="width:24%;height:0"></td>
					<td style="width:12%;height:0"></td>
					<td style="width:24%;height:0"></td>
					<td style="width:12%;height:0"></td>
					<td style="width:24%;height:0"></td>
				</tr>
				<tr>
					<td class="form-title">
						专栏名称：
					</td>
					<td class="form-content" colspan="3">
						<input id="name" name="item.name" value="${item.name}" type="text" class="tc-input-text w"/>
					</td>
					<td class="form-title">
						排序：
					</td>
					<td class="form-content">
						<input id="sort" name="item.sort" value="${item.sort}" type="text" class="tc-input-text w"/>
					</td>
				</tr>
				
				<tr>
					<td class="form-title" rowspan="2">
						专栏简介：
					</td>
					<td class="form-content" colspan="3" rowspan="2">
						<textarea id="descBrief" name="item.descBrief" class="tc-textarea w" style="height:30px;">${item.descBrief}</textarea>
					</td>
					<td class="form-title">
						是否精华：
					</td>
					<td class="form-content">
						<label class="fl clb mr10">
							<input name="item.isBest" value="0" type="radio" class="fl mt3" <c:if test="${empty item.isBest}">checked</c:if> <c:if test="${item.isBest eq 0}">checked</c:if>/>
							<span class="fl ml5">否</span>
						</label>
						<label class="fl clb">
							<input name="item.isBest" value="1" type="radio" class="fl mt3" <c:if test="${item.isBest eq 1}">checked</c:if>/>
							<span class="fl ml5">是</span>
						</label>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						是否推荐：
					</td>
					<td class="form-content">
						<label class="fl clb mr10">
							<input name="item.isRecommend" value="0" type="radio" class="fl mt3" <c:if test="${empty item.isRecommend}">checked</c:if> <c:if test="${item.isRecommend eq 0}">checked</c:if>/>
							<span class="fl ml5">否</span>
						</label>
						<label class="fl clb">
							<input name="item.isRecommend" value="1" type="radio" class="fl mt3" <c:if test="${item.isRecommend eq 1}">checked</c:if>/>
							<span class="fl ml5">是</span>
						</label>
					</td>
				</tr>
				<tr>
					<td class="form-title">
						专栏标签：
					</td>
					<td class="form-content" style="padding:0 5px;" colspan="3">
						<select id="gjc" name="item.tagList" multiple="true" style="width:100%" data-placeholder="选择业务类型【中文】"> 
						    <c:forEach items="${cmsTagList}" var="tag">
						   		 <option value="${tag.id }" <c:if test="${fn:indexOf(item.tagList,tag.id) >= 0}">selected</c:if>>${tag.name }</option>
						    </c:forEach>
						</select>
					</td>
					<td class="form-title">
						是否最新：
					</td>
					<td class="form-content">
						<label class="fl clb mr10">
							<input name="item.isNew" value="0" type="radio" class="fl mt3" <c:if test="${empty item.isNew}">checked</c:if> <c:if test="${item.isNew eq 0}">checked</c:if>/>
							<span class="fl ml5">否</span>
						</label>
						<label class="fl clb">
							<input name="item.isNew" value="1" type="radio" class="fl mt3" <c:if test="${item.isNew eq 1}">checked</c:if>/>
							<span class="fl ml5">是</span>
						</label>
					</td>
				</tr>
			</table>
		<div class="tab-div mt3 mb3">
			<a id="gameItem" class="tab-btn J-tab-sub" href="javascript:void(0);">专栏介绍</a>
			<a id="columPhoto" class="tab-btn J-tab-sub" href="javascript:void(0);" >列表图片</a>
			<a id="gameEnroll" class="tab-btn J-tab-sub" href="javascript:void(0);">动态报道</a>
			<a id="addPurchase" class="tab-btn J-tab-sub" href="javascript:void(0);">安拓推荐</a>
			<a id="webDetail" class="tab-btn J-tab-sub" href="javascript:void(0);">相关资讯</a>
			<a id="webPhoto" class="tab-btn J-tab-sub" href="javascript:void(0);">大家看法</a>
			<a id="WebProduct" class="tab-btn J-tab-sub" href="javascript:void(0);" >相关案例</a>
		</div>
		
		<div class="tab-sub-content-div">
			<div class="tab-btn-content J-tab-sub-content">
				<div class="art-content">
					<textarea id="descHtml" name="item.descHtml" class="ui_textarea h300">${item.descHtml}</textarea>
				</div>
			</div>
			
			<div class="tab-btn-content J-tab-sub-content hide">
				<div class="caption-div"><span class="">专栏列表图片</span></div>
				<div id="tcPhotoList" class="adv-photo-list">
					<div class="mr20 fl">
						<a href="javascript:void(0);" class="adv-photo" style="color:#666;font-size:16px;text-decoration:none;">
							<c:if test="${uploadType eq 'oss'}">
								<img id="showImg" alt="选择图片" src="${aliyunOssFileAccessUrl}${item.photoUrl}"/>
							</c:if>
							<c:if test="${uploadType ne 'oss'}">
								<img id="showImg" alt="选择图片" src="${ctxPath}${fileRoot}${item.photoUrl}"/>
							</c:if>
							<input id="fileInput" name="uploadFile" type="file" class="image-upload" onchange="doUploadFile();"/>
						</a>
						<input id="imgPath" name="item.photoUrl" value="${item.photoUrl}" type="hidden"/>
					</div>
					<div class="cb"></div>
				</div>
				<div style="margin:10px 0 0 10px;">注意：上传图片后需要点击保存才能将图片保存在专栏中</div>
			</div>
			
			<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
				<div class="oper mb3">
					<a class="ui-button fl mr5 delGameEnroll" style="width:82px;text-align:center;" href="javascript:void(0);">批量移除</a>
					<a class="ui-button fl mr5 chooseArticle" style="width:82px;text-align:center;" href="javascript:void(0);">选择文章</a>
				</div>
				<table id="table1"></table>
				<div id="pagerBar1"></div>
			</div>
			<div class="tab-btn-content J-tab-sub-content">
				<div class="oper mb3">
					<a class="ui-button fl mr5 delGameEnroll" style="width:82px;text-align:center;" href="javascript:void(0);">批量移除</a>
					<a class="ui-button fl mr5 chooseArticle" style="width:82px;text-align:center;" href="javascript:void(0);">选择文章</a>
				</div>
				<table id="table2"></table>
				<div id="pagerBar2"></div>
			</div>
			<div class="tab-btn-content J-tab-sub-content hide">
				<div class="oper mb3">
					<a class="ui-button fl mr5 delGameEnroll" style="width:82px;text-align:center;" href="javascript:void(0);">批量移除</a>
					<a class="ui-button fl mr5 chooseArticle" style="width:82px;text-align:center;" href="javascript:void(0);">选择文章</a>
				</div>
				<table id="table3"></table>
				<div id="pagerBar3"></div>
			</div>
			<div class="tab-btn-content J-tab-sub-content hide">
				<div class="oper mb3">
					<a class="ui-button fl mr5 delGameEnroll" style="width:82px;text-align:center;" href="javascript:void(0);">批量移除</a>
					<a class="ui-button fl mr5 chooseArticle" style="width:82px;text-align:center;" href="javascript:void(0);">选择文章</a>
				</div>
				<table id="table4"></table>
				<div id="pagerBar4"></div>
			</div>
			<div class="tab-btn-content J-tab-sub-content hide">
				<div class="oper mb3">
					<a class="ui-button fl mr5 delGameEnroll" style="width:82px;text-align:center;" href="javascript:void(0);">批量移除</a>
					<a class="ui-button fl mr5 chooseArticle" style="width:82px;text-align:center;" href="javascript:void(0);">选择文章</a>
				</div>
				<table id="table5"></table>
				<div id="pagerBar5"></div>
			</div>
		</div>
		</form>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript">var currentTabIndex = '${currentTabIndex}';</script>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.config.js?t=${sysVersion}"></script>
		<script src="http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/lang/zh-cn/zh-cn.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/admin/cms/cms_column_add.js?t=${sysVersion}" type="text/javascript"></script>
	</body>
</html>
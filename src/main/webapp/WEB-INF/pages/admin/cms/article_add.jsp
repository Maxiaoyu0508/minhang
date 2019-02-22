<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<base href="${ctxPath}" />
		<title>文章管理</title>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_css_inc.jsp" />
		<!-- 引入tag editor标签 -->
		<link rel="stylesheet" href="${ctxPath}/static/base/lib/tageditor/jquery.tag-editor.css" />

		<style>
			.article-photo-list{padding:15px;border:1px solid #CCC;margin:1px 1px 0 0}
			.article-photo img{max-width:220px;max-height:150px;vertical-align:middle;font-size:16px}
			.article-photo-item{display:inline-block;padding:10px;width:220px;height:215px;overflow:hidden;position:relative}
			.article-photo-item-btn{display:inline-block;margin:10px;cursor:pointer;border:1px solid #999}
			.article-photo-list .select{background:#FFEBBF}
			.article-photo-item:hover{background:#FFEBBF}
			.article-photo-add{display:block;font-size:20px;width:220px;height:150px;line-height:150px;color:#333;text-decoration:none;text-align:center}
			.article-photo-add:hover{background:#f6f6f6;color:#333;text-decoration:none}
			.article-photo {display: table-cell;height: 150px;overflow: hidden;position: relative;text-align: center;vertical-align: middle;width: 220px;border: 1px solid #ddd;}
			#gjc_chosen{
				width:100%;
				border-radiu:3px;
			}
		</style>
	</head>
	<body class="iframe-body">
		<div class="border-ddd" style="background:#fff;">
			<form id="articleForm" method="post">
				<div class='form-border-box mb10'>
					<div class="welcome-right-title clb" >
						<span class="ml10 fl wrt-font-title"><i class="tocer-icon10"></i>文章编辑</span>
						<div class="oper-box clb">
							<a class="ui-button blue-skin" style="width:80px;" onclick="submitForm('#articleForm');">保存</a>
							<a class="ui-button white-skin"  href="${ctxPath}/admin/cms/article/index.htm?item.channelId=${item.channelId}">返回文章管理</a>
						</div>	
						<input id="itemId" name="item.id" value="${item.id}"  type="hidden">
							<div>
								<table class="form-table ">
									<tr>
										<td style="height:0;width:12%;"></td>
										<td style="height:0;width:24%;"></td>
										<td style="height:0;width:12%;"></td>
										<td style="height:0;width:24%;"></td>
										<td style="height:0;width:12%;"></td>
										<td style="height:0;width:24%;"></td>
									</tr>
									<tr>
										<td class="form-title">文章标题：</td>
										<td class="form-content" colspan="3">
											<input id="itemName" name="item.name" value="${item.name}" type="text" class="tc-input-text fl w"/>
										</td>
										<td class="form-title">栏目名称：</td>
										<td class="form-content">
											<input id="channelChoose" class="tc-input-text w" type="text" value="${item.channelName}"/>
											<input id="channelId" name="item.channelId" type="hidden" value="${item.channelId}"/>
											<div id="menuContent" class="menuContent" style="display:none; position: absolute;">
												<ul id="treeDemo" class="ztree ztree-select" style="margin-top:0; width:160px;"></ul>
												<div class="mb20"></div>
											</div>
										</td>
									</tr>
									<tr>
										<td class="form-title">文章标签：</td>
										<td class="form-content" colspan="3" style="padding:0 5px;">
                                            <select id="tagList" name="item.tagList" class="w" multiple data-placeholder="请填写你的标签...">
                                                <c:forEach items="${sysTagList}" var="sysTag">
                                                    <c:set var="sysTagId" value=",${sysTag.id},"/>
                                                    <option value="${sysTag.id}" <c:if test="${fn:contains(item.tagList,sysTagId)}">
                                                        selected = "selected"
                                                    </c:if>>${sysTag.name}</option>
                                                </c:forEach>
                                            </select>
										</td>
										<td class="form-title">发布人：</td>
										<td class="form-content">
											<input type="text" class="tc-input-text fl w" id="author" name="item.author" value="${item.author}"/>
										</td>
									</tr>
									<tr>
										<td class="form-title" rowspan="6">文章摘要：</td>
										<td class="form-content" colspan="3" rowspan="6">
											<textarea id="summary" name="item.summary" class="tc-textarea fl w" style="height:180px;">${item.summary}</textarea>
										</td>
										<td class="form-title">文章来源：</td>
										<td class="form-content">
											<input type="text" class="tc-input-text fl w" id="source" name="item.source" value="${item.source}"/>
										</td>
									</tr>
									<tr>
										<td class="form-title w120">发布时间：</td>
										<td class="form-content">
											<input id="publishDate" type="text" placeholder="发布时间"   class="tc-input-text w100 fl" name="item.publishDate" value="<fmt:formatDate value="${item.publishDate}" pattern="yyyy-MM-dd"/>" onclick="WdatePicker({startDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'});"/>
										</td>
									</tr>
									<tr>
										<td class="form-title w120">排序：</td>
										<td class="form-content">
											<c:if test="${item.sort != null}">
											<input type="text" class="tc-input-text w60" name="item.sort" value="${item.sort}"/>
											</c:if>
											<c:if test="${item.sort == null}">
											<input type="text" class="tc-input-text w60" name="item.sort" value="1"/>
											</c:if>
											<i class="ml10">注意:数字越小越靠前</i>
										</td>
									</tr>
									<tr>
										<td class="form-title w120">页面模板：</td>
										<td class="form-content">
											<select id="cmsTemplateId" class="w150" name="item.cmsTemplateId">
												<option value="">-- 请选择 --</option>
												<c:forEach items="${cmsTemplateList}" var="curcmsTemplate">
													<option value="${curcmsTemplate.id}" <c:if test="${curcmsTemplate.id == item.cmsTemplateId}">selected</c:if>>${curcmsTemplate.name}</option>
												</c:forEach>
											</select>
										</td>
									</tr>
									<tr>
										<td class="form-title w120">展览地点：</td>
										<td class="form-content">
											<input id="exhibitionPlace" name="item.exhibitionPlace"type="text"  class="tc-input-text w fl" name="item.publishDate" value="${item.exhibitionPlace}" />
										</td>
									</tr>
									<tr>
										<td class="form-title w120">展览时间：</td>
										<td class="form-content">
											<input id="exhibitionTime"name="item.exhibitionPlace" type="text" class="tc-input-text w fl" name="item.publishDate" value="${item.exhibitionTime}" />
										</td>
									</tr>
									<tr>
										<td class="form-title w120">3D展出：</td>
										<td class="form-content">
											<input id="threeDimensionsExhibition"name="item.threeDimensionsExhibition" type="text" class="tc-input-text w fl" name="item.publishDate" value="${item.threeDimensionsExhibition}" />
										</td>
									</tr>
								</table>
							</div>	
						</div>	
					</div>
				
				<div class="tab-div mt3 mb3 ">
					<a id="content" class="tab-btn J-tab-sub " href="javascript:void(0);">文章内容</a>
					<a id="photoList" class="tab-btn J-tab-sub <c:if test="${empty item.id}">no-click</c:if>" href="javascript:void(0);">文章图片</a>
					<a id="fileList" class="tab-btn J-tab-sub <c:if test="${empty item.id}">no-click</c:if>" href="javascript:void(0);">文章视频</a>
					<a id="uploadFileList" onclick="initGrid()" class="tab-btn J-tab-sub <c:if test="${empty item.id}">no-click</c:if>" href="javascript:void(0);">文章附件</a>
				</div>
				
				<div class="tab-sub-content-div">
					<div class="tab-btn-content J-tab-sub-content">
						<div class="art-content">
							<textarea id="artContent" name="item.content" class="ui_textarea">${item.content}</textarea>
						</div>
					</div>
					
					<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
						<div id="articlePhotoList" class="adv-photo-list">
							<%-- 此处AJAX请求获取图片列表HTML片段 --%>
							<span class="status-wait">正在加载，请稍候...</span>
						</div>
					</div>
					<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
						<div id="login_info_bar">
							<div id="advPhotoList" class="adv-photo-list">
								<%-- 此处AJAX请求获取视屏列表HTML片段 --%>
								<span class="status-wait">正在加载，请稍候...</span>
							</div>
						</div>
					</div>
					
					<div class="tab-btn-content J-tab-sub-content" style="overflow:hidden">
						<div class="oper-box" style="padding:0px 0 3px">
							<a href="javascript:void(0);" class="ui-button blue-skin pr">
								<input type="hidden" id="path" name="item.annexPath"/>
								<input type="hidden" id="fileName" name="item.annexFileName"/>
								<input id="fileId" class="image-upload" name="uploadFile" onchange="doUploadFiles()" type="file" />上传附件
							</a>
							<a onclick="delBtn()" class="ui-button" href="javascript:void(0);">批量删除</a>
						</div>
						<table id="grid"></table> 
						<div id="pager"></div>
					</div>
				</div>
		</form>
		</div>
		<jsp:include page="/WEB-INF/pages/admin/base/admin_js_inc.jsp"/>
		<script type="text/javascript">var currentTabIndex = '${currentTabIndex}';</script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/ajaxfileupload.js"></script>
		<script src="${ctxPath}/static/base/lib/ajaxfileupload/tc_file_upload.js"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.config.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/ueditor.all.min.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/base/lib/ueditor/lang/zh-cn/zh-cn.js?t=${sysVersion}"></script>
		<script src="${ctxPath}/static/admin/cms/article_add.js" type="text/javascript"></script>
		<script src="${ctxPath}/static/admin/cms/article_annex_list.js" type="text/javascript"></script>
		<script src="${ctxPath}/static/admin/cms/article_manage.js" type="text/javascript"></script>
		<script src="${ctxPath}/static/base/lib/tageditor/jquery-ui.min.js"></script>
		<script src="${ctxPath}/static/base/lib/tageditor/jquery.tag-editor.js"></script>
		<script>
	   		var d = new Date();
	     	function addzero(v) {if (v < 10) return '0' + v;return v.toString();}
	     	var s = d.getFullYear().toString()+"-" + addzero(d.getMonth() + 1) +"-"+ addzero(d.getDate());
	     	document.getElementById('publishDate').value=s;
            $("#cmsTags").tagEditor({
				<c:if test="${not empty item.sysTagList}">
                	initialTags:[
                        <c:forEach items="${item.sysTagList}" var="tag">
                        	'${tag.name }',
                        </c:forEach>
					],
				</c:if>
                placeholder:'请填写你的标签...',
                forceLowercase: false,
                autocomplete: {
                    delay: 0, // show suggestions immediately
                    position: { collision: 'up' }, // automatic menu position up/down
                    source: [
                    	<c:forEach items="${sysTagList}" var="tag">
							'${tag.name }',
						</c:forEach>
					]
                }
            })
		</script>
	</body>
</html>
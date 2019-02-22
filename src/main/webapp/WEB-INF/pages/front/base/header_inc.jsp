<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="three-bounce" class="sk-three-bounce front-load-maker none" >
  <div class="sk-child sk-bounce1"></div>
  <div class="sk-child sk-bounce2"></div>
  <div class="sk-child sk-bounce3"></div>
</div>
<div class="at-hdbox">
		<div class="at-hdcc-box clb">
			<div class="fl mt10">
				<ul class="at-navlist">
					<li><a class="a-link" href="${ctxPath}/front/cms/search_article_detail.htm?item.id=737">关于我们</a></li>
					<li><a class="a-link" href="${ctxPath}/front/cms/search_article_detail.htm?item.id=482">我们的优势</a></li>
					<li><a class="a-link" href="${ctxPath}/front/cms/search_article_detail.htm?item.id=93">我们的客户</a></li>
					<li><a class="a-link" href="#">产品及服务</a></li>
					<li><a class="a-link" href="#">业务合作</a></li>
					<li><a class="a-link" href="#">合作伙伴</a></li>
					<li><a class="a-link" href="${ctxPath}/front/cms/search_article_detail.htm?item.id=386">联系我们</a></li>
				</ul>
			</div>
			<div class="fr at-dlzcbox clb">
				<c:if test="${empty current_member}">
				<a class="a-link" href="${ctxPath}/member/login.htm">请登录</a>
				<span class="color999 mr10 ml10">|</span>
				<a class="a-link" href="${ctxPath}/member/regist.htm">免费注册</a>
				</c:if>
				<c:if test="${not empty current_member}">
					<a class="fl a-link mr5 f12"  href="${ctxPath}/member/account/msg_notice.htm">消息通知</a>
					<span class="rd-nub-tips fl f10 tc mr10 mt10 f12">${msgNumber }</span>
					<a class="fl a-link mr5 f12"  href="${ctxPath}/member/account/sys_notice.htm">系统公告</a>
					<span class="rd-nub-tips fl f10 tc mr10 mt10">${sysMsgNumber }</span>
					<a class="fl a-link mr10 f12"  href="${ctxPath}/member/bbs/topic/my_topic.htm">我的帖子</a>
					<a class="fl a-link mr10 f12" href="${ctxPath}/member/account/my_collect.htm">我的收藏</a>
					<c:if test="${empty bbsTopicReply.facePath}">
						<img class="fl mr5 mt10" style="width:16px;height:16px;border-radius:50%;" src="${ctxPath}/static/front/base/images/shead-img.png">
					</c:if>
					<c:if test="${not empty bbsTopicReply.facePath}">
						<img class="fl mr5 mt10" style="width:16px;height:16px;border-radius:50%;" src="${ctxPath}${fileRoot}${bbsTopicReply.facePath}">
					</c:if>
					<a class="a-link fl" href="${ctxPath}/member/account/index.htm">${current_member.name}</a>
					<span class="color999 mr10 ml10 fl">|</span>
					<a class="a-link fl" href="${ctxPath}/member/logout.htm">退出</a>
				</c:if>
			</div>
		</div>
	</div>
	
	<div class="at-layout2box clb">
		<div class="fl at-logobox"><a href="${ctxPath}/index.htm"><img src="${ctxPath}/static/front/base/images/an-logo.png"  height="55" width="205" /></a></div>
		<div class="fl at-ggbox">
		<c:forEach items="${headPhotos }" var="headPhoto">
			<c:if test="${headPhoto.linkUrl eq 'http://'}">
				<a href="javascript:void(0);"><img src="${ctxPath}${fileRoot}${headPhoto.path}" height="60" width="233"></a>
			</c:if>
			<c:if test="${headPhoto.linkUrl ne 'http://'}">
				<a href="${headPhoto.linkUrl} "><img src="${ctxPath}${fileRoot}${headPhoto.path}" height="60" width="233"></a>
			</c:if>
		</c:forEach>	
		</div>
		<div class="fr mt40">
			<ul class="at-layout2nav-box clb">
				<li>
					<a href="${ctxPath}/front/cms/index.htm" class="at-hjt a-link atd-none f16 fb">新鲜资讯</a>
					<div class="tw-menu">
						<a href="${ctxPath}/front/cms/index.htm" target="_blank" class="at-hjt-cur a-link atd-none f16 fb" style="color:#d42224;">新鲜资讯</a>
						<a menu="06688b15-a0c3-11e5-aca9-208984d32e94" href="${ctxPath}/front/cms/list.htm?condition.parentChannelId=3" class="a-link atd-none f14 tm-a">干货 | 技术贴</a>
						<a href="${ctxPath}/front/cms/column_list.htm" class="a-link atd-none f14 tm-a">独家专题报告</a>
						<a href="${ctxPath}/front/cms/case_list.htm" class="a-link atd-none f14 tm-a">独家案例研究</a>
						<%-- <a href="${ctxPath}/front/cms/visit_list.htm" class="a-link atd-none f14 tm-a">人物访谈</a> --%>
						<a href="${ctxPath}/front/cms/list.htm?condition.parentChannelId=21" class="a-link atd-none f14 tm-a">热点事件与新闻</a>
						<a href="${ctxPath}/front/cms/list.htm?condition.parentChannelId=21" class="a-link atd-none f14 tm-a">法律法规解读</a>
						<%-- <a href="${ctxPath}/front/cms/video_list.htm" class="a-link atd-none f14 tm-a">视频 | 深度访谈</a> --%>
						<a href="${ctxPath}/front/cms/zmt_list.htm" class="a-link atd-none f14 tm-a">入驻自媒体</a>
						<a href="${ctxPath}/front/cms/blog_list.htm" class="a-link atd-none f14 tm-a">博客</a>
					</div>
				</li>
				<li>
					<a href="${ctxPath}/activity/act_activity_home.htm" class="at-hjt a-link atd-none f16 fb">会议活动</a>
					<div class="tw-menu">
						<a href="${ctxPath}/activity/act_activity_home.htm" target="_blank" class="at-hjt-cur a-link atd-none f16 fb" style="color:#d42224;">会议活动</a>
						<a href="${ctxPath}/activity/index.htm" class="a-link atd-none f14 tm-a">电话会议</a>
						<a href="${ctxPath}/activity/toDataCenter.htm" class="a-link atd-none f14 tm-a">会后报告</a>
						<a href="${ctxPath}/activity/offline_list.htm" class="a-link atd-none f14 tm-a">线下会议</a>
						<a href="${ctxPath}/activity/act_year_meeting_list.htm" class="a-link atd-none f14 tm-a">年会论坛<img style="position: relative;top:2px;" width="14" height="21" class="ml5 mt5" src="${ctxPath}/static/front/base/images/tj-ico.gif"></a>
					</div>	
				</li>
				<li>
					<a href="${ctxPath}/bbs/index.htm" class="at-hjt a-link atd-none f16 fb">社区社群</a>
<!-- 					<a href="${ctxPath}/front/community_index.htm" class="at-hjt a-link atd-none f16 fb">社区社群</a> -->
					<div class="tw-menu">
						<a href="${ctxPath}/bbs/index.htm" target="_blank" class="at-hjt-cur a-link atd-none f16 fb" style="color:#d42224;">社区社群</a>
						<c:forEach items="${bbsCategoryParentList }" var="bbsCategoryParent">
							<a href="${ctxPath}/bbs/list.htm?selIds=${bbsCategoryParent.id}" class="a-link atd-none f14 tm-a">${bbsCategoryParent.name }
								<c:if test="${bbsCategoryParent.id=='d5fda26b9ca311e5ab4800fffd437687' }">
									<img style="position: relative;top:2px;" width="14" height="21" class="ml5 mt5" src="${ctxPath}/static/front/base/images/tj-ico.gif">
								</c:if>
							</a>
						</c:forEach>
					</div>	
				</li>
				<!-- <li style="margin-left:30px;"><a href="javascript:void(0);"  class="a-link atd-none f16 fb">咨询服务</a></li> -->
				<li style="margin-left:20px;"><a href="${ctxPath}/bbs/list.htm?selIds=d5fda26b9ca311e5ab4800fffd437687" target="_blank" class="a-link atd-none f16 fb">法律招聘</a><b></b></li>
			</ul>
		</div>
	</div>

<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="at-footer-box">
		<div class="footer-l1ccbox clb" >
			<div class="fl1-leftbox fl" style="width:1200px;">
				<div class="clb mt20">
					<div class="fl fdh-sbox">
						<div class="footer-dhbox"></div>
					</div>
					<div class="clb fr mt20">
						<div class="dyh-box dyh-box2 clb fl">
							<div class="ewm-dyh fl">
								<img src="${ctxPath}/static/front/base/images/f-ewm1.png" height="88" width="88">
							</div>
							<div class="dyh-ccbox fr">
								<div class="dcf-font">扫一扫，关注安拓法务圈，获取安拓干货</div>
							</div>
						</div>
						<div class="dyh-box dyh-box2 clb fl">
							<div class="ewm-dyh fl">
								<img src="${ctxPath}/static/front/base/images/ewm03.png" height="88" width="88">
							</div>
							<div class="dyh-ccbox fr">
								<div class="dcf-font">商业合规观察订阅号</div>
							</div>
						</div>
						<div class="dyh-box dyh-box2 clb fl">
							<div class="ewm-dyh fl">
								<img src="${ctxPath}/static/front/base/images/f-ewm2.png" height="88" width="88">
							</div>
							<div class="dyh-ccbox fr">
								<div class="dcf-font">客户经理微信</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="footer-cpbox">
			<div class="fcp-ccbox">
				<div class="fcp-afont">
					<a href="${ctxPath}/front/cms/search_article_detail.htm?item.id=737">关于安拓</a>
					<label>|</label>
					<a href="${ctxPath}/front/cms/search_article_detail.htm?item.id=482">我们的优势</a>
					<label>|</label>
					<a href="${ctxPath}/front/cms/search_article_detail.htm?item.id=93">我们的客户</a>
					<label>|</label>
					<a href="${ctxPath}/front/cms/search_article_detail.htm?item.id=527">产品及服务</a>
					<label>|</label>
					<a href="${ctxPath}/front/cms/search_article_detail.htm?item.id=194">合作伙伴</a>
					<label>|</label>
					<a href="${ctxPath}/front/cms/search_article_detail.htm?item.id=386">联系我们</a>
				</div>
				<div class="ft-cpfonts mt15">
					Copyright ©  Everpro-legal 安拓咨询 2014 All Right Reserved  沪ICP备10023971号<a  href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action " target="_blank" style="color:#fff;margin-left:5px;">工信部网址</a>
				</div>
			</div>
		</div>
	</div>
	<a id="roll_top" class="backtop_item backtop_item_top" >
		<i class="ico_top"></i>
	</a>
<script>
	//回到顶部
		$(document).ready(function(){
			$('#roll_top').click(function(){$('html,body').animate({scrollTop: '0px'}, 1000);});
		}); 
		//保持头部固定
		 $(window).scroll(function() {
			var h = $(window).scrollTop();
			//大于600出现返回顶部图标
			if (h > 600) {
				$("#roll_top").show();
			} else {
				$("#roll_top").hide();
			}
		}); 
</script>
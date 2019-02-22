<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html style="background: #ebebeb;height: 100%">
<head>
	<base href="${ctxPath}" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title>闵行博物馆-参观信息</title>
	<meta name="Keywords" content="上海博物馆 | 闵行博物馆 | 闵行 | 博物馆" />
	<meta name="description" content="闵行博物馆"/>
	<jsp:include page="/WEB-INF/pages/front/base/front_css_inc.jsp" />
	<link rel="stylesheet" type="text/css" href="${ctxPath}/static/front/base/banner-move.css">
</head>
<body >
<div class="ex-box">
	<div >
		<img style="width:100%;" src="${ctxPath}/static/front/images/info-pic.png">
		<div  style="text-align: center;margin-top: -12vh;">
			<div><img src="${ctxPath}/static/front/images/info-01.png" style="width: 130px;"></div>
			<div style="color: #828180;margin-top: 15px;">周一至周日<span style="color: #828180;font-size: 34px;font-weight: bold;margin-left: 5px;">9:00-17:00</span></div>
			<div style="color: #828180;font-size: 13px;margin-top: 5px;">(16:45停止入场)节假日另行通知</div>
		</div>
		<div style="margin-top: 45px;">
			<div style="text-align: center;"><img src="${ctxPath}/static/front/images/info-05.png" style="width: 130px;"></div>
			<p style="text-indent: 30px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;padding: 0 25px;margin-top:10px">根据中共中央宣传部、财政部、文化部、国家文物局《关于全国博物馆、纪念馆免费开放的通知》的要求，为做好闵行区博物馆向社会免费开放的工作，特制定本实施办法：</p>
			<p style="text-indent: 30px;text-align: justify;color:#936134;font-size:14px;line-height: 21px;text-align: justify;font-weight: bold;border-top: 1px solid #ddd;padding: 3px 25px;">1、参观者须接受安全检查方可入馆参观。</p>
			<div style="border-top: 1px solid #ddd;">
				<p style="text-indent: 30px;color:#936134;font-size:14px;line-height: 21px;text-align: justify;font-weight: bold;padding: 3px 25px;">2、为维持良好的参观秩序，下列人员可凭本人有效证件，由绿色通道优先接受安全检查入馆参观</p>
				<p  style="text-indent: 30px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;padding: 0 25px">① 70岁以上老人、离休干部、现役军人、革命烈士家属、残障人士等，可优先入馆。
					</br>② 团体（10人以上）参观可通过电话形式提前一周预约（额满为止），参观当日经工作人员核准后，优先入馆。</p>
			</div>
			<p style="text-indent: 30px;text-align: justify;color:#936134;font-size:14px;line-height: 21px;text-align: justify;font-weight: bold;border-top: 1px solid #ddd;padding: 3px 25px;">3、租借语音导览设备将实行无偿服务办法。</p>
			<div style="border-top: 1px solid #ddd;">
				<p style="text-indent: 30px;color:#936134;font-size:14px;line-height: 21px;text-align: justify;font-weight: bold;padding: 3px 25px;">4、为保障文物安全，营造文明环境，闵行区博物馆将要求观众自觉遵守如下规定：</p>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">文明参观，衣冠不整者谢绝入馆；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">推销各类小商品者、散发广告者谢绝入馆；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">携带宠物者谢绝入馆；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;"> 身高1.3米以下的儿童须由家长带领参观，行动不便的老年人须由亲友陪同参观；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;"> 观众携带大件包、袋可免费寄存；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">   请勿将食品、饮料带入陈列室；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">博物馆楼宇建筑内严禁吸烟或使用明火；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">请勿触摸裸置文物和艺术装置；</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">请勿在展馆内喧哗，影响他人参观。</p>
				</div>
				<div style="position: relative;padding: 0 25px">
					<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
					<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">禁止携带摄影三角架，大、中型专业摄像机等摄影设备进馆拍摄。</p>
				</div>
				<p style="text-indent: 30px;text-align: justify;color:#936134;font-size:14px;line-height: 21px;text-align: justify;font-weight: bold;border-top: 1px solid #ddd;padding: 3px 25px;">5、本馆遇有重大活动或重要设备设施维修保养时，可根据需要临时闭馆，届时将预先告示公众。</p>
				<div style="border-top: 1px solid #ddd;">
					<p style="text-indent: 30px;color:#936134;font-size:14px;line-height: 21px;text-align: justify;font-weight: bold;padding: 3px 25px;">6、摄影告知</p>
					<div style="position: relative;padding: 0 25px">
						<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
						<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">本馆常设及临时展览允许摄影，但请勿使用闪光灯和三脚架，拍照时请注意自身、他人及展品安全。</p>
					</div>
					<div style="position: relative;padding: 0 25px">
						<div style="width: 8px;height: 8px;background:#555;border-radius: 100%;position: absolute;left: 55px;top: 8px;"></div>
						<p  style="text-indent:53px;text-align: justify;color:#595757;font-size:14px;line-height: 21px;">引进的临时性展览，视展览协议执行版权约定。如限制摄影将在展厅门口及展厅内设立明显提示标识。</p>
					</div>
				</div>
			</div>
			<div style="margin-top: 40px;">
				<div style="text-align: center;"><img src="${ctxPath}/static/front/images/info-06.png" style="width: 130px;"></div>
				<div style="text-align: justify;padding: 0 25px;text-indent: 30px;color:#595757;font-size: 14px;">
					<span style="color:#595757;font-size:14px;line-height: 21px;color:#936134;font-size:14px;line-height: 21px;font-weight: bold;">温馨提醒</span>
					本馆服务台提供一下贴心服务：医药箱、针线包、轮椅，为特殊群体（老、弱、病、残及孕等）提供直升电梯上下楼。
				</div>
			</div>
			<div style="margin-top: 40px;">
				<div style="text-align: center;"><img src="${ctxPath}/static/front/images/info-07.png" style="width: 130px;"></div>
				<p style="text-align: justify;padding: 0 25px;text-indent: 30px;color:#595757;font-size: 14px;">闵行区博物馆：闵行文化公园西南角，新镇路以东、漕宝路以北。</p>
			</div>
			<div style="text-align: center;padding: 0 25px;margin: 15px 0"><img src="${ctxPath}/static/front/images/info-08.png" style="width:100%;"></div>
			<p style="text-align: justify;padding: 0 25px;text-indent: 30px;color:#595757;font-size: 14px;margin:10px 0">张充仁纪念馆：上海市闵行区七宝古镇蒲溪广场75号</p>
			<div style="text-align: center;padding: 0 25px;margin: 15px 0"><img src="${ctxPath}/static/front/images/info-09.png" style="width:100%;"></div>
		</div>
	</div>



</div>



<jsp:include page="/WEB-INF/pages/front/base/front_js_inc.jsp" />


</body>
</html>

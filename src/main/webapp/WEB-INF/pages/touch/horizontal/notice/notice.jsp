<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--参观须知--%>
  <style>
    .main-tab{width:229px;height:890px;flex-direction: column;display:flex;justify-content:center;position:absolute;right:0;top:0;}
    .main-tab .tab{flex:1;}
    .tab-time{background:url("/static/touch/images/notice-time.png") no-repeat left top;}
    .tab-visitor{background:url("/static/touch/images/notice-visitor.png") no-repeat left top;}
    .tab-equipment{background:url("/static/touch/images/notice-equipment.png") no-repeat left top;}
    .main-content{width:1349px;height:889px;background-color: #fff;}
    .main-content>.content-item{width:100%;height:100%;}
    .swiper-container .swiper-slide{height: auto;}
    .time-museum{width:867px;height:581px;margin:0 auto;}
    .time-museum>img{width:100%;vertical-align: top;}
    .time-con{width:630px;height:334px;margin:-115px auto 0;}
    .time-con .con-item{margin-bottom:20px;}
    .con-item .item-la{font:normal 400 25px 'microsoft yahei';color:#595757;display:inline-block;width:125px;line-height: 30px;}
    .con-item .item-p{font:normal 300 21px 'microsoft yahei';color:#828180;width:501px;display:inline-block;vertical-align: top;line-height: 30px;}
    .visitor-con{width:888px;margin:75px auto;}
    .visitor-con .p-normal{text-indent:45px;font:normal 300 25px 'microsoft yahei';color:#595757;line-height: 40px;}
    .visitor-con .p-orange{text-indent:45px;font:normal 500 25px 'microsoft yahei';color:#936134;line-height: 40px;}
    .visitor-con .p-normal .pot{margin-bottom: 4px;display:inline-block;width:12px;height:12px;background-color: #595757;border-radius:50%;margin-right:50px;}
    .visitor-con .dashed{width:100%;height:0;border-bottom:1px dashed #595757;margin:20px 0;}
    .equipment-con{position:relative;width:888px;margin:75px auto;}
    .equipment-con .equipment-floor{width:477px;height:228px;position:absolute;top:0;right:-130px;}
    .equipment-con .equipment-up{width:541px;}
    .equipment-con .e-normal{text-indent:45px;font:normal 300 25px 'microsoft yahei';color:#878787;line-height: 50px;}
    .equipment-con .e-normal.indent{text-indent: 0;}
    .equipment-con .t-bold{font:normal 500 25px 'microsoft yahei';color:#3e3a39;}
    .equipment-con .e-normal.special{text-align: right;}
    .equipment-con .dashed{width:600px;height:0;border-bottom:1px dashed #dadbdb;margin:70px 0 40px;}
  </style>
    <div class="main-tab tab-time">
      <div class="tab"></div>
      <div class="tab"></div>
      <div class="tab"></div>
    </div>
    <div class="main-content">
      <div id="time" class="content-item animated fadeInUp swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="time-museum">
              <img src="${ctxPath}/static/touch/images/time-museum.png" alt="">
            </div>
            <div class="time-con">
              <div class="con-item">
                <label class="item-la">开放时间：</label>
                <p class="item-p">"9:00~17:00（16:30后停止入场 <br>法定假日另行通知</p>
              </div>
              <div class="con-item">
                <label class="item-la">人数限控：</label>
                <p class="item-p">？？？人次/日，额满为止</p>
              </div>
              <div class="con-item">
                <label class="item-la">团队预约：</label>
                <p class="item-p"></p>
              </div>
              <div class="con-item">
                <label class="item-la">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</label>
                <p class="item-p">021-54604660转6426分机（团队人数<br>10人以上提前一周预约，额满为止）</p>
              </div>
              <div class="con-item">
                <label class="item-la">预约时间：</label>
                <p class="item-p">9:00~16:30</p>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-scrollbar scroll1"></div>
      </div>
      <div id="visitor" class="hide content-item animated fadeInUp swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="visitor-con">
              <p class="p-normal">根据中共中央宣传部、财政部、文化部、国家文物局《关于全国博物馆、纪念馆免费开放的通知》的要求，为做好闵行区博物馆向社会免费开放的工作，特制定本实施办法：</p>
              <p class="p-orange">1、参观者须接受安全检查方可入馆参观。</p>
              <p class="p-orange">2、为维持良好的参观秩序，下列人员可凭本人有效证件，由绿色通道优先接受安全检查入馆参观：</p>
              <p class="p-normal">① 70岁以上老人、离休干部、现役军人、革命烈士家属、残障人士等，可优先入馆。</p>
              <p class="p-normal">② 团体（10人以上）参观可通过电话形式提前一周预约（额满为止），参观当日经工作人员核准后，优先入馆。</p>
              <p class="p-orange">3、租借语音导览设备将实行无偿服务办法。</p>
              <p class="p-orange">4、为保障文物安全，营造文明环境，闵行区博物馆将要求观众自觉遵守如下规定：</p>
              <p class="p-normal"><i class="pot"></i>文明参观，衣冠不整者谢绝入馆；</p>
              <p class="p-normal"><i class="pot"></i>推销各类小商品者、散发广告者谢绝入馆；</p>
              <p class="p-normal"><i class="pot"></i>携带宠物者谢绝入馆；</p>
              <p class="p-normal"><i class="pot"></i>身高1.3米以下的儿童须由家长带领参观，行动不便的老年人须由亲友陪同参观；</p>
              <p class="p-normal"><i class="pot"></i>观众携带大件包、袋可免费寄存；</p>
              <p class="p-normal"><i class="pot"></i>请勿将食品、饮料带入陈列室；</p>
              <p class="p-normal"><i class="pot"></i>博物馆楼宇建筑内严禁吸烟或使用明火；</p>
              <p class="p-normal"><i class="pot"></i>请勿触摸裸置文物和艺术装置；</p>
              <p class="p-normal"><i class="pot"></i>请勿在展馆内喧哗，影响他人参观。</p>
              <p class="p-normal"><i class="pot"></i>禁止携带摄影三角架，大、中型专业摄像机等摄影设备进馆拍摄。</p>
              <p class="p-orange">5、本馆遇有重大活动或重要设备设施维修保养时，可根据需要临时闭馆，届时将预先告示公众。</p>
              <p class="p-orange">6、摄影告知</p>
              <p class="p-normal"><i class="pot"></i>本馆常设及临时展览允许摄影，但请勿使用闪光灯和三脚架，拍照时请注意自身、他人及展品安全。</p>
              <p class="p-normal"><i class="pot"></i>引进的临时性展览，视展览协议执行版权约定。如限制摄影将在展厅门口及展厅内设立明显提示标识。</p>
              <div class="dashed"></div>
              <p class="p-normal"><span class="p-orange">温馨提示 </span> 本馆服务台提供一下贴心服务：医药箱、针线包、轮椅，为特殊群体（老、弱、病、残及孕等）提供直升电梯上下楼。</p>
            </div>
          </div>
        </div>
        <div class="swiper-scrollbar scroll2"></div>
      </div>
      <div id="equipment" class="hide content-item animated fadeInUp swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="equipment-con">
              <div class="equipment-floor">
                <img src="${ctxPath}/static/touch/images/equipment-floor.png" alt="">
              </div>
              <div class="equipment-up">
                <p class="e-normal indent"><span class="t-bold">设备借用：</span> 本馆设有设备（语音导览器，婴儿车，轮椅）借用处，位于一楼南大门内侧服务中心。</p>
              </div>
              <div class="dashed"></div>
              <div class="equipment-down">
                <p class="t-bold">语音导览设备借用须知：</p>
                <p class="e-normal">欢迎参观闵行区博物馆，本馆向您提供无偿语音导览服务。参观者可以免费借用语音导览机收听讲解，使用须知如下：</p>
                <p class="e-normal">1. 租用语音导览设备可在大厅服务台办理；</p>
                <p class="e-normal">2. 借用时间：上午9:30-11:30；下午13:00-15:00；</p>
                <p class="e-normal">3. 借用前须出示身份证、学生证等有效证件进行抵押，并如实填写语音导览设备免费使用登记表；</p>
                <p class="e-normal">4. 未带有效证件者需付押金100元；</p>
                <p class="e-normal">5. 导览机须在借用2小时之内归还至服务台处，工作人员将在确认导览机完好的情况下返还押金或证件；</p>
                <p class="e-normal">6. 如在租用期间语音导览机产生人为原因损毁则按损毁程度进行赔偿，丢失则按物品原价进行赔偿；</p>
                <p class="e-normal">7. 参观者可以根据需要自主选择男/女声和中/英文的音频。</p>
                <p class="e-normal">8. 具体的操作说明及其它不明事项请咨询工作人员。</p><br>
                <p class="e-normal special">上海市闵行区博物馆</p>
                <p class="e-normal special">XXXX年XX月</p>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-scrollbar scroll3"></div>
      </div>
    </div>

  <script type="text/javascript">
    $(function(){
      $('.main-tab .tab').click(function(){
        $('.main-content .content-item').css('display','none');
        if($(this).index()===0){
          $(this).parent().attr('class','main-tab tab-time');
          $('.main-content .content-item').eq(0).css('display','block');
        }else if($(this).index()===1){
          $(this).parent().attr('class','main-tab tab-visitor');
          $('.main-content .content-item').eq(1).css('display','block');
          let visitor=new Swiper('#visitor', {
            scrollbar: '.scroll2',
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            roundLengths : true,
          });
        }else if($(this).index()===2){
          $(this).parent().attr('class','main-tab tab-equipment');
          $('.main-content .content-item').eq(2).css('display','block');
          let equipment=new Swiper('#equipment', {
            scrollbar: '.scroll3',
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            roundLengths : true,
          });
        }
      })
      let time=new Swiper('#time', {
        scrollbar: '.scroll1',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths : true,
      });
    })
  </script>


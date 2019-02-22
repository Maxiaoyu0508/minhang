<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
  <style>
    .main-tab{width:229px;height:890px;flex-direction: column;display:flex;justify-content:center;position:absolute;right:0;top:0;}
    .main-tab .tab{flex:1;}
    .info-tab1{background:url("/static/touch/images/info-tab1.png") no-repeat left top;}
    .info-tab2{background:url("/static/touch/images/info-tab2.png") no-repeat left top;}
    .info-tab3{background:url("/static/touch/images/info-tab3.png") no-repeat left top;}
    .info-tab4{background:url("/static/touch/images/info-tab4.png") no-repeat left top;}
    .main-content{width:1349px;height:890px;background-color: #fff;}
    .main-content>.content-item{width:100%;height:100%;overflow:hidden;}
    .swiper-container .swiper-slide{height: auto;}
    .info1-view{width:1074px;height:296px;margin:75px auto 50px;}
    .info1-view>img{width:100%;vertical-align: top;}
    .info1-con{width:1074px;margin:0 auto;}
    .info1-con>p{font:normal 300 25px 'microsoft yahei';color:#595957;text-indent: 45px;line-height: 60px;}
    .info2-content{width:1114px;height:393px;margin:75px auto 50px;}
    #info2 .swiper-slide{width:921px;height:393px;box-shadow:0 8px 30px #ddd;-webkit-filter:brightness(0.7);filter:brightness(0.7);}
    #info2 .swiper-slide-active{-webkit-filter:brightness(1);filter:brightness(1);}
    #info2 .swiper-slide img{display:block;width:100%;}
    #info2 .swiper-button-prev{left:35px;top:44%;width:48px;height:87px;background:url("/static/touch/images/prev.png") no-repeat;background-position:0 0;background-size:100%}
    #info2 .swiper-button-next{right:35px;top:44%;width:48px;height:87px;background:url("/static/touch/images/next.png") no-repeat;background-position:0 0;background-size:100%}
    .info2-1,.info2-2,.info2-3{width:1114px;height:267px;overflow:hidden;margin:0 auto;}
    .left-con{width:610px;height:100%;display:inline-block;vertical-align: top;}
    .right-pic{margin-left:35px;width:448px;height:100%;display:inline-block;vertical-align: top;}
    .info-normal{font:normal 300 25px 'microsoft yahei';color:#595957;text-indent: 45px;line-height: 50px;}
    .dashed{width:100%;height:0;border-bottom:1px dashed #dadbdb;margin:20px 0;}
    .info3-wrap,.info4-wrap{width:1170px;overflow:hidden;margin:75px auto;}
    .info3-wrap .info3-left{width:458px;height:634px;display:inline-block;margin-right:50px;}
    .info3-wrap .info3-left>img{width:100%;vertical-align: top;}
    .info3-wrap .info3-right{width:640px;vertical-align: top;display:inline-block;}
    .info3-wrap .info3-right .right-up{width:98%;height:330px;overflow:hidden;}
    .info4-wrap .info4-left{width:378px;height:720px;float:left;}
    .info4-wrap .info4-right{width:789px;height:720px;overflow: hidden;float:left;position:relative;box-sizing: border-box;padding-right:30px;}
    .info4-wrap .info4-left .tab-wrap{width:205px;height:720px;box-sizing: border-box;position: relative;}
    .info4-wrap .info4-left .tab-wrap .info4-tab{width:145px;height:145px;margin-bottom:37px;border-radius:12px;margin:30px;}
    .info4-wrap .info4-left .tab-wrap .info4-tab>img{width:100%;vertical-align:top;border-radius:12px;}
    .info4-wrap .info4-left .tab-wrap .info4-tab.active{box-shadow:0 0 30px #f6b42c;border:2px solid #fff;box-sizing: border-box;}
    .pot{margin-bottom: 4px;display:inline-block;width:12px;height:12px;background-color: #595757;border-radius:50%;margin-right:15px;}
    .info4-right .pos{position:absolute;right:0;top:0;width:183px;height:229px;}
    .info4-right .pos>img{width:166px;vertical-align: top;display:block;margin:0 auto 15px;}
    .info4-right h2{letter-spacing: 7px;color: #676c72;font:normal 500 25px 'microsoft yahei';line-height: 50px;}
    .info4-down{width:759px;height:450px;overflow:hidden;margin-top:20px;}
</style>
  <div class="main-tab info-tab1">
    <div class="tab"></div>
    <div class="tab"></div>
    <div class="tab"></div>
    <div class="tab"></div>
  </div>
  <div class="main-content">
    <div id="info1" class="content-item animated fadeInUp swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="info1-view">
            <img src="${ctxPath}/static/touch/images/info1-view.png" alt="">
          </div>
          <div class="info1-con">
            <p>闵行区博物馆围绕“与城市、自然共生”这一理念，博物馆被纳入公园景观的一部分。建筑部分被草堤遮挡，就如同从公园环境中生长出来一般，并在入口广场边形成一个升起绿坡。作为景观及建筑的一部分，绿坡形成了一个面朝湖面的露天剧场，给游客提供一种不进入建筑内部却可体验建筑的方式。</p>
            <p>新馆总建筑面积15000平方米，建成后将成为上海西南地区的一张文化名片。新馆将设三个基本陈列，分别为马桥文化陈列、上海县七百年展与中国民族乐器文化展。</p>
          </div>
        </div>
      </div>
      <div class="swiper-scrollbar scroll1"></div>
    </div>
    <div class="hide content-item animated fadeInUp">
      <div id="info2" class="info2-content swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="${ctxPath}/static/touch/images/info2-banner1.png" alt=""></div>
          <div class="swiper-slide"><img src="${ctxPath}/static/touch/images/info2-banner2.png" alt=""></div>
          <div class="swiper-slide"><img src="${ctxPath}/static/touch/images/info2-banner3.png" alt=""></div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <div class="info2-1">
        <div class="left-con swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
                <p class="info-normal">上海市闵行区马桥镇的俞塘村内，是全国重点文物保护单位——上海马桥遗址所在地。闵行区博物馆的《马桥文化》展厅，现有面积约600平方米，主要展出马桥文化时期的160余件器物。整个空间以环状方式呈现三大主题：自然、人文和社会，层层递进、紧密相连，逐渐升华。展览通过多媒体投影、模型、场景复原等手段，重现了长江带来的冲击泥沙和海潮带来的贝壳砂共同沉积作用的“贝壳砂堤”上，马桥文化时期先民傍海而生的生活。向观众展示马桥文化时期先民制作使用的生产工具和生活器具，让观众辨识先民用以传递生产与生活信息的独特符号和用以装饰器物的各种纹饰，以及在烧制硬陶的基础上发明了兼具实用性和观赏性的原始瓷，从而体会自然的危险与奇异，探索生活的艰辛与精彩，领悟人与自然的和谐共生。</p>
            </div>
          </div>
          <div class="swiper-scrollbar scroll2"></div>
        </div>
        <div class="right-pic">
          <img style="width:448px;height:249px" src="/static/touch/images/info2-floor2.png" alt="">
        </div>
      </div>
      <div class="hide info2-2">
        <div class="left-con swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
                <p class="info-normal">《上海县七百年》展厅，展陈面积约2400平方米，主要展出上海县七百年历史时期的300余件器物。包含序厅、东南壮县、江海通津、海纳百川、独立发展、城乡融合六个展区。展览通过全息投影、多媒体互动、场景复原等手段，由古及今，追根溯源，按照历史发展的脉络，展示七百年历史长河中，上海县土地上的人类生产、生活活动及文化创造，使参观者对上海县的历史发展阶段及其辉煌成就有所了解。</p>
            </div>
          </div>
          <div class="swiper-scrollbar scroll3"></div>
        </div>
        <div class="right-pic">
          <img style="width:448px;height:249px" src="/static/touch/images/info2-floor2x.png" alt="">
        </div>
      </div>
      <div class="hide info2-3">
        <div class="left-con swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <p class="info-normal">闵行区博物馆的《中国民族乐器文化》展厅面积约960平方米，展出与中国民族乐器相关的器物展品200余件。展厅分为序厅和“传统乐器”、“大同乐会”、“乐器制作技艺”、“少数民族乐器”四个主题板块。</p>
              <p class="info-normal">“传统乐器”板块根据乐器“吹、拉、弹、打”的分类方式进行展示，呈现乐器在不同时代的发展特征和历史亮点。无论是先秦时期的礼乐文化，还是唐宋盛世的宫廷乐文化，乃至明清时期的俗乐文化，我们都可以从相应的代表乐器中感悟到这些文化中的风骨雅韵、民风民情。“大同乐会”板块通过展示我国近现代最具影响力之一的民间乐团“大同乐会”的历史人文器物，呈现其对于中国近现代音乐/乐器文化发展做出的突出贡献。“乐器制作技艺”板块通过展示中国当代乐器制作技艺水平和优秀技师，呈现中国乐器文化传承与创新精髓。“少数民族乐器”板块通过展示藏族、维吾尔族、蒙古族、西南少数民族的乐器与民俗，呈现我国部分少数民族丰富多彩的音乐文化。</p>
              <p class="info-normal">展厅以“集实物、声音、图片、动态展演于一体”的综合方式进行展示，让观众了解并学习中国民族乐器丰富悠久的历史文化，亲身体验乐器之“声”的精妙动人。</p>
            </div>
          </div>
          <div class="swiper-scrollbar scroll4"></div>
        </div>
        <div class="right-pic">
          <img style="width:448px;height:249px" src="/static/touch/images/info2-floor1.png" alt="">
        </div>
      </div>
    </div>
    <div class="hide content-item animated fadeInUp">
      <div class="info3-wrap">
        <div class="info3-left"><img src="/static/touch/images/info3-pic.png" alt=""></div>
        <div class="info3-right">
          <div class="right-up swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <p class="info-normal">闵行博物馆闵行博物馆新址位于名都路85号的春申文化广场2楼，于2002年12月建成。馆内设《崛起的新城——闵行区发展成就展》，目前，有三个基本陈列馆：《马桥古文化陈列馆》、《中国民族乐器陈列馆》和《崛起的新城——闵行区发展成就展》，是一个颇具地方特色的博物馆。闵行博物馆的建成为发展先进文化，推动全区精神文明建设发挥积极作用。</p>
              </div>
            </div>
            <div class="swiper-scrollbar scroll5"></div>
          </div>
          <div class="dashed"></div>
          <div class="right-down" style="text-align: center;"><img style="width:534px;height:254px" src="/static/touch/images/info3-floor.png" alt=""></div>
        </div>
      </div>
    </div>
    <div class="hide content-item animated fadeInUp ">
      <div class="info4-wrap">
        <div class="info4-left">
          <div class="tab-wrap">
            <div class="mui-scroll-wrapper">
              <div class="mui-scroll" id="mui-con">

              </div>
            </div>
          </div>
        </div>
        <div class="info4-right">
          <div class="pos">
            <img src="/static/touch/images/info4-ercode.png" alt="">
            <p style="color:#b0b8bf;font:normal 300 21px 'Microsoft YaHei';text-align: center;">活动详细和报名请微信扫描二维码</p>
          </div>
          <div style="width:485px;">
            <h2>书香系列活动</h2>
            <div class="dashed"></div>
          </div>
          <p class="info-normal"><i class="pot"></i>活动时间<span style="margin-left:20px;color:#9d9d9e">2018.7.16-9.26</span></p>
          <p class="info-normal"><i class="pot"></i>活动地点<span style="margin-left:20px;color:#9d9d9e">古籍图书馆</span></p>
          <p class="info-normal"><i class="pot"></i>预约人数<span style="margin-left:20px;color:#9d9d9e">120次</span></p>
          <div class="dashed"></div>
          <div class="info4-down swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <p class="info-normal">在卢俊舟的作品中，“空间”似乎是一个非常突出的特质。他每一个阶段都在尝试着延展自己的边界，形成新的经验，甚至表现出某些跳跃、分裂的节奏，如果说其中有着相对延续性的话，那么最明显的莫过于对“空间与原始巫力的情绪再现”的探索与表现。</p>
                <p class="info-normal">其实，在传统书法概念中，文字的间架结构就具有某种空间的指向，卢俊舟的作品无疑是将此指向发挥到个人理解的极限，这类似一种触发，融合了他对书法由来已久的情感以及对未来的领悟。尤其是在他近阶段的作品。</p>
              </div>
            </div>
            <div class="swiper-scrollbar scroll7"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
<script type="text/javascript">
  (function($,mui){
    let totalSize=0;
    let pageSize=6;
    let currentPage=1;
    $('.main-tab .tab').click(function(){
      $('.main-content .content-item').css('display','none');
      if($(this).index()===0){
        $(this).parent().attr('class','main-tab info-tab1');
        $('.main-content .content-item').eq(0).css('display','block');
      }else if($(this).index()===1){
        $(this).parent().attr('class','main-tab info-tab2');
        $('.main-content .content-item').eq(1).css('display','block');
        con1();
        let info2=new Swiper('#info2', {
          watchSlidesProgress: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          onProgress: function(swiper, progress) {
            for (let i = 0; i < swiper.slides.length; i++) {
              let slide = swiper.slides.eq(i);
              let slideProgress = swiper.slides[i].progress;
              let modify = 1;
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
              }
              let translate = slideProgress * modify * 260 + 'px';
              let scale = 1 - Math.abs(slideProgress) / 5;
              let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
              slide.transform('translateX(' + translate + ') scale(' + scale + ')');
              slide.css('zIndex', zIndex);
              slide.css('opacity', 1);
              if (Math.abs(slideProgress) > 3) {
                slide.css('opacity', 0);
              }
            }
          },
          onSetTransition: function(swiper, transition) {
            for (let i = 0; i < swiper.slides.length; i++) {
              let slide = swiper.slides.eq(i)
              slide.transition(transition);
            }

          },
          onSlideChangeEnd: function(swiper){
            console.log(swiper.activeIndex);
            if(swiper.activeIndex===3 || swiper.activeIndex===6){
              $('.info2-1').css('display','block');
              $('.info2-2').css('display','none');
              $('.info2-3').css('display','none');
              con1();
            }else if(swiper.activeIndex===4){
              $('.info2-1').css('display','none');
              $('.info2-2').css('display','block');
              $('.info2-3').css('display','none');
              con2();
            }else if(swiper.activeIndex===2 || swiper.activeIndex===5){
              $('.info2-1').css('display','none');
              $('.info2-2').css('display','none');
              $('.info2-3').css('display','block');
              con3();
            }
          }
        });
      }else if($(this).index()===2){
        $(this).parent().attr('class','main-tab info-tab3');
        $('.main-content .content-item').eq(2).css('display','block');
        let info3=new Swiper('.info3-right .swiper-container', {
          scrollbar: '.scroll5',
          direction: 'vertical',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true,
          roundLengths : true,
        });
      }else if($(this).index()===3){
        $(this).parent().attr('class','main-tab info-tab4');
        $('.main-content .content-item').eq(3).css('display','block');
        con4();
        mui.init({
          pullRefresh : {
            container:'.mui-scroll-wrapper',
            up : {
              auto:false,
              contentrefresh : "正在加载...",
              contentnomore:'没有更多数据了',
              callback :function(){
                var that=this;
                setTimeout(function() {
                  refreshMore();
                  console.log(currentPage);
                  that.endPullupToRefresh(currentPage*pageSize>totalSize);
                }, 1000);
              }
            }
          }
        })

        }
    })
    //----上拉加载--s
    refreshMore();
    function refreshMore(){
      $.ajax({
        type:'GET',
        url:'/static/touch/base/fakeData.js',
        data:{
          row:pageSize,
          page:currentPage
        },
        success:function(res){
          let result=fakeData.result.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+6);
          currentPage++;
          totalSize=fakeData.total;
          console.log(currentPage);
          var html='';
          for(var i=0;i<result.length;i++){
            if(i===0 && currentPage===2){
              var str ='<div class="info4-tab active"><img src="'+result[i].pic+'" alt=""></div>';
            }else{
              var str ='<div class="info4-tab"><img src="'+result[i].pic+'" alt=""></div>';
            }
            html+=str;
          }
          var oDiv=document.createElement('div');
          oDiv.innerHTML=html;
          if(document.getElementsByClassName('mui-pull-bottom-pocket')[0]){
            document.getElementById('mui-con').insertBefore(oDiv,document.getElementsByClassName('mui-pull-bottom-pocket')[0]);
          }else{
            document.getElementById('mui-con').appendChild(oDiv,document.getElementById('mui-con').children[0]);
          }


          $('.info4-tab').click(function(){
            $('.info4-tab').attr('class','info4-tab');
            $(this).attr('class','info4-tab active');
          })

        },
        error:function(xhr,type,errorThrown){
          console.log("获取请求信息：" + JSON.stringify(xhr));
          console.log("错误描述：" + type);
          console.log("捕获的异常对象：" + JSON.stringify(errorThrown));
        }
      })
    }
    //----上拉加载--e
    let info1=new Swiper('#info1', {
      scrollbar: '.scroll1',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      roundLengths : true,
    });

    function con1(){
      new Swiper('.info2-1 .swiper-container', {
        scrollbar: '.scroll2',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths : true,
      });
    }
    function con2(){
      new Swiper('.info2-2 .swiper-container', {
        scrollbar: '.scroll3',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths : true,
      });
    }
    function con3(){
      new Swiper('.info2-3 .swiper-container', {
        scrollbar: '.scroll4',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths : true,
      });
    }
    function con4(){
      new Swiper('.info4-right .swiper-container', {
        scrollbar: '.scroll7',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths : true,
      });
    }




  }($,mui))
</script>


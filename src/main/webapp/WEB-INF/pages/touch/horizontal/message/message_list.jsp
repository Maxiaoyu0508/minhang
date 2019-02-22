<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <style>
        * {
            font-family: 'microsoft yahei';
        }

        .operate a:hover {
            text-decoration: none;
        }

        .message-con {
            width: 100%;
            height: 100%;
            background: white;
        }

        #list-show {
            height: 651px;
            width: 1460px;
            left: 90px;
            color: #c7c8c9;
            position: absolute;
            top: 53px;
        }

        .operate {
            width: 1246px;
            height: 120px;
            position: absolute;
            top: 744px;
            left: 183px;
        }

        .btn {
            display: flex;
            justify-content: center;
        }

        #list-show .swiper-slide {
            height: auto;
            display: flex;
            flex-wrap: wrap;
        }

        .do-msg {
            width: 253px;
            height: 63px;
            border-radius: 10px;
            line-height: 63px;
            text-align: center;
            background: #f6b42c;
            margin-right: 20px;
            font-size: 30px;
            color: white;
        }

        .list-single {
            width: 24%;
            height: 280px;
            background-size: 100%;
            margin-right: 10px;
        }

        .list-single img {
            width: 100%;
        }
    </style>
    <div class="message-con">
        <div class="swiper-container" id="list-show">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                </div>
            </div>
            <div class="swiper-scrollbar"></div>
        </div>
        <div class="operate">
            <div class="btn">
                <a appendHref="/messageWrite.htm">
                    <div class="do-msg">我要留言</div>
                </a>
            </div>
        </div>
    </div>

<script type="text/javascript">
  $(function () {
    let msgSwiper = new Swiper('.swiper-container', {
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      roundLengths: true,
      draggable: true,
    });

    for (let i = 0; i < 5; i++) {
      $(".swiper-slide").append('<div class="list-single"><img src="${ctxPath}/static/touch/images/msg-bg.png" alt=""></div>')
    }

    $('.operate a').on('click',function () {
      var link = $(this).attr('appendHref');
      $('.touch-main').load(link);
    })
  })
</script>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="dv" uri="http://www.tocersoft.com/jsp/tags/function"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <style>
        *{font-family:'microsoft yahei';}
        .btn a:hover{text-decoration:none;}
        .touch-main{background:white;z-index:0;}
        .message-con{width:100%;height:100%;background:white;}
        .write-area,.write-color{height:651px;border:1px solid #b8b8b8;position:absolute;top:53px;}
        .signature-pad{width:1246px;height:651px;position:absolute;top:53px;left:183px;border:1px solid #b8b8b8;z-index:2}
        .write-area{width:1246px;left:183px;font-size:39px;line-height:651px;text-align:center;color:#c7c8c9;z-index:1;}
        .write-color{width:95px;left:1449px;border-radius:10px;display:flex;justify-content:center;flex-wrap:wrap;}
        .write-color>div{width:56px;height:56px;border-radius:10px;margin-top:12px;border:2px solid white;}
        .write-txt{color:#595757;font-size:17px;text-align:center;}
        .operate{width:1246px;height:120px;position:absolute;top:744px;left:183px;}
        .btn{display:flex;justify-content:center;}
        .do-submit,.do-del{width:253px;height:63px;border-radius:10px;line-height:63px;text-align:center;font-size:30px;color:white;}
        .do-submit{background:#f6b42c;margin-right:20px;}
        .do-del{background:#8cc11f;margin-left:20px;}
        .tip{font-size:18px;color:#c7c8c9;text-align:center;margin-top:20px;}
        .color.active{box-shadow: 0 0 20px orange;}
    </style>

    <div class="message-con">
        <div class="write-area">请在框内书写文字</div>
        <div id="signature-pad" class="signature-pad">
            <canvas style="touch-action:none"></canvas>
        </div>
        <div class="write-color">
            <div class="color active" style="background:black;" data-color="#000"></div>
            <div class="color" style="background:#2ca5df;" data-color="#2ca5df"></div>
            <div class="color" style="background:#1ea939;" data-color="#1ea939"></div>
            <div class="color" style="background:#5f1984;" data-color="#5f1984"></div>
            <div class="color" style="background:#f19500;" data-color="#f19500"></div>
            <div class="color" style="background:#f9ec00;" data-color="#f9ec00"></div>
            <div class="color" style="background:#936134;" data-color="#936134"></div>
            <div class="color" style="background:red;" data-color="#ff0000"></div>
           <p class="write-txt">颜色选择</p>
        </div>
        <div class="operate">
            <div class="btn">
               <div class="do-submit">提交</div>
                <div class="do-del" data-action="clear">清除</div>
            </div>
            <p class="tip">5分钟内没有操作将会被清除，提交后约半小时能看到提交文字。抵制低俗，文明留言</p>
        </div>
    </div>


<script type="text/javascript">
  $(function(){
    let canvas = document.querySelector("canvas");
    let signaturePad = new SignaturePad(canvas,{});
    let clearButton = document.querySelector(".do-del");
    let submitButton = document.querySelector(".do-submit");
    clearButton.addEventListener("click", function (e) {
      signaturePad.clear();
    });
    $('.color').click(function(e){
      $('.color').attr('class','color');
      $(this).attr('class','color active');
      let color=$(this).attr('data-color');
      signaturePad.penColor = color;
    })
    function download(dataURL, filename) {
      if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
        window.open(dataURL);
      } else {
        var blob = dataURLToBlob(dataURL);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
      }
    }
    function dataURLToBlob(dataURL) {
      var parts = dataURL.split(';base64,');
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    }
    submitButton.addEventListener("click", function (event) {
      if (signaturePad.isEmpty()) {
        alert("请书写文字");
      } else {
        var dataURL = signaturePad.toDataURL();
        download(dataURL, "signature.png");
      }
    });
  })
</script>


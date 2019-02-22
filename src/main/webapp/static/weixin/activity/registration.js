
/**确认的手机号*/
function surePhone() {
   var phone = $("#phone").val();
   if(phone == null || phone == ""){
       alert("请输入手机号");
       return;

   }
   window.location.href="/weixin/activity/reservation.htm?item.mobile="+phone+"";
}


function  closeDiv() {
  $('.tc-div').hide();
}
function  openDiv() {
  $('.tc-div').show();
}
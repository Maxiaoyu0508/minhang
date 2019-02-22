$(".in-room").click(function(){
  $(this).css("display","none");
  $(".around").css("display","block");
  $("#map2").css("display",'block');
  $("#map1").css("display",'block');
  $("#map3").css("display",'none');
  $(".mark").css("visibility",'visible');
})

$(".around").click(function(){
  $(this).css("display","none");
  $(".in-room").css("display","block");
  $("#map2").css("display",'none');
  $("#map1").css("display",'none');
  $("#map3").css("display",'block');
  $(".mark").css("visibility",'hidden');
})

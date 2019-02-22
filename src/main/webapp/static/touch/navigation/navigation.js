$(".second-floor").click(function(){
  $("#map1").attr('class','out-down');
  $("#map2").show();
  $("#map2").attr('class','in-down');
  setTimeout(()=>{
    $("#map1").hide();
  },600);
  $(".second-floor .second-small").css("display","none");
  $(".second-floor .second").css("display","block");
  $(".first-floor .first").css("display","none");
  $(".first-floor .first-small").css("display","block");
  $(".mark-second").css("display","block");
  $(".mark-first").css("display","none");
});
$(".first-floor").click(function(){
  // $("#map1").fadeIn(1000);
  // $("#map2").fadeOut(1000);
  $("#map2").attr('class','out-up');
  $("#map1").show();
  $("#map1").attr('class','in-up');
  setTimeout(()=>{
    $("#map2").hide();
  },600);
  $(".second-floor .second-small").css("display","block");
  $(".second-floor .second").css("display","none");
  $(".first-floor .first").css("display","block");
  $(".first-floor .first-small").css("display","none");
  $(".mark-second").css("display","none");
  $(".mark-first").css("display","block");
});

$(".periphery").click(function(){
  $(this).css("display",'none');
  $(".around").css("display",'block');
  $(".first-floor").css("display",'none');
  $(".second-floor").css("display",'none');
  $(".mark-first").css("display",'none');
  $(".mark-second").css("display",'none');
  $(".around-map").css("display",'block');
  $("#map1").css("display",'none');
  $("#map2").css("display",'none');
})

$(".around").click(function(){
  $(this).css("display","none");
  $("#map1").show();
  $("#map1").attr('class','in-up');
  setTimeout(()=>{
    $("#map2").hide();
  },600);
  $(".periphery").css("display","block");
  $(".first-floor").css("display",'block');
  $(".second-floor").css("display",'block');
  $(".first-small").css("display",'none');
  $(".first").css("display",'block');
  $(".second-small").css("display",'block');
  $(".second").css("display",'none');
  $(".mark-first").css("display",'block');
  $(".around-map").css("display",'none');
})

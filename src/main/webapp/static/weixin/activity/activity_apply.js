var chooseSession ;
$(document).ready(function(){
    jeDate("#dateinfo",{
        isShow:false,                                //是否显示为固定日历，为false的时候固定显示
        fixed:false,
        isTime:false,                                //是否开启时间选择
        isClear:false,                               //是否显示清空
        isToday:false,                               //是否显示今天或本月
        minDate:$("#minDay").val(),
        maxDate:$("#maxDate").val(),
        format: 'YYYY-MM-DD',
    });
    //初始化时 根据 开始的日期 去显示场次
    var activityId = $("#activityId").val();
    var minDay = $("#minDay").val();
    $.get(basePath + "/weixin/activity_seession.htm?m="+Math.random(),{"item.activityDate":minDay,"item.activityId":activityId},function(data){
        var activitySessions = data.activitySessions;
        for (var a = 0; a < activitySessions.length; a++) {
            var activity = activitySessions[a].session;
            var sessionsId = activitySessions[a].id;
            $("#activitySession").append("<li id="+sessionsId+">"+activity +"</li>");
        }
        bindLiClick();
    });

    coundDate();
    addActiveClass();
    var checkDate;
    // 计算当前选择的天
    function coundDate() {
        var checkDay;
        var i,a;
        var stop = false;
        var checkMounth = $('.jedate-header .ymbtn').eq(0).html();
        var checkYear = $('.jedate-header .ymbtn').eq(1).html();
        for(i=0;i<$('.daystable tbody tr').length-1;i++){
            for(a=0;a<$('.daystable tbody tr').eq(i).find('td').length;a++){
                if($('.daystable tbody tr').eq(i).find('td').eq(a).attr('class')=== 'normal action' && stop === false){
                    //$('.daystable tbody tr').eq(i).find('td').eq(0).attr('class','normal');
                    stop = true;
                    checkDay =  $('.daystable tbody tr').eq(i).find('td').eq(a).find('p').html();
                    if(checkDay<=9){
                        checkDay='0'+checkDay;
                    }
                    // 月份字符串截取
                    if(checkMounth.length === 2){
                        checkMounth = checkMounth.slice(0,1);
                    }else{
                        checkMounth = checkMounth.slice(0,2);
                    }
                    // 年份字符串截取
                    checkYear =  checkYear.slice(0,4);
                    checkDate = checkYear+'-'+checkMounth+'-'+checkDay;
                    var activityId = $("#activityId").val();
                    $("#activitySession").html("");
                    $.get(basePath + "/weixin/activity_seession.htm?m="+Math.random(),{"item.activityDate":checkDate,"item.activityId":activityId},function(data){
                        var activitySessions = data.activitySessions;
                        for (var b = 0; b < activitySessions.length; b++) {
                            var activity = activitySessions[b].session;
                            var sessionsId = activitySessions[b].id;
                            $("#activitySession").append("<li id="+sessionsId+">"+activity +"</li>");
                        }
                        bindLiClick();
                    });
                    return checkDate
                }
            }
        }
    }

    // 给开始日期 加一个默认选择中效果
    function addActiveClass() {
        var i,a;
        var stop = false;
        // 给起始日期第一天加上选中效果
        for(i=0;i<$('.daystable tbody tr').length-1;i++){
            for(a=0;a<$('.daystable tbody tr').eq(i).find('td').length;a++){
                if($('.daystable tbody tr').eq(i).find('td').eq(a).attr('class')=== 'normal' && stop === false){
                    $('.daystable tbody tr').eq(i).find('td').eq(a).attr('class','normal action');
                    stop = true;
                    return
                }
            }
        }
    }

    // 左箭头切换月份

    $('#dateinfo').bind('click','.mprev,.mnext',function () {
        coundDate();
    })

    function bindLiClick() {
      $(".time-period li").on("click",function () {
        $('.time-period li').removeClass('cur');
        $(this).addClass('cur');
         chooseSession = $(this).attr('id');
      })
    }
});


/***
 * 提交事件
 */
function submitInformation(id) {
    var peopleName = $("#peopleName").val();
    var phone = $("#phone").val();
    var peopleNumber = $("#peopleNumber").val();
    if(phone == null|| phone == ""||peopleNumber == null || peopleNumber == ""||peopleNumber==""||peopleNumber== null){
        alert("手机号，人数姓名，为必填项!")
        return
    }
    if(chooseSession == null||chooseSession==""||chooseSession == "undefined"){
        alert("请选择场次");
        return
    }
    $.get(basePath + "/weixin/activity/submit.htm?m="+Math.random(),{"item.linkMan":peopleName,"item.mobile":phone,"item.number":peopleNumber,"item.activityId":id,"item.activitySessionId":chooseSession},function(data){
        if(data.status == "SUCCESS"){
            alert("保存成功");
            window.location.reload();
        }
    });
}

/***
 * 更改参与人数减
 */
$("body").on("click","#subtract",function () {
        if( $("#peopleNumber").val() == null || $("#peopleNumber").val() == ""||$("#peopleNumber").val() <0||$("#peopleNumber").val() == 0) {
            $("#peopleNumber").val(1);
        }else {
            $("#peopleNumber").val($("#peopleNumber").val()-1);
        }
});

/***
 * 更改参与人数加
 */
$("body").on("click","#add",function ()  {
    if($("#peopleNumber").val() == null || $("#peopleNumber").val() == ""){
        $("#peopleNumber").val(1);
    }else {
        $("#peopleNumber").val(parseInt($("#peopleNumber").val())+1);
    }
});





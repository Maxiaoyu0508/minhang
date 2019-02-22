/**
 * 点赞事件
 */
var flag = true
function awesome (id) {
    // true 表示未点击 flag 已点击
    if(flag) {
        $.get(basePath + "/weixin/exhibit/awesome.htm?m=" + Math.random(), {"item.id": id}, function (data) {
            $("#spotTime").html(parseInt($("#spotTime").html())+1);
            $('.like-box').find('.single-option').hide();
            $('.like-box').find('.single-op').show();
        });
        flag = false;
    }
}

/***
 * 播放音乐事件
 *
 */
var checked = 0
    function music(id) {
    $.get(basePath + "/weixin/exhibit/music.htm?m=" + Math.random(), {"item.id": id}, function (data) {
        var music = data.path;
        alert(music);
    });
  if(checked == 0) {
    $('.detail-top-list').find('img').hide();
    $('.detail-top-list').find('.detail-top-icon').show();
    checked = 1;
  }else{
    $('.detail-top-list').find('img').show();
    $('.detail-top-list').find('.detail-top-icon').hide();
    checked = 0;
  }
}
//3d
function threeDimensions(id) {
    $.get(basePath + "/weixin/exhibit/threeDimensions.htm?m=" + Math.random(), {"item.id": id}, function (data) {
        var cmsArticle = data.cmsArticle;
        alert(cmsArticle);
    });
  if(checked == 1){
    $('.detail-top-list').find('img').show();
    $('.detail-top-list').find('.detail-top-icon').hide();
    checked = 0;
  }
}




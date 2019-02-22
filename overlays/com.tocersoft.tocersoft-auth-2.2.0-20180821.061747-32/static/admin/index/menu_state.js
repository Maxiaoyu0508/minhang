/**
 * 是否展开左侧菜单
 * 修改 menuState 变量值(注意：值应是string类型，请加引号)
 * 0 展开
 * 1 收起
 */
var menuState = '1';
$(document).ready(function () {
  initMenuState(menuState);
});

function initMenuState(menuState) {
  $('#west').attr('flat', menuState);
	if (menuState === '1') {
    $('#west').addClass('west-cur');
    $('#east').addClass('east-cur');
	}
}

/**
 * 是否展开二级菜单
 * 修改 levelTwoMenuState 变量值(注意：值应是string类型，请加引号)
 * 0 全部二级菜单展开
 * 1 如果有2个二级菜单，则全展开，如果有2个以上二级菜单，第一个展开，其他收起
 */
var levelTwoMenuState = '0';
function foldMenu(){
  if (levelTwoMenuState === '0') {
    return
  }
  var count = $("#west").find("ul").length;
  if (count < 3) {
    return
  }
  if (count > 2) {
    $(".west-menu").find("ul").css({'display': 'none'});
    $(".west-menu").find("h2").addClass('west-menu-h2-cur');
    $(".west-menu").eq(0).find("ul").css({'display': 'block'});
    $(".west-menu").eq(0).find("h2").removeClass('west-menu-h2-cur');
  }
}

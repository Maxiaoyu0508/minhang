/*!
 * artDialog notice plugin
 * Date:2012-06-07
 * http://www.tocersoft.com
 * 
 */
artDialog.notice=function(k){var c=k||{},h,a,g,b,j,e=800;var d={id:"Notice",left:"100%",top:"100%",fixed:true,drag:false,resize:false,follow:null,lock:false,init:function(i){h=this;a=h.config;b=h.DOM.wrap;j=parseInt(b[0].style.top);g=j+b[0].offsetHeight;b.css("top",g+"px").animate({top:j+"px"},e,function(){c.init&&c.init.call(h,i)})},close:function(i){b.animate({top:g+"px"},e,function(){c.close&&c.close.call(this,i);a.close=$.noop;h.close()});return false}};for(var f in c){if(d[f]===undefined){d[f]=c[f]}}return artDialog(d)};
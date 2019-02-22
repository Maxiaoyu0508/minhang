(function ($) {
    $.fn.extend({
        //插件名称 - cityLocation
        CityLocation: function (options) {

            //参数和默认值
            var defaults = {
                province:"",
                city:"",
                district:"",
                provinceList:{}
            };

			var options = $.extend(defaults, options);

            return this.each(function () {
                var o = options;

                //将元素集合赋给变量 本例中是 ul对象 
                var obj = $(this);

                //得到ul中的a对象
                var selectUI = $(obj).children("select");
				//判断是否有省份选择框
				if(selectUI.length > 0){
					$(selectUI[0]).empty();
					$(selectUI[0]).append("<option value=''>--请选择省份--</option>");
					if(selectUI.length > 1){
						$(selectUI[1]).empty();
						$(selectUI[1]).append("<option value=''>--请选择城市--</option>");
						/**
						 * 绑定城市选择框事件
						 */
						$(selectUI[1]).change(function() {
							var c = $(this).val();
							if(selectUI.length > 2){
								$(selectUI[2]).empty();
								$(selectUI[2]).append("<option value=''>请选择区县</option>");
							}
							$.each(o.provinceList[c], function(x, y) { // 继续加载区县选择框
								var opt = $('<option />');
								opt.val(x);
								opt.html(y);
								$(selectUI[2]).append(opt);
							});
						});
					}
					
					if(selectUI.length > 2){
						$(selectUI[2]).empty();
						$(selectUI[2]).append("<option value=''>--请选择区县--</option>");
						$(selectUI[2]).change(function() {
							var c = $(this).val();
						});
					}
					$.each(o.provinceList["86"], function(i, n) {
						var opt1 = $('<option />');
						opt1.val(i);
						opt1.html(n);
						$(selectUI[0]).append(opt1);
						if (i == parseInt(o.province)) { // 默认选中原省份
							opt1.attr('selected', 'selected');
							//判断是否有城市选择框
							if(selectUI.length > 1){
								$.each(o.provinceList[i], function(x, y) { // 继续加载城市选择框
									var opt2 = $('<option />');
									opt2.val(x);
									opt2.html(y);
									$(selectUI[1]).append(opt2);
									if (x == parseInt(o.city)) { // 默认选中原城市
										opt2.attr('selected', 'selected');
										//判断是否有区县选择框
										if(selectUI.length > 2){
											$.each(o.provinceList[x], function(z, h) { // 继续加载区县选择框
												var opt3 = $('<option />');
												opt3.val(z);
												opt3.html(h);
												$(selectUI[2]).append(opt3);
												if (z == o.district) {
													opt3.attr('selected','selected');
												}
											});
										}
									}
								});
							}
						}
					});
					
					/**
					 * 绑定省份选择框事件
					 */
					$(selectUI[0]).change(function() {
						var c = $(this).val();
						//判断如果有城市选择框
						if(selectUI.length > 1){
							$(selectUI[1]).empty();
							$(selectUI[1]).append("<option value=''>请选择城市</option>");
							if(selectUI.length > 2){
								$(selectUI[2]).empty();
								$(selectUI[2]).append("<option value=''>请选择区县</option>");
							}
							$.each(o.provinceList[c], function(x, y) { // 继续加载城市选择框
								var opt2 = $('<option />');
								opt2.val(x);
								opt2.html(y);
								$(selectUI[1]).append(opt2);
							});
						}
					});
				}
            });
        }
    });
})(jQuery);



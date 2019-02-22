/*!
 * 省市区下拉框控件 v1.0.0
 * http://www.tocersoft.com
 * author:zhangqiang
 * email:zhangqiang@tocersoft.com
 * 使用方法：
 * 1.初始化
 * 	页面：	<div id="regionDivSelect"></div>
 * 	js代码：	var regionSelect = $("#regionDivSelect").regionselect({
 * 				provinceSelectName : 'province',	//省份下拉框name
 *	        		citySelectName : 'city',	//城市下拉框name
 *	        		districtSelectName : 'district'	//地区下拉框name
 *	        		reversalId : 0		//逆推Id 可不写这个属性
 * 			});
 * 2.获取值
 *  var selectedProvince = regionSelect.getProvince();	//获取选择的省份
 *	var selectedCity = regionSelect.getCity();	//获取选择的城市
 *	var selectedDistrict = regionSelect.getDistrict();	//获取选择的地区
 *  console.log("selectedProvince:" + selectedProvince.value + "," + selectedProvince.text);
 *	console.log("selectedCity:" + selectedCity.value + "," + selectedCity.text);
 *	console.log("selectedDistrict:" + selectedDistrict.value + "," + selectedDistrict.text);
 * 
 * Copyright (c) 2017-2018 Tocersoft Inc.
 * Date: 2017-09-30 14:34
 */
;(function ($) {
	//注册方法
	$.fn.regionselect = function(option){
		
		var $element = $(this);
		
		//参数和默认值
        var defaults = {
			url : basePath + '/system/region/listSysRegionByParentId.htm',	//加载数据url地址
			selectCls : '',	//下拉框公共样式
            provinceSelectName : 'province',	//省份下拉框name
            citySelectName : 'city',	//城市下拉框name
            districtSelectName : 'district', //地区下拉框name
            reversalId : 0		//逆推Id
        };

		var options = $.extend(defaults, option);
		//创建控件
		var regionSelect = new TocerRegionSelect($element, options);
		return regionSelect;
	}
	
	/**
	 * 地区下拉选择框
	 */
	function TocerRegionSelect(container,options){
		this.$container = $(container);
        this.options = $.extend({}, options);
        this.init();
        
        return this;
	}
	
	TocerRegionSelect.prototype = {
        constructor: TocerRegionSelect,
        init: function () {
            this.render();	//渲染dom
			this.bind();	//绑定事件
        },
        
        /**
         * 渲染dom
         */
        render: function(){
        		//渲染省份下拉框、城市下拉框、地区下拉框
        		var provinceSelectEl = '<select name="' + this.options.provinceSelectName + '" class="fl"  style="height:24px;width:30%;"><option value="">-- 请选择省份 --</option></select>';
        		var citySelectEl = '<select name="' + this.options.citySelectName + '" class="fl ml5"  style="height:24px;width:35%;"><option value="">-- 请选择城市 --</option></select>';
        		var districtSelectEl = '<select name="' + this.options.districtSelectName + '" class="fl ml5"  style="height:24px;width:30%;"><option value="">-- 请选择地区 --</option></select>';
        		
        		//加入容器
        		this.$container.append(provinceSelectEl);
        		this.$container.append(citySelectEl);
        		this.$container.append(districtSelectEl);
        		
        		//声明元素
        		this.$provinceSelectEl = this.$container.find("select[name='" + this.options.provinceSelectName + "']");
        		this.$citySelectEl = this.$container.find("select[name='" + this.options.citySelectName + "']");
        		this.$districtSelectEl = this.$container.find("select[name='" + this.options.districtSelectName + "']");
        		if (this.options.reversalId == 0){
        			//加载数据
        			this.refresh();
                }else {
        			//通过子区域Id逆推选中父类
					this.reversal();
				}
        },
        /**
		 *
         */
        reversal:function () {
            this.reversalLoadData(this)
        },
        /**
         * 重置
         */
        refresh: function(){
	        	//加载省份数据
	    		this.loadData(this.$provinceSelectEl,0);
        },
        /**
         * 绑定事件
         */
        bind: function(){
        		//绑定省份切换事件
        		this.$provinceSelectEl.on('change',$.proxy(function(){
        			var val = this.$provinceSelectEl.val();
        			//加载城市数据
        			this.loadData(this.$citySelectEl,val);
        		},this));
        		
        		//绑定城市切换事件
        		this.$citySelectEl.on('change',$.proxy(function(){
        			var val = this.$citySelectEl.val();
        			//加载城市数据
        			this.loadData(this.$districtSelectEl,val);
        		},this));
        },

        /**
         * 加载下拉框数据
         */
        loadData: function(el,parentId){
        		//清空数据
        		el.find("option:gt(0)").remove();
        		el.next("select").each(function(){
        			$(this).find("option:gt(0)").remove();
        		});
        		
        		if(parentId.length == 0){
        			return;
        		}
        		
        		var url = this.options.url;
        		$.post(url,{'condition.parentId':parentId},function(data){
        			if(data.status != "success"){
        				return;
        			}
        			
        			var itemList = data.data;
        			for(var i=0;i<itemList.length;i++){
        				var curRegion = itemList[i];
        				var opt = '<option value="' + curRegion.id + '">' + curRegion.name + '</option>';
        				el.append(opt);
        			}
        		});
        },
        /**
         * 通过Id选中并加载下拉框数据
         */
        reversalLoadData: function(jqObject){
            var url = '/system/region/listSysRegionByReversalId.htm';

            $.ajaxSettings.async = false;
            $.post(url,{'condition.id':jqObject.options.reversalId},function(data){
                if(data.status != "SUCCESS"){
                    return;
                }

                var district = data.district;
                var city = data.city;
                var province = data.province;
                var opt = '';
                if (district){

                    for(var i=0;i<district.length;i++){
                        var curRegion = district[i];
                        if(curRegion.default == 1){
                            opt+='<option value="' + curRegion.id + '" selected>' + curRegion.name + '</option>';
                            parentId = curRegion.parentId;
                        }else {
                            opt+='<option value="' + curRegion.id + '">' + curRegion.name + '</option>';
                        }
                    }
                    //清空数据
                    jqObject.$districtSelectEl.find("option:gt(0)").remove();
                    jqObject.$districtSelectEl.prev("select").each(function(){
                        $(this).find("option:gt(0)").remove();
                    });

                    jqObject.$districtSelectEl.append(opt)
					opt = '';
				}
                if (city){
                    for(var i=0;i<city.length;i++){
                        var curRegion = city[i];
                        if(curRegion.default == 1){
                            opt+='<option value="' + curRegion.id + '" selected>' + curRegion.name + '</option>';
                            parentId = curRegion.parentId;
                        }else {
                            opt+='<option value="' + curRegion.id + '">' + curRegion.name + '</option>';
                        }
                    }
                    //清空数据
                    jqObject.$citySelectEl.find("option:gt(0)").remove();
                    jqObject.$citySelectEl.prev("select").each(function(){
                        $(this).find("option:gt(0)").remove();
                    });
                    jqObject.$citySelectEl.append(opt);
                    opt = '';
                }
                if (province){
                    for(var i=0;i<province.length;i++){
                        var curRegion = province[i];
                        if(curRegion.default == 1){
                            opt+='<option value="' + curRegion.id + '" selected>' + curRegion.name + '</option>';
                            parentId = curRegion.parentId;
                        }else {
                            opt+='<option value="' + curRegion.id + '">' + curRegion.name + '</option>';
                        }
                    }
                    jqObject.$provinceSelectEl.find("option:gt(0)").remove();
                    jqObject.$provinceSelectEl.prev("select").each(function(){
                        $(this).find("option:gt(0)").remove();
                    });
                    jqObject.$provinceSelectEl.append(opt);
                    opt = '';
                }
            });
        },
        /**
         * 获取选择的省份
         */
        getProvince: function(){
        		var data = this.getSelectData(this.$provinceSelectEl);
        		return data;
        },
        
        /**
         * 获取选择的城市
         */
        getCity: function(){
	    		var data = this.getSelectData(this.$citySelectEl);
        		return data;
        },
        
        /**
         * 获取选择的地区
         */
        getDistrict: function(){
	    		var data = this.getSelectData(this.$districtSelectEl);
        		return data;
        },
        
        /**
         * 获取选择的值
         */
        getSelectData: function(el){
        		var val = el.val();
        		var text = el.find("option[value='" + val + "']").text();
        		var data = {
        			"value":val,
        			"text":text
        		}
        		
        		return data;
        }
	};
	
})(jQuery);
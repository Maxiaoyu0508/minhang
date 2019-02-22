/*!
 * 进度日志组件progresslogger v1.0.0
 * http://www.tocersoft.com
 * author:zhangqiang
 * email:zhangqiang@tocersoft.com
 * 使用方法：
 * 1.初始化
 * 	页面：	<textarea id="progressLogView" rows="10" cols="10" style="width:98%;height:200px;resize:none" readonly="readonly"></textarea>
 * 	js代码：	var progressLogger = $("#progressLogView").progresslogger();
 * 2.启动日志
 *  js代码： progressLogger.start(optKey);	//optKey为本次业务操作KEY
 * 3.停止日志
 * 	js代码：progressLogger.stop();
 * 
 * Copyright (c) 2017-2018 Tocersoft Inc.
 * Date: 2017-10-18 09:53
 */
;
(function($) {
	// 注册方法
	$.fn.progressLogger = function(option) {

		var $element = $(this);

		// 参数和默认值
		var defaults = {
			url : basePath + '/admin/system/progress/log/listSysProgressLogByCondition.htm' // 加载日志url地址
		};

		var options = $.extend(defaults, option);

		// 创建控件
		var progressLogger = new TocerProgressLogger($element, options);
		return progressLogger;
	}

	/**
	 * 地区下拉选择框
	 */
	function TocerProgressLogger(container, options) {
		this.$container = $(container);
		this.options = $.extend({}, options);
		this.init();

		return this;
	}

	TocerProgressLogger.prototype = {
		constructor : TocerProgressLogger,

		/**
		 * 初始化
		 */
		init : function() {
			this.optKey = null; // 业务操作KEY
			this.searchProgressLogInterval = null;	//定时器
			this.lastSearchProgressLogId = null; // 上一次查询日志ID
		},

		/**
		 * 启动日志
		 */
		start : function(optKey) {
			var that = this;
			that.optKey = optKey;
			that.searchProgressLogInterval = window.setInterval(function() {
				that.loadData(that.optKey);
			}, 1000);
		},

		/**
		 * 加载数据
		 */
		loadData : function(optKey) {
			var that = this;
			$.post(that.options.url, {
				'condition.optKey' : that.optKey,
				"condition.lastSearchId" : that.lastSearchProgressLogId
			}, function(data) {
				that.render(data);
			});
		},

		/**
		 * 渲染dom
		 */
		render : function(data) {
			if (data.status != "success") {
				// 停止定时器
				this.stop();
				return;
			}

			var resultList = data.data;
			for (var i = 0; i < resultList.length; i++) {
				var item = resultList[i];

                var oldVal = this.$container.val();
                // 每20行重置
                var valArr = oldVal.split('.');
                if (valArr.length > 20) {
                	oldVal = "";
				}
                var newVal = oldVal + "  " + item.createDate + "\t"
                    + item.content + "." + "\n" ;
				this.$container.val(newVal);

				// 保持在最底部
				var progressLogViewScrollTop = this.$container[0].scrollHeight;
				this.$container.scrollTop(progressLogViewScrollTop);

				// 最后一条，记录下ID
				if (i == resultList.length - 1) {
					this.lastSearchProgressLogId = item.id;
				}

				if (item.finishFlag == 1) {
					// 已经结束
					this.stop();
				}
			}
		},

		/**
		 * 停止日志
		 */
		stop : function() {
			window.clearInterval(this.searchProgressLogInterval);
			this.searchProgressLogInterval = null;
			this.lastSearchProgressLogId = null;
		}
	};

})(jQuery);
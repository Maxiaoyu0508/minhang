$.fn.tag=function(options){
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}
	
	var $this=this;
	
	$this.addClass('ui-input-tag');
	var opts={
		formFieldId:null,//输入框ID
		formFieldName:null//输入框名称
	}
	opts=$.extend(opts,options);
	
	var data=$this.text();
	$this.html('');
	
	var inputField=$("<input />");
	if(opts.formFieldName){
		inputField.attr('name',opts.formFieldName);
	}else{
		inputField.attr('name',"tags");
	}
	inputField.attr('max-length',50);
	
	if(opts.formFieldName){
		inputField.attr('id',opts.formFieldId);
	}else{
		inputField.attr('id',"tags");
	}
	
	inputField.attr('type','hidden');
	$this.append(inputField);
	
	var input=$("<input />");
	$this.append(input);
	input.keydown(function(event){
		var code = event.keyCode;
		var v=$.trim($(this).val());
		if(code==8&&v.length==0){
			$this.children('.ui-tag').last().remove();
			return;
		}
		if(code == 13 && v != ";"&& v != "；" && v.lenth != 0){
			
		}
		
	});
	input.keyup(function(event){
		var code = event.keyCode;
		var v=$.trim($(this).val());
		if(code == 13 && v != ";"&& v != "；" && v.lenth != 0){
			limitLength(v);
			buildTag(v);
		}else{
			if(v==";"||v=="；"){
				$(this).val('');
				return;
			}
			var has=v.lastIndexOf(";");
			if(has==-1){
				has=v.lastIndexOf("；");
			}
			if(has!=-1&&v.length>1){
				var lastWord=v.substring(v.length-1);
				if(lastWord==";"||lastWord=="；"){
					v = v.substring(0,v.length-1);
					buildTag(v);
				}
			}else{
				limitLength(v);
			}
		}
	});
	input.blur(function(){
		var v=$.trim($(this).val());
		if(v.length>0&&v!=";"&&v!="；"){
			limitLength(v);
			buildTag(v);
		}
	});
	
	function limitLength(v){
		while(true){
			var len=0;
			for (var i = 0; i < v.length; i++) {
				var letter = v.charCodeAt(i);
				len = len + ((letter >= 0x4e00 && letter <= 0x9fa5) ? 2 : 1); 
			}
			if(len>30){
				v = v.substring(0,v.length-2);
				input.val(v);
				continue;
			}else{
				break;
			}
		}
	}
	
	//初始化默认的标签
	if(data.length>0){
		var tagArr = data.split(';');
		$.each(tagArr,function(i,n){
			buildTag(n);
		});		
	}
	
	//点击获得焦点
	$this.click(function(){input.focus();});
	
	function buildTag(v){
		v=$.trim(v);
		v=v.replace(' ','');
		v=v.replace(';','');
		v=v.replace('；','');
		if(v.length==0){
			$(this).val('');
			return;
		}
		var tag=$("<span />");
		tag.addClass('ui-tag');
		tag.html(v.substring(0,v.length));
		
		input.val('');
		tag.insertBefore(input);
		
		var close=$("<i />");
		close.html("&nbsp;");
		close.addClass('ui-tag-close');
		tag.append(close);
		close.click(function(){
			tag.remove();
			getTagText();
		});
		getTagText();
		enableInput();
	}
	
	function enableInput(){
		/** 不限制数量
		 * if($this.children('.ui-tag').length>=20){
			input.hide();
		}else{
			input.show();
		}*/
	}
	
	function getTagText(){
		var tags="";
		$this.children('.ui-tag').each(function(i,n){
			var v=$.trim($(n).text());
			v=v.replace(' ','');
			tags+=v+";";
		});
		inputField.val(tags);
	}
	
	return $this;
}
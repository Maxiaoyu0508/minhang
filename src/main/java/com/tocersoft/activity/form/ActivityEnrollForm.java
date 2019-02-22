package com.tocersoft.activity.form;

import com.tocersoft.activity.dto.ActivityEnrollCondition;
import com.tocersoft.activity.entity.ActivityEnroll;
import com.tocersoft.base.web.form.BaseForm;

public class ActivityEnrollForm extends BaseForm<ActivityEnroll>{

	private static final long serialVersionUID = 2776856511642861874L;

	private ActivityEnroll item = new ActivityEnroll();

	private ActivityEnrollCondition condition = new ActivityEnrollCondition();
	
	/**
	 * 是否发送短信
	 */
	private Integer isSendSMS;

	public ActivityEnrollForm() {
		super();
	}

	public ActivityEnroll getItem() {
		return item;
	}

	public void setItem(ActivityEnroll item) {
		this.item = item;
	}

	public ActivityEnrollCondition getCondition() {
		return condition;
	}

	public void setCondition(ActivityEnrollCondition condition) {
		this.condition = condition;
	}

	public Integer getIsSendSMS() {
		return isSendSMS;
	}

	public void setIsSendSMS(Integer isSendSMS) {
		this.isSendSMS = isSendSMS;
	}
	
}

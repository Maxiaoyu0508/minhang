package com.tocersoft.activity.form;

import com.tocersoft.base.web.form.BaseForm;
import com.tocersoft.activity.entity.ActivitySession;

import com.tocersoft.activity.dto.ActivitySessionCondition;


/**
 * 类 名: ActivitySession
 * 描 述: 活动场次表
 * 作 者: 李灯
 * 创 建：2018年11月02日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
public class ActivitySessionForm extends BaseForm<ActivitySession> {

    /** 活动场次表 */
	private ActivitySession item = new ActivitySession();
	/** 活动场次表查询条件 */
	private ActivitySessionCondition condition = new ActivitySessionCondition();

	/** 获取活动场次表 */
	public ActivitySession getItem(){
		return this.item;
	}

	/** 设置活动场次表 */
	public void setItem(ActivitySession item){
		this.item = item;
	}

	/** 获取活动场次表查询条件 */
	public ActivitySessionCondition getCondition(){
		return this.condition;
	}

	/** 设置活动场次表查询条件 */
	public void setCondition(ActivitySessionCondition condition){
		this.condition = condition;
	}

}
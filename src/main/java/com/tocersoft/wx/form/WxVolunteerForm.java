package com.tocersoft.wx.form;

import com.tocersoft.base.web.form.BaseForm;
import com.tocersoft.wx.entity.WxVolunteer;

import com.tocersoft.wx.dto.WxVolunteerCondition;


/**
 * 类 名: WxVolunteer
 * 描 述: 志愿者招募
 * 作 者: 工商-徐晋
 * 创 建：2018年11月08日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
public class WxVolunteerForm extends BaseForm<WxVolunteer> {

    /** 志愿者招募 */
	private WxVolunteer item = new WxVolunteer();
	/** 志愿者招募查询条件 */
	private WxVolunteerCondition condition = new WxVolunteerCondition();

	/** 获取志愿者招募 */
	public WxVolunteer getItem(){
		return this.item;
	}

	/** 设置志愿者招募 */
	public void setItem(WxVolunteer item){
		this.item = item;
	}

	/** 获取志愿者招募查询条件 */
	public WxVolunteerCondition getCondition(){
		return this.condition;
	}

	/** 设置志愿者招募查询条件 */
	public void setCondition(WxVolunteerCondition condition){
		this.condition = condition;
	}

}
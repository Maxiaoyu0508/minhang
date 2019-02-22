package com.tocersoft.activity.entity;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
import org.apache.ibatis.type.Alias;

import com.tocersoft.base.entity.BaseBusLongEntity;

/**
 * 类 名: ActivitySession
 * 描 述: 活动场次表
 * 作 者: 李灯
 * 创 建：2018年11月02日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
@Alias("activitySession")
public class ActivitySession extends BaseBusLongEntity {
	/**  */
	private static final long serialVersionUID = 1L;

	/** 活动日期 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date activityDate;
	/** 活动ID */
	private Long activityId;
	/** 活动场次 */
	private String session;
	/** 限定人数 */
	private Integer limitederson;

	public ActivitySession() {
		super();
	}

	/** 活动日期 */
	public Date getActivityDate(){
		return this.activityDate;
	}

	/** 活动日期 */
	public void setActivityDate(Date activityDate){
		this.activityDate = activityDate;
	}

	/** 活动ID */
	public Long getActivityId(){
		return this.activityId;
	}

	/** 活动ID */
	public void setActivityId(Long activityId){
		this.activityId = activityId;
	}

	/** 活动场次 */
	public String getSession(){
		return this.session;
	}

	/** 活动场次 */
	public void setSession(String session){
		this.session = session;
	}
	/** 限定人数 */
	public Integer getLimitederson() {
		return limitederson;
	}
	/** 限定人数 */
	public void setLimitederson(Integer limitederson) {
		this.limitederson = limitederson;
	}
}
package com.tocersoft.activity.dto;

import com.tocersoft.base.dto.BaseCondition;

import java.util.Date;

public class ActivityCondition extends BaseCondition {

	/** 活动标题 */
	private String name;
	/** 活动主图 */
	private String imageMain;
	/** 列表缩略图 */
	private String imageThumb;
	/** 活动地点 */
	private String address;
	/** 活动时间说明 */
	private String timeNote;
	/** 报名说明 */
	private String enrollNote;
	/** 报名名额 */
	private String enrollNum;
	/** 活动简介 */
	private String summary;
	/** 活动介绍 */
	private String htmlDesc;
	/** 活动特色  */
	private String htmlFeature;
	/** 会议议程 */
	private String htmlAgenda;
	/** 出席嘉宾 */
	private String htmlGuests;
	/** 活动开始时间 */
	private Date timeBegin;
	/** 活动结束时间 */
	private Date timeEnd;
	/** 取得条数 */
	private Integer limit;
	/**活动状态不等于0的*/
	private  Integer noEqualstate;
	/**活动ID 用于更多显示*/
	private	 Long activityId;
	/** 活动标题 */
	public String getName(){
		return this.name;
	}

	/** 活动标题 */
	public void setName(String name){
		this.name = name;
	}
	/** 活动主图 */
	public String getImageMain(){
		return this.imageMain;
	}

	/** 活动主图 */
	public void setImageMain(String imageMain){
		this.imageMain = imageMain;
	}
	/** 列表缩略图 */
	public String getImageThumb(){
		return this.imageThumb;
	}

	/** 列表缩略图 */
	public void setImageThumb(String imageThumb){
		this.imageThumb = imageThumb;
	}
	/** 活动地点 */
	public String getAddress(){
		return this.address;
	}

	/** 活动地点 */
	public void setAddress(String address){
		this.address = address;
	}
	/** 活动时间说明 */
	public String getTimeNote(){
		return this.timeNote;
	}

	/** 活动时间说明 */
	public void setTimeNote(String timeNote){
		this.timeNote = timeNote;
	}
	/** 报名说明 */
	public String getEnrollNote(){
		return this.enrollNote;
	}

	/** 报名说明 */
	public void setEnrollNote(String enrollNote){
		this.enrollNote = enrollNote;
	}
	/** 报名名额 */
	public String getEnrollNum(){
		return this.enrollNum;
	}

	/** 报名名额 */
	public void setEnrollNum(String enrollNum){
		this.enrollNum = enrollNum;
	}
	/** 活动简介 */
	public String getSummary(){
		return this.summary;
	}

	/** 活动简介 */
	public void setSummary(String summary){
		this.summary = summary;
	}
	/** 活动介绍 */
	public String getHtmlDesc(){
		return this.htmlDesc;
	}

	/** 活动介绍 */
	public void setHtmlDesc(String htmlDesc){
		this.htmlDesc = htmlDesc;
	}
	/** 活动特色  */
	public String getHtmlFeature(){
		return this.htmlFeature;
	}

	/** 活动特色  */
	public void setHtmlFeature(String htmlFeature){
		this.htmlFeature = htmlFeature;
	}
	/** 会议议程 */
	public String getHtmlAgenda(){
		return this.htmlAgenda;
	}

	/** 会议议程 */
	public void setHtmlAgenda(String htmlAgenda){
		this.htmlAgenda = htmlAgenda;
	}
	/** 出席嘉宾 */
	public String getHtmlGuests(){
		return this.htmlGuests;
	}

	/** 出席嘉宾 */
	public void setHtmlGuests(String htmlGuests){
		this.htmlGuests = htmlGuests;
	}
	/** 活动开始时间 */
	public Date getTimeBegin() {
		return timeBegin;
	}
	/** 活动开始时间 */
	public void setTimeBegin(Date timeBegin) {
		this.timeBegin = timeBegin;
	}
	/** 活动结束时间 */
	public Date getTimeEnd() {
		return timeEnd;
	}
	/** 活动结束时间 */
	public void setTimeEnd(Date timeEnd) {
		this.timeEnd = timeEnd;
	}
	/** 取得条数 */
	public Integer getLimit() {
		return limit;
	}
	/** 取得条数 */
	public void setLimit(Integer limit) {
		this.limit = limit;
	}


	public Integer getNoEqualstate() {
		return noEqualstate;
	}

	public void setNoEqualstate(Integer noEqualstate) {
		this.noEqualstate = noEqualstate;
	}



	public Long getActivityId() {
		return activityId;
	}

	public void setActivityId(Long activityId) {
		this.activityId = activityId;
	}
}

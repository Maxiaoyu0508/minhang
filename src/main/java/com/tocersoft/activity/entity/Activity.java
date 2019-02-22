package com.tocersoft.activity.entity;

import com.tocersoft.base.entity.BaseBusLongEntity;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 活动信息
 * @creator     拓者码工
 * @create-time 2016/5/18 13:53:40
 * @email developer@tocersoft.com
 * @company www.tocersoft.com
 * @version 1.0
 */
@Alias("activity")
public class Activity extends BaseBusLongEntity {
	/**  */
	private static final long serialVersionUID = 1L;

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
	/** 活动开始时间 */
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date timeBegin;
	/** 活动结束时间 */
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date timeEnd;
	/** 主办单位 */
	private String organizerMain;
	/** 协办单位 */
	private String organizerSupport;
	/** 报名说明 */
	private String enrollNote;
	/** 报名名额 */
	private String enrollNum;
	/** 报名开始时间 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date enrollTimeBegin;
	/** 报名结束时间 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date enrollTimeEnd;
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
	/** 活动状态：0-草稿，1-预告，2-正在进行，3-已结束 */
	private Integer state;
	/** 活动类型 */
	private Integer type;
	/** 排序 */
	private Integer sort;
	/** 活动单价 */
	private Integer unitPrice;
	/**活动ID 用于更多显示*/
	private	 Long activityId;
	/** 二维码路径*/
	private String qrCode;


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

	/** 活动开始时间 */
	public Date getTimeBegin(){
		return this.timeBegin;
	}

	/** 活动开始时间 */
	public void setTimeBegin(Date timeBegin){
		this.timeBegin = timeBegin;
	}

	/** 活动结束时间 */
	public Date getTimeEnd(){
		return this.timeEnd;
	}

	/** 活动结束时间 */
	public void setTimeEnd(Date timeEnd){
		this.timeEnd = timeEnd;
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

	/** 报名开始时间 */
	public Date getEnrollTimeBegin(){
		return this.enrollTimeBegin;
	}

	/** 报名开始时间 */
	public void setEnrollTimeBegin(Date enrollTimeBegin){
		this.enrollTimeBegin = enrollTimeBegin;
	}

	/** 报名结束时间 */
	public Date getEnrollTimeEnd(){
		return this.enrollTimeEnd;
	}

	/** 报名结束时间 */
	public void setEnrollTimeEnd(Date enrollTimeEnd){
		this.enrollTimeEnd = enrollTimeEnd;
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

	/** 活动状态：0-草稿，1-预告，2-正在进行，3-已结束 */
	public Integer getState(){
		return this.state;
	}

	/** 活动状态：0-草稿，1-预告，2-正在进行，3-已结束 */
	public void setState(Integer state){
		this.state = state;
	}

	/** 活动类型 */
	public Integer getType(){
		return this.type;
	}

	/** 活动类型 */
	public void setType(Integer type){
		this.type = type;
	}

	/** 排序 */
	public Integer getSort(){
		return this.sort;
	}

	/** 排序 */
	public void setSort(Integer sort){
		this.sort = sort;
	}
	/** 主办单位 */
	public String getOrganizerMain() {
		return organizerMain;
	}
	/** 主办单位 */
	public void setOrganizerMain(String organizerMain) {
		this.organizerMain = organizerMain;
	}
	/** 协办单位 */
	public String getOrganizerSupport() {
		return organizerSupport;
	}
	/** 协办单位 */
	public void setOrganizerSupport(String organizerSupport) {
		this.organizerSupport = organizerSupport;
	}
	/** 活动单价 */
	public Integer getUnitPrice() {
		return unitPrice;
	}
	/** 活动单价 */
	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}


	public Long getActivityId() {
		return activityId;
	}

	public void setActivityId(Long activityId) {
		this.activityId = activityId;
	}

	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}
}
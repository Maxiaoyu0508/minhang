package com.tocersoft.activity.entity;

import com.tocersoft.base.entity.BaseBusLongEntity;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


/**
 * 活动报名
 * @creator     拓者码工
 * @create-time 2016/5/18 13:53:41
 * @email developer@tocersoft.com
 * @company www.tocersoft.com
 * @version 1.0
 */
@Alias("activityEnroll")
public class ActivityEnroll extends BaseBusLongEntity {
	/**  */
	private static final long serialVersionUID = 1L;

	/** 活动ID */
	private Long activityId;
	/** 联系人 */
	private String linkMan;
	/** 性别：0-女，1-男 */
	private Integer sex;
	/** 手机号码 */
	private String mobile;
	/** 固定电话 */
	private String telephone;
	/** 电子邮箱 */
	private String email;
	/** 报名时间 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date enrollTime;
	/** 状态 0：未审核 1：审核通过 2：审核未通过 */
	private Integer state;
	/** 活动信息 */
	private Activity activity;
	/** 报名人数 */
	private Integer number;
	/** 付款方式 1.线下付款 线下付款需要审核 2.线上付款 */
	private Integer payState;
	/** 总金额*/
	private Double sumPrice;
	/** 会员ID */
	private Long memberId;
	/** 活动场次Id */
	private Long activitySessionId;

	public ActivityEnroll() {
		super();
	}

	/** 活动ID */
	public Long getActivityId(){
		return this.activityId;
	}

	/** 活动ID */
	public void setActivityId(Long activityId){
		this.activityId = activityId;
	}

	/** 联系人 */
	public String getLinkMan(){
		return this.linkMan;
	}

	/** 联系人 */
	public void setLinkMan(String linkMan){
		this.linkMan = linkMan;
	}

	/** 性别：0-女，1-男 */
	public Integer getSex(){
		return this.sex;
	}

	/** 性别：0-女，1-男 */
	public void setSex(Integer sex){
		this.sex = sex;
	}

	/** 手机号码 */
	public String getMobile(){
		return this.mobile;
	}

	/** 手机号码 */
	public void setMobile(String mobile){
		this.mobile = mobile;
	}

	/** 固定电话 */
	public String getTelephone(){
		return this.telephone;
	}

	/** 固定电话 */
	public void setTelephone(String telephone){
		this.telephone = telephone;
	}

	/** 电子邮箱 */
	public String getEmail(){
		return this.email;
	}

	/** 电子邮箱 */
	public void setEmail(String email){
		this.email = email;
	}

	/** 报名时间 */
	public Date getEnrollTime(){
		return this.enrollTime;
	}

	/** 报名时间 */
	public void setEnrollTime(Date enrollTime){
		this.enrollTime = enrollTime;
	}

	/** 状态 0：未审核 1：审核通过 2：审核未通过 */
	public Integer getState(){
		return this.state;
	}

	/** 状态 0：未审核 1：审核通过 2：审核未通过 */
	public void setState(Integer state){
		this.state = state;
	}

	/** 活动信息 */
	public Activity getActivity(){
		return this.activity;
	}

	/** 活动信息 */
	public void setActivity(Activity activity){
		this.activity = activity;
	}
	/** 报名人数 */
	public Integer getNumber() {
		return number;
	}
	/** 报名人数 */
	public void setNumber(Integer number) {
		this.number = number;
	}
	/** 付款方式 1.线下付款 线下付款需要审核 2.线上付款 */
	public Integer getPayState() {
		return payState;
	}	
	/** 付款方式 1.线下付款 线下付款需要审核 2.线上付款 */
	public void setPayState(Integer payState) {
		this.payState = payState;
	}
	/** 总金额*/
	public Double getSumPrice() {
		return sumPrice;
	}
	/** 总金额*/
	public void setSumPrice(Double sumPrice) {
		this.sumPrice = sumPrice;
	}
	/** 会员ID */
	public Long getMemberId() {
		return memberId;
	}
	/** 会员ID */
	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}
	/** 活动场次Id */
	public Long getActivitySessionId() {
		return activitySessionId;
	}
	/** 活动场次Id */
	public void setActivitySessionId(Long activitySessionId) {
		this.activitySessionId = activitySessionId;
	}
}
package com.tocersoft.wx.entity;

import org.apache.ibatis.type.Alias;

import com.tocersoft.base.entity.BaseBusLongEntity;

/**
 * 类 名: WxVolunteer
 * 描 述: 志愿者招募
 * 作 者: 工商-徐晋
 * 创 建：2018年11月08日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
@Alias("wxVolunteer")
public class WxVolunteer extends BaseBusLongEntity {
	/**  */
	private static final long serialVersionUID = 1L;

	/** 类型（数据字典） */
	private Integer type;
	/** 姓名 */
	private String name;
	/** 身份证 */
	private String idCard;
	/** 性别：1-男，2-女； */
	private Integer sex;
	/** 年龄 */
	private Integer age;
	/** 学校 */
	private String school;
	/** 联系方式 */
	private String mobile;
	/** 地址 */
	private String address;
	/** 邮箱 */
	private String email;
	/** 语种 */
	private Long language;
	/** 服务时间 */
	private String servicrTime;
	/** 职务 */
	private String job;
	/** 学历 */
	private String education;
	

	public WxVolunteer() {
		super();
	}

	/** 类型（数据字典） */
	public Integer getType(){
		return this.type;
	}

	/** 类型（数据字典） */
	public void setType(Integer type){
		this.type = type;
	}

	/** 姓名 */
	public String getName(){
		return this.name;
	}

	/** 姓名 */
	public void setName(String name){
		this.name = name;
	}

	/** 身份证 */
	public String getIdCard(){
		return this.idCard;
	}

	/** 身份证 */
	public void setIdCard(String idCard){
		this.idCard = idCard;
	}

	/** 性别：1-男，2-女； */
	public Integer getSex(){
		return this.sex;
	}

	/** 性别：1-男，2-女； */
	public void setSex(Integer sex){
		this.sex = sex;
	}

	/** 年龄 */
	public Integer getAge(){
		return this.age;
	}

	/** 年龄 */
	public void setAge(Integer age){
		this.age = age;
	}

	/** 学校 */
	public String getSchool(){
		return this.school;
	}

	/** 学校 */
	public void setSchool(String school){
		this.school = school;
	}

	/** 联系方式 */
	public String getMobile(){
		return this.mobile;
	}

	/** 联系方式 */
	public void setMobile(String mobile){
		this.mobile = mobile;
	}

	/** 地址 */
	public String getAddress(){
		return this.address;
	}

	/** 地址 */
	public void setAddress(String address){
		this.address = address;
	}

	/** 邮箱 */
	public String getEmail(){
		return this.email;
	}

	/** 邮箱 */
	public void setEmail(String email){
		this.email = email;
	}

	/** 语种 */
	public Long getLanguage(){
		return this.language;
	}

	/** 语种 */
	public void setLanguage(Long language){
		this.language = language;
	}

	/** 服务时间 */
	public String getServicrTime(){
		return this.servicrTime;
	}

	/** 服务时间 */
	public void setServicrTime(String servicrTime){
		this.servicrTime = servicrTime;
	}

	/** 职务 */
	public String getJob(){
		return this.job;
	}

	/** 职务 */
	public void setJob(String job){
		this.job = job;
	}

	/** 学历 */
	public String getEducation(){
		return this.education;
	}

	/** 学历 */
	public void setEducation(String education){
		this.education = education;
	}

	
}
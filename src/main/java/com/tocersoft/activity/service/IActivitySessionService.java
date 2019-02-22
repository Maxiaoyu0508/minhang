package com.tocersoft.activity.service;

import java.util.List;

import com.tocersoft.activity.entity.ActivitySession;
import com.tocersoft.base.mybatis.page.PageResult;

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
public interface IActivitySessionService {

	/**
	 * 描 述： 查询所有活动场次表
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @return 活动场次表集合数据
	 */
	List<ActivitySession> listActivitySessionAll();

	/**
	 * 描 述： 分页查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param pageResult 分页对象
	 * @param condition 查询条件对象
	 */
	void listActivitySessionByPage(PageResult<ActivitySession> pageResult, ActivitySessionCondition condition);


	/**
	 * 描 述： 根据条件查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param condition 查询条件对象
	 * @return 活动场次表集合数据
	 */
	List<ActivitySession> listActivitySessionByCondition(ActivitySessionCondition condition);

	/**
	 * 描 述： 根据ID查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param id 主键
	 * @return 活动场次表
	 */
	ActivitySession  getActivitySessionById(Long id);

	/**
	 * 描 述： 新增
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 活动场次表
	 */
	void add(ActivitySession item);

	/**
	 * 描 述： 修改
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 活动场次表
	 */
	void update(ActivitySession item);

	/**
	 * 描 述： 根据ID集合批量删除
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param ids ID集合
	 */
	void delByIds(Long[] ids);

}
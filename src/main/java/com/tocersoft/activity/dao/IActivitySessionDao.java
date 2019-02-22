package com.tocersoft.activity.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

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
@Repository("activitySessionDaoImpl")
public interface IActivitySessionDao {

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
	 * @param bounds 分页对象
	 * @param condition 查询条件对象
	 * @return 活动场次表集合数据
	 */
	List<ActivitySession> listActivitySessionByPage(RowBounds bounds, @Param("condition") ActivitySessionCondition condition);

	/**
	 * 描 述： 查询总数
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param condition 查询条件对象
	 * @return 总条数
	 */
	int listActivitySessionByPageCount(@Param("condition") ActivitySessionCondition condition);

	/**
	 * 描 述： 根据条件查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param condition 查询条件对象
	 * @return 活动场次表集合数据
	 */
	List<ActivitySession> listActivitySessionByCondition(@Param("condition") ActivitySessionCondition condition);

	/**
	 * 描 述： 根据ID查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param id 主键
	 * @return 活动场次表
	 */
	ActivitySession getActivitySessionById(@Param("id") Long id);

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
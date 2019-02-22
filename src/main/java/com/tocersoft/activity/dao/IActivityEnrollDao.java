package com.tocersoft.activity.dao;

import com.tocersoft.activity.dto.ActivityEnrollCondition;
import com.tocersoft.activity.entity.ActivityEnroll;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 活动报名
 * @creator     拓者码工
 * @create-time 2016/5/18 13:53:41
 * @email developer@tocersoft.com
 * @company www.tocersoft.com
 * @version 1.0
 */
@Repository("activityEnrollDaoImpl")
public interface IActivityEnrollDao {

	/**
	 * 查询所有活动报名
	 */
	List<ActivityEnroll> listActivityEnrollAll();

	/**
	 * 查询区间数据
	 * @param bounds RowBounds对象
	 * @param condition 查询条件类
	 */
	List<ActivityEnroll> listActivityEnrollByPage(RowBounds bounds, @Param("condition") ActivityEnrollCondition condition);

	/**
	 * 查询总数
	 * @param condition 查询条件类
	 * @return 总条数
	 */
	int listActivityEnrollByPageCount(@Param("condition") ActivityEnrollCondition condition);

    /**
     * 根据条件查询数据
     */
    List<ActivityEnroll> listActivityEnrollByCondition(@Param("condition") ActivityEnrollCondition condition);

	/**
	 * 根据ID查询
	 * @param id 主键
	 * @return 活动报名
	 */
	ActivityEnroll getActivityEnrollById(@Param("id") Long id);

	/**
	 * 新增
	 * @param item 活动报名
	 */
	void add(ActivityEnroll item);

	/**
	 * 修改
	 * @param item 活动报名
	 */
	void update(ActivityEnroll item);

	/**
	 * 修改审核状态
	 */
	void updateState(ActivityEnroll item);
	
	/**
	 * 根据ID删除单条数据
	 */
	void delById(@Param("id") Long id);

    /**
     * 根据ID集合批量删除
     * @param ids ID集合
     */
    void delByIds(Long[] ids);

}
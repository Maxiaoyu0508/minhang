package com.tocersoft.activity.service;

import com.tocersoft.activity.dto.ActivityEnrollCondition;
import com.tocersoft.activity.entity.ActivityEnroll;
import com.tocersoft.base.mybatis.page.PageResult;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.util.List;

/**
 * 活动报名
 * @creator     拓者码工
 * @create-time 2016/5/18 13:53:41
 * @email developer@tocersoft.com
 * @company www.tocersoft.com
 * @version 1.0
 */
public interface IActivityEnrollService {

	/**
	 * 查询所有活动报名
	 */
	List<ActivityEnroll> listActivityEnrollAll();

	/**
	 * 分页查询
	 * @param pageResult 分页对象
	 * @param condition 查询条件类
	 */
	void listActivityEnrollByPage(PageResult<ActivityEnroll> pageResult, ActivityEnrollCondition condition);

	/**
	 * 根据ID查询
	 * @param id 主键
	 * @return 活动报名
	 */
	ActivityEnroll  getActivityEnrollById(Long id);
	/**
	 * 查询报名总数
	 * */
	int listActivityEnrollByPageCount(ActivityEnrollCondition condition);
	/**
//	 *用活动ID 查查询报名总数
//	 * */
//	int listActivityEnrollByPageCount(ActivityEnrollCondition condition);

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
	 * 根据ID集合批量删除
	 * @param ids ID集合
	 */
	void delByIds(Long[] ids);

	/**
	 * 修改审核状态
	 */
	void updateState(ActivityEnroll item);
	
	/**
	 * 根据ID删除单条数据
	 */
	void delById(Long id);
	
	/**
	 * 导出开班报名信息
	 * @param condition
	 * @return
	 */
	HSSFWorkbook exportInfo(ActivityEnrollCondition condition);
	
	/**
	 * 根据条件查询数据
	 */
	List<ActivityEnroll> listActivityEnrollByCondition(ActivityEnrollCondition condition);
}
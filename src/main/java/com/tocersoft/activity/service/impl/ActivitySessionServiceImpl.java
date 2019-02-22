package com.tocersoft.activity.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.tocersoft.base.service.BaseServiceImpl;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tocersoft.base.mybatis.page.PageResult;
import com.tocersoft.activity.dao.IActivitySessionDao;
import com.tocersoft.activity.entity.ActivitySession;
import com.tocersoft.activity.service.IActivitySessionService;

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
@Service("activitySessionServiceImpl")
@Transactional(value = "transactionManager",rollbackFor = Exception.class)
public class ActivitySessionServiceImpl extends BaseServiceImpl implements IActivitySessionService{

	@Resource(name = "activitySessionDaoImpl")
	private IActivitySessionDao activitySessionDao;

	/**
	 * 描 述： 查询所有活动场次表
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @return 活动场次表集合数据
	 */
	@Override
	public List<ActivitySession> listActivitySessionAll(){
		return activitySessionDao.listActivitySessionAll();
	}

	/**
	 * 描 述： 分页查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param pageResult 分页对象
	 * @param condition 查询条件对象
	 */
	@Override
	public void listActivitySessionByPage(PageResult<ActivitySession> pageResult,ActivitySessionCondition condition){
		int rows = activitySessionDao.listActivitySessionByPageCount(condition);
		pageResult.setRows(rows);

		RowBounds rowBounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		List<ActivitySession> list = activitySessionDao.listActivitySessionByPage(rowBounds,condition);
		pageResult.setResult(list);
	}

	/**
	 * 描 述： 根据条件查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param condition 查询条件对象
	 * @return 活动场次表集合数据
	 */
	@Override
	public List<ActivitySession> listActivitySessionByCondition(ActivitySessionCondition condition){
		return activitySessionDao.listActivitySessionByCondition(condition);
	}

	/**
	 * 描 述： 根据ID查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param id 主键
	 * @return 活动场次表
	 */
	@Override
	public ActivitySession getActivitySessionById(Long id){
		return activitySessionDao.getActivitySessionById(id);
	}

	/**
	 * 描 述： 新增
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 活动场次表
	 */
	@Override
	public void add(ActivitySession item){
		activitySessionDao.add(item);
	}

	/**
	 * 描 述： 修改
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 活动场次表
	 */
	@Override
	public void update(ActivitySession item){
		activitySessionDao.update(item);
	}

	/**
	 * 描 述： 根据ID集合批量删除
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param ids ID集合
	 */
	@Override
	public void delByIds(Long[] ids){
		activitySessionDao.delByIds(ids);
	}

}


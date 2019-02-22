package com.tocersoft.wx.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.tocersoft.base.service.BaseServiceImpl;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tocersoft.base.mybatis.page.PageResult;
import com.tocersoft.wx.dao.IWxVolunteerDao;
import com.tocersoft.wx.entity.WxVolunteer;
import com.tocersoft.wx.service.IWxVolunteerService;

import com.tocersoft.wx.dto.WxVolunteerCondition;

/**
 * 类 名: WxVolunteer
 * 描 述: 志愿者招募
 * 作 者: 工商-徐晋
 * 创 建：2018年11月08日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
@Service("wxVolunteerServiceImpl")
@Transactional(value = "transactionManager",rollbackFor = Exception.class)
public class WxVolunteerServiceImpl extends BaseServiceImpl implements IWxVolunteerService{

	@Resource(name = "wxVolunteerDaoImpl")
	private IWxVolunteerDao wxVolunteerDao;

	/**
	 * 描 述： 查询所有志愿者招募
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @return 志愿者招募集合数据
	 */
	@Override
	public List<WxVolunteer> listWxVolunteerAll(){
		return wxVolunteerDao.listWxVolunteerAll();
	}

	/**
	 * 描 述： 分页查询
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param pageResult 分页对象
	 * @param condition 查询条件对象
	 */
	@Override
	public void listWxVolunteerByPage(PageResult<WxVolunteer> pageResult,WxVolunteerCondition condition){
		int rows = wxVolunteerDao.listWxVolunteerByPageCount(condition);
		pageResult.setRows(rows);

		RowBounds rowBounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		List<WxVolunteer> list = wxVolunteerDao.listWxVolunteerByPage(rowBounds,condition);
		pageResult.setResult(list);
	}

	/**
	 * 描 述： 根据条件查询
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param condition 查询条件对象
	 * @return 志愿者招募集合数据
	 */
	@Override
	public List<WxVolunteer> listWxVolunteerByCondition(WxVolunteerCondition condition){
		return wxVolunteerDao.listWxVolunteerByCondition(condition);
	}

	/**
	 * 描 述： 根据ID查询
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param id 主键
	 * @return 志愿者招募
	 */
	@Override
	public WxVolunteer getWxVolunteerById(Long id){
		return wxVolunteerDao.getWxVolunteerById(id);
	}

	/**
	 * 描 述： 新增
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 志愿者招募
	 */
	@Override
	public void add(WxVolunteer item){
		wxVolunteerDao.add(item);
	}

	/**
	 * 描 述： 修改
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 志愿者招募
	 */
	@Override
	public void update(WxVolunteer item){
		wxVolunteerDao.update(item);
	}

	/**
	 * 描 述： 根据ID集合批量删除
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param ids ID集合
	 */
	@Override
	public void delByIds(Long[] ids){
		wxVolunteerDao.delByIds(ids);
	}

}


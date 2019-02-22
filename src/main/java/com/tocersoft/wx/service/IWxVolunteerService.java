package com.tocersoft.wx.service;

import java.util.List;

import com.tocersoft.wx.entity.WxVolunteer;
import com.tocersoft.base.mybatis.page.PageResult;

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
public interface IWxVolunteerService {

	/**
	 * 描 述： 查询所有志愿者招募
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @return 志愿者招募集合数据
	 */
	List<WxVolunteer> listWxVolunteerAll();

	/**
	 * 描 述： 分页查询
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param pageResult 分页对象
	 * @param condition 查询条件对象
	 */
	void listWxVolunteerByPage(PageResult<WxVolunteer> pageResult, WxVolunteerCondition condition);


	/**
	 * 描 述： 根据条件查询
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param condition 查询条件对象
	 * @return 志愿者招募集合数据
	 */
	List<WxVolunteer> listWxVolunteerByCondition(WxVolunteerCondition condition);

	/**
	 * 描 述： 根据ID查询
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param id 主键
	 * @return 志愿者招募
	 */
	WxVolunteer  getWxVolunteerById(Long id);

	/**
	 * 描 述： 新增
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 志愿者招募
	 */
	void add(WxVolunteer item);

	/**
	 * 描 述： 修改
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param item 志愿者招募
	 */
	void update(WxVolunteer item);

	/**
	 * 描 述： 根据ID集合批量删除
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param ids ID集合
	 */
	void delByIds(Long[] ids);

}
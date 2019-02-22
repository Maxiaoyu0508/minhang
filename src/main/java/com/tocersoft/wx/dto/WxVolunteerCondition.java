package com.tocersoft.wx.dto;

import com.tocersoft.wx.entity.WxVolunteer;

/**
 * 类 名: WxVolunteerCondition
 * 描 述: 志愿者招募查询条件类
 * 作 者: 工商-徐晋
 * 创 建：2018年11月08日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
public class WxVolunteerCondition extends WxVolunteer{
    /**姓名身份证查询*/
	private  String searchKey;

    public String getSearchKey() {
        return searchKey;
    }

    public void setSearchKey(String searchKey) {
        this.searchKey = searchKey;
    }
}
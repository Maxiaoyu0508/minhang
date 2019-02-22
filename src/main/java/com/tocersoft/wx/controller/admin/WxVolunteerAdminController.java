package com.tocersoft.wx.controller.admin;

import java.util.Map;

import javax.annotation.Resource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tocersoft.base.util.json.JsonUtil;
import com.tocersoft.base.util.math.NumberUtil;
import org.json.simple.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.tocersoft.wx.form.WxVolunteerForm;
import com.tocersoft.wx.entity.WxVolunteer;
import com.tocersoft.wx.service.IWxVolunteerService;
import com.tocersoft.base.web.token.TokenValidate;
import com.tocersoft.base.web.controller.BaseController;



/**
 * 类 名: WxVolunteer
 * 描 述: 志愿者招募
 * 作 者: 工商-徐晋
 * 创 建：2018年11月08日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
@Controller("wxVolunteerAdminController")
@Scope("prototype")
@RequestMapping("/admin/wx/volunteer")
public class WxVolunteerAdminController extends BaseController {

	@Resource(name = "wxVolunteerServiceImpl")
	private IWxVolunteerService wxVolunteerService;
	

	/**
	 * 描 述： 首页
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @return 响应页面
	 */
	@RequestMapping(value = "/index.htm", method = RequestMethod.GET)
	public String index(){
		return "/admin/wx/wx_volunteer_index";
	}

	/**
	 * 描 述： 分页查询
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @param response 响应对象
	 */
	@RequestMapping(value = "/listWxVolunteerByPage.htm", method = RequestMethod.POST)
	public void listWxVolunteerByPage(@ModelAttribute WxVolunteerForm model,HttpServletResponse response){
		try{
			wxVolunteerService.listWxVolunteerByPage(model.getPageResult(),model.getCondition());
			JSONObject root = JsonUtil.toPageJson(model.getPageResult(), new String[]{"id","type","name","idCard","sex","age","school","mobile","address","email","language","servicrTime","job","education"});
			ajaxPageResult(root,response);
		}catch(Exception ex){
			String msg = "查询志愿者招募时发生异常："+ex.getMessage();
			logger.error(msg,ex);
		}
	}


	/**
	 * 描 述： 编辑志愿者招募
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @return 响应结果
	 */
	@RequestMapping(value = "/edit.htm", method = RequestMethod.GET)
	public ModelAndView edit(@ModelAttribute WxVolunteerForm model){
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/wx/wx_volunteer_add");
		Map<String,Object> data = view.getModel();
		if(null != model.getItem().getId()){
			WxVolunteer item = wxVolunteerService.getWxVolunteerById(model.getItem().getId());
			data.put("item", item);
		}
		

		return view;
	}

	/**
	 * 描 述： 查看志愿者招募
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @return 响应结果
	 */
	@RequestMapping(value = "/view.htm", method = RequestMethod.GET)
	public ModelAndView view(@ModelAttribute WxVolunteerForm model){
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/wx/wx_volunteer_view");
		Map<String,Object> data = view.getModel();
		
		WxVolunteer item = wxVolunteerService.getWxVolunteerById(model.getItem().getId());
		data.put("item", item);
		
		

		return view;
	}

	/**
	 * 描 述： 保存志愿者招募
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @param request 请求对象
	 * @return 响应结果
	 */
	@RequestMapping(value = "/saveWxVolunteer.htm", method = RequestMethod.POST)
	@TokenValidate
	public ModelAndView saveWxVolunteer(@ModelAttribute WxVolunteerForm model,HttpServletRequest request){
		try {
			if(null == model.getItem().getId()){
				wxVolunteerService.add(model.getItem());
			}else{
				wxVolunteerService.update(model.getItem());
			}
			return ajaxJSON(Status.SUCCESS,"保存成功",true,request);
		} catch (Exception e) {
			String msg = "保存志愿者招募时发生异常：" + e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.ERROR, "保存失败，请稍后重试",true,request);
		}
	}

	/**
	 * 描 述： 删除志愿者招募
	 * 作 者： 工商-徐晋
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @return 响应结果
	 */
	@RequestMapping(value = "/del.htm", method = RequestMethod.POST)
	public ModelAndView del(@ModelAttribute WxVolunteerForm model){
		try {
			wxVolunteerService.delByIds(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(",")));
			return ajaxJSON(Status.SUCCESS,"删除成功");
		} catch (Exception e) {
			String msg = "删除志愿者招募时发生异常：" + e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.ERROR, "删除失败，请稍后重试");
		}
	}

}
package com.tocersoft.activity.controller.admin;

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

import com.tocersoft.activity.form.ActivitySessionForm;
import com.tocersoft.activity.entity.ActivitySession;
import com.tocersoft.activity.service.IActivitySessionService;
import com.tocersoft.base.web.token.TokenValidate;
import com.tocersoft.base.web.controller.BaseController;



/**
 * 类 名: ActivitySession
 * 描 述: 活动场次表
 * 作 者: 李灯
 * 创 建：2018年11月02日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
@Controller("activitySessionAdminController")
@Scope("prototype")
@RequestMapping("/admin/activity/session")
public class ActivitySessionAdminController extends BaseController {

	@Resource(name = "activitySessionServiceImpl")
	private IActivitySessionService activitySessionService;
	

	/**
	 * 描 述： 首页
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @return 响应页面
	 */
	@RequestMapping(value = "/index.htm", method = RequestMethod.GET)
	public String index(){
		return "/admin/activity/activity_session_index";
	}

	/**
	 * 描 述： 分页查询
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @param response 响应对象
	 */
	@RequestMapping(value = "/listActivitySessionByPage.htm", method = RequestMethod.POST)
	public void listActivitySessionByPage(@ModelAttribute ActivitySessionForm model,HttpServletResponse response){
		try{
			activitySessionService.listActivitySessionByPage(model.getPageResult(),model.getCondition());
			JSONObject root = JsonUtil.toPageJson(model.getPageResult(), new String[]{"id","activityDate","activityId","session","limitederson"});
			ajaxPageResult(root,response);
		}catch(Exception ex){
			String msg = "查询活动场次表时发生异常："+ex.getMessage();
			logger.error(msg,ex);
		}
	}


	/**
	 * 描 述： 编辑活动场次表
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @return 响应结果
	 */
	@RequestMapping(value = "/edit.htm", method = RequestMethod.GET)
	public ModelAndView edit(@ModelAttribute ActivitySessionForm model){
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/activity/activity_session_add");
		Map<String,Object> data = view.getModel();
		if(null != model.getItem().getId()){
			ActivitySession item = activitySessionService.getActivitySessionById(model.getItem().getId());
			data.put("item", item);
		}else {
			data.put("item", model.getItem());
		}
		

		return view;
	}

	/**
	 * 描 述： 查看活动场次表
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @return 响应结果
	 */
	@RequestMapping(value = "/view.htm", method = RequestMethod.GET)
	public ModelAndView view(@ModelAttribute ActivitySessionForm model){
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/activity/activity_session_view");
		Map<String,Object> data = view.getModel();
		
		ActivitySession item = activitySessionService.getActivitySessionById(model.getItem().getId());
		data.put("item", item);
		
		

		return view;
	}

	/**
	 * 描 述： 保存活动场次表
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @param request 请求对象
	 * @return 响应结果
	 */
	@RequestMapping(value = "/saveActivitySession.htm", method = RequestMethod.POST)
	@TokenValidate
	public ModelAndView saveActivitySession(@ModelAttribute ActivitySessionForm model,HttpServletRequest request){
		try {
			if(null == model.getItem().getId()){
				activitySessionService.add(model.getItem());
			}else{
				activitySessionService.update(model.getItem());
			}
			return ajaxJSON(Status.SUCCESS,"保存成功",true,request);
		} catch (Exception e) {
			String msg = "保存活动场次表时发生异常：" + e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.ERROR, "保存失败，请稍后重试",true,request);
		}
	}

	/**
	 * 描 述： 删除活动场次表
	 * 作 者： 李灯
	 * 历 史： (版本) 作者 时间 注释
	 * @param model 表单数据
	 * @return 响应结果
	 */
	@RequestMapping(value = "/del.htm", method = RequestMethod.POST)
	public ModelAndView del(@ModelAttribute ActivitySessionForm model){
		try {
			activitySessionService.delByIds(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(",")));
			return ajaxJSON(Status.SUCCESS,"删除成功");
		} catch (Exception e) {
			String msg = "删除活动场次表时发生异常：" + e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.ERROR, "删除失败，请稍后重试");
		}
	}

}
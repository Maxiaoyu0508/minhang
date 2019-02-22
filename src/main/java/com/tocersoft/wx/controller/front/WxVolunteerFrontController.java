package com.tocersoft.wx.controller.front;

import com.tocersoft.base.util.json.JsonUtil;
import com.tocersoft.base.util.math.NumberUtil;
import com.tocersoft.base.web.controller.BaseController;
import com.tocersoft.base.web.token.TokenValidate;
import com.tocersoft.wx.entity.WxVolunteer;
import com.tocersoft.wx.form.WxVolunteerForm;
import com.tocersoft.wx.service.IWxVolunteerService;
import org.json.simple.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;


/**
 * 类 名: WxVolunteer
 * 描 述: 志愿者招募
 * 作 者: 工商-徐晋
 * 创 建：2018年11月08日
 * 版 本：v1.0.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
@Controller("wxVolunteerFrontController")
@Scope("prototype")
@RequestMapping("/front/wx/volunteer")
public class WxVolunteerFrontController extends BaseController {

	@Resource(name = "wxVolunteerServiceImpl")
	private IWxVolunteerService wxVolunteerService;

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


}
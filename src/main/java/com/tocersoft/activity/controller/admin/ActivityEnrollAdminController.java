package com.tocersoft.activity.controller.admin;

import com.tocersoft.activity.entity.Activity;
import com.tocersoft.activity.entity.ActivityEnroll;
import com.tocersoft.activity.form.ActivityEnrollForm;
import com.tocersoft.activity.service.IActivityEnrollService;
import com.tocersoft.activity.service.IActivityService;
import com.tocersoft.base.util.common.HttpClientUtil;
import com.tocersoft.base.util.date.DateUtil;
import com.tocersoft.base.util.excel.ExcelUtil;
import com.tocersoft.base.util.math.NumberUtil;
import com.tocersoft.base.web.controller.BaseController;
import com.tocersoft.base.web.token.TokenValidate;
import com.tocersoft.system.service.ISysMailService;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 活动报名
 * @creator     拓者码工
 * @create-time 2016/5/18 13:53:41
 * @email developer@tocersoft.com
 * @company www.tocersoft.com
 * @version 1.0
 */
@Controller("activityEnrollAdminController")
@Scope("prototype")
@RequestMapping("/admin/activity/enroll")
public class ActivityEnrollAdminController extends BaseController {

	@Resource(name = "activityEnrollServiceImpl")
	private IActivityEnrollService activityEnrollService;
	@Resource(name = "activityServiceImpl")
	private IActivityService activityService;
	@Resource(name = "sysMailServiceImpl")
	private ISysMailService emailService;
	
	static String servletUrl = "http://localhost:8080/";

	/**
	 * 首页
	 * @return 
	 */
	@RequestMapping(value = "/index.htm", method = RequestMethod.GET)
	public String index(){
		return "/admin/activity/activity_enroll_index";
	}

	/**
	 * 分页查询
	 * @return 
	 */
	@RequestMapping(value = "/listActivityEnrollByPage.htm", method = RequestMethod.POST)
	public void listActivityEnrollByPage(@ModelAttribute ActivityEnrollForm model,HttpServletRequest request,HttpServletResponse response,HttpSession session){
		try{
			activityEnrollService.listActivityEnrollByPage(model.getPageResult(),model.getCondition());
			JSONObject root = toPageJson(model.getPageResult(), new String[]{"id","activity","linkMan","sex","mobile","telephone","email","enrollTime","state","number","payState","sumPrice"});
			ajaxPageResult(root,response);
		}catch(Exception ex){
			String msg = "查询活动报名时发生异常："+ex.getMessage();
			logger.error(msg,ex);
		}
	}

	/**
	 * 保存活动报名
	 * @return 
	 */
	@RequestMapping(value = "/edit.htm", method = RequestMethod.GET)
	public ModelAndView edit(@ModelAttribute ActivityEnrollForm model,HttpServletRequest request,HttpServletResponse response,HttpSession session){
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/activity/activity_enroll_add");
		Map<String,Object> data = view.getModel();
		if(null != model.getItem().getId()){
		ActivityEnroll item = activityEnrollService.getActivityEnrollById(model.getItem().getId());
			data.put("item", item);
		}
		
		//查询所有活动信息
		List<Activity> activityList = activityService.listActivityAll();
		data.put("activityList",activityList);
		


		return view;
	}

	/**
	 * 保存活动报名
	 * @return 
	 */
	@RequestMapping(value = "/saveActivityEnroll.htm", method = RequestMethod.POST)
	@TokenValidate
	public ModelAndView saveActivityEnroll(@ModelAttribute ActivityEnrollForm model,HttpServletRequest request,HttpSession session){
		try {
			if(null == model.getItem().getId()){
				activityEnrollService.add(model.getItem());
			}else{
				activityEnrollService.update(model.getItem());
			}
			return ajaxJSON(Status.success,"保存成功");
		} catch (Exception e) {
			String msg = "保存活动报名时发生异常：" + e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.error, "保存失败，请稍后重试");
		}
	}
	/**
	 * 删除活动报名
	 * @return 
	 */
	@RequestMapping(value = "/del.htm", method = RequestMethod.POST)
	public ModelAndView del(@ModelAttribute ActivityEnrollForm model,HttpServletRequest request,HttpServletResponse response,HttpSession session){
		try {
			activityEnrollService.delByIds(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(",")));
			return ajaxJSON(Status.success,"删除成功");
		} catch (Exception e) {
			String msg = "删除活动报名时发生异常：" + e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.error, "删除失败，请稍后重试");
		}
	}
	
	/**
	 * 修改报名人信息的审核状态
	 */
	@RequestMapping(value = "/updateActivityEnrollState.htm", method = RequestMethod.POST)
	@TokenValidate
	public ModelAndView updateActivityEnrollState(@ModelAttribute ActivityEnrollForm model,HttpServletRequest request,HttpSession session){
		try {
			if(null != model.getSelIds()){
				String[] ids = model.getSelIds().split(",");
				for (int i = 0; i < ids.length; i++) {
					model.getItem().setId(Long.parseLong(ids[i]));
					activityEnrollService.updateState(model.getItem());
					//发送邮件
					ActivityEnroll enroll = activityEnrollService.getActivityEnrollById(Long.parseLong(ids[i]));
					if(enroll != null){
						String message = "";
						Map<String,Object> data = new HashMap<String,Object>();
						data.put("name", enroll.getLinkMan());
						Activity activity = activityService.getActivityById(enroll.getActivityId());
						if(activity != null){
							data.put("desc", activity.getName());
							data.put("date", DateUtil.formatDate(activity.getTimeBegin(), "yyyy-MM-dd HH:mm"));
						}
						if(model.getItem().getState() == 1){
							data.put("state", "已经审核通过!");
							message = "已经审核通过!";
						}else{
							data.put("state", "审核未通过!");
							message = "审核未通过!";
						}
						emailService.sendEmail(5L,"小微企业报名审核信息反馈!", enroll.getEmail(),data);
						if(model.getIsSendSMS() != null && model.getIsSendSMS() == 1){
							//调用审核发送短信接口
							verification(enroll.getLinkMan(),activity.getName(),DateUtil.formatDate(activity.getTimeBegin(), "yyyy-MM-dd HH:mm"),message,enroll.getMobile());
						}
					}
				}
			}
			return ajaxJSON(Status.success,"修改审核状态成功!");
		} catch (Exception e) {
			String msg = "修改审核状态时发生异常：" + e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.error, "修改审核状态失败，请稍后重试");
		}
	}
	
	/**
	 * 导出活动报名信息
	 * @param model
	 * @param request
	 * @param response
	 * @param session
	 */
	@RequestMapping(value = "/doExportInfo.htm", method = RequestMethod.GET)
	public void doExportInfo(@ModelAttribute ActivityEnrollForm model,HttpServletRequest request,HttpServletResponse response,HttpSession session){
		try{
			//"ISO8859-1",
			if(StringUtils.isNotBlank(model.getCondition().getActivityName())){
				model.getCondition().setActivityName(new String(model.getCondition().getActivityName().getBytes("ISO-8859-1"),"utf-8"));
			}
			HSSFWorkbook wb = activityEnrollService.exportInfo(model.getCondition());
			ExcelUtil.exportExcelData("活动报名信息.xls",request,response,wb);
		}catch(Exception ex){
			String msg = "导出报名信息：" + ex.getMessage();
			logger.error(msg,ex);
		}
	}
	
	/**
	 * 审核发送短信
	 * @return 
	 */
	public ModelAndView verification(String name,String desc,String date,String state,String mobile){
		String msg ="";
		//1.设置短信通道类型  系统类型短信：system 市场推广类型短信：marketing
		String channeltypevalue = "system";
		//2.设置短信模板ID
		String tplid = "1596812";
		
		Map<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("channeltype", channeltypevalue);
		paramMap.put("mobile", mobile);
		paramMap.put("tplid", tplid);
		paramMap.put("tplvalue", "#name#="+name+"&#desc#="+desc+"&#state#="+state+"&#date#="+date);
		try {
			String resultData = HttpClientUtil.postData(servletUrl, paramMap);
			JSONParser parser = new JSONParser();
			JSONObject root = (JSONObject) parser.parse(resultData);
			
			if(root.get("msg") != null){
				msg = root.get("msg").toString();
				logger.info("返回内容：" + resultData);
			}
			logger.info("msg:" + msg);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("调用短信接口发生异常："+e.getMessage(),e);
			
		}
		return ajaxJSON(Status.success,"发送成功");
	}
}
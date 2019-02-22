package com.tocersoft.cms.controller.admin;

import com.tocersoft.activity.dto.ActivityEnrollCondition;
import com.tocersoft.activity.entity.Activity;
import com.tocersoft.activity.form.ActivityForm;
import com.tocersoft.activity.service.IActivityEnrollService;
import com.tocersoft.activity.service.IActivityService;
import com.tocersoft.base.util.json.JsonUtil;
import com.tocersoft.base.web.controller.BaseController;
import com.tocersoft.cms.entity.CmsArticle;
import com.tocersoft.cms.form.*;
import com.tocersoft.cms.service.*;
import com.tocersoft.system.service.ISysUploadFileService;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.time.ZoneId;
import java.util.*;

/**
 * 网站前台
 * 
 * @author vinartis
 * @createDate Apr 7, 2013
 */
@Controller("articleFrontController")
@Scope("prototype")
@RequestMapping(value = "/")
public class ArticleFrontController extends BaseController  {

	private Log logger = LogFactory.getLog(ArticleFrontController.class);
	@Resource(name = "cmsArticleServiceImpl")
	private ICmsArticleService cmsArticleService;
	@Resource(name = "cmsChannelServiceImpl")
	private ICmsChannelService cmsChannelService;
	@Resource(name = "cmsAdvPhotoServiceImpl")
	private ICmsAdvPhotoService advPhotoService;
	@Resource(name = "cmsTagServiceImpl")
	private ICmsTagService cmsTagService;
	@Resource(name = "cmsColumnServiceImpl")
	private ICmsColumnService cmsColumnService;
	@Resource(name = "cmsColumnArticleServiceImpl")
	private ICmsColumnArticleService cmsColumnArticleService;
	@Resource(name = "cmsBlogAuthorServiceImpl")
	private ICmsBlogAuthorService cmsBlogAuthorService;
	@Resource(name = "cmsBlogArticleServiceImpl")
	private ICmsBlogArticleService cmsBlogArticleService;
	@Resource(name = "cmsArticleTagServiceImpl")
	private ICmsArticleTagService cmsArticleTagService;
	@Resource(name = "cmsBlogAuthorTagServiceImpl")
	private ICmsBlogAuthorTagService cmsBlogAuthorTagService;
	@Resource(name = "sysUploadFileServiceImpl")
	private ISysUploadFileService sysUploadFileService;
	@Resource(name = "activityServiceImpl")
	private IActivityService activityService;
	@Resource(name = "activityEnrollServiceImpl")
	private IActivityEnrollService activityEnrollService;

	/**
	 * 网站首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/index.htm", method = RequestMethod.GET)
	public ModelAndView index(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/front/index/index");
		return view;
	}

	/**
	 * 关于我们
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/about.htm", method = RequestMethod.GET)
	public ModelAndView about(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/front/about/about");
		return view;
	}

	/**
	 * 产品服务
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/product.htm", method = RequestMethod.GET)
	public ModelAndView product(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/front/product/product");
		return view;
	}

	/**
	 * 经典案例
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/case.htm", method = RequestMethod.GET)
	public ModelAndView caseShow(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/front/case/case");
		return view;
	}

	/**
	 * 新闻动态
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/news.htm", method = RequestMethod.GET)
	public ModelAndView news(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/front/news/news");
		return view;
	}

	/**
	 * 联系我们
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/contact.htm", method = RequestMethod.GET)
	public ModelAndView contact(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/front/contact/contact");
		return view;
	}

	/**
	 * 触控一体系统-总览
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/home.htm", method = RequestMethod.GET)
	public ModelAndView home(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/touch/horizontal/home/home");
		return view;
	}

    @RequestMapping(value = "/vHome.htm", method = RequestMethod.GET)
    public ModelAndView vHome(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
        view.setViewName("/touch/vertical/home/home");
        return view;
    }
    /**
     * 触控一体系统-首页
     * @param model
     * @return
     */
    @RequestMapping(value = "/menu.htm", method = RequestMethod.GET)
    public ModelAndView menu(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
        view.setViewName("/touch/horizontal/common/menu");
        return view;
    }
    @RequestMapping(value = "/vMenu.htm", method = RequestMethod.GET)
    public ModelAndView vMenu(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
        view.setViewName("/touch/vertical/common/menu");
        return view;
    }
	/**
	 * 触控一体系统-活动详情
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/activityDetails.htm", method = RequestMethod.GET)
	public ModelAndView activityDetails(ActivityForm model) {
		try {
			JSONObject data = new JSONObject();
			//活动详情ID
			Long details = model.getItem().getId();
			Activity activity = activityService.getActivityById(details);
			data.put("name",activity.getName());
			data.put("address",activity.getAddress());
			data.put("timeBegin",activity.getTimeBegin());
			data.put("timeEnd",activity.getTimeEnd());
			data.put("htmlDesc", StringEscapeUtils.unescapeHtml4(activity.getHtmlDesc()));
			data.put("id",activity.getId());
			ActivityEnrollCondition activityEnrollCondition = new ActivityEnrollCondition();
			//查询报名的人数
			activityEnrollCondition.setActivityId(details);
			Integer activityEnroll = activityEnrollService.listActivityEnrollByPageCount(activityEnrollCondition);
			data.put("activityEnroll",activityEnroll);
			return ajaxJSON(Status.SUCCESS, "查询成功",data);
		} catch (Exception ex) {
			String msg = "发生异常：" + ex.getMessage();
			logger.error(msg, ex);
			return ajaxJSON(Status.ERROR, "查询失败");
		}
	}

	/**
	 * 触控一体系统-闵博信息
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/information.htm", method = RequestMethod.GET)
	public ModelAndView information(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		List<Activity> activitys = activityService.listActivityAll();
		JSONArray jsonArray = JsonUtil.toJsonList(activitys, new String[]{"id", "imageMain","imageThumb"});
		data.put("activitysJsonArray",jsonArray);
		view.setViewName("/touch/horizontal/information/information");
		return view;
	}

    @RequestMapping(value = "/info.htm", method = RequestMethod.GET)
    public ModelAndView info(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
        view.setViewName("/touch/vertical/info/info");
        return view;
    }

	/**
	 * 触控一体系统-展馆导览
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/navigation.htm", method = RequestMethod.GET)
	public ModelAndView navigation(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/touch/horizontal/navigation/navigation");
		return view;
	}

    @RequestMapping(value = "/nav.htm", method = RequestMethod.GET)
    public ModelAndView nav(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
        view.setViewName("/touch/vertical/nav/nav");
        return view;
    }

	/**
	 * touch-参观须知-开放时间-观众须知-设备租赁
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/notice.htm", method = RequestMethod.GET)
	public ModelAndView notice(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/touch/horizontal/notice/notice");
		return view;
	}

    @RequestMapping(value = "/note.htm", method = RequestMethod.GET)
    public ModelAndView note(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
        view.setViewName("/touch/vertical/note/note");
        return view;
    }
	/**
	 * touch-观众留言
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/messageList.htm", method = RequestMethod.GET)
	public ModelAndView messageList(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/touch/horizontal/message/message_list");
		return view;
	}

	/**
	 * touch-观众留言-书写
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/messageWrite.htm", method = RequestMethod.GET)
	public ModelAndView messageWrite(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/touch/horizontal/message/message_write");
		return view;
	}


}


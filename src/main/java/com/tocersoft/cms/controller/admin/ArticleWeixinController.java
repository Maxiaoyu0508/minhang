package com.tocersoft.cms.controller.admin;

import com.tocersoft.activity.dto.ActivityCondition;
import com.tocersoft.activity.dto.ActivityEnrollCondition;
import com.tocersoft.activity.dto.ActivitySessionCondition;
import com.tocersoft.activity.entity.Activity;
import com.tocersoft.activity.entity.ActivityEnroll;
import com.tocersoft.activity.entity.ActivitySession;
import com.tocersoft.activity.form.ActivityEnrollForm;
import com.tocersoft.activity.form.ActivitySessionForm;
import com.tocersoft.activity.service.IActivityEnrollService;
import com.tocersoft.activity.service.IActivityService;
import com.tocersoft.activity.service.IActivitySessionService;
import com.tocersoft.base.util.json.JsonUtil;
import com.tocersoft.base.web.controller.BaseController;
import com.tocersoft.cms.dto.CmsArticleCondition;
import com.tocersoft.cms.dto.CmsChannelCondition;
import com.tocersoft.cms.entity.CmsArticle;
import com.tocersoft.cms.entity.CmsChannel;
import com.tocersoft.cms.form.CmsArticleForm;
import com.tocersoft.cms.service.*;
import com.tocersoft.system.dto.SysUploadFileCondition;
import com.tocersoft.system.entity.SysDictItem;
import com.tocersoft.system.entity.SysUploadFile;
import com.tocersoft.system.service.ISysDictItemService;
import com.tocersoft.system.service.ISysUploadFileService;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.mockito.internal.matchers.Null;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 网站前台
 * 
 * @author vinartisfv
 * @createDate Apr 7, 2013
 */
@Controller("articleWeixinController")
@Scope("prototype")
@RequestMapping(value = "/weixin")
public class ArticleWeixinController extends BaseController  {

	private Log logger = LogFactory.getLog(ArticleWeixinController.class);
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
	@Resource(name = "sysDictItemServiceImpl")
	private ISysDictItemService sysDictItemService;
    @Resource(name = "activitySessionServiceImpl")
    private IActivitySessionService activitySessionService;



	/**
	 * 网站首页
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/index.htm", method = RequestMethod.GET )
	public ModelAndView index(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/weixin/index/index");
		return view;
	}

	/**
	 * 陈列展示
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/exhibit.htm", method = RequestMethod.GET)
	public ModelAndView exhibit(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		//查询文章栏目表
		CmsChannelCondition condition = new CmsChannelCondition();
		//只查询 父级为18的 临时 需要修改
		condition.setParent(18L);
		List<CmsChannel> cmsChannels = cmsChannelService.listCmsChannelByCondition(condition);
		Long[] cmsChannelslds = new Long[cmsChannels.size()];
		JSONArray array = new JSONArray();
		//查询栏目图片的URL
		for (int i=0;i<cmsChannels.size();i++) {
			JSONObject jsonObject = new JSONObject();
			cmsChannelslds[i] = cmsChannels.get(i).getId();
			SysUploadFileCondition uploadFileCondition = new  SysUploadFileCondition();
			uploadFileCondition.setObjectId(cmsChannelslds[i]);
			List<SysUploadFile> uploadFile =  sysUploadFileService.listSysUploadFileByCondition(uploadFileCondition);
			if(uploadFile != null && !uploadFile.isEmpty()){
				jsonObject.put("url",uploadFile.get(0).getUrl());
				jsonObject.put("name",cmsChannels.get(i).getName());
				jsonObject.put("id",cmsChannels.get(i).getId());
				array.add(jsonObject);
			}else{
				jsonObject.put("name",cmsChannels.get(i).getName());
				jsonObject.put("id",cmsChannels.get(i).getId());
				array.add(jsonObject);
			}
		}
		data.put("uploadFile",array);
		view.setViewName("/weixin/exhibit/exhibit_index");
		return view;
	}
	/**
	 * 陈列展示列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/exhibit/list.htm", method = RequestMethod.GET)
	public ModelAndView exhibitList(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		//基本陈列/栏目ID
		Long displayId = model.getItem().getId();
		CmsChannel cmsChannel = cmsChannelService.getCmsChannelById(displayId);
		data.put("cmsChannel",cmsChannel);

		CmsArticleCondition cmsArticleCondition = new CmsArticleCondition();
		cmsArticleCondition.setChannelId(displayId);
		List<CmsArticle> cmsArticle = cmsArticleService.listArticleByCondition(cmsArticleCondition);
		JSONArray array = new JSONArray();
		//查图片得URL
		Long[] cmsArticlelds = new Long[cmsArticle.size()];
		for (int i=0;i<cmsArticle.size();i++) {
			cmsArticlelds[i] = cmsArticle.get(i).getId();
			SysUploadFileCondition uploadFileCondition = new SysUploadFileCondition();
			uploadFileCondition.setObjectId(cmsArticlelds[i]);
			uploadFileCondition.setObjectType(10);
			List<SysUploadFile> uploadFile = sysUploadFileService.listSysUploadFileByCondition(uploadFileCondition);
			JSONObject jsonObject = new JSONObject();
			if(uploadFile != null && !uploadFile.isEmpty()){
				jsonObject.put("path", uploadFile.get(0).getPath());
				jsonObject.put("name",cmsArticle.get(i).getName());
				jsonObject.put("summary",cmsArticle.get(i).getSummary());
				jsonObject.put("id",cmsArticle.get(i).getId());
				array.add(jsonObject);
			}
			jsonObject.put("name",cmsArticle.get(i).getName());
			jsonObject.put("summary",cmsArticle.get(i).getSummary());
			jsonObject.put("id",cmsArticle.get(i).getId());
			array.add(jsonObject);
		}
		data.put("uploadFileArray",array);
		view.setViewName("/weixin/exhibit/exhibit_list");
		return view;
	}
	/**
	 * 陈列展示详情
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/exhibit/detail.htm", method = RequestMethod.GET)
	public ModelAndView exhibitDetail(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		//展示详情ID
		Long details = model.getItem().getId();
		CmsArticle cmsArticle = cmsArticleService.getArticleById(details);
		//查图片得URL
		SysUploadFileCondition uploadFileCondition = new  SysUploadFileCondition();
		uploadFileCondition.setObjectId(details);
		uploadFileCondition.setObjectType(10);
		List<SysUploadFile> uploadFile =  sysUploadFileService.listSysUploadFileByCondition(uploadFileCondition);
		if(uploadFile!=null&& !uploadFile.isEmpty()){
			data.put("uploadFile",uploadFile);
		}
		//浏览次数初始化0
		if (cmsArticle.getBrowseTime()==null){
			Long browseTime = 0L;
			cmsArticleService.updateBrowseTime(browseTime,details);
		}
		//点赞次数初始化0
		if (cmsArticle.getSpotTime()==null) {
			Long spotTime = 0L;
			cmsArticleService.updateSpotTime(spotTime,details);
		}

		//浏览次数
		Long browseTime =(cmsArticle.getBrowseTime()+1);
		cmsArticleService.updateBrowseTime(browseTime,details);
		data.put("cmsArticle",cmsArticle);
		view.setViewName("/weixin/exhibit/exhibit_detail");
		return view;
	}
	/**
	 * 描述: 查询音频文件
	 *
	 */
	@RequestMapping(value = "/exhibit/music.htm", method = RequestMethod.GET)
	public ModelAndView music(CmsArticleForm model) {
		try {
            JSONObject data = new JSONObject();
		    //展示详情ID
            Long details = model.getItem().getId();
            SysUploadFileCondition uploadFileCondition = new  SysUploadFileCondition();
            uploadFileCondition.setObjectId(details);
            uploadFileCondition.setObjectType(2);
            List<SysUploadFile> uploadFile =  sysUploadFileService.listSysUploadFileByCondition(uploadFileCondition);
            // 主键ID 与类别为2
            Long[] uploadFileIds = new Long[uploadFile.size()];
            for (int i=0;i<uploadFile.size();i++){
                uploadFileIds[i] = uploadFile.get(i).getId();
                uploadFileCondition.setObjectId( uploadFileIds[i]);
                uploadFileCondition.setObjectType(3);
                List<SysUploadFile> path =  sysUploadFileService.listSysUploadFileByCondition(uploadFileCondition);
                if(path != null && !path.isEmpty()){
                    data.put("path",path.get(i).getPath());
                }
            }
            return ajaxJSON(Status.SUCCESS, "成功",data);
		} catch (Exception ex) {
			String msg = "发生异常：" + ex.getMessage();
			logger.error(msg, ex);
			return ajaxJSON(Status.ERROR, "失败");
		}
	}
	/**
	 * 描述: 查询3d
	 *
	 */
	@RequestMapping(value = "/exhibit/threeDimensions.htm", method = RequestMethod.GET)
	public ModelAndView threeDimensions(CmsArticleForm model) {
		try {
			JSONObject data = new JSONObject();
			//展示详情ID
			Long details = model.getItem().getId();
			CmsArticle cmsArticle = cmsArticleService.getArticleById(details);
			data.put("cmsArticle",cmsArticle.getThreeDimensionsExhibition());
			return ajaxJSON(Status.SUCCESS, "成功",data);
		} catch (Exception ex) {
			String msg = "发生异常：" + ex.getMessage();
			logger.error(msg, ex);
			return ajaxJSON(Status.ERROR, "失败");
		}
	}
	/**
	 * 点赞次数
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/exhibit/awesome.htm", method = RequestMethod.GET)
	public ModelAndView awesome(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		//展示详情ID
		Long details = model.getItem().getId();
		CmsArticle cmsArticle = cmsArticleService.getArticleById(details);
		//点赞次数
		Long spotTime =(cmsArticle.getSpotTime()+1);
		cmsArticleService.updateSpotTime(spotTime,details);
		data.put("cmsArticle",cmsArticle);
		view.setViewName("/weixin/exhibit/exhibit_detail");
		return view;
	}

    /**
     * 活动预约
     * @param model
     * @return
     */
    @RequestMapping(value = "/activity.htm", method = RequestMethod.GET)
    public ModelAndView activityIndex(CmsArticleForm model) {
    	ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
		ActivityCondition activityCondition = new ActivityCondition();
		//查询状态不等于0的 0-草稿
		activityCondition.setNoEqualstate(0);
		List<Activity> activitys = activityService.listActivityByCondition(activityCondition);
		data.put("activitys",activitys);
        view.setViewName("/weixin/activity/activity_index");
        return view;
    }

    /**
     * 活动预约-详情
     * @param model
     * @return
     */
    @RequestMapping(value = "/activity/detail.htm", method = RequestMethod.GET)
    public ModelAndView activityDetail(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
		//活动ID
		Long activityId = model.getItem().getId();
		Activity activity = activityService.getActivityById(activityId);
		data.put("activity",activity);
		ActivityEnrollCondition activityEnrollCondition = new ActivityEnrollCondition();
		//查询报名的人数
		activityEnrollCondition.setActivityId(activityId);
		Integer activityEnrolls = activityEnrollService.listActivityEnrollByPageCount(activityEnrollCondition);
		if (activityEnrolls == null){
			data.put("activityEnrolls",0);
		}else {
			data.put("activityEnrolls",activityEnrolls);
		}

		//查询更多
		//查询状态不等于0的 0-草稿
		ActivityCondition activityCondition = new ActivityCondition();
		activityCondition.setNoEqualstate(0);
		//查询 去除当前的这条
		activityCondition.setActivityId(activityId);
		List<Activity> activitys = activityService.listActivityByCondition(activityCondition);
		data.put("activitys",activitys);
        view.setViewName("/weixin/activity/activity_detail");
        return view;
    }
    /**
     * 活动预约
     * @param model
     * @return
     */
    @RequestMapping(value = "/activity/apply.htm", method = RequestMethod.GET)
    public ModelAndView activityApply(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
		//活动ID
		Long activityId = model.getItem().getId();
		Activity activity = activityService.getActivityById(activityId);

		data.put("activity",activity);
        view.setViewName("/weixin/activity/activity_apply");
        return view;
    }
	/**
	 * 活动预约提交
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/activity/submit.htm", method = RequestMethod.GET)
	public ModelAndView submit(ActivityEnrollForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		try {
			//活动ID
			Long activityId = model.getItem().getActivityId();
			//姓名
			String linkMan = model.getItem().getLinkMan();
			// 人数
			Integer peopleNumber = model.getItem().getNumber();
			String phone = model.getItem().getMobile();
			Long activitySessionId = model.getItem().getActivitySessionId();
			ActivityEnroll activityEnroll = new ActivityEnroll();
			activityEnroll.setActivityId(activityId);
			activityEnroll.setState(1);
			activityEnroll.setNumber(peopleNumber);
			activityEnroll.setLinkMan(linkMan);
			activityEnroll.setMobile(phone);
			activityEnroll.setActivitySessionId(activitySessionId);
			Date today = new Date();
			activityEnroll.setEnrollTime(today);
			activityEnrollService.add(activityEnroll);
			return ajaxJSON(Status.SUCCESS, "成功");
		} catch (Exception ex) {
			String msg = "发生异常：" + ex.getMessage();
			logger.error(msg, ex);
			return ajaxJSON(Status.ERROR, "失败");
		}
	}

	/**
	 * 地图导览
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/map.htm", method = RequestMethod.GET)
	public ModelAndView mapOutside(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/weixin/map/map");
		return view;
	}
	/**
	 * 我的活动
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/my_activity.htm", method = RequestMethod.GET)
	public ModelAndView my_activity(ActivityEnrollForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		//活动ID
		Long activityId = model.getItem().getId();
		String phone = model.getItem().getMobile();
		ActivityEnrollCondition activityEnrollCondition = new ActivityEnrollCondition();
		activityEnrollCondition.setActivityId(activityId);
		activityEnrollCondition.setMobile(phone);
		List<ActivityEnroll> activityEnrolls = activityEnrollService.listActivityEnrollByCondition(activityEnrollCondition);
		JSONArray jsonArray = JsonUtil.toJsonList(activityEnrolls, new String[]{ "linkMan","mobile","enrollTime","number"});
		data.put("activityEnroll", jsonArray);
		Long[] activityIds = new Long[activityEnrolls.size()];
		JSONArray activitySessionArray = new JSONArray();
		for (int i=0;i<activityEnrolls.size();i++){
			JSONObject jsonObject = new JSONObject();
			activityIds[i] = activityEnrolls.get(i).getActivityId();
			ActivitySession activitySession = activitySessionService.getActivitySessionById(activityIds[i]);
			jsonObject.put("activitySession",activitySession.getSession());
			activitySessionArray.add(jsonObject);
		}
		data.put("activitySessionArray",activitySessionArray);
		view.setViewName("/weixin/activity/my_activity");
		return view;
	}

    /**
     * 我的预约
     * @param model
     * @return
     */
    @RequestMapping(value = "/activity/reservation.htm", method = RequestMethod.GET)
    public ModelAndView my_reservation(ActivityEnrollForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();

		String phone = model.getItem().getMobile();
		ActivityEnrollCondition activityEnrollCondition = new ActivityEnrollCondition();
		activityEnrollCondition.setMobile(phone);
		List<ActivityEnroll> activityEnrolls = activityEnrollService.listActivityEnrollByCondition(activityEnrollCondition);
		//定义返回数组
		JSONArray array = new JSONArray();
		if(activityEnrolls.size()==0){
			data.put("activityEnrolls","抱歉没有找到您报名的活动");
			view.setViewName("/weixin/activity/registration");
		}else {

			//用手机号查出预约过的活动ID
			Long[] activityIds = new Long[activityEnrolls.size()];

			for (int i=0;i<activityEnrolls.size();i++) {
				JSONObject jsonObject = new JSONObject();
				activityIds[i] = activityEnrolls.get(i).getActivityId();
				Activity activity = activityService.getActivityById(activityIds[i]);
				//查询报名的人数
				activityEnrollCondition.setActivityId(activityIds[i]);
				//查询人次
				Integer activityEnroll = activityEnrollService.listActivityEnrollByPageCount(activityEnrollCondition);
				if (activityEnroll == null){
					data.put("activityEnroll",0);
				}else {
					jsonObject.put("activityEnroll",activityEnroll);
				}
				jsonObject.put("url",activity.getImageMain());
				jsonObject.put("name",activity.getName());
				jsonObject.put("id",activity.getId());
				jsonObject.put("enrollTimeBegin",activity.getEnrollTimeBegin());
				jsonObject.put("enrollTimeEnd",activity.getTimeEnd());
				jsonObject.put("address",activity.getAddress());
				//取当前系统当前时间
				Date today = new Date();
				jsonObject.put("today",today);
				jsonObject.put("phone",phone);

				array.add(jsonObject);
			}
			data.put("array",array);
		}
        view.setViewName("/weixin/activity/registration");
        return view;
    }

    /**
     * 活动场次
     * @param model
     * @return
     */
    @RequestMapping(value = "/activity_seession.htm", method = RequestMethod.GET)
    public ModelAndView activity_seession(ActivitySessionForm model) {
		JSONObject data = new JSONObject();
        Long activityId = model.getItem().getActivityId();
        //java.time.LocalDate java.sql.Date是java.util.Date的子类，是为了配合SQL DATE而设置的数据类型。java.sql.Date只包含年月日信息，时分秒毫秒都会清零。格式类似：YYYY-MM-DD。
        //.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();属性
        LocalDate activityDate = model.getItem().getActivityDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        ActivitySessionCondition activitySessionCondition = new ActivitySessionCondition();
        activitySessionCondition.setActivityId(activityId);
        // java.time.LocalDate -> java.sql.Date
        activitySessionCondition.setActivityDate(java.sql.Date.valueOf(activityDate));
        //根据活动日期和活动id	查询
        List<ActivitySession> activitySessions = activitySessionService.listActivitySessionByCondition(activitySessionCondition);
		JSONArray jsonArrayactivitySessions = JsonUtil.toJsonList(activitySessions, new String[]{"session", "id"});
		data.put("activitySessions",jsonArrayactivitySessions);
		return ajaxJSON(Status.SUCCESS,"保存成功",data);
    }

	/**
	 * 志愿工作
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/volunteer.htm", method = RequestMethod.GET)
	public ModelAndView volunteerIndex(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/weixin/volunteer/volunteer_index");

		CmsArticle cmsArticle = cmsArticleService.getArticleById(2L);
		cmsArticle.setContent(StringEscapeUtils.unescapeHtml4(cmsArticle.getContent()));

		data.put("cmsArticle",cmsArticle);

		return view;
	}
	/**
	 * 志愿者招募
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/volunteer/apply.htm", method = RequestMethod.GET)
	public ModelAndView volunteerApply(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/weixin/volunteer/volunteer_apply");

		List<SysDictItem> typeList = sysDictItemService.listSysDictItemByDictId(1L);
		data.put("typeList",typeList);

		List<SysDictItem> languageList = sysDictItemService.listSysDictItemByDictId(2L);
		data.put("languageList",languageList);

		return view;
	}

	/**
	 * 我报名的活动
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/activity/registration.htm", method = RequestMethod.GET)
	public ModelAndView registration(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/weixin/activity/registration");
		return view;
	}

	/**
	 * 联系我们
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/info/contact/us.htm", method = RequestMethod.GET)
	public ModelAndView contactUs(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/weixin/info/contact_us");

		CmsArticle cmsArticle = cmsArticleService.getArticleById(3L);
		cmsArticle.setContent(StringEscapeUtils.unescapeHtml4(cmsArticle.getContent()));

		data.put("cmsArticle",cmsArticle);//传出


		return view;
	}
	/**
	 * 参观须知
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/info/visit/info.htm", method = RequestMethod.GET)
	public ModelAndView visitInfo(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		view.setViewName("/weixin/info/visit_info");
		return view;
	}

	/**
	 * 教育课件-列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/course/list.htm", method = RequestMethod.GET)
	public ModelAndView courseList(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		CmsArticleCondition cmsArticleCondition = new CmsArticleCondition();
		//教育列表的父ID 24
		cmsArticleCondition.setChannelId(24L);
		List<CmsArticle> cmsArticle = cmsArticleService.listArticleByCondition(cmsArticleCondition);
        //查图片得URL
        Long[] cmsArticlelds = new Long[cmsArticle.size()];
		JSONArray array = new JSONArray();
        for (int i=0;i<cmsArticle.size();i++) {
			JSONObject jsonObject = new JSONObject();
            cmsArticlelds[i] = cmsArticle.get(i).getId();
			SysUploadFileCondition uploadFileCondition = new  SysUploadFileCondition();
			uploadFileCondition.setObjectId(cmsArticlelds[i]);
			uploadFileCondition.setObjectType(10);
			List<SysUploadFile> uploadFile =  sysUploadFileService.listSysUploadFileByCondition(uploadFileCondition);
			if(uploadFile != null && !uploadFile.isEmpty()){
				jsonObject.put("path",uploadFile.get(0).getPath());
				jsonObject.put("name",cmsArticle.get(i).getName());
				jsonObject.put("id",cmsArticle.get(i).getId());
				jsonObject.put("content",cmsArticle.get(i).getContent());
				array.add(jsonObject);
        }else {
				jsonObject.put("name",cmsArticle.get(i).getName());
				jsonObject.put("id",cmsArticle.get(i).getId());
				jsonObject.put("content",cmsArticle.get(i).getContent());
				array.add(jsonObject);
			}

        }
		data.put("uploadFileArry",array);
		view.setViewName("/weixin/course/course_list");
		return view;
	}
	/**
	 * 教育课件-详情
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/course/detail.htm", method = RequestMethod.GET)
	public ModelAndView courseDetail(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		// 教育课件id
		Long articleId = model.getItem().getId();
		CmsArticle cmsArticle = cmsArticleService.getArticleById(articleId);
		data.put("cmsArticle",cmsArticle);
		SysUploadFileCondition sysUploadFileCondition = new SysUploadFileCondition();
		sysUploadFileCondition.setObjectId(articleId);
		//类型为10
		sysUploadFileCondition.setObjectType(10);
		List<SysUploadFile> sysUploadFiles = sysUploadFileService.listSysUploadFileByCondition(sysUploadFileCondition);
		JSONArray jsonArray = JsonUtil.toJsonList(sysUploadFiles, new String[]{"id", "path"});
		if(sysUploadFiles!=null &&!sysUploadFiles.isEmpty()){
			data.put("jsonArray",jsonArray);
		}

		//查询更多教育课件 根据父级id 文章ID 查询
		CmsArticleCondition cmsArticleCondition = new CmsArticleCondition();

		JSONArray array = new JSONArray();

        //查询时 去除 此条ID
		cmsArticleCondition.setArticleId(articleId);
		cmsArticleCondition.setChannelId(24L);
		List<CmsArticle> cmsArticles = cmsArticleService.listArticleByCondition(cmsArticleCondition);
		Long[] cmsArticlesId = new Long[cmsArticles.size()];
		for(int i=0; i<cmsArticles.size();i++) {
			JSONObject jsonObject = new JSONObject();
			cmsArticlesId[i] = cmsArticles.get(i).getId();
			jsonObject.put("name",cmsArticles.get(i).getName());
			//上传图片的地址
			sysUploadFileCondition.setObjectId(cmsArticlesId[i]);
			sysUploadFileCondition.setObjectType(10);
			List<SysUploadFile> path = sysUploadFileService.listSysUploadFileByCondition(sysUploadFileCondition);
			if(path != null && !path.isEmpty()){
				jsonObject.put("path",path.get(0).getPath());
				array.add(jsonObject);
			}
			else {
				array.add(jsonObject);
			}
		}
		data.put("arcticArray",array);
		view.setViewName("/weixin/course/course_detail");
		return view;
	}

	/**
	 * 临时展览
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/interim/list.htm", method = RequestMethod.GET)
	public ModelAndView interimList(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		JSONArray array = new JSONArray();
		SysUploadFileCondition sysUploadFileCondition = new SysUploadFileCondition();
		CmsArticleCondition cmsArticleCondition = new CmsArticleCondition();

		cmsArticleCondition.setChannelId(27L);
		List<CmsArticle> cmsArticles = cmsArticleService.listArticleByCondition(cmsArticleCondition);
		Long[] cmsArticlesId = new Long[cmsArticles.size()];
		for(int i=0; i<cmsArticles.size();i++) {
			JSONObject jsonObject = new JSONObject();
			cmsArticlesId[i] = cmsArticles.get(i).getId();
			jsonObject.put("name",cmsArticles.get(i).getName());
			jsonObject.put("summary",cmsArticles.get(i).getSummary());
			jsonObject.put("exhibitionTime",cmsArticles.get(i).getExhibitionTime());
			jsonObject.put("id",cmsArticles.get(i).getId());
			//上传图片的地址
			sysUploadFileCondition.setObjectId(cmsArticlesId[i]);
			sysUploadFileCondition.setObjectType(10);
			List<SysUploadFile> path = sysUploadFileService.listSysUploadFileByCondition(sysUploadFileCondition);
			if(path!= null && !path.isEmpty()){
				jsonObject.put("path",path.get(0).getPath());
				array.add(jsonObject);
			}
			array.add(jsonObject);
		}
		data.put("interimArray",array);
		view.setViewName("/weixin/interim/interim_list");
		return view;
	}
	/**
	 * 临时展览-详情
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/interim/detail.htm", method = RequestMethod.GET)
	public ModelAndView interimDetail(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> data = view.getModel();
		Long articleId = model.getItem().getId();
		SysUploadFileCondition sysUploadFileCondition = new SysUploadFileCondition();
		sysUploadFileCondition.setObjectId(articleId);
		sysUploadFileCondition.setObjectType(10);
		List<SysUploadFile> path = sysUploadFileService.listSysUploadFileByCondition(sysUploadFileCondition);
		JSONArray jsonArray = JsonUtil.toJsonList(path, new String[]{"id", "path"});
		data.put("jsonArray",jsonArray);
		CmsArticle cmsArticle = cmsArticleService.getArticleById(articleId);
		data.put("cmsArticle",cmsArticle);
		view.setViewName("/weixin/interim/interim_detail");
		return view;
	}
    /**
     * 虚拟展厅
     * @param model
     * @return
     */
    @RequestMapping(value = "/hall/exhibit.htm", method = RequestMethod.GET)
    public ModelAndView exhibitHall(CmsArticleForm model) {
        ModelAndView view = new ModelAndView();
        Map<String, Object> data = view.getModel();
        view.setViewName("/weixin/hall/exhibit_hall");
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


}


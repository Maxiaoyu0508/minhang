package com.tocersoft.cms.controller.admin;

import com.tocersoft.auth.entity.User;
import com.tocersoft.auth.service.IUserService;
import com.tocersoft.base.constant.SystemConstant;
import com.tocersoft.base.dto.ProjectDeployMode;
import com.tocersoft.base.util.math.NumberUtil;
import com.tocersoft.base.web.controller.BaseController;
import com.tocersoft.cms.dto.CmsTemplateCondition;
import com.tocersoft.cms.entity.CmsArticle;
import com.tocersoft.cms.entity.CmsChannel;
import com.tocersoft.cms.entity.CmsTemplate;
import com.tocersoft.cms.form.CmsArticleForm;
import com.tocersoft.cms.service.*;
import com.tocersoft.system.entity.SysTag;
import com.tocersoft.system.entity.SysUploadFile;
import com.tocersoft.system.entity.SysUploadSet;
import com.tocersoft.system.form.SysUploadFileForm;
import com.tocersoft.system.service.ISysTagService;
import com.tocersoft.system.service.ISysUploadFileService;
import com.tocersoft.system.service.ISysUploadSetService;
import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 类 名: ArticleAdminController
 * 描 述: 文章管理controller
 * 作 者: 张强
 * 创 建：2018年04月19日
 * 版 本：v2.2.0
 *
 * 历 史: (版本) 作者 时间 注释
 */
@Controller("articleAdminController")
@Scope("prototype")
@RequestMapping(value = "/admin/cms/article")
public class ArticleAdminController extends BaseController{

    /** 部署模式 */
    @Value("${project.deploy.mode:NULL}")
    private String projectDeployMode;
	@Value("${server.servlet.domain-path}")
	private String domainPath;
	@Resource(name = "cmsArticleServiceImpl")
	private ICmsArticleService cmsArticleService;
	@Resource(name = "cmsBlogArticleServiceImpl")
	private ICmsBlogArticleService cmsBlogArticleService;
	@Resource(name = "cmsChannelServiceImpl")
	private ICmsChannelService cmsChannelService;
	@Resource(name = "cmsTagServiceImpl")
	private ICmsTagService cmsTagService;
	@Resource(name = "userServiceImpl")
	private IUserService userService;
	@Resource(name = "sysUploadFileServiceImpl")
	private ISysUploadFileService sysUploadFileService;
	@Resource(name = "sysUploadSetServiceImpl")
	private ISysUploadSetService sysUploadSetService;
	@Resource(name = "sysTagServiceImpl")
	private ISysTagService sysTagService;
	@Resource(name = "cmsTemplateServiceImpl")
	private ICmsTemplateService cmsTemplateService;
	
	@RequestMapping(value = "/index.htm", method = RequestMethod.GET)
	public ModelAndView home(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_list");
		Map<String,Object> data = view.getModel();
		// 获取所有栏目
		List<CmsChannel> list = cmsChannelService.getCmsChannelAll();
		data.put("cmsChannels", list);
		data.put("item", model.getItem());
		data.put("treeNodeId",model.getTreeNodeId());
		//删除临时文件--不是临时不删除。
		this.removeAllAnnexInterim();
		return view;
	}
	
	/**
	 * 栏目管理--选择文章
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/choose_article.htm", method = RequestMethod.GET)
	public ModelAndView chooseArticle(@ModelAttribute CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/choose_article_list");
		Map<String, Object> data = view.getModel();
		data.put("columnId",model.getCondition().getColumnId());
		data.put("sectionId",model.getCondition().getSectionId());
		return view;
	}

	/**
	 * 前往article_add页面
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/to_add.htm", method = RequestMethod.GET)
	public ModelAndView toAdd(CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_add");
		Map<String,Object> data = view.getModel();
		
		if(model.getItem() != null){
			Long channelId = model.getItem().getChannelId();
			CmsChannel channel = cmsChannelService.getCmsChannelById(channelId);
			model.getItem().setChannelName(channel.getName());
		}
		
		//查询标签从cmsTag -> sysTag
		List<SysTag> sysTagList = sysTagService.listSysTagAll();
		data.put("sysTagList", sysTagList);
		data.put("item", model.getItem());
		data.put("treeNodeId",model.getTreeNodeId());

		CmsTemplateCondition cmsTemplateCondition = new CmsTemplateCondition();
		cmsTemplateCondition.setType(2);
		List<CmsTemplate> cmsTemplateList = cmsTemplateService.listCmsTemplateByCondition(cmsTemplateCondition);
		data.put("cmsTemplateList",cmsTemplateList);
		return view;
	}
	
	@RequestMapping(value = "/to_update.htm", method = RequestMethod.GET)
	public ModelAndView toUpdate(@ModelAttribute CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_add");
		Map<String,Object> data = view.getModel();
        Long id = model.getItem().getId();

		// 查找要修改的文章
		CmsArticle art = cmsArticleService.getArticleById(id);
		// 获取所有栏目
		List<CmsChannel> list = cmsChannelService.getCmsChannelAll();
        //查询标签从cmsTag -> sysTag
        List<SysTag> sysTagList = sysTagService.listSysTagAll();
		data.put("sysTagList", sysTagList);
		data.put("item", art);
		data.put("cmsChannels", list);

		CmsTemplateCondition cmsTemplateCondition = new CmsTemplateCondition();
		cmsTemplateCondition.setType(2);
		List<CmsTemplate> cmsTemplateList = cmsTemplateService.listCmsTemplateByCondition(cmsTemplateCondition);
		data.put("cmsTemplateList",cmsTemplateList);
		return view;
	}
	

	/**
	 * 分页查询文章
	 */
	@RequestMapping(value = "/searchArticleList.htm", method = RequestMethod.POST)
	public void searchArticleList(@ModelAttribute CmsArticleForm cmsArticleForm,HttpServletRequest request,HttpServletResponse response) {
		try{
			cmsArticleService.getArticleListByPage(cmsArticleForm.getPageResult(),cmsArticleForm.getCondition());
			JSONObject root = toPageJson(cmsArticleForm.getPageResult(), new String []{"id","name","createDate","isPublish","channelName","sort","channelId","isRecommend","publishDate","state"});
			ajaxPageResult(root,response);
		}catch(Exception ex){
			String msg = "查询文章时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "查询失败");
		}
	}
	
	/**
	 * 博主文章的分页查询
	 * @param cmsArticleForm
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/blogArticleList.htm", method = RequestMethod.POST)
	public void blogArticleList(@ModelAttribute CmsArticleForm cmsArticleForm,HttpServletRequest request,HttpServletResponse response) {
		try{
			cmsArticleService.listBlogArticleListByPage(cmsArticleForm.getPageResult(),cmsArticleForm.getCondition());
			JSONObject root = toPageJson(cmsArticleForm.getPageResult(), new String []{
				"id","name","blogName","sort"
			});
			ajaxPageResult(root,response);
		}catch(Exception ex){
			String msg = "查询文章时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "查询失败");
		}
	}
	
	/**
	 * 专栏下面子栏目列表查询
	 * @return 
	 */
	@RequestMapping(value = "/listColumnArticleByPageAndSection.htm", method = RequestMethod.POST)
	public void listCmsColumnArticleByPageAndSection(@ModelAttribute CmsArticleForm model,HttpServletRequest request,HttpServletResponse response,HttpSession session){
		try{
			cmsArticleService.listCmsColumnArticleByPageAndSection(model.getPageResult(),model.getCondition());
			JSONObject root = toPageJson(model.getPageResult(), new String[]{"id","name","readNum","likeNum","columnArticleId","sort"});
			ajaxPageResult(root,response);
		}catch(Exception ex){
			String msg = "查询专栏内的相关文章时发生异常："+ex.getMessage();
			logger.error(msg,ex);
		}
	}
	
	/**
	 * 添加文章
	 * @return 
	 */
	@RequestMapping(value = "/addArticle.htm", method = RequestMethod.POST)
	public ModelAndView addArticle(@ModelAttribute CmsArticleForm cmsArticleForm,HttpServletRequest request,HttpServletResponse response) {
		try{
			if(StringUtils.isBlank(cmsArticleForm.getItem().getName())){
				return ajaxJSON(Status.error, "文章标题不能为空");
			}else{
				CmsArticle item = cmsArticleForm.getItem();
				// 设置创建时间
				item.setCreateDate(new Date());
				// 设置创建人
				User user = userService.getCurrentUser();
				item.setCreateBy(user.getId().toString());

				// 保存实体
				cmsArticleService.doSave(item);
				//将临时视频与保存的文章绑定起来，临时文件就变成了正式的视频
				List<SysUploadFile> coverList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(-1L, 2);
				for(SysUploadFile cover :coverList){
					cover.setObjectId(item.getId());
					//正式上传文件视频类型--视频封面是2
					sysUploadFileService.update(cover);
				}
				//将临时附件与保存的文章绑定起来，临时文件就变成了正式的文件
				List<SysUploadFile> uploadList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(-1L, 1);
				for(SysUploadFile upload :uploadList){
					upload.setObjectId(item.getId());
					//正式上传附件类型是1
					sysUploadFileService.update(upload);
				}


				return ajaxJSON(Status.success, item.getId().toString());
			}
		}catch(Exception ex){
			String msg = "添加文章时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "添加文章失败");
		}
	}
	
	/**
	 * 分页查询附件
	 * 
	 * @return
	 */
	@RequestMapping(value = "/listArticleFileByPage.htm", method = RequestMethod.POST)
	public void listProductFileByPage(@ModelAttribute SysUploadFileForm model,HttpServletRequest request,HttpServletResponse response,HttpSession session){
		try{
			sysUploadFileService.listSysUploadFileByPage(model.getPageResult(),model.getCondition());
			JSONObject root = toPageJson(model.getPageResult(), new String[]{
					"id","fileName","name","path",
					"url","extend","type","desc","link","objectId","objectType","location","sort"});
			ajaxPageResult(root,response);
		}catch(Exception ex){
			String msg = "查询产品信息时发生异常："+ex.getMessage();
			logger.error(msg,ex);
		}
	}

	/**
	 * 保存产品上传附件
	 * 
	 * @return
	 */
	@RequestMapping(value = "/saveSysFileUpload.htm", method = RequestMethod.POST)
	public ModelAndView saveSysFileUpload(SysUploadFileForm model, HttpServletRequest request, HttpServletResponse response) {
		try {
			String name=model.getItem().getFileName().replace('\\','/');
			if(name.lastIndexOf("/")!=-1){
				name=name.substring(name.lastIndexOf("/")+1, name.length());
			}
			model.getItem().setName(name);
			model.getItem().setFileName(name);
			sysUploadFileService.add(model.getItem());
			return ajaxJSON(Status.success,"保存成功！");
		} catch (Exception e) {
			String msg = "保存产品时发生异常：" + e.getMessage();
			logger.error(msg, e);
			return ajaxJSON(Status.error, "保存失败");
		}

	}
	
	/**
	 * 下载
	 */
	@RequestMapping(value = "/download.htm", method = RequestMethod.GET)
	public void download(SysUploadFileForm model, HttpServletRequest request, HttpServletResponse response, HttpSession session){
		// 获取文件上传设置
	    SysUploadSet sysUploadSet = sysUploadSetService.getSysUploadSet();
	    
	    SysUploadFile sysUploadFile = sysUploadFileService.getSysUploadFileById(model.getItem().getId());
	    if(sysUploadFile != null){
	    	// 如果有权限就下载
	    	String fileName = sysUploadFile.getFileName();
	    	String filePath = sysUploadFile.getUrl();
	    	if(StringUtils.isNotBlank(filePath)){
	    		// 如果文件不为空，才进行下载
	    		String realFilePath = sysUploadSet.getPublicRoot() + filePath;
                if(StringUtils.isBlank(projectDeployMode)
                    || StringUtils.equalsIgnoreCase(projectDeployMode, ProjectDeployMode.NORMAL.toString())){
                    // 普通部署模式，用路径转换方式
                    realFilePath = this.getRealPath(realFilePath,request);
                }
	    		this.writeToClient(fileName, realFilePath,request,response);
	    	}
	    }
	}
	
	
	
	/**
	 * 修改文章
	 * @return 
	 */
	@RequestMapping(value = "/updateArticle.htm", method = RequestMethod.POST)
	public ModelAndView updateArticle(@ModelAttribute CmsArticleForm cmsArticleForm,HttpServletRequest request,HttpServletResponse response) {
		try{
				if(null == cmsArticleForm.getItem().getChannelId()){
					return ajaxJSON(Status.error, "栏目名称不能为空");
				}else if(StringUtils.isBlank(cmsArticleForm.getItem().getName())){
					return ajaxJSON(Status.error, "文章标题不能为空");
				}else{
					CmsArticle item = cmsArticleForm.getItem();
					CmsArticle dbItem = cmsArticleService.getArticleById(item.getId());
					if(null != dbItem){
						// 从数据库取得实体后，将客户端的传入的值进行封装
						dbItem.setChannelId(item.getChannelId());
						dbItem.setContent(item.getContent());
						dbItem.setSort(item.getSort());
						dbItem.setName(item.getName());
						dbItem.setKeyword(item.getKeyword());
						dbItem.setKeyword2(item.getKeyword2());
						dbItem.setKeyword3(item.getKeyword3());
						dbItem.setSummary(item.getSummary());
						dbItem.setPath(item.getPath());
						dbItem.setFilename(item.getFilename());
						dbItem.setAuthor(item.getAuthor());
						dbItem.setSource(item.getSource());
						dbItem.setExhibitionPlace(item.getExhibitionPlace());
						dbItem.setExhibitionTime(item.getExhibitionTime());
						dbItem.setThreeDimensionsExhibition(item.getThreeDimensionsExhibition());
						// 设置创建时间
						dbItem.setUpdateDate(new Date());
						dbItem.setTagList(item.getTagList());
						dbItem.setPublishDate(item.getPublishDate());
						dbItem.setCmsTemplateId(item.getCmsTemplateId());
						// 保存实体
						cmsArticleService.doUpdate(dbItem);
						//将临时视频与保存的文章绑定起来，临时文件就变成了正式的视频
						List<SysUploadFile> coverList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(-1L, 2);
						for(SysUploadFile cover :coverList){
							cover.setObjectId(dbItem.getId());
							//正式上传文件视频类型--视频封面是2
							sysUploadFileService.update(cover);
						}
						
						//将临时附件与保存的文章绑定起来，临时文件就变成了正式的文件
						List<SysUploadFile> uploadList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(-1L, 1);
						for(SysUploadFile upload :uploadList){
							upload.setObjectId(item.getId());
							//正式上传附件类型是1
							sysUploadFileService.update(upload);
						}
						
 						return ajaxJSON(Status.success, dbItem.getId().toString());
					}else{
						return ajaxJSON(Status.error, "要保存的数据不存在");
					}
				}
		}catch(Exception ex){
			String msg = "添加文章时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "添加文章失败");
		}
	}
	
	/**
	 *  单个删除文章
	 * @return 
	 */
	@RequestMapping(value = "/delArticle.htm", method = RequestMethod.POST)
	public ModelAndView delArticle(@ModelAttribute CmsArticleForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
			if(null == model.getArticleId()){
				return ajaxJSON(Status.error, "文章ID不能为空");
			}else{
				Long[] longs = NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(","));
				cmsArticleService.bathDelArticle(longs);
				cmsBlogArticleService.delByArticleId(model.getArticleId());
				return ajaxJSON(Status.success, "删除文章成功");
			}
		}catch(Exception ex){
			String msg = "删除文章时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "删除文章失败");
		}
	}

	/**
	 *  批量删除文章
	 * @return
	 */
	@RequestMapping(value = "/delArticles.htm", method = RequestMethod.POST)
	public ModelAndView bathDelArticle(@ModelAttribute CmsArticleForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
				cmsArticleService.bathDelArticle(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(",")));
				return ajaxJSON(Status.success, "删除文章成功");

		}catch(Exception ex){
			String msg = "删除文章时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "删除文章失败");
		}
	}

	/**
	 *  取消发布文章
	 * @return 
	 */
	@RequestMapping(value = "/unPublish.htm", method = RequestMethod.POST)
	public ModelAndView unPublish(@ModelAttribute CmsArticleForm cmsArticleForm,HttpServletRequest request,HttpServletResponse response) {
		try{
			if(null != cmsArticleForm.getArticleId()){
				cmsArticleService.unPublish(cmsArticleForm.getArticleId());
				return ajaxJSON(Status.success, "取消发布成功");
			}else{
				return ajaxJSON(Status.error, "取消发布失败");
			}
		}catch(Exception ex){
			String msg = "取消发布时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "取消发布失败");
		}
	}
	/**
	 *  取消发布文章
	 * @return
	 */
	@RequestMapping(value = "/unPublishAll.htm", method = RequestMethod.POST)
	public ModelAndView unPublishAll(@ModelAttribute CmsArticleForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
				cmsArticleService.unPublishAll(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(",")));
				return ajaxJSON(Status.success, "取消发布成功");

		}catch(Exception ex){
			String msg = "取消发布时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "取消发布失败");
		}
	}
	/**
	 *  发布文章
	 * @return 
	 */
	@RequestMapping(value = "/publish.htm", method = RequestMethod.POST)
	public ModelAndView publish(@ModelAttribute CmsArticleForm cmsArticleForm,HttpServletRequest request,HttpServletResponse response) {
		try{
			if(null != cmsArticleForm.getArticleId()){
				cmsArticleService.publish(cmsArticleForm.getArticleId());
				return ajaxJSON(Status.success, "发布成功");
			}else{
				return ajaxJSON(Status.error, "发布失败");
			}
		}catch(Exception ex){
			String msg = "发布时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "发布失败");
		}
	}
	/**
	 *  审批文章
	 * @return
	 */
	@RequestMapping(value = "/publishAll.htm", method = RequestMethod.POST)
	public ModelAndView publishAll(@ModelAttribute CmsArticleForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
		 		cmsArticleService.publishAll(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(",")));
				return ajaxJSON(Status.success, "发布成功");
		}catch(Exception ex){
			String msg = "发布时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "发布失败");
		}
	}

	
	/**
	 *  推荐/取消推荐文章
	 * @return 
	 */
	@RequestMapping(value = "/recommend.htm", method = RequestMethod.POST)
	public ModelAndView recommend(@ModelAttribute CmsArticleForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
			if(null != model.getArticleId()){
				cmsArticleService.recommend(new Long[]{model.getArticleId()}, model.getCondition().getIsRecommend());
				if(model.getCondition().getIsRecommend() == 0){
					return ajaxJSON(Status.success, "取消推荐成功");
				}else{
					return ajaxJSON(Status.success, "推荐成功");
				}
			}else{
				if(model.getCondition().getIsRecommend() == 0){
					return ajaxJSON(Status.success, "取消推荐失败");
				}else{
					return ajaxJSON(Status.success, "推荐失败");
				}
			}
		}catch(Exception ex){
			String msg = "推荐时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "推荐失败");
		}
	}

	/**
	 *  推荐/取消推荐文章2
	 * @return
	 */
	@RequestMapping(value = "/recommendAll.htm", method = RequestMethod.POST)
	public ModelAndView recommendAll(@ModelAttribute CmsArticleForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
				cmsArticleService.recommend(new Long[]{model.getArticleId()}, model.getCondition().getIsRecommend());
				cmsArticleService.recommend(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(",")), model.getCondition().getIsRecommend());
				if(model.getCondition().getIsRecommend() == 0){
					return ajaxJSON(Status.success, "取消推荐成功");
				}else{
					return ajaxJSON(Status.success, "推荐成功");
				}
		}catch(Exception ex){
			String msg = "推荐时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			return ajaxJSON(Status.error, "推荐失败");
		}
	}

	/**
	 * 标签管理--选择文章
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/choose_tag_article.htm", method = RequestMethod.GET)
	public ModelAndView chooseTagArticle(@ModelAttribute CmsArticleForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/choose_tag_article_list");
		Map<String, Object> data = view.getModel();
		data.put("tagId",model.getCondition().getTagId());
		return view;
	}
	
	//文章视频管理
	/**
	 * 文章视频列表查询 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/article_annex_list.htm", method = RequestMethod.POST)
	public ModelAndView list(SysUploadFileForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_annex_list");
		Map<String,Object> data = view.getModel();
		
		List<SysUploadFile> annexList = new ArrayList<SysUploadFile>();  
		//正式视频
		if(null != model.getObjectId()){
			List<SysUploadFile>	annexListByObejctId = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(model.getObjectId(), 2);
			if(annexListByObejctId.size() >0){
				annexList.addAll(annexListByObejctId);
			}
		}
		
		//临时上传视频
		List<SysUploadFile>	interimAnnexList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(-1L, 2);
		if(interimAnnexList.size() >0){
			annexList.addAll(interimAnnexList);
		}
		
		data.put("annexList",annexList);
		
		return view;
	}

	/**
	 * 跳转至文章视频新增 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/to_article_annex_add.htm", method = RequestMethod.GET)
	public ModelAndView toArticlePhotoAdd(SysUploadFileForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_annex_add");
		Map<String,Object> data = view.getModel();
		data.put("objectId", model.getObjectId());
		return view;
	}
	
	/**
	 * 文章视频新增 
	 * @param model
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/add_article_annex.htm", method = RequestMethod.POST)
	public void add(@ModelAttribute SysUploadFileForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
			//视频
			SysUploadFile annex = new SysUploadFile();
			//视频封面
			SysUploadFile cover = new SysUploadFile();
			
			String annexName = request.getParameter("annexName");
			String annexPath = request.getParameter("annexPath");
			annexPath = annexPath.replace("\\", "/");
			String coverName = request.getParameter("coverName");
			String coverPath = request.getParameter("coverPath");
			
			
			// 如果视频封面名称为空时，将文件名默认为视频封面名称
			if(StringUtils.isNotBlank(coverName) && StringUtils.isNotBlank(coverPath)){
				cover.setName(coverName);
				cover.setFileName(coverName);
				cover.setPath(coverPath);
				//截取扩展名
				cover.setExtend(coverName.substring(coverName.lastIndexOf(".")+1, coverName.length()));
				cover.setSort(annex.getSort() == null ? 1:annex.getSort());
				//临时标记 为-1，等到保存文章  便将该ID以及类型改变
				cover.setObjectId(-1L);
				cover.setObjectType(2);
				sysUploadFileService.add(cover);
			}
			
			// 如果视频名称为空时，将文件名默认为视频名称
			if(StringUtils.isNotBlank(annexName) && StringUtils.isNotBlank(annexPath)){
				annex.setName(annexName);
				annex.setFileName(annexName);
				//截取扩展名
				annex.setExtend(annexName.substring(annexName.lastIndexOf(".")+1, annexName.length()));
				//临时标记 为-1，等到保存文章  便将该ID以及类型改变
				annex.setObjectId(cover.getId());
				annex.setObjectType(3);
				annex.setPath(annexPath);
				// 如果排序为空时，默认排序为1
				annex.setSort(annex.getSort() == null ? 1:annex.getSort());
				sysUploadFileService.add(annex);
			}
			
			ajaxJSON(Status.success);
		}catch(Exception ex){
			String msg = "新增视频时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "新增视频失败");
		}
	}
	
	
	/**
	 * 跳转至文件视频修改
	 * @param model
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/to_update_article_annex.htm", method = RequestMethod.GET)
	public ModelAndView to_update_article_photo(@ModelAttribute SysUploadFileForm model,HttpServletRequest request,HttpServletResponse response) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_annex_add");
		Map<String,Object> data = view.getModel();
		
		Long photoId = model.getItem().getId();
		SysUploadFile photo = sysUploadFileService.getSysUploadFileById(photoId);
		data.put("item", photo);
		
		return view;
	}
	

	
	/**
	 * 文件视频修改
	 * @return
	 */
	@RequestMapping(value = "/update_article_annex.htm", method = RequestMethod.POST)
	public void updateArticlePhoto(@ModelAttribute SysUploadFileForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
			SysUploadFile photo = model.getItem();
			
			// 如果图片名称为空时，将文件名默认为图片名称
			if(!StringUtils.isNotBlank(photo.getName())){
				photo.setName(model.getItem().getFileName());
			}
			
			// 如果排序为空时，默认排序为1
			photo.setSort(photo.getSort() == null ? 1:photo.getSort());
			
			sysUploadFileService.update(photo);
			
			ajaxJSON(Status.success);
		}catch(Exception ex){
			String msg = "修改视频时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "修改视频失败");
		}
	}
	
	/**
	 * 删除文章视频
	 * @return
	 */
	@RequestMapping(value = "/remove_article_annex.htm", method = RequestMethod.POST)
	public void remove(@ModelAttribute SysUploadFileForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
            Long id = model.getItem().getId();
            Long[] ids = new Long[10];
			ids[0]=id;
			//删除对应的视频
			this.removeCoverRelatingAnnex(model.getItem().getId());
			
			sysUploadFileService.delByIds(ids);
			ajaxJSON(Status.success);
		}catch(Exception ex){
			String msg = "删除视频发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "删除视频失败");
		}
	}
	
	/**
	 * 删除文章视频--当取消文章保存时，将所有上传的视频以及视频封面删除
	 * @return
	 */
	@RequestMapping(value = "/remove_article_annex_all.htm", method = RequestMethod.GET)
	public void removeAllAnnexInterim() {
		try{
			List<SysUploadFile> coverList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(-1L, 2);
			if(coverList.size() <= 0){
				return;
			}
			Long[] coverIds = new Long[coverList.size()];
			for(int i=0;i<coverList.size();i++){
				coverIds[i] = coverList.get(i).getId();
				//删除对应的视频
				this.removeCoverRelatingAnnex(coverList.get(i).getId());
			}
			sysUploadFileService.delByIds(coverIds);
			ajaxJSON(Status.success);
		}catch(Exception ex){
			String msg = "删除视频发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "删除视频失败");
		}
	}
	
	/**
	 * 删除文章附件
	 * @return
	 */
	@RequestMapping(value = "/remove_article_upload.htm", method = RequestMethod.POST)
	public ModelAndView removeUplaod(@ModelAttribute SysUploadFileForm model) {
		try {
			sysUploadFileService.delByIds(NumberUtil.convertStringArrayToLongArray(model.getSelIds().split(SystemConstant.COMMA)));
			return ajaxJSON(Status.success,"删除成功！");
		} catch (Exception e) {
			String msg = "删除附件发生异常："+e.getMessage();
			logger.error(msg,e);
			return ajaxJSON(Status.error, "删除失败");
		}

	}
	
	/**
	 * 文章不保存状态下--删除封面的同时将删除对应的视频
	 * @param coverId
	 */
	private void removeCoverRelatingAnnex(Long coverId){
		//删除封面时首先删除封面对应的视频
		List<SysUploadFile> annexList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(coverId, 3);
		if(annexList.size() > 0){
            Long[] annexIds = new Long[annexList.size()];
			for(int i=0;i<annexList.size();i++){
				annexIds[i] = annexList.get(i).getId();
			}
			sysUploadFileService.delByIds(annexIds);
		}
	}
	
	/**
	 * 加载文章信息
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list_cms_article_photo.htm", method = RequestMethod.POST)
	public ModelAndView listCmsArticlePhoto(@ModelAttribute SysUploadFileForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_photo_list");
		List<SysUploadFile> cmsArticlePhotoList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(model.getItem().getObjectId(), 10);
		Map<String,Object> data = view.getModel();
		data.put("cmsArticlePhotoList",cmsArticlePhotoList);
		return view;
	}
	
	/**
	 * 加载视频信息
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list_cms_article_video_photo.htm", method = RequestMethod.POST)
	public ModelAndView listCmsArticlePhoto1(@ModelAttribute SysUploadFileForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_photo_list");
		List<SysUploadFile> cmsArticlePhotoList = sysUploadFileService.listSysUploadFileByObjectIdAndTypeId(model.getItem().getObjectId(), 3);
		Map<String,Object> data = view.getModel();
		data.put("cmsArticlePhotoList",cmsArticlePhotoList);
		return view;
	}
	
	/**
	 * 新增文章信息 跳转到新增文章页面
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/to_article_add.htm", method = RequestMethod.GET)
	public ModelAndView toAddCmsArticlePhoto(SysUploadFileForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_photo_add");
		Map<String,Object> data = view.getModel();
		data.put("item", model.getItem());
		return view;
	}
	
	/**
	 * 新增文章图
	 * @param model
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/add_cms_article_photo.htm", method = RequestMethod.POST)
	public void addCmsArticlePhoto(@ModelAttribute SysUploadFileForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
			SysUploadFile photo = model.getItem();
			
			// 设立图片的ID
			photo.setObjectType(10);
			photo.setCreateDate(new Date());
			photo.setUpdateDate(new Date());
			
			// 如果图片名称为空时，将文件名默认为图片名称
			if(!StringUtils.isNotBlank(photo.getName())){
				photo.setName(model.getItem().getFileName());
			}
			
			// 如果排序为空时，默认排序为1
			if(null == photo.getSort()){
				photo.setSort(1);
			}
				
			sysUploadFileService.add(photo);
			ajaxJSON(Status.success);
		}catch(Exception ex){
			String msg = "新增广告图时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "新增广告图失败");
		}
	}

	/**
	 * 删除广告图
	 * @return
	 */
	@RequestMapping(value = "/remove_cms_article_photo.htm", method = RequestMethod.POST)
	public void removeCmsArticlePhoto(@ModelAttribute SysUploadFileForm model,HttpServletRequest request,HttpServletResponse response) {
		try{
			sysUploadFileService.delByIds(new Long[]{model.getItem().getId()});
			ajaxJSON(Status.success);
		}catch(Exception ex){
			String msg = "删除文章图时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "删除文章图失败");
		}
	}
	
	/**
	 * 修改文章信息  跳转到新增文章图
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/to_update_cms_article_photo.htm", method = RequestMethod.GET)
	public ModelAndView toUpdateCmsArticlePhoto(SysUploadFileForm model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("/admin/cms/article_photo_add");
		Map<String,Object> data = view.getModel();
		Long photoId = model.getItem().getId();
		SysUploadFile photo = sysUploadFileService.getSysUploadFileById(photoId);
		data.put("item", photo);
		return view;
	}
	
	
	/**
	 * 修改广告图
	 * @return
	 */
	@RequestMapping(value = "/update_cms_article_photo.htm", method = RequestMethod.POST)
	public void updateCmsArticlePhoto(@ModelAttribute SysUploadFileForm sysUploadFileForm,HttpServletRequest request,HttpServletResponse response) {
		try{
			SysUploadFile photo = sysUploadFileForm.getItem();
			
			// 如果图片名称为空时，将文件名默认为图片名称
			if(!StringUtils.isNotBlank(photo.getName())){
				photo.setName(sysUploadFileForm.getItem().getFileName());
			}
			
			// 如果排序为空时，默认排序为1
			if(null == photo.getSort()){
				photo.setSort(1);
			}
			
			sysUploadFileService.update(photo);
			
			ajaxJSON(Status.success);
		}catch(Exception ex){
			String msg = "修改广告图时发生异常："+ex.getMessage();
			logger.error(msg,ex);
			ajaxJSON(Status.error, "修改广告图失败");
		}
	}

	/**
	 * 设为缩略图
	 * @return
	 */
	@RequestMapping(value = "/set_thumb.htm", method = RequestMethod.POST)
	public ModelAndView setThumb(SysUploadFileForm model, HttpServletRequest request, HttpServletResponse response) {
		try {
			// 获取图片的ID
			Long photoId = model.getId();
			// 查询该图片的实体
			SysUploadFile photo = sysUploadFileService.getSysUploadFileById(photoId);
			// 设置当前图片为缩略图时，必须将其他图片全部改为非缩略图（缩略图的标记位通过C_LOCATION=0来体现，普通为1）
			sysUploadFileService.updateLocationByObjectIdType(1, photo.getObjectId(), photo.getObjectType());
			// 设置当前图片为缩略图
			sysUploadFileService.updateLocationById(0, photoId);

			// 获取文章ID
			Long articleId = photo.getObjectId();
			CmsArticle article = new CmsArticle();
			article.setId(articleId);
			article.setPath(photo.getPath());
			// 将该图片链接存入article表中
			cmsArticleService.updateImagePath(article);

			return ajaxJSON(Status.success, "设置成功");

		} catch (Exception e) {
			String msg = "设置时发生异常：" + e.getMessage();
			logger.error(msg, e);
			return ajaxJSON(Status.error, msg);
		}
	}

}

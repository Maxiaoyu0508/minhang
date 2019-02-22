package com.tocersoft.cms.service.impl;

import com.tocersoft.base.mybatis.page.PageResult;
import com.tocersoft.base.service.BaseServiceImpl;
import com.tocersoft.base.util.date.DateUtil;
import com.tocersoft.cms.dao.*;
import com.tocersoft.cms.dto.CmsArticleCondition;
import com.tocersoft.cms.entity.CmsArticle;
import com.tocersoft.cms.entity.CmsArticleTag;
import com.tocersoft.cms.entity.CmsTag;
import com.tocersoft.cms.service.ICmsArticleService;
import com.tocersoft.system.dao.ISysTagDao;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 文章管理业务层
 * @author lenovo
 *
 */
@Service("cmsArticleServiceImpl")
@Transactional(value = "transactionManager")
public class CmsArticleServiceImpl extends BaseServiceImpl implements ICmsArticleService{
	
	@Resource(name = "cmsArticleDaoImpl")
	private ICmsArticleDao cmsArticleDao;
	@Resource(name = "cmsTagDaoImpl")
	private ICmsTagDao cmsTagDao;
	@Resource(name = "cmsArticleTagDaoImpl")
	private ICmsArticleTagDao cmsArticleTagDao;
	@Resource(name = "cmsBlogArticleDaoImpl")
	private ICmsBlogArticleDao cmsBlogArticleDao;
	@Resource(name = "cmsColumnDaoImpl")
	private ICmsColumnDao cmsColumnDao;
	@Resource(name = "sysTagDaoImpl")
	private ISysTagDao sysTagDao;

	private final String COMMA  = ",";

	/**
	 * 前端页面查询对应栏目下的文章-区间数据
	 * @param pageResult
	 * @param condition
	 */
	public void listArticleListByPage(PageResult<CmsArticle> pageResult,CmsArticleCondition condition) {
		//获取总行数
		int count = cmsArticleDao.listCmsArticleByPageCount(condition);
		pageResult.setRows(count);
		RowBounds bounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		
		//获取结果集
		List<CmsArticle> list = cmsArticleDao.listCmsArticleByPage(bounds, condition);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			List<CmsTag> cmsTag = cmsTagDao.listCmsTagByArticleId(cmsArticle.getId());
			cmsArticle.setCmsTagList(cmsTag);
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		pageResult.setResult(list);
	}
	
	/**
	 * 查询推荐文章
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	public List<CmsArticle> listCmsArticleRecomend(Long channelId ,Integer limit){
		List<CmsArticle> result = cmsArticleDao.listCmsArticleRecomend(channelId, limit);
		Date now = new Date();
		for (CmsArticle cmsArticle : result) {
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		return result;
	}
	
	@Override
	public void getArticleListByPage(PageResult<CmsArticle> pageResult,CmsArticleCondition condition) {
		RowBounds row = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		if(null != condition.getChannelId() && condition.getChannelId() == 0L){
			condition.setChannelId(null);
		}
		//获取结果集
		List<CmsArticle> list = cmsArticleDao.getArticleListByPage(row,condition);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		pageResult.setResult(list);
		//获取总行数
		int count = cmsArticleDao.getArticleListByPageCount(condition);
		pageResult.setRows(count);
	}
	
	/**
	 *  查询专栏下对应标签下的热门文章
	 * @param columnId
	 * @param cid
	 * @param limit
	 * @return
	 */
	public List<CmsArticle> listNewArticleByColumnIdLimit(Long columnId,Long cid, Integer limit) {
		List<CmsArticle> cmsArticle = cmsArticleDao.listNewArticleByColumnIdLimit(columnId, cid, limit);
		Date now = new Date();
		for (CmsArticle item : cmsArticle) {
			List<CmsTag> cmsTag = cmsTagDao.listCmsTagByArticleId(item.getId());
			item.setCmsTagList(cmsTag);
			if(item.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(item.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					item.setShowNew(1);
				}else{
					item.setShowNew(0);
				}
			}else{
				item.setShowNew(0);
			}
		}
		return cmsArticle;
	}
	
	/**
	 * 分页
	 */
	public void listCmsColumnArticleByPageAndSection(PageResult<CmsArticle> pageResult,CmsArticleCondition condition) {
		int rows = cmsArticleDao.listCmsColumnArticleByPageAndSectionCount(condition);
		pageResult.setRows(rows);

		RowBounds rowBounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		List<CmsArticle> list = cmsArticleDao.listCmsColumnArticleByPageAndSection(rowBounds,condition);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		pageResult.setResult(list);
	}
	
	@Override
	public void getArticleListByPageOrderByReady(PageResult<CmsArticle> pageResult,CmsArticleCondition condition) {
		RowBounds row = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		//获取结果集
		List<CmsArticle> list = cmsArticleDao.getArticleListByPageOrderByReady(row,condition);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		pageResult.setResult(list);
		//获取总行数
		int count = cmsArticleDao.getArticleListByPageCount(condition);
		pageResult.setRows(count);
	}

	/**
	 * 分页查询文章 api接口
	 * @param pageResult
	 * @param condition
	 */
	@Override
	public List<CmsArticle> getAllArticleListByPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition) {
		RowBounds row = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		//获取结果集
		List<CmsArticle> list = cmsArticleDao.getArticleListByPage(row,condition);
		pageResult.setResult(list);
		//获取总行数
		int count = cmsArticleDao.getArticleListByPageCount(condition);
		pageResult.setRows(count);
		return list;
	}

	/**
	 * 添加文章
	 */
	public void doSave(CmsArticle item) {
		//保存文章
		cmsArticleDao.doSave(item);
		opTags(item);
	}

	/**
	 * 修改文章
	 */
	@Transactional(rollbackFor = RuntimeException.class,
			propagation = Propagation.REQUIRED)//保证只有一个事务，避免修改失败时，标签也被删掉
	public void doUpdate(CmsArticle item) {
		//删除已有标签
		cmsArticleTagDao.delByArticleId(item.getId());
		//添加新标签
		boolean result = opTags(item);
		//添加失败的话抛出异常回滚(异常要抛在public方法上，所以在外边抛
//		if (! result) {
//			throw new RuntimeException("文章没有对应的标签");
//		}
		//更新文章
		cmsArticleDao.doUpdate(item);
	}

	/**
	 * 新增与修改文章之后，对应的标签操作
	 * @param item
	 */
	private boolean opTags(CmsArticle item) {
		String tagList = item.getTagList();
		if(StringUtils.isBlank(tagList)){
			return true;
		}
		// 由于前端回显的需求，在修改操作时每个ID前均存在英文状态下的逗号，分割数组前需要先分割掉第一个逗号
		if(tagList.length() > 1 && tagList.endsWith(COMMA)){
			tagList = tagList.substring(0,tagList.length()-1);
		}
		if(tagList.length() > 1 && tagList.startsWith(COMMA)){
			tagList = tagList.substring(1);
		}
		String[] tagIds = tagList.split(COMMA);
		Long articleId = item.getId();
		for (int i = 0; i < tagIds.length; i++) {
			CmsArticleTag tag = new CmsArticleTag();
			tag.setArticleId(articleId);
			tag.setTagId(Long.parseLong(tagIds[i]));
			tag.setDeleteFlag(0);
			cmsArticleTagDao.add(tag);
		}
		return true;
	}

	
	/**
	 * 更新文章的图片路径
	 * @param item
	 */
	public void updateImagePath(CmsArticle item){
		cmsArticleDao.updateImagePath(item);
	}
	/**
	 * 更新浏览次数
	 *
	 */
	public void updateBrowseTime(Long browseTime,Long details){
		cmsArticleDao.updateBrowseTime(browseTime,details);
	}
	/**
	 * 更新点赞次数
	 *
	 */
	public void updateSpotTime(Long spotTime,Long details){
		cmsArticleDao.updateSpotTime(spotTime,details);
	}

	
	/**
	 * 修改博主文章
	 */
	public void doUpdateBlog(CmsArticle item) {
		cmsArticleDao.doUpdate(item);
	}
	
	
	@Override
	public void delArticle(Long articleId) {
		if(null == articleId){
			return;
		}
		cmsArticleDao.delArticle(new Long[]{articleId});
	}
	/*
	* 实现批量删除
	* */
	@Override
	public void bathDelArticle(Long[] articleId) {

		cmsArticleDao.delArticle(articleId);
	}

	@Override
	public int getArticleCount(Long channelId) {
		return cmsArticleDao.getArticleCount(channelId);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CmsArticle> getArticleByChannelId(Long channleId) {
		List<CmsArticle> list = cmsArticleDao.getArticleByChannelId(channleId);
		if(null != list && list.size() > 0 ){
			Date now = new Date();
			for (CmsArticle cmsArticle : list) {
				if(cmsArticle.getUpdateDate() != null){
					//判断是否显示最新标签
					int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
					int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
					if(nowDate-formatDate <= 3){
						cmsArticle.setShowNew(1);
					}else{
						cmsArticle.setShowNew(0);
					}
				}else{
					cmsArticle.setShowNew(0);
				}
			}
			return list;
		}
		return Collections.EMPTY_LIST;
	}
	
	@Override
	public CmsArticle getArticleById(Long id) {
		List<CmsArticle> list =  cmsArticleDao.getArticleById(id);
		CmsArticle art = null;
		if(null != list && list.size() > 0){
			art = list.get(0);
			// 阅读次数+1
			if(null == art.getReadNum()){
				art.setReadNum(0);
			}
			int readyNum = art.getReadNum().intValue()+1;
			art.setReadNum(readyNum);
			if(null != art){
				//查询文章标签
				List<CmsArticleTag> columnTag = cmsArticleTagDao.listCmsArticleTagByArticleId(art.getId());
				String tagList = "";
				for (CmsArticleTag cmsArticleTag : columnTag) {
                    tagList += COMMA+cmsArticleTag.getTagId();
				}
				art.setTagList(tagList+COMMA);
//				List<SysTag> sysTags = sysTagDao.listSysTagByArticleId(art.getId());
//				art.setSysTagList(sysTags);
			}
		}
		return art;
	}
	
	// 查看文章列表
	@Override
	public CmsArticle getArticleByArticleId(Long id) {
		List<CmsArticle> list =  cmsArticleDao.getArticleById(id);
		CmsArticle art = null;
		if(null != list && list.size() > 0){
			art = list.get(0);
			// 阅读次数+1
			if(null == art.getReadNum()){
				art.setReadNum(0);
			}
			int readyNum = art.getReadNum().intValue()+1;
			art.setReadNum(readyNum);
			if(null != art){
				//查询文章标签
				List<CmsArticleTag> columnTag = cmsArticleTagDao.listCmsArticleTagByArticleId(art.getId());
				String tagList = "";
				for (CmsArticleTag cmsArticleTag : columnTag) {
					if (cmsArticleTag.getTagId() == null) {
						continue;
					}
					if(StringUtils.isNotBlank(tagList)){
						tagList += "," + cmsArticleTag.getTagId();
					}else{
						tagList = cmsArticleTag.getTagId().toString();
					}
				}
				art.setTagList(tagList);
				List<CmsTag> cmsTag = cmsTagDao.listCmsTagByArticleId(art.getId());
				art.setCmsTagList(cmsTag);
			}
			this.doUpdateBlog(art);
		}
		return art;
	}
	
	@Override
	public List<CmsArticle> getArticleAll() {
		List<CmsArticle> list = cmsArticleDao.getArticleAll();
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		return list;
	}
	
	/**
	 * 查询类别下的某几篇文章
	 * @param cid	类别ID
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<CmsArticle> listArticleByCidLimit(Long cid, Integer limit) {
		List<CmsArticle> list = cmsArticleDao.listArticleByCidLimit(cid, limit);
		if(null != list && list.size() > 0 ){
			Date now = new Date();
			for (CmsArticle cmsArticle : list) {
				if(cmsArticle.getUpdateDate() != null){
					//判断是否显示最新标签
					int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
					int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
					if(nowDate-formatDate <= 3){
						cmsArticle.setShowNew(1);
					}else{
						cmsArticle.setShowNew(0);
					}
				}else{
					cmsArticle.setShowNew(0);
				}
			}
			return list;
		}
		return Collections.EMPTY_LIST;
	}
	
	/**
	 * 查询类别下的最新发布的前几篇文章
	 * @param cid	类别ID
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<CmsArticle> listNewArticleByCidLimit(Long cid, Integer limit) {
		List<CmsArticle> list = cmsArticleDao.listNewArticleByCidLimit(cid, limit);
		if(null != list && list.size() > 0 ){
			Date now = new Date();
			for (CmsArticle cmsArticle : list) {
				cmsArticle.setDateTips(DateUtil.getDistanceTime(now, cmsArticle.getUpdateDate()));
				if(cmsArticle.getUpdateDate() != null){
					//判断是否显示最新标签
					int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
					int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
					if(nowDate-formatDate <= 3){
						cmsArticle.setShowNew(1);
					}else{
						cmsArticle.setShowNew(0);
					}
				}else{
					cmsArticle.setShowNew(0);
				}
			}
			return list;
		}
		return Collections.EMPTY_LIST;
	}
	
	@Override
	public void publish(Long articleId) {
		if(null == articleId){
			return;
		}
		cmsArticleDao.publish(new Long[]{articleId}, 1);
	}
	/*
	* 审批发布
	* */
	@Override
	public void publishAll(Long[] articleId) {

		cmsArticleDao.publish(articleId, 1);
	}
	@Override
	public void unPublish(Long articleId) {
		if(null == articleId){
			return;
		}
		cmsArticleDao.publish(new Long[]{articleId}, 0);
	}
	/*
	* 取消发布
	* */
	@Override
	public void unPublishAll(Long[] articleId) {
		if(null == articleId){
			return;
		}
		cmsArticleDao.publish(articleId, 0);
	}
	/**
	 * 为当前文章加上一次阅读数量
	 * @param articleId
	 */
	@Override
	public void readOnce(Long articleId) {
		cmsArticleDao.readOnce(articleId);
	}
	
	/**
	 * 为当前文章加上一次点赞数量
	 * @param articleId
	 */
	@Override
	public void likeOnce(Long articleId) {
		cmsArticleDao.likeOnce(articleId);
	}

	/**
	 * 博主文章的分页 
	 */
	public void listBlogArticleListByPage(PageResult<CmsArticle> pageResult,CmsArticleCondition condition) {
		int rows = cmsArticleDao.listBlogArticleListByPageCount(condition);
		pageResult.setRows(rows);

		RowBounds rowBounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		List<CmsArticle> list = cmsArticleDao.listBlogArticleListByPage(rowBounds, condition);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			cmsArticle.setDateTips(DateUtil.getDistanceTime(now, cmsArticle.getUpdateDate()));
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		pageResult.setResult(list);
	}

	/**
	 * 批量推荐
	 * @param articleId
	 * @param isRecommend
	 */
	public void recommend(Long[] articleId, Integer isRecommend) {
		cmsArticleDao.recommend(articleId, isRecommend);
	}

	/**
	 * 查询推荐文章-首页热点资讯
	 * @param condition
	 * @param limit  条数
	 * @return
	 */
	public List<CmsArticle> listCmsArticleByRecomend(CmsArticleCondition condition, Integer limit) {
		List<CmsArticle> list = cmsArticleDao.listCmsArticleByRecomend(condition, limit);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			cmsArticle.setDateTips(DateUtil.getDistanceTime(now, cmsArticle.getUpdateDate()));
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		return list;
	}

	/**
	 * 根据ID查询博主发布的文章详细信息
	 */
	public CmsArticle getBlogArticleById(Long id) {
		return cmsArticleDao.getBlogArticleById(id);
	}
	
	/**
	 * 近期更新
	 * @param limit  条数
	 * @return
	 */
	public List<CmsArticle> listCmsArticleByBestNew(Integer limit){
		List<CmsArticle> list = cmsArticleDao.listCmsArticleByBestNew(limit);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			cmsArticle.setDateTips(DateUtil.getDistanceTime(now, cmsArticle.getUpdateDate()));
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		return list;
	}
	
	/**
	 * 热点资讯
	 * @param limit  条数
	 * @return
	 */
	public List<CmsArticle> listCmsArticleByHot(Integer limit){
		List<CmsArticle> list = cmsArticleDao.listCmsArticleByHot(limit);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			cmsArticle.setDateTips(DateUtil.getDistanceTime(now, cmsArticle.getUpdateDate()));
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		return list;
	}

	/**
	 * 统计整站点击率
	 * @return
	 */
	public int getClickRate() {
		//查询文章点击量
		int articleCount = cmsArticleDao.getCmsArticleClickRate();
		//查询栏目点击量
		int columnCount = cmsColumnDao.getCmsColumnClickRate();
		
		return articleCount + columnCount;
	}

	/**
	 * 一周热点
	 */
	public List<CmsArticle> listCmsArticleByBestWeek(CmsArticleCondition condition, Integer limit) {
		List<CmsArticle> list = cmsArticleDao.listCmsArticleByBestWeek(condition, limit);
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			cmsArticle.setDateTips(DateUtil.getDistanceTime(now, cmsArticle.getUpdateDate()));
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		return list;
	}

	/**
	 * 自媒体热点关注
	 * @return
	 */
	public List<CmsArticle> listCmsArticleByWeekTop() {
		List<CmsArticle> list = cmsArticleDao.listCmsArticleByWeekTop();
		Date now = new Date();
		for (CmsArticle cmsArticle : list) {
			cmsArticle.setDateTips(DateUtil.getDistanceTime(now, cmsArticle.getUpdateDate()));
			if(cmsArticle.getUpdateDate() != null){
				//判断是否显示最新标签
				int formatDate = Integer.parseInt(DateUtil.formatDate(cmsArticle.getUpdateDate(),"yyyyMMdd"));
				int nowDate = Integer.parseInt(DateUtil.formatDate(now,"yyyyMMdd"));
				if(nowDate-formatDate <= 3){
					cmsArticle.setShowNew(1);
				}else{
					cmsArticle.setShowNew(0);
				}
			}else{
				cmsArticle.setShowNew(0);
			}
		}
		return list;
	}
	
	public List<CmsArticle> getArticleByCondition(Long parentId){
		return cmsArticleDao.getArticleByCondition(parentId);
	}

	@Override
	public CmsArticle getArticlePrev(Long parentId,Integer mark) {
		return cmsArticleDao.getArticlePrev(parentId,mark);
	}

	@Override
	public CmsArticle getArticleNext(Long parentId,Integer mark) {
		return cmsArticleDao.getArticleNext(parentId,mark);
	}

	@Override
	public void listArticleByChannelIdAndPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition) {
		//获取总行数
		int count = cmsArticleDao.listArticleByChannelIdAndPageCount(condition);
		pageResult.setRows(count);
		
		RowBounds bounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		List<CmsArticle> list = cmsArticleDao.listArticleByChannelIdAndPage(bounds, condition);
		pageResult.setResult(list);
	}

	/**
	 * 根据栏目的编码模糊查询文章 -- 方泉 2016-07-22
	 * @param channelCode	栏目编码：类似0001-0002
	 * @param limit			限定数量
	 * @return
	 */
	public List<CmsArticle> listArticleByChannelCodeLimit(String channelCode, Integer limit) {
		return cmsArticleDao.listArticleByChannelCodeLimit(channelCode, limit);
	}
	/**
	 * 根据栏目父级id得到所有子级的文章包括本身 -- 分页
	 */
	@Override
	public void listArticleByChannelParentIdPage(PageResult<CmsArticle> pageResult,
			CmsArticleCondition condition) {
		//获取总行数
		int count = cmsArticleDao.listArticleByChannelParentIdPageCount(condition);
		pageResult.setRows(count);
		
		RowBounds bounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		List<CmsArticle> list = cmsArticleDao.listArticleByChannelParentIdPage(bounds, condition);
		pageResult.setResult(list);
	}
	
	/**
	 * 根据栏目父级id得到所有子级的文章包括本身 - 不分页
	 */
	@Override
	public 	List<CmsArticle> listArticleByChannelParentIdAll(CmsArticleCondition condition) {
		return cmsArticleDao.listArticleByChannelParentIdAll(condition);
	}
	
	/**
	 * 根据sortIndex查询得到上下篇文章
	 */
	@Override
	public CmsArticle getArticleBySortIndex(Integer sortIndex) {
		// TODO Auto-generated method stub
		return cmsArticleDao.getArticleBySortIndex(sortIndex);
	}

	/**
	 * 批量修改状态
	 */
	@Override
	public void updateState(Long[] articleId, Integer state) {
		cmsArticleDao.updateState(articleId, state);
	}

	/**
	 * 根据标签id查询文章
	 * @param tagId
	 * @return
	 */
	@Override
	public List<CmsArticle> listArticleByTagId(Long tagId) {
		return cmsArticleDao.listArticleByTagId(tagId);
	}

	/**
	 * 每个标签下取最新的limit文章数据，并且保证文章数据不重复
	 * @param tagId
	 * @param condition
	 * @param limit
	 * @return
	 */
	@Override
	public List<CmsArticle> listArticleNewLimitByTagIdNotInArticle(Long tagId, CmsArticleCondition condition,
			Integer limit) {
		return cmsArticleDao.listArticleNewLimitByTagIdNotInArticle(tagId, condition, limit);
	}

	/**
	 * 根据条件查询文章
	 */
	@Override
	public List<CmsArticle> listArticleByCondition(CmsArticleCondition condition) {
		return cmsArticleDao.listArticleByCondition(condition);
	}

	@Override
	public CmsArticle getFirstArticleByChannelId(Long channelId) {
		CmsArticleCondition condition =  new CmsArticleCondition();
		condition.setChannelId(channelId);
		return cmsArticleDao.getFirstArticleByChannelId(condition);
	}

	/**
	 * 根据条件查询文章及文章评论数量
	 */
	public List<CmsArticle> listArticleAndCommentByCondition(CmsArticleCondition condition) {
		return cmsArticleDao.listArticleAndCommentByCondition(condition);
	}

	/**
	 * 根据条件分页查询文章及文章评论数量
	 * @param pageResult
	 * @param condition
	 */
	public void listArticleAndCommentByPage(PageResult<CmsArticle> pageResult,CmsArticleCondition condition) {
		//获取总行数
		int count = cmsArticleDao.listArticleAndCommentByPageCount(condition);
		pageResult.setRows(count);
		RowBounds bounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());

		//获取结果集
		List<CmsArticle> list = cmsArticleDao.listArticleAndCommentByPage(bounds, condition);
		pageResult.setResult(list);
	}

	/**
	 * 查询最新发布的前几篇文章
	 * @param channelName
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	@Override
	public List<CmsArticle> listNewArticleByCondition(String channelName, Integer limit) {
		return cmsArticleDao.listNewArticleByCondition(channelName, limit);
	}

	/**
	 * 查询最新发布的前几篇问答文章
	 * @param
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	@Override
	public List<CmsArticle> listNewArticleQuestions(Integer limit) {
		return cmsArticleDao.listNewArticleQuestions(limit);
	}
}

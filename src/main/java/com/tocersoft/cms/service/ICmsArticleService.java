package com.tocersoft.cms.service;

import com.tocersoft.base.mybatis.page.PageResult;
import com.tocersoft.cms.dto.CmsArticleCondition;
import com.tocersoft.cms.entity.CmsArticle;

import java.util.List;

/**
 * 
 * 文章管理接口
 * @author 欧阳明航
 *
 */
public interface ICmsArticleService {
	
	/**
	 * 前端页面查询对应栏目下的文章-区间数据
	 * @param pageResult
	 * @param condition
	 */
	void listArticleListByPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 批量推荐
	 * @param articleId
	 * @param isRecommend
	 */
	void recommend(Long[] articleId, Integer isRecommend);

	/**
	 * 批量修改状态
	 */
	void updateState(Long[] articleId, Integer state);

	/**
	 * 添加文章
	 * @param item
	 */
	void doSave(CmsArticle item);

	/**
	 * 分页查询
	 * @param pageResult 分页对象
	 * @param condition 查询条件类
	 */
	void listCmsColumnArticleByPageAndSection(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 博主文章的分页
	 * @param pageResult
	 * @param condition
	 */
	void listBlogArticleListByPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);
	/**
	 *  修改文章
	 * @param item
	 */
	void doUpdate(CmsArticle item);

	/**
	 * 更新文章的图片路径
	 * @param item
	 */
	void updateImagePath(CmsArticle item);
	/**
	 * 更新浏览次数
	 *
	 */
	void updateBrowseTime(Long browseTime,Long details);
	/**
	 * 更新点赞次数
	 *
	 */
	void updateSpotTime(Long spotTime,Long details);
	/**
	 *  修改博主文章
	 * @param item
	 */
	void doUpdateBlog(CmsArticle item);

	/**
	 * 分页查询文章
	 * @param pageResult
	 * @param condition
	 */
	void getArticleListByPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 分页查询文章
	 * @param pageResult
	 * @param condition
	 */
	void getArticleListByPageOrderByReady(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 分页查询文章 api接口
	 * @param pageResult
	 * @param condition
	 */
	List<CmsArticle> getAllArticleListByPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 批量删除文章
	 * @param articleId
	 */
	void delArticle(Long articleId);
	void bathDelArticle(Long[] articleId);
	void publish(Long articleIds);
	void publishAll(Long[] articleId);
	void unPublish(Long articleIds);
	void unPublishAll(Long[] articleId);

	/**
	 * 为当前文章加上一次阅读数量
	 * @param articleId
	 */
	void readOnce(Long articleId);

	/**
	 * 为当前文章加上一次点赞数量
	 * @param articleId
	 */
	void likeOnce(Long articleId);

	/**
	 * 根据栏目ID查询栏目下是否有文章
	 * @param channelId
	 * @return
	 */
	int getArticleCount(Long channelId);
	/**
	 * 根据栏目ID查询所有文章
	 * @param channleId
	 * @return
	 */
	List<CmsArticle> getArticleByChannelId(Long channleId);


	/**
	 * 根据栏目父级id得到所有子级的文章包括本身  - 分页
	 */
	void listArticleByChannelParentIdPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 根据栏目父级id得到所有子级的文章包括本身  - 不分页
	 */
	List<CmsArticle> listArticleByChannelParentIdAll(CmsArticleCondition condition);

	/**
	 * 根据sortIndex查询得到上下篇文章
	 */
	CmsArticle getArticleBySortIndex(Integer sortIndex);



	/**
	 * 根据ID查询详细信息
	 * @param id
	 * @return
	 */
	CmsArticle getArticleById(Long id);

	/**
	 * 查看文章列表
	 * @param id
	 * @return
	 */
	CmsArticle getArticleByArticleId(Long id);
	/**
	 * 查询所有文章
	 * @return
	 */
	List<CmsArticle> getArticleAll();

	/**
	 * 查询类别下的某几篇文章
	 * @param cid	类别ID
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listArticleByCidLimit(Long cid, Integer limit);

	/**
	 * 查询类别下的最新发布的前几篇文章
	 * @param cid	类别ID
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listNewArticleByCidLimit(Long cid, Integer limit);

	/**
	 *  查询专栏下对应标签下的热门文章
	 * @param columnId
	 * @param cid
	 * @param limit
	 * @return
	 */
	List<CmsArticle> listNewArticleByColumnIdLimit(Long columnId, Long cid, Integer limit);

	/**
	 * 查询文章
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleRecomend(Long channelId, Integer limit);


	/**
	 * 查询推荐文章-首页热点资讯
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleByRecomend(CmsArticleCondition condition, Integer limit);

	/**
	 * 根据ID查询博主发布的文章详细信息
	 * @param id
	 * @return
	 */
	CmsArticle getBlogArticleById(Long id);

	/**
	 * 近期更新
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleByBestNew(Integer limit);

	/**
	 * 热点资讯
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleByHot(Integer limit);

	/**
	 * 统计整站点击率
	 * @return
	 */
	int getClickRate();

	/**
	 *  一周热点
	 * @param condition
	 * @param limit
	 * @return
	 */
	List<CmsArticle> listCmsArticleByBestWeek(CmsArticleCondition condition, Integer limit);
	/**
	 * 自媒体热点关注
	 * @return
	 */
	List<CmsArticle> listCmsArticleByWeekTop();

	List<CmsArticle> getArticleByCondition(Long parentId);
	/**
	 * 获得上一条记录
	 * @param mark
	 * @return
	 */
	CmsArticle getArticlePrev(Long parentId, Integer mark);
	/**
	 * 获得下一条记录
	 * @param mark
	 * @return
	 */
	CmsArticle getArticleNext(Long parentId, Integer mark);
	/**
	 * 根据栏目ID获得分页数据
	 * @param bounds
	 * @param condition
	 * @return
	 */
	void listArticleByChannelIdAndPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 根据栏目的编码模糊查询文章 -- 方泉 2016-07-22
	 * @param channelCode	栏目编码：类似0001-0002
	 * @param limit			限定数量
	 * @return
	 */
	List<CmsArticle> listArticleByChannelCodeLimit(String channelCode, Integer limit);

	/**
	 * 根据标签id查询文章
	 * @param tagId
	 * @return
	 */
	List<CmsArticle> listArticleByTagId(Long tagId);

	/**
	 * 每个标签下取最新的limit文章数据，并且保证文章数据不重复
	 * @param tagId
	 * @param condition
	 * @param limit
	 * @return
	 */
	List<CmsArticle> listArticleNewLimitByTagIdNotInArticle(Long tagId, CmsArticleCondition condition, Integer limit);

	/**
	 * 根据条件查询文章
	 */
	List<CmsArticle> listArticleByCondition(CmsArticleCondition condition);

	/**
	 * 获取第一条文章数据
	 * @return
	 */
	CmsArticle getFirstArticleByChannelId(Long channelId);

	/**
	 * 根据条件查询文章及文章评论数量
	 */
	List<CmsArticle> listArticleAndCommentByCondition(CmsArticleCondition condition);

	/**
	 * 根据条件分页查询文章及文章评论数量
	 * @param pageResult
	 * @param condition
	 */
	void listArticleAndCommentByPage(PageResult<CmsArticle> pageResult, CmsArticleCondition condition);

	/**
	 * 查询最新发布的前几篇文章
	 * @param channelName
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listNewArticleByCondition(String channelName, Integer limit);

	/**
	 * 查询最新发布的前几篇问答文章
	 * @param
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listNewArticleQuestions(Integer limit);

}

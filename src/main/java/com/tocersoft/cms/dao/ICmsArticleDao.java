package com.tocersoft.cms.dao;

import com.tocersoft.cms.dto.CmsArticleCondition;
import com.tocersoft.cms.dto.CmsArticleTagCondition;
import com.tocersoft.cms.entity.CmsArticle;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 文章管理DAO
 * @author 欧阳明航
 *
 */
@Repository("cmsArticleDaoImpl")
public interface ICmsArticleDao {
	
	/**
	 * 分页查询对应栏目下的文章
	 * @param bounds
	 * @param condition
	 * @return
	 */
	List<CmsArticle> listCmsArticleByPage(RowBounds bounds, @Param("condition") CmsArticleCondition condition);

	/**
	 * 博主文章的分页
	 * @param bounds
	 * @param condition
	 * @return
	 */
	List<CmsArticle> listBlogArticleListByPage(RowBounds bounds, @Param("condition") CmsArticleCondition condition);
	int listBlogArticleListByPageCount(@Param("condition") CmsArticleCondition condition);
	/**
	 * 查询推荐文章
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleRecomend(@Param("channelId") Long channelId, @Param("limit") Integer limit);

	/**
	 * 分页查询对应栏目下的文章数量
	 * @param condition
	 * @return
	 */
	int listCmsArticleByPageCount(@Param("condition") CmsArticleCondition condition);

	/**
	 * 根据栏目ID查询文章数量
	 * @param id
	 * @return
	 */
	int getArticleCount(Long id);
	/**
	 * 添加文章
	 * @param item
	 */
	void doSave(CmsArticle item);
	/**
	 * 修改文章
	 * @param item
	 */
	void doUpdate(CmsArticle item);

	/**
	 * 更新文章的图片路径
	 * @param item
	 */
	void updateImagePath(@Param("item") CmsArticle item);
	/**
	 * 更新浏览次数
	 * @param
	 */
	void updateBrowseTime(@Param("browseTime") Long browseTime ,@Param("details")Long details);
	/**
	 * 更新点赞次数
	 * @param
	 */
	void updateSpotTime(@Param("spotTime") Long spotTime ,@Param("details")Long details);
	/**
	 * 分页查询文章
	 * @param row
	 * @param condition
	 * @return
	 */
	List<CmsArticle> getArticleListByPage(RowBounds row, @Param("condition") CmsArticleCondition condition);

	/**
	 * 查询区间数据
	 * @param bounds RowBounds对象
	 * @param condition 查询条件类
	 */
	List<CmsArticle> listCmsColumnArticleByPageAndSection(RowBounds bounds, @Param("condition") CmsArticleCondition condition);

	/**
	 * 获取总行数
	 * @param condition
	 * @return
	 */
	int getArticleListByPageCount(@Param("condition") CmsArticleCondition condition);

	/**
	 * 查询总数
	 * @param condition 查询条件类
	 * @return 总条数
	 */
	int listCmsColumnArticleByPageAndSectionCount(@Param("condition") CmsArticleCondition condition);

	/**
	 * 分页按点击次数排列
	 * @param row
	 * @param condition
	 * @return
	 */
	List<CmsArticle> getArticleListByPageOrderByReady(RowBounds row, @Param("condition") CmsArticleCondition condition);

	/**
	 * 批量删除
	 * @param articleId
	 */
	void delArticle(Long[] articleId);
	/**
	 * 批量发布
	 * @param articleId
	 */
	void publish(@Param("articleId") Long[] articleId, @Param("isPublish") Integer isPublish);

	/**
	 * 批量推荐
	 * @param articleId
	 * @param isRecommend
	 */
	void recommend(@Param("articleId") Long[] articleId, @Param("isRecommend") Integer isRecommend);

	/**
	 * 批量修改状态
	 */
	void updateState(@Param("articleId") Long[] articleId, @Param("state") Integer state);

	/**
	 * 根据栏目ID查询文章集合
	 * @param channleId
	 * @return
	 */
	List<CmsArticle> getArticleByChannelId(Long channleId);


	/**
	 * 根据栏目父级id得到所有子级的文章包括本身
	 */
	List<CmsArticle> listArticleByChannelParentIdPage(RowBounds row, @Param("condition") CmsArticleCondition condition);


	/**
	 * 根据栏目父级id得到所有子级的文章包括本身
	 */
	int listArticleByChannelParentIdPageCount(@Param("condition") CmsArticleCondition condition);

	/**
	 * 根据sortIndex查询得到上下篇文章
	 */
	CmsArticle getArticleBySortIndex(@Param("sortIndex") Integer sortIndex);

	/**
	 * 查询类别下的某几篇文章
	 * @param cid	类别ID
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listArticleByCidLimit(@Param("cid") Long cid, @Param("limit") Integer limit);

	/**
	 * 查询类别下的最新发布的前几篇文章
	 * @param cid	类别ID
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listNewArticleByCidLimit(@Param("cid") Long cid, @Param("limit") Integer limit);

	/**
	 * 根据ID查询详细信息
	 * @param id
	 * @return
	 */
	List<CmsArticle> getArticleById(Long id);

	CmsArticle getArticleByArticleId(@Param("articleId") Long articleId);

	/**
	 * 根据标签id查询文章
	 * @param tagId
	 * @return
	 */
	List<CmsArticle> listArticleByTagId(@Param("tagId") Long tagId);



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
	 * 收藏一次
	 * @param articleId
	 */
	void collectOnce(@Param("articleId") Long articleId);

	List<CmsArticle> getArticleAll();

	/**
	 *  查询专栏下对应标签下的热门文章
	 * @param columnId
	 * @param cid
	 * @param limit
	 * @return
	 */
	List<CmsArticle> listNewArticleByColumnIdLimit(@Param("columnId") Long columnId, @Param("cid") Long cid, @Param("limit") Integer limit);

	/**
	 * 根据年月查询动态报道
	 * @param month
	 * @return
	 */
	List<CmsArticle> listArticleDtbdByYearMonth(@Param("ym") String ym, @Param("columnId") Long columnId);

	/**
	 * 查询推荐文章-首页热点资讯
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleByRecomend(@Param("condition") CmsArticleCondition condition, @Param("limit") Integer limit);

	/**
	 * 根据ID查询博主发布的文章详细信息
	 * @param id
	 * @return
	 */
	CmsArticle getBlogArticleById(@Param("id") Long id);

	/**
	 * 近期更新
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleByBestNew(@Param("limit") Integer limit);

	/**
	 * 热点资讯
	 * @param channelId  栏目id
	 * @param limit  条数
	 * @return
	 */
	List<CmsArticle> listCmsArticleByHot(@Param("limit") Integer limit);

	CmsArticle getCmsArticleByCmsArticleId(@Param("articleId") Long articleId);

	int getCmsArticleClickRate();

	/**
	 *  一周热点
	 * @param condition
	 * @param limit
	 * @return
	 */
	List<CmsArticle> listCmsArticleByBestWeek(@Param("condition") CmsArticleCondition condition, @Param("limit") Integer limit);

	/**
	 * 自媒体热点关注
	 * @return
	 */
	List<CmsArticle> listCmsArticleByWeekTop();
	/**
	 * 修改排序
	 * @param condition
	 */
	void updateSort(@Param("condition") CmsArticleTagCondition condition);

	List<CmsArticle> getArticleByCondition(@Param("parentId") Long parentId);
	/**
	 * 获得上一条记录
	 * @param mark
	 * @return
	 */
	CmsArticle getArticlePrev(@Param("parentId") Long parentId, @Param("mark") Integer mark);
	/**
	 * 获得下一条记录
	 * @param mark
	 * @return
	 */
	CmsArticle getArticleNext(@Param("parentId") Long parentId, @Param("mark") Integer mark);
	/**
	 * 根据栏目ID获得分页数据
	 * @param bounds
	 * @param condition
	 * @return
	 */
	List<CmsArticle> listArticleByChannelIdAndPage(RowBounds bounds, @Param("condition") CmsArticleCondition condition);
	/**
	 * 根据栏目ID获得分页数据数量
	 * @param condition
	 * @return
	 */
	int listArticleByChannelIdAndPageCount(@Param("condition") CmsArticleCondition condition);

	/**
	 * 根据栏目的编码模糊查询文章 -- 方泉 2016-07-22
	 * @param channelCode	栏目编码：类似0001-0002
	 * @param limit			限定数量
	 * @return
	 */
	List<CmsArticle> listArticleByChannelCodeLimit(@Param("channelCode") String channelCode, @Param("limit") Integer limit);

	/**
	 * 每个标签下取最新的limit文章数据，并且保证文章数据不重复
	 * @param tagId
	 * @param condition
	 * @param limit
	 * @return
	 */
	List<CmsArticle> listArticleNewLimitByTagIdNotInArticle(@Param("tagId") Long tagId, @Param("condition") CmsArticleCondition condition, @Param("limit") Integer limit);

	/**
	 * 根据条件查询文章
	 */
	List<CmsArticle> listArticleByCondition(@Param("condition") CmsArticleCondition condition);

	/**
	 * 根据栏目父级id得到所有子级的文章包括本身  - 不分页
	 */
	List<CmsArticle> listArticleByChannelParentIdAll(@Param("condition") CmsArticleCondition condition);

	/**
	 * 获取第一条文章数据
	 * @return
	 */
	CmsArticle getFirstArticleByChannelId(@Param("condition") CmsArticleCondition condition);

	/**
	 * 根据条件查询文章及文章评论数量
	 */
	List<CmsArticle> listArticleAndCommentByCondition(@Param("condition") CmsArticleCondition condition);


	/**
	 * 根据条件分页查询文章及文章评论数量
	 * @param bounds
	 * @param condition
	 */
	List<CmsArticle> listArticleAndCommentByPage(RowBounds bounds, @Param("condition") CmsArticleCondition condition);


	/**
	 * 根据条件分页查询文章及文章评论数量条数
	 * @param condition
	 */
	int listArticleAndCommentByPageCount(@Param("condition") CmsArticleCondition condition);

	/**
	 * 查询最新发布的前几篇文章
	 * @param channelName
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listNewArticleByCondition(@Param("channelName") String channelName, @Param("limit") Integer limit);

	/**
	 * 查询最新发布的前几篇问答文章
	 * @param
	 * @param limit	限制几篇文章 null或者0表示不限数量
	 */
	List<CmsArticle> listNewArticleQuestions(@Param("limit") Integer limit);
	/**
	 * 描 述：前端展示文章
	 * @param id 文章IDid
	 * @return 文章文本内容
	 */
	CmsArticle getCmsArticle(@Param("id") Long id);
}

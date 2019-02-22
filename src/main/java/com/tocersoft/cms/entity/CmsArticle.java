package com.tocersoft.cms.entity;

import com.tocersoft.base.entity.BaseBusLongEntity;
import com.tocersoft.system.entity.SysTag;
import com.tocersoft.system.entity.SysUploadFile;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 文章管理
 * @author 欧阳明航
 * 
 */
@Alias("cmsArticle")
public class CmsArticle extends BaseBusLongEntity {

	private static final long serialVersionUID = 9143225122750279955L;
	/** 文章标题 */
	private String name;
	/** 文章关键词 */
	private String keyword;
	/** 文章关键词 */
	private String keyword2;
	/** 文章关键词 */
	private String keyword3;
	/** 图片路径 */
	private String path;
	/** 图片保存文件名 */
	private String filename;
	/** 文章创建人(昵称) */
	private String createName;
	/** 文章摘要（ 用于首页显示 ） */
	private String summary;
	/** 文章摘要（ 用于首页显示英文 ） */
	private String summaryEn;
	/** 文章内容 */
	private String content;
	/** 栏目ID */
	private Long channelId;
	/** 栏目名称 */
	private String channelName;
	/** 问题标题 */
	private String title;
	/** 状态 1：系统 2：用户 */
	private Integer state;
	/** 排序 */
	private Integer sort;
	/** 阅读次数 */
	private Integer readNum;
	/** 点赞次数 */
	private Integer likeNum;
	/** 收藏数量*/
	private Integer collectNum;
	/** 是否发布 0-不发布 1-发布 */
	private Integer isPublish;
	/** 是否推荐   0.不推荐  1.推荐*/
	private Integer isRecommend;
	/** 排序参数，用于上一篇下一篇的查询*/
	private Integer sortIndex;
	/**发布时间*/
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date publishDate;
	/** 时间戳*/
	private String dateTips;
	
	/** 文章发布人 */
	private String author;
	/** 文章来源 */
	private String source;
	/**浏览次数*/
	private Long  browseTime;
	/**点赞次数*/
	private  Long  spotTime;
	/**展览地点*/
	private String exhibitionPlace;
	/**展览时间*/
	private  String exhibitionTime;
	/**3D 展出* */
	private  String threeDimensionsExhibition;

	private String columnArticleId;
	/** 文章标签*/
	private String tagList;
	/** 文章标签*/
	private List<CmsTag> cmsTagList = new ArrayList<CmsTag>();
	/** 文章标签 cmsTag -> sysTag*/
	private List<SysTag> sysTagList = new ArrayList<SysTag>();
	
	/*** 栏目*/
	private CmsChannel cmsChannel;
	
	/*** 文件图片或视频*/
	private SysUploadFile sysUploadFile;
	
	/*** 文件图片表 图片*/
	private String sysUploadFilePath;
	
	/*** 文件图片表  路径*/
	private String sysUploadFileUrl;


	/*** 非保留字段*/
	/*** 博主id*/
	private Long blogId;
	/*** 博主姓名*/
	private String blogName;
	/** 存放收藏表的id*/
	private String collectId;
	
	/** 是否显示最新图标*/
	private Integer showNew;
	/** 页面模板ID*/
	private Long cmsTemplateId;

	/** 页面模板ID*/
	public Long getCmsTemplateId() {
		return cmsTemplateId;
	}

	/** 页面模板ID*/
	public void setCmsTemplateId(Long cmsTemplateId) {
		this.cmsTemplateId = cmsTemplateId;
	}

	public Integer getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(Integer isPublish) {
		this.isPublish = isPublish;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getChannelId() {
		return channelId;
	}

	public void setChannelId(Long channelId) {
		this.channelId = channelId;
	}

	public String getChannelName() {
		return channelName;
	}

	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public String getCreateName() {
		return createName;
	}
	public void setCreateName(String createName) {
		this.createName = createName;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getKeyword2() {
		return keyword2;
	}
	public void setKeyword2(String keyword2) {
		this.keyword2 = keyword2;
	}
	public String getKeyword3() {
		return keyword3;
	}
	public void setKeyword3(String keyword3) {
		this.keyword3 = keyword3;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public Integer getReadNum() {
		return readNum;
	}
	public void setReadNum(Integer readNum) {
		this.readNum = readNum;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public Integer getLikeNum() {
		return likeNum;
	}
	public void setLikeNum(Integer likeNum) {
		this.likeNum = likeNum;
	}
	
	public String getSummaryEn() {
		return summaryEn;
	}
	public void setSummaryEn(String summaryEn) {
		this.summaryEn = summaryEn;
	}
	public String getColumnArticleId() {
		return columnArticleId;
	}
	public void setColumnArticleId(String columnArticleId) {
		this.columnArticleId = columnArticleId;
	}
	public List<CmsTag> getCmsTagList() {
		return cmsTagList;
	}
	public void setCmsTagList(List<CmsTag> cmsTagList) {
		this.cmsTagList = cmsTagList;
	}
	public String getTagList() {
		return tagList;
	}
	public void setTagList(String tagList) {
		this.tagList = tagList;
	}
	public CmsChannel getCmsChannel() {
		return cmsChannel;
	}
	public void setCmsChannel(CmsChannel cmsChannel) {
		this.cmsChannel = cmsChannel;
	}
	public Integer getCollectNum() {
		return collectNum;
	}
	public void setCollectNum(Integer collectNum) {
		this.collectNum = collectNum;
	}
	public Long getBlogId() {
		return blogId;
	}
	public void setBlogId(Long blogId) {
		this.blogId = blogId;
	}
	public String getBlogName() {
		return blogName;
	}
	public void setBlogName(String blogName) {
		this.blogName = blogName;
	}

	
	public Integer getIsRecommend() {
		return isRecommend;
	}
	public void setIsRecommend(Integer isRecommend) {
		this.isRecommend = isRecommend;
	}
	public String getDateTips() {
		return dateTips;
	}
	public void setDateTips(String dateTips) {
		this.dateTips = dateTips;
	}
	public String getCollectId() {
		return collectId;
	}
	public void setCollectId(String collectId) {
		this.collectId = collectId;
	}
	public Integer getShowNew() {
		return showNew;
	}
	public void setShowNew(Integer showNew) {
		this.showNew = showNew;
	}
	public Integer getSortIndex() {
		return sortIndex;
	}
	public void setSortIndex(Integer sortIndex) {
		this.sortIndex = sortIndex;
	}
	public SysUploadFile getSysUploadFile() {
		return sysUploadFile;
	}
	public void setSysUploadFile(SysUploadFile sysUploadFile) {
		this.sysUploadFile = sysUploadFile;
	}
	public Date getPublishDate() {
		return publishDate;
	}
	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}

	public String getSysUploadFilePath() {
		return sysUploadFilePath;
	}
	public void setSysUploadFilePath(String sysUploadFilePath) {
		this.sysUploadFilePath = sysUploadFilePath;
	}
	public String getSysUploadFileUrl() {
		return sysUploadFileUrl;
	}
	public void setSysUploadFileUrl(String sysUploadFileUrl) {
		this.sysUploadFileUrl = sysUploadFileUrl;
	}

	public List<SysTag> getSysTagList() {
		return sysTagList;
	}

	public void setSysTagList(List<SysTag> sysTagList) {
		this.sysTagList = sysTagList;
	}

	/** 问题标题 */
	public String getTitle() {
		return title;
	}
	/** 问题标题 */
	public void setTitle(String title) {
		this.title = title;
	}

	public Long getBrowseTime() {
		return browseTime;
	}

	public void setBrowseTime(Long browseTime) {
		this.browseTime = browseTime;
	}

	public Long getSpotTime() {
		return spotTime;
	}

	public void setSpotTime(Long spotTime) {
		this.spotTime = spotTime;
	}


	public String getExhibitionPlace() {
		return exhibitionPlace;
	}

	public void setExhibitionPlace(String exhibitionPlace) {
		this.exhibitionPlace = exhibitionPlace;
	}

	public String getExhibitionTime() {
		return exhibitionTime;
	}

	public void setExhibitionTime(String exhibitionTime) {
		this.exhibitionTime = exhibitionTime;
	}

	public String getThreeDimensionsExhibition() {
		return threeDimensionsExhibition;
	}

	public void setThreeDimensionsExhibition(String threeDimensionsExhibition) {
		this.threeDimensionsExhibition = threeDimensionsExhibition;
	}
}

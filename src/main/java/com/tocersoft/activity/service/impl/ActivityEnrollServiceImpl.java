package com.tocersoft.activity.service.impl;

import com.tocersoft.activity.dao.IActivityEnrollDao;
import com.tocersoft.activity.dto.ActivityEnrollCondition;
import com.tocersoft.activity.entity.ActivityEnroll;
import com.tocersoft.activity.service.IActivityEnrollService;
import com.tocersoft.base.mybatis.page.PageResult;
import com.tocersoft.base.service.BaseServiceImpl;
import com.tocersoft.base.util.date.DateUtil;
import com.tocersoft.base.util.excel.ExcelUtil;
import org.apache.ibatis.session.RowBounds;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * 活动报名
 * @creator     拓者码工
 * @create-time 2016/5/18 13:53:41
 * @email developer@tocersoft.com
 * @company www.tocersoft.com
 * @version 1.0
 */
@Service("activityEnrollServiceImpl")
@Transactional(value = "transactionManager")
public class ActivityEnrollServiceImpl extends BaseServiceImpl implements IActivityEnrollService{

	@Resource(name = "activityEnrollDaoImpl")
	private IActivityEnrollDao activityEnrollDao;

	/**
	 * 查询所有活动报名
	 */
	public List<ActivityEnroll> listActivityEnrollAll(){
		return activityEnrollDao.listActivityEnrollAll();
	}

	/**
	 * 分页查询
	 * @param pageResult 分页对象
	 * @param condition 查询条件类
	 */
	public void listActivityEnrollByPage(PageResult<ActivityEnroll> pageResult,ActivityEnrollCondition condition){
		int rows = activityEnrollDao.listActivityEnrollByPageCount(condition);
		pageResult.setRows(rows);

		RowBounds rowBounds = new RowBounds(pageResult.getCurrentPageIndex(),pageResult.getPageSize());
		List<ActivityEnroll> list = activityEnrollDao.listActivityEnrollByPage(rowBounds,condition);
		pageResult.setResult(list);
	}
	/**查询总数
	 * */
	public int listActivityEnrollByPageCount(ActivityEnrollCondition condition){
	 	return  activityEnrollDao.listActivityEnrollByPageCount(condition);
}

	/**
	 * 根据ID查询
	 * @param id 主键
	 * @return 活动报名
	 */
	public ActivityEnroll getActivityEnrollById(Long id){
		return activityEnrollDao.getActivityEnrollById(id);
	}

	/**
	 * 新增
	 * @param item 活动报名
	 */
	public void add(ActivityEnroll item){
		activityEnrollDao.add(item);
	}

	/**
	 * 修改
	 * @param item 活动报名
	 */
	public void update(ActivityEnroll item){
		activityEnrollDao.update(item);
	}

	/**
	 * 根据ID集合批量删除
	 * @param ids ID集合
	 */
	public void delByIds(Long[] ids){
		activityEnrollDao.delByIds(ids);
	}

	/**
	 * 修改审核状态
	 */
	@Override
	public void updateState(ActivityEnroll item) {
		activityEnrollDao.updateState(item);
	}

	@Override
	public void delById(Long id) {
		activityEnrollDao.delById(id);
	}
	
	/**
	 * 导出开班报名信息
	 * 
	 * @param condition
	 * @return
	 */
	public HSSFWorkbook exportInfo(ActivityEnrollCondition condition) {
		// 1.查询数据
		List<ActivityEnroll> activityEnroll = activityEnrollDao.listActivityEnrollByCondition(condition);

		// 2.写入excel
		String[] titles = new String[] { "活动名称", "联系人", "性别", "手机号码", "电子邮箱", "报名时间", "状态", "报名人数", "付款方式", "总金额" };
		Integer[] titleWidths = new Integer[] { 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 };

		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet();
		// 创建标题行
		ExcelUtil.createHSSFRow(titles, titleWidths, wb, sheet, 0);

		for (int i = 0; i < activityEnroll.size(); i++) {
			ActivityEnroll item = activityEnroll.get(i);
			HSSFRow itemRow = sheet.createRow(i + 1);
			// 主键ID
            ExcelUtil.createCellValue(wb, itemRow, 0, item.getActivity().getName());
            ExcelUtil.createCellValue(wb, itemRow, 1, item.getLinkMan());
			// 性别：0-女，1-男
			if(item.getSex() != null){
                ExcelUtil.createCellValue(wb, itemRow, 2, item.getSex() == 0 ? "女" : "男");
			}else{
                ExcelUtil.createCellValue(wb, itemRow, 2, "");
			}
            ExcelUtil.createCellValue(wb, itemRow, 3, item.getMobile());
            ExcelUtil.createCellValue(wb, itemRow, 4, item.getEmail());
            ExcelUtil.createCellValue(wb, itemRow, 5, DateUtil.formatDate(item.getEnrollTime(),"yyyy-MM-dd HH:mm:ss"));
			if(item.getState() != null){
				if(item.getState() == 0){
                    ExcelUtil.createCellValue(wb, itemRow, 6, "未审核");
				}else if(item.getState() == 1){
                    ExcelUtil.createCellValue(wb, itemRow, 6, "审核通过");
				}else if(item.getState() == 2){
                    ExcelUtil.createCellValue(wb, itemRow, 6, "审核未通过");
				}
			}else{
                ExcelUtil.createCellValue(wb, itemRow, 6, "未审核");
			}
            ExcelUtil.createCellValue(wb, itemRow, 7, item.getNumber());
			// 付款方式：1-线下付款，2-线上付款
			if(item.getPayState() != null){
                ExcelUtil.createCellValue(wb, itemRow, 8, item.getPayState() == 1 ? "线下付款" : "线上付款");
			}else{
                ExcelUtil.createCellValue(wb, itemRow, 8, "");
			}
            ExcelUtil.createCellValue(wb, itemRow, 9, item.getSumPrice());
		}
		return wb;
	}

	/**
	 * 根据条件查询数据
	 */
	public List<ActivityEnroll> listActivityEnrollByCondition(ActivityEnrollCondition condition) {
		return activityEnrollDao.listActivityEnrollByCondition(condition);
	}

}


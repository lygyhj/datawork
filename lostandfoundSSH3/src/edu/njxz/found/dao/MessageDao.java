package edu.njxz.found.dao;

import java.util.List;

import edu.njxz.found.entity.Message;
import edu.njxz.found.utils.page.Page;

public interface MessageDao {
	
	//����һ����¼
	void insert(Message message);
	
	//����һ����¼
	void updateMessage(Message message);
	
	//ͨ���û�id��ѯmessageList
	List<Message> findByUserId(int userId);
	
	//��������MessageList
	List<Message> findAll();
	/**
	 * ��ҳ��ѯ
	 * @param pageNum  ҳ��
	 * @param size    ÿҳ����
	 * @return
	 */
	Page<Message> findByPageNum(int pageNum,int size);
	
	/**
	 * ��ҳ��ѯ
	 * @param userId   �û�Id
	 * @param pageNum   ҳ��
	 * @param size     ÿҳ����
	 * @return
	 */
	Page<Message> findByPageNumAndUserId(int userId,int pageNum,int size);

}

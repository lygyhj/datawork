package edu.njxz.found.service;

import java.io.File;
import java.util.List;

import edu.njxz.found.entity.Message;
import edu.njxz.found.entity.vo.Post;

public interface MessageService {
	
	//����һ����¼
	void saveMessage(Message message);
	//����һ����¼
	void updateMessage(Message message);
	//ͨ���û�id��ѯmessageList
	List<Message> findByUserId(int userId);
	//��������MessageList
	List<Message> findAll();
	
	//��ѯ����PostList -->Message�ķ�װ����
	List<Post> findAllPost(); 
	/**
	 * 
	 * ��ѯ��ǰ�û�������postList
	 * @param id
	 * @return
	 */
	List<Post> findAllPostByUserId(int id);
	
	/**
	 * �����ϴ���ͼƬ
	 * @param upload
	 * @return  ͼƬ·��
	 */
	String savePhoto(File upload);
	


}

package edu.njxz.found.dao;

import java.util.List;

import edu.njxz.found.entity.Comment;

public interface CommentDao {
	
	//����һ����¼
	void saveComment(Comment comment);
	
	//��ѯһ����¼����������
	List<Comment> findAllByMessageId(int id);

}

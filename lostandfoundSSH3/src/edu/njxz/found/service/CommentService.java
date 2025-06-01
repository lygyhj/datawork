package edu.njxz.found.service;

import java.util.List;

import edu.njxz.found.entity.Comment;
import edu.njxz.found.entity.vo.CommentVo;

public interface CommentService {
	    //����һ����¼
		void saveComment(Comment comment);
		
		//��ѯһ����¼����������
		List<Comment> findAllByMessageId(int id);
		
		//��ѯһ����¼���������� ��װ�������
		List<CommentVo> findAll(int id);

}

package edu.njxz.found.test;

import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.njxz.found.entity.Comment;
import edu.njxz.found.service.CommentService;
import edu.njxz.found.service.MessageService;

public class CommentTest {
	
	 //�������
    ApplicationContext ac;   //��ȡSpring�����ļ������������Ķ���
    CommentService commentService; //���ڽ���һ��UserServiceImplʵ��
    @Before
    public void setUp(){
        ApplicationContext ac=new ClassPathXmlApplicationContext("applicationContext.xml");
        commentService=(CommentService) ac.getBean("commentService");
    }
	@Test
	public void saveTest() {
		Comment comment=new Comment();
		comment.setCommentContent("������");
		comment.setCommentDate(new Date());
		comment.setCommentUserid("1");
		comment.setCommentMessageid(1);
		comment.setCommentMessageid(1);
		
		commentService.saveComment(comment);
		
	}
    
	@Test
	public void queryTest() {
		List<Comment> commentList=commentService.findAllByMessageId(1);
		for(Comment m:commentList) {
			System.out.println(m.getCommentContent());
		}
	}
}

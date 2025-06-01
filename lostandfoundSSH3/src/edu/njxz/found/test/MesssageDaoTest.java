package edu.njxz.found.test;

import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import edu.njxz.found.dao.MessageDao;
import edu.njxz.found.dao.UserDao;
import edu.njxz.found.dao.impl.MessageDaoImpl;
import edu.njxz.found.entity.Message;
import edu.njxz.found.entity.User;
import edu.njxz.found.service.MessageService;
import edu.njxz.found.service.UserService;

@Transactional
public class MesssageDaoTest {
	 //�������
    ApplicationContext ac;   //��ȡSpring�����ļ������������Ķ���
    MessageService messageService; //���ڽ���һ��UserServiceImplʵ��
    @Before
    public void setUp(){
        ApplicationContext ac=new ClassPathXmlApplicationContext("applicationContext.xml");
        messageService=(MessageService) ac.getBean("messageService");
    }
	@Test
	public void testInsertMenthod() {
		
		Message m=new Message();
		m.setMessageCategotyid(1);
		m.setMessageDate(new Date());
		m.setMessageDescription("���˵�һ��");
		m.setMessageUserid("1");
		
		messageService.saveMessage(m);

	}
	
	@Test
	public void testUpdate() {
		Message m=new Message();
		m.setMessageId(1);
		m.setMessageCategotyid(1);
		m.setMessageDate(new Date());
		m.setMessageDescription("��������1 ���º�");
		m.setMessageUserid("1");
		
		messageService.updateMessage(m);
	}
	
	@Test
	public void testQueryByUserId() {
		List<Message> messageList=messageService.findByUserId(1);
		
		for(Message m:messageList) {
			System.out.println(m.getMessageDescription());
		}
	}
	
	@Test
	public void testQueryAll() {
       List<Message> messageList=messageService.findAll();     
		
		for(Message m:messageList) {
			System.out.println(m.getMessageDescription());
		}
	}
	

}

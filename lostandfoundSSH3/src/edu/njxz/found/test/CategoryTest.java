package edu.njxz.found.test;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.njxz.found.entity.Category;
import edu.njxz.found.service.CategoryService;
import edu.njxz.found.service.UserService;

public class CategoryTest {
	
	ApplicationContext ac;   //��ȡSpring�����ļ������������Ķ���
    CategoryService categoryService; //���ڽ���һ��UserServiceImplʵ��
    @Before
    public void setUp(){
        ApplicationContext ac=new ClassPathXmlApplicationContext("applicationContext.xml");
        categoryService=(CategoryService) ac.getBean("categoryService");
    }
    
	@Test
	public void saveTest() {
		Category c=new Category();
		c.setCategoryName("����");
		categoryService.saveCategory(c);
	}
	
	@Test
	public void selectTest() {
		Category c=categoryService.findById(1);
		System.out.println(c.getCategoryName());
	}
	
	@Test
	public void testFindAll() {
		List<Category> cList=categoryService.findAll();
		for(Category c:cList) {
			System.out.println(c.getCategoryName());
		}
	}

}

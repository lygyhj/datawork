package edu.njxz.found.service;

import java.util.List;

import edu.njxz.found.entity.Category;

public interface CategoryService {
	
	//����һ����¼
		void saveCategory(Category category);
		
		//ͨ��id��ѯһ����¼
		Category findById(int id);
	 
		//��ѯ���м�¼
		List<Category> findAll();

}

package edu.njxz.found.dao;

import java.util.List;

import edu.njxz.found.entity.User;

public interface UserDao {
	
	//����һ���û�
    void saveUser(User user);
    //ͨ��idɾ��һ���û�
    void deleteUserById(int id);
    //�����û���Ϣ
    void updateUser(User user);
    //ͨ��name��ѯ�û�
    List<User> findUserByName(String userName);
    //ͨ��id��ѯ�û�
    User findUserById(int id);
    
}

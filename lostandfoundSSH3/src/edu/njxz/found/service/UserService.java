package edu.njxz.found.service;

import edu.njxz.found.entity.User;

public interface UserService {
	/**
	 * �����û� �û�ע��
	 * @param user
	 */
    void saveUser(User user);
    
    /**
     * ɾ���û�
     * @param id
     */
    void deleteUserByUserId(int id);
    
    /**
     * �����û���Ϣ
     * @param user
     */
    void updateUser(User user);
    /**
     * �û���¼
     * @param userName
     * @param password
     * @return
     */
    User userLogin(String userName,String password);
    
    /**
     * ͨ��id��ѯ�û�
     * @param id
     */
    void userSelectById(int id);
    
}

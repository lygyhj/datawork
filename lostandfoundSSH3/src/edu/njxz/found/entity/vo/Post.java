package edu.njxz.found.entity.vo;

import java.util.Date;

import edu.njxz.found.entity.Category;
import edu.njxz.found.entity.User;

/**
 * ��ͼ����� ʧ��������Ϣ
 * @author yangxuechen
 *
 */
public class Post {
	    private Integer messageId;  //id

	    private String messageDescription;  //����
        
	    private User user;   //�����û�

	    private Category category;  //����

	    private String messageDate;   //���� yyyy-MM-dd��ʽ

	    private String messagePhoto;  //ͼƬ·��

		public Integer getMessageId() {
			return messageId;
		}

		public void setMessageId(Integer messageId) {
			this.messageId = messageId;
		}

		public String getMessageDescription() {
			return messageDescription;
		}

		public void setMessageDescription(String messageDescription) {
			this.messageDescription = messageDescription;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public Category getCategory() {
			return category;
		}

		public void setCategory(Category category) {
			this.category = category;
		}

		public String getMessageDate() {
			return messageDate;
		}

		public void setMessageDate(String messageDate) {
			this.messageDate = messageDate;
		}

		public String getMessagePhoto() {
			return messagePhoto;
		}

		public void setMessagePhoto(String messagePhoto) {
			this.messagePhoto = messagePhoto;
		}
	    
	    

}

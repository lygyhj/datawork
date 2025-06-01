package edu.njxz.found.action;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import edu.njxz.found.entity.Message;
import edu.njxz.found.entity.User;
import edu.njxz.found.entity.vo.Post;
import edu.njxz.found.service.MessageService;
import edu.njxz.found.service.UserService;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;



@Controller
@Scope("prototype")
public class UserAction extends ActionSupport {

    private Logger logger = Logger.getLogger(this.getClass());
    @Autowired
    private UserService userService;
    @Autowired
    private MessageService messageService;
    private String userName;
    private String password;

    //
    @Override
    public String execute() throws Exception {

        User user=new User();
        user.setUserName("kk");
        user.setUserPassword("123456");
        userService.saveUser(user);
        logger.info("����ɹ�");
        return SUCCESS;
    }

    /**
     * �û���¼
     * @return
     */
    public String userLogin() {
    	User user=userService.userLogin(userName, password);
    	if(null!=user) {
    		//��ȡContext����
    		ActionContext context=ActionContext.getContext();
    		context.getSession().put("user", user);
    		
    	//	List<Message> messageList=messageService.findAll();
    		List<Post> postList=messageService.findAllPost();
//    		for(Post post:postList) {
//    			System.out.println(post.getUser().getUserName());
//    		}
    		context.put("postList", postList);
    		return SUCCESS;
    	}
    	return "fail";
    }

    /**
     * �û�ע��
     * @return
     */
    public String userLogout() {
    	//��ȡContext����
		ActionContext context=ActionContext.getContext();
		context.getSession().clear();
    	return "success";
    }
    
    /**
     * �û�ע��
     * @return
     */
    public String userRegister() {
    	User user=new User();
    	user.setUserName(userName);
    	user.setUserPassword(password);
    	userService.saveUser(user);
    	return "success";
    }
    /**
     * ��ת���û���Ϣҳ
     * @return
     */
    public String toUserMsgPage() {
    	
    	return "success";
    }
    /**
     * ��ת���û���ҳ
     * @return
     */
    public String toIndexPage() {
    	//��ȡContext����
		ActionContext context=ActionContext.getContext();
		
	//	List<Message> messageList=messageService.findAll();
		List<Post> postList=messageService.findAllPost();
//		for(Post post:postList) {
//			System.out.println(post.getUser().getUserName());
//		}
		context.put("postList", postList);
    	return "success";
    }
    
    /**
     * ��ת���û�������Ϣҳ
     * @return
     */
    public String toSendPage() {
    	return "yes";
    }
    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

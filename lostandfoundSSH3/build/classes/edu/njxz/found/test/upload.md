### SSH���֮�ϴ�ͼƬ����Ŀ�ļ����²���ǰ����ʾ  
1.ǰ��jspҳ���ϴ�����   
```jsp
  <form action="sendMessage.action"  method="post" enctype="multipart/form-data">
   <label>���</label>
      <select name="category">
        <option value="1">�鼮</option>
        <option value="2">����</option>
        <option value="3">֤��</option>
        <option value="4">����</option>
      </select><br>
      <label>����</label>
      <input type="text" name="content"><br>
      <label>ͼƬ</label>
      <input type="file" name="upload"><br>
      <input type="submit" value="����">
   </form>
``` 
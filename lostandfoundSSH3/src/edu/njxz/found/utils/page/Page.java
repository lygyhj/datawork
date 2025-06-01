package edu.njxz.found.utils.page;



import java.util.List;

/**
 * ��ҳ���ܵ�ʵ��
 * @author yangxuechen
 * @Date 2018/10/30
 * @param <T>
 */
public class Page<T> {
    private List<T> list;//T���͵Ķ�������
    private int pageNum; //��ǰҳ��
    private int pageSize;//ÿҳ����
    private int pageCount;//��ҳ��

    public List<T> getList() {
        return list;
    }

    public int getPageNum() {
        return pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }
}

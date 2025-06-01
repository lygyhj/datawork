Page({
  data: {
    tabs1: [
      { text: '首页' },
      { text: '发布' },
      { text: '查询' },
      { text: '我的' }
    ],
    searchKeyword: '',
    postList: [],
    loading: false
  },

  // Tab切换（保持不变）
  handleChange(e) {
    const index = e.detail.value;
    switch (index) {
      case 0:
        wx.switchTab({ url: '/pages/lostandfound/lostandfound' });
        break;
      case 1:
        wx.switchTab({ url: '/pages/send/send' });
        break;
      case 3:
        wx.switchTab({ url: '/pages/userMsg/userMsg' });
        break;
    }
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  // 执行搜索（核心修改）
  doSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({ title: '请输入搜索内容', icon: 'none' });
      this.setData({ postList: [] });
      return;
    }

    this.setData({ loading: true });

    const db = wx.cloud.database();
    db.collection('postList')
      .where({
        content: db.RegExp({
          regexp: keyword,
          options: 'i' // 不区分大小写
        })
      })
      .orderBy('date', 'desc')
      .get()
      .then(res => {
        this.setData({
          postList: res.data,
          loading: false
        });
        
        // 预加载图片
        this.preloadImages(res.data);
      })
      .catch(err => {
        console.error('搜索失败', err);
        wx.showToast({ title: '搜索失败', icon: 'none' });
        this.setData({ loading: false });
      });
  },

  // 预加载图片
  preloadImages(posts) {
    posts.forEach(post => {
      if (post.imgsFileId) {
        wx.cloud.downloadFile({
          fileID: post.imgsFileId,
          success: res => {
            const index = this.data.postList.findIndex(p => p._id === post._id);
            if (index !== -1) {
              this.setData({
                [`postList[${index}].tempImagePath`]: res.tempFilePath
              });
            }
          }
        });
      }
    });
  },

  // 格式化时间
  formatTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    
    if (diff < minute) return '刚刚';
    if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
    if (diff < day) return `${Math.floor(diff / hour)}小时前`;
    return `${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
  },

  onLoad() {
    wx.hideTabBar();
  }
});
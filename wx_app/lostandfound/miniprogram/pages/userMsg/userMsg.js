Page({
  data: {
    tabs: [
      { text: '首页' },
      { text: '发布' },
      { text: '查询' },
      { text: '我的' }
    ],
    userInfo: {
      avatarUrl: "",
      nickName: ""
    },
    postCount: 0,
    favoriteCount: 0,
    activeIndex: 3,
    showDialog: false,
    editingName: "",
    tempAvatar: "",
    tempFilePath: "",
    isSaving: false
  },

  onLoad() {
    this.loadUserData();
  },

  loadUserData() {
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo });
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({ userInfo: res.userInfo });
        }
      });
    }

    // 获取统计数据
    wx.cloud.callFunction({
      name: 'getUserStats',
      success: res => {
        this.setData({
          postCount: res.result.postCount || 0,
          favoriteCount: res.result.favoriteCount || 0
        });
      }
    });
  },

  // 导航相关
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ activeIndex: index });
    
    const urls = [
      '/pages/lostandfound/lostandfound',
      '/pages/send/send',
      '/pages/find/find',
      '/pages/userMsg/userMsg'
    ];
    
    wx.switchTab({ url: urls[index] });
  },

  navigateToMySend() {
    wx.navigateTo({ url: '/pages/mySend/mySend' });
  },

  // 编辑资料相关
  showEditDialog() {
    this.setData({
      showDialog: true,
      editingName: this.data.userInfo.nickName,
      tempAvatar: this.data.userInfo.avatarUrl
    });
  },

  hideEditDialog() {
    this.setData({
      showDialog: false,
      tempAvatar: "",
      tempFilePath: ""
    });
  },

  onNameInput(e) {
    this.setData({ editingName: e.detail.value });
  },

  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          tempAvatar: res.tempFilePaths[0],
          tempFilePath: res.tempFilePaths[0]
        });
      }
    });
  },

  saveUserInfo() {
    if (!this.data.editingName.trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }

    this.setData({ isSaving: true });

    if (this.data.tempFilePath) {
      this.uploadAvatar().then(avatarUrl => {
        this.updateUserData(avatarUrl);
      }).catch(err => {
        console.error('上传头像失败:', err);
        wx.showToast({ title: '头像上传失败', icon: 'none' });
        this.setData({ isSaving: false });
      });
    } else {
      this.updateUserData(this.data.userInfo.avatarUrl);
    }
  },

  uploadAvatar() {
    return new Promise((resolve, reject) => {
      const filePath = this.data.tempFilePath;
      const cloudPath = 'avatars/' + Date.now() + filePath.match(/\.[^.]+?$/)[0];
      
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => resolve(res.fileID),
        fail: reject
      });
    });
  },

  updateUserData(newAvatarUrl) {
    const db = wx.cloud.database();
    const newData = {
      nickName: this.data.editingName,
      avatarUrl: newAvatarUrl,
      updateTime: db.serverDate()
    };

    const updatedUserInfo = { ...this.data.userInfo, ...newData };
    
    db.collection('users').where({ openid: getApp().globalData.openid }).update({
      data: newData,
      success: () => {
        // 更新所有数据
        getApp().globalData.userInfo = updatedUserInfo;
        wx.setStorageSync('userInfo', updatedUserInfo);
        
        this.setData({
          userInfo: updatedUserInfo,
          showDialog: false
        });
        
        wx.showToast({ title: '修改成功', icon: 'success' });
      },
      fail: err => {
        console.error('更新失败:', err);
        wx.showToast({ title: '更新失败', icon: 'none' });
      },
      complete: () => {
        this.setData({ isSaving: false });
      }
    });
  }
});
//index.js
const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },

    // 页面加载时的处理函数
    onLoad: function () {
        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }

        // 获取用户信息
        this.getUserInfo()
    },

    // 获取用户信息
    getUserInfo: function() {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: (res) => {
                            console.log(res.userInfo);
                            app.globalData.userInfo = res.userInfo;
                            console.log("全局变量userInfo :", app.globalData.userInfo);
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    // 获取用户信息的处理函数
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    },

    // 获取用户 openid 的处理函数
    onGetOpenid: function () {
        // 显示加载提示
        wx.showLoading({
            title: '正在登录...',
        })
        
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
                
                // 登录成功提示
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1500
                })
                
                // 延迟跳转，等待提示显示完成
                setTimeout(() => {
                    wx.navigateTo({
                        url: '../userConsole/userConsole',
                    })
                }, 1500)
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                
                // 显示错误提示
                wx.showToast({
                    title: '登录失败，请重试',
                    icon: 'none',
                    duration: 2000
                })
                
                // 跳转到部署云函数页面
                setTimeout(() => {
                    wx.navigateTo({
                        url: '../deployFunctions/deployFunctions',
                    })
                }, 2000)
            },
            complete: () => {
                // 隐藏加载提示
                wx.hideLoading()
            }
        })
    },

    // 上传图片的处理函数
    doUpload: function () {
        // 检查是否已登录
        if (!app.globalData.openid) {
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
            return
        }
        
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {  // 改为箭头函数，避免 this 指向问题
                wx.showLoading({
                    title: '上传中',
                })

                const filePath = res.tempFilePaths[0]

                // 上传图片
                const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: (res) => {  // 改为箭头函数
                        console.log('[上传文件] 成功：', res)
                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath
                        
                        // 上传成功提示
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 1500
                        })
                        
                        // 延迟跳转
                        setTimeout(() => {
                            wx.navigateTo({
                                url: '../storageConsole/storageConsole'
                            })
                        }, 1500)
                    },
                    fail: (e) => {  // 改为箭头函数
                        console.error('[上传文件] 失败：', e)
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败：' + e.errMsg,
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })
            },
            fail: (e) => {  // 改为箭头函数
                console.error(e)
                wx.showToast({
                    icon: 'none',
                    title: '选择图片失败',
                })
            }
        })
    }
})
// pages/article/list/list.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: null,
    _openid: null,
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onShow: function() {
    if (!this.data.isLogin) {

      wx.showLoading();
        
      let userInfo = wx.getStorageSync("userInfo") || null;

      let data = {
        isLogin: userInfo != null,
      };

      if (userInfo) {
        data.userInfo = userInfo;
      } 

      this.setData(data);

      wx.hideLoading();

    }

    this.loadData();
  },

  onLoad: function (options) {
  
  },

  /**
   * 登录
   */
  login: function(e) {
    wx.showLoading();

    wx.setStorageSync('userInfo', e.detail.userInfo);
      
    this.setData({
      userInfo: e.detail.userInfo,
      isLogin: true
    });

    wx.cloud.callFunction({
      name : "login"
    }).then(res => {
      console.log(res);
      
      wx.setStorageSync('_openid', res.result.event.userInfo.openId);
      this.setData({
        _openid: res.result.event.userInfo.openId
      });

      wx.hideLoading();

      this.loadData();
    });
    
  },

  add: function() {
    wx.navigateTo({
      url: '/pages/article/add/add'
    })
  },

  /**
   * 加载数据
   */
  loadData: function() {
    let lists = [];
    console.log(wx.getStorageSync('_openid'));
    
    db.collection("Article")
      .where({
        _openid: wx.getStorageSync('_openid')
      })
      .orderBy('time', 'desc')
      .limit(100)
      .get()
      .then(res => {
        console.log(res);
        
        this.setData({
          lists: res.data
        });
      }).catch((code, msg) => {
        console.log(code, msg);
        wx.showToast({
          title: '数据获取失败',
          icon: 'error',
        }); 
      })
  }
})
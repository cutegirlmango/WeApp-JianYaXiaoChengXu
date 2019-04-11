// pages/game/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });

    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.title)
    });
  },
})
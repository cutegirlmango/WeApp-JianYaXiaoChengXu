// pages/article/detail/detail.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading();
      
    db.collection("Article").doc(options.id).get().then(res => {
      wx.hideLoading();

      this.setData({
        item: res.data
      });
    }).catch((code, msg) => {
      console.log(code, msg);
      
      wx.hideLoading();
      wx.showToast({
        title: '获取失败',
        icon: 'error',
      });
    });
  },

  /**
   * 删除
   */
  del: function() {
    let _id = this.data.item._id;

    wx.showLoading();
    db.collection("Article").doc(_id).remove().then(res => {
      wx.hideLoading();

      wx.navigateBack({
        delta: 1
      });
        
    }).catch((code, msg) => {
      console.log(code, msg);
      
      wx.hideLoading();
      wx.showToast({
        title: '删除失败',
        icon: 'error',
      });
        
    })
  }
})
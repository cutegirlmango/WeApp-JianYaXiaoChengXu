// pages/game/list/list.js
//  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    page: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  loadData: function() {
    let that = this;
    
    wx.showLoading();
    wx.request({
      url: 'http://h.4399.com/data/iphone_c12_' + Math.min(this.data.page, 15) + '.js?t=1554868735',
      header: {
        'Content-Type': 'application/json',
      },
      success: function(res) {

        wx.hideLoading();

        res = res.data;
        that.setData({
          page: that.data.page + 1,
          lists: that.data.lists.concat(res.data)
        });
      },
      failure: function(err) {
        console.log(err);
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData();
  }
})
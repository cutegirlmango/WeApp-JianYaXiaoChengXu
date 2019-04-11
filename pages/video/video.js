// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPlayIndex: 0,
    lists: [],
    maxtime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  StartPlay: function(e) {
    let index = e.currentTarget.dataset.id;

    this.videoContext = wx.createVideoContext('video' + this.data.currentPlayIndex);
    this.videoContext.pause();
    this.setData({
      currentPlayIndex: index
    });

  },

  loadData: function() {
    let that = this;
    
    wx.showLoading();
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php?a=list&c=data&type=41&maxtime=' + that.data.maxtime,
      header: {
        'Content-Type': 'application/json',
      },
      success: function(res) {

        wx.hideLoading();

        res = res.data;
        that.setData({
          maxtime: res.info.maxtime,
          lists: that.data.lists.concat(res.list)
        });
      },
      failure: function(err) {
        console.log(err);
        
      }
    });
  },

  /**
   * 上滑加载等多
   */
  onReachBottom: function () {
    this.loadData();
  },
})
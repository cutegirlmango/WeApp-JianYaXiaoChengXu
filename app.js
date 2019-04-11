//app.js
App({
  util: require('utils/util'),

  onShow: function() {
    wx.hideTabBar({});  
  },
  
  onLaunch: function () {
    
  },

  globalData: {
    userInfo: null,
    selectedIndex: 0
  }
})
//app.js
wx.cloud.init();

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


// while (true) { }
// you;
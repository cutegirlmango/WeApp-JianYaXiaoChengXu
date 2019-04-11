// tabbar.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        "pagePath": "/pages/video/video",
        "text": "视频",
        "icon": "/images/video.png",
        "selectedIcon": "/images/video_s.png"
      },
      {
        "pagePath": "/pages/funny/funny",
        "text": "段子",
        "icon": "/images/funny.png",
        "selectedIcon": "/images/funny_s.png"
      },
      {
        "pagePath": "/pages/music/music",
        "text": "音乐",
        "icon": "/images/music.png",
        "selectedIcon": "/images/music_s.png"
      },
      {
        "pagePath": "/pages/game/list/list",
        "text": "游戏",
        "icon": "/images/game.png",
        "selectedIcon": "/images/game_s.png"
      },
      {
        "pagePath": "/pages/article/list/list",
        "text": "日记",
        "icon": "/images/article.png",
        "selectedIcon": "/images/article_s.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select: function(e) {
      let index = e.currentTarget.dataset.index;
      if (this.data.selectedIndex == index) {
        return ;
      }

      this.properties.sIndex
      wx.switchTab({
        url: this.data.list[index].pagePath
      });
    }
  }
})

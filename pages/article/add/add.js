// pages/article/add/add.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件数组
    assemblies: [],
    // 当前页面最高层级
    max_z_index: 10,
    // 控制组件选中状态
    selected: false,
    hidden: true,
    border: '',

    // 是否正在编辑文本
    addingText: false,

    // 当前页面最高层级
    max_z_index: 1,

    // 底部扩展区域
    plus: null,  

    // 背景图区域
    bg: [
      "/images/bg/bg1.jpeg",
      "/images/bg/bg2.jpeg",
      "/images/bg/bg3.jpeg",
      "/images/bg/bg4.jpeg",
      "/images/bg/bg5.jpeg",
      "/images/bg/bg6.jpeg",
    ],
    selectedBgIndex: 0,

    stickers: [
      "/images/sticker/beijixing.png",
      "/images/sticker/leisheyan.png",
      "/images/sticker/xiezi.png",
      "/images/sticker/dianwang.png",
      "/images/sticker/lierenkelaiwen.png",
      "/images/sticker/xiniuren.png",
      "/images/sticker/duye.png",
      "/images/sticker/lvmo.png",
      "/images/sticker/xinxing.png",
      "/images/sticker/egui.png",
      "/images/sticker/shenlixia.png",
      "/images/sticker/xixieguimobiyasi.png",
      "/images/sticker/jinganglang.png",
      "/images/sticker/sishi.png",
      "/images/sticker/zhangyuboshi.png",
      "/images/sticker/jingsong.png",
      "/images/sticker/tiequan.png",
      "/images/sticker/zhizhuxia.png",
      "/images/sticker/kuaiyin.png",
      "/images/sticker/wanciwang.png",
    ],
    ipX: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.util.formatTime(new Date()).split(" ")[0]
    });

    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        var model = res.model
        let ipX = false;
        if (model.search('iPhone X') != -1){
          ipX = true;
        }else{
          ipX = false;
        }

        that.setData({
          ipX: ipX
        });
      }
     })
  },
  
  /**
   * 取消输入
   */
  onInputCancel: function() {
    // 隐藏弹框
    this.setData({
      addingText: false
    });
  },

  onInputConfirm: function(e) {
    // 隐藏弹框
    this.setData({
      addingText: false
    })

    if (e.detail) {
      // 新文字组件入栈
      let assemblies = this.data.assemblies;
      assemblies.push({
        id: Math.random().toString(36).substr(2, 4), // 随机生成4位id
        component_type: 'text',
        text: e.detail,
        stickerCenterX: 375,
        stickerCenterY: 300,
        scale: 1,
        rotate: 0,
        z_index: this.data.max_z_index + 1 // 默认置于最顶层
      })

      // 刷新界面
      this.setData({
        assemblies: assemblies
      })
    }
  },

  // 刷新组件数据
  onRefreshData: function(e) {
    for (var i in this.data.assemblies) {
      if (this.data.assemblies[i].id === e.target.id) {
        this.data.assemblies[i].stickerCenterX = e.detail.stickerCenterX
        this.data.assemblies[i].stickerCenterY = e.detail.stickerCenterY
        this.data.assemblies[i].scale = e.detail.scale
        this.data.assemblies[i].rotate = e.detail.rotate
        this.data.assemblies[i].z_index = e.detail.z_index
      }
    }
    this.setData({
      assemblies: this.data.assemblies
    })
  },

  // 取消所有组件的选中状态并关闭 RichTabBar
  onRefreshView: function(callback) {
    var that = this
    
    this.setData({
      selected: false,
      hidden: true,
      border: ''
    })

    if (typeof callback === 'function') {
      callback()
    }
  },

  // 移除组件
  onRemoveComponent: function(e) {
    // 移除组件列表中的相关项
    for (var i in this.data.assemblies) {
      if (this.data.assemblies[i].id === e.target.id) {
        this.data.assemblies.splice(i, 1);
        break
      }
    }

    // 刷新组件数据
    this.setData({
      assemblies: this.data.assemblies
    })
  },

  // 更新当前页面最高层级
  onUpdateMax_z_index: function() {
    this.setData({
      max_z_index: this.data.max_z_index += 1
    })
  },

  // 选择背景
  onBackgroundTap: function(e) {
    if (e.target.id) {
      this.onRefreshView()
      this.setData({
        selectedBgIndex: e.target.id
      })
    }
  },

  // 背景或者贴纸
  clickToolItem: function(e) {
    let type = e.currentTarget.dataset.type;
    if (type == this.data.plus) {
      this.setData({
        plus: null
      });
    } else {
      this.setData({
        plus: type
      });
    }
  },

  // 添加新贴纸
  onStickerTap: function(e) {
    if (e.target.id) {
      this.onRefreshView()

     // 新贴纸信息入栈
     this.data.assemblies.push({
      id: Math.random().toString(36).substr(2, 4), // 随机生成4位id
      component_type: 'sticker',
      sticker_type: "",
      sticker_id: e.target.id,
      image_url: this.data.stickers[e.target.id],
      stickerCenterX: 375,
      stickerCenterY: 300,
      scale: 1,
      rotate: 0,
      z_index: this.data.max_z_index + 1 // 默认置于最顶层
    })

    // 刷新界面
    this.setData({
      assemblies: this.data.assemblies
    })

    this.onUpdateMax_z_index()
    }
  },

  addText: function() {
    this.setData({
      plus: null,
      addingText: true
    });
  }
})
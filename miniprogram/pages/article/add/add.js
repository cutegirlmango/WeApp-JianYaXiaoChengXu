// pages/article/add/add.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    ipX: false,
    item: null,
    image: null
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

    let id = options.id || null;

    if (id) {
      wx.showLoading();
        
      db.collection("Article").doc(id).get().then(res => {
        wx.hideLoading();
        this.setData({
          item: res.data,
          content: res.data.content,
          image: res.data.image
        });
    
      }).catch((code, msg) => {
        console.log(code, msg);
        
        wx.hideLoading();
        wx.showToast({
          title: '获取日记失败',
          icon: 'error'
        });
          
      });
    }
  },

  /**
   * 输入内容
   */
  input: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  /**
   * 发布
   */
  confirm: function() {
    console.log("发布成功");
    
    wx.showLoading();

    let success = () => {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
      });

      wx.switchTab({
        url: '/pages/article/list/list'
      });
        
    }

    let error = (code, msg) => {
      console.log(code, msg);
      
      wx.hideLoading();
      wx.showToast({
        title: '发布失败',
        icon: 'error',
      });
    }

    
    let publish = (image) => {
      let item = this.data.item || null;
      if (item) {
        // 更新
        db.collection("Article").doc(item._id).update({
          data: {
            content: this.data.content,
            image: image
          }
        }).then(_ => {
          success();
        }).catch((code, msg) => {
          error(code, msg);
        });
      } else {
        // 添加
        db.collection("Article").add({
          data: {
            content: this.data.content,
            time: new Date(),
            image: image
          }
        }).then(_ => {
          success();
        }).catch((code, msg) => {
            error(code, msg);
        });
      }
    };

    let filePath = this.data.image;
    if (filePath) {
      let name = Math.random() * 1000000;
      let cloudPath = name + filePath.match(/\.[^.]+?$/)[0];

      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath,
      }).then(res => {
        publish(res.fileID);
      }).catch(err => {
        this.toast.showFailure("图片上传失败");
      });
    } else {
      publish(null);
    }
  },

  /**
   * 上传图片
   */
  select: function() {
    let that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        that.setData({
          image: result.tempFilePaths[0]
        });
      }
    });
      
  }
  
})
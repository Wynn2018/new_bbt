wx.cloud.init()
const db = wx.cloud.database()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    item_url: [],
    img: [],
    scrollTop: 0,
    content: undefined,
    myCollection: [],
    goods_info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("个人收藏页面检测收藏信息", app.globalData.myGoods_info)
    this.setData({
      goods_info: app.globalData.myGoods_info
    })
    /** 
    var that = this
    var temp = []
    var path = []
    db.collection('Collection').where({ _id: 'c0a3987b5ce7df7604a4e8e13b7d6951' }).get({
      success(res) {
        //获取用户收藏的物品的id
        that.setData({
          myCollection:res.data[0].myCollection
        })
        var collection=that.data.myCollection
        var info=[]  //用户收藏的物品的信息
        //把收藏的信息拖下来
        collection.forEach((item, i) => {
          db.collection('goods').where({ _id: collection[i] }).get({
            success(res) {
              that.data.collection_info.push(res.data[0])
              console.log(that.data.collection_info, "???????")
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '获取失败'
              })
              console.error('[数据库] [获取] 失败：', err)
            }
          })
        })
        

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  // changeToBook: function(){
  //   var that = this
  //   db.collection('goods').get({
  //     success(res){
  //       that.setData({
  //         item_url: res.data
  //       })
  //     }
  //   })
  // this.setData({
  //   item_url: item_url_book
  // })
  // },

  content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  download: function () {
    var that = this
    var temp = []
    db.collection('goods').where({
      name: db.RegExp({
        regexp: that.data.content
      })
    }).get({
      success(res) {
        // res.data 包含该记录的数据+
        that.setData({
          item_url: res.data
        })
        temp = that.data.item_url
        console.log(temp)
        var path = []
        temp.forEach((item, i) => {
          wx.cloud.downloadFile({
            fileID: temp[i].cloudID[0], // 文件 ID
            success: res => {
              // 返回临时文件路径
              path.push(res.tempFilePath)
              that.setData({
                img: path
              })
              console.log(this.data.img)
            },
            fail: console.error()
          })
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
  },
  /**
   * 用户点击Button,字体变色.
   */

  changeToBook: function () {
    var that = this
    var temp = []
    db.collection('goods').where({
      tag: '书籍'
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        that.setData({
          item_url: res.data
        })
        temp = that.data.item_url
        console.log(temp)
        var path = []
        temp.forEach((item, i) => {
          wx.cloud.downloadFile({
            fileID: temp[i].cloudID[0], // 文件 ID
            success: res => {
              // 返回临时文件路径
              path.push(res.tempFilePath)
              that.setData({
                img: path
              })
              console.log(this.data.img)
            },
            fail: console.error()
          })
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
  },

  changeToDaily: function () {
    var that = this
    var temp = []
    db.collection('goods').where({
      tag: '生活用品'
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        that.setData({
          item_url: res.data
        })
        temp = that.data.item_url
        console.log(temp)
        var path = []
        temp.forEach((item, i) => {
          wx.cloud.downloadFile({
            fileID: temp[i].cloudID[0], // 文件 ID
            success: res => {
              // 返回临时文件路径
              path.push(res.tempFilePath)
              that.setData({
                img: path
              })
              console.log(this.data.img)
            },
            fail: console.error()
          })
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
  },

  changeToCosmetics: function () {
    var that = this
    var temp = []
    db.collection('goods').where({
      tag: '化妆品'
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        that.setData({
          item_url: res.data
        })
        temp = that.data.item_url
        console.log(temp)
        var path = []
        temp.forEach((item, i) => {
          wx.cloud.downloadFile({
            fileID: temp[i].cloudID[0], // 文件 ID
            success: res => {
              // 返回临时文件路径
              path.push(res.tempFilePath)
              that.setData({
                img: path
              })
              console.log(this.data.img)
            },
            fail: console.error()
          })
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
  },

  changeToBook2: function () {
    var that = this
    var temp = []
    db.collection('goods').where({
      tag: '体育用品'
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        that.setData({
          item_url: res.data
        })
        temp = that.data.item_url
        console.log(temp)
        var path = []
        temp.forEach((item, i) => {
          wx.cloud.downloadFile({
            fileID: temp[i].cloudID[0], // 文件 ID
            success: res => {
              // 返回临时文件路径
              path.push(res.tempFilePath)
              that.setData({
                img: path
              })
              console.log(this.data.img)
            },
            fail: console.error()
          })
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
  },

  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  goTo: function (e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../description/des?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
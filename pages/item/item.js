wx.cloud.init()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_url: [],
    img: [],
    scrollTop: 0,
    content: undefined,
    page: 0,//这个是看现在是第几页，好算加载数据库的第几项内容
    one_page: 3//一次加载三条出来
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var temp = []
    var path = []
    db.collection('goods').skip(this.data.page * this.data.one_page).limit(this.data.one_page).get({
      success(res) {
        // res.data 包含该记录的数据
        temp = res.data
        var path = []
        temp.forEach((item, i) => {
          wx.cloud.downloadFile({
            fileID: temp[i].cloudID[0], // 文件 ID
            success: res => {
              // 返回临时文件路径
              path.push(res.tempFilePath)//+
              that.setData({
                img: path
              })
            },
            fail: console.error()
          })
        })
        that.setData({
          item_url: res.data
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
    var a=that.data.page
    that.setData({
      page:a+1
    })
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

  load_more: function () {
    var that = this
    const db = wx.cloud.database()
    var a = db.collection('goods').skip(this.data.page*this.data.one_page).limit(this.data.one_page).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log("???????", res.data)
        var temp = res.data
        var path = that.data.img
        temp.forEach((item, i) => {
          console.log("jinlailema")
          wx.cloud.downloadFile({
            fileID: temp[i].cloudID[0], // 文件 ID
            success: res => {
              // 返回临时文件路径
              path.push(res.tempFilePath)//+
              that.setData({
                img: path
              })
            },
            fail: console.error()
          })
        })
        var aa=that.data.item_url;
        res.data.forEach((item,i)=>{
          aa.push(res.data[i])
        })
        that.setData({
          item_url: aa
        })
        console.log(that.data.item_url, "zhelishiquanbu")
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
    var c = this.data.page
    this.setData({
      page: c + 1
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
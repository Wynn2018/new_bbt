// pages/personal/personal.js
var app = getApp()
Page({
  data: {
    deal:12,
    collection_number:0,
    myGoods_number:0
  },
  onLoad:function(){

    this.setData({
      collection_number:app.globalData.myCollection.length,
      myGoods_number: app.globalData.myGoods_number.length
    })
    console.log('???')
    //根据收藏商品序号下载相应信息
    wx.cloud.init()
    const db = wx.cloud.database()
    app.globalData.myCollection.forEach((item, i) => {
      db.collection('goods').where({ _id: app.globalData.myCollection[i] }).get({
        success(res) {
          app.globalData.collection_info.push(res.data[0])
          console.log("个人收藏商品信息", app.globalData.collection_info)
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
    app.globalData.myGoods_number.forEach((item, i) => {
      db.collection('goods').where({ _id: app.globalData.myGoods_number[i] }).get({
        success(res) {
          app.globalData.myGoods_info.push(res.data[0])
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

  gotoGoods:function(){
    wx.showToast({
      title: '??'
    })
  },

  to_collection:function(){
    wx.navigateTo({
      url: '../myCollection/myCollection'
    })
  },

  to_myGoods: function () {
    wx.navigateTo({
      url: '../myGoods/myGoods'
    })
  }
})
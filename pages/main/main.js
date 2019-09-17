//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../images/lingdang.png',
      '../../images/lingdang2.png'
    ],
    interval: 3000,
    duration: 1200,
    btText: {},
    btText1: ['查询讲座', '查询活动'],
    btText2: ['买卖教材', '雇人跑腿'],


  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  toItem: function(e) {
    var id = e.target.id;
    switch (id) {
      case "买卖教材":
        wx.navigateTo({
          url: '../item/item',
        })
        break;
      case "雇人跑腿":
        wx.navigateTo({
          url: '../run_item/run_item',
        })
        break;
      default:
        wx.showToast({
          title: '暂未开放此功能',
        })
        break;
    }
  },

  onLoad: function() {
    var bt = new Array(this.data.btText1, this.data.btText2)
    this.setData({
      btText: bt
    })
    //下面是获取用户收藏信息
    var that = this
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('Collection').where({
      _id: 'c0a3987b5ce7df7604a4e8e13b7d6951'
    }).get({
      success(res) {
        //获取用户收藏的物品的id
        console.log(res.data )
        app.globalData.myCollection = res.data[0].myCollection
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
    db.collection('goods').where({
      _openid: 'oXR3I5fXblGdZNESnv245pd6nXVg'
    }).get({
      success(res) {
        console.log(res)
        //获取用户发布的物品的id
        res.data.forEach((item, i) => {
          app.globalData.myGoods_number.push(item._id)
        })
        console.log('???', app.globalData.myGoods_number)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
    
  }
})
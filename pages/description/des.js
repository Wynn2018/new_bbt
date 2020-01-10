wx.cloud.init()
const db = wx.cloud.database()
var app = getApp()
Page({
  data: {
    price: undefined,
    description: undefined,
    name: undefined,
    time: undefined,
    tel: undefined,
    wechat: undefined,
    tag: [],
    img: [],
    id: '',
    collectionchange: false   //用来判断是否已经收藏的变量
  },

  onLoad: function (option) {
    var that = this;
    app.globalData.myCollection.forEach((item, i) => {
      if (app.globalData.myCollection[i] == option.id) {
        that.setData({
          collectionchange: true
        })
        console.log("what??")
      }
    })
    db.collection('goods').where({ _id: option.id }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          id: option.id,
          price: res.data[0].price,
          description: res.data[0].description,
          name: res.data[0].name,
          time: res.data[0].time,
          tag: res.data[0].tag,
          tel: res.data[0].tel,
          wechat: res.data[0].wechat,
          img: res.data[0].cloudID,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    const _ = db.command;
    db.collection('goods').doc(option.id).update({
      // data 传入需要局部更新的数据
      data: {
        view_time: _.inc(1)
      },
      success(res) {
        console.log(res.data)
      },
      fail: err => {
        console.error('自增失败：', err)
      }
    })


  },

  get: function () {
    var that = this
    db.collection('goods').where({ _id: that.data.id }).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        that.setData({
          img: res.data.cloudID,
          price: res.data.price,
          name: res.data.name,
          description: res.data.description
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  showimg: function () {
    console.log(this.data.img)
  },

  collect: function () {
    console.log("///////////////////////////////////")
    var that = this
    app.globalData.myCollection
    wx.cloud.init()
    const db = wx.cloud.database()
    var myCollection1 = []  //用户的所有收藏
    //先把用户所有收藏拖下来
    db.collection('Collection').where({ _openid: 'oXR3I5fXblGdZNESnv245pd6nXVg' }).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res)
        myCollection1 = res.data[0].myCollection
          myCollection1.push(that.data.id)
          console.log('加入后的收藏',myCollection1)
          app.globalData.myCollection = myCollection1
          //更新用户收藏
        db.collection('Collection').doc('c0a3987b5ce7df7604a4e8e13b7d6951').update({
            data: {
              myCollection: myCollection1
            },
            success(res) {
              console.log(res)
              that.setData({
                collectionchange: true
              })
              wx.showToast({
                title: '收藏成功'
              })
            },
            fail: err => {
              console.error('自增失败：', err)
            }
          })
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '失败'
        })
      }
    })

  },
  de_collect: function () {
    var that=this
    app.globalData.myCollection.forEach((item, i) => {
      if (app.globalData.myCollection[i] == this.data.id) {
        app.globalData.myCollection.splice(i, 1)
      }
    })
    console.log(app.globalData.myCollection)
    wx.cloud.init()
    const db = wx.cloud.database();
    db.collection('Collection').doc('c0a3987b5ce7df7604a4e8e13b7d6951').update({
      data: {
        myCollection: app.globalData.myCollection
      },
      success(res) {
        wx.showToast({
          title: '取消收藏成功'
        })
      },
      fail: err => {
        console.error('自增失败：', err)
      }
    })
    this.setData({
      collectionchange: false
    })
  },
  //图片点击放大
  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.img;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  /**
  * 用户点击Button,字体变色.
  */})


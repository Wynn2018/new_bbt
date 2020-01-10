// pages/conference/conference.js
wx.cloud.init()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    all:[]
  },

  get_input:function(e){
    this.setData({
      name:e.detail.value
    })
    console.log(this.data.name)
  },

  search:function(){
    var that = this
    db.collection('daily_info').where({
      name:that.data.name
    }).get({
      success(res) {
        console.log(res)
        that.setData({
          all:res.data
        })
        console.log(all)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
        console.error('[数据库] [获取] 失败：', err)
      }
    })
    // db.collection('daily_info').add({
    //   data: {
    //     name:'报道须知',
    //     info:'时间、地点、路线（到学校&到报到地点）、须备证件、报道流程（见学生手册）'
    //   },
    //   success: res => {
    //     // 在返回结果中会包含新创建的记录的 _id
    //     wx.showToast({
    //       title: '创建成功',
    //     })
    //     console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '创建失败'
    //     })
    //     console.error('[数据库] [新增记录] 失败：', err)
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
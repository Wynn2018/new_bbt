Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: "",
    end: "",
    ddl: "",
    phone: "",
    pay: "",
    intro: "",
    show: false,
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  addHelp: function() {
    this.setData({
      isShow: true
    })
  },

  togglePopup() {
    this.setData({
      isShow: !this.data.isShow
    });
  },

  // introChange: function(e) {
  //   this.setData({
  //     intro: e.detail.value
  //   })
  // },

  createSubmit: function(e) {
    console.log(e)
    var values = e.detail.value
    if (!isempty(values)) {
      wx.cloud.init()
      const db = wx.cloud.database()
      var that = this;
      db.collection('help').add({
        data: {
          start: values["start"],
          end: values["end"],
          ddl: values["ddl"],
          phone: values["phone"],
          pay: values["pay"],
          intro: this.data.intro
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '创建成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          location.reload();
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '创建失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
      this.setData({
        start: "",
        end: "",
        ddl: "",
        phone: "",
        pay: "",
        intro: "",
        isShow: false
      })
    }else{
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
  }
})

function isempty(values) {
  console.log(values)
  var len_start = values['start'].length
  var len_end = values['end'].length
  var len_ddl = values['ddl'].length
  var len_phone = values['phone'].length
  var len_pay = values['pay'].length
  var len_intro = values['intro'].length
  if (len_start * len_end * len_ddl * len_phone * len_pay * len_intro == 0) {
    return true
  }
  return false
}
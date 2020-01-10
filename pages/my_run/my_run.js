// pages/run_item/run_item.js
wx.cloud.init()
var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:[],
    destination:[],
    dormitry: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', ],
    teach_building:['A1','A2','A3','A4','A5'],
    experiment: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13'],
    other: ['世博', '一饭', '二饭', '天桥'],
    from_hidden:true,
    to_hidden:true,
    item_:[],
    ddl: "",
    phone: "",
    pay: "",
    intro: "",
    show: false,
    isShow: false,
    index_start: 0,
    input_start: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', '世博', '一饭', '二饭', '天桥'],
    index_end: 0, 
    input_end: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', '世博', '一饭', '二饭', '天桥'],
  },
  
  onLoad: function () {
    console.log('???')
    var that = this
    var temp = []
    var path = []
    that.setData({
      item_: app.globalData.myHelp_info
    })
  },

  from_:function(){
    var aa=this.data.from_hidden
    console.log(aa)
    this.setData({
      from_hidden:!aa
    })
  },

  search:function(){
    var that=this
    console.log(that.data.destination)
    console.log(that.data.start)
    db.collection('help').where({
      start:that.data.start[0],
      end:that.data.destination[0]
    }).get({
      success(res) {
        that.setData({
          item_: res.data
        })
        console.log(res)
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

  to_: function () {
    var aa = this.data.to_hidden
    console.log(aa)
    this.setData({
      to_hidden: !aa
    })
  },
  c_add_to_start:function(e){
    var a=[]
    var b = this.data.dormitry[e.currentTarget.id]
    a.push(b)
    this.setData({
      start:a
    })
    var aa = this.data.from_hidden
    console.log(aa)
    this.setData({
      from_hidden: !aa
    })
  },
  a_add_to_start: function (e) {
    var a = []
    var b = this.data.teach_building[e.currentTarget.id]
    a.push(b)
    this.setData({
      start: a
    })
    var aa = this.data.from_hidden
    console.log(aa)
    this.setData({
      from_hidden: !aa
    })
  },
  b_add_to_start: function (e) {
    var a = []
    var b = this.data.experiment[e.currentTarget.id]
    a.push(b)
    this.setData({
      start: a
    })
    var aa = this.data.from_hidden
    console.log(aa)
    this.setData({
      from_hidden: !aa
    })
  },
  o_add_to_start: function (e) {
    var a = []
    var b = this.data.other[e.currentTarget.id]
    a.push(b)
    this.setData({
      start: a
    })
    var aa = this.data.from_hidden
    console.log(aa)
    this.setData({
      from_hidden: !aa
    })
  },

  c_add_to_destination: function (e) {
    
    var a = []
    var b = this.data.dormitry[e.currentTarget.id]
    console.log(b)
    a.push(b)
    this.setData({
      destination: a
    })
    var aa = this.data.to_hidden
    console.log(aa)
    this.setData({
      to_hidden: !aa
    })
  },
  a_add_to_destination: function (e) {
    var a = []
    var b = this.data.teach_building[e.currentTarget.id]
    a.push(b)
    this.setData({
      destination: a
    })
    var aa = this.data.to_hidden
    console.log(aa)
    this.setData({
      to_hidden: !aa
    })
  },
  b_add_to_destination: function (e) {
    var a = []
    var b = this.data.experiment[e.currentTarget.id]
    a.push(b)
    this.setData({
      destination: a
    })
    var aa = this.data.to_hidden
    console.log(aa)
    this.setData({
      to_hidden: !aa
    })
  },
  o_add_to_destination: function (e) {
    var a = []
    var b = this.data.other[e.currentTarget.id]
    a.push(b)
    this.setData({
      destination: a
    })
    var aa = this.data.to_hidden
    console.log(aa)
    this.setData({
      to_hidden: !aa
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

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

  bindStartChange: function (e) {
    this.setData({
      index_start: e.detail.value
    })
  },

  bindEndChange: function (e) {
    this.setData({
      index_end: e.detail.value
    })
  },

  addHelp: function () {
    this.setData({
      isShow: true
    })
  },

  togglePopup() {
    this.setData({
      isShow: !this.data.isShow
    });
  },

  createSubmit: function (e) {
    console.log(e)
    var values = e.detail.value
    var that=this
    if (!isempty(values)) {
      wx.cloud.init()
      const db = wx.cloud.database()
      var that = this;
      var start = that.data.input_start[values['input_start']]
      var end = that.data.input_end[values['input_end']]
      db.collection('help').add({
        data: {
          start: start,
          end: end,
          ddl: values["ddl"],
          phone: values["phone"],
          pay: values["pay"],
          intro: values["intro"]
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
    } else {
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
  var len_ddl = values['ddl'].length
  var len_phone = values['phone'].length
  var len_pay = values['pay'].length
  var len_intro = values['intro'].length
  if (len_ddl * len_phone * len_pay * len_intro == 0) {
    return true
  }
  return false
}
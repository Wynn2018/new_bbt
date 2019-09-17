// pages/run_item/run_item.js
wx.cloud.init()
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
    item_:[]
  },
  
  onLoad: function () {
    console.log('???')
    var that = this
    var temp = []
    var path = []
    db.collection('help').get({
      success(res) {
        that.setData({
          item_:res.data
        })
        console.log(res.data)
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

  }
})
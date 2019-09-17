Page({
  data: {
  },
  onLoad: function () {
  },
  /**
  * 用户点击Button,字体变色.
  */


  /*下面是五个按钮的点击变色*/
  changeColor1: function () {

    var bgColor1 = this.data.pageBackgroundColor1 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
    this.setData({
      pageBackgroundColor1: bgColor1
    })
  },
  changeColor2: function () {

    var bgColor2 = this.data.pageBackgroundColor2 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
    this.setData({
      pageBackgroundColor2: bgColor2
    })
  },
  changeColor3: function () {

    var bgColor3 = this.data.pageBackgroundColor3 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
    this.setData({
      pageBackgroundColor3: bgColor3
    })
  },
  changeColor4: function () {

    var bgColor4 = this.data.pageBackgroundColor4 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
    this.setData({
      pageBackgroundColor4: bgColor4
    })
  },
  changeColor5: function () {

    var bgColor5 = this.data.pageBackgroundColor5 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
    this.setData({
      pageBackgroundColor5: bgColor5
    })
  },



})
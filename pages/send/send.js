  Page({
    data: {
      image: "../../images/add.png",
      item_image: [],
      tag: [],
      number: 0,
      cloudID: [],
      cloudname: [],
      time: '',
      test: []

    },
    onLoad: function() {},

    deleteLast: function(e) {
      var id = parseInt(e.target.id);
      for (var i = id; i < this.data.number - 1; i++) {
        this.data.item_image[i] = this.data.item_image[i + 1];
      }
      this.data.item_image.pop();
      this.setData({
        item_image: this.data.item_image,
        number: this.data.number - 1,
      })
      console.log(this.data.cloudID)
      var a = this.data.cloudID[id]
      console.log(a)
      wx.cloud.deleteFile({
        fileList: [a],
        success: res => {
          // handle success
          console.log(res.fileList)
        },
        fail: console.error
      })
      for (var i = id; i < this.data.number - 1; i++) {
        this.data.cloudID[i] = this.data.cloudID[i + 1];
      }
      this.data.cloudID.pop();
      // for (var i = id; i < this.data.number - 1; i++) {
      //   this.data.cloudname[i] = this.data.cloudname[i + 1];
      // }
      // this.data.cloudname.pop();
      this.setData({
        //cloudname: this.data.cloudname,
        cloudID: this.data.cloudID
      })
    },

    uploader: function() {
      var that = this;
      let imagesList = [];
      let maxSize = 1024 * 1024;
      let maxLength = 6;
      let flag = true;
      wx.chooseImage({
        count: 6, //最多可以选择的图片总数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

        success: function(res) {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 500
          })

          for (let i = 0; i < res.tempFiles.length; i++) {
            if (res.tempFiles[i].size > maxSize) {
              flag = false;
              console.log(111)
              wx.showModal({
                content: '图片太大，不允许上传',
                showCancel: false,

                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              });
            }
          }

          if (flag == true && res.tempFiles.length <= maxLength) {
            var temp_item_image = that.data.item_image;
            if (that.data.number > 0) {
              var max = undefined;
              if (res.tempFilePaths.length < 6 - that.data.number)
                max = res.tempFilePaths.length
              else
                max = 6 - that.data.number
              for (var i = 0; i < max; i++)
                temp_item_image.push(res.tempFilePaths[i]);
              that.setData({
                item_image: temp_item_image,
                number: res.tempFilePaths.length
              })
            } else {
              var a = []
              that.setData({
                item_image: res.tempFilePaths,
                number: res.tempFilePaths.length,
              })
            }
            that.returnimgID()
            //开始把图片转为二进制码     (这个方案被否了)     
            /*const temp = that.data.item_image

                base64:a
              })
            }
            console.log("zheli")
            console.log(that.data.item_image)

            //开始把图片转为二进制码
            const temp = that.data.item_image
            var b=[]
            temp.forEach((item, i) => {
              wx.getFileSystemManager().readFile({
                filePath: temp[i], //选择图片返回的相对路径 
                encoding: 'base64', //编码格式
                success: res => { //成功的回调 
                  var a = ("data:image/png;base64," + res.data)
                  b.push(a)
                  that.setData({
                    base64: b
                  })
                  console.log("查看图片是否转为base64")
                  console.log(that.data.base64)
                }
              })


            })*/
          }
          console.log(res);
        },

        fail: function(res) {

        }

      })

    },

    res: function(e) {
      var that = this
      //.........................................................
      that.to_Database(e)
    },

    to_Database: function(e) {
      wx.cloud.init()
      const db = wx.cloud.database()
      var that = this;
      console.log(that.data.cloudID)

      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      //获取年份  
      var Y = date.getFullYear();
      //获取月份  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //获取当日日期 
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var time_ = Y + '-' + M + '-' + D
      that.setData({
        time: time_
      })
      console.log("开始到数据库")
      console.log(that.data.cloudID)
      db.collection('goods').add({
        data: {
          name: e.detail.value.name,
          description: e.detail.value.description,
          wechat: e.detail.value.wechat,
          tel: e.detail.value.tel_number,
          price: e.detail.value.price,
          tag: that.data.tag,
          cloudID: that.data.cloudID,
          //cloudname: that.data.cloudname,
          time: that.data.time,
          view_time: 1
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            username: e.detail.value.username
          })
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          location.reload();
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


    returnimgID: function() {
      wx.cloud.init()
      var that = this
      //以下开始上传图片到云，并且返回云地址
      const temp = this.data.item_image,
        cloud = []; //temp是当前选择的照片，cloud是到时候照片在云上的文件名，不是文件id
      var id = []
      temp.forEach((item, i) => {
        var length = temp[i].length
        cloud.push(temp[i].substring(length - 15))
      })
      console.log(cloud)
      //逐一上传，返回cloudID到数组
      temp.forEach((item, i) => {
        wx.cloud.uploadFile({
          cloudPath: cloud[i],
          filePath: temp[i],
          success: res => {
            console.log('[上传文件] 成功：', temp[i], res.fileID)
            id.push(res.fileID)
            that.setData({
              cloudID: id
            })
            console.log(id)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      })
      console.log("结束上传...")
    },


    /*下面是五个按钮的点击变色*/
    changeColor1: function(e) {
      var that = this;
      var tag_temp = that.data.tag;
      var length = tag_temp.length;
      var check = function(val) {
        return val == '书籍';
      }
      var bgColor1 = this.data.pageBackgroundColor1 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
      if (bgColor1 == 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('书籍') == -1)
          tag_temp.push('书籍');
      if (bgColor1 != 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('书籍') != -1) {
          var index = tag_temp.findIndex(check)
          if (index == (length - 1))
            tag_temp.pop()
          else {
            var temp = tag_temp[length - 1];
            tag_temp[length - 1] = tag_temp[index];
            tag_temp[index] = temp;
            tag_temp.pop();
          }
        }
      this.setData({
        tag: tag_temp,
        pageBackgroundColor1: bgColor1
      })
    },

    changeColor2: function(e) {
      var that = this;
      var tag_temp = that.data.tag;
      var length = tag_temp.length;
      var check = function(val) {
        return val == '化妆品';
      }
      var bgColor2 = this.data.pageBackgroundColor2 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
      if (bgColor2 == 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('化妆品') == -1)
          tag_temp.push('化妆品');
      if (bgColor2 != 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('化妆品') != -1) {
          var index = tag_temp.findIndex(check)
          if (index == (length - 1))
            tag_temp.pop()
          else {
            var temp = tag_temp[length - 1];
            tag_temp[length - 1] = tag_temp[index];
            tag_temp[index] = temp;
            tag_temp.pop();
          }
        }
      this.setData({
        tag: tag_temp,
        pageBackgroundColor2: bgColor2
      })
    },

    changeColor3: function(e) {
      var that = this;
      var tag_temp = that.data.tag;
      var length = tag_temp.length;
      var check = function(val) {
        return val == '生活用品';
      }
      var bgColor3 = this.data.pageBackgroundColor3 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
      if (bgColor3 == 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('生活用品') == -1)
          tag_temp.push('生活用品');
      if (bgColor3 != 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('生活用品') != -1) {
          var index = tag_temp.findIndex(check)
          if (index == (length - 1))
            tag_temp.pop()
          else {
            var temp = tag_temp[length - 1];
            tag_temp[length - 1] = tag_temp[index];
            tag_temp[index] = temp;
            tag_temp.pop();
          }
        }
      this.setData({
        tag: tag_temp,
        pageBackgroundColor3: bgColor3
      })
    },

    changeColor4: function(e) {
      var that = this;
      var tag_temp = that.data.tag;
      var length = tag_temp.length;
      var check = function(val) {
        return val == '体育用品';
      }
      var bgColor4 = this.data.pageBackgroundColor4 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
      if (bgColor4 == 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('体育用品') == -1)
          tag_temp.push('体育用品');
      if (bgColor4 != 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('体育用品') != -1) {
          var index = tag_temp.findIndex(check)
          if (index == (length - 1))
            tag_temp.pop()
          else {
            var temp = tag_temp[length - 1];
            tag_temp[length - 1] = tag_temp[index];
            tag_temp[index] = temp;
            tag_temp.pop();
          }
        }
      this.setData({
        tag: tag_temp,
        pageBackgroundColor4: bgColor4
      })
    },

    changeColor5: function(e) {
      var that = this;
      var tag_temp = that.data.tag;
      var length = tag_temp.length;
      var check = function(val) {
        return val == '其他';
      }
      var bgColor5 = this.data.pageBackgroundColor5 == 'rgb(206, 206, 207)' ? 'none' : 'rgb(206, 206, 207)';
      if (bgColor5 == 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('其他') == -1)
          tag_temp.push('其他');
      if (bgColor5 != 'rgb(206, 206, 207)')
        if (tag_temp.indexOf('其他') != -1) {
          var index = tag_temp.findIndex(check)
          if (index == (length - 1))
            tag_temp.pop()
          else {
            var temp = tag_temp[length - 1];
            tag_temp[length - 1] = tag_temp[index];
            tag_temp[index] = temp;
            tag_temp.pop();
          }
        }
      this.setData({
        tag: tag_temp,
        pageBackgroundColor5: bgColor5
      })
    },
    aaa: function(e) {
      var that = this
      this.bbb(e, function(a) {
        console.log(a)
      })
    },
    bbb: function(e, cb) {
      var that = this
      var cc=[]
      wx.cloud.init()
      const db = wx.cloud.database()
      for (var i = 0; i < 3; i++) {
        db.collection('Collection').where({
          _id: 'c0a3987b5ce7df7604a4e8e13b7d6951'
        }).get({
          success(res) {
            //获取用户收藏的物品的id
            console.log(res.data[0]._id)
            cc.push(res.data[0]._id)
            that.setData({
              test: c
            })
            cb('that.data.test')
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
      
    }
  })
wx.cloud.init()
const app = getApp()
const appid = "wx0d01ebf44be82973"
const secret = "41450109dcc872fa4d406a2d7d894830"
const db = wx.cloud.database()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    count: undefined,
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          var code = undefined;
          var _openid = undefined;
          //获取用户的openid
          wx.login({
            success: function (res) {
              code = res.code;
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
                success(res) {
                  // 获取到用户的 openid
                  _openid = res.data.openid
                  console.log("用户的openid:" + res.data.openid);
                  app.globalData.openid = _openid
                  wx.switchTab({
                    url: '../main/main',
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      var code = undefined;
      var _openid = undefined;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //获取用户的openid
      wx.login({
        success: function (res) {
          code = res.code;
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            success: res => {
              // 获取到用户的 openid
              _openid = res.data.openid
              console.log("用户的openid:" + res.data.openid);
            }
          });
        }
      });

      db.collection('UserMessage').where({
        _openid: _openid
      }).count({
        success(res) {
          console.log(res.total)
          //将用户信息入库
          if (parseInt(res.total) == 0) {
            db.collection('UserMessage').add({
              data: {
                avatarUrl: e.detail.userInfo.avatarUrl,
                city: e.detail.userInfo.city,
                province: e.detail.userInfo.province,
                country: e.detail.userInfo.country,
                gender: e.detail.userInfo.gender,
                language: e.detail.userInfo.language,
                nickName: e.detail.userInfo.nickName,
                openid: _openid,
              },
              success(res) {
                console.log(res)
              }
            })
            //创建收藏库
            db.collection('Collection').add({
              data: {
                openid: _openid,
                myCollection: [],
              }
            })
          }
        }
      })



      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.switchTab({
        url: '../main/main',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '若不授权将以游客身份进入小程序',
        showCancel: false,
        confirmText: '返回授权',
        concelText: '跳过',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          } else if (res.concel) {
            wx.switchTab({
              url: '../main/main',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        }
      });
    }
  }
})
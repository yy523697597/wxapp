
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10&mkt=zh-CN',
      success: function (res) {
        var data = res.data;
        var n = Math.floor(Math.random() * 9);
        console.log(n)
        data.images[n].url = data.images[n].url.replace('1920x1080', '1080x1920');
        var url = 'https://www.bing.com' + data.images[n].url;
        var copyright = '© ' + data.images[n].copyright.split('，')[0];
        that.setData({
          url: url,
          copyright: copyright
        });
      }
    });
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              that.setData({
                nickName: nickName,
                avatarUrl: avatarUrl
              });
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
  ,
  onTap: function () {
    wx.switchTab({
      url: '../post/post',
    });
  }
})

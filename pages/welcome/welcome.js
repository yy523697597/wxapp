
Page({

  /**
   * 页面的初始数据
   */
  data: {
  username:'Yui'
  },
  onTap:function(){
    wx.switchTab({
      url: '../post/post',
    })
  }
})

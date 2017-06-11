// pages/nba/nba.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://games.mobileapi.hupu.com/4/7.0.18/nba/getNews?offline=json&night=0&nopic=0&client=wechatnba',
      success: function (res) {
        var data = res.data.data.result.data;
        that.setData({
          nbaInfos: data
        });
      }
    });
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
    var that = this;
    wx.request({
      url: 'https://games.mobileapi.hupu.com/4/7.0.18/nba/getNews?offline=json&night=0&nopic=0&client=wechatnba',
      success: function (res) {
        var data = res.data.data.result.data;
        that.setData({
          nbaInfos: data
        });
      }
    });
  },
  onDetailTap:function(event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'nba-detail/nba-detail?id='+id,
    });
  }
  
})
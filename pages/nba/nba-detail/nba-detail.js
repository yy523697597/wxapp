// pages/nba-detail/nba-detail.js
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    // 获取文章正文内容
    wx.request({
      url: 'https://games.mobileapi.hupu.com/4/7.0.18/news/createNewsDetailH5?offline=json&night=0&nopic=0&client=wechatnba&nid=' + id + '&leaguesEn=nba',
      success: function (res) {
        var detail = res.data.data;
        var article = detail.news.content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          detail: detail
        });
      }
    });

    // 获取亮评
    wx.request({
      url: 'https://games.mobileapi.hupu.com/4/7.0.18/news/getCommentH5?offline=json&night=0&nopic=0&client=wechatnba&nid=' + id ,
      success: function (res) {
        var comments = res.data.data.light_comments;
        that.setData({
          comments: comments
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
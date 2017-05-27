var postsData = require('../../data/posts-data.js');


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
    this.setData({
      swiperInfo: postsData.swiperInfo,
      postList: postsData.postList
    });
  }
})
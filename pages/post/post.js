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
    // var postid = options.id;


    this.setData({
      swiperInfo: postsData.swiperInfo,
      postList: postsData.postList
    });

    // var readingList = wx.getStorageSync('readingList');
    // if (readingList) {
    //   // 获取文章收藏状态
    //   var readingNum = readingList[postid];
    //   // 更新文章收藏状态
    //   this.setData({
    //     readingNum: readingNum
    //   });
    // } else {
    //   // 如果不存在缓存就设置一个新缓存
    //   var readingList = {};
    //   wx.setStorageSync('readingList', readingList);
    // }
  },
  onPostTap: function (evt) {
    var postid = evt.currentTarget.dataset.postid;
    // var readingList = wx.getStorageSync('readingList');
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    });

    // readingList[postid] = postsData.postList[postid].reading;
    // wx.setStorageSync('readingList', readingList);
  },
  onSwiperTap: function (evt) {
    var postid = evt.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    });

    // postsData.postList[postid].reading++;
  }
})
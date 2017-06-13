
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
      url: 'https://app3.qdaily.com/wxapp/homes/index/0.json',
      success: function (res) {
        var data = res.data.response;
        var swiperData = data.banners;
        var feedsData = data.feeds;
        var lastkey = data.last_key;
        that.setData({
          swiperData: swiperData,
          feedsData: feedsData,
          lastkey:lastkey
        });
      }
    });
  },
  onPostTap: function (evt) {
    var postid = evt.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    });
  },
  onSwiperTap: function (evt) {
    var swiperid = evt.currentTarget.dataset.swiperid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + swiperid
    });
  },
  // https://app3.qdaily.com/wxapp/homes/index/1497234291_946656000.json
  onReachBottom: function (event) {
    wx.showNavigationBarLoading();
    var that = this;
    var lastkey = that.data.lastkey;
    wx.request({
      url: 'https://app3.qdaily.com/wxapp/homes/index/' + lastkey+'.json',
      success: function (res) {
        var newData = res.data.response;
        var newFeedsData = newData.feeds;
        var lastkey = newData.last_key;
        var newFeeds = that.data.feedsData.concat(newFeedsData);
        that.setData({
          feedsData: newFeeds,
          lastkey: lastkey
        });
        wx.hideNavigationBarLoading();
      }
      // 175497
      // 149840
    })
  },
  onPullDownRefresh:function(event){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://app3.qdaily.com/wxapp/homes/index/0.json',
      success: function (res) {
        var data = res.data.response;
        var swiperData = data.banners;
        var feedsData = data.feeds;
        var lastkey = data.last_key;
        that.setData({
          swiperData: swiperData,
          feedsData: feedsData,
          lastkey: lastkey
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  }
})
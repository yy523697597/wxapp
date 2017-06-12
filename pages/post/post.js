
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
        
         that.setData({
            swiperData: swiperData,
            feedsData: feedsData
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
    var postid = evt.currentTarget.dataset.postid;
    console.log(postid)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid,
      success: function (res) {

      }
    });


  }
})
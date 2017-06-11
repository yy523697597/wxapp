
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
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function (res) {
        var data = res.data;
        var swiperData = data.top_stories;
        var todayData = data.stories;
        swiperData.forEach((val) => {
          // 直接使用知乎的网址会报403错误，解决办法是在网址之前添加一个跳转网址
          val.image = 'https://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + val.image;
        });
        todayData.forEach(val => {
          val.images[0] = 'https://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + val.images[0];
        });
        that.setData({
          swiperData: swiperData,
          todayData: todayData
        });
      },fail:function(error){
        console.log(error)
      }
    })


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
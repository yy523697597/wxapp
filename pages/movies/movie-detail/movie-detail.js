var app = getApp();
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
    var id = options.id;
    var doubanUrl = app.gobalData.doubanUrl;
    // /v2/movie/subject/:id
    wx.request({
      url: doubanUrl + '/v2/movie/subject/' + id,
      header:{
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res)
      },fail:function(error){
        console.log(error)
      }
    })
  },

})
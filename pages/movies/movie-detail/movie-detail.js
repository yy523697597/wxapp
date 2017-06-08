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
    var requestUrl = doubanUrl + '/v2/movie/subject/' + id;
    this.getMovieList(requestUrl, 'movieInfo')
  },
  getMovieList: function (url, category) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        // 豆瓣API不能填 'application/json'
        'content-type': 'json'
      },
      success: function (res) {
        var moviedata = res.data;
        that.handleMovieData(moviedata);

      },
      fail: function (error) {
        console.log(error);
      }
    });
  },
  handleMovieData: function (data) {
    if (!data) {
      return;
    }
    // 导演部分很容易出错，所以需要单独处理
    var director = {
      avatar: '',
      name: '',
      id: ''
    };
    if (data.director[0] != null) {
      if (data.director[0].avatars != null) {
        var avatar = data.director[0].avatars.large;
      }
      director = {
        avatar: avatar,
        name: data.director[0].name,
        id: data.director[0].id
      };
    }

    var movieInfo ={
      
    }
  }
})
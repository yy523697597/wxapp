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
    var url = app.gobalData.doubanUrl;
    var inTheatersUrl = url + '/v2/movie/in_theaters' + '?start=0&count=3';
    var comingSoonUrl = url + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = url + '/v2/movie/top250' + '?start=0&count=3';
    this.getMovieList(inTheatersUrl);
    // this.getMovieList(comingSoonUrl);
    // this.getMovieList(top250Url);
  },
  getMovieList: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        // 豆瓣API不能填 'application/json'
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res);
        var moviedata = res.data;
        that.handleData(moviedata);
      },
      fail: function (error) {
        console.log(error);
      }
    });
  },
  handleData: function (moviedata) {
    var movies = [];
    for (var key in moviedata.subjects) {
      var subject = moviedata.subjects[key];
      var title = subject.title;
      var movieid = subject.id;
      var score = subject.rating.average;
      var coverimgUrl = subject.images.large;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        score: score,
        coverimgUrl: coverimgUrl,
        movieid: movieid
      };
      movies.push(temp);
    }
    this.setData({
      movies: movies
    });
  }

})
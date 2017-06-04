// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '',
    movies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var navigationTitle = options.category;
    this.setData({
      navigationTitle: navigationTitle
    });
    var baseUrl = app.gobalData.doubanUrl;
    var dataUrl = '';
    switch (navigationTitle) {
      case "正在上映的电影-成都":
        dataUrl = baseUrl + '/v2/movie/in_theaters?count=18';
        break;
      case "即将上映的电影":
        dataUrl = baseUrl + '/v2/movie/coming_soon?count=18';
        break;
      case "豆瓣电影Top250":
        dataUrl = baseUrl + '/v2/movie/top250?count=18';
        break;
    }
    util.getMovieList(dataUrl, this.handleData);
  },
  handleData: function (moviedata) {
    var movies = [];
    var slogan = moviedata.title;
    for (var key in moviedata.subjects) {

      var subject = moviedata.subjects[key];
      var title = subject.title;
      var movieid = subject.id;

      var score = subject.rating.average

      var stars = util.convertStarsToArray(subject.rating.stars);
      var coverimgUrl = subject.images.large;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        score: score,
        coverimgUrl: coverimgUrl,
        movieid: movieid,
        stars: stars
      };
      movies.push(temp);
    }

    this.setData({
      movies: movies
    });
  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
    })
  }

})
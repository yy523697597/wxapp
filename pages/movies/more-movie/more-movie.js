// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '',
    movies: [],
    requestUrl: '',
    totalCount: 18,
    isEmpty: true,
    isFreshing: false
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
        dataUrl = baseUrl + '/v2/movie/in_theaters';
        break;
      case "即将上映的电影":
        dataUrl = baseUrl + '/v2/movie/coming_soon';
        break;
      case "豆瓣电影Top250":
        dataUrl = baseUrl + '/v2/movie/top250';
        break;
    }
    // 存储请求链接
    this.data.requestUrl = dataUrl;
    // 第一次的时候请求18条电影数据
    dataUrl += '?count=18';
    util.getMovieList(dataUrl, this.handleData);
  },
  handleData: function (moviedata) {

    this.data.isFreshing = true;
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
    // 如果原来就加载有电影数据，就将新获取到的数据合并到原来的数组中
    if (!this.data.isEmpty) {
      var totalMovies = this.data.movies.concat(movies);
    } else {
      // 如果是第一次加载就直接赋值给totalMovies，同时改变标记
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    // 每次加载，加载总数就加18
    this.data.totalCount += 18;
    // 关闭导航栏刷新标记
    wx.hideNavigationBarLoading();
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
    })
  },
  onReachBottom: function () {
    if (this.data.isFreshing) {
      var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=18';
      util.getMovieList(nextUrl, this.handleData);
      // 开启状态栏刷新标记
      wx.showNavigationBarLoading();
      this.data.isFreshing = false;
    }
  },
  onPullDownRefresh: function () {
    var refreshUrl = this.data.requestUrl + "?start=0&count=18";
    // 下拉刷新时，需要将原有数据清空，并且改变标记
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount =0;
    util.getMovieList(refreshUrl, this.handleData);
    // 开启状态栏刷新标记
    wx.showNavigationBarLoading();
  },
  onMovieTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }
})
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    searchResult: [],
    movieShow: true,
    searchShow: false,
    isFreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.gobalData.doubanUrl;
    var inTheatersUrl = url + '/v2/movie/in_theaters' + '?start=0&count=3&city=成都';
    var comingSoonUrl = url + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = url + '/v2/movie/top250' + '?start=0&count=3';

    this.getMovieList(inTheatersUrl, 'inTheaters');
    this.getMovieList(comingSoonUrl, 'comingSoon');
    this.getMovieList(top250Url, 'top250');

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
        that.handleData(moviedata, category);
      },
      fail: function (error) {
        console.log(error);
      }
    });
  },
  handleData: function (moviedata, category) {
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
    // 创建一个空对象
    var movieStorage = {};
    // 将获取的电影数组赋值给空对象
    // category是传入的参数
    // 使用一个对象进行嵌套，是为了让每一个电影数组中的信息都绑定到movieStorage.category.movies中
    // 这样在movielist-template中才能很方便的通过传递movies属性来获取所有信息
    movieStorage[category] = {
      movies: movies,
      slogan: slogan
    };
    // 直接绑定movieStorage对象到data,对movieStorage.category属性将会赋值给data,此时data中有三个属性，分别为 inTheaters、comingSoon、top250，而每一个属性下的movies属性才真正存储了电影数组
    this.setData(movieStorage);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onMoreTap: function (evt) {
    var category = evt.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  onInputFocus: function () {
    this.setData({
      movieShow: false,
      searchShow: true
    });
    wx.setNavigationBarTitle({
      title: '搜索列表',
    });
  },
  onCancleTap: function () {
    this.setData({
      movieShow: true,
      searchShow: false
    });
    wx.setNavigationBarTitle({
      title: '电影列表',
    });
  },
  onBindConfirm: function (event) {
    wx.showNavigationBarLoading();
    var url = app.gobalData.doubanUrl;
    var searchValue = event.detail.value;
    // 存储搜索值为全局变量
    this.data.searchValue = searchValue;
    var searchUrl = url + '/v2/movie/search?q=' + searchValue + '&count=18';
    this.getMovieList(searchUrl, 'searchResult');
  },
  // 下拉刷新
  onPullDownRefresh: function (event) {
    wx.showNavigationBarLoading();
    this.data.searchResult = [];
    var url = app.gobalData.doubanUrl;
    var searchValue = this.data.searchValue;
    var searchUrl = url + '/v2/movie/search?q=' + searchValue + '&count=18';
    this.getMovieList(searchUrl, 'searchResult');
  },
  onMovieTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + id,
    })
  }
})
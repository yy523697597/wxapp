var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    movieShow: true,
    searchShow: false
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
        console.log(res)
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
  },
  onMoreTap: function (evt) {
    var category = evt.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  onInputConfirm: function () {
    this.setData({
      movieShow: false,
      searchShow: true
    });
  },
  onCancleTap:function(){
    this.setData({
      movieShow: true,
      searchShow: false
    });
  }

})
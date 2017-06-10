var app = getApp();
var util = require("../../../utils/util.js");
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
    console.log(data)
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        var avatar = data.directors[0].avatars.large;
      }
      director = {
        avatar: avatar,
        name: data.directors[0].name,
        id: data.directors[0].id
      };
    }

    var movie = {
      title: data.title,
      coverimg: data.images.large,
      country: data.countries[0],
      year: data.year,
      collectionCount: data.collect_count,
      commentsCount: data.comments_count,
      stars: util.convertStarsToArray(data.rating.stars),
      score: data.rating.average,
      actorsInfo: util.convertCartsInfo(data.casts),
      actors: util.convertCarts(data.casts),
      orignalTitle: data.original_title,
      genres: data.genres.join('、'),
      summary: data.summary,
    };
    this.setData({
      movie: movie,
      director: director
    });
  },
  onCoverimgTap: function (event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    });
  }
})
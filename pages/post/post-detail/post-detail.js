
// 获取app对象
var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取文章详情内容
    var postid = options.id;
    this.setData({
      postid: postid
    });
    // 
    wx.request({
      url: 'https://app3.qdaily.com/wxapp/articles/info/' + postid + '.json',
      success: (res) => {
        var response = res.data.response;
        var author = response.author;
        var coverImg = response.image;
        var detail = response.post;
        var article = detail.content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          detail: detail
        });
        that.setData({
          coverImg: coverImg,
          author: author,
          detail: detail
        });
      }
    });


    // 设置文章id为页面共享
    this.setData({
      currentPostId: postid
    });
    // 获取缓存
    var collectionList = wx.getStorageSync('collectionList');
    if (collectionList) {
      // 获取文章收藏状态
      var collectionStatus = collectionList[postid];
      // 更新文章收藏状态
      this.setData({
        collectionStatus: collectionStatus
      });
    } else {
      // 如果不存在缓存就设置一个新缓存
      var collectionList = {};
      wx.setStorageSync('collectionList', collectionList);
    }



  },
  onCollectionTap: function (event) {
    var collectionList = wx.getStorageSync('collectionList');
    // 获取文章收藏状态
    var collectionStatus = collectionList[this.data.currentPostId];
    // 文章收藏状态切换
    collectionStatus = !collectionStatus;
    // 存储文章收藏状态
    collectionList[this.data.currentPostId] = collectionStatus;
    // 三个参数为,Storage键、值、文章收藏状态
    this.showToast('collectionList', collectionList, collectionStatus);
  },
  showToast: function (key, value, status) {

    wx.setStorageSync(key, value);
    // 更新文章收藏状态
    this.setData({
      collectionStatus: status
    });
    // 显示提示
    wx.showToast({
      title: status ? "收藏成功" : "取消成功",
      duration: 1000
    })
  },
  onShareTap: function (evt) {
    console.log(1)
    var itemList = [
      "分享到朋友圈",
      "分享给微信好友"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#355A83",
      success: function (res) {
        wx.showModal({
          title: itemList[res.tapIndex],
          content: "是否取消? " + res.cancel + " 现在无法分享"
        })
      }
    })
  },
  onReachBottom: function () {
    // https://app3.qdaily.com/wxapp/comments/index/article/41931/0.json
    var postid = this.data.postid;
    var that = this;
    wx.request({
      url: 'https://app3.qdaily.com/wxapp/comments/index/article/' + postid + '/0.json',
      success: res => {
        that.setData({
          comments: res.data.response.comments
        });
      }
    })
  }

})
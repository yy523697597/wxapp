
// 获取app对象
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: '',
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取文章详情内容
    var postid = options.id;
    var postDetail = postsData.postList[postid];
    this.setData(postDetail);
    // 设置文章id为页面共享
    this.data.currentPostId = postid;
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

    //  从app对象中获取全局的音乐播放状态并设置当前页面的音乐播放状态
    var g_isPlayingMusic = app.gobalData.g_isPlayingMusic;
    var g_MusicPostId = app.gobalData.g_MusicPostId;
    // 如果正在播放音乐，并且文章id和正在播放音乐的文章id相同就设置文章的音乐播放状态
    if (g_isPlayingMusic && g_MusicPostId === postid) {
      this.setData({
        isPlayingMusic: g_isPlayingMusic
      });
    }
    this.setMusicStatus();

  },
  setMusicStatus: function () {
    // 监听全局音乐播放状态，用于同步文章详情页面图片
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      // 设置全局音乐播放状态
      app.gobalData.g_isPlayingMusic = true;
      // 设置正在播放音乐文章id
      app.gobalData.g_MusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      // 设置全局音乐播放状态
      app.gobalData.g_isPlayingMusic = false;
      // 音乐暂停时清楚正在播放音乐文章id
      app.gobalData.g_MusicPostId = null;
    });
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
  onMusicTap: function () {
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentPostId = this.data.currentPostId;
    var music = postsData.postList[currentPostId].music;
    if (isPlayingMusic) {
      // 暂停音乐播放
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.dataUrl,
        title: music.title,
        coverImgUrl: music.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true
      });
    }

  }


})
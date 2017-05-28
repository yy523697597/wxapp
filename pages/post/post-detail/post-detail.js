var postsData = require('../../../data/posts-data.js');

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
      itemColor:"#355A83",
      success: function (res) {
        wx.showModal({
          title: itemList[res.tapIndex],
          content:"是否取消? "+res.cancel+" 现在无法分享"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


})
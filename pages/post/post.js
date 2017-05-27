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
    var swiperinfo = [{
      swipersrc: "/img/swiper/lsyy.jpg"
    },
    {
      swipersrc: "/img/swiper/dkfy.jpg"
    }, {
      swipersrc: "/img/swiper/ccda.jpg"
    }];

    var postinfo = [{
      date: "2017-05-27",
      title: "摔跤吧！爸爸!",
      content: "马哈维亚（阿米尔 · 汗 Aamir Khan 饰）曾经是一名前途无量的摔跤运动员，在放弃了职业生涯后，他最大的遗憾就是没有能够替国家赢得金牌。",
      img: {
        post_img: "/img/post/sj.jpg",
        author_img: "/img/avatar/1.png"
      },
      collect_num: 92,
      view_num: 65
    }, {
      date: "2017-05-27",
      title: "杰克船长再临!",
      content: "故事发生在《加勒比海盗 3：世界的尽头》沉船湾之战 20 年后。男孩亨利（布兰顿 · 思怀兹 Brenton Thwaites 饰）随英国海军出航寻找被聚魂棺诅咒的父亲 “深海阎王” 威尔 · 特纳",
      img: {
        post_img: "/img/post/jlb.jpg",
        author_img: "/img/avatar/2.png"
      },
      collect_num: 114,
      view_num: 86
    }, {
      date: "2017-05-27",
      title: "异星觉醒",
      content: "几位漂浮在空间站的宇航员们发现了一个来自火星的 “神秘样本”，这个样本其实就是他们一直在找寻的高智能 “智慧生命体”。它不仅集肌细胞、神经细胞于一体，更拥有超强大脑，能够进行超能进化。",
      img: {
        post_img: "/img/post/yxjx.jpg",
        author_img: "/img/avatar/3.png"
      },
      collect_num: 117,
      view_num: 235
    }];
    this.setData({
      swiperinfo: swiperinfo,
      postinfo: postinfo
    });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
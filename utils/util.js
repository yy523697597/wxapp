function convertStarsToArray(stars) {
  var array = [];
  var stars = parseFloat(stars / 10);
  for (var i = 0; i < 5; i++) {
    // 应该是大于等于1就添加一个实体星星
    if (stars >= 1) {
      array.push(1);
      stars--;
    } else if (stars === 0.5) {
      // 0.5颗星星用2来代替
      array.push(2);
      stars--;
    } else {
      array.push(0);
    }
  }
  return array;
}

function getMovieList(url, cb) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      // 豆瓣API不能填 'application/json'
      'content-type': 'json'
    },
    success: function (res) {
      cb(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  });
}
function convertCartsInfo(arr) {
  var info = '';
  arr.forEach(function (val) {
    info = val.name + '/' + info;
  });
  // slice方法第二个参数如果是负数，那么它会自动加上字符串长度，然后得出结果
  info = info.slice(0, -1);
  return info;
}

function convertCarts(arr) {
  var actors = [];

  arr.forEach(function (val) {
    var actor = {}
    actor.img = val.avatars.large;
    actor.name = val.name;
    actors.push(actor);
  });
  return actors;
}
// 此处是exports别写成export
module.exports = {
  convertStarsToArray: convertStarsToArray,
  getMovieList: getMovieList,
  convertCartsInfo: convertCartsInfo,
  convertCarts: convertCarts
};
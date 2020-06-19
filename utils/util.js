//util.js
<<<<<<< HEAD

//取倒计时（天时分秒）
function getTimeLeft(datetimeTo) {
  // 计算目标与现在时间差（毫秒）
  let time1 = new Date(datetimeTo).getTime();
  let time2 = new Date().getTime();
  let mss = time1 - time2;

  // 将时间差（毫秒）格式为：天时分秒
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((mss % (1000 * 60)) / 1000);

=======
/**
 * GET请求封装
 */
function get(url, data = {}) {
  return request(url, data, 'GET')
}

/**
 * POST请求封装
 */
function post(url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * 微信的request
 */
function request(url, data = {}, method = "GET") {
  // 改了
  var contentType = 'application/x-www-form-urlencoded'
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        // 改了
        'token': wx.getStorageSync("token"),
        'authorization': wx.getStorageSync("sid")
      },
      success: function(res) {
        console.log('===============================================================================================')
        console.log('==    接口地址：' + url)
        console.log('==    接口参数：' + JSON.stringify(data))
        console.log('==    请求类型：' + method)
        console.log("==    接口状态：" + res.statusCode);
        console.log('===============================================================================================')
        console.log(res)
        if (res.statusCode == 200) {
          //请求正常200
          //AES解密返回的数据
          var daesData = res
          try {
            // v1接口判断data.status  v2接口判断data.statusCode  v3接口data里面没有status，所以daesData.statusCode
            if (daesData.data.status || daesData.data.statusCode || daesData.statusCode == 200) {
              //正常
              resolve(daesData);
            } else {
              //错误
              reject(daesData.message)
            }
          } catch (error) {
            console.log('==    数据解码失败')
            reject("数据解码失败")
          }
        } else if (res.statusCode == 401) {
          //此处验证了token的登录失效，如果不需要，可以去掉。
          //未登录，跳转登录界面
          // reject("登录已过期")
          // wx.showModal({
          //   title: '提示',
          //   content: '登录已过期，请立即登录，否则无法正常使用',
          //   success(res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定')
          //       wx.navigateTo({
          //         url: '/pages/login/login?toPageUrl=401',
          //       })
          //     } else if (res.cancel) {
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
        } else {
          //请求失败
          reject("请求失败：" + res.statusCode)
        }
      },
      fail: function(err) {
        //服务器连接异常
        console.log('===============================================================================================')
        console.log('==    接口地址：' + url)
        console.log('==    接口参数：' + JSON.stringify(data))
        console.log('==    请求类型：' + method)
        console.log("==    服务器连接异常")
        console.log('===============================================================================================')
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}




//取倒计时（天时分秒）
function getTimeLeft(datetimeTo) {
  // 计算目标与现在时间差（毫秒）
  let time1 = new Date(datetimeTo).getTime();
  let time2 = new Date().getTime();
  let mss = time1 - time2;

  // 将时间差（毫秒）格式为：天时分秒
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((mss % (1000 * 60)) / 1000);

>>>>>>> master
  return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
}

module.exports = {
<<<<<<< HEAD
  getTimeLeft: getTimeLeft
=======
  getTimeLeft: getTimeLeft,
  request,
  get,
  post
>>>>>>> master
}
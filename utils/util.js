//util.js
/* GET请求封装 */
function get(url, data = {}) {
  return request(url, data, 'GET')
}

/* POST请求封装 */
function post(url, data = {}) {
  return request(url, data, 'POST')
}
/*PUT请求封装 */
function put(url, data = {}) {
  return request(url, data, 'PUT')
}

/*DELETE请求封装 */
function deletes(url, data = {}){
  return request(url, data, 'DELETE')
}

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
        // console.log('===============================================================================================')
        // console.log('==    接口地址：' + url)
        // console.log('==    接口参数：' + JSON.stringify(data))
        // console.log('==    请求类型：' + method)
        // console.log("==    接口状态：" + res.statusCode);
        // console.log('===============================================================================================')
        // console.log(res)
        if (res.statusCode == 200) {
          //请求正常200
          var daesData = res
          try {
            // v1接口判断data.status  v2接口判断data.statusCode  v3接口data里面没有status，所以daesData.statusCode
            if (daesData.data.status || daesData.data.statusCode || daesData.statusCode == 200) {
              //正常
              resolve(daesData);
            } else {
              //错误==重新获取sid
              wx.request({
                url:  app.globalData.urlPath1 + '/app/users/changeSid',
                method:'post',
                data:{
                  phone:wx.getStorageSync('phoneNumber')
                },
                success(res){
                  console.log(res,'sid')
                  var sid_num = res.data
                  wx.setStorageSync('sid',sid_num)
                }
              })
              reject(daesData.message)
            }
          } catch (error) {
            console.log('==    数据解码失败')
            reject("数据解码失败")
          }
        } else if (res.statusCode == 401) {
          console.log('res.statusCode',res.statusCode)
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

  return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
}

// 手机号中间四位加密
function toHide(array) {
  var phone = array.substring(0, 3) + '****' + array.substring(7);
  return phone;
}

module.exports = {
  getTimeLeft: getTimeLeft,
  request,
  get,
  post,
  put,
  deletes,
  toHide
}
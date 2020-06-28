//app.js
//const mtjwxsdk = require("./utils/mtj-wx-sdk.js");
// const app = getApp()
const util = require('utils/util.js')
const api = require('config/api.js')
App({
  
  onLaunch: function () {
    //////////////云开发设置初始化环境//////////////////
    wx.cloud.init({
      env:"xibairui-nxp2q"
    })
    //////////////////////////////
    // const updateManager = wx.getUpdateManager()
    // updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    // })
    // updateManager.onUpdateReady(function () {
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '1、调整了账单明细页面，收支一目了然。\r\n 2、员工页面管理进一步优化。\r\n 3、取消转发，完善了分销功能。\r\n 4、现场支付的店铺列表按照就近排序。\r\n 5、取消了绑定手机号页面，完善了手机号验证流程。\r\n 新版本已经准备好，是否重启应用？',
    //     success(res) {
    //       console.log(res)
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }

    //     }
    //   })
    // })

    // updateManager.onUpdateFailed(function () {
    //   // 新版本下载失败
    // })
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var e = wx.getAccountInfoSync();
    wx.login({
      success: res => {
        // console.log(res)
        // console.log(e.miniProgram.appId)
        // console.log(that.globalData.secret)
        that.globalData.code = res.code
        that.globalData.appid = e.miniProgram.appId
        wx.setStorageSync('appid', "wx48764e3d8e81f0a5")
        // console.log(that.globalData.secret)
        util.post(
          api.urlPath1+ "/app/users/wxLogin",
          {
            code:res.code,
            appid: e.miniProgram.appId,
            secret:that.globalData.secret,
            type:2
          }
          ).then((res)=>{
            that.globalData.openid = res.data.result.openid;
            that.globalData.session_key = res.data.result.session_key;
            wx.setStorageSync("openid", res.data.result.openid)
            wx.setStorageSync("session_key", res.data.result.session_key)
          })
        // wx.request({
        //   url: that.globalData.urlPath1 + "/app/users/wxLogin",
        //   method:"post",
        //   data: {
        //     code:res.code,
        //     appid: e.miniProgram.appId,
        //     secret:that.globalData.secret,
        //     type:2
        //   },
        //   header: {
        //          "Content-Type": "application/json;charset=UTF-8"
        //          },
        //   success: res => {

        //     console.log(res);
            
        //     that.globalData.openid = res.data.result.openid;
        //     that.globalData.session_key = res.data.result.session_key;
        //     wx.setStorageSync("openid", res.data.result.openid)
        //     wx.setStorageSync("session_key", res.data.result.session_key)
           

        //   },
        //   fail: res => {
        //   }
        // })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res.userInfo)
              wx.setStorageSync("userInfo", res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              //this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // wx.getUserInfo({
      
    // })
  },
    // getLocation:function(){
      
    // },
  // getLocation: function () {
  //   var that = this;
  //   wx.getLocation({
  //     success: function (res) {
  //       let latitude = res.latitude;
  //       let longitude = res.longitude;
  //       app.globalData.latitude = res.latitude;
  //       app.globalData.longitude = res.longitude;
  //       wx.request({
  //         url: 'https://api.map.baidu.com/geocoder/v2/?location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1&ak=hoDwx7zwfBrS7ywxw47jgwgeakErV2sQ',
  //         success: res => {
  //           // app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity : res.data.result.ad_info.city;
  //           // app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.data.result.ad_info.district;
  //           wx.setStorageSync("city", res.data.result.addressComponent.city)
  //           that.setData({
  //             city: res.data.result.addressComponent.city,  //省份
  //             //county: app.globalData.defaultCounty //城市
  //           });

  //         }
  //       })
  //     },
  //   })
  // },
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
      }
    })  

  },
  
  // post: function (url, data) {
  //   var promise = new Promise((resolve, reject) => {
  //     //init
  //     var that = this;
  //     var postData = data;
  //     /*
  //     //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
  //     postData.signature = that.makeSign(postData);
  //     */
  //     //网络请求
  //     wx.request({
  //       url: url,
  //       data: postData,
  //       method: 'get',
  //       header: { 'content-type': 'application/x-www-form-urlencoded' },
  //       success: function (res) {//服务器返回数据
  //         if (res.data.status == 200) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件
  //           resolve(res.data.data);
  //         } else {//返回错误提示信息
  //           reject(res.data.msg);
  //         }
  //       },
  //       error: function (e) {
  //         reject('网络出错');
  //       }
  //     })
  //   });
  //   return promise;
  // },

  globalData: {
    userInfo: [{ id: "" }],
    urlPath:  "http://test.shanyide.cn",
    urlPath1: "https://test.shanyide.cn:5555/api/v1",
    urlToken: "http://test.shanyide.cn/api/cash/v2",
    urlPath2: "http://test.shanyide.cn/api/v2",  
    urlPath3: "http://test.shanyide.cn/api/v3",
    urlPath4: "http://test.shanyide.cn/api/cash/v4",
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    personal: null,
    secret: "f9311d84453c88e04efd1d53767fc2f6",
    waitpay_nums:''
  },
  copy(nums){
    var that = this
    wx.setClipboardData({
      data: nums,
      success: function (res) {
      wx.showToast({
      title: '复制成功',
      icon:'none',
      duration: 1000,
      mask:true
      });
      }
    })
  },
})

const util = require('../../utils/util.js')
const api = require('../../config/api.js')
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//获取年份  
var Y = date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
// console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()


//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    info:null,
    imgurllist:null,
    showindex:true,
    statusBarHeight: app.globalData.statusBarHeight,
    health_id:'', 
    health_problem:'',
    health_content:'',
    isChecked:true
  },
 closelogin:function(){
    this.setData({
      showindex:false
    })
  },
  more:function(){
    wx.navigateTo({
      url: 'prodection/prodection',
    })
  },
  toLog:function(){
    wx.navigateTo({
      url: '../../toLog/toLog',
    })
  },
  dedail:function(e){
    // console.log(e.currentTarget.dataset.info)
    var info = JSON.stringify(e.currentTarget.dataset.info)
    // console.log(info)
    wx.navigateTo({
      url: 'dedail/dedail?info=' + escape(info),
    })
  },
  prodection:function(){
    wx.navigateTo({
      url: 'prodection/prodection',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  health:function(){
    if (wx.getStorageSync("token") && wx.getStorageSync("userInfo")){
      wx.navigateTo({
        url: 'health/health',
      })
    }else{
      wx.showModal({
        title: '请您先授权登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me/me'
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../me/me'
            })
          }
        }
      })
    }
    
  },
  onAuth_phone(e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      that.setData({
        login: true,
        canIUse_phone: false,
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '绑定失败',
      })
    }

  },
  waitForShop: function () {
    wx.navigateTo({
      url: '../waitshop/waitshop',
    })
  },
  waitshop: function () {
    wx.navigateTo({
      url: '../delivergoods/delivergoods',
    })
  },
  onShow: function () {
    var that = this
    util.get(api.urlPath3+'/home').then((res)=>{
      // console.log(res,'希百瑞小课堂')
        that.setData({
          info: res.data.adtopicList,
          health_id:res.data.classroom.id,
          health_problem:res.data.classroom.title,
          health_content:res.data.classroom.content
        })
    }).catch((errMsg)=>{
      // console.log(errMsg,'资讯的总接口')
    })

    if (wx.getStorageSync("token")){
        that.setData({
          showindex:false
        })
    }
    wx.getUserInfo({
      success: function (res) {
        if (wx.getStorageSync("phoneNumber")) {
          that.setData({
            user_nickName: true,
            showbd: false
          })
        }
        wx.setStorageSync("userInfo", res.userInfo)
        // console.log(res.userInfo)
        that.setData({
          user: res.userInfo
        })
      }
    })
  },
  // getpage(){
  //   var that = this
  //   //////////////记载本页面数据/////////////////////////
   
  // },
  onLoad: function () {
    var that=this
  ///////////////希百瑞小课堂///////////////////
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
},
  onReachBottom: function () {
    wx.showToast({
      title: '暂无更多数据',
      icon: 'success',
      duration: 1000
    })
  },
  getUserInfo: function() {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
   // 健康小课堂刷新////////
   refresh(){
     var that = this
    //  console.log('实现希百瑞小课堂刷新',that.data.health_id)
    that.setData({
      isChecked:!that.data.isChecked
    })
    util.get(api.urlPath3+'/classroom/flush/'+that.data.health_id).then((res)=>{
      // console.log(res,'小程序----------22222222-')
      let healthid = res.data.id
      that.setData({
        health_problem:res.data.title,
        health_content:res.data.content,
        health_id:healthid
      })
    })
  },
  /////////健康测评/////////
  health_test(){
    wx.navigateTo({
      url: 'healthTest/healthtest',
    })
  }
})

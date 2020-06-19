  //index.js


var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//获取年份  
var Y = date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
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
 
  /////////////////////////////////////////////////////////////////////////////////////////
  getPhoneNumber: function (e) {
    console.log(e)
    //  console.log(e)
    var that = this;
    that.setData({
      imgurl: wx.getStorageSync("userInfo").avatarUrl,
      showimg: true,
      username: wx.getStorageSync("userInfo").nickName
    })
    // console.log(wx.getStorageSync("userInfo").nickName)
    // console.log(e.detail.encryptedData)
    if (e.detail.errMsg == "getPhoneNumber:ok") {

      that.setData({
        showinfo: true,
        showbd: false,
        user_nickName: true,
        showindex:false
      })
      wx.request({
        url: app.globalData.urlPath1 + '/app/users/appletsUser',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          session_key: wx.getStorageSync("session_key"),
          userInfo: wx.getStorageSync("userInfo"),
          openid: wx.getStorageSync("openid")
        },
        method: "post",
        success: function (res) {
          // console.log('获取用户手机号',res)
          wx.request({
            url: app.globalData.urlPath + '/api/cash/v2/token',
            data: {
              sid: res.data.result.sid
            },
            method: "post",
            success(res) {
              if (res.data.token) {
                wx.setStorageSync("token", res.data.token)
              } else {
                wx.showModal({
                  title: '提示',
                  content: '获取失败，请重新绑定',
                })
              }
            }
          })
          ////////////////
          console.log(res)
          if (res.data.result.phoneNumber) {
            that.setData({
              showinfo: true,
              showbd: false,
              user_nickName: true,
              user: '请点击登录'
            })
            wx.showLoading({
              title: '绑定成功',
            })

            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          } else {
            wx.showLoading({
              title: '绑定失败',
            })

            setTimeout(function () {
              wx.hideLoading()
            }, 1000)
          }
          console.log(res.data.result.phoneNumber)
          console.log(res.data.result.sid)
          wx.setStorageSync("phoneNumber", res.data.result.phoneNumber)
          wx.setStorageSync("sid", res.data.result.sid)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log()


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
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
        console.log(res.userInfo)
        that.setData({
          user: res.userInfo
        })
      }
    })


    wx.request({
      url: app.globalData.urlPath1 + '/app/goods/favorite?pageNum=0&pageSize=100',
      method: 'get',
      header: {
        'token': wx.getStorageSync("token"),
        'authorization': wx.getStorageSync("sid")
      },
      success(res) {
        console.log(res.data.result.length)
        that.setData({
          collectNum: res.data.result.length,
        })
      }
    })
  },
  getpage(){
    var that = this
    //////////////记载本页面数据/////////////////////////
    wx.request({
      url: app.globalData.urlPath3+'/home',
      data:{},
      success(res){
        // console.log(res)
        console.log(res.data.classroom.id)
        that.setData({
          info: res.data.adtopicList,
          health_id:res.data.classroom.id
        })
        if(res.errMsg = "request:ok"){
          wx.request({
            url: app.globalData.urlPath3+`/classroom/flush/${res.data.classroom.id}`,
            data:{},
            success(res){
              console.log('健康小课堂',res.data)
              that.setData({
                health_problem:res.data.title,
                health_content:res.data.content
              })
            }
          })
        }
      }
    })
  },
  onLoad: function () {
    var that=this
  ///////////////希百瑞小课堂///////////////////
  
  console.log(that.data.health_id)

  console.log(that.data.statusBarHeight)
  
    /////////////////////////////////////
   
    // console.log(hour)
    that.getpage()
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
          console.log(res)
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
  onPullDownRefresh: function () {
    
  },
  updateBlogs: function () {
      console.log('1')
  },
  getUserInfo: function() {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
   // 健康小课堂刷新////////
   refresh(){
     console.log('实现希百瑞小课堂刷新')
    // this.getpage()
    this.setData({
      isChecked:!this.data.isChecked
    })
    // console.log(this.data.isChecked)
  },
  /////////健康测评/////////
  health_test(){
    wx.navigateTo({
      url: 'healthTest/healthtest',
    })
  }
})

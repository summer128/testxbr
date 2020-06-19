<<<<<<< HEAD
// pages/me/me.js

const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
=======
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
const app = getApp()
Page({
>>>>>>> master
  data: {
    isShow:false,
    canIUse_phone:true,
    showinfo:false,
    login:false,
    showimg:false,
    imgurl:null,
    username:null,
    user:null,
    showbd:true,
    user_nickName:false,
    collectNum:0,
    avatarUrl:'/images/shop/xiaochengxu65.png',
    show:true,
    username:'授权登录',
    showindex: true,
    statusBarHeight: app.globalData.statusBarHeight,
    pay_nums:'', //带支付的圈数
    waitpay_show:1
  },
  closelogin: function () {
    this.setData({
      showindex: false
    })
  },
  shar:function(){
    wx.navigateTo({
      url: 'shar/shar',
    })
  },
  collectshop: function (){
    wx.navigateTo({
      url: 'collectshop/collectshop',
    })
  },
  site:function(){
    wx.navigateTo({
      url: 'shippingAddress/shippingAddress',
    })
  },
  set:function(){
    wx.navigateTo({
      url: 'set/set',
    })
  },
  waitPay:function(e){
    console.log(e.currentTarget.dataset.ishidden)
    this.setData({
      wait_show : 'none'
    })
    wx.navigateTo({
      url: '../waitshop/waitshop?ishidden=' + e.currentTarget.dataset.ishidden,
    })
  },
  waitshop: function (e) {
    wx.navigateTo({
      url: '../waitshop/waitshop?ishidden=' + e.currentTarget.dataset.ishidden,
    })
  },
  waitPut:function(e){
    wx.navigateTo({
      url: '../waitshop/waitshop?ishidden=' + e.currentTarget.dataset.ishidden,
    })
  },
  all_order:function(e){
    wx.navigateTo({
      url: '../waitshop/waitshop',
    })
  },
  balance:function(zz){
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  news:function(){
    wx.navigateTo({
      url: 'news/news',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that=this
    if (wx.getStorageSync("phoneNumber")){
        that.setData({
          user: wx.getStorageSync("userInfo")
        })
    }

},
  onGotUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail
    if (!wx.getStorageSync("token")){
        this.setData({
            showindex:true
        })
    }else{
      console.log(e.detail.userInfo.avatarUrl)
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        username: e.detail.userInfo.nickName
      })
      wx.setStorageSync("userInfo", e.detail.userInfo)
    }
},
  getPhoneNumber: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      imgurl: wx.getStorageSync("userInfo").avatarUrl,
      showimg: true,
      username: wx.getStorageSync("userInfo").nickName
    })
    // console.log(wx.getStorageSync("userInfo").nickName)
    // console.log(e.detail.encryptedData)
    if (e.detail.errMsg == "getPhoneNumber:ok") {
<<<<<<< HEAD

=======
>>>>>>> master
      that.setData({
        showinfo: true,
        showbd: false,
        user_nickName: true,
        showindex: false
      })
<<<<<<< HEAD
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
          console.log(res,'/app/users/appletsUser')
         
          /////////////获取token//////////
          wx.request({
            url: app.globalData.urlToken + '/token',
            data: {
              sid: res.data.result.sid
            },
            method: "post",
            success(res) {
              console.log(res,'获取tokem')
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
          // console.log(that.globalData.userInfo)
        }
=======
      // 获取手机号
      util.post(api.my+'/appletsUser',{
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        session_key: wx.getStorageSync("session_key"),
        userInfo: wx.getStorageSync("userInfo"),
        openid: wx.getStorageSync("openid")
      }).then((res)=>{
        console.log(res,'获取手机号')
        console.log(api.getToken)
        // 获取token
        util.post(api.getToken,{sid: res.data.result.sid}).then((res)=>{
          console.log('获取手机号的res',res)
            if (res.data.token) { 
              wx.setStorageSync("token", res.data.token)
            } else {
              wx.showModal({
                title: '提示',
                content: '获取失败，请重新绑定',
              })
            }
        }).catch((errMsg)=>{
          console.log('获取手机号的errMsg',errMsg)
        })
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

        // console.log(res.data.result.phoneNumber)
        // console.log(res.data.result.sid)
        wx.setStorageSync("phoneNumber", res.data.result.phoneNumber)
        wx.setStorageSync("sid", res.data.result.sid)

      }).catch((errMsg)=>{
        console.log(errMsg,'获取手机号报错')
>>>>>>> master
      })
    }

  },
<<<<<<< HEAD

  

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */

  
//   /**
//    * 生命周期函数--监听页面显示
//    */
=======
>>>>>>> master
  onShow: function () {
    console.log(wx.getStorageSync("userInfo").nickName)
    var that=this
    // 待支付上面的数量
<<<<<<< HEAD
    wx.request({
      url: app.globalData.urlPath1 + '/app/users',
      method: 'get',
      header: {
        'token': wx.getStorageSync("token"),
        'authorization': wx.getStorageSync("sid")
      },
      success(res) {
        console.log(res,'代付款商品信息')
        console.log(res.data.result.pendingPayment,'代付款商品信息')
        console.log(res.data.result.paid)
        if(res.data.result.paid == undefined && res.data.result.delivering == undefined){
          console.log('没有那几个参数')
          that.setData({
            waitpay_show : 0
          })
        }
        that.setData({
          wait_list:res.data.result
        })
      
        if(res.data.status !== 200){

        }
        else{
            that.setData({
              // 待付费
              pay_nums:res.data.result.pendingPayment,
              // 待发货
              wait_delivered:res.data.result.paid,
              // 待收货
              wait_received:res.data.result.delivering
            })
          
          // if(that.data.pay_nums == 0){
          //   that.setData({
          //     waitpay_show:false
          //   })
          // }else{
          //   that.setData({
          //     waitpay_show:true
          //   })
          // }
        }
        
      }
=======
    // 获取我的待支付，待收货，代发货的数量
    util.get(api.my).then((res)=>{
      console.log('待支付等三个数量',res)
      if(res.data.result.paid == undefined && res.data.result.delivering == undefined){
        console.log('没有那几个参数')
        that.setData({
          waitpay_show : 0
        })
      }
      that.setData({
        wait_list:res.data.result
      })
    
      if(res.data.status !== 200){

      }
      else{
          that.setData({
            // 待付费
            pay_nums:res.data.result.pendingPayment,
            // 待发货
            wait_delivered:res.data.result.paid,
            // 待收货
            wait_received:res.data.result.delivering
          })
      }
    }).catch((errMsg)=>{
      console.log('待支付等三个数量',errMsg)
>>>>>>> master
    })


    if (wx.getStorageSync("token")){
        that.setData({
          showindex:false
        })
    }else{
      that.setData({
        showindex: true
      })
    }
    if (wx.getStorageSync("userInfo")){
        that.setData({
          username: wx.getStorageSync("userInfo").nickName,
          avatarUrl: wx.getStorageSync("userInfo").avatarUrl
        })
    } 
    
<<<<<<< HEAD


    wx.request({
      url: app.globalData.urlPath1 + '/app/goods/favorite?pageNum=0&pageSize=100',
      method: 'get',
      header: {
        'token': wx.getStorageSync("token"),
        'authorization': wx.getStorageSync("sid")
      },
      success(res) {
        if(res.data.status !== 200){
          that.setData({
            collectNum:0
          })
        }else{
          that.setData({
            collectNum: res.data.result.length,
          })
        }
        console.log(res)
        
      }
=======
    // 首页--收藏
    util.get(api.favorite).then((res)=>{
      if(res.data.status !== 200){
        that.setData({
          collectNum:0
        })
      }else{
        that.setData({
          collectNum: res.data.result.length,
        })
      }
    }).catch((errMsg)=>{
      console.log(errMsg,'收藏')
>>>>>>> master
    })
  }
})


const app = getApp()
const util = require('../../utils/util')
const api = require('../../config/api')
Page({
  data: {
    onshow:false,
    onshow1: false,
    info:null,
    dz:null,
    ico1:false,
    ico2: false,
    ico3: false,
    ico4: false,
    text:'',
    wechat:'KMSC925'
  },
  sure:function(){
    var that=this
    console.log(that.data.info)
     util.post(
      api.urlPath1+ '/app/orders/pay',
      {
        'sid': wx.getStorageSync("sid"),
        orderNumber: that.data.info.orderInfo.orderNumber
      }
      ).then((res)=>{
        wx.requestPayment({
          timeStamp: res.data.result.timestamp,
          nonceStr: res.data.result.noncestr,
          package: res.data.result.package,
          signType: 'MD5',
          paySign: res.data.result.sign,
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          },
          complete(res) {
            console.log(res)
          }
        })
      })
    // wx.request({
    //   url: app.globalData.urlPath1 + '/app/orders/pay',
    //   method: 'post',
    //   header: {
    //     'content-type': "application/x-www-form-urlencoded",
    //     'token': wx.getStorageSync("token"),
    //   },
    //   data: {
    //     'sid': wx.getStorageSync("sid"),
    //     orderNumber: that.data.info.orderInfo.orderNumber
    //   },
    //   success(res) {
    //     console.log(res)
    //     wx.requestPayment({
    //       timeStamp: res.data.result.timestamp,
    //       nonceStr: res.data.result.noncestr,
    //       package: res.data.result.package,
    //       signType: 'MD5',
    //       paySign: res.data.result.sign,
    //       success(res) {
    //         console.log(res)
    //       },
    //       fail(res) {
    //         console.log(res)
    //       },
    //       complete(res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  close:function(){
    this.setData({
      onshow1: false,
    })
  },
  close1:function(){
    this.setData({
      ico1:!this.data.ico1,
      ico2:false,
      ico3: false,
      ico4: false,
      text:'不想买了'
    })
  },
  close2: function () {
    this.setData({
      ico2: !this.data.ico2,
      ico1: false,
      ico3: false,
      ico4: false,
      text:'信息填写错误，重新拍'
    })
  },
  close3: function () {
    this.setData({
      ico3: !this.data.ico3,
      ico2: false,
      ico1: false,
      ico4: false,
      text:'卖家缺货'
    })
  },
  close4: function () {
    this.setData({
      ico4: !this.data.ico4,
      ico2: false,
      ico3: false,
      ico1: false,
      text:'其他原因'
    })
  },
  service:function(){
      this.setData({
        onshow:true,
      })
  },
  hide:function(){
    this.setData({
      onshow: false,
    })
  },
  cancel: function () {
    this.setData({
      onshow1: true,
    })
  },
  closeorder:function(e){
    console.log(this.data.text)
    console.log(e.currentTarget.dataset.id)
    util.post(
      api.urlPath1 + '/app/orders/cancel',
      {
        id: e.currentTarget.dataset.id,
        resson:this.data.text,
        'sid': wx.getStorageSync("sid")
      }
      ).then((res)=>{
        wx.navigateBack({
          delta: 1
        })
    })
  },
  onLoad: function (options) {
    var that=this
    var info=JSON.parse(unescape(options.info))
    console.log(info)
    that.setData({
      info:info,
      endTime:info.orderInfo.pendingTime
    })
  },
  wechatNum_copy(){
    var that = this
    app.copy(that.data.wechat)
  },
  orderNum_copy(){
    var that = this
    app.copy(that.data.info.orderInfo.orderNumber)
  },
  onShow: function () {
    var that=this
    util.get(api.urlPath1 +'/app/address/default').then((res)=>{
      that.setData({
        dz:res.data.result
      })
    })
  }
})
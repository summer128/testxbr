
const app = getApp()
const util = require('../../utils/util')
const api = require('../../config/api')
Page({
  data: {
    onshow: false,
    onshow1: false,
    show: true,
    dz: null
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  lianxi: function () {
    this.setData({
      onshow: true,
    })
  },
  hide: function () {
    this.setData({
      onshow: false,
    })
  },
  tuiqian: function () {
    this.setData({
      onshow1: true,
    })
  },
  close: function () {
    this.setData({
      onshow1: false,
    })
  },
  service: function () {
    this.setData({
      onshow: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var info = JSON.parse(unescape(options.info))
    console.log(info)
    that.setData({
      info: info
    })
  },
  orderNum_copy(){
    var that = this
    app.copy(that.data.info.orderInfo.orderNumber)
  },
  onShow: function () {
    var that = this
    util.get(api.urlPath1 + '/app/address/default').then((res)=>{
      that.setData({
        dz: res.data.result
      })
    })
  }
})
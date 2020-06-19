
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.urlPath1 + '/app/address/default',
      method: 'get',
      header: {
        'token': wx.getStorageSync("token"),
        'authorization': wx.getStorageSync("sid")
      },
      success(res) {
        console.log(res)
        that.setData({
          dz: res.data.result
        })
      }
    })
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
// headHandler/headHandler.js
const app = getApp()
const util = require('../utils/util')
const api = require('../config/api')

Page({
  onShow: function () {
    var that = this
    util.get(api.urlPath1+ '/app/address/default').then((res)=>{
      that.setData({
        dz: res.data.result
      })
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
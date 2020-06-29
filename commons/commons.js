// commons/commons.js
const app=getApp()
Page({
  data: {
    forucontent: null,
    adtopicList:null,
  },
  onLoad: function (options) {
    var that = this
    //////////////记载本页面数据/////////////////////////
    wx.request({
      url: app.globalData.urlPath3 + '/home',
      data: {},
      success(res) {
        // console.log(res)
        that.setData({
          adtopicList: res.data.adtopicList
        })
      }
    })
  }
})
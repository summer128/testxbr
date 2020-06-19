var wxp = require('../../../wxParse-master/wxParse-master/wxParse/wxParse.js');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data1:null,
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  tz(e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../product/product?id=" + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var info = JSON.parse(unescape(options.info))
    console.log(info)
    var that=this
      console.log(info.id)
      wx.request({
        url: app.globalData.urlPath3+'/home/article/'+info.id,
        data:{},
        success(res){
          console.log(res)
          that.setData({
            data1:res.data
          })
          wx.request({
            url: res.data.document.contentUrl,
            data: {},
            success(res) {
              console.log(res)
              var htmlCode = res.data
              wxp.wxParse('htmlCode', 'html', htmlCode, that, 0);
              that.setData({
                
              })
            }
          })
        }
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
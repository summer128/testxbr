// pages/allClass/allClass.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishidden: 0,
    content:null,
    statusBarHeight: app.globalData.statusBarHeight
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  tz(e) {
    console.log(e)
    wx.navigateTo({
      url: "../product/product?id=" + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
      wx.request({
        url: app.globalData.urlPath3+'/category',
        data:{},
        success(res){
          console.log(res.data.data)
          that.setData({
            content:res.data.data
          })
        }
      })
  },
  click1: function (e) {
    // 获取标签元素上自定义的 data-myindex 属性的值
    let myindex = e.currentTarget.dataset.myindex;
    console.log(myindex);
    this.setData({
      ishidden: myindex
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
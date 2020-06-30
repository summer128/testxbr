const app = getApp()
Page({
  data: {
      list:null
  },
  tz(e) {
    wx.navigateTo({
      url: "../../product/product?id=" + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this

      util.get(api.urlPath1+ '/app/goods/activity/act').then((res)=>{
        that.setData({
          list: res.data.result
        })
      })
    // wx.request({
    //   url: app.globalData.urlPath1 + '/app/goods/activity/act',
    //   method: 'get',
    //   header: {
    //     'token': wx.getStorageSync("token"),
    //     'authorization': wx.getStorageSync("sid")
    //   },
    //   success(res) {
    //     console.log(res)
    //     that.setData({
    //       list: res.data.result
    //     })
    //   }
    // })
  }
})
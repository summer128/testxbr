
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    wuliu:null,//物流信息列表
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
      var that=this
      wx.request({
        url: app.globalData.urlPath1 +'/app/orders/shipInfo/'+that.data.info.orderInfo.id,
        method:'get',
        header: {
          'token': wx.getStorageSync("token"),
          'authorization': wx.getStorageSync("sid")
        },
        success(res){
          console.log(res.data.result)
          wx.request({
            url: 'http://q.kdpt.net/api?id=' + res.data.result.token + '&com=' + 'shunfeng' + '&nu=' +'299328255922'+'&show='+'json'+'&order'+'desc'+'&format='+'kuaidi100',
            // url: 'http://q.kdpt.net/api?id=' + res.data.result.token + '&com=' + res.data.result.shipName + '&nu=' +res.data.result.shipNumber+'&show='+'json'+'&order'+'desc'+'&format='+'kuaidi100',
            method:'get',
            success(res){
              console.log(res.data.data)
              that.setData({
                wuliu:res.data.data
              })
            }
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
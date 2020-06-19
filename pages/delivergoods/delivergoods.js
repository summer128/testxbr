const app = getApp()
Page({
  data: {
    onshow: false,
    onshow1: false,
    show:true,
    dz: null,
    wechat:'KMSC925'
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
  service:function(){
    this.setData({
      onshow:true
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
      info:info
    })
  },
 
  /**
   *申请退款
   */
  refund: function () {
    this.setData({
      onshow:true
    })
  },

  // 点击复制
  wechatNum_copy(){
    var that = this
    app.copy(that.data.wechat)
  },
  orderNum_copy(){
    var that = this
    app.copy(that.data.info.orderInfo.orderNumber)
  },
  onShow: function () {
    var that = this
    util.get(api.urlPath1+'/app/address/default').then(()=>{
      that.setData({
        dz: res.data.result
      })
    }).catch((errMsg)=>{
      console.log(errMsg,'错误信息')
    })
    // wx.request({
    //   url: app.globalData.urlPath1 + '/app/address/default',
    //   method: 'get',
    //   header: {
    //     'token': wx.getStorageSync("token"),
    //     'authorization': wx.getStorageSync("sid")
    //   },
    //   success(res) {
    //     console.log(res)
    //     that.setData({
    //       dz: res.data.result
    //     })
    //   }
    // })
  }
})
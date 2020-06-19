
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    wuliu:null,//物流信息列表
    // status: ["查询异常", "暂无记录", "在途中", "派送中", "已签收", "用户拒签", "疑难件", "无效单", "超时单", "签收失败","退回"],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var info = JSON.parse(unescape(options.info))
    var info = JSON.parse((options.info))
    console.log(info,'物流信息')
    
    that.setData({
      info: info
    })
  },
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
          console.log(res.data.result,'物流信息')
          console.log(res.data.result.shipName,res.data.result.shipNumber,res.data.result['token'])
          // await HttpUtil().get('http://q.kdpt.net/api' + '?id=${result['token']}&com=${result['shipName']}&nu=${result['shipNumber']}&show=json&order=desc&format=kuaidi100').then((value) 
          wx.request({
            // url: 'http://q.kdpt.net/api?id=' + res.data.result.token + '&com=' + res.data.result.shipName + '&nu=' + res.data.result.shipNumber +'&show='+'json'+'&order'+'desc'+'&format='+'kuaidi100',
            url: 'http://q.kdpt.net/api?id=' + res.data.result.token + '&com=' + 'shunfeng' + '&nu=' +'299328255922'+'&show='+'json'+'&order'+'desc'+'&format='+'kuaidi100',
            method:'get',
            success(res){
              console.log(res)
              that.setData({
                wuliu:res.data.data
              })
            }
          })
        }
      })
  }
})
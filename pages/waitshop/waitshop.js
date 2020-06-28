
const app = getApp()
const util = require('../../utils/util')
const api = require('../../config/api')
Page({
  data: {
    list: ["待付款", "待发货", "待收货", "已完成"],
    ishidden: 0,
    forucontent: null,
    statusBarHeight: app.globalData.statusBarHeight,
    orderList: null,
    show: false,
    onshow1:false,
    ico1: false,
    ico2: false,
    ico3: false,
    ico4: false,
    text: '',
    id:null,///待付款取消订单对应商品id
    zt:null,
  },
  kanwuliu:function(e){
    console.log(e,'查看物流')
    console.log('看物流')
    var info = JSON.stringify(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '../wuliu/wuliu?info='+info,
    })
  },
  shouhuo:function(e){
    var that=this
    console.log(e.currentTarget.dataset.info)
    console.log('收货')
    util.post(
      api.urlPath1 +'/app/orders/receive',
      {
        'sid': wx.getStorageSync("sid"),
        id: e.currentTarget.dataset.info.orderInfo.id
      }
      ).then((res)=>{
        wx.showLoading({
          title: '收货成功',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 500)
        console.log(res)
        wx.request({
          url: app.globalData.urlPath1 + '/app/orders',
          method: 'get',
          header: {
            'token': wx.getStorageSync("token"),
            'authorization': wx.getStorageSync("sid")
          },
          success(res) {
            console.log(res.data.result)
            that.setData({
              orderList: res.data.result
            })
          }
        })
      })


    // wx.request({
    //   url: app.globalData.urlPath1 +'/app/orders/receive',
    //   method:'post',
    //   header: {
    //     'content-type': "application/x-www-form-urlencoded",
    //     'token': wx.getStorageSync("token"),
    //   },
    //   data: {
    //     'sid': wx.getStorageSync("sid"),
    //     id: e.currentTarget.dataset.info.orderInfo.id
    //   },
    //   success(res){
    //     wx.showLoading({
    //       title: '收货成功',
    //     })

    //     setTimeout(function () {
    //       wx.hideLoading()
    //     }, 500)
    //     console.log(res)
    //     wx.request({
    //       url: app.globalData.urlPath1 + '/app/orders',
    //       method: 'get',
    //       header: {
    //         'token': wx.getStorageSync("token"),
    //         'authorization': wx.getStorageSync("sid")
    //       },
    //       success(res) {
    //         console.log(res.data.result)
    //         that.setData({
    //           orderList: res.data.result
    //         })
    //       }
    //     })
    //   }
    // })
  },
  close1: function () {
    this.setData({
      ico1: !this.data.ico1,
      ico2: false,
      ico3: false,
      ico4: false,
      text: '不想买了'
    })
  },
  close2: function () {
    this.setData({
      ico2: !this.data.ico2,
      ico1: false,
      ico3: false,
      ico4: false,
      text: '信息填写错误，重新拍'
    })
  },
  close3: function () {
    this.setData({
      ico3: !this.data.ico3,
      ico2: false,
      ico1: false,
      ico4: false,
      text: '卖家缺货'
    })
  },
  close4: function () {
    this.setData({
      ico4: !this.data.ico4,
      ico2: false,
      ico3: false,
      ico1: false,
      text: '其他原因'
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  now_pay: function(e) {
    console.log(e,'待付款---立即支付')
    var info = JSON.stringify(e.currentTarget.dataset.msg)
    wx.navigateTo({
      url: '../waitPay/waitPay?info=' + info,
    })
    
    // var that=this
    // console.log(e,'待付款---立即支付')
    // var pay_goods = e.currentTarget.dataset.msg
    // console.log(pay_goods,'1111111111',pay_goods.goodsInfo.name,pay_goods.orderInfo.id,pay_goods.orderInfo.payPrice)

    // util.post(
    //   api.urlPath1+'/app/orders/pay',
    //   {
    //     'sid': wx.getStorageSync("sid"),
    //     orderNumber:e.currentTarget.dataset.msg.orderInfo.orderNumber
    //   }
    //   ).then((res)=>{
    //     wx.requestPayment({
    //       timeStamp: res.data.result.timestamp,
    //       nonceStr: res.data.result.noncestr,
    //       package: res.data.result.package,
    //       signType: 'MD5',
    //       paySign: res.data.result.sign,
    //       success(res) {
    //         console.log(res)
    //       },
    //       fail(res) {
    //         console.log(res)
    //       },
    //       complete(res) {
    //         console.log(res)
    //       }
    //     })
//     )


    // wx.request({
    //   url: app.globalData.urlPath1 +'/app/orders/pay',
    //   method:'post',
    //   header: {
    //     'content-type': "application/x-www-form-urlencoded",
    //     'token': wx.getStorageSync("token"),
    //   },
    //   data:{
    //     'sid': wx.getStorageSync("sid"),
    //     orderNumber:e.currentTarget.dataset.msg.orderInfo.orderNumber
    //   },
    //   success(res){
    //     console.log(res)
    //     wx.requestPayment({
    //       timeStamp: res.data.result.timestamp,
    //       nonceStr: res.data.result.noncestr,
    //       package: res.data.result.package,
    //       signType: 'MD5',
    //       paySign: res.data.result.sign,
    //       success(res) {
    //         console.log(res)
           
    //       },
    //       fail(res) {
    //         console.log(res)
    //       },
    //       complete(res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
  },
  tzz: function(e) {
    console.log(e)
    var info = JSON.stringify(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '../waitPay/waitPay?info=' + info,
    })
  },
  tzzz: function(e) {
    
    var info = JSON.stringify(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '../../../../delivergoods/delivergoods?info=' + info,
    })
  },
  tzzzz:function(e){
    console.log(e)
    var info = JSON.stringify(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '../../../../waitPut/waitPut?info='+info,
    })
  },
  
  tzzzzz:function(){
    
  },
  close:function(){
    this.setData({
      onshow1:false
    })
  },
  closeorder: function(e) {
    var that = this
    console.log(e)
    console.log(that.data.orderList)
    var id = e.currentTarget.dataset.id.orderInfo.id
    that.setData({
      onshow1:true,
      id: id,
    })
},

// 代付款---立即支付
  sure:function(){
    var that=this
      console.log(that.data.id)
      console.log(that.data.orderList)
    util.post(
      api.urlPath1 + '/app/orders/cancel',
      {
        id: that.data.id,
        resson: that.data.text,
        'sid': wx.getStorageSync("sid")
      }
      ).then((res)=>{
        wx.request({
          url: app.globalData.urlPath1 + '/app/orders',
          method: 'get',
          header: {
            'token': wx.getStorageSync("token"),
            'authorization': wx.getStorageSync("sid")
          },
          success(res) {
            console.log(res.data.result,'fukuan')
            that.setData({
              orderList: res.data.result
            })
          }
        })
        that.setData({
          onshow1:false
        })
      })
    // wx.request({
    //   url: app.globalData.urlPath1 + '/app/orders/cancel',
    //   method: 'post',
    //   data: {
    //     id: that.data.id,
    //     resson: that.data.text,
    //     'sid': wx.getStorageSync("sid")
    //   },
    //   header: {
    //     'content-type': "application/x-www-form-urlencoded",
    //     'token': wx.getStorageSync("token"),
    //   },
    //   success(res) {
    //     console.log(res)
    //     wx.request({
    //       url: app.globalData.urlPath1 + '/app/orders',
    //       method: 'get',
    //       header: {
    //         'token': wx.getStorageSync("token"),
    //         'authorization': wx.getStorageSync("sid")
    //       },
    //       success(res) {
    //         console.log(res.data.result)
    //         that.setData({
    //           orderList: res.data.result
    //         })
    //       }
    //     })
    //     that.setData({
    //       onshow1:false
    //     })
    //    }
    // })
  },
  tz: function(e) {
    wx.navigateTo({
      url: "../product/product?id=" + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options,'获取传来的值')
    let  detailgoods = options.goods_detail
    console.log(detailgoods,'获取传来的值')
    var that = this
    wx.setNavigationBarColor({
      frontColor: '#000000', // 必写项
      backgroundColor: '#ffffff'
    })
    that.setData({
      ishidden: options.ishidden
    })
  },
  chancolor: function(e) {
    if (this.data.orderList[e.currentTarget.dataset.myindex].length > 0) {
      this.setData({
        show: false
      })
    } else {
      this.setData({
        show: true
      })
    }
    // 获取标签元素上自定义的 data-myindex 属性的值
    let myindex = e.currentTarget.dataset.myindex;
    console.log(myindex);
    this.setData({
      ishidden: myindex
    })
  },
  onShow: function() {
    var that = this
    util.get(api.urlPath1 + '/app/orders?type=2').then((res)=>{
      console.log(res,'大夫矿商品')
      if (res.data.result[0].length > 0) {
        that.setData({
          show: false
        })
      } else {
        that.setData({
          show: true
        })
      }
      that.setData({
        orderList: res.data.result,
        wait_length:res.data.result[0].length
      })
    })
    // wx.request({
    //   url: app.globalData.urlPath1 + '/app/orders',
    //   method: 'get',
    //   header: {
    //     'token': wx.getStorageSync("token"),
    //     'authorization': wx.getStorageSync("sid")
    //   },
    //   success(res) {
    //     console.log(res.data,'代付款商品信息')
    //     if (res.data.result[0].length > 0) {
    //       that.setData({
    //         show: false
    //       })
    //     } else {
    //       that.setData({
    //         show: true
    //       })
    //     }
    //     that.setData({
    //       orderList: res.data.result,
    //       wait_length:res.data.result[0].length
    //     })
    //   }
    // })
    util.get(api.urlPath1 + '/app/goods/recommend').then((res)=>{
      that.setData({
        forucontent: res.data.result
      })
    })
    // wx.request({
    //   url: app.globalData.urlPath1 + '/app/goods/recommend',
    //   data: {},
    //   success(res) {
    //     console.log(res)
    //     that.setData({
    //       forucontent: res.data.result
    //     })
    //     console.log(that.data.forucontent)
    //   }
    // })
  }
})

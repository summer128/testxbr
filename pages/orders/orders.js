
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    dzlist:null,//默认地址
    shoplist:null,//购物车选中的商品列表
    countnum:null,//选中的总数量
    countprice:null,//选中的总价格
    postage:null,//判断是否包邮
    bz:null,///备注
    countprice1:null,//加上运费的总价
    tj_product:null  //提交的商品信息
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  close: function () {
    this.setData({
      pay: false
    })
  },
  showDialogBtn: function (e) {
    this.setData({
      pay: true,
    })
},

//////////////////////////开始支付///////////////////////////////////////////////////////////////////
pay:function(){
  var that = this
  console.log(this.data.shoplist)
  let skuarr = []
  for(var i=0;i<this.data.shoplist.length;i++){
    var info = {
      id: this.data.shoplist[i].skuId,
      number: this.data.shoplist[i].goodsNum,
      remark: this.data.bz,
      price: this.data.shoplist[i].goodsPrice
    }
    skuarr.push(info)
  }
  console.log(skuarr)
  console.log(this.data.dzlist.id)
  util.post(
    api.urlPath1 + '/app/orders',
    {
      skuList: JSON.stringify(skuarr),
      addressId: this.data.dzlist.id,
      paymentPlatform: 0,
      type: 2,
      openid: wx.getStorageSync("openid"),
      'sid': wx.getStorageSync("sid")
    }
    ).then((res)=>{
      var sign = wx.getStorageSync("appid")
      let orderNumber = res.data.result.orderNumber
      wx.requestPayment({
        timeStamp: res.data.result.timeStamp,
        nonceStr: res.data.result.nonceStr,
        package: res.data.result.package,
        signType: 'MD5',
        paySign: res.data.result.sign,
        success(res) {
          console.log(res)
         
        },
        fail(res) {
          console.log(res)
          console.log(that.data.shoplist)
          // console.log(that.data.goodList)
          // 如果未支付成功返回购物车那一页，并且
        },
        complete(res) {
          console.log(res)
        }
      })
  })
  // wx.request({
  //   url: app.globalData.urlPath1 + '/app/orders',
  //   data: {
  //     skuList: JSON.stringify(skuarr),
  //     addressId: this.data.dzlist.id,
  //     paymentPlatform: 0,
  //     type: 2,
  //     openid: wx.getStorageSync("openid"),
  //     'sid': wx.getStorageSync("sid")
  //   },
  //   method: "post",
  //   header: {
  //     'content-type': "application/x-www-form-urlencoded",
  //     'token': wx.getStorageSync("token"),
  //   },
  //   success(res) {
  //     console.log(res)
     
  //     var sign = wx.getStorageSync("appid")
  //     let orderNumber = res.data.result.orderNumber
  //     wx.requestPayment({
  //       timeStamp: res.data.result.timeStamp,
  //       nonceStr: res.data.result.nonceStr,
  //       package: res.data.result.package,
  //       signType: 'MD5',
  //       paySign: res.data.result.sign,
  //       success(res) {
  //         console.log(res)
         
  //       },
  //       fail(res) {
  //         console.log(res)
  //         console.log(that.data.shoplist)
  //         // console.log(that.data.goodList)
  //         // 如果未支付成功返回购物车那一页，并且
  //       },
  //       complete(res) {
  //         console.log(res)
  //       }
  //     })
  //   }
  // })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    // that.data.tj_product = JSON.parse(that.data.tj_product)
    // console.log(JSON.parse(that.data.tj_product))
    // console.log(JSON.parse(options.list))
    // console.log(options.isFreeDelivery)
   
    if (options.isFreeDelivery=='true') {
        console.log('1')
        that.setData({
          postage:0,
          // countprice:0+that.data.countprice
        })
    } else {
        that.setData({
        postage: 10,
        // countprice:10+that.data.countprice
      })
    }
    // console.log(that.data.countprice)
    // console.log(JSON.parse(options.list))
    var shoplist = JSON.parse(options.list)
    console.log(shoplist.length)
    var countprice=0;
    var countnum=0;
    for(var i=0;i<shoplist.length;i++){
      countnum += Number(shoplist[i].goodsNum)
      countprice += Number(shoplist[i].goodsPrice) * Number(shoplist[i].goodsNum)
    }
    console.log(countnum, countprice)
    if(options.isFreeDelivery=='true'){
      console.log('1')
        that.setData({
          // countprice:countprice,
          countprice1: countprice.toFixed(2)
        })
    }else{
      that.setData({
        // countprice:countprice,
        countprice1: (countprice+10).toFixed(2)
      })
      console.log('2')
    }
    that.setData({
      shoplist:shoplist,
      countnum:countnum,
      countprice: countprice.toFixed(2)
    })
  },
  onShow: function () {
    var that=this
     
      /////////////////获取默认地址///////////////////
    util.get(api.urlPath1+'/app/address/default').then((res)=>{
      if(res.data.result.id){
      }else{
          console.log('22222','填写信息地址')
          wx.showModal({
            title: '提示',
            content: '请您先填写地址',
            success(res){
              if (res.confirm){
                wx.navigateTo({
                  url: '../me/shippingAddress/shippingAddress',
                })
              }else{
                wx.navigateTo({
                  url: '../me/shippingAddress/shippingAddress',
                })
              }
            }
          })
      }
      that.setData({
        dzlist:res.data.result
      })
    }).catch((errMsg)=>{
      console.log(errMsg,'获取默认地址')
    })
    // wx.request({
    //   url: app.globalData.urlPath1 + '/app/address/default',
    //   method: "get",
    //   header: {
    //     'token': wx.getStorageSync("token"),
    //     'authorization': wx.getStorageSync("sid")
    //   },

    //   success(res) {
    //     console.log(res.data)
    //     if(res.data.result.id){
    //     }else{
    //         console.log('22222','填写信息地址')
    //         wx.showModal({
    //           title: '提示',
    //           content: '请您先填写地址',
    //           success(res){
    //             if (res.confirm){
    //               wx.navigateTo({
    //                 url: '../me/shippingAddress/shippingAddress',
    //               })
    //             }else{
    //               wx.navigateTo({
    //                 url: '../me/shippingAddress/shippingAddress',
    //               })
    //             }
    //           }
    //         })
    //     }
    //     that.setData({
    //       dzlist:res.data.result
    //     })
    //   }
    // })
  },
  ////更换地址
  change_address(){
    wx.navigateTo({
      url: '../me/shippingAddress/shippingAddress'
    })
  }
})
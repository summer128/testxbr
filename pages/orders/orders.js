
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
    tj_product:null , //提交的商品信息
    wait_goodsdetail:{}
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
  console.log(this.data.dzlist)
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
      console.log(res,'取消付款=1111111111')
      var sign = wx.getStorageSync("appid")
      let orderNumber = res.data.result.orderNumber
      wx.requestPayment({
        timeStamp: res.data.result.timeStamp,
        nonceStr: res.data.result.nonceStr,
        package: res.data.result.package,
        signType: 'MD5',
        paySign: res.data.result.sign,
        success(res) {
          console.log(res,'2222222')
        },
        fail(res) {
          console.log(res,'3333333333333')
          console.log(that.data.shoplist,'444444444444')
          wx.navigateTo({
            url: '../waitshop/waitshop?goods_detail='+ `${JSON.stringify(that.data.wait_goodsdetail)}`,
          })
        },
        complete(res) {
          console.log(res)
        }
      })
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.signleYiyuanActivityGoods,options.isFreeDelivery,'购物车商品运费',options)
    var that=this
    // if (options.isFreeDelivery=='true') {
    //     console.log('1')
    //     that.setData({
    //       postage:0,
    //       // countprice:0+that.data.countprice
    //     })
    // } else {
    //     that.setData({
    //     postage: 10,
    //     // countprice:10+that.data.countprice
    //   })
    // }
    
    if(options.signleYiyuanActivityGoods === "true" || options.isFreeDelivery === "true"){
      console.log('11111')
      that.setData({
        postage:0,
      })
     }else if(options.signleYiyuanActivityGoods === "false" && options.isFreeDelivery === "false"){
       console.log('4444444')
       that.setData({
        postage:10,
      })
     }
     console.log(that.data.postage)
    var shoplist = JSON.parse(options.list)
    console.log(shoplist,'商品信息')
    that.data.wait_goodsdetail.gooodsnum = shoplist[0].goodsNum
    that.data.wait_goodsdetail.oneprice = shoplist[0].goodsPrice
    console.log(that.data.wait_goodsdetail,'传过去的信息')
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
  },
  ////更换地址
  change_address(){
    wx.navigateTo({
      url: '../me/shippingAddress/shippingAddress'
    })
  }
})
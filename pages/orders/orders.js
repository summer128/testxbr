
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
    wait_goodsdetail:{},
    nullplace:false
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
      var sign = wx.getStorageSync("appid")
      let orderNumber = res.data.result.orderNumber
      wx.requestPayment({
        timeStamp: res.data.result.timeStamp,
        nonceStr: res.data.result.nonceStr,
        package: res.data.result.package,
        signType: 'MD5',
        paySign: res.data.result.sign,
        success(res) {
        },
        fail(res) {
          console.log(that.data.shoplist,'去结算的数据',JSON.stringify(that.data.wait_goodsdetail))
          if(that.data.shoplist.length > 1){
            console.log('111111')
          }else{
            wx.navigateTo({
            url: '../waitshop/waitshop?goods_detail='+ `${JSON.stringify(that.data.wait_goodsdetail)}`,
          })
          }
          
        }
      })
  })
},
  onLoad: function (options) {
    console.log(options.signleYiyuanActivityGoods,options.isFreeDelivery,'购物车商品运费',options)
    var that=this
    var shoplist = JSON.parse(options.list)
    // console.log(shoplist[0].goodsNum,'shoplistshoplistshoplistshoplist')
   var goodsprices = JSON.parse(options.list)[0].goodsPrice   //获取商品的价格
   var goodsnums = Number(shoplist[0].goodsNum)
  //  console.log(goodsnums)
    
    
    console.log(shoplist,'商品信息')
    that.data.wait_goodsdetail.gooodsnum = shoplist[0].goodsNum
    that.data.wait_goodsdetail.oneprice = shoplist[0].goodsPrice
    console.log(that.data.wait_goodsdetail,'传过去的信息')
    var countprice=0;
    var countnum=0;
    for(var i=0;i<shoplist.length;i++){
      // console.log(shoplist[i].goodsNum,shoplist[i].goodsPrice,'------------') //获取每一条数据的id 和 价格
      countnum += Number(shoplist[i].goodsNum)
      countprice += Number(shoplist[i].goodsPrice) * Number(shoplist[i].goodsNum)
    }
    that.setData({
      shoplist:shoplist,
      countnum:countnum,
      countprice: countprice.toFixed(2)
    })
    if(options.signleYiyuanActivityGoods === "true" || options.isFreeDelivery === "true"){
      //当个人运费和商品运费其中一个 == true,运费为0
     that.setData({
       postage:0
     })
     var totalvalue = ((Number(goodsprices) + that.data.postage)*goodsnums).toFixed(2) //合计=商品价格goodsprices+邮费postage
     that.setData({
       countprice1:totalvalue
     })
    }else if(options.signleYiyuanActivityGoods === "false" && options.isFreeDelivery === "false"){
      //当个人运费和商品运费 == false,运费为10
       that.setData({
         postage:10
       })
       var totalvalue = ((Number(goodsprices) + that.data.postage)*goodsnums).toFixed(2)
       //合计
       that.setData({
         countprice1:(Number(that.data.countprice )+ that.data.postage).toFixed(2)
       })
       console.log(that.data.countprice1,that.data.countprice,that.data.postage,'22222222222222')
    }
    console.log(that.data.countprice,'22222222222222')
  },
  onShow: function () {
    var that=this
      /////////////////获取默认地址///////////////////
    util.get(api.urlPath1+'/app/address/default').then((res)=>{
      if(res.data.result.id){
        that.setData({
          nullplace:true
        })
      }else{
        that.setData({
          nullplace:false
        })
          wx.showModal({
            title: '提示',
            content: '请您先填写地址',
            success(res){
              if (res.confirm){
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
      console.log(typeof that.data.dzlist)
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
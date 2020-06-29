const app = getApp()
const util = require('../../utils/util')
const api = require('../../config/api')
Page({
  data: {
    onshow:false,
    onshow1: false,
    info:null,
    bzmsg:null,
    ico1:false,
    ico2: false,
    ico3: false,
    ico4: false,
    text:'',
    wechat:'KMSC925'
  },
  // 备注
  bzChange(e){
    let that = this;
    console.log(e,'备注',e.detail.value.length)
    if (e.detail.value.length < 1) {
      that.setData({
        bzmsg: null,
      })
    } else {
      that.setData({
        bzmsg: e.detail.value,
      })
    }
  },
  sure:function(e){
    var that=this
    console.log(that.data.info,e,'提交订单--待付款',that.data.detailgoods)
    console.log(that.data.detailgoods[0].skuId)
    // console.log(that.data.orderNum,'订单编号')
     util.post(
      api.urlPath1+ '/app/orders/pay',
      {
        type: 2,
        'sid': wx.getStorageSync("sid"),
        orderNumber:that.data.orderNum
      }
      ).then((res)=>{
        console.log(res)
        console.log(res.data.result.timeStamp,res.data.result.nonceStr)
        wx.requestPayment({
          timeStamp:res.data.result.timeStamp + "",
          nonceStr: res.data.result.nonceStr + "",
          package: res.data.result.package + "",
          signType: 'MD5',
          paySign: res.data.result.sign + "",
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          },
          complete(res) {
            console.log(res)
          }
        })
      })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  close:function(){
    this.setData({
      onshow1: false,
    })
  },
  close1:function(){
    this.setData({
      ico1:!this.data.ico1,
      ico2:false,
      ico3: false,
      ico4: false,
      text:'不想买了'
    })
  },
  close2: function () {
    this.setData({
      ico2: !this.data.ico2,
      ico1: false,
      ico3: false,
      ico4: false,
      text:'信息填写错误，重新拍'
    })
  },
  close3: function () {
    this.setData({
      ico3: !this.data.ico3,
      ico2: false,
      ico1: false,
      ico4: false,
      text:'卖家缺货'
    })
  },
  close4: function () {
    this.setData({
      ico4: !this.data.ico4,
      ico2: false,
      ico3: false,
      ico1: false,
      text:'其他原因'
    })
  },
  service:function(){
      this.setData({
        onshow:true,
      })
  },
  hide:function(){
    this.setData({
      onshow: false,
    })
  },
  cancel: function () {
    this.setData({
      onshow1: true,
    })
  },
  closeorder:function(e){
    console.log(this.data.text)
    console.log(e.currentTarget.dataset.id)
    util.post(
      api.urlPath1 + '/app/orders/cancel',
      {
        id: e.currentTarget.dataset.id,
        resson:this.data.text,
        'sid': wx.getStorageSync("sid")
      }
      ).then((res)=>{
        wx.navigateBack({
          delta: 1
        })
    })
  },
  onLoad: function (options) {
    var that=this
    var info=JSON.parse(unescape(options.info))
    let goodsid = JSON.parse(options.info).orderInfo['id']
    console.log(JSON.parse(options.info).orderInfo['id'])
    that.setData({
      info:info,
      endTime:info.orderInfo.pendingTime
    })
    util.get(
      api.urlPath1 + '/app/orders/'+goodsid
      ).then((res)=>{
        console.log(res,'商品详情')
        //等待付款----商品详细信息
        let good_detail = res.data.result.orderSkuList
        //等待付款----商品实付价格-下单时间
        let good_orderdetail = res.data.result.orderInfo
        console.log(res.data.result.orderSkuList[0].number,good_orderdetail.orderNumber)
        // 商品是否包邮
        let Delivery = res.data.result.isFreeDelivery
        // 用户号是否包邮
        let signleYiyuanActivityGoods = res.data.result.signleYiyuanActivityGoods
        that.setData({
          orderNum:good_orderdetail.orderNumber
        })
        if(signleYiyuanActivityGoods === "true" || Delivery === "true"){
           that.setData({
             deliverymoney:0
           })
         }else{
           that.setData({
             deliverymoney:10
           })
         }
         console.log(that.data.deliverymoney)
        // var paynumbers = Number(good_orderdetail.payPrice + that.data.deliverymoney).toFixed(2)
        var paynumbers = Number(good_orderdetail.totalPrice).toFixed(2)
        var goodprice = Number(res.data.result.orderSkuList[0].price * res.data.result.orderSkuList[0].number).toFixed(2)
        console.log(res.data.result.signleYiyuanActivityGoods, res.data.result.isFreeDelivery,that.data.deliverymoney,'商品运费')
        that.setData({
          detailgoods :good_detail,
          good_orderdetail:good_orderdetail,
          paynumbers:paynumbers,
          Delivery:Delivery,
          signleYiyuanActivityGoods:signleYiyuanActivityGoods,
          goodprice:goodprice,
          goods_num:res.data.result.orderSkuList[0].number
        })
        // let detailgoods = res.data.result
    })
  },
  wechatNum_copy(){
    var that = this
    app.copy(that.data.wechat)
  },
  orderNum_copy(){
    var that = this
    app.copy(that.data.info.orderInfo.orderNumber)
  },
  onShow: function () {
    var that=this
    
    util.get(api.urlPath1 +'/app/address/default').then((res)=>{
      console.log(res,'地址信息')
      let phonenums = util.toHide(res.data.result.phone)
      that.setData({
        dz:res.data.result,
        phonenums:phonenums
      })
    })
  },
  change_address(){
    wx.navigateTo({
      url: '../me/shippingAddress/shippingAddress'
    })
  }
})
// pages/order/order.js
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      num:1,
      showModal: false,
      pay:false,
      msg:null,
      number:null,
      totalValue:null,
      price5:null,
      totalprice : 0,///总价
      totalprice1: 0,///单价
      totalprice2:0,  //显示总价
      totalprice3: 0,  //加上运费的总价
      dzlist:null,
      dzid:null,
      bz:"",
      id:null,
      statusBarHeight: app.globalData.statusBarHeight,
      size:null,
      postage:0 ,//运费
      size1:null,
      pricee:null,
      nullplace:false ///收货地址为空
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  bz:function(e){
    console.log(e.detail.value)
    this.setData({
      bz:e.detail.value
    })
  },
  // 填写修改地址
  address_fill(){
    wx.navigateTo({
      url: '../me/shippingAddress/shippingAddress',
    })
  },
  pay:function(e){
    // console.log(this.data.totalprice3)
    // console.log(this.data.num)
    // console.log(this.data.id)
    let skuarr=[]
    let info={
      id: this.data.id,
      number: this.data.num,
      remark: this.data.bz,
      price: this.data.totalprice1
    }
    skuarr.push(info)

    util.post(
      api.urlPath1+'/app/orders',
      {
        skuList: JSON.stringify(skuarr),
        addressId:this.data.dzid,
        paymentPlatform:0,
        type:2,
        openid: wx.getStorageSync("openid"),
        'sid': wx.getStorageSync("sid")
      }
      ).then((res)=>{
        console.log(res,'微信支付')
        var sign = wx.getStorageSync("appid")
        let orderNumber = res.data.result.orderNumber
        wx.requestPayment({
          timeStamp: res.data.result.timeStamp,
          nonceStr: res.data.result.nonceStr,
          package: res.data.result.package,
          signType: 'MD5',
          paySign: res.data.result.sign,
          success(res){
            if (res.meeMsg = "requestPayment:ok"){
              wx.reLaunch({
                url: '../product/success/success'
              })
            }
          },
          fail(res){
            console.log(res)
          }
        })
    }).catch((errMsg)=>{
      console.log(errMsg,'收藏')
    })
  },
  close:function(){
    this.setData({
      pay:false
    })
  },
  showDialogBtn:function(){
    console.log(this.data.dzid)
    // 没有收货地址，支付时弹框
    if(this.data.dzid == undefined){
      wx.showToast({
        title: '请先选择收货地址',
        icon:'none',
        mask:true
      })
    }else{
      this.setData({
        pay:true,
      })
    }
    
  },
  addCount: function (e) {
    console.log(this.data.size1)
    console.log(this.data.pricee)
    console.log(this.data.totalValue)
      ///////包邮//////////
      // this.data.totalValue+=this.data.pricee
      var xg = (Number(this.data.totalValue ) + this.data.pricee).toFixed(2)
      console.log(xg)
      this.setData({
        totalValue:xg
      })
      console.log(this.data.totalValue)
    // 总数量 
    if (this.data.num < 1000) {
      this.data.num++;
    }
    this.setData({
      num:this.data.num
    })
},
  delCount: function (e) {
    var xg = Number((this.data.totalValue - this.data.pricee).toFixed(2))
    if(this.data.num>1){
      this.setData({
        totalValue: xg
      })
    }
    // 商品总数量-1
    if (this.data.num > 1) {
      this.data.num--;
    }
    this.setData({
      num:this.data.num,
      
    });
  },
  onLoad: function (option) {
    var that = this
    var size = JSON.parse(option.msg)
    console.log(option,'order包邮',option.signleYiyuanActivityGoods,option.isFreeDelivery,size.goodsInfo.price,that.data.postage)
    console.log(JSON.parse(option.msg))
    // var totalvalue = Number(size.goodsInfo.price + that.data.postage)  //合计商品金额+运费
    if(option.signleYiyuanActivityGoods === "true" || option.isFreeDelivery === "true"){
      console.log('111111')
      that.setData({
        postage:0
      })
      var totalvue =  (Number(size.goodsInfo.price) + that.data.postage).toFixed(2)
      console.log(typeof totalvue,that.data.postage)
      that.setData({
        totalValue:totalvue,
        totalprice1: Number(size.goodsInfo.price),
        totalprice2: Number(size.goodsInfo.price),
        pricee: Number(size.goodsInfo.price)
      })
     }else if(option.signleYiyuanActivityGoods === "false" && option.isFreeDelivery === "false"){
       console.log('222222')
       that.setData({
        postage:10
      })
      var totalvue =  (Number(size.goodsInfo.price) + that.data.postage).toFixed(2)
      console.log(totalvue,that.data.postage)
      that.setData({
        totalValue:totalvue,
        totalprice1: Number(size.goodsInfo.price),
        totalprice2: Number(size.goodsInfo.price),
        pricee: Number(size.goodsInfo.price)
      })
     }
     console.log(that.data.postage)
    
    
    // if (wx.getStorageSync("isFreeDelivery")==true){
    //     that.setData({
    //       size1: wx.getStorageSync("isFreeDelivery"),
    //       // postage: 0,
    //       isFreeDelivery: wx.getStorageSync("isFreeDelivery"),
    //       size: size,
    //       totalValue: Number(size.goodsInfo.price),
    //       totalprice1: Number(size.goodsInfo.price),
    //       totalprice2: Number(size.goodsInfo.price),
    //       pricee: Number(size.goodsInfo.price)
    //     })
    // }else{
    //   that.setData({
    //     // postage:10,
    //     isFreeDelivery: wx.getStorageSync("isFreeDelivery"),
    //     size: size,
    //     totalValue: Number(size.goodsInfo.price)+10,
    //     totalprice1: Number(size.goodsInfo.price),
    //     totalprice2: Number(size.goodsInfo.price),
    //     pricee: Number(size.goodsInfo.price)
    //   })
    // }
    var size1 = size.itemSkuList[0]
    var newskuarray=[]
    newskuarray.push(size1)
    
    //////////////////////获取地址列表开始/////////////////////////////////
    util.get(api.urlPath1+'/app/address/default').then((res)=>{
      let address_id = res.data.result.id
      that.setData({
        address_id: res.data.result.id  //判断是否有收货地址，没有支付时弹框
      })
      if(res.data.result.id){
        that.setData({
          nullplace:true
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请您先填写地址',
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../me/shippingAddress/shippingAddress',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        that.setData({
          nullplace:false
        })
      }
      that.setData({
        dzlist: res.data.result,
        dzid: res.data.result.id,
        skuList: JSON.stringify(newskuarray),
        id:size.itemSkuList[0].skuId
      })
    }).catch((errMsg)=>{
      console.log(errMsg)
    })
    ///////////////////////获取地址列表结束////////////////////////////////
    var msg = JSON.parse(option.msg)
    console.log(msg,'详情商品')
    var price1 = msg.goodsInfo.price;
    var price2=price1.toString();
    var price3=Number(price2.substring(0,price2.indexOf('.')));
    
    that.setData({
      msg:msg,
      price5: price3
    })
  },
  onShow: function () {
    var that=this
    console.log(that.data.size)
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
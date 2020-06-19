// pages/order/order.js
const app = getApp()
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
      pricee:null
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
  pay:function(){
    console.log(this.data.totalprice1)
    console.log(this.data.num)
    console.log(this.data.id)
    let skuarr=[]
    let info={
      id: this.data.id,
      number: this.data.num,
      remark: this.data.bz,
      price: this.data.totalprice1
    }
    skuarr.push(info)
    
    wx.request({
      url: app.globalData.urlPath1+'/app/orders',
      data:{
        skuList: JSON.stringify(skuarr),
        addressId:this.data.dzid,
        paymentPlatform:0,
        type:2,
        openid: wx.getStorageSync("openid"),
        'sid': wx.getStorageSync("sid")
      },
      method:"post",
      header: {
        'content-type': "application/x-www-form-urlencoded",
        'token': wx.getStorageSync("token"),
      },
      success(res){
        console.log(res)
        console.log(res.data.result.timestamp)
        console.log(res.data.result.noncestr)
        console.log(res.data.result.package)
        console.log(res.data.result)
        var sign = wx.getStorageSync("appid")
        let orderNumber = res.data.result.orderNumber
        wx.requestPayment({
          timeStamp: res.data.result.timeStamp,
          nonceStr: res.data.result.nonceStr,
          package: res.data.result.package,
          signType: 'MD5',
          paySign: res.data.result.sign,
          success(res){
            console.log(res)
            if (res.meeMsg = "requestPayment:ok"){
              wx.reLaunch({
                url: '../product/success/success'
              })
            }
          },
          fail(res){
            console.log(res)
          },
          complete(res){
            console.log(res)
          }
        })
      }
    })
   
  },
  close:function(){
    this.setData({
      pay:false
    })
  },
  showDialogBtn:function(){
    this.setData({
      pay:true,
    })
  },
  addCount: function (e) {
    console.log(this.data.size1)
    console.log(this.data.pricee)
    console.log(this.data.totalValue)
      ///////包邮//////////
      // this.data.totalValue+=this.data.pricee
      var xg = Number((this.data.totalValue + this.data.pricee).toFixed(2))
      console.log(xg)
      this.setData({
        totalValue:xg
      })
      console.log(this.data.totalValue)
   
   
    // 总数量 
    if (this.data.num < 1000) {
      this.data.num++;
    }
   
    console.log('*********', this.data.num)
   
    this.setData({
      
      num:this.data.num,
      
    })
},
  delCount: function (e) {
    console.log(this.data.totalValue);
    console.log(this.data.num)
    var xg = Number((this.data.totalValue - this.data.pricee).toFixed(2))
    console.log(xg)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    
    
    console.log(JSON.parse(option.msg))
    var that = this
    console.log(that.data.totalValue)
   
    var size = JSON.parse(option.msg)
    
    console.log(size)
    
    if (wx.getStorageSync("isFreeDelivery")==true){
      console.log(Number(size.goodsInfo.price))
        that.setData({
          size1: wx.getStorageSync("isFreeDelivery"),
          postage: 0,
          isFreeDelivery: wx.getStorageSync("isFreeDelivery"),
          size: size,
          totalValue: Number(size.goodsInfo.price),
          totalprice1: Number(size.goodsInfo.price),
          totalprice2: Number(size.goodsInfo.price),
          pricee: Number(size.goodsInfo.price)
        })
    }else{
      console.log(Number(size.goodsInfo.price)+10)
      that.setData({
        postage:10,
        isFreeDelivery: wx.getStorageSync("isFreeDelivery"),
        size: size,
        totalValue: Number(size.goodsInfo.price)+10,
        totalprice1: Number(size.goodsInfo.price),
        totalprice2: Number(size.goodsInfo.price),
        pricee: Number(size.goodsInfo.price)
      })
    }
   
    console.log(that.data.totalValue)
    
    var size1 = size.itemSkuList[0]
    var newskuarray=[]
    newskuarray.push(size1)
    console.log(newskuarray)
    console.log(size.itemSkuList[0].skuId)
    
    //////////////////////获取地址列表开始/////////////////////////////////
    wx.request({
      url: app.globalData.urlPath1 +'/app/address/default',
      method: "get",
      header: {
        'token': wx.getStorageSync("token"),
         'authorization': wx.getStorageSync("sid")
      },
     
      success(res) {
        console.log(res)
        console.log(res.data.result) /////地址id
        console.log(res.data.result)     ///////用户信息
        if(res.data.result.id){
          console.log('1')
        }else{
          console.log('2')
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
        }
        that.setData({
          dzlist: res.data.result,
          dzid: res.data.result.id,
          skuList: JSON.stringify(newskuarray),
          id:size.itemSkuList[0].skuId
        })
       
      }
    })
    ///////////////////////获取地址列表结束////////////////////////////////
    var msg = JSON.parse(option.msg)
    var price1 = msg.goodsInfo.price;
    var price2=price1.toString();
    var price3=Number(price2.substring(0,price2.indexOf('.')));
    
    console.log(Number(that.data.size.goodsInfo.price))
    console.log(that.data.size1)

    that.setData({
      msg:msg,
      
      price5: price3,
      
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
    console.log(that.data.size)
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
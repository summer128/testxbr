// pages/product/product.js
const app = getApp()
Page({
  addCount: function (e) {
    console.log("刚刚您点击了加1");
    var num = this.data.num;
    // 总数量-1  
    if (num < 1000) {
      this.data.num++;
    }
    // 将数值与状态写回  
    this.setData({
      num: this.data.num
    });
  },
  delCount: function (e) {
    console.log("刚刚您点击了减1");
    var num = this.data.num;
    // 商品总数量-1
    if (num > 1) {
      this.data.num--;
    }
    // 将数值与状态写回  
    this.setData({
      num: this.data.num
    });
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  getCount: function (e) {
    var num = this.data.num;
    console.log(num);
    wx.showToast({
      title: "数量：" + num + "",
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // banner
    showModal: false,
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
    num: 1,
    productid:null,
    productinfo:null,
    swiperimg:null,
    msg:null,
    dzlist:null,
    size:null,////规格
    scr_show:false,
    block2_ScrollTop:3200,
    listtitle:["商品","评价","详情","推荐"],
    // ishidden:0,
    index:0,
    gg:null,
    tab:false,
    statusBarHeight: app.globalData.statusBarHeight,
    // 商品收藏push的缓存数组
    collect_storage:[]
  },
  delete:function(e){
      console.log(e)
  },
  shopcar:function(){
    wx.switchTab({
      url: '../shopcart/shopcart'
    })
  },
  join_car:function(){
    if (wx.getStorageSync("token")){
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      
      wx.request({
        url: app.globalData.urlPath1 + '/app/buyerCart',
        method: 'post',
        data: {
          skuId: this.data.gg,
          amount: this.data.num
        },
        header: {
          'content-type': "application/x-www-form-urlencoded",
          'token': wx.getStorageSync("token"),
          'authorization': wx.getStorageSync("sid"),
        },
        success(res) {
          console.log(res)
        }
      })
    }else{
      wx.showModal({
        title: '请您先授权登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me/me'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
   
},
  // 收藏
  collect3:function(e) {
   var that = this

    console.log('点击收藏获取的信息',e)
    if (wx.getStorageSync("token")){
     
      this.setData({
        tab: !this.data.tab
      })
      if (this.data.tab) {
        wx.showLoading({
          title: '收藏成功',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      } else if(!this.data.tab){
        wx.showLoading({
          title: '取消成功',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      }
    }else{
      wx.showModal({
        title: '请您先授权登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me/me'
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../me/me'
            })
          }
        }
      })
    }
   
    console.log(e.currentTarget.dataset.id)
    if (wx.getStorageSync("token")){
            wx.request({
              url: app.globalData.urlPath1 + '/app/goods/favorite',
              method: 'post',
              data: {
                'sid': wx.getStorageSync("sid"),
                'goodsId': e.currentTarget.dataset.id
              },
              header: {
                'content-type': "application/x-www-form-urlencoded",
                'token': wx.getStorageSync("token"),
              },
              success(res) {
                console.log('收藏',res)
              }
            })
    }else{
      wx.showModal({
          title: '请您先授权登录',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../me/me'
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '../me/me'
              })
            }
          }
        })
    }
   
   
   
  },
  ////////////商品固定///////////////
  toblock1: function () {
      wx.pageScrollTo({
        scrollTop: this.data.block2_ScrollTop - 3050
      })
      this.setData({
        scr_show: false,
        index:0
      })
  },
  ////////////评价固定///////////////
  toblock2: function () {
    wx.pageScrollTo({
      scrollTop: this.data.block2_ScrollTop - 2800
    })
    this.setData({
      index:1
    })
},
  ////////////详情固定///////////////
  toblock3: function () {
    wx.pageScrollTo({
      scrollTop: this.data.block2_ScrollTop - 2500
    })
    this.setData({
      index:2
    })
},
  ////////////推荐固定///////////////
  toblock4: function () {
    wx.pageScrollTo({
      scrollTop: this.data.block2_ScrollTop - 100
    })
    this.setData({
      index:3
    })
},
  close:function(){
    console.log("111")
    this.setData({
      showModal2: false
    })
  },
  
  //  * 客服弹窗
  //  */
  showDialogBtn: function () {
    this.setData({
      showModa1: true
    })
  },
  //  * 转发弹窗
  //  */
  showDialogBtn1: function () {
    this.setData({
      showModal1: true
    })
  },
  //  * 服务弹窗
  //  */
  showDialogBtn2: function () {
    this.setData({
      showModal2: true
    })
  },
  //  * 规格弹窗
  //  */
  showDialogBtn3: function () {
    if (wx.getStorageSync("userInfo")){
      this.setData({
        showModal3: true
      })
    }else{
      wx.showModal({
        title: '请您先授权登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me/me'
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../me/me'
            })
          }
        }
      })
    }
},
  //  * 地址弹窗
  //  */
  showDialogBtn4: function () {
    this.setData({
      showModal4: true
    })
  },

  /**
  * 隐藏模态对话框
  */
  hideModal: function () {
    this.setData({
      showModa1: false
    });
  },
  /**
 * 隐藏转发对话框
 */
  hideModal1: function () {
    this.setData({
      showModal1: false
    });
  },

  /**
 * 隐藏服务对话框
 */
  hideModal2: function () {
    this.setData({
      showModal2: false
    });
  },

  /**
* 隐藏规格对话框
*/
  hideModal3: function () {
    this.setData({
      showModal3: false
    });
  },
  /**
* 隐藏地址对话框
*/
  hideModal4: function () {
    this.setData({
      showModal4: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('商城商品跳转获取数据',options)
    console.log(options.id.length)
    // console.log('商城商品跳转获取数据11',JSON.parse(options.id).id)
    console.log( options.id.length)
    if(options.id.length == 4 || options.id.length == 3){
      var like_id = options.id
    }else{
      var like_id = JSON.parse(options.id).id
    }
   
    var islike = JSON.parse(options.id).isFavorite
    var that = this
    // 判断商品之前是否被收藏
    if(islike){
      that.setData({
        tab:!that.data.tab
      })
    }else{
      console.log('之前未被收藏过')
    }
    //////////////////////获取地址列表开始/////////////////////////////////
    wx.request({
      url: app.globalData.urlPath1 +'/app/address/default',
      method: "get",
      header: {
        'token': wx.getStorageSync("token"),
        'authorization': wx.getStorageSync("sid")
      },
      success(res) {
        // console.log(res)
        // console.log(res.data.result)
        that.setData({
          dzlist: res.data.result
        })
      }
    })

    
    
    ///////////////////////获取地址列表结束////////////////////////////////
    
    // console.log(options.id)
    that.setData({
      productid:like_id
    })
    wx.request({
      url: app.globalData.urlPath1+'/app/goods/'+like_id,
      data:{},
      success(res){
        console.log(res.data.result)
        
        that.setData({
          swiperimg: res.data.result.goodsPictureList,
          productinfo: res.data.result.goodsInfo,
          msg: res.data.result,
          size: res.data.result.itemSkuList[0],
          gg: res.data.result.itemSkuList[0].skuId
        })
      }
    })

  },
  now_buy:function(e){
    console.log(e)
    var that=this
    if (wx.getStorageSync("token") && wx.getStorageSync("userInfo")){
      var model = JSON.stringify(e.currentTarget.dataset.msg)
      var size = JSON.stringify(e.currentTarget.dataset.size)
      console.log(that.data.msg.itemSkuList[0].skuId)
      console.log(that.data.num)
      var skuList = [{ "id": that.data.msg.itemSkuList[0].skuId, "number": that.data.num }]
      console.log(skuList)
      wx.request({
        url: app.globalData.urlPath1 + '/app/orders/coupon?skuList=' + JSON.stringify(skuList),
        method:'get',
        header: {
          'token': wx.getStorageSync("token"),
          'authorization': wx.getStorageSync("sid")
        },
        success(res){
          console.log(res.data.result.isFreeDelivery)
          wx.setStorageSync('isFreeDelivery', res.data.result.isFreeDelivery)
          wx.navigateTo({
            url: '../order/order?msg=' + model + "&size=" + size + '&isFreeDelivery=' + res.data.result.isFreeDelivery,
          })
        }
      })
      
    }else{
      wx.showModal({
        title: '请您先授权登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me/me'
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../me/me'
            })
          }
        }
      })
    }
  
   
  },
  /**
  * 弹窗
  */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
* 弹窗
*/
  showDialogBtn1: function () {
    this.setData({
      showModal1: true
    })
  },
 
  /**
  * 隐藏模态对话框
  */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
* 隐藏规格对话框
*/
  hideModal3: function () {
    this.setData({
      showModal3: false
    });
  },
  /**
* 隐藏地址对话框
*/
  hideModal4: function () {
    this.setData({
      showModal4: false
    });
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
  onConfirm: function () {
    this.hideModal();
  },
  ///////////转发取消按钮/////////
  onConfirm1: function () {
    this.hideModal1();
  },
  ///////////服务确认按钮/////////
  onConfirm2: function () {
    this.hideModal2();
  },
  close3: function () {
    this.hideModal2();
  },
  close:function(){
    this.hideModal2();
  },
  ///////////规格确认按钮/////////
  onConfirm3: function () {
    this.hideModal3();
  },
  close2:function(){
    this.hideModal3();
  },
  ///////////地址确认按钮/////////
  onConfirm4: function () {
    wx.navigateTo({
      url: '../me/site/site',
    })
},
close:function(){
  this.hideModal4();
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    let id = res.target.dataset.msg;
    var info = JSON.stringify(res.target.dataset.info)
    console.log(info)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target.dataset.info)
      console.log(res.target.dataset.info[0])
    }
    return {
      title: res.target.dataset.info[1].goodsInfo.goodsName,
      path: '/pages/product/product?id=' + res.target.dataset.info[0],
      imageUrl: res.target.dataset.info[1].goodsPictureList[0].pictureList[0].url
    }
  },
  onPageScroll: function(e) {
    var that=this
    let scro_height = e.scrollTop
    console.log(e.scrollTop)
    if (scro_height >= 100 && scro_height <= 400){
      that.setData({
        scr_show:true,
        index:0
      })
    }
    if (scro_height >= 400 && scro_height <= 800){
        that.setData({
          index:1
        })
    }
    if (scro_height >= 800 && scro_height <=6000) {
      that.setData({
        index: 2
      })
    }
    if (scro_height >= 6000 && scro_height <= 8000) {
      that.setData({
        index: 3
      })
    }
    if(scro_height<=50){
      that.setData({
        scr_show: false
      })
    }
  },
})



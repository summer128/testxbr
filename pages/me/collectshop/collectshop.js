// pages/me/collectshop/collectshop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      collectList:null,
      x: 0, // 注意，这里通过x属性设置的宽度的单位是px
      delList: [],
      statusBarHeight: app.globalData.statusBarHeight
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  touchStart: function (e) {
    console.log(e, e.touches[0].clientX)
    this.setData({
      s_x: e.touches[0].clientX,
      curr: e.currentTarget.dataset.id
    })
  },
  touchEnd: function (e) {
    console.log(e, e.changedTouches[0].clientX)
    var e_x = e.changedTouches[0].clientX
    if (this.data.s_x - e_x > 20) {
      console.log("向左滑")
      this.setData({
        x: -120
      })
    } else {
      this.setData({
        x: 0
      })
    }
  },
  // 删除按钮
  del: function (e) {
    var _this = this, id = e.currentTarget.dataset.delID
    this.data.delList.splice(id, 1)
    this.setData({
      delList: this.data.delList,
      curr: 0
    })
    console.log(e.currentTarget.dataset.delid)
    var goodsid = e.currentTarget.dataset.delid
    wx.request({
      url: app.globalData.urlPath1 +'/app/goods/favorite',
      method:'post',
      data: {
        
        'sid': wx.getStorageSync("sid"),
          goodsId:goodsid
      },
      header: {
        'content-type': "application/x-www-form-urlencoded",
        'token': wx.getStorageSync("token"),
      },
      success(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (wx.getStorageSync("token")){
      wx.request({
        url: app.globalData.urlPath1 + '/app/goods/favorite?pageNum=0&pageSize=100',
        method: 'get',
        header: {
          'token': wx.getStorageSync("token"),
          'authorization': wx.getStorageSync("sid")
        },
        success(res) {
          console.log(res)  ///获取出来所有的收藏商品信息
          console.log(res.data.result)
          if(res.data.status !== 200){
            console.log('收藏为空')
          }else{
            that.setData({
              delList: res.data.result,
            })
          }
          
        }
      })
    }else{
      wx.showModal({
        title: '请您先登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
     
    
  }

})
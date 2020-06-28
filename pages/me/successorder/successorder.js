// pages/me/successorder/successorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      onShow:false,
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  kefu:function(){
    this.setData({
      onShow:true,
    })
  },
  hide:function(){
    this.setData({
      onShow: false,
    })
  }
})
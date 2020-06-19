const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pid: 0
  },

  
  bindGetUserInfo: function (e) {
    console.log(e.detail.errMsg ='getUserInfo:ok')
    if (e.detail.errMsg = 'getUserInfo:ok'){
          wx.switchTab({
            url: '../index/index',
          })
      }
  },
  //获取用户信息接口
  

})
